import { ImageResponse } from "next/og";
import { LogoMark } from "@/lib/og";

// Généré au build (export statique pour Cloudflare Pages).
export const dynamic = "force-static";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(<LogoMark size={32} />, size);
}
