# CLAUDE.md — E-Creation Portfolio

Site vitrine one-page (Next.js 15 App Router, React 19, TypeScript). Tout en français. CSS maison, pas de Tailwind ; icônes `lucide-react`.

## Commandes

- `npm run dev` / `npm run build` (build = réseau requis pour Poppins)
- Ne jamais lancer `npm run build` pendant que `npm run dev` tourne (même dossier `.next`, ça casse le serveur de dev) ; vérifier avec `typecheck` + `lint` à la place.
- Avant de rendre la main : `npm run typecheck && npm run lint && npm run format` (pas de tests)
- Déploiement : Cloudflare Workers (Workers Builds, `wrangler.jsonc`), export statique (`output: "export"` → `out/`) servi en assets, build à chaque push, pas de CI GitHub. URL publique dans `.env.production`. Node 22 (`engines: 22.x`, `.nvmrc`).
- Export statique : pas de rendu serveur ni de route API dans `app/` ; les routes de métadonnées ont `dynamic = "force-static"`. Le code serveur va dans `worker/` (seul `/api/*` passe par le Worker). Tester le tout avec `npm run preview` (Wrangler, qui lance le build via `build.command`).
- Prettier `printWidth: 100` ; ESLint flat config (`eslint.config.mjs`) : next/core-web-vitals, next/typescript, jsx-a11y.

## Où sont les choses

- Contenu : `config/site.ts` (types : `config/site.types.ts`). Les composants lisent `site` directement.
- Sections : `components/sections/*`, ordre dans `app/page.tsx`.
- Styles : `app/globals.css` (tokens dans `:root`, classes BEM, un bloc commenté par section).
- SEO : `lib/seo.ts` (URL de base, titre, Open Graph commun), `app/robots.ts`, `app/sitemap.ts`, icônes et `opengraph-image.tsx` générés (`lib/og.tsx`, Poppins lue depuis la dépendance de dev `@fontsource/poppins`), JSON-LD via `components/seo/JsonLd.tsx`. Toute nouvelle page : `alternates.canonical` + `openGraph` (avec `...baseOpenGraph`) et ajout au sitemap.
- Formulaire : `components/sections/ContactForm.tsx` + `worker/contact.ts` (Worker Cloudflare, envoi via Resend une fois les variables définies). Garder la validation client/serveur cohérente.

## Règles

- Ne rien inventer : coordonnées, réseaux, liens légaux, clients, technos. `stack` = uniquement les technos confirmées par E-Creation.
- `demoMode: true` affiche des « à renseigner » ; les projets actuels sont des démos (`isDemo`).
- `caseStudyHref` seulement si la page existe.
- Chaque changement doit rester SEO, UX et UI friendly :
  - SEO : un seul `h1` (Hero), hiérarchie h2/h3, metadata dans `app/layout.tsx` et par page, textes réels et descriptifs.
  - UX/accessibilité : navigation clavier, focus visible, `aria-*` corrects, contrastes suffisants, `prefers-reduced-motion`, contenu visible sans JS.
  - UI : responsive dès 320px, tokens de `globals.css` uniquement (pas de couleurs ou tailles en dur), cohérence avec les composants existants.
- Si la structure change (nouvelle section, dépendance, variable d'env), mettre à jour ce fichier et le README.
- Chantiers en cours / à venir : `TODO.md`. Cocher une tâche une fois faite, y ajouter les nouvelles.
