"use client";

import { Github } from "@/components/ui";
import { PageLink as Link } from "@/components/page-link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, MoveUpRight, Sparkles } from "lucide-react";
import { projects, type Project } from "@/lib/projects";
import { site } from "@/lib/site";
import { ProjectPreview } from "./project-preview";
import { ExternalLink, SectionLabel } from "./ui";
import { Reveal } from "./reveal";

const filters = ["All work", "AI & systems", "Web experiences"] as const;

function ProjectCard({
  project,
  featured,
}: {
  project: Project;
  featured: boolean;
}) {
  return (
    <article
      className={`project-card ${featured ? "featured-project" : ""}`}
      aria-labelledby={`project-${project.slug}`}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="project-visual-link"
        aria-label={`Explore ${project.name}`}
      >
        <ProjectPreview slug={project.slug} />
        <span className="project-hover-label">
          Explore project <ArrowUpRight size={17} />
        </span>
      </Link>
      <div className="project-content">
        <div className="project-kicker">
          {featured ? (
            <>
              <Sparkles size={12} aria-hidden="true" /> FEATURED PROJECT{" "}
              <span className="kicker-slash">/</span> AI & SYSTEMS
            </>
          ) : (
            project.kind
          )}
        </div>
        <div className="project-title-row">
          <h3 id={`project-${project.slug}`}>
            <Link href={`/projects/${project.slug}`}>{project.name}</Link>
          </h3>
          {!featured && (
            <Link
              href={`/projects/${project.slug}`}
              className="project-arrow"
              aria-label={`Read about ${project.name}`}
            >
              <MoveUpRight size={20} />
            </Link>
          )}
        </div>
        <p className="project-description">{project.description}</p>
        <p className="project-purpose">
          <span>THE PURPOSE</span>
          {project.problem}
        </p>
        <div className="project-tags">
          {project.technologies.slice(0, featured ? 5 : 4).map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
        <div className="project-links">
          <Link
            href={`/projects/${project.slug}`}
            className={
              featured ? "button button-light button-small" : "text-link"
            }
          >
            Explore project <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
          <ExternalLink
            href={project.liveUrl}
            className="text-link"
            label={`${project.name} live demo`}
          >
            Live demo
          </ExternalLink>
          {project.githubUrl && (
            <ExternalLink
              href={project.githubUrl}
              className="project-github"
              label={`${project.name} GitHub repository`}
              showIcon={false}
            >
              <Github size={18} />
              <span className="sr-only">GitHub repository</span>
            </ExternalLink>
          )}
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All work");
  const reducedMotion = useReducedMotion();
  const visible = projects.filter(
    (project) => filter === "All work" || project.category === filter,
  );
  return (
    <section
      id="work"
      className="section work-section"
      aria-labelledby="work-heading"
    >
      <div className="container">
        <Reveal>
          <SectionLabel number="03">SELECTED WORK</SectionLabel>
          <div className="section-heading-row">
            <h2 id="work-heading">
              Ideas made real.
              <br />
              <span className="muted-heading">
                One thoughtful build at a time.
              </span>
            </h2>
            <p>
              A selection of web experiences and intelligent
              <br className="desktop-break" /> tools. Built to be explored, not
              just displayed.
            </p>
          </div>
          <div className="work-toolbar">
            <div
              className="project-filters"
              role="group"
              aria-label="Filter projects"
            >
              {filters.map((item) => (
                <button
                  type="button"
                  key={item}
                  aria-pressed={item === filter}
                  className={item === filter ? "selected" : ""}
                  onClick={() => setFilter(item)}
                >
                  {item}
                  <span>
                    {String(
                      item === "All work"
                        ? projects.length
                        : projects.filter((p) => p.category === item).length,
                    ).padStart(2, "0")}
                  </span>
                </button>
              ))}
            </div>
            <span className="work-counter mono">
              CRAFTED WITH INTENTION <span>↙</span>
            </span>
          </div>
        </Reveal>
        <p className="sr-only" aria-live="polite">
          Showing {visible.length}{" "}
          {filter === "All work"
            ? "projects"
            : filter.toLowerCase() + " projects"}
        </p>
        <motion.div layout={!reducedMotion} className="projects-grid">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.div
                className={
                  project.slug === "prospectai-studio"
                    ? "project-span-full"
                    : ""
                }
                key={project.slug}
                layout={!reducedMotion}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: reducedMotion ? 0 : 0.3 }}
              >
                <ProjectCard
                  project={project}
                  featured={project.slug === "prospectai-studio"}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        <div className="work-bottom">
          <span>Real projects. A look at how I think and build.</span>
          <ExternalLink href={site.github} className="text-link">
            More on GitHub <ArrowRight size={15} aria-hidden="true" />
          </ExternalLink>
        </div>
      </div>
    </section>
  );
}
