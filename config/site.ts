import type { SiteConfig } from "./site.types";

/**
 * Toutes les données modifiables du site sont ici.
 * Ne rien afficher qui ne soit pas confirmé : coordonnées, liens, projets réels, technologies.
 */
export const site: SiteConfig = {
  companyName: "E-Creation",
  locale: "fr",
  demoMode: false,
  description:
    "Agence basée à Antananarivo, E-Creation conçoit sites web, applications mobiles, API et interfaces UI/UX pour des clients à Madagascar et partout ailleurs.",
  location: { city: "Antananarivo", country: "Madagascar", countryCode: "MG" },
  nav: [
    { label: "Accueil", href: "/#accueil" },
    { label: "Services", href: "/#services" },
    { label: "Projets", href: "/#projets" },
    { label: "Approche", href: "/#approche" },
    { label: "Contact", href: "/#contact" },
  ],
  // whatsapp : numéro réel au format international sans "+", à ajouter quand il sera fourni
  contact: { email: "contact@ecreation-mg.com" },
  contactTypes: [
    "Site web ou application web",
    "Backend & API",
    "Application mobile",
    "UI/UX Design",
    "Autre",
  ],
  // Autres réseaux (LinkedIn...) : à ajouter quand ils seront fournis
  socials: [
    {
      label: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61595643017340",
      name: "E-Creation MG",
      icon: "facebook",
    },
  ],
  // À renseigner uniquement si les pages existent
  legal: { privacyHref: "/confidentialite" },
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
      slug: "creation-site-web",
      number: "01",
      icon: "monitor",
      title: "Développement Web",
      description:
        "Sites web, applications métier, plateformes SaaS et interfaces web responsives.",
      heading: "Création de sites web et d'applications web à Madagascar",
      intro:
        "Basés à Antananarivo, nous concevons et développons des sites web, des applications métier et des plateformes SaaS adaptés à tous les écrans, pour des clients à Madagascar et partout ailleurs.",
      includes: [
        "Sites web",
        "Applications métier",
        "Plateformes SaaS",
        "Interfaces web responsives",
      ],
      stackGroups: ["Frontend", "Backend", "Données", "Cloud"],
    },
    {
      id: "backend",
      slug: "backend-api",
      number: "02",
      icon: "server",
      title: "Backend & API",
      description: "Architecture serveur, bases de données, API sécurisées et intégrations.",
      heading: "Développement backend et API sur mesure",
      intro:
        "Nous concevons l'architecture serveur, les bases de données et les API qui font tourner vos applications web et mobiles, avec la sécurité et les intégrations dont elles ont besoin.",
      includes: ["Architecture serveur", "Bases de données", "API sécurisées", "Intégrations"],
      stackGroups: ["Backend", "Données", "Cloud"],
    },
    {
      id: "mobile",
      slug: "application-mobile",
      number: "03",
      icon: "smartphone",
      title: "Développement Mobile",
      description: "Applications Android et iOS conçues pour une expérience fluide et cohérente.",
      heading: "Développement d'applications mobiles Android et iOS",
      intro:
        "Nous créons des applications Android et iOS conçues pour une expérience fluide et cohérente, avec Flutter ou React Native : une seule base de code pour les deux plateformes.",
      includes: [
        "Applications Android",
        "Applications iOS",
        "Une expérience cohérente sur les deux plateformes",
      ],
      stackGroups: ["Mobile"],
    },
    {
      id: "uiux",
      slug: "design-ui-ux",
      number: "04",
      icon: "pen-tool",
      title: "UI/UX Design",
      description: "Recherche, wireframes, maquettes haute fidélité, prototypes et design systems.",
      heading: "Design UI/UX de sites web et d'applications",
      intro:
        "De la recherche utilisateur au design system, nous concevons des interfaces claires et des parcours simples, prêts à être développés.",
      includes: [
        "Recherche utilisateur",
        "Wireframes",
        "Maquettes haute fidélité",
        "Prototypes",
        "Design systems",
      ],
      stackGroups: ["Design"],
    },
  ],
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
      id: "marketplace-mean",
      name: "Marketplace multi-boutiques",
      kind: "Marketplace e-commerce",
      isDemo: false,
      visual: "shop",
      summary:
        "Une galerie marchande qui existe aussi en ligne : chaque commerçant loue son emplacement, vend en boutique et sur la plateforme, dans un seul back-office.",
      services: ["Backend & API", "Développement Web", "UI/UX Design"],
      technologies: ["Angular", "Node.js", "Express", "MongoDB", "JWT", "Cloudinary"],
      caseStudyHref: "/projets/marketplace-mean",
      caseStudy: {
        tagline:
          "La galerie marchande qui vit aussi en ligne : vitrine web, gestion des loyers et des commandes dans un seul back-office.",
        context:
          "Un centre commercial avec des dizaines de boutiques indépendantes a besoin d'un seul système pour gérer les emplacements loués, vendre en ligne, encaisser les paiements et garder le contact avec les clients, sans multiplier les outils déconnectés entre eux.",
        solution:
          "Une plateforme MEAN (MongoDB, Express, Angular, Node.js) avec deux interfaces : une boutique en ligne pour les clients (recherche, panier, favoris, commandes, messagerie) et un back-office pour les commerçants et l'administration (produits, promotions, loyers, statistiques, paiements). Chaque boutique est rattachée à un emplacement physique (étage, zone) et paie un loyer suivi directement dans la plateforme.",
        features: [
          "Vitrine publique avec recherche, filtres et fiches boutiques/produits.",
          "Panier, favoris et suivi de commandes pour les clients.",
          "Messagerie intégrée entre acheteurs et commerçants, avec notifications.",
          "Back-office commerçant : produits, catégories, promotions, statistiques de vente.",
          "Gestion des loyers des emplacements et des paiements, avec facturation PDF.",
          "Authentification JWT, upload d'images via Cloudinary, API documentée (Swagger).",
        ],
        highlights: [
          "Un seul système pour vendre en boutique physique et en ligne, sans ressaisie.",
          "Les commerçants suivent leurs ventes et leur loyer au même endroit.",
          "Architecture modulaire (API Node.js + deux fronts Angular) qui s'adapte à d'autres types de commerces.",
        ],
        stack: [
          { title: "Backend", items: ["Node.js", "Express", "MongoDB", "Mongoose", "JWT"] },
          { title: "Frontend", items: ["Angular", "Tailwind CSS", "Chart.js"] },
          { title: "Services", items: ["Cloudinary", "PDFKit", "Swagger"] },
        ],
        repoHref: "https://github.com/Mananjara1754/m1p13mean-Hasinjara-Mananjara",
      },
    },
    {
      id: "btp-construction",
      name: "Suivi de chantiers et devis client",
      kind: "Plateforme de gestion BTP",
      isDemo: false,
      visual: "dashboard",
      summary:
        "Du devis en ligne au suivi de chantier : les clients avancent dans leur projet de construction, l'entreprise pilote tout depuis un seul back-office.",
      services: ["Backend & API", "Développement Web"],
      technologies: ["PHP", "CodeIgniter", "MySQL", "Bootstrap"],
      caseStudyHref: "/projets/btp-construction",
      caseStudy: {
        tagline:
          "Du devis en ligne au suivi de chantier : vos clients avancent dans leur projet, vous pilotez tout depuis un seul back-office.",
        context:
          "Une entreprise de construction gère en parallèle des devis, des paiements échelonnés et l'avancement de chantiers pour plusieurs clients, souvent avec des tableurs et des échanges téléphoniques qui se perdent facilement.",
        solution:
          "Une plateforme web (PHP / CodeIgniter / MySQL) avec un espace client et un espace administrateur. Le client choisit un modèle de maison, un niveau de finition et un lieu pour générer un devis, suit ses paiements et l'avancement de son chantier. L'administrateur pilote les devis, les clients, les employés, les paiements et les travaux depuis un tableau de bord, avec import/export CSV des données.",
        features: [
          "Demande de devis en ligne : modèle de maison, niveau de finition, lieu du chantier.",
          "Export du devis en PDF pour le client.",
          "Suivi des paiements échelonnés par devis, avec historique des montants versés.",
          "Calendrier des rendez-vous et de l'avancement des chantiers.",
          "Back-office administrateur : clients, devis, employés, paiements, chantiers, statistiques.",
          "Import/export CSV des données.",
        ],
        highlights: [
          "Toute l'activité (devis, paiements, avancement) centralisée dans un seul outil, fini les tableurs épars.",
          "Le client suit son projet en autonomie, sans appeler l'entreprise à chaque étape.",
          "Une base solide (CodeIgniter/MySQL) facile à étendre à d'autres besoins métier.",
        ],
        stack: [
          { title: "Backend", items: ["PHP", "CodeIgniter", "MySQL"] },
          { title: "Frontend", items: ["Bootstrap", "Chart.js", "FullCalendar"] },
        ],
        repoHref: "https://github.com/Mananjara1754/BTP-Construction",
      },
    },
    {
      id: "rage-room-pitch",
      name: "Business plan interactif — Rage Room Madagascar",
      kind: "Site vitrine interactif",
      isDemo: false,
      visual: "dashboard",
      summary:
        "Un business plan transformé en expérience web interactive : étude de marché, finances et pitch dans un seul site, pensé pour convaincre un jury.",
      services: ["UI/UX Design", "Développement Web"],
      technologies: ["HTML5", "CSS3", "JavaScript"],
      caseStudyHref: "/projets/rage-room-pitch",
      caseStudy: {
        tagline:
          "Un business plan qui se feuillette comme un site, pas comme un PDF : marché, finances et pitch en une seule expérience.",
        context:
          "Un dossier de projet entrepreneurial (étude de marché, prévisionnel financier, organisation, risques) est en général présenté sous forme de PDF ou de diaporama statique, difficile à parcourir et peu mémorable pour un jury ou des investisseurs.",
        solution:
          "Un site vitrine en une page, en HTML/CSS/JavaScript pur et sans framework, qui transforme chaque partie du dossier (concept, marché, finances, équipe, risques, go-to-market) en section interactive : animations au défilement, tableaux financiers (VAN, TRI, indice de profitabilité), visualisation des segments de marché, et une mini-interaction ludique pour ancrer le concept dans la mémoire du lecteur.",
        features: [
          "Navigation par onglets entre les six sections du dossier (concept, marché, finances, équipe, risques, marketing).",
          "Tableaux financiers détaillés : compte de résultat sur 5 ans, calcul de VAN actualisée, TRI, indice de profitabilité.",
          "Visualisation des segments de marché et de la grille tarifaire.",
          "Matrice des risques avec niveau de criticité et plan de mitigation pour chacun.",
          "Mini-interaction ludique pour illustrer le concept et capter l'attention.",
          "Site 100 % autonome, sans dépendance ni framework.",
        ],
        highlights: [
          "Un dossier de projet qui se lit comme un site, plus engageant qu'un PDF ou un diaporama.",
          "Les chiffres clés (VAN, TRI, rentabilité) sont mis en avant visuellement, pas noyés dans un tableau.",
          "Un format réutilisable pour présenter n'importe quel pitch ou dossier d'investissement.",
        ],
        stack: [{ title: "Frontend", items: ["HTML5", "CSS3", "JavaScript"] }],
        repoHref: "https://github.com/Mananjara1754/rage_room_madagascar",
      },
    },
    {
      id: "badge-generator",
      name: "Import CSV/JSON avec mapping dynamique",
      kind: "API de gestion de données",
      isDemo: false,
      visual: "dashboard",
      summary:
        "Importez une liste de participants (CSV ou JSON) et générez leurs badges nominatifs par évènement, en quelques secondes.",
      services: ["Backend & API"],
      technologies: ["Java", "Spring Boot", "H2", "Docker"],
      caseStudyHref: "/projets/badge-generator",
      caseStudy: {
        tagline:
          "Un fichier de participants, un mapping de colonnes, et des badges prêts à imprimer : fini la ressaisie manuelle.",
        context:
          "Préparer les badges d'un évènement à partir d'une liste de participants (export RH, inscription en ligne...) demande normalement de reformater chaque fichier à la main avant de pouvoir les utiliser.",
        solution:
          "Une API Spring Boot qui importe un fichier CSV ou JSON de participants, permet de renommer dynamiquement les colonnes (nom, e-mail, photo...) sans toucher au code, puis enregistre chaque participant rattaché à un évènement (« projet »). Les données sont stockées dans une base H2 embarquée, prêtes à être exploitées pour générer les badges.",
        features: [
          "Import de participants depuis un fichier CSV ou JSON, en une seule requête.",
          "Mapping dynamique des colonnes (ex. `work_email` → `Email`) sans toucher au code.",
          "Participants regroupés par évènement, avec photo encodée en base64.",
          "Insertion transactionnelle : si une ligne échoue, rien n'est enregistré à moitié.",
          "Pagination des listes de participants pour les gros volumes.",
          "Conteneurisé avec Docker pour un déploiement en quelques minutes.",
        ],
        highlights: [
          "Remplace la ressaisie manuelle d'une liste de participants par un simple import de fichier.",
          "S'adapte aux colonnes de n'importe quel export grâce au mapping dynamique.",
          "Prêt à déployer en quelques minutes via Docker.",
        ],
        stack: [
          { title: "Backend", items: ["Java", "Spring Boot", "Spring Data JPA"] },
          { title: "Données", items: ["H2", "Apache Commons CSV", "Jackson"] },
          { title: "Déploiement", items: ["Docker"] },
        ],
        repoHref: "https://github.com/Mananjara1754/SpringH2Csv",
      },
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
