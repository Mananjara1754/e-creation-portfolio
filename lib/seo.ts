import type { Metadata } from "next";
import { site } from "@/config/site";

/**
 * URL publique du site, base des canonicals, du sitemap et des données structurées.
 * Priorité : NEXT_PUBLIC_SITE_URL, puis le domaine de production fourni par Vercel, puis localhost.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

export function absoluteUrl(path = "/") {
  return new URL(path, `${siteUrl}/`).toString();
}

export const defaultTitle = `${site.companyName} | Agence de développement web, mobile et UI/UX`;

/** Open Graph commun : à étendre dans chaque page (les metadata enfants remplacent l'objet entier). */
export const baseOpenGraph = {
  siteName: site.companyName,
  locale: "fr_FR",
  type: "website",
} satisfies Metadata["openGraph"];

/**
 * Couleurs des images générées (icône, Open Graph) : le CSS n'y est pas disponible,
 * garder ces valeurs synchronisées avec les tokens de app/globals.css.
 */
export const brandColors = {
  bg: "#0b0d0f",
  surface: "#181c20",
  text: "#f5f5f0",
  textMuted: "#a0a6ad",
  accent: "#c7f36b",
  onAccent: "#0b0d0f",
  border: "#2b3036",
};

/** Tracé du logo (même que components/ui/Logo.tsx). */
export const logoPath = "M18 5H7v14h11M7 12h9";
