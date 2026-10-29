import type { Metadata } from "next";
import { site } from "@/config/site";
import { absoluteUrl, baseOpenGraph, defaultTitle, siteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ExpertiseBand } from "@/components/sections/ExpertiseBand";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { Approach } from "@/components/sections/Approach";
import { Stack } from "@/components/sections/Stack";
import { FinalCta } from "@/components/sections/FinalCta";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { ...baseOpenGraph, title: defaultTitle, description: site.description, url: "/" },
};

// Uniquement des informations confirmées (pas d'adresse ni de contact tant qu'ils sont vides).
// ProfessionalService (sous-type de LocalBusiness) : aide la recherche locale.
// Pas d'areaServed : l'agence travaille avec des clients partout.
const organizationId = absoluteUrl("/#organisation");
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": organizationId,
      name: site.companyName,
      url: siteUrl,
      logo: absoluteUrl("/apple-icon"),
      description: site.description,
      knowsAbout: site.services.map((s) => s.title),
      ...(site.location
        ? {
            address: {
              "@type": "PostalAddress",
              addressLocality: site.location.city,
              addressCountry: site.location.countryCode,
            },
          }
        : {}),
      ...(site.contact.email ? { email: site.contact.email } : {}),
      ...(site.socials.length > 0 ? { sameAs: site.socials.map((s) => s.href) } : {}),
    },
    {
      "@type": "WebSite",
      "@id": absoluteUrl("/#site"),
      name: site.companyName,
      url: siteUrl,
      inLanguage: site.locale,
      publisher: { "@id": organizationId },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <a className="skip-link" href="#contenu">
        Aller au contenu
      </a>
      <Header />
      <main id="contenu">
        <Hero />
        <ExpertiseBand />
        <Services />
        <Projects />
        <Approach />
        <Stack />
        <FinalCta />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
