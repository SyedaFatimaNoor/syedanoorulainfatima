import type { Metadata } from "next";
import { PageLink as Link } from "@/components/page-link";
import { Github } from "@/components/ui";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, LockKeyhole } from "lucide-react";
import { getProject, projects } from "@/lib/projects";
import { getSiteUrl } from "@/lib/site";
import { ProjectPreview } from "@/components/project-preview";
import { ExternalLink } from "@/components/ui";
import { Reveal } from "@/components/reveal";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  const canonical = getSiteUrl();
  return {
    title: project.name,
    description: project.description,
    ...(canonical
      ? { alternates: { canonical: `${canonical}/projects/${slug}` } }
      : {}),
    openGraph: {
      title: `${project.name} — A project by Noor`,
      description: project.description,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const nextProject =
    projects[(projects.indexOf(project) + 1) % projects.length];
  return (
    <main id="main" className="project-page">
      <div className="container">
        <Link href="/#work" className="breadcrumb">
          <ArrowLeft size={14} aria-hidden="true" />
          Back to selected work
        </Link>
        <div className="case-header">
          <div>
            <span className="project-kicker">
              {project.category} <span className="kicker-slash">/</span>{" "}
              SELECTED WORK
            </span>
            <h1>
              {project.name}
              <span>.</span>
            </h1>
          </div>
          <div className="case-header-description">
            <p>{project.description}</p>
            <div className="case-header-links">
              <ExternalLink
                href={project.liveUrl}
                className="button button-primary"
                label={`${project.name} live demo`}
              >
                Visit live project
              </ExternalLink>
              {project.githubUrl ? (
                <ExternalLink
                  href={project.githubUrl}
                  className="text-link"
                  label={`${project.name} GitHub repository`}
                >
                  <Github size={16} aria-hidden="true" />
                  View source
                </ExternalLink>
              ) : (
                <span className="private-source">
                  <LockKeyhole size={13} aria-hidden="true" />
                  Source not publicly available
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="case-preview">
          <ProjectPreview slug={slug} large />
        </div>
        <p className="preview-disclosure">{project.previewNote}</p>
        <dl className="case-meta">
          <div>
            <dt>PROJECT</dt>
            <dd>{project.kind}</dd>
          </div>
          <div>
            <dt>FOCUS</dt>
            <dd>{project.category}</dd>
          </div>
          <div>
            <dt>VERIFIED TECHNOLOGIES</dt>
            <dd>
              <div className="project-tags">
                {project.technologies.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </dd>
          </div>
        </dl>
        <div className="case-story">
          <Reveal>
            <span className="project-kicker">01 / THE CONTEXT</span>
            <h2>A problem worth solving.</h2>
            <p>{project.problem}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <span className="project-kicker">02 / THE APPROACH</span>
            <h2>A considered response.</h2>
            <p>{project.approach}</p>
          </Reveal>
        </div>
        <section
          className="case-capabilities"
          aria-labelledby="capabilities-heading"
        >
          <h2 id="capabilities-heading">Inside the experience.</h2>
          <div className="capability-grid">
            {project.capabilities.map((capability, index) => (
              <Reveal key={capability.title} delay={index * 0.05}>
                <article className="capability-card">
                  <span>0{index + 1}</span>
                  <h3>{capability.title}</h3>
                  <p>{capability.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
        <aside className="project-scope">
          <h2>A clear picture of the project.</h2>
          <p>{project.sourceNote}</p>
        </aside>
        <div className="case-bottom">
          <div>
            <span>NEXT IN SELECTED WORK</span>
            <Link
              href={`/projects/${nextProject.slug}`}
              className="next-project-link"
            >
              {nextProject.name}
              <ArrowUpRight size={24} aria-hidden="true" />
            </Link>
          </div>
          <Link href="/#contact" className="button button-secondary">
            Have something in mind? <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </main>
  );
}
