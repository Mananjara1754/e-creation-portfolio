import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { absoluteUrl } from "@/lib/seo";

// Généré au build (export statique pour Cloudflare).
export const dynamic = "force-static";

// Pas de lastModified : mieux vaut aucune date qu'une date fausse.
export default function sitemap(): MetadataRoute.Sitemap {
  const projects = site.projects
    .filter((p) => p.caseStudy)
    .map((p) => ({ url: absoluteUrl(`/projets/${p.id}`) }));

  const legal = [site.legal.privacyHref, site.legal.legalHref]
    .filter((href): href is string => Boolean(href))
    .map((href) => ({ url: absoluteUrl(href) }));

  return [{ url: absoluteUrl("/") }, ...projects, ...legal];
}
