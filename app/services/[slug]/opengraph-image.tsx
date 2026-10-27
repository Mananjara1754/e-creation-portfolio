import { site } from "@/config/site";
import { ogSize, renderOgImage } from "@/lib/og";

// Généré au build (export statique pour Cloudflare).
export const dynamic = "force-static";

export const alt = `Services ${site.companyName}`;
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return site.services.map((s) => ({ slug: s.slug }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = site.services.find((s) => s.slug === slug);
  return renderOgImage({
    eyebrow: service?.title ?? "Services",
    title: service?.heading ?? site.companyName,
    description: service?.description ?? site.description,
  });
}
