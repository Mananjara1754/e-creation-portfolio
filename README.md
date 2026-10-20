# E-Creation — Portfolio

Next.js (App Router) + TypeScript. Contenu en français, direction artistique dark premium (noir, blanc cassé, vert électrique), police Poppins.

## Lancer le projet

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Poppins est chargée via `next/font/google` : le build nécessite un accès réseau à Google Fonts.

## Où modifier le contenu

Tout est dans `config/site.ts` : nom, textes, services, projets, technologies, coordonnées, réseaux, liens légaux.

- `demoMode: true` affiche des emplacements « à renseigner » (coordonnées, technologies de projet). Passer à `false` pour la production.
- Les projets actuels sont des **concepts de démonstration** (`isDemo: true`). Les remplacer par de vrais projets.
- La liste `stack` ne contient que les technologies fournies par E-Creation. N'en ajouter qu'après confirmation.
- Un lien d'étude de cas ne s'affiche que si `caseStudyHref` est défini : créer la page avant de renseigner le champ.
- La couleur d'accent se change dans `app/globals.css` (`--color-accent`).

## Formulaire de contact

`/api/contact` valide les champs, applique un honeypot et une limite de 5 requêtes / 10 min / IP (en mémoire : à remplacer par un store partagé en production multi-instances).

Tant que `RESEND_API_KEY`, `CONTACT_TO_EMAIL` et `CONTACT_FROM_EMAIL` ne sont pas définis (voir `.env.example`), la route répond `501` et le site affiche que l'envoi n'est pas configuré. L'envoi via Resend est écrit mais n'a pas été testé avec une vraie clé.

## Structure

```
app/            layout, page, styles globaux, route API
components/     layout/, sections/, ui/, visuals/
config/         site.ts (données), site.types.ts (types)
```
