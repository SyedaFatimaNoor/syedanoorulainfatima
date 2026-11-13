import type { Metadata } from "next";
import { Hero, TechStrip } from "@/components/hero";
import { About } from "@/components/about";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { Services } from "@/components/services";
import { Process } from "@/components/process";
import { Contact } from "@/components/contact";
import {
  getContactChannels,
  getSiteUrl,
  isEmailDeliveryConfigured,
  site,
} from "@/lib/site";

export const metadata: Metadata = {
  ...(getSiteUrl() ? { alternates: { canonical: getSiteUrl() } } : {}),
};

export default function Home() {
  const channels = getContactChannels();
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    alternateName: site.shortName,
    jobTitle: ["Full-Stack Developer", "AI Engineer", "AI Agent Developer"],
    description: site.description,
    email: site.email,
    ...(getSiteUrl()
      ? {
          url: getSiteUrl(),
          image: `${getSiteUrl()}/images/noor-portrait.webp`,
        }
      : {}),
    sameAs: [site.github, ...(channels.linkedin ? [channels.linkedin] : [])],
    knowsAbout: [
      "Full-stack development",
      "React",
      "Next.js",
      "AI agents",
      "Retrieval-Augmented Generation",
      "REST APIs",
      "Database architecture",
    ],
  };
  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(person).replace(/</g, "\\u003c"),
        }}
      />
      <Hero linkedin={channels.linkedin} />
      <TechStrip />
      <About />
      <Skills />
      <Projects />
      <Services />
      <Process />
      <Contact {...channels} canSend={isEmailDeliveryConfigured()} />
    </main>
  );
}
