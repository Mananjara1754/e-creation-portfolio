import { site } from "@/config/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Stack() {
  if (site.stack.length === 0) return null;

  return (
    <section className="section section--border" aria-labelledby="stack-title">
      <div className="container stack">
        <Reveal className="stack__intro">
          <SectionHeading label="NOTRE STACK" id="stack-title">
            Les bons outils pour les bons besoins.
          </SectionHeading>
          <p className="muted">
            Technologies déclarées par {site.companyName}. D&apos;autres pourront être ajoutées au
            fil des projets.
          </p>
        </Reveal>

        <Reveal className="stack__groups" delay={100}>
          {site.stack.map((group) => (
            <div key={group.title} className="stack__group">
              <h3 className="stack__title">{group.title}</h3>
              <ul className="stack__items">
                {group.items.map((item) => (
                  <li key={item} className="chip">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
