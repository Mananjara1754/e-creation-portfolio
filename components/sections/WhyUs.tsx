import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const axes = [
  {
    title: "Comprendre avant de choisir",
    text: "Nous cherchons à comprendre le problème avant de choisir la solution, pour ne construire que ce qui sert vraiment.",
  },
  {
    title: "L'expérience autant que le code",
    text: "Nous accordons autant d'importance à l'expérience utilisateur qu'à la qualité technique.",
  },
  {
    title: "Une communication claire",
    text: "Nous privilégions des échanges simples et réguliers tout au long du projet.",
  },
];

export function WhyUs() {
  return (
    <section className="section section--alt section--border" aria-labelledby="why-title">
      <div className="container">
        <Reveal>
          <SectionHeading label="POURQUOI NOUS" id="why-title">
            Plus qu&apos;une exécution technique : une vraie réflexion produit.
          </SectionHeading>
        </Reveal>

        <div className="why">
          {axes.map((a, i) => (
            <Reveal key={a.title} delay={i * 80} className="why__cell">
              <article className="card why__card">
                <h3 className="h3">{a.title}</h3>
                <p className="muted">{a.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
