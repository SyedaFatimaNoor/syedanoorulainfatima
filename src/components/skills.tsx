import {
  Bot,
  Braces,
  ChevronDown,
  Code2,
  Database,
  GitBranch,
  Network,
  Search,
  Server,
  ShieldCheck,
  Sparkles,
  SquareTerminal,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { BrandName } from "@/lib/brand-icons";
import { BrandIcon, SectionLabel } from "./ui";
import { Reveal } from "./reveal";

type Skill = {
  name: string;
  brand?: BrandName;
  icon?: LucideIcon;
  color?: string;
};
const categories: {
  title: string;
  number: string;
  label: string;
  icon: LucideIcon;
  skills: Skill[];
  description: string;
}[] = [
  {
    title: "Frontend development",
    number: "01",
    label: "THE EXPERIENCE",
    icon: Code2,
    description:
      "Responsive interfaces, reusable component systems, and carefully considered interactions that work across screen sizes.",
    skills: [
      { name: "HTML", brand: "html5" },
      { name: "CSS", brand: "css" },
      { name: "JavaScript", brand: "javascript" },
      { name: "TypeScript", brand: "typescript" },
      { name: "React", brand: "react" },
      { name: "Next.js", brand: "nextdotjs" },
      { name: "Tailwind CSS", brand: "tailwindcss" },
    ],
  },
  {
    title: "AI & machine learning",
    number: "02",
    label: "THE INTELLIGENCE",
    icon: Sparkles,
    description:
      "Practical AI integrations, retrieval-augmented generation, and agent workflows with clear boundaries and human review where it matters.",
    skills: [
      { name: "OpenAI SDK", icon: Sparkles, color: "#8fcfb7" },
      { name: "AI Agents", icon: Bot, color: "#b5a0f7" },
      { name: "AI Agent Development", icon: Workflow, color: "#b5a0f7" },
      { name: "RAG", icon: Search, color: "#8aaef5" },
      { name: "Python", brand: "python" },
    ],
  },
  {
    title: "Backend development",
    number: "03",
    label: "THE FOUNDATION",
    icon: Server,
    description:
      "Structured APIs, authenticated workflows, and application logic that connect the interface to the data it needs.",
    skills: [
      { name: "Node.js", brand: "nodedotjs" },
      { name: "Express.js", brand: "express" },
      { name: "REST APIs", icon: Network, color: "#8aaef5" },
      { name: "Authentication", icon: ShieldCheck, color: "#8fcfb7" },
    ],
  },
  {
    title: "Database & ORM",
    number: "04",
    label: "THE STRUCTURE",
    icon: Database,
    description:
      "Data modelling, deliberate schema design, and type-safe database access built around real application requirements.",
    skills: [
      { name: "MongoDB", brand: "mongodb" },
      { name: "MySQL", brand: "mysql" },
      { name: "PostgreSQL", brand: "postgresql" },
      { name: "Prisma", brand: "prisma" },
    ],
  },
  {
    title: "Tools & DevOps",
    number: "05",
    label: "THE WORKFLOW",
    icon: GitBranch,
    description:
      "Version-controlled collaboration, reproducible development environments, and a clear path from local development to deployment.",
    skills: [
      { name: "Git", brand: "git" },
      { name: "GitHub", brand: "github" },
      { name: "Docker", brand: "docker" },
      { name: "Vercel", brand: "vercel" },
      { name: "VS Code", icon: SquareTerminal, color: "#78baff" },
    ],
  },
];

export function Skills() {
  return (
    <section
      id="expertise"
      className="section skills-section"
      aria-labelledby="skills-heading"
    >
      <div className="container">
        <Reveal>
          <SectionLabel number="02">THE TOOLKIT</SectionLabel>
          <div className="section-heading-row">
            <h2 id="skills-heading">
              The right tools.
              <br />
              <span className="muted-heading">For the right problem.</span>
            </h2>
            <p>
              A connected skill set, from the first pixel
              <br className="desktop-break" /> to the intelligence behind the
              interface.
            </p>
          </div>
        </Reveal>
        <div className="skills-grid">
          {categories.map((category, index) => (
            <Reveal
              key={category.title}
              className={`skill-card-wrap skill-card-${index}`}
              delay={index * 0.04}
            >
              <article className="skill-card">
                <div className="skill-card-top">
                  <span className="category-icon">
                    <category.icon size={23} aria-hidden="true" />
                  </span>
                  <span className="mono category-number">
                    /{category.number}
                  </span>
                </div>
                <span className="skill-category-label mono">
                  {category.label}
                </span>
                <h3>{category.title}</h3>
                <ul className="skill-list">
                  {category.skills.map((skill) => (
                    <li
                      key={skill.name}
                      title={
                        skill.name === "RAG"
                          ? "Retrieval-Augmented Generation (RAG)"
                          : `${skill.name} · ${category.title}`
                      }
                    >
                      {skill.brand ? (
                        <BrandIcon name={skill.brand} size={17} colored />
                      ) : skill.icon ? (
                        <skill.icon
                          size={17}
                          color={skill.color}
                          aria-hidden="true"
                        />
                      ) : (
                        <Braces size={17} />
                      )}
                      <span>
                        {skill.name === "RAG" ? (
                          <abbr title="Retrieval-Augmented Generation">
                            RAG
                          </abbr>
                        ) : (
                          skill.name
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
                <details className="skill-details">
                  <summary>
                    How I use this <ChevronDown size={15} aria-hidden="true" />
                  </summary>
                  <p>{category.description}</p>
                </details>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="skills-footnote">
            <span className="tiny-plus" aria-hidden="true">
              +
            </span>
            Technology is the toolkit. Solving the right problem is the work.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
