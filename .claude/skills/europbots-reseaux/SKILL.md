---
name: europbots-reseaux
description: Crée les contenus réseaux sociaux d'Europbots (location et leasing de robots de service, nettoyage, logistique) à la charte du site europbots.com — visuels 1080×1350 / 1080×1080 / 1080×1920, vidéos MP4 animées, vidéos IA (prompts Veo, Kling, Runway, Sora), descriptions adaptées à chaque canal (LinkedIn, Instagram, Reels/TikTok/Shorts, Facebook, Google Business Profile, X) et calendrier de publication. À utiliser dès que l'on demande « un visuel Europbots », « un post pour [robot / secteur] », « une vidéo du Dinerbot », « les descriptions pour Instagram », « un carrousel rentabilité », « une vidéo IA du robot en action », « des contenus pour la semaine », ou toute communication Europbots sur les réseaux, même sans dire « skill ».
---

# Contenus réseaux Europbots

Tout contenu Europbots montre **le robot en action** et **sa rentabilité ou son efficacité**, avec un chiffre réel. La DA est celle du site : nuit `#080808`, signal `#D2FF00`, Clash Grotesk, bouton en « B ».

Le projet est le dépôt `europbots-site` (Next.js). Les données du site sont la seule source de vérité : les visuels, vidéos et textes en sont générés.

| Fichier | Contenu |
| --- | --- |
| `lib/robots-data.json`, `lib/robots-content.ts`, `lib/robots-cases.ts` | Les 19 robots : chiffres, specs, accroche, cas d'usage |
| `lib/sectors.ts` | Les 7 secteurs et leur argumentaire de rentabilité (`pitch`) |
| `lib/pricing.ts` | Leasing dès 500 € HT/mois sur 36 mois, 13 €/h, 22 j, salarié 2 000 €/mois |
| `scripts/social.mts` | Le générateur : visuels, vidéos, descriptions, planche |
| `social/` | Les sorties ; `social/planche.html` pour tout voir |

Références à lire selon le besoin :

- `references/charte.md` — couleurs, polices, logo, forme signature, gabarits par format, zones de sécurité. **À lire avant tout nouveau gabarit.**
- `references/canaux.md` — formats, longueurs, hashtags, CTA et rythme par canal. **À lire avant d'écrire une description.**
- `references/video-ia.md` — vidéos IA : choix du modèle, prompts par robot et par secteur, montage avec l'écran de fin Europbots.

## 1. Comprendre la demande

Identifier : le **sujet** (un robot, un secteur, un chiffre, une actualité), le **canal** (et donc le format), le **type** (visuel fixe, carrousel, vidéo animée, vidéo IA, texte seul) et l'**objectif** (démo, rentabilité, notoriété). Sans précision, produire pour LinkedIn en portrait 1080 × 1350 avec la description LinkedIn, et proposer la déclinaison story.

## 2. Produire depuis les gabarits existants

Depuis le dossier `europbots-site` :

```bash
npx tsx scripts/social.mts                                  # tout : 3 formats + descriptions
npx tsx scripts/social.mts --robot=novabot --format=story   # un robot, un format
npx tsx scripts/social.mts --secteur=hotellerie --video     # un secteur + sa vidéo MP4
npx tsx scripts/social.mts --only=chiffres                  # posts « chiffre » (seuil 39 h, salarié vs robot)
npx tsx scripts/social.mts --video --no-images              # toutes les vidéos seules
SOCIAL_DOMAIN=europbots.vercel.app npx tsx scripts/social.mts  # tant que le domaine n'est pas basculé
```

Familles disponibles : `robots` (robot en action + 2 chiffres + prix + CTA démo), `verticales` (calcul de rentabilité du secteur + CTA rentabilité), `chiffres` (seuil, comparatif salarié / robot). Formats : `portrait` 1080×1350, `carre` 1080×1080, `story` 1080×1920. Les vidéos sont en story, 25 i/s, 9 à 10 s, avec écran de fin.

Après génération, **regarder** les fichiers produits (lire les PNG, extraire 4 à 6 images des MP4 avec `node_modules/ffmpeg-static/ffmpeg -ss <t> -i <mp4> -frames:v 1 out.png`) avant de livrer.

## 3. Créer un nouveau gabarit

Quand aucun gabarit ne convient (carrousel, citation client, annonce de salon, comparatif de deux robots, nouveau showroom…) :

1. Lire `references/charte.md`.
2. Ajouter une fonction `xxxHtml(…, f: Format, video = false)` dans `scripts/social.mts`, sur le modèle de `robotHtml` : `css(w, h)`, `top(tag)`, classes `.d` (titres), `.m` (mono), `.pill` (CTA), `.bars` (eyebrow), et pour la vidéo les classes `up` / `fade` / `kb` avec `animation-delay`, puis `endCard(cta, t)`.
3. Brancher la famille dans la boucle de rendu et dans `--only`.
4. Générer, regarder, corriger. Un carrousel = une série de visuels numérotés `slug-01.png`, `slug-02.png`… (6 à 8 slides : accroche, problème, robot, chiffre, calcul, CTA).

## 4. Écrire les descriptions

Le générateur écrit `social/descriptions/<famille>/<slug>.md` (LinkedIn, Instagram, Reels/TikTok/Shorts, Facebook, Google Business Profile, X). Pour un texte sur mesure (actualité, salon, cas client), suivre `references/canaux.md` : une accroche, un chiffre, une preuve, une condition honnête, un CTA. `social/posts.md` contient les posts LinkedIn de référence par verticale : s'en inspirer pour le ton.

## 5. Vidéos IA

Suivre `references/video-ia.md` : partir d'une **photo en situation du site** (`public/assets/robots/<dossier>/situation.webp`) en image de départ, prompt court centré sur un mouvement réaliste du robot, 5 à 8 s, puis concaténer avec la vidéo de marque générée (`social/videos/…`) qui porte les chiffres et le CTA. Ne jamais faire dire ou faire au robot ce qu'il ne fait pas (fiche technique).

## 6. Règles non négociables

- **Chiffres** : uniquement ceux de `lib/` (fiches, `pricing.ts`). Aucun chiffre client, aucune note d'avis, aucun témoignage inventé.
- **Rentabilité** : toujours la condition « si les heures libérées réduisent les dépenses de personnel ou évitent un recrutement », en clair dans le texte ou en mention sur le visuel. Ne jamais présenter l'écart salarié / robot (72 000 € vs 18 000 €) comme une économie.
- **Prix** : « dès 500 € HT par mois », « leasing sur 36 mois » ; jamais « 500 € » seul pour un modèle précis.
- **Maintenance** : « support technique inclus, maintenance selon le contrat » tant que ce point n'est pas confirmé.
- **Constructeurs** : noms et logos en usage nominatif seulement (pas de partenariat sous-entendu). Les Dinerbot sont des robots Keenon.
- **Personnes** : pas de visage généré présenté comme un client ou un employé réel.
- **CTA** : jaune-vert = « Demander une démo » (robots) ou « Calculer ma rentabilité » (secteurs, chiffres). Un seul CTA par visuel.
- **Lien** : `europbots.com/...` (ou `SOCIAL_DOMAIN`). Vérifier que la page existe sur le site.

## 7. Livrer

Donner : les chemins des fichiers produits, la description du canal demandé prête à coller, et une suggestion de date de publication (rythme dans `references/canaux.md`). Ouvrir `social/planche.html` pour la vue d'ensemble.
