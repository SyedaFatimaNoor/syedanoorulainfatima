"use client";

import { trapDialogFocus } from "@/lib/dialog";

import { PageLink as Link } from "@/components/page-link";
import { useRef, useState, type FormEvent } from "react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Copy,
  LoaderCircle,
  Mail,
  ShieldCheck,
  X,
} from "lucide-react";
import {
  budgetOptions,
  enquirySchema,
  getValidationErrors,
  serviceOptions,
  type EnquiryErrors,
} from "@/lib/contact";
import { site } from "@/lib/site";

type Result =
  | { mode: "draft"; subject: string; text: string; mailto: string }
  | { mode: "accepted"; message: string };

export function ContactForm({ canSend }: { canSend: boolean }) {
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [copyState, setCopyState] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const submitButton = useRef<HTMLButtonElement>(null);

  const fieldError = (name: keyof EnquiryErrors) =>
    errors[name] ? (
      <span id={`${name}-error`} className="field-error">
        {errors[name]}
      </span>
    ) : null;
  const fieldProps = (name: keyof EnquiryErrors) => ({
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    setServerError("");
    setErrors({});
    const data = new FormData(event.currentTarget);
    const values = {
      ...Object.fromEntries(data),
      consent: data.get("consent") === "on",
    };
    const parsed = enquirySchema.safeParse(values);
    if (!parsed.success) {
      const fields = getValidationErrors(parsed.error);
      setErrors(fields);
      const first = Object.keys(fields)[0];
      (form.current?.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
        signal: AbortSignal.timeout(15_000),
      });
      const payload = await response.json();
      if (!response.ok) {
        setServerError(
          payload.error ||
            "Your enquiry could not be prepared. Please use the direct email link.",
        );
        if (payload.fields) setErrors(payload.fields);
        return;
      }
      if (payload.mode !== "draft" && payload.mode !== "accepted")
        throw new Error("Unexpected response");
      setResult(payload);
      setCopyState("");
      dialog.current?.showModal();
      if (payload.mode === "accepted") form.current?.reset();
    } catch {
      setServerError(
        "The connection could not be completed. Your details are still here. Please try again or use the direct email link.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function copyEnquiry() {
    if (result?.mode !== "draft") return;
    try {
      await navigator.clipboard.writeText(
        `To: ${site.email}\nSubject: ${result.subject}\n\n${result.text}`,
      );
      setCopyState("Copied — paste it into your email app.");
    } catch {
      setCopyState("Please select and copy the message below.");
    }
  }

  return (
    <>
      <form
        ref={form}
        method="post"
        action="/api/contact"
        onSubmit={submit}
        className="contact-form"
        noValidate
        aria-label="Project enquiry"
      >
        <div className="form-heading">
          <span className="mono form-eyebrow">
            FROM A SMALL HELLO TO SOMETHING GREAT.
          </span>
          <h3>Tell me what you have in mind.</h3>
        </div>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="name">
              Your name <span>*</span>
            </label>
            <input
              id="name"
              name="name"
              autoComplete="name"
              placeholder="Alex Morgan"
              required
              minLength={2}
              maxLength={80}
              {...fieldProps("name")}
            />
            {fieldError("name")}
          </div>
          <div className="form-field">
            <label htmlFor="email">
              Email address <span>*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="alex@company.com"
              required
              maxLength={254}
              {...fieldProps("email")}
            />
            {fieldError("email")}
          </div>
        </div>
        <div className="form-field">
          <label htmlFor="company">
            Company <span className="optional">(optional)</span>
          </label>
          <input
            id="company"
            name="company"
            autoComplete="organization"
            placeholder="Your company or team"
            maxLength={120}
            {...fieldProps("company")}
          />
          {fieldError("company")}
        </div>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="service">
              What are we building? <span>*</span>
            </label>
            <div className="select-wrap">
              <select
                id="service"
                name="service"
                defaultValue=""
                required
                {...fieldProps("service")}
              >
                <option value="" disabled>
                  Select a service
                </option>
                {serviceOptions.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} aria-hidden="true" />
            </div>
            {fieldError("service")}
          </div>
          <div className="form-field">
            <label htmlFor="budget">
              Budget <span className="optional">(USD, optional)</span>
            </label>
            <div className="select-wrap">
              <select
                id="budget"
                name="budget"
                defaultValue="Let's discuss"
                {...fieldProps("budget")}
              >
                {budgetOptions.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} aria-hidden="true" />
            </div>
            {fieldError("budget")}
          </div>
        </div>
        <div className="form-field">
          <label htmlFor="message">
            A little about your project <span>*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="The idea, the challenge, or the thing you wish worked better…"
            required
            minLength={20}
            maxLength={3000}
            {...fieldProps("message")}
          />
          {fieldError("message")}
        </div>
        <div className="honeypot" aria-hidden="true">
          <label htmlFor="website">Leave this field empty</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            maxLength={160}
          />
        </div>
        <label className="consent-label">
          <input
            type="checkbox"
            name="consent"
            required
            {...fieldProps("consent")}
          />
          <span>
            You may contact me about this project.{" "}
            <Link href="/privacy">Privacy note</Link>
          </span>
        </label>
        {fieldError("consent")}
        {serverError && (
          <div className="form-error" role="alert">
            <span>{serverError}</span>
            <a href={`mailto:${site.email}`}>
              Email Noor directly <ArrowRight size={14} aria-hidden="true" />
            </a>
          </div>
        )}
        <button
          ref={submitButton}
          className="button button-primary form-submit"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <LoaderCircle size={18} className="spin" aria-hidden="true" />
              Preparing your enquiry…
            </>
          ) : (
            <>
              {canSend ? "Send project enquiry" : "Let’s start a conversation"}
              <ArrowUpRightIcon />
            </>
          )}
        </button>
        <p className="form-note">
          <ShieldCheck size={13} aria-hidden="true" />
          {canSend
            ? "Just a project conversation. No mailing lists."
            : "Prepares an email draft. You review it and press send."}
        </p>
        <p className="sr-only" role="status" aria-live="polite">
          {loading
            ? "Preparing your enquiry"
            : Object.keys(errors).length
              ? "Please correct the highlighted fields."
              : ""}
        </p>
      </form>
      <dialog
        ref={dialog}
        className="enquiry-dialog"
        onKeyDown={trapDialogFocus}
        aria-labelledby="enquiry-result-title"
        onClose={() => submitButton.current?.focus()}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <button
          className="icon-button dialog-close"
          type="button"
          onClick={() => dialog.current?.close()}
          aria-label="Close enquiry result"
        >
          <X size={21} />
        </button>
        <span className="dialog-result-icon">
          {result?.mode === "draft" ? (
            <Mail size={27} />
          ) : (
            <CheckCircle2 size={27} />
          )}
        </span>
        <span className="eyebrow">A MEANINGFUL FIRST STEP</span>
        <h3 id="enquiry-result-title">
          {result?.mode === "draft"
            ? "Your email draft is ready."
            : "Your enquiry is on its way."}
        </h3>
        {result?.mode === "draft" ? (
          <>
            <p>
              Nothing has been sent yet. Open this draft in your email app,
              review it, and send it to Noor. You can also copy the enquiry
              below.
            </p>
            <div className="draft-recipient">
              <span>TO</span>
              {site.email}
            </div>
            <div className="dialog-actions">
              <a className="button button-primary" href={result.mailto}>
                <Mail size={16} aria-hidden="true" />
                Open email app
              </a>
              <button
                type="button"
                className="button button-secondary"
                onClick={copyEnquiry}
              >
                {copyState.startsWith("Copied") ? (
                  <Check size={16} />
                ) : (
                  <Copy size={16} />
                )}
                Copy enquiry
              </button>
            </div>
            <span className="copy-status" role="status">
              {copyState}
            </span>
            <label className="draft-label" htmlFor="enquiry-draft">
              Your message
            </label>
            <textarea
              id="enquiry-draft"
              readOnly
              value={`Subject: ${result.subject}\n\n${result.text}`}
              rows={7}
            />
            <p className="dialog-small-note">
              No email app? Copy the message into your preferred email service.
              Your enquiry is not stored on this website.
            </p>
          </>
        ) : (
          <>
            <p>
              The email service has accepted your message. Thank you for sharing
              your idea. Delivery to an inbox is not guaranteed by this
              confirmation.
            </p>
            <button
              type="button"
              className="button button-primary"
              onClick={() => dialog.current?.close()}
            >
              Back to the portfolio <ArrowRight size={16} />
            </button>
          </>
        )}
      </dialog>
    </>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}
