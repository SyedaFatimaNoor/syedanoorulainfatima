import test from "node:test";
import assert from "node:assert/strict";
import {
  enquirySchema,
  getEnquiryEmail,
  getValidationErrors,
} from "../src/lib/contact";

export const validEnquiry = {
  name: "Alex Example",
  email: "alex@example.com",
  company: "Example Studio",
  service: "Full-stack web development",
  budget: "Let's discuss",
  message:
    "We would like to discuss an accessible product dashboard for our team.",
  consent: true,
  website: "",
};

test("validates a complete enquiry and trims whitespace", () => {
  const result = enquirySchema.parse({
    ...validEnquiry,
    name: "  Alex Example  ",
    email: " alex@example.com ",
  });
  assert.equal(result.name, "Alex Example");
  assert.equal(result.email, "alex@example.com");
});

test("company and budget are optional with safe defaults", () => {
  const { company, budget, ...minimal } = validEnquiry;
  assert.ok(company && budget);
  const result = enquirySchema.parse(minimal);
  assert.equal(result.company, "");
  assert.equal(result.budget, "Let's discuss");
});

test("rejects empty, malformed, excessively long and unconsented enquiries", () => {
  for (const invalid of [
    { name: "A" },
    { email: "not-an-email" },
    { service: "Invented service" },
    { budget: "Invalid budget" },
    { message: "too short" },
    { message: "x".repeat(3001) },
    { company: "x".repeat(121) },
    { consent: false },
    { consent: "true" },
  ]) {
    assert.equal(
      enquirySchema.safeParse({ ...validEnquiry, ...invalid }).success,
      false,
      JSON.stringify(invalid),
    );
  }
});

test("blocks control characters in fields used in email headers", () => {
  for (const name of ["Alex\r\nBcc: someone@example.com", "Alex\u0000Example"])
    assert.equal(
      enquirySchema.safeParse({ ...validEnquiry, name }).success,
      false,
    );
  assert.equal(
    enquirySchema.safeParse({
      ...validEnquiry,
      email: "alex@example.com\nBcc:example@example.com",
    }).success,
    false,
  );
});

test("returns useful field-specific validation messages", () => {
  const result = enquirySchema.safeParse({
    ...validEnquiry,
    name: "",
    email: "bad",
    message: "",
  });
  assert.equal(result.success, false);
  if (!result.success) {
    const fields = getValidationErrors(result.error);
    assert.ok(fields.name?.includes("name"));
    assert.ok(fields.email?.includes("email"));
    assert.ok(fields.message?.includes("20"));
  }
});

test("constructs a correctly encoded draft without changing project text", () => {
  const enquiry = enquirySchema.parse({
    ...validEnquiry,
    message:
      "A product with R&D, a #roadmap, unicode — and a genuine question?",
  });
  const draft = getEnquiryEmail(enquiry);
  const url = new URL(draft.mailto);
  assert.equal(url.protocol, "mailto:");
  assert.equal(url.pathname, "syedanoorfatima610@gmail.com");
  assert.equal(url.searchParams.get("subject"), draft.subject);
  assert.equal(url.searchParams.get("body"), draft.text);
  assert.ok(draft.text.startsWith("Hi Syeda Noor ul Ain Fatima,\n\n"));
  assert.ok(draft.text.includes(enquiry.message));
  assert.ok(draft.text.includes("Budget (USD): Let's discuss"));
});
