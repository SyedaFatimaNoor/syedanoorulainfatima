import {
  ArrowUpRight,
  Blocks,
  Bot,
  Code2,
  DatabaseZap,
  LayoutDashboard,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "./reveal";
import { SectionLabel } from "./ui";

const services: {
  title: string;
  icon: LucideIcon;
  description: string;
  detail: string;
}[] = [
  {
    title: "Full-Stack Web Development",
    icon: Blocks,
    description:
      "From a clear product idea to a connected application. Interfaces, business logic, and data working together.",
    detail: "WEB APPS · PLATFORMS · MVPs",
  },
  {
    title: "AI-Powered Applications",
    icon: Sparkles,
    description:
      "Put AI to practical use with contextual assistants, document search, and intelligent features inside your product.",
    detail: "AI INTEGRATIONS · RAG · ASSISTANTS",
  },
  {
    title: "AI Agents & Automation",
    icon: Bot,
    description:
      "Reduce repetitive work with focused agents and connected workflows, with sensible safeguards and human oversight.",
    detail: "AGENT WORKFLOWS · TOOL INTEGRATION",
  },
  {
    title: "Custom Dashboard Development",
    icon: LayoutDashboard,
    description:
      "Turn complex information into a clear workspace. Manage operations, explore data, and make informed decisions.",
    detail: "ADMIN PANELS · INTERNAL TOOLS",
  },
  {
    title: "API & Backend Development",
    icon: DatabaseZap,
    description:
      "A dependable foundation for your application: structured APIs, authentication, and data models designed around your needs.",
    detail: "REST APIs · AUTH · DATABASES",
  },
  {
    title: "Responsive Frontend Development",
    icon: Code2,
    description:
      "Bring your design to life with fast, accessible interfaces that feel considered on every screen, from mobile to desktop.",
    detail: "REACT · NEXT.JS · DESIGN SYSTEMS",
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="section services-section"
      aria-labelledby="services-heading"
    >
      <div className="container">
        <Reveal>
          <SectionLabel number="04">WHAT WE CAN BUILD</SectionLabel>
          <div className="section-heading-row">
            <h2 id="services-heading">
              Your ambition.
              <br />
              <span className="muted-heading">My next build.</span>
            </h2>
            <p>
              Practical development for businesses, startups,
              <br className="desktop-break" /> and teams with something
              meaningful to make.
            </p>
          </div>
        </Reveal>
        <div className="services-grid">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.04}>
              <a
                href={`#contact`}
                className="service-card"
                aria-label={`Discuss ${service.title}`}
              >
                <div className="service-top">
                  <service.icon
                    size={27}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <span className="mono">0{index + 1}</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="service-bottom">
                  <span className="mono">{service.detail}</span>
                  <ArrowUpRight size={19} aria-hidden="true" />
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
