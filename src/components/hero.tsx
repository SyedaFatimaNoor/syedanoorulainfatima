"use client";

import { Linkedin } from "@/components/ui";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Code2,
  Globe2,
  Sparkles,
} from "lucide-react";
import { BrandIcon, ExternalLink } from "./ui";
import { site } from "@/lib/site";
import knot from "../../public/images/intelligence-knot.webp";

const roles = ["Full-Stack Developer", "AI Engineer", "AI Agent Developer"];

export function Hero({ linkedin }: { linkedin: string | null }) {
  const [role, setRole] = useState(0);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    if (reducedMotion) return;
    const interval = window.setInterval(
      () => setRole((value) => (value + 1) % roles.length),
      4200,
    );
    return () => window.clearInterval(interval);
  }, [reducedMotion]);

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-grid-background" aria-hidden="true" />
      <div className="container">
        <div className="hero-topline">
          <span className="availability">
            <span className="status-dot" />
            OPEN TO COLLABORATION
          </span>
          <span className="hero-edition mono">
            INDEPENDENT DEVELOPER <span> / </span> PORTFOLIO ’26
          </span>
        </div>
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="hero-intro">
              Hello, I’m Noor.
              <span className="intro-divider" />
              <span className="role-text" aria-hidden="true">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={role}
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -7 }}
                    transition={{ duration: reducedMotion ? 0 : 0.25 }}
                  >
                    {roles[role]}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="sr-only">
                Full-Stack Developer, AI Engineer and AI Agent Developer
              </span>
            </div>
            <h1 id="hero-heading">
              I build digital
              <br className="desktop-break" /> products, intelligent
              <br className="desktop-break" /> systems &{" "}
              <span className="gradient-text">
                <span className="nowrap">AI-powered</span>
                <br className="desktop-break" /> experiences.
              </span>
            </h1>
            <p className="hero-description">
              I’m a Full-Stack Developer focused on building modern web
              applications, scalable digital solutions, and intelligent
              AI-powered systems.
            </p>
            <div className="hero-actions">
              <a href="#work" className="button button-primary">
                View my projects <ArrowDownRight size={19} aria-hidden="true" />
              </a>
              <a href="#contact" className="button button-secondary">
                Let’s work together{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
            <div className="hero-socials">
              <ExternalLink
                href={site.github}
                className="social-link"
                label="Noor on GitHub"
              >
                <BrandIcon name="github" size={17} />
                GitHub
              </ExternalLink>
              <span className="social-divider" />
              {linkedin ? (
                <ExternalLink
                  href={linkedin}
                  className="social-link"
                  label="Noor on LinkedIn"
                >
                  <Linkedin size={17} />
                  LinkedIn
                </ExternalLink>
              ) : (
                <span
                  className="social-link social-unavailable"
                  title="LinkedIn profile link has not been provided"
                >
                  <Linkedin size={17} aria-hidden="true" />
                  LinkedIn<span className="soon-label">soon</span>
                </span>
              )}
            </div>
          </div>
          <div
            className="hero-visual"
            aria-label="A sculptural study of connected systems"
          >
            <div className="visual-coordinate mono" aria-hidden="true">
              CREATIVITY × ENGINEERING
            </div>
            <div className="orbit orbit-one" aria-hidden="true" />
            <div className="orbit orbit-two" aria-hidden="true" />
            <div className="visual-cross cross-one" aria-hidden="true">
              +
            </div>
            <div className="visual-cross cross-two" aria-hidden="true">
              +
            </div>
            <div className="sculpture-wrap">
              <Image
                src={knot}
                alt="Interwoven titanium ribbons, a sculptural expression of connected digital systems"
                className="hero-sculpture"
                priority
                sizes="(max-width: 600px) 95vw, (max-width: 1000px) 70vw, 48vw"
                quality={85}
              />
            </div>
            <div className="floating-note note-code">
              <span className="note-icon">
                <Code2 size={19} />
              </span>
              <div>
                <span className="note-caption">THE FOUNDATION</span>
                <span>Clean code. Clear thinking.</span>
              </div>
            </div>
            <div className="floating-note note-ai">
              <span className="note-icon violet">
                <Sparkles size={19} />
              </span>
              <div>
                <span className="note-caption">THE POSSIBILITIES</span>
                <span>Intelligence, with purpose.</span>
              </div>
            </div>
            <div className="visual-caption mono" aria-hidden="true">
              <span className="caption-dot" /> CONNECTED BY DESIGN{" "}
              <span className="caption-line" /> 01 / ∞
            </div>
          </div>
        </div>
        <div className="hero-bottom">
          <a href="#about" className="scroll-indicator">
            <span className="scroll-circle">
              <ArrowDown size={17} aria-hidden="true" />
            </span>
            SCROLL TO EXPLORE
          </a>
          <span className="global-note">
            <Globe2 size={15} aria-hidden="true" />
            Based in Pakistan. Building for the world.
            <ArrowRight size={14} aria-hidden="true" />
          </span>
        </div>
      </div>
    </section>
  );
}

export function TechStrip() {
  return (
    <div className="tech-strip">
      <div className="container tech-strip-inner">
        <span className="tech-strip-label mono">
          A THOUGHTFUL STACK.
          <br />
          <span>LIMITLESS POSSIBILITIES.</span>
        </span>
        <div className="tech-strip-logos">
          <span>
            <BrandIcon name="react" size={25} />
            React
          </span>
          <span>
            <BrandIcon name="nextdotjs" size={24} />
            Next.js
          </span>
          <span>
            <BrandIcon name="typescript" size={22} />
            TypeScript
          </span>
          <span>
            <BrandIcon name="python" size={24} />
            Python
          </span>
          <span>
            <Sparkles size={24} />
            OpenAI
          </span>
          <span>
            <BrandIcon name="postgresql" size={24} />
            PostgreSQL
          </span>
        </div>
      </div>
    </div>
  );
}
