import { site } from "@/config/site";
import { Reveal } from "@/components/ui/Reveal";

export function Services() {
  return (
    <section
      id="services"
      className="section section--alt section--border"
      aria-labelledby="services-title"
    >
      <div className="container">
        <Reveal>
          <h2 className="h2" id="services-title">
            Ce que nous faisons
          </h2>
        </Reveal>

        <Reveal>
          <ul className="services">
            {site.services.map((s) => (
              <li key={s.id} className="service">
                <h3 className="service__title">{s.title}</h3>
                <p className="muted">{s.description}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
