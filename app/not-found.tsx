import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <a className="skip-link" href="#contenu">
        Aller au contenu
      </a>
      <Header />
      <main id="contenu">
        <section className="section">
          <div className="container case-head">
            <h1 className="h1 case-title">Page introuvable</h1>
            <p className="lead">
              Cette page n&apos;existe pas ou a été déplacée. Retrouvez nos services et nos
              réalisations depuis l&apos;accueil.
            </p>
            <div className="hero__actions case-actions">
              <Link className="btn btn--accent btn--lg" href="/">
                Retour à l&apos;accueil
              </Link>
              <Link className="btn btn--ghost btn--lg" href="/#projets">
                Voir nos projets
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
