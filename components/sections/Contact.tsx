import { site } from "@/config/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/sections/ContactForm";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="contact__row">
      <span className="contact__label">{label}</span>
      <span className="contact__value">{children}</span>
    </div>
  );
}

export function Contact() {
  const { email, whatsapp } = site.contact;
  const demo = site.demoMode;

  return (
    <section id="contact" className="section section--border" aria-labelledby="contact-title">
      <div className="container contact">
        <Reveal className="contact__intro">
          <SectionHeading label="CONTACT" id="contact-title">
            Parlons de votre projet.
          </SectionHeading>
          <p className="muted">
            Décrivez votre besoin en quelques lignes. Nous revenons vers vous pour en discuter.
          </p>

          <div className="contact__rows">
            {email ? (
              <Row label="E-mail">
                <a className="navlink" href={`mailto:${email}`}>
                  {email}
                </a>
              </Row>
            ) : (
              demo && (
                <Row label="E-mail">
                  <span className="muted">[adresse à renseigner]</span>
                </Row>
              )
            )}
            {whatsapp ? (
              <Row label="WhatsApp">
                <a
                  className="navlink"
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Nous écrire sur WhatsApp <span className="sr-only">(nouvel onglet)</span>
                </a>
              </Row>
            ) : (
              demo && (
                <Row label="WhatsApp">
                  <span className="muted">[numéro à renseigner]</span>
                </Row>
              )
            )}
            {site.socials.length > 0 ? (
              <Row label="Réseaux">
                {site.socials.map((s, i) => (
                  <span key={s.href}>
                    {i > 0 && " · "}
                    <a className="navlink" href={s.href} target="_blank" rel="noopener noreferrer">
                      {s.label} <span className="sr-only">(nouvel onglet)</span>
                    </a>
                  </span>
                ))}
              </Row>
            ) : (
              demo && (
                <Row label="Réseaux">
                  <span className="muted">[liens à renseigner]</span>
                </Row>
              )
            )}
          </div>
        </Reveal>

        <Reveal className="contact__formwrap" delay={100}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
