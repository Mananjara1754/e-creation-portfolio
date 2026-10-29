import type { Metadata } from "next";
import { site } from "@/config/site";

/**
 * URL publique du site, base des canonicals, du sitemap et des données structurées.
 * Obligatoire en production : sans elle, Google recevrait des URL en localhost.
 */
const envSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
if (!envSiteUrl && process.env.NODE_ENV === "production") {
  throw new Error("NEXT_PUBLIC_SITE_URL doit être défini pour le build de production.");
}
export const siteUrl = (envSiteUrl || "http://localhost:3000").replace(/\/$/, "");

export function absoluteUrl(path = "/") {
  return new URL(path, `${siteUrl}/`).toString();
}

export const defaultTitle = `${site.companyName} | Création de sites web et d'applications à Madagascar`;

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
  accent: "#2dd4b0",
  accentDim: "#139e86",
  accent2: "#ffc83d",
  onAccent: "#0b0d0f",
  border: "#2b3036",
};
