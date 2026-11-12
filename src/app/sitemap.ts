import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { getSiteUrl } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const url = getSiteUrl();
  // Do not publish an invented production URL or index a local development hostname.
  if (!url) return [];
  return [
    { url, changeFrequency: "monthly", priority: 1 },
    ...projects.map((p) => ({
      url: `${url}/projects/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${url}/privacy`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
