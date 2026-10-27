import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { site } from "@/config/site";
import type { Service } from "@/config/site.types";
import { absoluteUrl, baseOpenGraph } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { CaseStudyLinkIcon } from "@/components/ui/CaseStudyLinkIcon";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function getService(slug: string) {
  return site.services.find((s) => s.slug === slug) ?? null;
}

// Slug inconnu : vrai 404 plutôt qu'une page rendue à la demande.
export const dynamicParams = false;

export function generateStaticParams() {
  return site.services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const path = `/services/${slug}`;
  return {
    title: service.heading,
    description: service.intro,
    alternates: { canonical: path },
    openGraph: {
      ...baseOpenGraph,
      title: `${service.heading} | ${site.companyName}`,
      description: service.intro,
      url: path,
    },
  };
}

function getStructuredData(service: Service) {
  const url = absoluteUrl(`/services/${service.slug}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Services", item: absoluteUrl("/#services") },
          { "@type": "ListItem", position: 3, name: service.title, item: url },
        ],
      },
      {
        "@type": "Service",
        name: service.heading,
        serviceType: service.title,
        description: service.intro,
        url,
        provider: { "@id": absoluteUrl("/#organisation") },
      },
    ],
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const stack = site.stack.filter((g) => service.stackGroups.includes(g.title));
  const projects = site.projects.filter(
    (p) => p.caseStudyHref && p.services.includes(service.title),
  );
  const others = site.services.filter((s) => s !== service);

  return (
    <>
      <JsonLd data={getStructuredData(service)} />
      <a className="skip-link" href="#contenu">
        Aller au contenu
      </a>
      <Header />
      <main id="contenu">
        <section className="section section--border">
          <div className="container case-head">
            <Reveal>
              <Link className="textlink case-back" href="/#services">
                <ArrowLeft size={15} aria-hidden="true" /> Retour aux services
              </Link>
              <div className="badges">
                <span className="badge badge--accent">{service.title}</span>
              </div>
              <h1 className="h1 case-title">{service.heading}</h1>
              <p className="lead">{service.intro}</p>
              <div className="hero__actions case-actions">
                <Link className="btn btn--accent btn--lg" href="/#contact">
                  Discuter de ce besoin <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section section--border">
          <div className="container">
            <Reveal>
              <h2 className="h3">Ce que nous faisons</h2>
            </Reveal>
            <div className="case-features">
              {service.includes.map((item, i) => (
                <Reveal key={item} delay={i * 60} className="case-features__item">
                  <Check size={16} aria-hidden="true" className="accent" />
                  <span>{item}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--alt section--border">
          <div className="container">
            <Reveal>
              <h2 className="h3">Notre méthode</h2>
              <ol className="steps">
                {site.process.map((s) => (
                  <li key={s.number} className="step">
                    <span className="step__dot" aria-hidden="true" />
                    <span className="step__num">{s.number}</span>
                    <h3 className="h3">{s.title}</h3>
                    <p className="muted">{s.description}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>

        {stack.length > 0 && (
          <section className="section section--border">
            <div className="container">
              <Reveal>
                <h2 className="h3">Technologies</h2>
              </Reveal>
              <div className="case-stack">
                {stack.map((group) => (
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
              </div>
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section className="section section--border">
            <div className="container">
              <Reveal>
                <h2 className="h3">Projets réalisés</h2>
              </Reveal>
              <div className="service-projects">
                {projects.map((p, i) => (
                  <Reveal key={p.id} delay={i * 60} className="service-projects__cell">
                    <article className="card service-project">
                      <span className="badge badge--accent">{p.kind}</span>
                      <h3 className="pcard__title">{p.name}</h3>
                      <p className="muted">{p.summary}</p>
                      <Link className="textlink stretched-link" href={p.caseStudyHref!}>
                        Découvrir le projet <CaseStudyLinkIcon />
                      </Link>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="section section--border">
          <div className="container">
            <Reveal>
              <h2 className="h3">Nos autres services</h2>
              <ul className="service-links">
                {others.map((s) => (
                  <li key={s.id}>
                    <Link className="textlink" href={`/services/${s.slug}`}>
                      {s.title} <ArrowUpRight size={15} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <section className="cta" aria-labelledby="service-cta-title">
          <div className="container">
            <div className="cta__box">
              <div className="cta__text">
                <h2 className="cta__title" id="service-cta-title">
                  Un projet en tête ?
                </h2>
                <p className="cta__lead">
                  Parlons de votre besoin et voyons comment nous pouvons vous aider à le
                  concrétiser.
                </p>
              </div>
              <div className="cta__actions">
                <Link className="btn btn--dark btn--lg" href="/#contact">
                  Discuter de mon projet
                </Link>
                <Link className="btn btn--outline-dark btn--lg" href="/#projets">
                  Voir nos projets
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
