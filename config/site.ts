import type { SiteConfig } from "./site.types";

/**
 * Toutes les données modifiables du site sont ici.
 * Ne rien afficher qui ne soit pas confirmé : coordonnées, liens, projets réels, technologies.
 */
export const site: SiteConfig = {
  companyName: "E-Creation",
  locale: "fr",
  demoMode: true,
  description:
    "E-Creation conçoit et développe des sites web, applications mobiles, API et interfaces UI/UX pour transformer vos idées en produits numériques.",
  nav: [
    { label: "Accueil", href: "#accueil" },
    { label: "Services", href: "#services" },
    { label: "Projets", href: "#projets" },
    { label: "À propos", href: "#apropos" },
    { label: "Contact", href: "#contact" },
  ],
  // À renseigner : email, whatsapp (numéro réel au format international sans "+")
  contact: {},
  contactTypes: [
    "Site web ou application web",
    "Backend & API",
    "Application mobile",
    "UI/UX Design",
    "Autre",
  ],
  // À renseigner : { label: "LinkedIn", href: "https://..." }
  socials: [],
  // À renseigner uniquement si les pages existent
  legal: {},
  principles: [
    {
      number: "01",
      title: "Conception centrée utilisateur",
      description: "Chaque écran part d'un besoin réel et d'un parcours compréhensible.",
    },
    {
      number: "02",
      title: "Excellence technique",
      description: "Un code structuré, testé et pensé pour durer et évoluer.",
    },
    {
      number: "03",
      title: "Collaboration transparente",
      description: "Vous savez où en est votre projet, à chaque étape.",
    },
  ],
  services: [
    {
      id: "web",
      number: "01",
      icon: "monitor",
      title: "Développement Web",
      description:
        "Sites web, applications métier, plateformes SaaS et interfaces web responsives.",
    },
    {
      id: "backend",
      number: "02",
      icon: "server",
      title: "Backend & API",
      description: "Architecture serveur, bases de données, API sécurisées et intégrations.",
    },
    {
      id: "mobile",
      number: "03",
      icon: "smartphone",
      title: "Développement Mobile",
      description: "Applications Android et iOS conçues pour une expérience fluide et cohérente.",
    },
    {
      id: "uiux",
      number: "04",
      icon: "pen-tool",
      title: "UI/UX Design",
      description: "Recherche, wireframes, maquettes haute fidélité, prototypes et design systems.",
    },
  ],
  // Projets de démonstration : à remplacer par les réalisations réelles.
  projects: [
    {
      id: "pilotage",
      name: "Tableau de bord de pilotage",
      kind: "Dashboard",
      featured: true,
      isDemo: true,
      visual: "dashboard",
      summary: "Rendre lisibles des données dispersées pour aider une équipe à décider plus vite.",
      services: ["UI/UX Design", "Développement Web"],
    },
    {
      id: "suivi",
      name: "Application de suivi au quotidien",
      kind: "Application mobile",
      isDemo: true,
      visual: "mobile",
      summary:
        "Un parcours mobile simple pour suivre des tâches et des échanges depuis son téléphone.",
      services: ["UI/UX Design", "Développement Mobile"],
    },
    {
      id: "boutique",
      name: "Boutique en ligne sur mesure",
      kind: "Plateforme e-commerce",
      isDemo: true,
      visual: "shop",
      summary: "Un catalogue clair et un parcours d'achat fluide, avec un espace d'administration.",
      services: ["UI/UX Design", "Web", "Backend & API"],
    },
  ],
  // Technologies fournies par E-Creation. N'en ajouter aucune autre sans confirmation.
  stack: [
    { title: "FRONTEND", items: ["React", "Next.js", "Angular"] },
    { title: "MOBILE", items: ["Flutter", "React Native"] },
    { title: "BACKEND", items: ["Node.js", "Java", ".NET"] },
    { title: "DESIGN", items: ["Figma"] },
    { title: "DONNÉES", items: ["PostgreSQL"] },
    { title: "CLOUD", items: ["AWS", "GCP"] },
  ],
  process: [
    {
      number: "01",
      title: "Comprendre",
      description:
        "Nous analysons vos besoins, vos objectifs, vos utilisateurs et vos contraintes.",
    },
    {
      number: "02",
      title: "Concevoir",
      description:
        "Nous définissons l'expérience, les parcours utilisateurs et la direction visuelle.",
    },
    {
      number: "03",
      title: "Développer",
      description:
        "Nous construisons la solution, intégrons les fonctionnalités et testons son fonctionnement.",
    },
    {
      number: "04",
      title: "Livrer & améliorer",
      description:
        "Nous validons le produit, préparons sa mise en ligne et identifions les améliorations pertinentes.",
    },
  ],
};
