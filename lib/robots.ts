import raw from "./robots-data.json";
import { content, type RobotContent } from "./robots-content";
import { cases, type UseCase } from "./robots-cases";

export type CategoryId = "service" | "nettoyage" | "logistique";

type Metric = { value: string; label: string };
type RawRobot = {
  slug: string;
  oldSlug: string;
  name: string;
  maker: string;
  category: CategoryId;
  label: string;
  short: string;
  desc: string;
  stats: Metric[];
  features: { title: string; desc: string; metrics: Metric[] }[];
  specDesc: string;
  highlight: { label: string; value: string; sub: string } | null;
  specs: Metric[];
  image: string;
  photo: string | null;
};

export type Robot = RawRobot & RobotContent & { cases: UseCase[] };

export const categories: Record<
  CategoryId,
  { id: CategoryId; name: string; title: string; lead: string; seoTitle: string; metaDescription: string; photo: string }
> = {
  service: {
    id: "service",
    name: "Service",
    title: "Robots de service et d'accueil",
    lead: "Accueil, téléprésence, service à table et communication : des robots qui prennent en charge les gestes répétitifs pour que vos équipes restent auprès des clients.",
    seoTitle: "Robots de service : accueil, serveurs et téléprésence",
    metaDescription:
      "Robots d'accueil IA, robots serveurs pour restaurants, téléprésence et affichage mobile : la gamme Service d'Europbots en location, leasing ou achat, installée et maintenue.",
    photo: "/assets/robots/T10/situation.webp",
  },
  nettoyage: {
    id: "nettoyage",
    name: "Nettoyage",
    title: "Robots de nettoyage professionnels",
    lead: "Autolaveuses autonomes, aspirateurs professionnels et spot-cleaning par IA : un entretien régulier et mesurable, de 700 à plus de 2 200 m² par heure.",
    seoTitle: "Robots de nettoyage professionnels et autolaveuses autonomes",
    metaDescription:
      "Autolaveuses IA, robots laveurs et aspirateurs professionnels autonomes de 700 à 2 203 m²/h. Location, leasing ou achat de robots de nettoyage avec Europbots.",
    photo: "/assets/robots/l50/situation.webp",
  },
  logistique: {
    id: "logistique",
    name: "Logistique",
    title: "Robots logistiques et de transport interne",
    lead: "Des robots mobiles autonomes qui déplacent les charges entre les postes, préparent les commandes et libèrent vos équipes des trajets à vide.",
    seoTitle: "Robots logistiques : transport interne autonome",
    metaDescription:
      "Robots de transport interne autonomes pour entrepôts, ateliers et hôpitaux : plateaux modulables, LiDAR 3D, navigation V-SLAM. Location ou leasing avec Europbots.",
    photo: "/assets/robots/carrybot_2/situation.webp",
  },
};

function specValue(r: RawRobot, ...labels: string[]) {
  const s = r.specs.find((x) => labels.some((l) => x.label.toLowerCase().includes(l)));
  return s?.value;
}

function genericFaq(r: RawRobot): { q: string; a: string }[] {
  const out = [
    {
      q: `Peut-on louer le ${r.name} plutôt que l'acheter ?`,
      a: `Oui. Le ${r.name} est disponible en location courte durée (événement, test), en location longue durée, en leasing ou à l'achat. Le tarif dépend de la durée et du nombre de robots : Europbots vous adresse un devis sous 24 h.`,
    },
  ];
  const battery = r.specs.find((x) => /autonomie|batterie/i.test(x.label));
  if (battery)
    out.push({
      q: `Quelle est l'autonomie du ${r.name} ?`,
      a: `Fiche constructeur, ${battery.label.toLowerCase()} : ${battery.value}. L'autonomie réelle dépend de l'usage, de la charge transportée et du type de sol.`,
    });
  const nav = specValue(r, "navigation");
  if (nav)
    out.push({
      q: `Comment le ${r.name} se repère-t-il dans mes locaux ?`,
      a: `Il utilise ${nav}. À l'installation, nos techniciens cartographient vos locaux, définissent les zones et les trajets, puis forment vos équipes à la prise en main.`,
    });
  out.push({
    q: `Que comprend l'installation du ${r.name} ?`,
    a: "La livraison, la cartographie des lieux, le paramétrage des missions et des contenus, la formation de vos équipes et le support technique. Une démonstration est possible dans nos showrooms de Paris et de Clermont-Ferrand ou sur votre site.",
  });
  return out;
}

export const robots: Robot[] = (raw as RawRobot[]).map((r) => {
  const c = content[r.slug];
  return { ...r, ...c, cases: cases[r.slug], faq: [...c.faq, ...genericFaq(r)] };
});

export const getRobot = (slug: string) => robots.find((r) => r.slug === slug);
export const robotsBy = (cat: CategoryId) => robots.filter((r) => r.category === cat);
export const makers = Array.from(new Set(robots.map((r) => r.maker)));

const catNoun: Record<CategoryId, string> = { service: "robot de service", nettoyage: "robot de nettoyage professionnel", logistique: "robot logistique de transport interne" };

/** Fiche « En bref » : phrases factuelles et autonomes, reprises telles quelles par les moteurs de réponse (GEO). */
export function summary(r: Robot) {
  const spec = (re: RegExp) => r.specs.find((s) => re.test(s.label))?.value;
  const facts: [string, string][] = [
    ["Type", `${catNoun[r.category].charAt(0).toUpperCase()}${catNoun[r.category].slice(1)} · ${r.label}`],
    ["Constructeur", r.maker],
    ["Usages", r.uses.slice(0, 3).join(", ")],
  ];
  const auto = spec(/autonomie|batterie/i);
  if (auto) facts.push(["Autonomie", auto]);
  const nav = spec(/navigation/i);
  if (nav) facts.push(["Navigation", nav]);
  facts.push(["Formules", "Location courte, leasing, achat"]);
  facts.push(["Distributeur", "Europbots (France, Portugal)"]);
  facts.push(["Démonstration", "Showrooms de Paris et de Clermont-Ferrand, ou sur site"]);
  const sentence = `Le ${r.name} est un ${catNoun[r.category]} conçu par ${r.maker}. ${r.desc} En France, Europbots le propose en location, en leasing ou à l'achat, avec installation, cartographie des locaux, formation et support technique.`;
  return { sentence, facts };
}
