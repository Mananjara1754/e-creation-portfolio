import { site } from "@/config/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Process() {
  return (
    <section className="section section--alt section--border" aria-labelledby="process-title">
      <div className="container">
        <Reveal>
          <SectionHeading label="NOTRE APPROCHE" id="process-title">
            Du concept à la mise en production.
          </SectionHeading>
        </Reveal>

        <ol className="steps">
          {site.process.map((s, i) => (
            <li key={s.number} className="step">
              <Reveal delay={i * 80}>
                <span className="step__dot" aria-hidden="true" />
                <span className="step__num">{s.number}</span>
                <h3 className="h3">{s.title}</h3>
                <p className="muted">{s.description}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
