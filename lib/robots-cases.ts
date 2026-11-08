// Cas d'usage détaillés par robot : scénario concret, ce que fait le robot, ce que l'établissement y gagne.
// Les bénéfices sont décrits qualitativement : aucun chiffre client inventé.

export type UseCase = { place: string; title: string; text: string };

export const cases: Record<string, UseCase[]> = {
  novabot: [
    { place: "Siège d'entreprise", title: "Accueillir les visiteurs sans file d'attente", text: "Le Novabot salue chaque visiteur, vérifie son rendez-vous, prévient son interlocuteur et l'accompagne jusqu'à la salle de réunion. L'hôte ou l'hôtesse se concentre sur les demandes complexes et les invités importants." },
    { place: "Hôtel international", title: "Renseigner les clients dans leur langue", text: "Horaires du petit-déjeuner, accès au spa, idées de sorties : le Novabot répond dans plus de trente langues, à toute heure, avec les informations de l'établissement. La réception garde du temps pour les arrivées et départs." },
    { place: "Musée, showroom", title: "Guider et présenter une collection", text: "Il conduit les visiteurs d'une pièce à l'autre grâce à sa navigation LiDAR 3D, présente chaque œuvre ou produit sur son écran 14 pouces et répond aux questions. Le parcours devient interactif sans guide supplémentaire." },
  ],
  "temi-fourcast": [
    { place: "Centre commercial", title: "Faire venir les clients vers une enseigne", text: "Le Fourcast circule dans la galerie avec la campagne d'une boutique sur ses quatre écrans et un cercle animé projeté au sol. Visible de tous les côtés, il capte l'attention bien mieux qu'un panneau fixe." },
    { place: "Salon professionnel", title: "Rendre un stand impossible à manquer", text: "Il se déplace dans les allées autour de votre stand, diffuse votre vidéo de démonstration et attire les visiteurs vers l'équipe commerciale. Il se loue pour la seule durée du salon." },
    { place: "Lancement de produit", title: "Créer un moment autour d'une nouveauté", text: "Contenus synchronisés sur quatre écrans de 38,8 pouces, projection au sol à 360° : le Fourcast devient l'élément scénographique d'une inauguration ou d'une soirée de lancement." },
  ],
  "temi-v3": [
    { place: "EHPAD, clinique", title: "Rapprocher les familles des résidents", text: "Un proche se connecte à distance, le temi V3 se rend seul jusqu'à la chambre et suit le résident pendant la conversation. Les soignants n'ont pas à installer de tablette ni à tenir l'appareil." },
    { place: "Entreprise multi-sites", title: "Être présent dans un bureau sans s'y déplacer", text: "Un manager se « téléporte » dans un atelier ou un bureau régional : il circule, voit les équipes et échange avec elles grâce à l'écran 13,3 pouces et à l'audio Harman 20 W." },
    { place: "École, université", title: "Permettre de suivre un cours à distance", text: "Un élève absent assiste au cours depuis chez lui : le robot prend sa place dans la salle, tourne l'écran vers le tableau ou vers l'intervenant et lui permet de participer." },
  ],
  minibot: [
    { place: "Boutique", title: "Accueillir sans encombrer la surface de vente", text: "Avec 41 × 41 cm au sol, le Minibot se place à l'entrée sans gêner la circulation. Il souhaite la bienvenue, présente les nouveautés et oriente vers les rayons pendant que les vendeurs conseillent." },
    { place: "Agence bancaire ou immobilière", title: "Faire patienter avec des informations utiles", text: "Il enregistre l'arrivée du client, annonce le temps d'attente et diffuse les offres du moment sur son écran 14 pouces, avec un son Harman Kardon qui reste clair dans un espace ouvert." },
    { place: "Cabinet médical", title: "Désengorger le secrétariat", text: "Le Minibot répond aux questions pratiques (horaires, documents à apporter, salle d'attente) et laisse le secrétariat se concentrer sur les appels et les dossiers patients." },
  ],
  "dinerbot-t5": [
    { place: "Restaurant de 120 couverts", title: "Tenir le coup de feu du midi", text: "Le T5 enchaîne les allers-retours avec quatre plateaux chargés. Les serveurs restent en salle pour prendre les commandes, conseiller et encaisser, au lieu de marcher jusqu'au passe." },
    { place: "Brasserie", title: "Débarrasser en continu", text: "Entre deux services de plats, il rapporte la vaisselle sale en cuisine : jusqu'à 40 kg par trajet. Les tables se libèrent plus vite et la salle reste nette." },
    { place: "Restauration collective", title: "Faire travailler une flotte", text: "Plusieurs T5 se répartissent les trajets dans une grande salle sans se gêner, avec une autonomie de 12 à 15 heures qui couvre le déjeuner et le dîner." },
  ],
  "dinerbot-t8": [
    { place: "Bistrot parisien", title: "Servir dans une salle aux tables serrées", text: "Là où un robot classique bloque, le T8 passe dans 55 cm. Il livre les plats jusqu'aux tables du fond sans déplacer de chaises ni gêner les clients." },
    { place: "Café, salon de thé", title: "Apporter les commandes pendant que l'équipe prépare", text: "Le barista prépare, le T8 livre : trois plateaux, 20 kg de charge et un champ de vision de 204° pour éviter enfants, sacs et pieds de chaise." },
    { place: "Restaurant ouvert toute la journée", title: "Tenir de l'ouverture à la fermeture", text: "Jusqu'à 18 heures d'autonomie : le T8 couvre le petit-déjeuner, le déjeuner et le dîner sans retour à la base en plein service." },
  ],
  "dinerbot-t9": [
    { place: "Bar à cocktails", title: "Transporter des verres pleins", text: "Le châssis amortisseur absorbe vibrations et seuils : cocktails, champagne et verres à pied arrivent à table sans débordement." },
    { place: "Restaurant de soupes et de plats en sauce", title: "Servir les liquides sans incident", text: "Ramen, bouillons, plats en sauce : les quatre plateaux restent stables, même sur un sol irrégulier ou au passage d'une barre de seuil." },
    { place: "Hôtel", title: "Assurer le room service", text: "Le T9 monte les commandes en chambre avec ses 40 kg de capacité et sa navigation V-SLAM, pendant que l'équipe reste mobilisée au restaurant." },
  ],
  "dinerbot-t10": [
    { place: "Chaîne de restaurants", title: "Mettre en avant les offres du moment", text: "À chaque trajet, l'écran de 23,8 pouces diffuse le menu du jour, le dessert à découvrir ou le programme fidélité. Le service devient un support de vente additionnelle." },
    { place: "Food court", title: "Livrer et informer dans un espace partagé", text: "Le T10 livre les plateaux dans les allées de 59 cm grâce à sa vision stéréo 3D et à son LiDAR, tout en affichant les enseignes et leurs promotions." },
    { place: "Événement d'entreprise", title: "Associer service et message de marque", text: "Il sert le cocktail sur ses quatre plateaux et affiche la vidéo de l'événement ou les logos des partenaires sur son grand écran." },
  ],
  luckibot: [
    { place: "Restaurant", title: "Placer les clients puis servir", text: "Le LuckiBot accueille les clients à l'entrée, les accompagne à leur table puis repart chercher les plats en cuisine. Un seul robot couvre l'accueil et le service." },
    { place: "Buffet d'hôtel", title: "Réapprovisionner sans quitter la salle", text: "Il fait la navette entre la cuisine et le buffet avec quatre plateaux (40 kg) pour que les bacs ne restent jamais vides aux heures d'affluence." },
    { place: "Soirée d'entreprise", title: "Distribuer en mode croisière", text: "Sur un parcours défini, il passe parmi les invités, s'arrête à leur contact et propose boissons et amuse-bouches, pendant 12 à 15 heures." },
  ],
  "luckibot-plus": [
    { place: "Grand magasin", title: "Promouvoir et orienter", text: "Son écran Full HD de 27 pouces présente la collection du moment, puis il accompagne le client jusqu'au rayon demandé grâce à sa navigation Dual SLAM." },
    { place: "Hall d'hôtel", title: "Informer les clients en mouvement", text: "Programme du jour, restaurants, spa : il se déplace dans le hall et diffuse les informations là où se trouvent les clients, avec une interaction tactile et vocale sans latence." },
    { place: "Salon", title: "Animer un stand avec un écran mobile", text: "Il fait le tour du stand avec vos vidéos produit et invite les visiteurs à s'approcher, pendant 12 heures d'autonomie." },
  ],
  "ikitbot-one-s55": [
    { place: "Supermarché", title: "Laver les allées pendant l'ouverture", text: "À 42 dB, le ONE S55 lave, aspire et sèche les allées en présence des clients. Le sol est sec immédiatement, sans zone balisée ni risque de glissade." },
    { place: "Bureaux", title: "Entretenir chaque soir sans équipe de nuit", text: "Programmé après le départ des équipes, il couvre 1 000 m² par heure ; les agents d'entretien se concentrent sur les sanitaires, les surfaces et les finitions." },
    { place: "École", title: "Nettoyer entre deux temps de classe", text: "Silencieux et autonome, il passe dans les couloirs pendant les cours avec 22 L d'eau propre, sans interruption pour remplir le réservoir." },
  ],
  "sparkoz-tn10": [
    { place: "Restaurant", title: "Nettoyer la salle après la fermeture", text: "Le TN10 balaie, aspire, lave et sèche sous les tables pendant la nuit, puis retourne à sa station pour se vider et se recharger. Le matin, la salle est prête." },
    { place: "Commerce de proximité", title: "Un entretien quotidien sans intervention", text: "Compact (50 × 50 cm), il circule entre les rayonnages. Sa station automatique supprime la vidange et la recharge manuelles." },
    { place: "Cabinet, clinique", title: "Maintenir un sol propre entre les patients", text: "Les cycles programmés et la cartographie SLAM garantissent une couverture complète des zones d'accueil et des couloirs." },
  ],
  "cenobots-l3": [
    { place: "Hôpital", title: "Laver les couloirs étroits", text: "Avec 50 cm de largeur, la L3 passe dans les circulations et les zones de service. Sa puce NVIDIA analyse l'environnement en continu pour contourner lits, chariots et personnes." },
    { place: "Immeuble de bureaux", title: "Piloter le robot à la voix", text: "L'agent d'entretien lance un cycle ou l'envoie vers une zone d'un simple ordre vocal, sans application ni écran à manipuler." },
    { place: "Hôtel", title: "Entretenir halls et couloirs à 1 200 m²/h", text: "Elle traite les grandes circulations pendant que les équipes se concentrent sur les chambres." },
  ],
  "cenobots-l50": [
    { place: "Entrepôt logistique", title: "Laver des milliers de mètres carrés", text: "Jusqu'à 2 203 m² par heure et 55 L de réservoir : la L50 couvre les allées de stockage en un cycle, sans revenir à la base toutes les heures." },
    { place: "Hypermarché", title: "Nettoyer la surface de vente avant l'ouverture", text: "Sa cartographie se met à jour quand les présentoirs bougent : aucune zone oubliée, même après un réaménagement." },
    { place: "Parc d'exposition", title: "Remettre les halls en état entre deux journées", text: "Six heures d'autonomie et une navigation vision 3D + LiDAR pour traiter les grandes surfaces d'un salon chaque soir." },
  ],
  "cenobots-sp50": [
    { place: "Galerie marchande", title: "Ramasser les déchets dès qu'ils apparaissent", text: "Le SP50 repère papiers, gobelets et miettes avec 99 % de précision, va directement sur la zone et l'aspire avec 25 kPa. La galerie reste propre entre deux passages complets." },
    { place: "Aéroport, gare", title: "Garder les halls impeccables toute la journée", text: "Plutôt que de balayer toute la surface, il intervient là où c'est nécessaire, ce qui économise du temps et de l'énergie." },
    { place: "Food court", title: "Traiter les zones de repas", text: "Autour des tables, les salissures sont fréquentes et dispersées : le spot-cleaning ciblé est la réponse adaptée." },
  ],
  "cleanibot-c5": [
    { place: "Centre commercial", title: "Laver les grandes allées chaque nuit", text: "1 980 m² par heure, 550 mm de largeur de lavage et 90 L de réservoir : le C5 traite les mails et allées principales en un minimum de cycles." },
    { place: "Aéroport", title: "Un lavage profond sans immobiliser d'équipe", text: "Moteur de 400 W et double brosse pour un lavage en profondeur, raclette de 750 mm pour un sol sec. Recharge, vidange et nettoyage de cuve se font seuls." },
    { place: "Site industriel", title: "Piloter le nettoyage depuis le cloud", text: "Le responsable planifie les cycles et suit le robot depuis l'application ou la plateforme cloud." },
  ],
  "cleanibot-k1": [
    { place: "Hôtel", title: "Aspirer les moquettes des couloirs", text: "20 kPa d'aspiration et une brosse anti-enchevêtrement pour les moquettes ; le K1 passe dans les couloirs pendant que les équipes font les chambres." },
    { place: "Bureaux en open space", title: "Entretenir entre les bureaux", text: "Avec 42 cm de large, il se faufile entre les postes de travail. La plateforme cloud génère des rapports de nettoyage consultables à tout moment." },
    { place: "Cinéma, salle de spectacle", title: "Remettre une salle en état entre deux séances", text: "Aspiration, balayage et serpillière avec un bac de 10 L, sur 700 m² par heure." },
  ],
  "cleanibot-m1": [
    { place: "Immeuble de bureaux", title: "Nettoyer plusieurs étages en autonomie", text: "Le M1 prend l'ascenseur seul et enchaîne les étages ; il se remplit et se vide automatiquement à sa station." },
    { place: "Hôpital", title: "Un lavage sans résidu", text: "Double brosse roller pressurisée de 50 cm et raclette auto-levante de 68 cm, guidées par onze capteurs, pour des sols durs propres et secs." },
    { place: "Aéroport", title: "Circuler au milieu des voyageurs", text: "La fusion de capteurs (LiDAR, 3 RGBD, 2 TOF, 4 ultrasons) assure une détection d'obstacles à 360° dans des espaces très fréquentés." },
  ],
  "carrybot-2": [
    { place: "Entrepôt", title: "Préparer plusieurs commandes en un trajet", text: "Deux plateaux modulables de 30 kg : un opérateur charge deux commandes, le Carrybot 2 les achemine au poste d'expédition pendant qu'il prépare la suivante." },
    { place: "Atelier de production", title: "Alimenter les postes en pièces", text: "Il fait la navette entre le magasin et les lignes avec ses missions assignées sur l'écran 14 pouces. Les opérateurs restent à leur poste." },
    { place: "Hôpital", title: "Assurer les navettes internes", text: "Linge, consommables, plateaux : il circule dans des couloirs de 60 cm avec son LiDAR 3D et son V-SLAM 2.0, pendant 9 heures." },
  ],
};
