# E-Creation — Portfolio

Site vitrine one-page de l'agence E-Creation.
Next.js 15 (App Router) + React 19 + TypeScript. Contenu en français, direction artistique dark premium (noir, blanc cassé, vert électrique), police Poppins. CSS maison sans framework, icônes `lucide-react`.

## Lancer le projet

Node 22 (`.nvmrc`, `nvm use` si nvm est installé ; `.nvmrc` est lu par le build Cloudflare Pages).

```bash
npm install
npm run dev           # http://localhost:3000
npm run typecheck     # vérification TypeScript
npm run lint          # ESLint (règles Next + accessibilité jsx-a11y)
npm run format        # formate tout le code avec Prettier
npm run preview       # build + site statique et /api/contact servis par Wrangler
```

Poppins est chargée via `next/font/google` : le build nécessite un accès réseau à Google Fonts.

Dans VS Code, installer les extensions Prettier et ESLint : le code est formaté et corrigé à l'enregistrement (`.vscode/settings.json`).

## Déploiement

Hébergé sur Cloudflare Pages, en export statique : `next build` génère le site dans `out/` (HTML, sitemap, robots.txt, images). Chaque push sur `main` déclenche un build puis la mise en production ; chaque branche obtient une URL de prévisualisation (non indexée). Si le build échoue, la version en ligne reste inchangée.

Réglages du projet Cloudflare Pages :

| Réglage             | Valeur                                                     |
| ------------------- | ---------------------------------------------------------- |
| Commande de build   | `npm run build`                                            |
| Dossier de sortie   | `out`                                                      |
| Variables (build)   | `NEXT_PUBLIC_SITE_URL` (obligatoire)                       |
| Variables (runtime) | `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` |

`/api/contact` est une Pages Function (`functions/api/contact.ts`), déployée automatiquement avec le site. `public/_headers` force le type `image/png` des icônes et images Open Graph, exportées sans extension.

## Où modifier le contenu

Tout est dans `config/site.ts` (types dans `config/site.types.ts`) : nom, textes, services, projets, technologies, étapes de la méthode, coordonnées, réseaux, liens légaux.

- `demoMode: true` affiche des emplacements « à renseigner » (coordonnées, technologies de projet, études de cas). Passer à `false` pour la production.
- Coordonnées (`contact`), réseaux (`socials`) et liens légaux (`legal`) sont vides : les renseigner uniquement avec des informations réelles. WhatsApp au format international sans `+`.
- Les projets actuels sont des **concepts de démonstration** (`isDemo: true`, badge « Concept »). Les remplacer par de vrais projets. Un seul projet `featured`.
- La liste `stack` ne contient que les technologies fournies par E-Creation. N'en ajouter qu'après confirmation.
- Un lien d'étude de cas ne s'affiche que si `caseStudyHref` est défini : créer la page avant de renseigner le champ.
- La couleur d'accent se change dans `app/globals.css` (`--color-accent`). Les autres tokens (couleurs, rayons, espacements) sont au même endroit.

## Sections de la page

Dans l'ordre (`app/page.tsx`) : Hero, bandeau d'expertises, Services, Projets, Approche (étapes + principes), Stack, appel à l'action, Contact. Header avec menu mobile accessible, footer. Chaque projet avec `caseStudy` a sa page `/projets/[slug]`.

Les visuels sont des maquettes dessinées en CSS (`components/visuals/Mockups.tsx`), il n'y a pas d'images.

## SEO

- Titre, description, Open Graph : `app/layout.tsx` (valeurs par défaut, gabarit `%s | E-Creation`) et chaque page (`canonical`, `openGraph.url`).
- `/sitemap.xml` liste l'accueil et chaque étude de cas ; `/robots.txt` bloque `/api/`.
- Données structurées : `Organization` + `WebSite` sur l'accueil, fil d'Ariane + projet sur chaque étude de cas. Uniquement des informations confirmées : e-mail et réseaux y sont ajoutés automatiquement une fois renseignés dans `config/site.ts`.
- Les images générées (icônes, Open Graph) n'ont pas accès au CSS : leurs couleurs sont dans `lib/seo.ts`, à garder synchronisées avec `app/globals.css`.

## Formulaire de contact

Le formulaire poste sur `/api/contact`, une Pages Function (`functions/api/contact.ts`) qui envoie l'e-mail via Resend. Tant que `RESEND_API_KEY`, `CONTACT_TO_EMAIL` et `CONTACT_FROM_EMAIL` ne sont pas définies dans Cloudflare Pages, elle répond 501 et le site l'indique honnêtement. En local, ces variables vont dans `.dev.vars` (lu par Wrangler), pas dans `.env.local`. La validation est dupliquée dans `ContactForm.tsx` : garder les deux cohérentes.

## Variables d'environnement

Copier `.env.example` vers `.env.local` :

| Variable               | Rôle                                                                                                                              |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | URL publique (canonicals, sitemap, Open Graph, JSON-LD). **Obligatoire en production** (le build échoue sinon) ; localhost en dev |

## Structure

```text
app/
  layout.tsx, page.tsx, globals.css
  not-found.tsx            page 404
  robots.ts, sitemap.ts    /robots.txt et /sitemap.xml (générés depuis config/site.ts)
  icon.tsx, apple-icon.tsx favicon et icône Apple (générées, aussi logo du JSON-LD)
  opengraph-image.tsx      image de partage 1200×630 (une par étude de cas dans projets/[slug]/)
components/
  layout/                  Header, Footer
  sections/                une section de la page par fichier
  ui/                      Logo, SectionHeading, Reveal, CurrentYear
  seo/                     JsonLd (données structurées schema.org)
lib/
  seo.ts                   URL du site, titre par défaut, Open Graph commun, couleurs des images
  og.tsx                   gabarit des images Open Graph et du logo
  visuals/                 maquettes CSS
functions/
  api/contact.ts           envoi du formulaire (Pages Function)
public/
  _headers                 en-têtes Cloudflare Pages
config/
  site.ts                  données du site
  site.types.ts            types
CLAUDE.md                  notes de travail pour Claude Code
TODO.md                    tâches restantes avant / après mise en ligne
```
