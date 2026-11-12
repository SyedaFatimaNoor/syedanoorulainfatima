"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  Globe2,
  MapPin,
  Sparkles,
} from "lucide-react";
import { BrandIcon, ExternalLink, Linkedin } from "./ui";
import { site } from "@/lib/site";
import portrait from "../../public/images/noor-portrait.webp";
import styles from "./hero.module.css";

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
    <section
      className={`portrait-hero ${styles.hero}`}
      aria-labelledby="hero-heading"
    >
      <div className="container">
        <div className={styles.topline}>
          <span className={styles.availability}>
            <span className="status-dot" /> OPEN TO COLLABORATION
          </span>
          <span className={styles.edition}>
            INDEPENDENT DEVELOPER <span>/</span> BASED IN KARACHI
          </span>
        </div>
        <div className={styles.grid}>
          <div className={styles.copy}>
            <div className={styles.intro}>
              <span>
                Hello, I’m Noor<span className={styles.introDot}>.</span>
              </span>
              <span className={styles.introDivider} aria-hidden="true" />
              <span className={`role-text ${styles.role}`} aria-hidden="true">
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
            <h1 id="hero-heading" className={styles.title}>
              I build digital
              <br />
              products with
              <br />
              <span className={styles.accent}>intelligence.</span>
            </h1>
            <p className={styles.description}>
              Thoughtful web products, intelligent systems, and AI-powered
              experiences. Designed around people. Built to work together.
            </p>
            <div className={styles.actions}>
              <a href="#work" className="button button-primary">
                Explore my work <ArrowDownRight size={19} aria-hidden="true" />
              </a>
              <a href="#contact" className="button button-secondary">
                Let’s build together{" "}
                <ArrowUpRight size={19} aria-hidden="true" />
              </a>
            </div>
            <div className={`hero-socials ${styles.socials}`}>
              <span className={styles.socialLabel}>FIND ME ONLINE</span>
              <ExternalLink
                href={site.github}
                className="social-link"
                label="Noor on GitHub"
                showIcon={false}
              >
                <BrandIcon name="github" size={18} /> GitHub{" "}
                <ArrowUpRight size={13} aria-hidden="true" />
              </ExternalLink>
              {linkedin && (
                <ExternalLink
                  href={linkedin}
                  className="social-link"
                  label="Noor on LinkedIn"
                  showIcon={false}
                >
                  <Linkedin size={18} /> LinkedIn{" "}
                  <ArrowUpRight size={13} aria-hidden="true" />
                </ExternalLink>
              )}
            </div>
          </div>
          <div className={styles.portraitWrap}>
            <figure className={styles.portraitCard}>
              <div className={styles.portraitBackdrop} aria-hidden="true" />
              <Image
                src={portrait}
                alt="Syeda Noor Fatima wearing a black hijab"
                className={`hero-portrait ${styles.photo}`}
                priority
                sizes="(max-width: 599px) 90vw, (max-width: 699px) 480px, (max-width: 1200px) 42vw, 475px"
                quality={85}
              />
              <figcaption className={styles.portraitCaption}>
                <div>
                  <span>DESIGN-MINDED. SYSTEMS-DRIVEN.</span>
                  <strong>{site.name}</strong>
                </div>
                <span className={styles.captionMark} aria-hidden="true">
                  n.
                </span>
              </figcaption>
            </figure>
            <div className={styles.portraitFootnote}>
              <span>
                <MapPin size={14} aria-hidden="true" /> Karachi, Pakistan
              </span>
              <span>
                <span className={styles.openDot} /> Open to the world
              </span>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <a href="#about" className={styles.scrollLink}>
            <span>
              <ArrowDown size={17} aria-hidden="true" />
            </span>{" "}
            A LITTLE MORE ABOUT ME
          </a>
          <span className={styles.globalNote}>
            <Globe2 size={16} aria-hidden="true" /> Thoughtful work. Wherever
            you are.
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
          FROM INTERFACE
          <br />
          <span>TO INTELLIGENCE.</span>
        </span>
        <div className="tech-strip-logos">
          <span>
            <BrandIcon name="react" size={25} /> React
          </span>
          <span>
            <BrandIcon name="nextdotjs" size={24} /> Next.js
          </span>
          <span>
            <BrandIcon name="typescript" size={22} /> TypeScript
          </span>
          <span>
            <BrandIcon name="python" size={24} /> Python
          </span>
          <span>
            <Sparkles size={24} aria-hidden="true" /> OpenAI
          </span>
          <span>
            <BrandIcon name="postgresql" size={24} /> PostgreSQL
          </span>
        </div>
      </div>
    </div>
  );
}
