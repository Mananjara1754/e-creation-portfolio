import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { site } from "@/config/site";
import { baseOpenGraph, defaultTitle, siteUrl } from "@/lib/seo";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: defaultTitle, template: `%s | ${site.companyName}` },
  description: site.description,
  applicationName: site.companyName,
  openGraph: { ...baseOpenGraph, title: defaultTitle, description: site.description },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#0B0D0F",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={site.locale} className={poppins.variable}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
