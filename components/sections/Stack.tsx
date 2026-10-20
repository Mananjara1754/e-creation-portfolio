import { site } from "@/config/site";
import { Reveal } from "@/components/ui/Reveal";

export function Stack() {
  if (site.stack.length === 0) return null;

  return (
    <section className="section section--border" aria-labelledby="stack-title">
      <div className="container stack">
        <Reveal className="stack__intro">
          <h2 className="h2" id="stack-title">
            Technologies
          </h2>
          <p className="muted">Les outils avec lesquels nous travaillons.</p>
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
