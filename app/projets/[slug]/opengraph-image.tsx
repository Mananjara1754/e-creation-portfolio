import { site } from "@/config/site";
import { ogSize, renderOgImage } from "@/lib/og";

// Généré au build (export statique pour Cloudflare Pages).
export const dynamic = "force-static";

export const alt = `Étude de cas ${site.companyName}`;
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return site.projects.filter((p) => p.caseStudy).map((p) => ({ slug: p.id }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = site.projects.find((p) => p.id === slug);
  return renderOgImage({
    eyebrow: project?.kind ?? "Étude de cas",
    title: project?.name ?? site.companyName,
    description: project?.technologies?.join(" · ") ?? site.description,
  });
}
