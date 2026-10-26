import { ImageResponse } from "next/og";
import { site } from "@/config/site";
import { brandColors, logoPath } from "@/lib/seo";

export const ogSize = { width: 1200, height: 630 };

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
export function renderOgImage({
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
          }}
        >
          {eyebrow}
        </span>
        <span style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1, letterSpacing: -1 }}>
          {title}
        </span>
        <span style={{ fontSize: 30, lineHeight: 1.4, color: brandColors.textMuted }}>
          {description}
        </span>
      </div>
    </div>,
    ogSize,
  );
}
