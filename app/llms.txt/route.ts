// /llms.txt : résumé du site pour les moteurs de réponse (ChatGPT, Perplexity, Gemini, Claude) — format llmstxt.org.
import { categories, robots, type CategoryId } from "@/lib/robots";
import { sectorPages } from "@/lib/sectors";
import { SITE_URL, company, showrooms } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const lines = [
    "# Europbots",
    "",
    "> Europbots (Europbots SAS, Paris) loue, met en leasing et vend des robots de service, d'accueil, de nettoyage et de logistique aux entreprises en France et en Europe. Chaque robot est livré, installé, cartographié et suivi par les équipes Europbots.",
    "",
    `- Siège et showroom : ${company.address.street}, ${company.address.postalCode} Paris, France`,
    `- Showrooms ouverts : ${showrooms.filter((s) => s.open).map((s) => `${s.city} (${s.address})`).join(" ; ")}`,
    `- Prochaines ouvertures : ${showrooms.filter((s) => !s.open).map((s) => s.city).join(", ")}`,
    `- Contact : ${company.email}, ${company.phone} (${company.hours})`,
    "- Formules : location courte durée, leasing (loyer mensuel, maintenance incluse), achat",
    `- Constructeurs distribués : ${Array.from(new Set(robots.map((r) => r.maker))).join(", ")}`,
    "",
    ...(Object.keys(categories) as CategoryId[]).flatMap((id) => [
      `## ${categories[id].title}`,
      "",
      `- [${categories[id].title}](${SITE_URL}/gammes/${id}) : ${categories[id].lead}`,
      ...robots
        .filter((r) => r.category === id)
        .map((r) => `- [${r.name} (${r.maker})](${SITE_URL}/robots/${r.slug}) : ${r.desc} Chiffres clés : ${r.stats.map((s) => `${s.label} ${s.value}`).join(", ")}.`),
      "",
    ]),
    "## Secteurs",
    "",
    ...sectorPages.map((s) => `- [${s.h1}](${SITE_URL}/secteurs/${s.slug}) : ${s.intro[0]}`),
    "",
    "## Guides et pages utiles",
    "",
    `- [Location, leasing ou achat de robot](${SITE_URL}/location-leasing-robot) : comparatif des trois formules`,
    `- [Catalogue complet](${SITE_URL}/robots)`,
    `- [Showrooms](${SITE_URL}/showrooms)`,
    `- [Contact et devis](${SITE_URL}/contact) : réponse sous 24 h ouvrées`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
