import { site } from "@/config/site";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = `${site.companyName}, agence de développement web, mobile, backend et UI/UX`;
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: "Agence de développement digital",
    title: "Nous transformons vos idées en expériences digitales performantes.",
    description: "Web · Backend & API · Mobile · UI/UX Design",
  });
}
