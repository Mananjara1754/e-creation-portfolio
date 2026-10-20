import { site } from "@/config/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  return (
    <section id="apropos" className="section section--border" aria-labelledby="about-title">
      <div className="container about">
        <Reveal className="about__intro">
          <SectionHeading label="QUI NOUS SOMMES" id="about-title">
            Une équipe technique. Une vision créative. Des solutions concrètes.
          </SectionHeading>
          <p className="lead">
            Nous réunissons les compétences du développement logiciel et du design produit pour
            accompagner la création d&apos;expériences numériques utiles, intuitives et évolutives.
            De la première idée à la mise en production, nous cherchons le bon équilibre entre
            esthétique, performance et simplicité.
          </p>
        </Reveal>

        <Reveal className="about__list" delay={100}>
          <ol className="principles">
            {site.principles.map((p) => (
              <li key={p.number} className="principle">
                <span className="principle__num">{p.number}</span>
                <div>
                  <h3 className="h3">{p.title}</h3>
                  <p className="muted">{p.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
