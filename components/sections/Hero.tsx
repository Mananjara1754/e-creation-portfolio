import { BrowserMockup, PhoneMockup } from "@/components/visuals/Mockups";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  return (
    <section id="accueil" className="hero" aria-labelledby="hero-title">
      <div className="container hero__inner">
        <div className="hero__text">
          <Reveal>
            <h1 className="h1" id="hero-title">
              Sites, applications et API, du design à la mise en ligne.
            </h1>
            <p className="hero__lead">
              Nous concevons et développons vos produits numériques : interfaces UI/UX, applications
              web et mobiles, backend. La même équipe s&apos;occupe du design et du code.
            </p>
            <div className="hero__actions">
              <a className="btn btn--accent btn--lg" href="#contact">
                Parlons de votre projet
              </a>
              <a className="btn btn--ghost btn--lg" href="#projets">
                Voir les projets
              </a>
            </div>
          </Reveal>
        </div>

        <div className="hero__visualwrap">
          <Reveal delay={120}>
            <div className="hero__visual">
              <div className="hero__window">
                <BrowserMockup variant="hero" />
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
