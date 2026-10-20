import Link from "next/link";
import { site } from "@/config/site";
import type { Project } from "@/config/site.types";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CaseStudyLinkIcon } from "@/components/ui/CaseStudyLinkIcon";
import { BrowserMockup, PhoneMockup, type BrowserVariant } from "@/components/visuals/Mockups";

export function ProjectVisual({ visual }: { visual: Project["visual"] }) {
  if (visual === "mobile") {
    return (
      <div className="pvisual pvisual--phones">
        <PhoneMockup variant="list" />
        <PhoneMockup variant="detail" />
      </div>
    );
  }
  const variant: BrowserVariant = visual === "shop" || visual === "chat" ? visual : "dashboard";
  return (
    <div className="pvisual">
      <div className="pvisual__window">
        <BrowserMockup variant={variant} />
      </div>
    </div>
  );
}

function ProjectMeta({ project }: { project: Project }) {
  const showTech = project.technologies?.length || site.demoMode;
  return (
    <>
      <p className="pmeta">
        <strong>Services :</strong> {project.services.join(", ")}
      </p>
      {showTech && (
        <p className="pmeta">
          <strong>Technologies :</strong>{" "}
          {project.technologies?.length ? project.technologies.join(", ") : "à renseigner"}
        </p>
      )}
    </>
  );
}

function CaseStudy({ project }: { project: Project }) {
  if (project.caseStudyHref) {
    return (
      <Link className="textlink stretched-link" href={project.caseStudyHref}>
        Découvrir le projet <CaseStudyLinkIcon />
      </Link>
    );
  }
  return site.demoMode ? <p className="pmeta">Étude de cas à renseigner</p> : null;
}

export function Projects() {
  const featured = site.projects.find((p) => p.featured);
  const others = site.projects.filter((p) => p !== featured);
  const hasDemo = site.projects.some((p) => p.isDemo);

  return (
    <section id="projets" className="section section--border" aria-labelledby="projects-title">
      <div className="container">
        <Reveal className="projects__head">
          <SectionHeading label="SÉLECTION DE PROJETS" id="projects-title">
            Des idées devenues des produits concrets.
          </SectionHeading>
          <p className="muted projects__intro">
            Découvrez quelques exemples de notre approche du design et du développement, à travers
            des interfaces, des fonctionnalités et des solutions pensées pour répondre à des besoins
            précis.
          </p>
          {hasDemo && (
            <p className="note">Projets de démonstration : à remplacer par vos réalisations.</p>
          )}
        </Reveal>

        {featured && (
          <Reveal>
            <article className="card feature">
              <div className="feature__visual">
                <ProjectVisual visual={featured.visual} />
              </div>
              <div className="feature__text">
                <div className="badges">
                  <span className="badge badge--accent">PROJET MIS EN AVANT</span>
                  {featured.isDemo && <span className="badge">Concept</span>}
                </div>
                <h3 className="feature__title">{featured.name}</h3>
                <p className="muted">
                  Type : {featured.kind.toLowerCase()}. {featured.summary}
                </p>
                <ProjectMeta project={featured} />
                <div className="feature__foot">
                  <CaseStudy project={featured} />
                </div>
              </div>
            </article>
          </Reveal>
        )}

        <div className="projects__grid">
          {others.map((p, i) => (
            <Reveal key={p.id} delay={i * 80} className="projects__cell">
              <article className="card pcard">
                <div className="pcard__visual">
                  <ProjectVisual visual={p.visual} />
                </div>
                <div className="pcard__text">
                  <div className="badges">
                    <span className="badge">{p.kind}</span>
                    {p.isDemo && <span className="badge">Concept</span>}
                  </div>
                  <h3 className="pcard__title">{p.name}</h3>
                  <p className="muted">{p.summary}</p>
                  <ProjectMeta project={p} />
                  <CaseStudy project={p} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
