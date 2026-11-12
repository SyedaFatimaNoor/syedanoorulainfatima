import { createHash, randomBytes } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import {
  enquirySchema,
  getEnquiryEmail,
  getValidationErrors,
} from "@/lib/contact";
import { createRateLimiter } from "@/lib/rate-limit";
import { isEmailDeliveryConfigured, site } from "@/lib/site";

export const runtime = "nodejs";
const limiter = createRateLimiter();
const hashSalt = randomBytes(32).toString("hex");
const MAX_BODY_BYTES = 16_384;

function reply(
  data: object,
  status = 200,
  headers: Record<string, string> = {},
) {
  return NextResponse.json(data, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });
}

async function readBoundedJson(request: NextRequest) {
  if (Number(request.headers.get("content-length") || 0) > MAX_BODY_BYTES)
    throw new Error("too-large");
  const reader = request.body?.getReader();
  if (!reader) throw new Error("invalid-json");
  let size = 0;
  const chunks: Uint8Array[] = [];
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new Error("too-large");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

export async function POST(request: NextRequest) {
  if (
    !request.headers
      .get("content-type")
      ?.toLowerCase()
      .startsWith("application/json")
  )
    return reply({ error: "Please submit the form as JSON." }, 415);
  const origin = request.headers.get("origin");
  if (request.headers.get("sec-fetch-site") === "cross-site")
    return reply(
      { error: "Please use the contact form on this website." },
      403,
    );
  if (origin) {
    try {
      const url = new URL(origin);
      if (
        !["http:", "https:"].includes(url.protocol) ||
        url.host !== (request.headers.get("host") || request.nextUrl.host)
      )
        return reply(
          { error: "Please use the contact form on this website." },
          403,
        );
    } catch {
      return reply({ error: "Invalid request origin." }, 403);
    }
  }

  let body: unknown;
  try {
    body = await readBoundedJson(request);
  } catch (error) {
    return reply(
      {
        error:
          error instanceof Error && error.message === "too-large"
            ? "Your enquiry is too long. Please shorten it and try again."
            : "The request could not be read. Please try again.",
      },
      error instanceof Error && error.message === "too-large" ? 413 : 400,
    );
  }
  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success)
    return reply(
      {
        error: "Please check the highlighted fields.",
        fields: getValidationErrors(parsed.error),
      },
      400,
    );
  if (parsed.data.website)
    return reply(
      {
        error: "The enquiry could not be accepted. Please contact me by email.",
      },
      400,
    );

  // Vercel sets this header at its trusted edge. On other hosts, use a shared bucket instead of trusting arbitrary forwarded headers.
  const client =
    process.env.VERCEL === "1"
      ? request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
        "unknown"
      : "shared-local";
  const key = createHash("sha256")
    .update(`${hashSalt}:${client}`)
    .digest("hex");
  const rate = limiter.check(key);
  if (!rate.allowed)
    return reply(
      {
        error:
          "A few enquiries have been prepared recently. Please try again later, or use the email link directly.",
      },
      429,
      { "Retry-After": String(rate.retryAfter) },
    );

  const email = getEnquiryEmail(parsed.data);
  // No invented success state: without a delivery provider, return a real, ready-to-send email draft.
  if (!isEmailDeliveryConfigured()) return reply({ mode: "draft", ...email });

  const from = process.env.CONTACT_FROM_EMAIL!;
  const to = process.env.CONTACT_TO_EMAIL || site.email;
  if (/[\r\n]/.test(from) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to))
    return reply(
      {
        error:
          "Email delivery is not configured correctly. Nothing was sent. Please use the direct email link.",
      },
      503,
    );

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: parsed.data.email,
        subject: email.subject,
        text: email.text,
      }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    if (!response.ok)
      return reply(
        {
          error:
            "The email service did not accept your enquiry. Nothing has been confirmed sent. Please try the direct email link.",
        },
        502,
      );
    const result: unknown = await response.json();
    if (
      !result ||
      typeof result !== "object" ||
      !("id" in result) ||
      typeof result.id !== "string"
    )
      return reply(
        {
          error:
            "Email acceptance could not be confirmed. Please contact me directly by email.",
        },
        502,
      );
    return reply({
      mode: "accepted",
      message:
        "The email service has accepted your enquiry. Thank you for reaching out.",
    });
  } catch {
    return reply(
      {
        error:
          "Email acceptance could not be confirmed. Your details are still in the form — please use the direct email link, or try again later.",
      },
      503,
    );
  }
}
