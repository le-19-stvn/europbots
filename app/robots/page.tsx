import type { Metadata } from "next";
import Catalogue from "@/components/Catalogue";
import CtaFinal from "@/components/CtaFinal";
import { Eyebrow } from "@/components/ui";
import { robots } from "@/lib/robots";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Catalogue de robots professionnels : accueil, service, nettoyage, logistique",
  description:
    "Les 19 robots Europbots : robots d'accueil IA, robots serveurs, autolaveuses autonomes et robots logistiques OrionStar, Keenon, temi, Cenobots, Sparkoz et IKITbot. Location, leasing ou achat.",
  alternates: { canonical: "/robots" },
};

const listJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Catalogue Europbots",
  itemListElement: robots.map((r, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE_URL}/robots/${r.slug}`, name: r.name })),
};

export default function RobotsPage() {
  return (
    <main className="bg-paper pt-[72px]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listJsonLd) }} />
      <section className="wrap pb-14 pt-16 md:pt-24">
        <Eyebrow>Catalogue · {robots.length} robots</Eyebrow>
        <h1 className="t-display mt-6 text-[clamp(2.4rem,7.6vw,7.4rem)]">
          Nos <span className="text-text-subtle">robots</span>
        </h1>
        <p className="mt-8 max-w-[60ch] text-[clamp(1.05rem,1.4vw,1.25rem)] leading-relaxed text-text-muted">
          Robots d&rsquo;accueil, serveurs, autolaveuses et robots de transport interne. Chaque modèle est disponible en location courte, en leasing ou à l&rsquo;achat, livré, installé et suivi par nos équipes.
        </p>
      </section>
      <section className="wrap pb-28">
        <Catalogue robots={robots} />
      </section>
      <CtaFinal />
    </main>
  );
}
