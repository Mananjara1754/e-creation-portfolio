import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ExpertiseBand } from "@/components/sections/ExpertiseBand";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { Process } from "@/components/sections/Process";
import { Stack } from "@/components/sections/Stack";
import { WhyUs } from "@/components/sections/WhyUs";
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
        <About />
        <Services />
        <Projects />
        <Process />
        <Stack />
        <WhyUs />
        <FinalCta />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
