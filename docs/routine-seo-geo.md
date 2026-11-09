# Routine SEO, GEO et netlinking · Europbots

Routine hebdomadaire (le lundi matin conseillé) à lancer dans Claude Code depuis le dossier `europbots-site`, en collant le **prompt de la section 7**. Elle produit un rapport daté dans `docs/rapports/AAAA-MM-JJ.md` et ne fait **rien à l'extérieur sans ton accord** : aucun email envoyé, aucune page publiée sans validation.

Ce que fait la routine, dans l'ordre :

1. **Veille** : actualités du secteur et mouvements des concurrents → idées de pages à créer.
2. **Positions SEO** : où sort europbots.com sur les mots-clés cibles.
3. **Visibilité GEO** : est-ce que les moteurs de réponse (ChatGPT, Perplexity, Gemini, Google AI Overviews) citent Europbots.
4. **Netlinking** : sites à démarcher pour un article sur Europbots, avec l'email de contact trouvé sur leur site et un message qui propose un appel.
5. **Plan d'action** : 3 pages à créer ou à enrichir, 5 sites à contacter, 3 posts réseaux.

---

## 1. Constat de départ (9 novembre 2026)

- **La marque n'existe pas encore dans Google.** La recherche « Europbots robot » ne renvoie pas europbots.com : elle est saturée par *Eurobot* (robot de l'ESA, compétition étudiante de robotique) et *Eurobots* (revendeur espagnol de robots industriels). Priorité n°1 : associer « Europbots » à « robots de service, location, leasing, Paris » partout (Google Business Profile, annuaires, articles, LinkedIn).
- **Le marché publie peu de prix.** Les concurrents restent vagues (« sur devis »), HelloPro donne des fourchettes d'achat (12 000 à 60 000 € pour un robot serveur, 9 000 à 30 000 € pour un robot d'accueil). Le « dès 500 € HT/mois » d'Europbots est un angle différenciant fort : à mettre dans chaque titre, article et prise de parole.
- **Les pages qui répondent à « combien ça coûte / est-ce rentable » sont rares** : le simulateur et le guide `/location-leasing-robot` sont les meilleures pages à pousser en netlinking.

## 2. Mots-clés à suivre

Positions à relever chaque semaine (Google France, navigation privée, ou outil type Search Console / SE Ranking / Semrush). La colonne « Page » indique la page du site qui doit se positionner.

| Mot-clé | Intention | Page cible |
| --- | --- | --- |
| europbots | Marque | `/` |
| europbots robot | Marque | `/` |
| location robot | Transactionnelle | `/location-leasing-robot` |
| leasing robot | Transactionnelle | `/location-leasing-robot` |
| prix robot serveur | Information / achat | `/secteurs/restauration` |
| robot serveur restaurant | Transactionnelle | `/secteurs/restauration` |
| location robot serveur | Transactionnelle | `/secteurs/restauration` |
| robot serveur rentable | Information | `/location-leasing-robot` |
| robot d'accueil | Transactionnelle | `/gammes/service` |
| robot d'accueil entreprise | Transactionnelle | `/robots/novabot` |
| robot accueil ChatGPT | Information | `/robots/novabot` |
| robot hôtel | Transactionnelle | `/secteurs/hotellerie` |
| autolaveuse autonome | Transactionnelle | `/gammes/nettoyage` |
| robot autolaveuse location | Transactionnelle | `/gammes/nettoyage` |
| robot de nettoyage professionnel | Transactionnelle | `/gammes/nettoyage` |
| robot nettoyage entreprise de propreté | Transactionnelle | `/secteurs/entreprises-de-nettoyage` |
| robot nettoyage supermarché | Transactionnelle | `/secteurs/retail` |
| robot logistique entrepôt | Transactionnelle | `/secteurs/industrie-logistique` |
| robot téléprésence EHPAD | Information | `/robots/temi-v3` |
| robot publicitaire location salon | Transactionnelle | `/secteurs/evenementiel` |
| Dinerbot T5 / Novabot / Cenobots L50 (noms de modèles) | Transactionnelle | fiches robots |
| robot de service Paris | Locale | `/showrooms` |

## 3. Concurrents à surveiller

Repérés le 9 novembre 2026 ; la routine complète la liste.

| Acteur | Positionnement | À surveiller |
| --- | --- | --- |
| Jobotto | Revendeur officiel Pudu en France, location événementielle | Nouvelles pages, prix, cas clients |
| ONYRO | Robots serveurs, location avec dépôt + loyer mensuel | Grille de prix, offres |
| Atelier du Chef | Robots serveurs en location (crédit vers achat sous 3 mois) | Offres de location |
| United Robotics Group | Robot serveur Plato (conçu en France) | Lancements, salons |
| Leobotics (Lyon) | Robots d'accueil, concept store | Ouverture à Lyon (Europbots y ouvre aussi) |
| Génération Robots, ERM Robotique | Distributeurs robotique de service | Catalogue |
| Facilibot | Nettoyage robotisé (Avidbots Neo) | Prestations nettoyage |
| Nomad Robotics | Agences à Paris et en régions | Implantation |
| HelloPro | Annuaire et comparateur B2B | **À rejoindre** : fiche fournisseur Europbots |

## 4. Prompts GEO à tester

À poser chaque mois dans ChatGPT, Perplexity, Gemini et Google (AI Overview), en navigation privée. Noter : Europbots cité oui ou non, à quelle position, quels concurrents cités, quelles sources.

1. Où louer un robot serveur pour mon restaurant en France ?
2. Combien coûte un robot serveur en leasing ?
3. Un robot de service est-il rentable pour un restaurant ?
4. Quel robot d'accueil choisir pour le hall d'une entreprise ?
5. Quelle autolaveuse autonome pour un supermarché ?
6. Robot de nettoyage pour entreprise de propreté : est-ce rentable ?
7. Louer un robot pour un salon professionnel à Paris
8. Robot de téléprésence pour EHPAD : lequel choisir ?
9. Qui distribue les robots Keenon / OrionStar / Cenobots en France ?
10. Europbots, c'est quoi ?

Leviers GEO déjà en place sur le site : blocs « En bref » factuels, FAQ balisées sur chaque page, `llms.txt`, données structurées (Organization, LocalBusiness, Product, FAQPage). Leviers à travailler : **être cité par des sources tierces** (articles, comparatifs, annuaires), car les moteurs de réponse s'appuient surtout sur elles.

## 5. Netlinking : cibles et méthode

Types de sites à démarcher, par ordre de priorité :

1. **Annuaires et comparateurs B2B** : HelloPro (fiche fournisseur, guides « combien coûte un robot serveur »), Kompass, Pages Jaunes Pro, Europages.
2. **Presse métier** : L'Hôtellerie Restauration, Journal des Palaces, LSA, Néo Restauration, Hospitality ON, la presse spécialisée propreté (à identifier par la routine), Hospimedia, Stratégies Logistique, Voxlog.
3. **Médias tech et business** : Siècle Digital, Presse-Citron, Usine Nouvelle, Le Journal des Entreprises, Maddyness, Frenchweb.
4. **Médias locaux** des showrooms et clients : Paris (Defense-92, Le Parisien Économie), Clermont-Ferrand (La Montagne, Le Journal des Entreprises Auvergne).
5. **Événementiel** : ABC Salles, Bedouk, Eventiz Media (robots pour salons).
6. **Partenaires naturels** : écoles hôtelières, CCI, fédérations (UMIH, GHR, FEP pour la propreté), salons (EquipHotel, Sirha, Europropre).

Pour chaque site retenu, la routine relève : nom, URL, thématique, pourquoi il est pertinent, page ou rubrique visée, **email de contact trouvé sur le site** (page contact, mentions légales, page rédaction ou « proposer un article »), et rédige le message ci-dessous. Elle ne relève que des adresses publiées par le site lui-même pour ce type de demande (rédaction, partenariats, contact), jamais d'adresses personnelles devinées ou croisées entre plusieurs sources.

### Message type (à personnaliser, jamais envoyé sans validation)

> **Objet :** Robots de service à 500 € par mois : un sujet pour [nom du média] ?
>
> Bonjour [prénom ou « l'équipe de la rédaction »],
>
> Je vous écris au sujet de [article ou rubrique précise du média]. Chez Europbots, nous louons des robots de service, de nettoyage et de logistique aux [restaurants / hôtels / entreprises de propreté…], à partir de 500 € HT par mois.
>
> Un angle qui pourrait intéresser vos lecteurs : à 13 € de l'heure, un robot couvre son loyer dès qu'il fait gagner moins de deux heures de travail par jour. Nous avons les chiffres, des robots en situation et un showroom à Paris pour une démonstration.
>
> Seriez-vous partant pour un échange de 15 minutes cette semaine ? Je peux aussi vous transmettre un article prêt à publier ou des visuels.
>
> [Signature, téléphone, europbots.com]

## 6. Idées de pages à créer (point de départ)

La routine en ajoute selon l'actualité et les concurrents.

- **Comparatifs** : « Dinerbot T5 vs T8 vs T9 vs T10 : quel robot serveur choisir ? », « Robot serveur Keenon ou Pudu ? ».
- **Prix** : « Prix d'un robot serveur en 2026 : achat, location, leasing » ; « Prix d'une autolaveuse autonome ».
- **Rentabilité par métier** : « Robot de nettoyage : le calcul de rentabilité pour une entreprise de propreté » (avec simulateur intégré).
- **Locales** : « Location de robot à Lyon », « Robot de service à Clermont-Ferrand », « Robots à Lisbonne » (quand les showrooms ouvrent).
- **Réglementaire** : « Robot et Code du travail », « Robot de nettoyage et normes d'hygiène en restauration ».
- **Actualité** : salons (EquipHotel, Sirha, Europropre), nouveautés constructeurs (Keenon, OrionStar, Cenobots), pénurie de personnel en CHR.
- **Cas clients** dès que des clients acceptent d'être cités.

## 7. Le prompt à lancer

Coller tel quel dans Claude Code, depuis le dossier `europbots-site` :

```text
Lance la routine SEO, GEO et netlinking d'Europbots en suivant docs/routine-seo-geo.md.

1. Veille (7 derniers jours) : cherche les actualités robots de service, robots serveurs, autolaveuses autonomes, robotique en hôtellerie-restauration, propreté et logistique en France ; et les nouveautés des concurrents listés en section 3 (nouvelles pages, prix, offres, levées de fonds, salons). Déduis-en 3 pages à créer ou enrichir sur le site, avec titre SEO, mot-clé principal, plan H2 et sources.
2. Positions : pour chaque mot-clé de la section 2, recherche-le et note si europbots.com (ou europbots.vercel.app tant que le domaine n'est pas basculé) apparaît, à quelle position, et qui occupe les 3 premières places. Compare avec le dernier rapport de docs/rapports/.
3. GEO : pour les prompts de la section 4, note si Europbots est cité et quelles sources sont citées à sa place. Liste les sources récurrentes : ce sont les cibles de netlinking prioritaires.
4. Netlinking : propose 5 à 10 sites à démarcher (section 5 + sources trouvées en 2 et 3) qui ne figurent pas dans les rapports précédents. Pour chacun : URL, pertinence, rubrique visée, email de contact publié sur le site (page contact, rédaction, mentions légales), et un message personnalisé à partir du modèle de la section 5 qui propose un appel. N'envoie rien.
5. Réseaux : propose 3 posts LinkedIn de la semaine à partir de social/posts.md et de l'actualité, toujours avec un chiffre de rentabilité ou d'efficacité.
6. Écris le rapport dans docs/rapports/AAAA-MM-JJ.md (positions, GEO, pages à créer, cibles, messages, posts), puis montre-moi le résumé et demande-moi quelles pages créer et quels emails envoyer.
```

## 8. Lancer la routine automatiquement

Deux options :

- **À la main** : coller le prompt ci-dessus chaque lundi.
- **En tâche planifiée** : demander à Claude « planifie la routine SEO Europbots tous les lundis à 9 h ». Le rapport est alors prêt chaque semaine ; les envois d'emails et les publications restent soumis à ta validation.

## 9. Suivi dans Radar (taap.it)

La balise Radar est installée sur tout le site (`app/layout.tsx`). Chaque semaine, relever dans Radar : visiteurs, sources (Google, LinkedIn, ChatGPT/Perplexity, sites partenaires), pages d'entrée et envois de formulaires. Les visites venant des sites démarchés mesurent l'effet du netlinking ; celles venant de chatgpt.com ou perplexity.ai mesurent l'effet du GEO.
