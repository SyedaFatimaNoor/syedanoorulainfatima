import type { Metadata } from "next";
import { PageLink as Link } from "@/components/page-link";
import { ArrowLeft } from "lucide-react";
import { getSiteUrl, isEmailDeliveryConfigured, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy note",
  description:
    "A plain-English explanation of how enquiries and information are handled on Noor's portfolio.",
  ...(getSiteUrl()
    ? { alternates: { canonical: `${getSiteUrl()}/privacy` } }
    : {}),
};

export default function PrivacyPage() {
  const delivery = isEmailDeliveryConfigured();
  return (
    <main id="main">
      <article className="container privacy-page">
        <Link href="/" className="breadcrumb">
          <ArrowLeft size={14} aria-hidden="true" />
          Back to the portfolio
        </Link>
        <span className="eyebrow">CLEAR BY DESIGN</span>
        <h1>A simple privacy note.</h1>
        <p className="privacy-intro">
          A project conversation should start with trust. Here’s what happens to
          the information you share on this website.
        </p>
        <h2>Who you’re contacting</h2>
        <p>
          This is the personal portfolio of {site.name}, based in Karachi,
          Pakistan. For privacy questions, email{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
        <h2>Your project enquiry</h2>
        <p>
          The form asks for your name, email, project interest, and a short
          description. Company and budget are optional. These details are used
          to prepare and respond to your project enquiry, not to subscribe you
          to a mailing list.
        </p>
        {delivery ? (
          <p>
            When you submit a valid enquiry, the website sends the details to
            its configured email-delivery provider, Resend, for delivery to
            Noor. A confirmation means the provider accepted the message, not a
            guarantee that it reached an inbox. Your enquiry is not stored in a
            website database, but your email provider, Resend, and the
            recipient’s mailbox may retain the message under their own policies.
          </p>
        ) : (
          <p>
            This version prepares an email draft; it does not send email
            automatically. Your form details are validated by the server and
            returned to your browser as a draft. The site does not persist the
            enquiry. You choose whether to open your email app or copy the
            draft, and you must send the email yourself. Your email provider’s
            policies apply once you do.
          </p>
        )}
        <h2>Practical safeguards</h2>
        <ul>
          <li>Form data is validated in the browser and on the server.</li>
          <li>
            Enquiry content is not written to application logs or a website
            database.
          </li>
          <li>
            A short-lived, hashed request identifier is used in server memory to
            limit form abuse. It expires after 15 minutes and is not a visitor
            profile.
          </li>
          <li>
            The hosting platform may keep technical access logs, including IP
            addresses and request information, under its own retention policy.
          </li>
        </ul>
        <h2>No advertising trackers</h2>
        <p>
          This application does not install analytics, advertising cookies,
          tracking pixels, or third-party font requests. Fonts and visual assets
          are served with the portfolio. Essential technical logging by the
          hosting platform is separate from the application.
        </p>
        <h2>External websites</h2>
        <p>
          Project demos, source repositories, and configured social links open
          external sites. Their privacy practices apply after you leave this
          portfolio. Contact via WhatsApp or LinkedIn is only offered when the
          corresponding details have been provided.
        </p>
        <h2>Your choices</h2>
        <p>
          Please avoid sending passwords, sensitive personal information, or
          confidential project material through the enquiry form. You can ask
          about, correct, or request deletion of enquiry correspondence by
          emailing Noor. Any legal retention obligations or records controlled
          by your own email provider may still apply.
        </p>
        <p className="privacy-updated">LAST UPDATED · 12 NOVEMBER 2026</p>
      </article>
    </main>
  );
}
