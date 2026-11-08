// Pages secteurs : contenu éditorial pour le SEO (requêtes « robot + métier ») et le GEO (réponses factuelles et autonomes).

export type SectorPage = {
  slug: string;
  name: string;
  h1: string;
  seoTitle: string;
  metaDescription: string;
  photo: string;
  intro: [string, string];
  challenges: { t: string; d: string }[];
  solutions: { slug: string; why: string }[];
  steps: string[];
  faq: { q: string; a: string }[];
};

export const sectorPages: SectorPage[] = [
  {
    slug: "restauration",
    name: "Restauration",
    h1: "Robots serveurs pour restaurants",
    seoTitle: "Robot serveur pour restaurant : location, leasing et achat",
    metaDescription:
      "Robots serveurs Dinerbot et LuckiBot pour restaurants, brasseries et hôtels : 3 ou 4 plateaux, 20 à 40 kg, passage dès 55 cm. Location, leasing ou achat avec Europbots.",
    photo: "/assets/robots/T5/situation.webp",
    intro: [
      "Un robot serveur prend en charge les allers-retours entre la cuisine et la salle : il apporte les plats à table et rapporte la vaisselle sale. Les serveurs restent auprès des clients pour conseiller, prendre les commandes et encaisser.",
      "Les modèles proposés par Europbots portent de 20 à 40 kg sur trois ou quatre plateaux, naviguent seuls entre les tables (LiDAR, V-SLAM, vision 3D) et tiennent de 8 à 18 heures selon le modèle. Plusieurs robots peuvent travailler en flotte dans la même salle.",
    ],
    challenges: [
      { t: "Recrutement difficile", d: "Les postes en salle restent durs à pourvoir ; le robot absorbe la part la plus physique du service." },
      { t: "Kilomètres parcourus", d: "Un serveur peut parcourir plusieurs kilomètres par service, surtout entre la cuisine et la salle." },
      { t: "Coup de feu", d: "Aux heures de pointe, les plats attendent au passe et refroidissent." },
    ],
    solutions: [
      { slug: "dinerbot-t5", why: "Quatre plateaux et 40 kg pour les salles de taille moyenne à grande, en flotte." },
      { slug: "dinerbot-t8", why: "Le plus compact : passage de 55 cm pour les bistrots et cafés aux tables serrées." },
      { slug: "dinerbot-t9", why: "Châssis amortisseur pour les boissons, soupes et verres pleins." },
      { slug: "dinerbot-t10", why: "Écran publicitaire de 23,8 pouces pour mettre en avant la carte pendant le service." },
      { slug: "luckibot", why: "Accueil, placement et service, avec un mode croisière pour les buffets." },
    ],
    steps: ["Visite de la salle et relevé des passages", "Démonstration en conditions réelles", "Cartographie, tables et points de service", "Formation de l'équipe en une journée"],
    faq: [
      { q: "Un robot serveur remplace-t-il un serveur ?", a: "Non. Il prend les trajets et le transport des plats ; la prise de commande, le conseil, l'encaissement et la relation client restent humains. Il permet surtout à une équipe de tenir le service avec moins de fatigue." },
      { q: "Quelle largeur de passage faut-il entre les tables ?", a: "Selon le modèle, de 55 cm (Dinerbot T8) à environ 60 cm. Nous vérifions chaque passage lors de la visite de votre salle." },
      { q: "Le robot peut-il servir en terrasse ?", a: "Sur un sol plat et régulier, oui pour la plupart des modèles. Les fortes pentes, marches et sols très irréguliers sont à éviter : nous l'évaluons lors de la visite." },
    ],
  },
  {
    slug: "hotellerie",
    name: "Hôtellerie",
    h1: "Robots pour hôtels",
    seoTitle: "Robots pour l'hôtellerie : accueil, room service et nettoyage",
    metaDescription:
      "Robots d'accueil multilingues, room service et nettoyage silencieux des couloirs pour hôtels. Novabot, Minibot, Dinerbot T9, CleaniBot K1 en location ou leasing.",
    photo: "/assets/robots/minibot/situation.webp",
    intro: [
      "Dans un hôtel, les robots prennent trois rôles : l'accueil et l'information dans le hall, la livraison en chambre et l'entretien des circulations. Ils fonctionnent à toute heure, y compris la nuit, quand les équipes sont réduites.",
      "Un robot d'accueil comme le Novabot répond aux clients dans plus de trente langues ; un robot serveur assure le room service ; un aspirateur professionnel entretient les moquettes des couloirs en silence.",
    ],
    challenges: [
      { t: "Clientèle internationale", d: "Répondre dans la langue du client, à toute heure, sans multiplier les effectifs." },
      { t: "Service de nuit", d: "Les demandes continuent quand l'équipe est réduite au minimum." },
      { t: "Entretien des étages", d: "Couloirs et parties communes demandent un passage quotidien." },
    ],
    solutions: [
      { slug: "novabot", why: "Accueil et information dans le hall, ChatGPT intégré, plus de 30 langues." },
      { slug: "minibot", why: "Accueil compact pour les réceptions de taille réduite." },
      { slug: "dinerbot-t9", why: "Room service stable, sans renverser boissons ni plats." },
      { slug: "cleanibot-k1", why: "Aspiration des moquettes de couloirs, 20 kPa, pilotage cloud." },
      { slug: "carrybot-2", why: "Logistique d'étage : linge, consommables, plateaux." },
    ],
    steps: ["Analyse des parcours clients et des flux internes", "Démonstration dans le hall ou en showroom", "Paramétrage des contenus et des langues", "Mise en service et formation"],
    faq: [
      { q: "Un robot peut-il livrer en chambre ?", a: "Oui. Les robots de service livrent jusqu'à l'étage ; certains modèles prennent l'ascenseur selon l'équipement de votre établissement. Nous étudions la configuration lors de la visite." },
      { q: "Le robot d'accueil connaît-il les informations de mon hôtel ?", a: "Oui, ses réponses sont paramétrées avec vos contenus : horaires, services, restaurants, spa, activités à proximité." },
      { q: "Les robots font-ils du bruit la nuit ?", a: "Ils sont conçus pour circuler en présence du public ; les robots de nettoyage les plus silencieux descendent à 42 dB." },
    ],
  },
  {
    slug: "retail",
    name: "Retail et centres commerciaux",
    h1: "Robots pour le commerce et les centres commerciaux",
    seoTitle: "Robots pour le retail : affichage mobile, accueil et nettoyage",
    metaDescription:
      "Robots publicitaires mobiles, robots d'accueil et robots de nettoyage pour magasins et centres commerciaux. Temi Fourcast, LuckiBot Plus, Cenobots SP50 en location ou leasing.",
    photo: "/assets/robots/fourcast/situation.webp",
    intro: [
      "En magasin et en galerie marchande, le robot sert à attirer, informer et entretenir. Un robot d'affichage mobile va au-devant des clients avec vos campagnes, un robot d'accueil oriente vers les rayons, et un robot de nettoyage garde les allées propres pendant les heures d'ouverture.",
      "Le Temi Fourcast porte quatre écrans de 38,8 pouces et projette une animation au sol à 360° ; le LuckiBot Plus affiche vos contenus sur 27 pouces et guide les visiteurs ; le Cenobots SP50 repère et aspire les déchets avec une IA visuelle.",
    ],
    challenges: [
      { t: "Capter l'attention", d: "L'affichage fixe se fond dans le décor ; un média qui bouge se remarque." },
      { t: "Orienter les clients", d: "Trouver un rayon ou une enseigne sans chercher un vendeur." },
      { t: "Propreté en continu", d: "Les allées doivent rester impeccables pendant l'ouverture, sans gêner." },
    ],
    solutions: [
      { slug: "temi-fourcast", why: "Affichage publicitaire mobile, 4 écrans HD, projection au sol." },
      { slug: "luckibot-plus", why: "Écran 27 pouces et guidage des clients vers les rayons." },
      { slug: "cenobots-sp50", why: "Spot-cleaning par IA : il va là où il y a un déchet." },
      { slug: "ikitbot-one-s55", why: "Lavage silencieux à 42 dB pendant les heures d'ouverture." },
      { slug: "cleanibot-c5", why: "Lavage des grandes allées, 1 980 m²/h." },
    ],
    steps: ["Définition des objectifs (trafic, image, propreté)", "Repérage des parcours et zones de passage", "Création ou adaptation des contenus", "Déploiement et suivi"],
    faq: [
      { q: "Peut-on louer un robot publicitaire pour une opération ponctuelle ?", a: "Oui, le Fourcast se loue pour quelques jours, avec cartographie du lieu et préparation des contenus." },
      { q: "Les robots de nettoyage peuvent-ils travailler pendant l'ouverture ?", a: "Oui, ils détectent les personnes et adaptent leur trajectoire ; le ONE S55 ne dépasse pas 42 dB." },
      { q: "Peut-on changer les contenus affichés ?", a: "Oui, à tout moment, pour suivre les promotions, les saisons ou les événements du centre." },
    ],
  },
  {
    slug: "sante",
    name: "Santé et EHPAD",
    h1: "Robots pour hôpitaux, cliniques et EHPAD",
    seoTitle: "Robots pour la santé et les EHPAD : téléprésence, logistique, nettoyage",
    metaDescription:
      "Robots de téléprésence pour les visites à distance, robots logistiques pour les navettes internes et robots laveurs pour hôpitaux, cliniques et EHPAD. Location ou leasing avec Europbots.",
    photo: "/assets/robots/temi-v3/situation.webp",
    intro: [
      "Dans les établissements de santé, les robots libèrent du temps soignant sur trois postes : les échanges à distance, les navettes internes et l'entretien des sols. Ils circulent seuls dans les couloirs et s'arrêtent à l'approche des personnes.",
      "Le temi V3 permet aux familles de rendre visite à distance ; le Carrybot 2 transporte linge, consommables et plateaux ; les robots laveurs CleaniBot M1 et Cenobots L3 entretiennent couloirs et halls, y compris d'un étage à l'autre.",
    ],
    challenges: [
      { t: "Temps soignant", d: "Les trajets et transports internes prennent du temps aux équipes." },
      { t: "Lien avec les familles", d: "Les visites ne sont pas toujours possibles en personne." },
      { t: "Hygiène des sols", d: "Un entretien régulier et traçable des circulations." },
    ],
    solutions: [
      { slug: "temi-v3", why: "Téléprésence : le robot va jusqu'à la chambre et suit le résident." },
      { slug: "carrybot-2", why: "Navettes internes, 2 plateaux de 30 kg, couloirs dès 60 cm." },
      { slug: "cleanibot-m1", why: "Lavage profond, prise d'ascenseur automatique, 11 capteurs." },
      { slug: "cenobots-l3", why: "Autolaveuse compacte de 50 cm, pilotée à la voix." },
    ],
    steps: ["Analyse des circuits et contraintes d'hygiène", "Démonstration avec les équipes soignantes", "Cartographie des services et des zones interdites", "Formation et suivi"],
    faq: [
      { q: "Les robots peuvent-ils circuler dans les services ?", a: "Oui. Les zones accessibles et interdites sont définies sur la carte lors de l'installation, avec vos équipes." },
      { q: "Comment fonctionne une visite à distance avec le temi V3 ?", a: "Le proche se connecte, le robot se rend dans la chambre, puis suit automatiquement le résident pendant l'échange grâce à sa caméra et à son écran orientable." },
      { q: "Les robots laveurs conviennent-ils aux sols hospitaliers ?", a: "Les robots laveurs traitent les sols durs (carrelage, PVC, résine). Les surfaces textiles relèvent d'un aspirateur comme le CleaniBot K1." },
    ],
  },
  {
    slug: "industrie-logistique",
    name: "Industrie et entrepôts",
    h1: "Robots pour l'industrie et les entrepôts",
    seoTitle: "Robots logistiques et autolaveuses autonomes pour entrepôts",
    metaDescription:
      "Robots de transport interne et autolaveuses autonomes pour entrepôts, usines et ateliers : Carrybot 2, Cenobots L50 (2 203 m²/h), CleaniBot C5. Location ou leasing avec Europbots.",
    photo: "/assets/robots/carrybot_2/situation.webp",
    intro: [
      "Dans un entrepôt ou un atelier, deux tâches répétitives se prêtent à la robotique : déplacer des charges entre les postes et nettoyer de grandes surfaces. Les robots mobiles autonomes (AMR) suppriment les trajets à vide ; les autolaveuses autonomes entretiennent des milliers de mètres carrés sans mobiliser d'équipe.",
      "Le Carrybot 2 transporte jusqu'à 30 kg par plateau sur deux plateaux et circule dans des allées de 60 cm ; la Cenobots L50 lave jusqu'à 2 203 m² par heure avec 55 L de réservoir, et sa cartographie se met à jour quand l'agencement change.",
    ],
    challenges: [
      { t: "Trajets sans valeur ajoutée", d: "Les opérateurs perdent du temps à porter des pièces d'un poste à l'autre." },
      { t: "Surfaces immenses", d: "Le lavage manuel de grandes surfaces mobilise des heures de travail." },
      { t: "Sécurité des allées", d: "Un sol propre limite les risques de glissade et de chute." },
    ],
    solutions: [
      { slug: "carrybot-2", why: "Transport interne et préparation de commandes, LiDAR 3D + V-SLAM 2.0." },
      { slug: "cenobots-l50", why: "Autolaveuse grande capacité, 2 203 m²/h, réservoirs de 55 L." },
      { slug: "cleanibot-c5", why: "Lavage profond 3-en-1, 1 980 m²/h, vidange automatique." },
      { slug: "sparkoz-tn10", why: "Nettoyage 4-en-1 des bureaux et zones annexes, station automatique." },
    ],
    steps: ["Relevé des flux, des charges et des surfaces", "Essai sur site", "Cartographie, missions et zones", "Mise en production et support"],
    faq: [
      { q: "Faut-il modifier l'entrepôt pour accueillir un robot logistique ?", a: "Non. Le Carrybot 2 navigue par LiDAR 3D et V-SLAM, sans bande au sol ni balise. Il faut seulement des allées d'au moins 60 cm." },
      { q: "Quelle surface une autolaveuse autonome peut-elle traiter ?", a: "Selon le modèle, de 1 000 à 2 203 m² par heure. La Cenobots L50 est dimensionnée pour les très grandes surfaces." },
      { q: "Les robots peuvent-ils travailler la nuit ?", a: "Oui, les cycles se programment en dehors des heures de production." },
    ],
  },
  {
    slug: "evenementiel",
    name: "Événementiel et salons",
    h1: "Location de robots pour événements et salons",
    seoTitle: "Location de robot pour événement, salon et soirée d'entreprise",
    metaDescription:
      "Louez un robot pour un salon, une inauguration ou une soirée : robot publicitaire Temi Fourcast, robot serveur LuckiBot en mode croisière, robot d'accueil Novabot. Livraison et mise en route incluses.",
    photo: "/assets/robots/luckibot_plus/situation.webp",
    intro: [
      "Un robot attire immédiatement le regard sur un stand ou lors d'une soirée. En location courte, il devient un outil d'animation, d'accueil ou de service pour la seule durée de l'événement.",
      "Europbots livre le robot, cartographie le lieu, prépare les contenus et assure la mise en route. Le Temi Fourcast diffuse vos visuels sur quatre écrans, le LuckiBot distribue boissons et amuse-bouches en mode croisière, le Novabot accueille et renseigne les invités.",
    ],
    challenges: [
      { t: "Se démarquer", d: "Sur un salon, des centaines de stands se disputent l'attention." },
      { t: "Accueillir le flux", d: "Orienter et renseigner un grand nombre de visiteurs à la fois." },
      { t: "Logistique courte", d: "Tout doit être prêt à l'ouverture, sans mobiliser vos équipes." },
    ],
    solutions: [
      { slug: "temi-fourcast", why: "Quatre écrans de 38,8 pouces et projection au sol à 360°." },
      { slug: "luckibot", why: "Distribution en mode croisière pendant les cocktails." },
      { slug: "novabot", why: "Accueil des invités et réponses dans plus de 30 langues." },
      { slug: "luckibot-plus", why: "Écran mobile de 27 pouces pour animer un stand." },
    ],
    steps: ["Brief : lieu, dates, objectifs", "Préparation des contenus", "Livraison et cartographie la veille", "Assistance pendant l'événement et reprise"],
    faq: [
      { q: "Combien de temps à l'avance faut-il réserver ?", a: "Le plus tôt possible pour garantir la disponibilité, idéalement plusieurs semaines avant un salon. Contactez-nous avec vos dates." },
      { q: "Un technicien est-il présent ?", a: "Un technicien assure la mise en route ; une assistance pendant l'événement peut être prévue dans le devis." },
      { q: "Peut-on personnaliser l'habillage et les contenus ?", a: "Oui, les contenus affichés sont préparés à vos couleurs à partir de vos visuels et vidéos." },
    ],
  },
];

export const getSector = (slug: string) => sectorPages.find((s) => s.slug === slug);
