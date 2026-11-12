import { z } from "zod";
import { site } from "./site";

export const serviceOptions = [
  "Full-stack web development",
  "AI-powered application",
  "AI agents & automation",
  "Custom dashboard",
  "API & backend development",
  "Responsive frontend",
  "Not sure yet — let's talk",
] as const;
export const budgetOptions = [
  "Let's discuss",
  "Under $1,000",
  "$1,000–$3,000",
  "$3,000–$5,000",
  "$5,000+",
] as const;

export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name (at least 2 characters).")
    .max(80, "Please keep your name under 80 characters.")
    .regex(/^[^\r\n\x00-\x1f]+$/, "Please enter a valid name."),
  email: z
    .string()
    .trim()
    .max(254, "Please enter a shorter email address.")
    .email("Please enter a valid email address."),
  company: z
    .string()
    .trim()
    .max(120, "Please keep the company name under 120 characters.")
    .regex(/^[^\r\n\x00-\x1f]*$/, "Please enter a valid company name.")
    .default(""),
  service: z.enum(serviceOptions, {
    error: "Please choose what you would like to build.",
  }),
  budget: z
    .enum(budgetOptions, {
      error: "Please choose a budget range, or Let's discuss.",
    })
    .default("Let's discuss"),
  message: z
    .string()
    .trim()
    .min(
      20,
      "A little more detail would help — please write at least 20 characters.",
    )
    .max(3000, "Please keep your project details under 3,000 characters."),
  consent: z.literal(true, {
    error: "Please confirm that I may reply about your project.",
  }),
  website: z.string().max(160).default(""),
});

export type Enquiry = z.infer<typeof enquirySchema>;
export type EnquiryErrors = Partial<Record<keyof Enquiry, string>>;

export function getEnquiryEmail(enquiry: Enquiry) {
  const subject = `Project enquiry: ${enquiry.service} — ${enquiry.name}`;
  const text = [
    `Hi ${site.name},`,
    "",
    enquiry.message,
    "",
    "PROJECT DETAILS",
    `Name: ${enquiry.name}`,
    `Email: ${enquiry.email}`,
    ...(enquiry.company ? [`Company: ${enquiry.company}`] : []),
    `Interested in: ${enquiry.service}`,
    `Budget (USD): ${enquiry.budget}`,
    "",
    "You may reply to me about this project.",
  ].join("\n");
  return {
    subject,
    text,
    mailto: `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`,
  };
}

export function getValidationErrors(error: z.ZodError): EnquiryErrors {
  const errors: EnquiryErrors = {};
  for (const issue of error.issues) {
    const field = issue.path[0] as keyof Enquiry;
    if (field && !errors[field]) errors[field] = issue.message;
  }
  return errors;
}
