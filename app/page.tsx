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

export default function HomePage() {
  return (
    <>
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
