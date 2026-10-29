import { ImageResponse } from "next/og";
import { LogoMark } from "@/lib/og";

// Généré au build (export statique pour Cloudflare).
export const dynamic = "force-static";

// Version 192 px pour Google, qui ignore les icônes de moins de 48 px (icon.tsx reste à 32 px pour les onglets).
// Île en pleine taille (100 %) pour rester lisible une fois réduite à 16 px dans Google.
export const size = { width: 192, height: 192 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(<LogoMark size={192} scale={1} />, size);
}
