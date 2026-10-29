import { site } from "@/config/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Approach() {
  return (
    <section
      id="approche"
      className="section section--alt section--border"
      aria-labelledby="approach-title"
    >
      <div className="container">
        <Reveal className="approach__intro">
          <SectionHeading label="NOTRE APPROCHE" id="approach-title">
            Notre méthode, du concept à la mise en production.
          </SectionHeading>
          <p className="lead">
            Nous réunissons développement logiciel et design produit. De la première idée à la mise
            en production, nous cherchons l&apos;équilibre entre clarté, performance et simplicité.
          </p>
        </Reveal>

        <Reveal>
          <ol className="steps">
            {site.process.map((s) => (
              <li key={s.number} className="step">
                <span className="step__dot" aria-hidden="true" />
                <span className="step__num">{s.number}</span>
                <h3 className="h3">{s.title}</h3>
                <p className="muted">{s.description}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal>
          <ul className="principles">
            {site.principles.map((p) => (
              <li key={p.title} className="principle">
                <h3 className="principle__title">{p.title}</h3>
                <p className="muted">{p.description}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
