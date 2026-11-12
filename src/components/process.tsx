import {
  ArrowRight,
  CheckCheck,
  Compass,
  GitBranch,
  Layers3,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "./reveal";
import { SectionLabel } from "./ui";

const steps: { title: string; icon: LucideIcon; description: string }[] = [
  {
    title: "Discovery & Requirements",
    icon: Compass,
    description:
      "Understand your goals, your users, and what a useful outcome looks like.",
  },
  {
    title: "Planning & Architecture",
    icon: GitBranch,
    description:
      "Map the experience, define the scope, and choose a considered technical approach.",
  },
  {
    title: "UI/UX & Development",
    icon: Layers3,
    description:
      "Build the interface and system in clear, reviewable steps, with room for feedback.",
  },
  {
    title: "Integration & Testing",
    icon: CheckCheck,
    description:
      "Connect the pieces. Check real workflows, accessibility, and responsive behaviour.",
  },
  {
    title: "Deployment & Delivery",
    icon: Rocket,
    description:
      "Launch with care, document the essentials, and make the handoff straightforward.",
  },
];

export function Process() {
  return (
    <section
      id="process"
      className="section process-section"
      aria-labelledby="process-heading"
    >
      <div className="container">
        <Reveal>
          <SectionLabel number="05">A CLEAR WAY FORWARD</SectionLabel>
          <div className="section-heading-row">
            <h2 id="process-heading">
              Good work.
              <br />
              <span className="muted-heading">Doesn’t happen by accident.</span>
            </h2>
            <p>
              A collaborative process, with clarity at every stage.
              <br className="desktop-break" /> No black boxes. No unnecessary
              complexity.
            </p>
          </div>
        </Reveal>
        <ol className="process-list">
          {steps.map((step, index) => (
            <li key={step.title}>
              <Reveal delay={index * 0.06}>
                <div className="process-step-top">
                  <span className="step-number mono">0{index + 1}</span>
                  {index < 4 && (
                    <ArrowRight
                      size={17}
                      className="step-arrow"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <step.icon
                  className="step-icon"
                  size={24}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </Reveal>
            </li>
          ))}
        </ol>
        <Reveal>
          <div className="process-note">
            <span className="status-dot" />
            Your vision stays at the centre. From our first conversation to the
            final delivery.
          </div>
        </Reveal>
      </div>
    </section>
  );
}
