# E-Creation — site vitrine

Site de l'agence **E-Creation**, basée à Antananarivo (Madagascar) : développement web, mobile, backend et UI/UX, pour des clients partout.

**En ligne : [ecreation-mg.com](https://ecreation-mg.com)**

## Le site

- Page d'accueil one-page : présentation, services, projets, méthode, technologies, contact.
- Une page par service (`/services/[slug]`) et une page d'étude de cas par projet (`/projets/[slug]`).
- Formulaire de contact protégé : anti-robot Cloudflare Turnstile, limite d'envois par IP, validation côté serveur.
- SEO : métadonnées par page, sitemap, `robots.txt`, images de partage générées, données structurées schema.org.
- Accessibilité : navigation au clavier, focus visible, contrastes vérifiés, `prefers-reduced-motion`, contenu lisible sans JavaScript, responsive dès 320 px.
- Sécurité : site statique, en-têtes HTTP stricts (CSP, HSTS, anti-clickjacking), aucun secret dans le dépôt.

## Technologies

- [Next.js 15](https://nextjs.org) (App Router, export statique), React 19, TypeScript
- CSS maison (sans framework), police Poppins, icônes [lucide-react](https://lucide.dev)
- Hébergement : [Cloudflare Workers](https://developers.cloudflare.com/workers/) (fichiers statiques + un Worker pour `/api/contact`)
- E-mails du formulaire : [Resend](https://resend.com)

## Lancer le projet

Prérequis : Node 22 (voir `.nvmrc`).

```bash
npm install
npm run dev           # http://localhost:3000
npm run typecheck     # vérification TypeScript
npm run lint          # ESLint (règles Next + accessibilité jsx-a11y)
npm run format        # Prettier
npm run preview       # build statique + Worker en local avec Wrangler (http://localhost:8787)
```

Le build télécharge la police Poppins depuis Google Fonts : il faut un accès réseau.

En développement, le formulaire utilise la clé de test officielle de Turnstile (`.env.development`). Pour tester l'envoi avec `npm run preview`, créer un fichier `.dev.vars` (non versionné) à partir des variables de `.env.example`.

## Configuration

Aucun secret n'est versionné. Les valeurs publiques sont dans `.env.production` ; les secrets ne vivent que dans Cloudflare (Worker → Settings → Variables and Secrets).

| Variable                         | Où                  | Rôle                                                                               |
| -------------------------------- | ------------------- | ---------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`           | `.env.production`   | URL publique (canonicals, sitemap, Open Graph). Obligatoire au build de production |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | `.env.production`   | Clé publique de l'anti-robot du formulaire                                         |
| `TURNSTILE_SECRET_KEY`           | Cloudflare (secret) | Vérification anti-robot côté serveur                                               |
| `RESEND_API_KEY`                 | Cloudflare (secret) | Envoi des e-mails du formulaire                                                    |
| `CONTACT_TO_EMAIL`               | Cloudflare (secret) | Destinataire des messages                                                          |
| `CONTACT_FROM_EMAIL`             | Cloudflare (secret) | Expéditeur (domaine vérifié chez Resend)                                           |

Sans les variables Resend, le formulaire répond 501 et l'indique au visiteur ; sans `TURNSTILE_SECRET_KEY`, la vérification anti-robot est désactivée.

## Déploiement

Chaque push sur `main` déclenche un build sur Cloudflare Workers Builds :

1. `npm run build` génère le site statique dans `out/`.
2. `npx wrangler deploy` publie `out/` et le Worker (`worker/`), qui ne traite que `/api/*` (voir `wrangler.jsonc`).

Les autres branches obtiennent une URL de prévisualisation, non indexée par les moteurs de recherche.

## Modifier le contenu

Tout le contenu est dans `config/site.ts` (types dans `config/site.types.ts`) : textes, services, projets et études de cas, technologies, coordonnées, liens légaux. Les couleurs, rayons et espacements sont des variables CSS dans `app/globals.css`.

Règle du projet : n'afficher que des informations réelles et confirmées (coordonnées, projets, technologies).

## Structure

```text
app/                  pages (accueil, services, études de cas, confidentialité, 404), SEO, styles
components/
  layout/             en-tête, pied de page
  sections/           une section de l'accueil par fichier
  ui/                 petits composants partagés
  visuals/            maquettes d'interface dessinées en CSS
  seo/                données structurées (JSON-LD)
config/               contenu du site
lib/                  SEO et images de partage
worker/               Worker Cloudflare : formulaire de contact
public/_headers       en-têtes HTTP (sécurité, types des images)
wrangler.jsonc        configuration Cloudflare
```

Les conventions de code sont détaillées dans `CLAUDE.md`, les chantiers en cours dans `TODO.md`.

## Signaler un problème de sécurité

Merci de ne pas ouvrir d'issue publique : écrivez à [contact@ecreation-mg.com](mailto:contact@ecreation-mg.com).

## Licence

Code publié à titre de vitrine, sans licence open source : tous droits réservés, E-Creation. Contactez-nous pour toute réutilisation.
