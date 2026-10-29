import type { ReactNode } from "react";
import { ArrowUpRight, Mail, MapPin, MessageCircle } from "lucide-react";
import { site } from "@/config/site";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/sections/ContactForm";

interface ChannelProps {
  icon: ReactNode;
  label: string;
  children: ReactNode;
  href?: string;
  /** Lien externe : nouvel onglet. */
  external?: boolean;
}

/** Une ligne de coordonnées ; cliquable sur toute sa surface quand elle a un lien. */
function Channel({ icon, label, children, href, external }: ChannelProps) {
  const content = (
    <>
      <span className="contact__icon" aria-hidden="true">
        {icon}
      </span>
      <span className="contact__text">
        <span className="contact__label">{label}</span>
        <span className="contact__value">{children}</span>
      </span>
      {href && <ArrowUpRight size={16} aria-hidden="true" className="contact__arrow" />}
    </>
  );
  return (
    <li>
      {href ? (
        <a
          className="contact__channel contact__channel--link"
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {content}
          {external && <span className="sr-only">(nouvel onglet)</span>}
        </a>
      ) : (
        <div className="contact__channel">{content}</div>
      )}
    </li>
  );
}

// Déroulé repris de la FAQ validée (devis gratuit après un échange).
const nextSteps = [
  "Vous décrivez votre projet",
  "Nous vous répondons pour en discuter",
  "Vous recevez un devis gratuit",
];

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

          <ul className="contact__channels">
            {email ? (
              <Channel icon={<Mail size={18} />} label="E-mail" href={`mailto:${email}`}>
                {email}
              </Channel>
            ) : (
              demo && (
                <Channel icon={<Mail size={18} />} label="E-mail">
                  <span className="muted">[adresse à renseigner]</span>
                </Channel>
              )
            )}
            {whatsapp ? (
              <Channel
                icon={<MessageCircle size={18} />}
                label="WhatsApp"
                href={`https://wa.me/${whatsapp}`}
                external
              >
                Nous écrire sur WhatsApp
              </Channel>
            ) : (
              demo && (
                <Channel icon={<MessageCircle size={18} />} label="WhatsApp">
                  <span className="muted">[numéro à renseigner]</span>
                </Channel>
              )
            )}
            {site.socials.length > 0
              ? site.socials.map((s) => (
                  <Channel
                    key={s.href}
                    icon={
                      s.icon ? <SocialIcon name={s.icon} size={18} /> : <ArrowUpRight size={18} />
                    }
                    label={s.label}
                    href={s.href}
                    external
                  >
                    {s.name ?? site.companyName}
                  </Channel>
                ))
              : demo && (
                  <Channel icon={<ArrowUpRight size={18} />} label="Réseaux">
                    <span className="muted">[liens à renseigner]</span>
                  </Channel>
                )}
            {site.location && (
              <Channel icon={<MapPin size={18} />} label="Basés à">
                {site.location.city}, {site.location.country} · clients partout, à distance
              </Channel>
            )}
          </ul>

          <div className="contact__next">
            <h3 className="contact__next-title">Comment ça se passe</h3>
            <ol className="contact__steps">
              {nextSteps.map((step, i) => (
                <li key={step} className="contact__step">
                  <span className="contact__step-num" aria-hidden="true">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <Reveal className="contact__formwrap" delay={100}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
