# TODO — E-Creation Portfolio

Cocher au fur et à mesure. Ajouter ici tout nouveau chantier.

## Contenu (config/site.ts)

- [ ] Renseigner l'e-mail et le WhatsApp réels (`contact`)
- [ ] Ajouter les réseaux sociaux (`socials`)
- [x] Remplacer les projets de démo par de vraies réalisations (technologies, `caseStudyHref` si page)
- [ ] Passer `demoMode` à `false` avant la mise en ligne

## SEO

- [ ] Définir l'URL réelle (`NEXT_PUBLIC_SITE_URL`)
- [x] `app/robots.ts` (bloquer `/api/`, lien vers le sitemap)
- [x] `app/sitemap.ts` (lister chaque page)
- [x] URL canonique dans les metadata (`app/layout.tsx`)
- [x] Favicon / icône (`app/icon.tsx` ou fichier)
- [x] Image Open Graph 1200×630 (`app/opengraph-image.tsx` ou visuel fourni)
- [x] Données structurées JSON-LD `Organization` (uniquement des infos confirmées)
- [ ] Inscrire le site dans Google Search Console et y soumettre `/sitemap.xml`
- [ ] Valider le JSON-LD avec le test des résultats enrichis de Google une fois en ligne
- [ ] Confirmer la ville / zone d'intervention pour le SEO local (titre, description, `address`/`areaServed` dans le JSON-LD, fiche Google Business Profile)
- [ ] Intégrer Poppins dans les images Open Graph (police par défaut actuellement)

## Légal

- [ ] Page Mentions légales (`legal.legalHref`)
- [ ] Page Politique de confidentialité (`legal.privacyHref`), incluant le formulaire de contact
- [ ] Ajouter ces pages au sitemap

## Formulaire de contact

- [ ] Mettre en place l'envoi du formulaire de contact

## UX / UI / qualité

- [ ] Audit Lighthouse (performance, accessibilité, SEO, bonnes pratiques)
- [ ] Vérifier le responsive de 320px à grand écran
- [ ] Vérifier la navigation clavier et les contrastes
