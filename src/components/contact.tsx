"use client";

import { Github, Linkedin } from "@/components/ui";
import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  Copy,
  Globe2,
  Mail,
  MessageCircle,
} from "lucide-react";
import { site } from "@/lib/site";
import { ContactForm } from "./contact-form";
import { SectionLabel } from "./ui";
import { Reveal } from "./reveal";

export function Contact({
  linkedin,
  whatsapp,
  canSend,
}: {
  linkedin: string | null;
  whatsapp: string | null;
  canSend: boolean;
}) {
  const [copyState, setCopyState] = useState("");
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopyState("Email address copied.");
    } catch {
      setCopyState(
        "Select the email address to copy it, or click it to open your email app.",
      );
    }
  }
  return (
    <section
      id="contact"
      className="section contact-section"
      aria-labelledby="contact-heading"
    >
      <div className="container">
        <Reveal>
          <SectionLabel number="06">LET’S MAKE IT MEANINGFUL</SectionLabel>
        </Reveal>
        <div className="contact-grid">
          <Reveal className="contact-copy">
            <span className="contact-intro mono">
              <span className="status-dot" aria-hidden="true" /> LET’S TALK
              ABOUT YOUR PROJECT
            </span>
            <h2 id="contact-heading">
              Have an idea?
              <br />
              Let’s build something
              <br />
              <span className="gradient-text">meaningful.</span>
            </h2>
            <p>
              Whether you have a clear brief or a question worth exploring, I’d
              love to hear what you’re thinking.
            </p>
            <div className="contact-email-block">
              <span className="mono">START WITH A HELLO</span>
              <div className="contact-email-row">
                <a href={`mailto:${site.email}`}>
                  <Mail size={18} aria-hidden="true" />
                  {site.email}
                </a>
                <button
                  type="button"
                  className="icon-button copy-email"
                  onClick={copyEmail}
                  aria-label="Copy email address"
                >
                  {copyState.startsWith("Email address copied") ? (
                    <Check size={16} />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
              </div>
              <span className="email-copy-status" role="status">
                {copyState}
              </span>
            </div>
            <div className="contact-channels">
              <a href={site.github} target="_blank" rel="noopener noreferrer">
                <span>
                  <Github size={18} aria-hidden="true" />
                  GitHub
                </span>
                <span>
                  Explore the code
                  <ArrowUpRight size={16} aria-hidden="true" />
                </span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              {linkedin ? (
                <a href={linkedin} target="_blank" rel="noopener noreferrer">
                  <span>
                    <Linkedin size={18} aria-hidden="true" />
                    LinkedIn
                  </span>
                  <span>
                    Let’s connect
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                <div className="channel-placeholder">
                  <span>
                    <Linkedin size={18} aria-hidden="true" />
                    LinkedIn
                  </span>
                  <span>Profile to be added</span>
                </div>
              )}
              {whatsapp ? (
                <a href={whatsapp} target="_blank" rel="noopener noreferrer">
                  <span>
                    <MessageCircle size={18} aria-hidden="true" />
                    WhatsApp
                  </span>
                  <span>
                    {whatsapp === `https://wa.me/${site.whatsappNumber}`
                      ? site.whatsappDisplay
                      : "Start a conversation"}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                <div className="channel-placeholder">
                  <span>
                    <MessageCircle size={18} aria-hidden="true" />
                    WhatsApp
                  </span>
                  <span>Number to be added</span>
                </div>
              )}
            </div>
            <div className="contact-worldwide">
              <Globe2 size={19} aria-hidden="true" />
              <div>
                <strong>Good ideas don’t have borders.</strong>
                <span>Open to remote collaboration, wherever you are.</span>
              </div>
            </div>
          </Reveal>
          <Reveal className="contact-form-wrap" delay={0.1}>
            <ContactForm canSend={canSend} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
