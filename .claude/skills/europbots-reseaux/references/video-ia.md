# Vidéos IA Europbots

But : montrer le robot **en mouvement dans un vrai lieu** pendant 5 à 8 secondes, puis enchaîner sur la vidéo de marque générée par `scripts/social.mts --video` (chiffres, prix, CTA, écran de fin). La vidéo IA donne l'émotion, la vidéo de marque donne la preuve.

## 1. Choisir l'outil

| Outil | Points forts | Accès |
| --- | --- | --- |
| Google Veo 3 (Flow, Gemini) | Réalisme, lumière, son d'ambiance | flow.google, API Gemini |
| Kling 2.x | Très bon en image → vidéo, mouvements d'objets | klingai.com |
| Runway Gen-4 | Cohérence de l'objet entre plans, références | runwayml.com |
| Sora 2 | Plans longs, mouvements de caméra | sora.com |
| Figma Weave (MCP Figma de cette session) | Lancer un modèle vidéo sans quitter Claude : `weave_find_model` puis `weave_run_model` avec l'image de départ | MCP Figma |

Toujours en **image → vidéo** à partir d'une photo du site, jamais en texte seul : le robot doit rester exactement le modèle vendu (forme, écran, couleurs, logo constructeur).

Format de sortie : 9:16 (1080 × 1920) pour Reels/TikTok/Shorts, 4:5 pour le feed. 5 à 8 s, 24 ou 25 i/s.

## 2. Construire le prompt

Gabarit (en anglais, mieux compris par les modèles) :

```
[Shot] of the [robot description from the start image] [precise action] in [place], [secondary motion: people, lights].
Camera: [slow push-in | slow dolly left | static tripod], eye level. Lighting: [natural daylight | warm evening restaurant light].
Photorealistic, commercial video, 35mm, shallow depth of field. The robot keeps its exact shape, screen and logo.
Negative: no extra arms, no text, no face on people turning to camera, no robot walking on legs, no flying, no warping.
```

Règles :
- Un seul mouvement principal, réaliste et lent (les robots roulent à moins de 1,2 m/s).
- Ne montrer que ce que la fiche technique permet : plateaux et charge, écran, lavage, aspiration, ascenseur (CleaniBot M1), projection au sol (Fourcast).
- Personnes de dos ou floues ; aucune personne identifiable présentée comme cliente.
- Pas de texte généré dans l'image : les chiffres viennent de la vidéo de marque.

## 3. Prompts prêts à l'emploi

Image de départ = `public/assets/robots/<dossier>/situation.webp`.

**Dinerbot T5 / T9 (dossiers `T5`, `t9`) — restaurant**
```
Slow push-in on the white serving robot from the start image gliding smoothly between restaurant tables, carrying plates on its trays, then stopping beside a table as a waiter's hands take a plate. Warm evening restaurant light, guests blurred in background. Photorealistic commercial video, 35mm, shallow depth of field. The robot keeps its exact shape, trays and blue screen. No text.
```

**Dinerbot T10 (`T10`) — écran publicitaire**
```
Static eye-level shot: the serving robot from the start image rolls toward camera across the dining room, its large vertical screen glowing with a colorful food advertisement, trays loaded with dishes. Lively restaurant, soft bokeh lights. Photorealistic, 35mm. Robot shape and screen unchanged. No readable text.
```

**Novabot (`novabot`) — accueil**
```
Slow dolly left around the reception robot from the start image standing in a bright modern showroom, its tilted screen lighting up and its head screen showing friendly eyes, a visitor's silhouette approaching from the background. Clean daylight, spotlights above. Photorealistic commercial video. Robot shape, green accents and screens unchanged. No text.
```

**Temi Fourcast (`fourcast`) — affichage mobile**
```
Wide static shot of the tall cylindrical advertising robot from the start image slowly moving through a shopping mall, its four screens cycling colorful abstract visuals and a glowing circle of light projected on the floor around it, shoppers blurred walking by. Photorealistic, commercial. No readable text.
```

**Cenobots L50 / CleaniBot C5 (`l50`, `cleanibot-c5`) — grande surface, entrepôt**
```
Low-angle slow tracking shot following the autonomous floor scrubber from the start image as it cleans a long aisle, leaving a glossy wet-clean strip that dries behind it, green status lights glowing. Large bright hall, a few blurred people far away. Photorealistic commercial video, 35mm. Robot shape and lights unchanged. No text.
```

**CleaniBot K1 (`cleanibot-k1`) — hôtel, moquette**
```
Slow push-in on the compact vacuum robot from the start image moving along a quiet hotel corridor carpet at night, warm wall lights, doors on each side, subtle carpet texture changing as it passes. Photorealistic, calm atmosphere. No text, no people.
```

**CleaniBot M1 (`cleanibot-m1`) — multi-étages**
```
Static shot inside a modern office lobby: the scrubbing robot from the start image rolls out of an open elevator and starts cleaning the polished floor, soft reflections, morning light. Photorealistic commercial video. Robot unchanged. No text.
```

**Carrybot 2 (`carrybot_2`) — logistique**
```
Eye-level tracking shot of the transport robot from the start image carrying two stacked boxes along a narrow warehouse aisle with shelves on both sides, stopping smoothly at a packing station where gloved hands pick up a box. Industrial daylight. Photorealistic, 35mm. Robot unchanged. No text.
```

**Temi V3 (`temi-v3`) — téléprésence**
```
Slow push-in on the slim telepresence robot from the start image turning its screen toward an elderly person seen from behind in a bright care-home lounge, the screen showing a blurred video call. Soft daylight, warm atmosphere. Photorealistic. No readable text, no identifiable faces.
```

**LuckiBot (`luckibot`) — événement, mode croisière**
```
Wide shot of the serving robot from the start image cruising slowly among guests at an evening corporate cocktail party, its trays holding drinks, guests blurred taking glasses. Warm ambient lights, bokeh. Photorealistic commercial video. Robot unchanged. No text.
```

Pour un robot absent de cette liste : partir de sa fiche (`lib/robots-content.ts`, `lib/robots-cases.ts`) et du premier cas d'usage, appliquer le gabarit.

## 4. Monter avec la vidéo de marque

1. Générer la vidéo de marque : `npx tsx scripts/social.mts --robot=<slug> --video --no-images` → `social/videos/robots/<slug>.mp4` (1080 × 1920, 25 i/s).
2. Ranger le clip IA dans `social/videos/ia/<slug>-ia.mp4`.
3. Assembler (clip IA, puis vidéo de marque), en normalisant taille et cadence :

```bash
FF=node_modules/ffmpeg-static/ffmpeg
$FF -y -i social/videos/ia/<slug>-ia.mp4 -i social/videos/robots/<slug>.mp4 \
  -filter_complex "[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=25,setsar=1[a];[1:v]fps=25,setsar=1[b];[a][b]concat=n=2:v=1:a=0[v]" \
  -map "[v]" -c:v libx264 -pix_fmt yuv420p -crf 20 -movflags +faststart social/videos/montages/<slug>.mp4
```

4. Extraire 4 images du montage et les regarder avant de livrer (robot conforme, pas de déformation, pas de texte parasite).
5. Indiquer dans la description que les images d'ambiance sont générées par IA si la plateforme le demande (étiquette « contenu généré par IA » sur Instagram/TikTok/YouTube).
