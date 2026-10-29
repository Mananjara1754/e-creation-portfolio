import { site } from "@/config/site";
import { absoluteUrl } from "@/lib/seo";

// Généré au build (export statique pour Cloudflare).
export const dynamic = "force-static";

/** Résumé du site pour les assistants IA (format llms.txt), tiré de config/site.ts. */
export function GET() {
  const { email } = site.contact;
  const lines = [
    `# ${site.companyName}`,
    "",
    `> ${site.description}`,
    "",
    "## Informations",
    "",
    ...(site.location
      ? [
          `- Basée à ${site.location.city}, ${site.location.country}, l'agence travaille aussi à distance avec des clients partout.`,
        ]
      : []),
    ...(email ? [`- E-mail : ${email}`] : []),
    ...site.socials.map((s) => `- ${s.label} (${s.name ?? site.companyName}) : ${s.href}`),
    `- Formulaire de contact : ${absoluteUrl("/#contact")}`,
    "",
    "## Services",
    "",
    ...site.services.map(
      (s) => `- [${s.heading}](${absoluteUrl(`/services/${s.slug}`)}) : ${s.description}`,
    ),
    "",
    "## Projets réalisés",
    "",
    ...site.projects
      .filter((p) => p.caseStudyHref)
      .map((p) => `- [${p.name}](${absoluteUrl(p.caseStudyHref!)}) : ${p.summary}`),
    "",
    "## Technologies",
    "",
    ...site.stack.map((g) => `- ${g.title} : ${g.items.join(", ")}`),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
