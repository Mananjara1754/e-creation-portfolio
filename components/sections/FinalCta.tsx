import { Reveal } from "@/components/ui/Reveal";

export function FinalCta() {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <div className="container">
        <Reveal>
          <div className="cta__box">
            <div className="cta__text">
              <h2 className="cta__title" id="cta-title">
                Vous avez une idée ? Construisons-la ensemble.
              </h2>
              <p className="cta__lead">
                Parlons de votre besoin, de vos objectifs et de la meilleure manière de transformer
                votre idée en solution digitale.
              </p>
            </div>
            <div className="cta__actions">
              <a className="btn btn--dark btn--lg" href="#contact">
                Démarrer une discussion
              </a>
              <a className="btn btn--outline-dark btn--lg" href="#projets">
                Découvrir nos projets
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
