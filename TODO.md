# TODO — E-Creation Portfolio

Cocher au fur et à mesure. Ajouter ici tout nouveau chantier.

## Contenu (config/site.ts)

- [x] Renseigner l'e-mail réel (`contact@ecreation-mg.com`, boîte Zimbra OVH)
- [ ] Renseigner le WhatsApp (`contact.whatsapp`)
- [ ] Ajouter les réseaux sociaux (`socials`)
- [x] Remplacer les projets de démo par de vraies réalisations (technologies, `caseStudyHref` si page)
- [x] Passer `demoMode` à `false`

## SEO

- [x] Passer l'URL du site sur https://ecreation-mg.com (`.env.production`)
- [x] `app/robots.ts` (bloquer `/api/`, lien vers le sitemap)
- [x] `app/sitemap.ts` (lister chaque page)
- [x] URL canonique dans les metadata (`app/layout.tsx`)
- [x] Favicon / icône (`app/icon.tsx` ou fichier)
- [x] Image Open Graph 1200×630 (`app/opengraph-image.tsx` ou visuel fourni)
- [x] Données structurées JSON-LD `Organization` (uniquement des infos confirmées)
- [ ] Inscrire le site dans Google Search Console et y soumettre `/sitemap.xml`
- [ ] Valider le JSON-LD avec le test des résultats enrichis de Google une fois en ligne
- [ ] Confirmer la ville / zone d'intervention pour le SEO local (titre, description, `address`/`areaServed` dans le JSON-LD, fiche Google Business Profile)
- [x] Intégrer Poppins dans les images Open Graph

## Légal

- [ ] Page Mentions légales (`legal.legalHref`)
- [x] Page Politique de confidentialité (`/confidentialite`), liée au formulaire et au pied de page
- [ ] Faire relire la politique de confidentialité (durée de conservation notamment)
- [x] Ajouter les pages légales au sitemap (automatique via `legal`)

## Formulaire de contact

- [ ] Créer un compte Resend, vérifier le domaine d'envoi et définir `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` dans Cloudflare (Variables and Secrets du Worker)
- [ ] Optionnel : règle de limitation de débit Cloudflare sur `/api/contact` (la limite en mémoire de la Function est indicative)

## Déploiement Cloudflare Workers

- [x] Créer le Worker relié au dépôt
- [x] Réglages Cloudflare : build `npm run build`, déploiement `npx wrangler deploy` / `npx wrangler preview`
- [ ] Déconnecter Vercel du dépôt (il build encore chaque push)
- [x] Brancher le domaine ecreation-mg.com (et www) sur le Worker
- [ ] Rediriger www.ecreation-mg.com vers ecreation-mg.com (Redirect Rule Cloudflare)
- [ ] Activer « Always Use HTTPS » (SSL/TLS → Edge Certificates)
- [ ] Désactiver l'adresse `*.workers.dev` du Worker
- [ ] Vérifier après déploiement : `curl -I` sur `/icon` et `/opengraph-image` (type `image/png`), `/sitemap.xml`, `/robots.txt`, 404

## UX / UI / qualité

- [ ] Audit Lighthouse (performance, accessibilité, SEO, bonnes pratiques)
- [x] Vérifier le responsive de 320px à grand écran (aucun débordement à 320/375/768/1280px)
- [x] Vérifier la navigation clavier et les contrastes (texte ≥ 4.5:1, contours de champs ≥ 3:1)
