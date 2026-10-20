import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function Loading() {
  return (
    <>
      <Header />
      <main id="contenu">
        <p className="sr-only" role="status">
          Chargement du projet…
        </p>
        <section className="section section--border">
          <div className="container case-head">
            <span className="skeleton skeleton--badge" aria-hidden="true" />
            <div className="skeleton skeleton--title" aria-hidden="true" />
            <div className="skeleton skeleton--text" aria-hidden="true" />
            <div className="skeleton skeleton--text" aria-hidden="true" />
          </div>
        </section>
        <section className="section section--border">
          <div className="container">
            <div className="skeleton skeleton--visual" aria-hidden="true" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
