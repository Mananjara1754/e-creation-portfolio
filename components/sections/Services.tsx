import { ArrowUpRight, Monitor, PenTool, Server, Smartphone, type LucideIcon } from "lucide-react";
import { site } from "@/config/site";
import type { ServiceIcon } from "@/config/site.types";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons: Record<ServiceIcon, LucideIcon> = {
  monitor: Monitor,
  server: Server,
  smartphone: Smartphone,
  "pen-tool": PenTool,
};

export function Services() {
  return (
    <section
      id="services"
      className="section section--alt section--border"
      aria-labelledby="services-title"
    >
      <div className="container">
        <Reveal className="split-head">
          <div className="split-head__title">
            <SectionHeading label="NOS EXPERTISES" id="services-title">
              Tout ce qu&apos;il faut pour donner vie à votre produit digital.
            </SectionHeading>
          </div>
          <p className="muted split-head__text">
            Des premières maquettes à l&apos;architecture technique, nous vous accompagnons dans les
            différentes étapes de création de votre solution.
          </p>
        </Reveal>

        <div className="services">
          {site.services.map((s, i) => {
            const Icon = icons[s.icon];
            return (
              <Reveal key={s.id} delay={i * 60} className="services__cell">
                <article className="card service">
                  <div className="service__top">
                    <span className="service__num">{s.number}</span>
                    <Icon size={28} strokeWidth={1.6} className="accent" aria-hidden="true" />
                  </div>
                  <h3 className="service__title">{s.title}</h3>
                  <p className="muted">{s.description}</p>
                  <a className="textlink" href="#contact">
                    Discuter de ce besoin <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
