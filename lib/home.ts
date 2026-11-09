import type { Sector } from "@/components/Sectors";
import { getRobot } from "./robots";

const pick = (...slugs: string[]) => slugs.map((s) => ({ slug: s, name: getRobot(s)!.name }));

export const sectors: Sector[] = [
  {
    name: "Restauration",
    slug: "restauration",
    text: "Les robots serveurs prennent les allers-retours cuisine-salle et la desserte : vos serveurs restent à table, au conseil et à l'encaissement.",
    photo: "/assets/robots/T5/situation.webp",
    robots: pick("dinerbot-t5", "dinerbot-t8", "dinerbot-t9", "dinerbot-t10", "luckibot"),
  },
  {
    name: "Hôtellerie",
    slug: "hotellerie",
    text: "Accueil multilingue dans le hall, room service, nettoyage silencieux des couloirs la nuit : un service constant à toute heure.",
    photo: "/assets/robots/minibot/situation.webp",
    robots: pick("novabot", "minibot", "dinerbot-t9", "cleanibot-k1", "carrybot-2"),
  },
  {
    name: "Retail et centres commerciaux",
    slug: "retail",
    text: "Affichage mobile qui va au-devant des clients, guidage en rayon et propreté des allées pendant les heures d'ouverture.",
    photo: "/assets/robots/fourcast/situation.webp",
    robots: pick("temi-fourcast", "luckibot-plus", "cenobots-sp50", "ikitbot-one-s55", "cleanibot-c5"),
  },
  {
    name: "Santé et EHPAD",
    slug: "sante",
    text: "Téléprésence pour les visites à distance, navettes internes entre services, désinfection et lavage des sols sans interruption.",
    photo: "/assets/robots/temi-v3/situation.webp",
    robots: pick("temi-v3", "carrybot-2", "cleanibot-m1", "cenobots-l3"),
  },
  {
    name: "Industrie et entrepôts",
    slug: "industrie-logistique",
    text: "Transport de charges entre postes et autolaveuses grande capacité pour des surfaces de plusieurs milliers de mètres carrés.",
    photo: "/assets/robots/carrybot_2/situation.webp",
    robots: pick("carrybot-2", "cenobots-l50", "cleanibot-c5", "sparkoz-tn10"),
  },
  {
    name: "Événementiel et salons",
    slug: "evenementiel",
    text: "Un robot qui attire le regard, distribue en mode croisière et accueille vos visiteurs, loué pour la durée de l'événement.",
    photo: "/assets/robots/luckibot_plus/situation.webp",
    robots: pick("temi-fourcast", "luckibot", "novabot", "luckibot-plus"),
  },
];

export const formulas = [
  {
    name: "Location courte",
    for: "Événements, salons, tests",
    price: "sur devis",
    text: "Un robot pour quelques jours ou quelques semaines, livré, programmé et récupéré par nos équipes.",
    lines: ["Durée à la journée ou à la semaine", "Livraison et reprise incluses", "Programmation des contenus", "Technicien présent à la mise en route", "Idéal pour tester avant de s'engager"],
    cta: "Louer pour un événement",
    href: "/contact?sujet=evenement#devis",
    featured: false,
  },
  {
    name: "Leasing",
    for: "Exploitation au quotidien",
    price: "dès 500 € HT / mois",
    text: "Un loyer mensuel sur 36 mois, à partir de 500 € HT selon le modèle. Pas d'investissement initial important, un budget prévisible.",
    lines: ["Loyer mensuel, sans apport", "Installation et cartographie incluses", "Support technique inclus", "Formation de vos équipes", "Maintenance selon les conditions du contrat"],
    cta: "Étudier un leasing",
    href: "/contact?sujet=leasing#devis",
    featured: true,
  },
  {
    name: "Achat",
    for: "Parc en propre",
    price: "sur devis",
    text: "Le robot vous appartient. Nous l'installons, formons vos équipes et assurons le support technique.",
    lines: ["Robot neuf, garantie constructeur", "Installation et cartographie", "Formation des équipes", "Contrat de maintenance en option", "Pièces détachées et réparations"],
    cta: "Demander un prix",
    href: "/contact?sujet=achat#devis",
    featured: false,
  },
];

export const steps = [
  { t: "Audit et démonstration", d: "Nous étudions vos flux et vos surfaces, puis vous voyez le robot travailler en showroom ou chez vous." },
  { t: "Cartographie", d: "Nos techniciens cartographient les lieux, tracent les zones, les trajets et les points d'arrêt." },
  { t: "Mise en service", d: "Paramétrage des missions et des contenus, essais en conditions réelles, formation de vos équipes." },
  { t: "Suivi et support", d: "Support technique, mises à jour et maintenance : le robot reste opérationnel dans la durée." },
];

export const homeFaq = [
  { q: "Combien coûte un robot de service ?", a: "En leasing, la gamme Europbots démarre à 500 € HT par mois sur 36 mois ; le loyer exact dépend du modèle et du nombre de robots. La location courte et l'achat se font sur devis, établi sous 24 h ouvrées." },
  { q: "Un robot à 500 € par mois est-il rentable ?", a: "Avec un coût horaire employeur de 13 € et 22 jours d'activité, le loyer de 500 € est couvert dès qu'environ 39 heures de travail rémunéré sont évitées par mois, soit moins de deux heures par jour. Au-delà, chaque heure économisée devient un gain, à condition que les heures libérées réduisent réellement les dépenses de personnel ou évitent un recrutement." },
  { q: "Vaut-il mieux louer, prendre un leasing ou acheter ?", a: "La location courte sert les événements et les tests. Le leasing convient à une exploitation quotidienne sans investissement initial important, à partir de 500 € HT par mois sur 36 mois. L'achat est pertinent si vous voulez constituer un parc en propre. Nous comparons les trois avec vous." },
  { q: "Combien de temps faut-il pour mettre un robot en service ?", a: "Une fois le robot disponible, l'installation se fait en général en une journée : cartographie, paramétrage des missions, essais et formation de vos équipes." },
  { q: "Le robot fonctionne-t-il en présence du public ?", a: "Oui. Tous nos robots détectent les personnes et les obstacles (LiDAR, caméras 3D, capteurs à ultrasons) et adaptent leur vitesse et leur trajectoire." },
  { q: "Faut-il un Wi-Fi pour faire fonctionner les robots ?", a: "Le Wi-Fi est recommandé pour les mises à jour, le pilotage à distance et les rapports. La plupart des robots naviguent toutefois de manière autonome sur leur propre carte, même en cas de coupure ponctuelle." },
  { q: "Qui s'occupe de la maintenance ?", a: "Europbots. Le support technique est inclus ; l'étendue de la maintenance est précisée dans chaque contrat, en leasing comme à l'achat. Nos techniciens interviennent à distance ou sur site." },
  { q: "Peut-on voir les robots avant de s'engager ?", a: "Oui, dans nos showrooms de Paris et de Clermont-Ferrand, ou sur votre site lors d'une démonstration. Lyon, Marseille et Lisbonne ouvrent prochainement." },
  { q: "Intervenez-vous partout en France ?", a: "Oui, en France et en Europe, notamment au Portugal. Nous organisons la livraison, l'installation et le support quel que soit votre emplacement." },
  { q: "Plusieurs robots peuvent-ils travailler dans le même lieu ?", a: "Oui. Les robots serveurs et logistiques fonctionnent en flotte : ils se répartissent les missions et se cèdent le passage." },
];
