import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/config/site";
import { brandColors, logoPath } from "@/lib/seo";

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

export function LogoMark({ size }: { size: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.26,
        background: brandColors.accent,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        width={size * 0.53}
        height={size * 0.53}
        viewBox="0 0 24 24"
        fill="none"
        stroke={brandColors.onAccent}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={logoPath} />
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
