# Europbots · note de direction artistique et de mise en ligne

## Ce qui a été récupéré sur europbots.com

- **33 fiches robots** trouvées : 19 publiées (avec photos) et 14 masquées dans le catalogue actuel. Les 14 masquées n'ont **aucune photo en ligne** (404) : leurs données sont conservées dans `docs/scraping/robots-masques-sans-photos.json`, prêtes à être ajoutées dès que les visuels existent (Cruzr, PadBot X3, Butlerbot W3, Cadebot L100, Temi Platform, Blackjack, PadBot C3, Pudu Monster, Sparkoz TN70, Cenobots L4, Kleenbot C30, Keenon S100, Carrybot 1, Carrybot 3).
- Pour chaque robot : textes, chiffres clés, fonctionnalités, fiche technique, photo produit et photo en situation (converties en WebP : 87 Mo → 3 Mo).
- Logo (SVG noir et jaune), vidéo du hero, coordonnées, showrooms, mentions légales, confidentialité et CGV (textes repris à l'identique).
- Charte : nuit `#080808`, papier `#FAFAFA`, signal `#D2FF00`.

## Direction artistique

**Mots-clés** : précision, showroom de nuit, signal électrique, fiche technique.

- **Palette** : la nuit et le papier portent le site ; le jaune-vert `#D2FF00` est réservé au signal (bouton d'action, point « ouvert », chiffre actif). Une seule couleur d'action.
- **Typographie** : Clash Grotesk (titres, chiffres) pour un ton technique et haut de gamme ; Geist (texte) ; Geist Mono pour les données techniques (références, labels de specs). Syncopate, la police historique, est gardée pour le logotype et le grand mot « Europbots » du footer.
- **Forme signature** : le « B » du monogramme. Les boutons ont un angle droit à gauche et un demi-cercle à droite ; les sur-titres reprennent les trois barres du logo.
- **Motif** : repères « + » aux quatre coins des scènes produit, comme sur une planche technique.
- **Motion** (grammaire éditoriale) : titres qui sortent de leur masque ligne par ligne, hero vidéo qui recule au scroll, photos en situation qui apparaissent au survol des fiches, panneaux de gammes qui s'élargissent, compteurs à l'entrée. `prefers-reduced-motion` respecté.

## Pages (43)

Accueil · Catalogue · 3 gammes · 19 fiches robots · 6 secteurs · Guide location / leasing / achat · Showrooms · Contact · Mentions légales · Confidentialité · CGV · 404 · `sitemap.xml` · `robots.txt` · `llms.txt`.

Chaque fiche robot contient : résumé « En bref » factuel, présentation, 3 cas d'usage, fonctionnalités, fiche technique, FAQ (5 questions), robots de la même gamme, robot précédent / suivant.

## SEO et GEO

- Titre et description uniques par page, URL lisibles (`/robots/dinerbot-t5`), canonical, Open Graph.
- Données structurées : Organization, LocalBusiness (Paris, avec coordonnées GPS et horaires), Product, BreadcrumbList, FAQPage, ItemList.
- **Redirections 301** de toutes les anciennes URL (`/produits/T5` → `/robots/dinerbot-t5`, `/catalogue` → `/robots`, `/showroom` → `/showrooms`) : le référencement acquis est conservé.
- **GEO** (visibilité dans ChatGPT, Perplexity, Gemini) : blocs « En bref » rédigés en phrases autonomes, FAQ sur chaque page, tableau comparatif des formules, `llms.txt` qui résume le site et chaque robot.
- **Bing** : clé IndexNow dans `public/71b0f00213634e2ab6943a1c0f2b2403.txt`, envoi des URL avec `node scripts/indexnow.mjs` après chaque mise en ligne.
- Badge Google « source préférée » dans le footer.

### Google Search Console (à faire une fois)

1. Aller sur https://search.google.com/search-console et cliquer « Ajouter une propriété ».
2. Choisir « Domaine », saisir `europbots.com`.
3. Copier l'enregistrement TXT proposé et l'ajouter dans la zone DNS du domaine (chez le registrar ou sur Vercel › Domains).
4. Revenir dans Search Console et cliquer « Valider » (la propagation peut prendre quelques minutes).
5. Menu « Sitemaps » : saisir `sitemap.xml` et envoyer.
6. Menu « Inspection de l'URL » : demander l'indexation de l'accueil et de 3 ou 4 fiches robots.

### Bing Webmaster Tools

Sur https://www.bing.com/webmasters, importer le site depuis Search Console (un clic), puis lancer `node scripts/indexnow.mjs`.

## À valider ou fournir avant la mise en ligne

1. **Constructeur des Dinerbot T5, T8, T9 et T10** : le site actuel indique OrionStar, mais ces modèles sont fabriqués par **Keenon Robotics** (le logo Keenon est visible sur les photos). Le nouveau site affiche Keenon : à confirmer.
2. **LuckiBot** : le site actuel mélange Pudu (balise titre) et OrionStar (fiche). Le nouveau site affiche OrionStar.
3. **Temi V3** : dimensions corrigées de « 35 × 45 × 97 mm » en 350 × 450 × 970 mm (erreur d'unité probable).
4. **Prix et simulateur** : leasing sur 36 mois à partir de 500 € HT/mois, coût horaire de 13 €, 22 jours, salarié à 2 000 €/mois (chiffres fournis par Europbots, centralisés dans `lib/pricing.ts`). Le simulateur (accueil, guide, pages secteurs) reprend les réserves : estimation hors maintenance, consommables et supervision ; économies réelles seulement si les heures libérées réduisent les dépenses de personnel.
5. **Maintenance en leasing** : le site indique « support technique inclus, maintenance selon les conditions du contrat ». À préciser si la maintenance est incluse dans les 500 €.
6. **Formulaire de contact** : il ouvre la messagerie du visiteur avec la demande pré-remplie vers contact@europbots.com. Pour un envoi direct sans messagerie, brancher une route `/api/devis` (Resend, Brevo ou webhook CRM).
7. **Vidéo du hero** : 40 Mo. À compresser (cible < 8 Mo, H.264 1080p) pour accélérer le chargement ; elle n'est chargée qu'en desktop.
8. **Photo du showroom de Clermont-Ferrand** : la carte utilise une photo de robot en attendant une vraie photo du lieu.
9. **Mesure d'audience** : la balise Radar by taap.it (`app/layout.tsx`) suit les visiteurs, leurs sources, les clics sortants et les envois de formulaires (identifiant du formulaire seulement, jamais les champs saisis). Elle stocke un identifiant visiteur dans le navigateur (localStorage) : selon la CNIL, cela demande un consentement, sauf si l'outil remplit les conditions d'exemption de la mesure d'audience. À vérifier avec taap.it ; sinon ajouter un bandeau de consentement. La carte Google Maps ne se charge qu'après un clic.

## Lancer le site

```bash
npm install
npm run dev
```

Mise en production : le projet se déploie tel quel sur Vercel (hébergeur actuel d'europbots.com).
