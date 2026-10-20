# E-Creation — Portfolio

Site vitrine one-page de l'agence E-Creation.
Next.js 15 (App Router) + React 19 + TypeScript. Contenu en français, direction artistique dark premium (noir, blanc cassé, vert électrique), police Poppins. CSS maison sans framework, icônes `lucide-react`.

## Lancer le projet

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # vérification TypeScript
npm run build && npm start
```

Poppins est chargée via `next/font/google` : le build nécessite un accès réseau à Google Fonts.

## Où modifier le contenu

Tout est dans `config/site.ts` (types dans `config/site.types.ts`) : nom, textes, services, projets, technologies, étapes de la méthode, coordonnées, réseaux, liens légaux.

- `demoMode: true` affiche des emplacements « à renseigner » (coordonnées, technologies de projet, études de cas). Passer à `false` pour la production.
- Coordonnées (`contact`), réseaux (`socials`) et liens légaux (`legal`) sont vides : les renseigner uniquement avec des informations réelles. WhatsApp au format international sans `+`.
- Les projets actuels sont des **concepts de démonstration** (`isDemo: true`, badge « Concept »). Les remplacer par de vrais projets. Un seul projet `featured`.
- La liste `stack` ne contient que les technologies fournies par E-Creation. N'en ajouter qu'après confirmation.
- Un lien d'étude de cas ne s'affiche que si `caseStudyHref` est défini : créer la page avant de renseigner le champ.
- La couleur d'accent se change dans `app/globals.css` (`--color-accent`). Les autres tokens (couleurs, rayons, espacements) sont au même endroit.

## Sections de la page

Dans l'ordre (`app/page.tsx`) : Hero, bandeau d'expertises, À propos, Services, Projets, Méthode, Stack, Pourquoi nous, appel à l'action, Contact. Header avec menu mobile accessible, footer.

Les visuels sont des maquettes dessinées en CSS (`components/visuals/Mockups.tsx`), il n'y a pas d'images.

## Formulaire de contact

À mettre en place : l'envoi des messages n'est pas encore configuré.

## Variables d'environnement

Copier `.env.example` vers `.env.local` :

| Variable | Rôle |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL publique, pour les métadonnées Open Graph (optionnel) |

## Structure

```text
app/
  layout.tsx, page.tsx, globals.css
  api/contact/route.ts     envoi du formulaire
components/
  layout/                  Header, Footer
  sections/                une section de la page par fichier
  ui/                      Logo, SectionHeading, Reveal, CurrentYear
  visuals/                 maquettes CSS
config/
  site.ts                  données du site
  site.types.ts            types
CLAUDE.md                  notes de travail pour Claude Code
TODO.md                    tâches restantes avant / après mise en ligne
```
