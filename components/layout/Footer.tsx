import Link from "next/link";
import { site } from "@/config/site";
import { Logo } from "@/components/ui/Logo";
import { CurrentYear } from "@/components/ui/CurrentYear";

export function Footer() {
  const { email, whatsapp } = site.contact;
  const hasContact = Boolean(email || whatsapp || site.socials.length > 0);
  const hasLegal = Boolean(site.legal.privacyHref || site.legal.legalHref);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo />
            <p>{site.tagline ?? "Design et développement web, mobile et backend."}</p>
          </div>

          <nav className="footer__col" aria-label="Pied de page">
            <span className="footer__title">NAVIGATION</span>
            {site.nav.map((link) => (
              <Link key={link.href} className="navlink" href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>

          {hasContact && (
            <div className="footer__col">
              <span className="footer__title">CONTACT</span>
              {email && (
                <a className="navlink" href={`mailto:${email}`}>
                  {email}
                </a>
              )}
              {whatsapp && (
                <a
                  className="navlink"
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              )}
              {site.socials.map((s) => (
                <a
                  key={s.href}
                  className="navlink"
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.label}
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="footer__bottom">
          <span>
            © <CurrentYear /> {site.companyName}. Tous droits réservés.
          </span>
          {hasLegal && (
            <span className="footer__legal">
              {site.legal.legalHref && <a href={site.legal.legalHref}>Mentions légales</a>}
              {site.legal.privacyHref && (
                <a href={site.legal.privacyHref}>Politique de confidentialité</a>
              )}
            </span>
          )}
        </div>
      </div>
    </footer>
  );
}
