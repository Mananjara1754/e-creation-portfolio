import { ImageResponse } from "next/og";
import { brandColors } from "@/lib/seo";
import { LogoMark } from "@/lib/og";

// Sert aussi de logo (≥ 112 px) dans les données structurées Organization.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: brandColors.bg,
      }}
    >
      <LogoMark size={128} />
    </div>,
    size,
  );
}
