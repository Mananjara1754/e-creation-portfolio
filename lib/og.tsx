import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/config/site";
import { brandColors } from "@/lib/seo";

export const ogSize = { width: 1200, height: 630 };

// next/og ne lit pas le WOFF2 : on prend les .woff de @fontsource/poppins, lus au build.
const fontDir = join(process.cwd(), "node_modules/@fontsource/poppins/files");

function loadPoppins() {
  return Promise.all(
    ([400, 500, 700] as const).map(async (weight) => ({
      name: "Poppins",
      data: await readFile(join(fontDir, `poppins-latin-${weight}-normal.woff`)),
      weight,
      style: "normal" as const,
    })),
  );
}

/**
 * Île stylisée du logo, simplifiée (sans le détail en rotation, non supporté au rendu).
 * `scale` : part du carré occupée par le dessin (plus grand pour les petites icônes).
 */
export function LogoMark({ size, scale = 0.6 }: { size: number; scale?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.26,
        background: brandColors.bg,
        border: `1px solid ${brandColors.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width={size * scale} height={size * scale} viewBox="0 0 48 48" fill="none">
        <polygon
          points="31.1,3 33.3,7.6 34.2,12.3 34.7,13.5 32.4,14.5 31.5,22.5 29.9,27.5 28.3,32.1 26.7,37.2 24.3,44.2 18.8,46 14.8,41.5 14.3,38.9 13.6,33.9 16.3,29.3 16.6,26 15.4,22.2 16.6,16.4 22.2,14.8 25.5,11.3 27.9,7.6 30.3,4.4"
          fill={brandColors.accent}
        />
        <polygon
          points="25.5,11.3 27.9,7.6 30.3,4.4 31.1,3 28,12.5"
          fill={brandColors.accentDim}
        />
        <polygon points="28,12.5 32.4,14.5 31.5,22.5 25,26" fill={brandColors.accentDim} />
        <polygon points="16.3,29.3 16.6,26 15.4,22.2 16.6,16.4 25,26" fill={brandColors.accentDim} />
        <polygon
          points="21.5,38 26.7,37.2 24.3,44.2 18.8,46 14.8,41.5 14.3,38.9"
          fill={brandColors.accentDim}
        />
        <circle cx="26" cy="25" r="5.2" fill="none" stroke={brandColors.accent2} strokeWidth="1.4" />
        <circle cx="26" cy="25" r="2.4" fill={brandColors.accent2} />
      </svg>
    </div>
  );
}

/** Image de partage 1200×630 : logo, surtitre, titre, description. */
export async function renderOgImage({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: brandColors.bg,
        color: brandColors.text,
        fontFamily: "Poppins",
        borderBottom: `12px solid ${brandColors.accent}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <LogoMark size={64} />
        <span style={{ fontSize: 36, fontWeight: 700 }}>{site.companyName}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <span
          style={{
            display: "flex",
            alignSelf: "flex-start",
            padding: "8px 20px",
            borderRadius: 999,
            border: `2px solid ${brandColors.border}`,
            color: brandColors.accent,
            fontSize: 26,
            fontWeight: 500,
          }}
        >
          {eyebrow}
        </span>
        <span style={{ fontSize: 60, fontWeight: 700, lineHeight: 1.15, letterSpacing: -1.5 }}>
          {title}
        </span>
        <span style={{ fontSize: 30, lineHeight: 1.4, color: brandColors.textMuted }}>
          {description}
        </span>
      </div>
    </div>,
    { ...ogSize, fonts: await loadPoppins() },
  );
}
