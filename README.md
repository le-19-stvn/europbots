# Europbots · site officiel (refonte)

Site de Europbots : location, leasing et vente de robots de service, de nettoyage et de logistique.
Next.js 16 (App Router), Tailwind CSS 4, framer-motion. Toutes les pages sont générées en statique.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de production
```

## Où modifier quoi

| Contenu | Fichier |
| --- | --- |
| Données des robots (chiffres, specs, images) | `lib/robots-data.json` |
| Textes SEO des robots (titre, meta, intro, FAQ) | `lib/robots-content.ts` |
| Cas d'usage des robots | `lib/robots-cases.ts` |
| Gammes et résumé « En bref » | `lib/robots.ts` |
| Pages secteurs | `lib/sectors.ts` |
| Accueil : secteurs, formules, étapes, FAQ | `lib/home.ts` |
| Coordonnées, showrooms | `lib/site.ts` |
| Couleurs, polices, boutons | `app/globals.css` |
| Anciennes URL redirigées (301) | `next.config.ts` |

**Ajouter un robot** : une entrée dans `robots-data.json` (images dans `public/assets/robots/<dossier>/produit.webp` et `situation.webp`), une dans `robots-content.ts`, une dans `robots-cases.ts`. La page, le sitemap, le `llms.txt`, le menu et le footer se mettent à jour seuls.

## Après chaque mise en ligne

```bash
node scripts/indexnow.mjs
```

La note de DA, le guide Search Console et la liste des points à valider sont dans [`docs/note-da.md`](docs/note-da.md).
Les données brutes récupérées sur l'ancien site sont dans `docs/scraping/`.

## Communication

- **Routine SEO, GEO et netlinking** : [`docs/routine-seo-geo.md`](docs/routine-seo-geo.md) (mots-clés, concurrents, prompts GEO, cibles de netlinking, prompt hebdomadaire à lancer).
- **Kit réseaux** : skill Claude Code `europbots-reseaux` (`.claude/skills/europbots-reseaux/` : charte, règles par canal, vidéos IA). Générer visuels (portrait, carré, story), vidéos MP4 et descriptions par canal : `npx tsx scripts/social.mts --video` (≈ 5 min) → `social/visuels/`, `social/videos/`, `social/descriptions/`, aperçu `social/planche.html`. Les images et vidéos ne sont pas versionnées (régénérables). Posts LinkedIn de référence : `social/posts.md`.
- **Mesure d'audience** : balise Radar by taap.it dans `app/layout.tsx`.
