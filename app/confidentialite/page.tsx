import type { Metadata } from "next";
import { site } from "@/config/site";
import { baseOpenGraph } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const title = "Politique de confidentialité";
const description = `Données collectées par le formulaire de contact de ${site.companyName}, usage, destinataires et droits.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/confidentialite" },
  openGraph: {
    ...baseOpenGraph,
    title: `${title} | ${site.companyName}`,
    description,
    url: "/confidentialite",
  },
};

// Uniquement ce que le site fait réellement (voir worker/contact.ts) et les prestataires utilisés.
export default function PrivacyPage() {
  const email = site.contact.email;
  const location = site.location ? `${site.location.city}, ${site.location.country}` : null;

  return (
    <>
      <a className="skip-link" href="#contenu">
        Aller au contenu
      </a>
      <Header />
      <main id="contenu">
        <section className="section">
          <div className="container legal">
            <h1 className="h1 case-title">{title}</h1>
            <p className="lead">Dernière mise à jour : 26 octobre 2026.</p>

            <h2 className="h3">Qui est responsable</h2>
            <p>
              {site.companyName}
              {location && `, basée à ${location}`}.
              {email && (
                <>
                  {" "}
                  Pour toute question sur vos données : <a href={`mailto:${email}`}>{email}</a>.
                </>
              )}
            </p>

            <h2 className="h3">Ce que nous collectons</h2>
            <p>
              Uniquement ce que vous saisissez dans le formulaire de contact : votre nom, votre
              adresse e-mail, le type de projet et votre message. Le site n&apos;utilise ni cookies,
              ni outil de mesure d&apos;audience, ni publicité.
            </p>
            <p>
              Votre adresse IP est utilisée de façon temporaire, sans être enregistrée par nos
              soins, pour limiter les envois abusifs du formulaire.
            </p>

            <h2 className="h3">Pourquoi</h2>
            <p>
              Pour répondre à votre demande et échanger avec vous sur votre projet. Vos données ne
              sont ni vendues, ni utilisées pour de la prospection non sollicitée.
            </p>

            <h2 className="h3">Qui les reçoit</h2>
            <ul className="legal__list">
              <li>{site.companyName}, destinataire de votre message.</li>
              <li>
                Resend, service qui achemine le message du formulaire jusqu&apos;à notre boîte mail.
              </li>
              <li>OVHcloud, qui héberge notre messagerie.</li>
              <li>
                Cloudflare, qui héberge le site et traite les données techniques de connexion
                nécessaires à son fonctionnement et à sa sécurité, dont la vérification anti-robot
                du formulaire (Turnstile, sans cookie).
              </li>
            </ul>
            <p>
              Ces prestataires peuvent être situés hors de Madagascar, notamment en Europe et aux
              États-Unis.
            </p>

            <h2 className="h3">Combien de temps</h2>
            <p>
              Le temps nécessaire pour répondre à votre demande et assurer le suivi de nos échanges,
              puis vos messages sont supprimés.
            </p>

            <h2 className="h3">Vos droits</h2>
            <p>
              Vous pouvez demander à consulter, corriger ou supprimer vos données à tout moment
              {email ? (
                <>
                  {" "}
                  en écrivant à <a href={`mailto:${email}`}>{email}</a>
                </>
              ) : null}
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
