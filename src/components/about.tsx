import {
  ArrowUpRight,
  Bot,
  Braces,
  Fingerprint,
  Layers3,
  PanelsTopLeft,
} from "lucide-react";
import { Reveal } from "./reveal";
import { SectionLabel } from "./ui";
import { site } from "@/lib/site";
import styles from "./about.module.css";

const productLayers = [
  {
    icon: PanelsTopLeft,
    title: "The experience",
    description: "Clear interfaces. Considered interactions.",
    label: "FRONTEND",
  },
  {
    icon: Layers3,
    title: "The foundation",
    description: "Connected APIs. Well-structured data.",
    label: "BACKEND",
  },
  {
    icon: Bot,
    title: "The intelligence",
    description: "Practical AI. Purposeful automation.",
    label: "AI & AGENTS",
  },
];

export function About() {
  return (
    <section
      id="about"
      className="section about-section"
      aria-labelledby="about-heading"
    >
      <div className="container">
        <Reveal>
          <SectionLabel number="01">BEHIND THE BUILD</SectionLabel>
        </Reveal>
        <div className={styles.grid}>
          <Reveal className={`about-copy ${styles.copy}`}>
            <h2 id="about-heading">
              Thoughtful by design.
              <br />
              <span className="muted-heading">Purposeful in code.</span>
            </h2>
            <p className={styles.intro}>
              I’m {site.name}, a developer who cares as much about{" "}
              <span>how a product feels</span> as how it works.
            </p>
            <p>
              I connect considered interfaces with reliable backend systems to
              build digital products that solve practical problems. My work
              spans full-stack web development, AI integrations, and intelligent
              automation.
            </p>
            <p>
              I start with the people using the product, ask the right
              questions, and build with clarity—so the result is useful today
              and maintainable tomorrow.
            </p>
            <a href="#contact" className="text-link">
              A good project starts with a conversation{" "}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </Reveal>
          <Reveal className={styles.system} delay={0.1}>
            <div className={styles.systemHeader}>
              <span className="mono">FULL-STACK THINKING</span>
              <span className={styles.systemMark} aria-hidden="true">
                ↗
              </span>
            </div>
            <p className={styles.systemTitle}>
              Not just the interface.
              <br />
              <span>The whole experience.</span>
            </p>
            <ol className={styles.layers}>
              {productLayers.map((layer, index) => (
                <li key={layer.title}>
                  <span className={styles.layerIcon}>
                    <layer.icon
                      size={21}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </span>
                  <div>
                    <span className={styles.layerLabel}>{layer.label}</span>
                    <h3>{layer.title}</h3>
                    <p>{layer.description}</p>
                  </div>
                  <span className={styles.layerIndex} aria-hidden="true">
                    0{index + 1}
                  </span>
                </li>
              ))}
            </ol>
            <div className={styles.systemFooter}>
              <span className="status-dot" /> Different layers. One connected
              product.
            </div>
          </Reveal>
        </div>
        <Reveal>
          <div className={styles.principles}>
            <div>
              <Fingerprint size={23} strokeWidth={1.5} aria-hidden="true" />
              <span>
                <strong>People before features</strong>
                <span>Useful, intuitive, and accessible.</span>
              </span>
            </div>
            <div>
              <Layers3 size={23} strokeWidth={1.5} aria-hidden="true" />
              <span>
                <strong>Built to evolve</strong>
                <span>Considered architecture. Maintainable code.</span>
              </span>
            </div>
            <div>
              <Braces size={23} strokeWidth={1.5} aria-hidden="true" />
              <span>
                <strong>The details matter</strong>
                <span>From the first interaction to the final handoff.</span>
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
