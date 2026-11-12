import {
  ArrowUpRight,
  Braces,
  Fingerprint,
  Globe2,
  Layers3,
} from "lucide-react";
import { Reveal } from "./reveal";
import { SectionLabel } from "./ui";
import { site } from "@/lib/site";

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
        <div className="about-grid">
          <Reveal className="about-copy">
            <h2 id="about-heading">
              Thoughtful by design.
              <br />
              <span className="muted-heading">Purposeful in code.</span>
            </h2>
            <p className="about-intro">
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
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </Reveal>
          <Reveal className="about-code-wrap" delay={0.1}>
            <div className="code-window">
              <div className="code-titlebar">
                <span className="window-dots">
                  <i />
                  <i />
                  <i />
                </span>
                <span>the-way-i-build.ts</span>
                <Braces size={14} aria-hidden="true" />
              </div>
              <div
                className="code-body"
                aria-label="My development approach: understand the problem, put people first, write maintainable code, and build something meaningful"
              >
                <div>
                  <span className="line-number">01</span>
                  <span className="code-comment">
                    {"// Good software starts with intention."}
                  </span>
                </div>
                <div>
                  <span className="line-number">02</span>
                </div>
                <div>
                  <span className="line-number">03</span>
                  <span>
                    <span className="syntax-purple">const</span>{" "}
                    <span className="syntax-blue">approach</span> = &#123;
                  </span>
                </div>
                <div>
                  <span className="line-number">04</span>
                  <span>
                    &nbsp; understand:{" "}
                    <span className="syntax-green">
                      &quot;the real problem&quot;
                    </span>
                    ,
                  </span>
                </div>
                <div>
                  <span className="line-number">05</span>
                  <span>
                    &nbsp; prioritise:{" "}
                    <span className="syntax-green">
                      &quot;the people using it&quot;
                    </span>
                    ,
                  </span>
                </div>
                <div>
                  <span className="line-number">06</span>
                  <span>
                    &nbsp; write:{" "}
                    <span className="syntax-green">
                      &quot;clear, maintainable code&quot;
                    </span>
                    ,
                  </span>
                </div>
                <div>
                  <span className="line-number">07</span>
                  <span>
                    &nbsp; build:{" "}
                    <span className="syntax-green">
                      &quot;something meaningful&quot;
                    </span>
                  </span>
                </div>
                <div>
                  <span className="line-number">08</span>
                  <span>&#125;;</span>
                </div>
                <div>
                  <span className="line-number">09</span>
                </div>
                <div>
                  <span className="line-number">10</span>
                  <span>
                    <span className="syntax-purple">export default</span>{" "}
                    <span className="syntax-blue">approach</span>;
                    <span className="code-caret" />
                  </span>
                </div>
              </div>
              <div className="code-status">
                <span>
                  <span className="status-dot" />
                  Always iterating.
                </span>
                <span>
                  TypeScript <span>UTF-8</span>
                </span>
              </div>
            </div>
            <div className="about-location">
              <Globe2 size={17} aria-hidden="true" />
              <span>
                Rooted in Karachi.
                <br />
                <strong>Thinking beyond borders.</strong>
              </span>
              <span className="location-lines" aria-hidden="true" />
            </div>
          </Reveal>
        </div>
        <Reveal>
          <div className="principles">
            <div>
              <Fingerprint size={22} aria-hidden="true" />
              <span>
                <strong>People before features</strong>
                <span>Useful, intuitive, and accessible.</span>
              </span>
            </div>
            <div>
              <Layers3 size={22} aria-hidden="true" />
              <span>
                <strong>Built to evolve</strong>
                <span>Considered architecture. Maintainable code.</span>
              </span>
            </div>
            <div>
              <Braces size={22} aria-hidden="true" />
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
