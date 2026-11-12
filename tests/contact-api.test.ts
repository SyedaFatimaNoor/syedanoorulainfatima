import test from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { POST } from "../src/app/api/contact/route";

const valid = {
  name: "Alex Example",
  email: "alex@example.com",
  company: "",
  service: "Full-stack web development",
  budget: "Let's discuss",
  message: "A carefully scoped dashboard project for an example business.",
  consent: true,
  website: "",
};
let id = 0;
function request(body: unknown = valid, headers: Record<string, string> = {}) {
  return new NextRequest("https://portfolio.example.test/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Host: "portfolio.example.test",
      "x-vercel-forwarded-for": `192.0.2.${++id}`,
      ...headers,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

test("API prepares a draft and never claims delivery without configuration", async (t) => {
  t.mock.method(globalThis, "fetch", async () => {
    throw new Error("Unexpected provider call");
  });
  const key = process.env.RESEND_API_KEY;
  delete process.env.RESEND_API_KEY;
  t.after(() => {
    if (key !== undefined) process.env.RESEND_API_KEY = key;
  });
  const response = await POST(request());
  assert.equal(response.status, 200);
  const result = await response.json();
  assert.equal(result.mode, "draft");
  assert.ok(result.mailto.startsWith("mailto:syedanoorfatima610@gmail.com?"));
  assert.equal(response.headers.get("cache-control"), "no-store");
});

test("API rejects malformed JSON, invalid form data, and the honeypot", async () => {
  assert.equal((await POST(request("{invalid"))).status, 400);
  assert.equal((await POST(request({ ...valid, email: "bad" }))).status, 400);
  assert.equal(
    (await POST(request({ ...valid, website: "spam.example" }))).status,
    400,
  );
  assert.equal((await POST(request({ ...valid, consent: false }))).status, 400);
});

test("API rejects cross-site requests and non-JSON input", async () => {
  assert.equal(
    (await POST(request(valid, { origin: "https://other.example.test" })))
      .status,
    403,
  );
  assert.equal(
    (await POST(request(valid, { "sec-fetch-site": "cross-site" }))).status,
    403,
  );
  assert.equal((await POST(request(valid, { origin: "null" }))).status, 403);
  assert.equal(
    (await POST(request(valid, { "Content-Type": "text/plain" }))).status,
    415,
  );
});

test("API bounds request bytes, with and without a declared content length", async () => {
  assert.equal((await POST(request("x".repeat(17000)))).status, 413);
  assert.equal(
    (await POST(request(valid, { "content-length": "999999" }))).status,
    413,
  );
});

test("configured delivery only confirms a provider-accepted message", async (t) => {
  const env = {
    key: process.env.RESEND_API_KEY,
    from: process.env.CONTACT_FROM_EMAIL,
    vercel: process.env.VERCEL,
  };
  process.env.RESEND_API_KEY = "test-only-not-a-real-key";
  process.env.CONTACT_FROM_EMAIL = "Portfolio <no-reply@example.test>";
  process.env.VERCEL = "1";
  t.after(() => {
    for (const [key, value] of [
      ["RESEND_API_KEY", env.key],
      ["CONTACT_FROM_EMAIL", env.from],
      ["VERCEL", env.vercel],
    ]) {
      if (value === undefined) delete process.env[key!];
      else process.env[key!] = value;
    }
  });
  let outgoing: Record<string, unknown> = {};
  const mock = t.mock.method(
    globalThis,
    "fetch",
    async (_input: unknown, options?: RequestInit) => {
      outgoing = JSON.parse(options?.body as string);
      return Response.json({ id: "test-provider-reference" });
    },
  );
  const accepted = await POST(
    request(valid, { origin: "https://portfolio.example.test" }),
  );
  assert.equal(accepted.status, 200);
  assert.equal((await accepted.json()).mode, "accepted");
  assert.deepEqual(outgoing.to, ["syedanoorfatima610@gmail.com"]);
  assert.equal(outgoing.reply_to, valid.email);
  assert.ok(typeof outgoing.text === "string");
  assert.equal("html" in outgoing, false);
  mock.mock.mockImplementation(async () =>
    Response.json({ message: "provider failure" }, { status: 500 }),
  );
  assert.equal((await POST(request())).status, 502);
  mock.mock.mockImplementation(async () => {
    throw new Error("timeout");
  });
  assert.equal((await POST(request())).status, 503);
  mock.mock.mockImplementation(async () => Response.json({ unexpected: true }));
  assert.equal((await POST(request())).status, 502);
});

test("API limits repeated valid attempts with an explicit retry hint", async (t) => {
  const original = process.env.VERCEL;
  process.env.VERCEL = "1";
  t.after(() => {
    if (original === undefined) delete process.env.VERCEL;
    else process.env.VERCEL = original;
  });
  for (let attempt = 0; attempt < 5; attempt++)
    assert.equal(
      (
        await POST(
          request(valid, { "x-vercel-forwarded-for": "198.51.100.50" }),
        )
      ).status,
      200,
    );
  const limited = await POST(
    request(valid, { "x-vercel-forwarded-for": "198.51.100.50" }),
  );
  assert.equal(limited.status, 429);
  assert.ok(Number(limited.headers.get("Retry-After")) > 0);
});
