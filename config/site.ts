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
    { label: "Accueil", href: "/#accueil" },
    { label: "Services", href: "/#services" },
    { label: "Projets", href: "/#projets" },
    { label: "Approche", href: "/#approche" },
    { label: "Contact", href: "/#contact" },
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
      title: "Comprendre avant de construire",
      description:
        "On part du problème et de vos utilisateurs, pas d'une solution toute faite. On ne construit que ce qui sert.",
    },
    {
      title: "L'expérience autant que le code",
      description:
        "Une interface claire et un code structuré, pensé pour évoluer : l'un ne va pas sans l'autre.",
    },
    {
      title: "Des échanges simples",
      description: "Des points réguliers tout au long du projet : vous savez où il en est.",
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
  // "notebooklm" est une réalisation réelle. Les autres restent des démonstrations à remplacer.
  projects: [
    {
      id: "notebooklm",
      name: "Assistant documentaire IA en local",
      kind: "Assistant IA conversationnel",
      featured: true,
      isDemo: false,
      visual: "chat",
      summary:
        "Un assistant façon NotebookLM qui répond à partir de vos propres documents, sans que vos données ne quittent votre infrastructure.",
      services: ["Backend & API", "UI/UX Design"],
      technologies: [
        "Python",
        "LangChain",
        "Ollama (Mistral)",
        "ChromaDB",
        "HuggingFace",
        "Streamlit",
      ],
      caseStudyHref: "/projets/notebooklm",
      caseStudy: {
        tagline:
          "Votre propre NotebookLM, hébergé en local : interrogez vos documents par chat, sans fuite de données vers le cloud.",
        context:
          "De nombreuses équipes veulent interroger leurs documents internes (contrats, rapports, notes) avec une IA conversationnelle, mais ne peuvent pas envoyer ces documents sensibles vers une API cloud externe pour des raisons de confidentialité ou de conformité.",
        solution:
          "Un assistant RAG (Retrieval-Augmented Generation) qui tourne entièrement en local : les documents sont découpés, vectorisés et indexés sur la machine, puis interrogés par un modèle de langage (Mistral via Ollama) exécuté lui aussi en local. Aucune donnée ne transite par un service tiers.",
        features: [
          "Import multi-format (PDF, Markdown, texte) directement depuis l'interface.",
          "Découpage intelligent du texte avec chevauchement, pour préserver le sens de chaque extrait.",
          "Recherche sémantique instantanée dans une base vectorielle, avec ou sans génération IA.",
          "Réponses strictement ancrées dans les documents fournis : l'IA indique clairement quand l'information est absente, pour éviter les réponses inventées.",
          "Citation systématique des sources (nom du fichier et page) pour chaque réponse.",
          "Traitement 100 % local : embeddings et modèle de langage exécutés sans appel à une API externe.",
        ],
        highlights: [
          "Confidentialité totale : les documents ne quittent jamais votre infrastructure, un atout pour les données sensibles ou soumises au RGPD.",
          "Pas de coût d'API récurrent : le modèle tourne en local via Ollama, sans facturation à la requête.",
          "Réponses vérifiables : chaque réponse est sourcée et limitée au contenu réellement fourni.",
        ],
        stack: [
          {
            title: "IA & RAG",
            items: ["LangChain", "Ollama", "Mistral", "HuggingFace Embeddings", "ChromaDB"],
          },
          { title: "Interface", items: ["Python", "Streamlit"] },
          { title: "Documents", items: ["PyMuPDF"] },
        ],
        repoHref: "https://github.com/Mananjara1754/notebooklm",
      },
    },
    {
      id: "pilotage",
      name: "Tableau de bord de pilotage",
      kind: "Dashboard",
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
    { title: "Frontend", items: ["React", "Next.js", "Angular"] },
    { title: "Mobile", items: ["Flutter", "React Native"] },
    { title: "Backend", items: ["Node.js", "Java", ".NET"] },
    { title: "Design", items: ["Figma"] },
    { title: "Données", items: ["PostgreSQL"] },
    { title: "Cloud", items: ["AWS", "GCP"] },
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
