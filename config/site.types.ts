export type Locale = "fr";

export interface NavLink {
  label: string;
  href: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ServiceUseCase {
  label: string;
  /** `id` d'un projet réalisé : lien vers son étude de cas. */
  projectId?: string;
}

export type ServiceIcon = "monitor" | "server" | "smartphone" | "pen-tool";

export interface Service {
  id: string;
  /** URL de la page dédiée : /services/{slug}. */
  slug: string;
  number: string;
  title: string;
  description: string;
  icon: ServiceIcon;
  /** h1 de la page dédiée (mots-clés recherchés par les clients). */
  heading: string;
  intro: string;
  includes: string[];
  /** Titres des groupes de `stack` liés à ce service. */
  stackGroups: string[];
  /** Section "Pour quels projets ?" de la page dédiée. */
  audience: string;
  useCases: ServiceUseCase[];
  /** Questions propres à ce service, affichées avant celles de `faq`. */
  faq?: FaqItem[];
}

export type ProjectVisual = "dashboard" | "mobile" | "shop" | "chat";

export interface ProjectCaseStudy {
  tagline: string;
  context: string;
  solution: string;
  features: string[];
  highlights: string[];
  stack: StackGroup[];
  repoHref?: string;
  demoHref?: string;
}

export interface Project {
  id: string;
  name: string;
  /** Type de projet : "Dashboard", "Application mobile"... */
  kind: string;
  summary: string;
  services: string[];
  /** Absent : "à renseigner" en mode démo, ligne masquée sinon. */
  technologies?: string[];
  featured?: boolean;
  /** true : badge "Concept". */
  isDemo: boolean;
  /** Affiché uniquement si défini ET si la page existe réellement. */
  caseStudyHref?: string;
  /** Contenu détaillé affiché sur la page dédiée (app/projets/[slug]). */
  caseStudy?: ProjectCaseStudy;
  visual: ProjectVisual;
}

export interface StackGroup {
  title: string;
  items: string[];
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface Principle {
  title: string;
  description: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface SiteConfig {
  companyName: string;
  locale: Locale;
  /** true : affiche des emplacements "à renseigner" (coordonnées, projets). À passer à false en production. */
  demoMode: boolean;
  description: string;
  tagline?: string;
  nav: NavLink[];
  /** Ville et pays affichés (pas d'adresse postale tant qu'elle n'est pas fournie). */
  location?: { city: string; country: string; countryCode: string };
  contact: { email?: string; whatsapp?: string };
  contactTypes: string[];
  socials: SocialLink[];
  legal: { privacyHref?: string; legalHref?: string };
  principles: Principle[];
  services: Service[];
  projects: Project[];
  stack: StackGroup[];
  process: ProcessStep[];
  /** Questions communes, affichées sur chaque page de service. Réponses validées par E-Creation. */
  faq: FaqItem[];
}
