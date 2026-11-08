// Guide : location courte, leasing ou achat. Page de réponse (SEO « location robot », « leasing robot » ; GEO : tableau comparatif et définitions).
import type { Metadata } from "next";
import CtaFinal from "@/components/CtaFinal";
import Faq from "@/components/Faq";
import { Button, Eyebrow } from "@/components/ui";
import { formulas } from "@/lib/home";
import { BOOKING_HREF } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Location, leasing ou achat de robot : quelle formule choisir ?" },
  description:
    "Louer un robot pour un événement, le prendre en leasing pour l'exploiter au quotidien ou l'acheter : comparatif des trois formules, ce qui est inclus et comment choisir. Guide Europbots.",
  alternates: { canonical: "/location-leasing-robot" },
};

const rows: [string, string, string, string][] = [
  ["Durée", "Quelques jours à quelques semaines", "Plusieurs années, loyer mensuel", "Illimitée, le robot vous appartient"],
  ["Investissement initial", "Aucun", "Aucun", "Prix du robot"],
  ["Installation et cartographie", "Incluses", "Incluses", "Incluses"],
  ["Formation des équipes", "Mise en route", "Incluse", "Incluse"],
  ["Maintenance et support", "Pendant la location", "Inclus pendant le contrat", "En option (contrat de maintenance)"],
  ["Idéal pour", "Salon, événement, test", "Exploitation quotidienne", "Parc en propre, usage intensif"],
];

const faq = [
  { q: "Qu'est-ce que le leasing de robot ?", a: "Le leasing est une location longue durée : l'entreprise paie un loyer mensuel pour utiliser le robot pendant plusieurs années, sans l'acheter. Chez Europbots, le loyer inclut l'installation, la cartographie, la formation et la maintenance pendant toute la durée du contrat." },
  { q: "Le leasing est-il plus avantageux que l'achat ?", a: "Le leasing évite d'immobiliser de la trésorerie et inclut la maintenance ; l'achat est pertinent pour un usage intensif sur une longue période. Le bon choix dépend de la durée d'utilisation prévue, du nombre de robots et de votre fiscalité : nous comparons les deux avec vous." },
  { q: "Combien coûte la location d'un robot ?", a: "Le tarif dépend du modèle, de la durée et du nombre de robots. Europbots établit un devis sous 24 h ouvrées à partir de votre besoin." },
  { q: "Peut-on tester un robot avant de s'engager en leasing ?", a: "Oui : par une démonstration en showroom ou sur site, ou par une location courte qui permet de valider l'usage en conditions réelles." },
  { q: "Que se passe-t-il en cas de panne ?", a: "Nos techniciens interviennent à distance puis sur site si nécessaire. En leasing, la maintenance est comprise dans le loyer." },
];

export default function GuidePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <main className="bg-paper pt-[72px]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="wrap pb-16 pt-16 md:pt-24">
        <Eyebrow>Guide · Formules</Eyebrow>
        <h1 className="t-display mt-6 max-w-[14ch] text-[clamp(2.3rem,6.4vw,6rem)]">
          Louer, leaser <span className="text-text-subtle">ou acheter un robot</span>
        </h1>
        <p className="mt-8 max-w-[62ch] text-[clamp(1.05rem,1.4vw,1.25rem)] leading-relaxed text-text-muted">
          Trois façons d&rsquo;équiper votre établissement d&rsquo;un robot de service, de nettoyage ou de logistique. Dans les trois cas, Europbots livre, cartographie vos locaux, paramètre le robot et forme vos équipes. Ce qui change : la durée, l&rsquo;investissement et la maintenance.
        </p>
      </section>

      <section className="wrap pb-24">
        <div className="-mx-[var(--gutter)] overflow-x-auto px-[var(--gutter)]" data-allow-overflow>
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="border-b border-ink">
                <th className="t-mono w-[22%] py-4 font-normal text-text-subtle">Critère</th>
                {formulas.map((f) => (
                  <th key={f.name} className={`t-h3 py-4 pr-4 text-[22px] ${f.featured ? "bg-ink px-4 text-on-dark" : ""}`}>{f.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(([k, ...v]) => (
                <tr key={k} className="border-b border-border">
                  <th className="t-mono py-4 pr-4 align-top font-normal text-text-muted">{k}</th>
                  {v.map((x, i) => (
                    <td key={i} className={`py-4 pr-4 align-top text-[16px] ${i === 1 ? "bg-ink px-4 text-on-dark" : ""}`}>{x}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button href="/contact?sujet=leasing#devis">Recevoir une simulation de loyer</Button>
          <Button href={BOOKING_HREF} variant="line">Demander une démo</Button>
        </div>
      </section>

      <section className="border-t border-border bg-paper py-24 md:py-32">
        <div className="wrap grid gap-12 lg:grid-cols-3">
          {formulas.map((f) => (
            <article key={f.name}>
              <p className="t-mono text-text-subtle">{f.for}</p>
              <h2 className="t-h3 mt-3 text-[34px]">{f.name}</h2>
              <p className="mt-4 text-[17px] leading-relaxed text-text-muted">{f.text}</p>
              <ul className="mt-6 grid gap-2.5 border-t border-border pt-6 text-[15px]">
                {f.lines.map((l) => (
                  <li key={l} className="flex gap-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2.4" className="mt-0.5 shrink-0" aria-hidden><path d="M5 12l5 5L20 7" /></svg>
                    {l}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-surface py-24 md:py-32">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>Questions</Eyebrow>
            <h2 className="t-h2 mt-5 max-w-[14ch]">Location et leasing de robots.</h2>
          </div>
          <Faq items={faq} />
        </div>
      </section>

      <CtaFinal />
    </main>
  );
}
