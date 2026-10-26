import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, Code2 } from "lucide-react";
import { site } from "@/config/site";
import type { Project, ProjectCaseStudy } from "@/config/site.types";
import { absoluteUrl, baseOpenGraph } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectVisual } from "@/components/sections/Projects";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function getProject(slug: string) {
  const project = site.projects.find((p) => p.id === slug);
  return project?.caseStudy ? { project, caseStudy: project.caseStudy } : null;
}

// Slug inconnu : vrai 404 plutôt qu'une page rendue à la demande.
export const dynamicParams = false;

export function generateStaticParams() {
  return site.projects.filter((p) => p.caseStudy).map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const found = getProject(slug);
  if (!found) notFound();
  const path = `/projets/${slug}`;
  return {
    title: found.project.name,
    description: found.caseStudy.tagline,
    alternates: { canonical: path },
    openGraph: {
      ...baseOpenGraph,
      type: "article",
      title: `${found.project.name} | ${site.companyName}`,
      description: found.caseStudy.tagline,
      url: path,
    },
  };
}

function getStructuredData(slug: string, project: Project, caseStudy: ProjectCaseStudy) {
  const url = absoluteUrl(`/projets/${slug}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Projets", item: absoluteUrl("/#projets") },
          { "@type": "ListItem", position: 3, name: project.name, item: url },
        ],
      },
      {
        "@type": caseStudy.repoHref ? "SoftwareSourceCode" : "CreativeWork",
        name: project.name,
        description: caseStudy.tagline,
        url,
        inLanguage: site.locale,
        keywords: project.technologies?.join(", "),
        ...(caseStudy.repoHref ? { codeRepository: caseStudy.repoHref } : {}),
        creator: { "@id": absoluteUrl("/#organisation") },
      },
    ],
  };
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const found = getProject(slug);
  if (!found) notFound();
  const { project, caseStudy } = found;

  return (
    <>
      <JsonLd data={getStructuredData(slug, project, caseStudy)} />
      <a className="skip-link" href="#contenu">
        Aller au contenu
      </a>
      <Header />
      <main id="contenu">
        <section className="section section--border">
          <div className="container case-head">
            <Reveal>
              <Link className="textlink case-back" href="/#projets">
                <ArrowLeft size={15} aria-hidden="true" /> Retour aux projets
              </Link>
              <div className="badges">
                <span className="badge badge--accent">{project.kind}</span>
                {project.isDemo && <span className="badge">Concept</span>}
              </div>
              <h1 className="h1 case-title">{project.name}</h1>
              <p className="lead">{caseStudy.tagline}</p>
              <div className="hero__actions case-actions">
                {caseStudy.repoHref && (
                  <a
                    className="btn btn--ghost btn--lg"
                    href={caseStudy.repoHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Code2 size={16} aria-hidden="true" /> Voir le code sur GitHub
                  </a>
                )}
                {caseStudy.demoHref && (
                  <a
                    className="btn btn--accent btn--lg"
                    href={caseStudy.demoHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Voir la démo <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                )}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section section--border">
          <div className="container">
            <Reveal>
              <div className="case-visual">
                <ProjectVisual visual={project.visual} />
              </div>
              <p className="caption">Interface conceptuelle de démonstration.</p>
            </Reveal>
          </div>
        </section>

        <section className="section section--border">
          <div className="container case-grid">
            <Reveal className="case-block">
              <h2 className="h3">Le besoin</h2>
              <p className="muted">{caseStudy.context}</p>
            </Reveal>
            <Reveal className="case-block" delay={80}>
              <h2 className="h3">La solution</h2>
              <p className="muted">{caseStudy.solution}</p>
            </Reveal>
          </div>
        </section>

        <section className="section section--border">
          <div className="container">
            <Reveal>
              <h2 className="h3">Fonctionnalités clés</h2>
            </Reveal>
            <div className="case-features">
              {caseStudy.features.map((feature, i) => (
                <Reveal key={feature} delay={i * 60} className="case-features__item">
                  <Check size={16} aria-hidden="true" className="accent" />
                  <span>{feature}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--border">
          <div className="container">
            <Reveal>
              <h2 className="h3">Technologies utilisées</h2>
            </Reveal>
            <div className="case-stack">
              {caseStudy.stack.map((group) => (
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

        <section className="section section--alt section--border">
          <div className="container">
            <Reveal>
              <h2 className="h3">Pourquoi ça compte pour vous</h2>
            </Reveal>
            <div className="case-features">
              {caseStudy.highlights.map((highlight, i) => (
                <Reveal key={highlight} delay={i * 60} className="case-features__item">
                  <Check size={16} aria-hidden="true" className="accent" />
                  <span>{highlight}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="cta" aria-labelledby="case-cta-title">
          <div className="container">
            <div className="cta__box">
              <div className="cta__text">
                <h2 className="cta__title" id="case-cta-title">
                  Un besoin similaire ?
                </h2>
                <p className="cta__lead">
                  Parlons de votre projet et voyons comment nous pouvons vous aider à le
                  concrétiser.
                </p>
              </div>
              <div className="cta__actions">
                <Link className="btn btn--dark btn--lg" href="/#contact">
                  Discuter de mon projet
                </Link>
                <Link className="btn btn--outline-dark btn--lg" href="/#projets">
                  Voir d&apos;autres projets
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
