import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { absoluteUrl } from "@/lib/seo";

// Pas de lastModified : mieux vaut aucune date qu'une date fausse.
export default function sitemap(): MetadataRoute.Sitemap {
  const projects = site.projects
    .filter((p) => p.caseStudy)
    .map((p) => ({ url: absoluteUrl(`/projets/${p.id}`) }));

  return [{ url: absoluteUrl("/") }, ...projects];
}
