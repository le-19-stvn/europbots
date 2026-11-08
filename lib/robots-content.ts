// Contenu éditorial et SEO de chaque robot. Les chiffres viennent des fiches de europbots.com (lib/robots-data.json).

export type RobotContent = {
  tagline: string;
  seoTitle: string;
  metaDescription: string;
  intro: [string, string];
  uses: string[];
  keywords: string[];
  faq: { q: string; a: string }[];
};

export const content: Record<string, RobotContent> = {
  novabot: {
    tagline: "Le robot d'accueil qui parle trente langues.",
    seoTitle: "Novabot OrionStar : robot d'accueil IA avec ChatGPT, location et leasing",
    metaDescription:
      "Novabot d'OrionStar : robot d'accueil propulsé par ChatGPT, LiDAR 3D, 30+ langues et 14 h d'autonomie. Location, leasing ou achat avec installation et support Europbots.",
    intro: [
      "Le Novabot est un robot d'accueil conçu pour les halls, les showrooms et les sièges d'entreprise. Son modèle de langage intégré, basé sur ChatGPT, lui permet de répondre aux visiteurs dans plus de trente langues, de présenter vos services et d'orienter chacun vers le bon interlocuteur.",
      "Sa navigation LiDAR 3D et SLAM le fait circuler sans heurt au milieu du public, et son autonomie de 14 heures couvre une journée complète d'ouverture. Europbots l'installe, cartographie vos locaux et paramètre ses réponses à partir de vos contenus.",
    ],
    uses: ["Accueil d'entreprise", "Hôtellerie", "Musées et lieux culturels", "Retail et showrooms", "Santé et cliniques"],
    keywords: ["robot d'accueil", "robot accueil IA", "robot ChatGPT", "Novabot OrionStar", "robot réception entreprise"],
    faq: [
      {
        q: "Le Novabot peut-il répondre à des questions sur mon entreprise ?",
        a: "Oui. Ses réponses sont paramétrées à partir de vos contenus (services, horaires, plan des locaux, FAQ internes). Il combine ces informations avec ChatGPT pour tenir une conversation naturelle avec chaque visiteur.",
      },
    ],
  },
  "temi-fourcast": {
    tagline: "Quatre écrans de 38,8 pouces qui viennent à votre public.",
    seoTitle: "Temi Fourcast : robot publicitaire mobile 4 écrans, location événementielle",
    metaDescription:
      "Temi Fourcast : robot d'affichage dynamique autonome, 4 écrans HD de 38,8″, projection au sol à 360°, LiDAR 35 m. Location pour salons, centres commerciaux et événements.",
    intro: [
      "Le Fourcast transforme l'affichage publicitaire en média mobile. Ses quatre écrans HD de 38,8 pouces diffusent vos contenus sur chaque face, tandis que ses projecteurs dessinent au sol une zone animée à 360° qui attire le regard.",
      "Construit sur la base technologique temi, il navigue seul au milieu de la foule grâce à un LiDAR de 35 mètres et à une vision 3D. Il couvre jusqu'à 20 000 m², ce qui en fait un support idéal pour les galeries marchandes, les salons professionnels et les lancements de produits.",
    ],
    uses: ["Centres commerciaux", "Salons et congrès", "Lancements de produits", "Aéroports et gares", "Retail"],
    keywords: ["robot publicitaire", "affichage dynamique mobile", "robot écran publicité", "Temi Fourcast", "robot événementiel"],
    faq: [
      {
        q: "Peut-on louer le Fourcast pour un seul événement ?",
        a: "Oui. Le Fourcast se loue pour un salon, une inauguration ou une opération commerciale de quelques jours. Europbots prépare la cartographie du lieu et la diffusion de vos contenus avant l'ouverture.",
      },
    ],
  },
  "temi-v3": {
    tagline: "La téléprésence qui vous suit dans la pièce.",
    seoTitle: "Temi V3 : robot de téléprésence autonome, écran 13,3″ et son Harman",
    metaDescription:
      "Temi V3 : robot assistant et de téléprésence, navigation ROBOX™ LiDAR, écran tactile 13,3″ FHD, audio Harman 20 W, 8 h d'autonomie. Location, leasing ou achat chez Europbots.",
    intro: [
      "Le temi V3 est un robot assistant léger (12 kg) pensé pour la téléprésence et l'accompagnement. Son écran tactile 13,3 pouces orientable et sa caméra 13 MP permettent à une personne à distance de se déplacer dans les locaux et d'échanger comme si elle était présente.",
      "Le système de navigation ROBOX™, appuyé sur un LiDAR et une carte 3D, l'emmène de pièce en pièce en toute autonomie, et son suivi automatique de l'utilisateur garde l'interlocuteur dans le cadre. L'audio Harman 2.1 de 20 W rend les conversations claires, même dans un hall.",
    ],
    uses: ["Téléprésence en entreprise", "Établissements de santé et EHPAD", "Éducation", "Accueil", "Visites à distance"],
    keywords: ["robot téléprésence", "temi V3", "robot assistant", "robot visioconférence autonome", "robot EHPAD"],
    faq: [
      {
        q: "Le temi V3 est-il adapté aux établissements de santé ?",
        a: "Oui. Il est souvent utilisé pour les visites à distance des familles et la téléconsultation : léger, silencieux et autonome, il se déplace jusqu'à la chambre et suit l'interlocuteur pendant l'échange.",
      },
    ],
  },
  minibot: {
    tagline: "Un accueil complet sur 41 cm de côté.",
    seoTitle: "Minibot OrionStar : robot d'accueil compact, son Harman Kardon",
    metaDescription:
      "Minibot d'OrionStar : robot d'accueil compact de 21 kg, écran 14″ FHD, audio Harman Kardon 30 W, processeur Snapdragon 8 cœurs, 12 h d'autonomie. Location, leasing ou achat.",
    intro: [
      "Le Minibot apporte l'accueil robotisé aux espaces où chaque mètre compte. Avec une empreinte au sol de 41 × 41 cm et un poids de 21 kg, il se glisse dans une boutique, un cabinet ou une agence sans gêner la circulation.",
      "Son processeur Qualcomm Snapdragon 8 cœurs garde les échanges fluides, son écran tactile 14 pouces affiche vos contenus et son audio Harman Kardon de 30 W donne à sa voix une présence étonnante pour sa taille. Il tient 12 heures sur une charge.",
    ],
    uses: ["Boutiques", "Agences bancaires et immobilières", "Cabinets médicaux", "Hôtels", "Accueil d'entreprise"],
    keywords: ["robot d'accueil compact", "Minibot OrionStar", "petit robot accueil", "robot boutique", "robot réception"],
    faq: [
      {
        q: "Quelle différence entre le Minibot et le Novabot ?",
        a: "Le Minibot est plus compact (41 × 41 cm au sol, 21 kg) et mise sur l'audio Harman Kardon. Le Novabot est plus grand, intègre ChatGPT et un LiDAR 3D pour guider les visiteurs dans de grands espaces.",
      },
    ],
  },
  "dinerbot-t5": {
    tagline: "Quatre plateaux, 40 kg, une journée entière de service.",
    seoTitle: "Dinerbot T5 : robot serveur 4 plateaux 40 kg pour restaurants",
    metaDescription:
      "Dinerbot T5 : robot serveur pour restaurants, 4 plateaux, 40 kg de charge utile, jusqu'à 15 h d'autonomie, navigation V-SLAM et travail en flotte. Location, leasing ou achat.",
    intro: [
      "Le Dinerbot T5 prend en charge les allers-retours entre la cuisine et la salle. Ses quatre plateaux supportent 40 kg au total : il sert plusieurs tables en un seul trajet et rapporte la vaisselle sale au retour.",
      "Sa navigation V-SLAM lui permet d'évoluer entre les tables pendant le coup de feu, et son autonomie de 12 à 15 heures couvre le déjeuner comme le dîner. Plusieurs T5 peuvent travailler en flotte dans la même salle sans se gêner.",
    ],
    uses: ["Restaurants", "Brasseries", "Hôtels", "Cantines et restauration collective", "Buffets"],
    keywords: ["robot serveur", "robot restaurant", "Dinerbot T5", "robot service à table", "robot plateau"],
    faq: [
      {
        q: "Plusieurs Dinerbot T5 peuvent-ils travailler ensemble ?",
        a: "Oui. Le T5 fonctionne en flotte : les robots se répartissent les trajets et se cèdent le passage, ce qui permet de servir une grande salle aux heures de pointe.",
      },
    ],
  },
  "dinerbot-t8": {
    tagline: "Il passe là où les autres s'arrêtent : 55 cm.",
    seoTitle: "Dinerbot T8 : robot serveur compact, passage de 55 cm",
    metaDescription:
      "Dinerbot T8 : robot serveur le plus agile de sa catégorie, passage de 55 cm, vision 204°, 3 plateaux et 20 kg de charge, jusqu'à 18 h d'autonomie. Location, leasing ou achat.",
    intro: [
      "Le Dinerbot T8 a été dessiné pour les salles denses : bistrots, cafés, restaurants à tables serrées. Il lui suffit de 55 cm pour passer, avec une précision de positionnement de l'ordre du millimètre.",
      "Son champ de vision de 204° combine LiDAR et caméras pour détecter enfants, sacs et chaises déplacées. Ses trois plateaux portent 20 kg et son autonomie atteint 18 heures, de l'ouverture à la fermeture.",
    ],
    uses: ["Bistrots et cafés", "Restaurants à salle étroite", "Bars", "Hôtels", "Restauration rapide"],
    keywords: ["robot serveur compact", "Dinerbot T8", "robot restaurant petit espace", "robot serveur étroit", "robot café"],
    faq: [
      {
        q: "Mon restaurant a des allées étroites, le T8 peut-il circuler ?",
        a: "C'est sa spécialité : il passe dans 55 cm. Lors de l'installation, Europbots cartographie votre salle et vérifie chaque passage avec vous avant la mise en service.",
      },
    ],
  },
  "dinerbot-t9": {
    tagline: "Le châssis qui ne renverse pas un verre.",
    seoTitle: "Dinerbot T9 : robot serveur à châssis amortisseur, 4 plateaux",
    metaDescription:
      "Dinerbot T9 : robot serveur à châssis amortisseur anti-vibrations, 4 plateaux, 40 kg de charge, navigation V-SLAM 360°, 12 h d'autonomie. Location, leasing ou achat.",
    intro: [
      "Le Dinerbot T9 est la réponse aux services où l'on transporte soupes, cocktails et verres pleins. Son châssis amortisseur exclusif absorbe les vibrations et les seuils pour que rien ne déborde entre la cuisine et la table.",
      "Avec quatre plateaux et 40 kg de charge, il tient le rythme des restaurants à fort volume. Sa navigation V-SLAM à 360° lui fait contourner les obstacles dans les espaces denses, et il tient 12 heures pour une recharge de 4 heures.",
    ],
    uses: ["Restaurants gastronomiques", "Bars à cocktails", "Hôtels", "Restaurants à fort volume", "Room service"],
    keywords: ["robot serveur stable", "Dinerbot T9", "robot serveur amortisseur", "robot restaurant boissons", "robot service verres"],
    faq: [
      {
        q: "Le T9 peut-il transporter des boissons et des soupes ?",
        a: "Oui. Son châssis amortisseur est conçu pour cela : il absorbe les vibrations et les petits seuils afin de transporter liquides et verres pleins sans renverser.",
      },
    ],
  },
  "dinerbot-t10": {
    tagline: "Il sert vos plats et vend votre carte.",
    seoTitle: "Dinerbot T10 : robot serveur avec écran publicitaire 23,8″",
    metaDescription:
      "Dinerbot T10 : robot serveur avec écran publicitaire 23,8″ HD, 4 plateaux et 40 kg de charge, LiDAR et vision stéréo 3D, allées de 59 cm. Location, leasing ou achat.",
    intro: [
      "Le Dinerbot T10 réunit deux métiers : il livre les plats à table et diffuse en même temps vos menus, vos promotions et vos vidéos sur un écran de 23,8 pouces. Chaque trajet en salle devient un moment de communication.",
      "Ses quatre plateaux portent 40 kg pour desservir plusieurs tables en un passage. La vision stéréo 3D et le LiDAR cartographient la salle en continu et lui permettent de circuler dans des allées de 59 cm.",
    ],
    uses: ["Restaurants et chaînes", "Food courts", "Hôtels", "Centres commerciaux", "Événementiel"],
    keywords: ["robot serveur écran", "Dinerbot T10", "robot restaurant publicité", "robot serveur marketing", "robot plateau écran"],
    faq: [
      {
        q: "Quels contenus peut-on afficher sur l'écran du T10 ?",
        a: "Vos menus, offres du jour, vidéos promotionnelles ou messages de bienvenue. Les contenus se changent à tout moment, pour adapter la communication au service du midi ou du soir.",
      },
    ],
  },
  luckibot: {
    tagline: "Service à table, accueil et distribution en croisière.",
    seoTitle: "LuckiBot OrionStar : robot serveur polyvalent, navigation Dual SLAM",
    metaDescription:
      "LuckiBot d'OrionStar : robot polyvalent pour le service, l'accueil et la distribution mobile, 4 plateaux, 40 kg, navigation Dual SLAM, jusqu'à 15 h d'autonomie. Location ou leasing.",
    intro: [
      "Le LuckiBot est le robot à tout faire de la salle. Il sert à table avec ses quatre plateaux (40 kg au total), accueille et accompagne les clients jusqu'à leur place, puis passe en mode croisière pour distribuer boissons et amuse-bouches sur un parcours défini.",
      "Sa navigation Dual SLAM associe LiDAR et vision pour se positionner au millimètre, même dans des lieux complexes. Son autonomie de 12 à 15 heures suffit pour une journée de service ou un événement en soirée.",
    ],
    uses: ["Restaurants", "Buffets et réceptions", "Événements d'entreprise", "Hôtels", "Accueil"],
    keywords: ["robot polyvalent", "LuckiBot", "robot serveur événement", "robot distribution buffet", "robot accueil restaurant"],
    faq: [
      {
        q: "À quoi sert le mode croisière du LuckiBot ?",
        a: "En mode croisière, le robot suit un parcours prédéfini et s'arrête au contact des invités pour distribuer snacks ou boissons. C'est le mode privilégié pour les cocktails, buffets et soirées d'entreprise.",
      },
    ],
  },
  "luckibot-plus": {
    tagline: "Un écran de 27 pouces qui se déplace vers vos clients.",
    seoTitle: "LuckiBot Plus : robot de communication écran géant 27″ Full HD",
    metaDescription:
      "LuckiBot Plus d'OrionStar : robot de communication avec écran tactile 27″ Full HD, Qualcomm 8 cœurs, navigation Dual SLAM, 12 h d'autonomie. Location, leasing ou achat.",
    intro: [
      "Le LuckiBot Plus est un support de communication qui va au-devant de vos clients. Son écran Full HD de 27 pouces affiche menus, vidéos et messages d'accueil, et son interface tactile et vocale permet d'interagir avec lui sans attendre.",
      "Le processeur Qualcomm 8 cœurs garde les interactions sans latence, et la navigation Dual SLAM (LiDAR et caméras 3D) lui fait guider les visiteurs en sécurité dans les espaces complexes, jusqu'à 12 heures d'affilée.",
    ],
    uses: ["Retail et grands magasins", "Hôtels", "Salons", "Restaurants", "Accueil d'entreprise"],
    keywords: ["robot écran géant", "LuckiBot Plus", "robot communication", "robot affichage mobile", "robot accueil écran"],
    faq: [
      {
        q: "Le LuckiBot Plus peut-il guider les visiteurs ?",
        a: "Oui. Grâce à sa navigation Dual SLAM, il accompagne un visiteur jusqu'à une destination (rayon, salle, comptoir) tout en affichant les informations utiles sur son écran de 27 pouces.",
      },
    ],
  },
  "ikitbot-one-s55": {
    tagline: "Lave, aspire et sèche à 42 dB.",
    seoTitle: "IKITbot ONE S55 : robot de nettoyage 3-en-1 silencieux, 1 000 m²/h",
    metaDescription:
      "IKITbot ONE S55 : robot de nettoyage 3-en-1 (lavage, aspiration, séchage), 1 000 m²/h, réservoirs 22 L / 15 L, 42 dB, 8 h d'autonomie. Location, leasing ou achat.",
    intro: [
      "Le ONE S55 lave, aspire et sèche en un seul passage. Avec une largeur de travail de 62 cm et un rendement de 1 000 m²/h, il laisse un sol propre et sec, prêt à être foulé immédiatement.",
      "À 42 dB, il peut travailler pendant les heures d'ouverture sans déranger. Sa cartographie en temps réel (vision 3D et LiDAR) optimise ses trajets, et ses réservoirs de 22 L d'eau propre et 15 L d'eau usée tiennent de longs cycles sans intervention.",
    ],
    uses: ["Supermarchés", "Bureaux", "Hôtels", "Écoles", "Établissements de santé"],
    keywords: ["robot de nettoyage", "robot laveur", "IKITbot ONE S55", "autolaveuse autonome", "robot nettoyage silencieux"],
    faq: [
      {
        q: "Le ONE S55 peut-il nettoyer pendant les heures d'ouverture ?",
        a: "Oui. Il ne dépasse pas 42 dB et détecte les personnes sur son passage, ce qui permet de le faire travailler en présence du public.",
      },
    ],
  },
  "sparkoz-tn10": {
    tagline: "Il se vide et se recharge tout seul.",
    seoTitle: "Sparkoz TN10 : robot de nettoyage 4-en-1 avec station automatique",
    metaDescription:
      "Sparkoz TN10 : robot de nettoyage 4-en-1 (balayage, aspiration, lavage, séchage) avec station de vidange et de recharge automatique, 1 200 m²/h. Location, leasing ou achat.",
    intro: [
      "Le TN10 balaie, aspire, lave et sèche en un seul passage. Associé à sa station intelligente, il se vide et se recharge sans qu'une personne ait à intervenir : vous programmez, il nettoie.",
      "Sa cartographie SLAM optimise chaque trajet pour couvrir toute la zone à 1 200 m²/h. Compact (50 × 50 cm), il passe sous les tables et entre les rayonnages, avec un réservoir de 12 L.",
    ],
    uses: ["Bureaux", "Commerces", "Hôtels", "Restaurants", "Cabinets et cliniques"],
    keywords: ["robot nettoyage 4 en 1", "Sparkoz TN10", "robot laveur station", "robot nettoyage autonome", "robot nettoyage bureaux"],
    faq: [
      {
        q: "Que fait la station du TN10 ?",
        a: "Elle vide l'eau usée, recharge la batterie en 2 heures et prépare le robot pour le cycle suivant. Le TN10 peut ainsi enchaîner les nettoyages programmés sans intervention humaine.",
      },
    ],
  },
  "cenobots-l3": {
    tagline: "Une puce NVIDIA de 100 TOPS et des commandes vocales.",
    seoTitle: "Cenobots L3 : autolaveuse IA NVIDIA à commandes vocales",
    metaDescription:
      "Cenobots L3 : autolaveuse autonome à puce NVIDIA 100 TOPS, commandes vocales, 50 cm de large, 1 200 m²/h, navigation IA 3D. Location, leasing ou achat chez Europbots.",
    intro: [
      "La L3 est une autolaveuse nouvelle génération pilotée par une puce NVIDIA de 100 TOPS. Cette puissance de calcul embarquée analyse l'environnement en temps réel pour adapter la trajectoire et le nettoyage.",
      "Elle obéit à la voix : on la démarre, on l'arrête ou on la redirige sans passer par une interface. Avec 50 cm de largeur, elle franchit couloirs et allées étroites tout en nettoyant 1 200 m² par heure.",
    ],
    uses: ["Couloirs et circulations", "Bureaux", "Hôpitaux", "Hôtels", "Commerces"],
    keywords: ["autolaveuse IA", "Cenobots L3", "autolaveuse autonome", "robot laveur commande vocale", "robot nettoyage NVIDIA"],
    faq: [
      {
        q: "Comment fonctionnent les commandes vocales de la L3 ?",
        a: "Le personnel donne des ordres simples à voix haute (démarrer, arrêter, aller nettoyer une zone). La L3 les comprend grâce à son IA embarquée, sans application ni écran à manipuler.",
      },
    ],
  },
  "cenobots-l50": {
    tagline: "2 203 m² par heure, 55 litres d'autonomie.",
    seoTitle: "Cenobots L50 : autolaveuse IA grande capacité 55 L, 2 203 m²/h",
    metaDescription:
      "Cenobots L50 : autolaveuse autonome pour grandes surfaces, 2 203 m²/h, réservoirs 55 L / 55 L, 6 h d'autonomie, cartographie IA mise à jour en continu. Location, leasing ou achat.",
    intro: [
      "La L50 est l'autolaveuse autonome des grandes surfaces : entrepôts, hypermarchés, halls d'exposition. Elle nettoie jusqu'à 2 203 m² par heure et ses réservoirs de 55 litres lui permettent de longs cycles sans retour à la base.",
      "Son IA met la cartographie à jour en continu : quand une palette ou un présentoir change de place, elle adapte son parcours sans oublier de zone. Elle tient 6 heures sur batterie pour 4 heures de recharge.",
    ],
    uses: ["Entrepôts et logistique", "Hypermarchés", "Usines", "Aéroports", "Parcs d'exposition"],
    keywords: ["autolaveuse industrielle autonome", "Cenobots L50", "robot nettoyage entrepôt", "autolaveuse robot grande surface", "robot laveur industriel"],
    faq: [
      {
        q: "La L50 convient-elle à un entrepôt ?",
        a: "Oui, c'est son terrain. Son rendement de 2 203 m²/h et ses réservoirs de 55 L sont dimensionnés pour les grandes surfaces, et sa cartographie se met à jour quand l'agencement change.",
      },
    ],
  },
  "cenobots-sp50": {
    tagline: "Il voit le déchet, il va le chercher.",
    seoTitle: "Cenobots SP50 : robot de spot-cleaning IA, détection 99 %",
    metaDescription:
      "Cenobots SP50 : robot de spot-cleaning à IA visuelle, détection des déchets à 99 %, aspiration 25 kPa, navigation LiDAR, 4 h d'autonomie. Location, leasing ou achat.",
    intro: [
      "Le SP50 ne balaie pas tout : il cible. Son IA visuelle repère chaque déchet avec 99 % de précision, puis le robot se rend directement sur la zone et l'aspire avec une puissance de 25 kPa.",
      "Ce nettoyage ciblé économise du temps et de l'énergie entre deux passages complets. Le SP50 garde les halls, les galeries et les espaces de restauration impeccables tout au long de la journée.",
    ],
    uses: ["Halls et galeries marchandes", "Aéroports et gares", "Food courts", "Bureaux", "Événements"],
    keywords: ["robot spot cleaning", "Cenobots SP50", "robot aspirateur IA", "robot détection déchets", "robot nettoyage ciblé"],
    faq: [
      {
        q: "Quelle différence entre le spot-cleaning et un nettoyage classique ?",
        a: "Un robot classique parcourt toute la surface. Le SP50 détecte les salissures et n'intervient que là où c'est nécessaire, ce qui maintient la propreté entre deux nettoyages complets.",
      },
    ],
  },
  "cleanibot-c5": {
    tagline: "Lavage profond à 1 980 m² par heure.",
    seoTitle: "CleaniBot C5 : robot laveur 3-en-1 OrionStar, 1 980 m²/h",
    metaDescription:
      "CleaniBot C5 : robot de lavage, balayage et poussée 3-en-1, 1 980 m²/h, réservoir 90 L, moteur 400 W, recharge et vidange automatiques. Location, leasing ou achat.",
    intro: [
      "Le CleaniBot C5 est un robot laveur professionnel pour les grands espaces. Son moteur principal de 400 W et sa double brosse lavent en profondeur, et sa raclette double cavité de 750 mm récupère l'eau pour un sol sec.",
      "Avec 550 mm de largeur de lavage et un réservoir de 90 L, il atteint 1 980 m²/h. Recharge, vidange et nettoyage de cuve se font automatiquement, et il se pilote depuis le robot, l'application ou le cloud.",
    ],
    uses: ["Centres commerciaux", "Aéroports", "Halls d'immeubles", "Usines", "Hôpitaux"],
    keywords: ["robot laveur professionnel", "CleaniBot C5", "autolaveuse robot", "robot nettoyage grande surface", "robot lavage sol"],
    faq: [
      {
        q: "Le CleaniBot C5 se vide-t-il seul ?",
        a: "Oui. Il gère automatiquement la recharge, la vidange et le nettoyage de sa cuve (4 minutes d'auto-nettoyage), ce qui limite les interventions de vos équipes.",
      },
    ],
  },
  "cleanibot-k1": {
    tagline: "20 kPa d'aspiration dans 42 cm de large.",
    seoTitle: "CleaniBot K1 : robot aspirateur professionnel compact 20 kPa",
    metaDescription:
      "CleaniBot K1 : robot aspirateur, balayeur et serpillière professionnel, 20 kPa, bac 10 L, 700 m²/h, 8 h d'autonomie, pilotage cloud. Location, leasing ou achat chez Europbots.",
    intro: [
      "Le CleaniBot K1 est un aspirateur professionnel compact : 42 cm de large et 46 kg, il passe entre les bureaux, les lits et les tables. Son aspiration de 20 kPa et son design anti-enchevêtrement en font un spécialiste des moquettes et tapis.",
      "Il aspire, balaie et passe la serpillière. Huit capteurs (LiDAR, RGBD, TOF, ultrasons) le guident, et la plateforme cloud permet de planifier les cycles, de suivre le robot en direct et de recevoir des rapports de nettoyage.",
    ],
    uses: ["Bureaux", "Hôtels et couloirs", "Salles de réunion", "Cinémas et salles de spectacle", "Écoles"],
    keywords: ["robot aspirateur professionnel", "CleaniBot K1", "robot aspirateur moquette", "robot nettoyage bureau", "aspirateur autonome pro"],
    faq: [
      {
        q: "Le CleaniBot K1 nettoie-t-il les moquettes ?",
        a: "Oui. Son aspiration de 20 kPa et sa brosse anti-enchevêtrement sont conçues pour les moquettes et tapis de bureaux et d'hôtels.",
      },
    ],
  },
  "cleanibot-m1": {
    tagline: "Mains libres, jusque dans l'ascenseur.",
    seoTitle: "CleaniBot M1 : robot laveur professionnel OrionStar, 11 capteurs",
    metaDescription:
      "CleaniBot M1 : robot de lavage, balayage et serpillière, double brosse pressurisée, 1 200 m²/h, 68 L, 11 capteurs, prise d'ascenseur automatique. Location, leasing ou achat.",
    intro: [
      "Le CleaniBot M1 lave en profondeur avec une double brosse roller flottante et pressurisée de 50 cm, suivie d'une raclette auto-levante de 68 cm qui ne laisse aucun résidu.",
      "Il fonctionne entièrement mains libres : planification intelligente, prise d'ascenseur automatique, remplissage et vidange autonomes. Onze capteurs en fusion (LiDAR, 3 RGBD, 2 TOF, 4 ultrasons) assurent l'évitement d'obstacles à 360°.",
    ],
    uses: ["Immeubles de bureaux multi-étages", "Hôpitaux", "Hôtels", "Aéroports", "Commerces"],
    keywords: ["robot laveur multi-étages", "CleaniBot M1", "robot nettoyage ascenseur", "autolaveuse autonome", "robot lavage professionnel"],
    faq: [
      {
        q: "Le CleaniBot M1 convient-il à tous les sols ?",
        a: "Il est conçu pour les sols durs (carrelage, béton, résine, vinyle). Il n'est pas compatible avec les tapis et le parquet ; pour ces surfaces, le CleaniBot K1 est plus adapté.",
      },
    ],
  },
  "carrybot-2": {
    tagline: "Deux plateaux, 30 kg chacun, zéro allers-retours inutiles.",
    seoTitle: "Carrybot 2 : robot de transport logistique 2 plateaux, 30 kg",
    metaDescription:
      "Carrybot 2 d'OrionStar : robot de transport interne à 2 plateaux modulables de 30 kg, LiDAR 3D + V-SLAM 2.0, passage 60 cm, écran 14″, 9 h d'autonomie. Location ou leasing.",
    intro: [
      "Le Carrybot 2 automatise le transport interne : préparation de commandes, navettes entre postes, acheminement de pièces. Ses deux plateaux modulables portent chacun 30 kg, pour plusieurs commandes ou composants en un seul trajet.",
      "La combinaison LiDAR 3D et V-SLAM 2.0 le guide en sécurité dans des allées de 60 cm. Les missions s'assignent directement sur son écran tactile 14 pouces, et il tient 9 heures pour 4,5 heures de charge.",
    ],
    uses: ["Entrepôts", "Ateliers et usines", "Hôpitaux (navettes internes)", "Hôtels (logistique d'étage)", "Laboratoires"],
    keywords: ["robot logistique", "robot transport interne", "Carrybot 2", "AMR entrepôt", "robot préparation de commandes"],
    faq: [
      {
        q: "Quelle charge le Carrybot 2 peut-il transporter ?",
        a: "30 kg par plateau sur ses deux plateaux, et jusqu'à 150 kg au total base incluse. Il circule dans des allées à partir de 60 cm.",
      },
    ],
  },
};
