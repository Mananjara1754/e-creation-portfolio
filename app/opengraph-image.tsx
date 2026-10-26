import { site } from "@/config/site";
import { ogSize, renderOgImage } from "@/lib/og";

// Généré au build (export statique pour Cloudflare).
export const dynamic = "force-static";

export const alt = `${site.companyName}, agence de développement web, mobile, backend et UI/UX`;
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: "Agence de développement digital",
    title: "Sites web et applications mobiles qui transforment vos idées en expériences digitales.",
    description: "Web · Backend & API · Mobile · UI/UX Design",
  });
}
