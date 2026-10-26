import { ArrowUpRight } from "lucide-react";
import { BrowserMockup, CodeCard, PhoneMockup } from "@/components/visuals/Mockups";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  return (
    <section id="accueil" className="hero" aria-labelledby="hero-title">
      <div className="container hero__inner">
        <div className="hero__text">
          <Reveal>
            <span className="pill">
              <span className="pill__dot" aria-hidden="true" />
              Agence de développement digital
            </span>
            <h1 className="h1" id="hero-title">
              Sites web et applications mobiles qui transforment vos idées en{" "}
              <span className="accent">expériences digitales</span> performantes.
            </h1>
            <p className="hero__lead">
              Du design UI/UX au développement web, mobile et backend, nous concevons des solutions
              numériques pensées pour vos utilisateurs et vos ambitions.
            </p>
            <div className="hero__actions">
              <a className="btn btn--accent btn--lg" href="#contact">
                Parlons de votre projet
              </a>
              <a className="btn btn--ghost btn--lg" href="#projets">
                Explorer nos réalisations
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
            <ul className="hero__meta" aria-label="Domaines d'expertise">
              <li>WEB</li>
              <li>BACKEND</li>
              <li>MOBILE</li>
              <li>UI/UX</li>
            </ul>
          </Reveal>
        </div>

        <div className="hero__visualwrap">
          <Reveal delay={120}>
            <div className="hero__visual">
              <div className="hero__window">
                <BrowserMockup variant="hero" />
              </div>
              <div className="hero__code">
                <CodeCard />
              </div>
              <div className="hero__phone">
                <PhoneMockup variant="home" />
              </div>
            </div>
            <p className="caption">Interfaces conceptuelles de démonstration.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
