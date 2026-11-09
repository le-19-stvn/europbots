# Charte Europbots pour les réseaux

Reprise exacte de la charte du site (`app/globals.css`). Toute création doit pouvoir être posée à côté du site sans rupture.

## Couleurs

| Rôle | Valeur | Usage |
| --- | --- | --- |
| Nuit | `#080808` | Fond dominant de tous les visuels réseaux |
| Nuit 3 | `#1a1a1a` | Ligne active d'un tableau, aplats secondaires |
| Filet | `#262626` | Séparateurs 1 px |
| Papier | `#fafafa` | Texte principal sur nuit ; fond des visuels clairs (rare) |
| Texte atténué | `#a6a6a0` | Texte secondaire |
| Texte discret | `#6f6f6a` | Labels mono, mentions |
| Signal | `#d2ff00` | **Uniquement** : le CTA, le chiffre clé, l'eyebrow, un mot du titre. Jamais en fond de grande surface sauf l'écran de fin. |

Ratio : 80 % nuit, 15 % papier, 5 % signal.

## Polices

- **Clash Grotesk 500** (Fontshare) : titres et gros chiffres, tracking −0,035 em, interligne 0,92. Titres de robots en capitales.
- **Geist 400–700** (Google Fonts) : texte courant, accroches.
- **Geist Mono 400** : labels en capitales (catégorie, constructeur, unité d'un chiffre, URL), 22 px sur 1080.
- **Syncopate 700** : uniquement le logotype « EUROPBOTS » (tracking 0,18 em).

## Logo

- Monogramme « EB » (`public/assets/brand/logo-jaune.svg`) en signal sur nuit, suivi du mot EUROPBOTS en Syncopate papier.
- Toujours en haut à gauche, hauteur 40 px sur 1080 de large ; zone libre autour = hauteur du monogramme.
- Écran de fin vidéo : logo centré à 1,6×.
- Jamais déformé, jamais sur une photo claire sans dégradé nuit derrière.

## Forme signature et motifs

- **Bouton « B »** (la forme du logo) : angle droit à gauche, demi-cercle à droite, fond signal, texte nuit 27 px gras, pastille ronde nuit avec flèche signal. C'est le seul CTA d'un visuel.
- **Eyebrow à trois barres** : trois barres signal (14, 24, 24 px, extrémités droites arrondies) devant un label mono.
- **Filets 1 px** pour séparer les chiffres (grille 2 colonnes).
- **Repères « + »** aux coins des scènes produit (sur fond clair `#f1f1ee`, quand il n'y a pas de photo en situation).

## Photos

- Toujours les photos du site (`public/assets/robots/<dossier>/situation.webp` = robot en action, `produit.webp` = détouré). Le dossier est l'ancien identifiant : `T5`, `T8`, `t9`, `T10`, `fourcast`, `carrybot_2`, `l3`, `l50`, `sp50`, `one-s55`, `tn10`, `luckibot_plus`, etc. (voir `oldSlug` dans `lib/robots-data.json`).
- Traitement : dégradé nuit en haut (60 % → 0 sur le premier quart) pour le logo, et en bas (0 → 100 %) pour fondre la photo dans le fond. Pas de filtre couleur.
- Le Dinerbot T8 n'a pas de photo en situation : scène claire avec le détouré en `mix-blend-mode: multiply`.

## Gabarits par format

| Format | Taille | Canaux | Zone photo | Marges |
| --- | --- | --- | --- | --- |
| `portrait` | 1080 × 1350 | LinkedIn, Instagram feed, Facebook | 64 % du haut | 65 px côtés, 60 px haut et bas |
| `carre` | 1080 × 1080 | Instagram, Facebook, Google Business | 60 % | idem, typo × 0,82 |
| `story` | 1080 × 1920 | Stories, Reels, TikTok, Shorts | 62 % | 90 px en haut, 110 px en bas |

Zones de sécurité en story : rien d'important dans les 250 px du haut (nom du compte) ni les 320 px du bas (légende, boutons de l'app) à part le CTA, qui reste au-dessus de 1600 px.

Hiérarchie d'un visuel robot (de haut en bas) : logo + tag de catégorie → photo → constructeur (mono) → NOM (Clash 118 px) → accroche (36 px) → 2 chiffres → « Leasing dès 500 € HT / mois » (mono signal) → CTA + URL.

Hiérarchie d'un visuel secteur : logo + tag → eyebrow secteur → titre (argumentaire) → « X h économisées par jour » → gain net (Clash 178 px signal) → tableau 1 à 6 h → CTA → mention de rentabilité (17 px).

## Motion (vidéos)

- Courbe d'entrée `cubic-bezier(.22,1,.36,1)`, montée de 60 px en 0,8 s (`.up`), fondus 0,6 s (`.fade`).
- Photo en lent zoom arrière 1,14 → 1 sur toute la durée (`.kb`).
- Ordre : tag (0,1 s) → constructeur (0,4) → nom (0,6) → accroche (1,0) → chiffres (1,8 et 2,2) → prix (3,0) → CTA (3,4) → écran de fin (6,8 s pour 9 s).
- Compteurs : propriété CSS `--n` animée (classe `.count`), 2,2 s.
- 25 images/s, H.264, `yuv420p`, `+faststart` (compatible LinkedIn, Instagram, TikTok).

## Ton

Phrases courtes, concrètes, sans superlatifs creux. Un chiffre par idée. Vocabulaire métier (couverts, coup de feu, m²/h, room service, agents). Pas de « révolutionnaire », « incroyable », ni d'emojis en série.
