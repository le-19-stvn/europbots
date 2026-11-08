// Guide : location courte, leasing ou achat. Page de réponse (SEO « location robot », « leasing robot » ; GEO : tableau comparatif et définitions).
import type { Metadata } from "next";
import CtaFinal from "@/components/CtaFinal";
import Faq from "@/components/Faq";
import { Button, Eyebrow } from "@/components/ui";
import Simulator from "@/components/Simulator";
import { formulas } from "@/lib/home";
import { employeeComparison, eur, pricing, simulate } from "@/lib/pricing";
import { BOOKING_HREF } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Leasing de robot dès 500 € HT/mois : prix, rentabilité et comparatif" },
  description:
    "Leasing de robot professionnel à partir de 500 € HT par mois sur 36 mois. Simulateur de rentabilité, seuil d'heures à économiser, comparatif avec un salarié et avec la location ou l'achat.",
  alternates: { canonical: "/location-leasing-robot" },
};

const rows: [string, string, string, string][] = [
  ["Prix", "Sur devis", "Dès 500 € HT / mois", "Sur devis"],
  ["Durée", "Quelques jours à quelques semaines", "36 mois, loyer mensuel", "Illimitée, le robot vous appartient"],
  ["Investissement initial", "Aucun", "Pas d'investissement important", "Prix du robot"],
  ["Installation et cartographie", "Incluses", "Incluses", "Incluses"],
  ["Formation des équipes", "Mise en route", "Incluse", "Incluse"],
  ["Support technique", "Pendant la location", "Inclus", "Inclus à la mise en service"],
  ["Maintenance", "Pendant la location", "Selon les conditions du contrat", "En option (contrat de maintenance)"],
  ["Idéal pour", "Salon, événement, test", "Exploitation quotidienne", "Parc en propre, usage intensif"],
];

const faq = [
  { q: "Qu'est-ce que le leasing de robot ?", a: "Le leasing est une location longue durée : l'entreprise paie un loyer mensuel pour utiliser le robot pendant plusieurs années, sans l'acheter. Chez Europbots, il démarre à 500 € HT par mois sur 36 mois et comprend l'installation, la cartographie, la formation et le support technique ; l'étendue de la maintenance est précisée dans le contrat." },
  { q: "Le leasing est-il plus avantageux que l'achat ?", a: "Le leasing évite d'immobiliser de la trésorerie et donne un budget mensuel prévisible ; l'achat est pertinent pour un usage intensif sur une longue période. Le bon choix dépend de la durée d'utilisation prévue, du nombre de robots et de votre fiscalité : nous comparons les deux avec vous." },
  { q: "Combien coûte le leasing d'un robot ?", a: "À partir de 500 € HT par mois sur 36 mois, selon le modèle et le nombre de robots. La location courte durée et l'achat se font sur devis, établi sous 24 h ouvrées." },
  { q: "Combien d'heures un robot doit-il économiser pour être rentable ?", a: "Avec un loyer de 500 € HT et un coût horaire employeur de 13 €, il faut éviter environ 39 heures de travail rémunéré par mois, soit 1,75 heure par jour sur 22 jours. À 4 heures par jour, le gain net estimé atteint 644 € par mois, 7 728 € par an et 23 184 € sur 36 mois." },
  { q: "Un robot remplace-t-il un salarié ?", a: "Rarement en totalité : un robot est spécialisé, un salarié est polyvalent. Le bon calcul n'est pas « robot contre salarié » mais le nombre d'heures de tâches répétitives que le robot prend en charge. Les économies ne sont réelles que si ces heures réduisent les dépenses de personnel ou évitent un recrutement." },
  { q: "Peut-on tester un robot avant de s'engager en leasing ?", a: "Oui : par une démonstration en showroom ou sur site, ou par une location courte qui permet de valider l'usage en conditions réelles." },
  { q: "Que se passe-t-il en cas de panne ?", a: "Nos techniciens interviennent à distance puis sur site si nécessaire. L'étendue de la maintenance est précisée dans le contrat." },
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
          Trois façons d&rsquo;équiper votre établissement d&rsquo;un robot de service, de nettoyage ou de logistique. Dans les trois cas, Europbots livre, cartographie vos locaux, paramètre le robot et forme vos équipes. Ce qui change : la durée, l&rsquo;investissement et la maintenance. En leasing, la gamme démarre à 500 € HT par mois sur 36 mois.
        </p>
      </section>

      <section className="wrap pb-24">
        {/* Mobile : une carte par formule */}
        <div className="grid gap-3 md:hidden">
          {formulas.map((f, i) => (
            <div key={f.name} className={`p-6 ${f.featured ? "bg-ink text-on-dark" : "bg-surface"}`}>
              <p className="t-h3 text-[26px]">{f.name}</p>
              <dl className="mt-4 grid gap-3">
                {rows.map(([k, ...v]) => (
                  <div key={k} className={`grid grid-cols-[0.8fr_1.2fr] gap-3 border-t pt-3 ${f.featured ? "border-ink-line" : "border-border"}`}>
                    <dt className={`t-mono ${f.featured ? "text-on-dark-subtle" : "text-text-subtle"}`}>{k}</dt>
                    <dd className="text-[15px]">{v[i]}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
        <div className="hidden md:block">
          <table className="w-full border-collapse text-left">
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
          <Button href="#simulateur">Calculer ma rentabilité</Button>
          <Button href={BOOKING_HREF} variant="line">Demander une démo</Button>
        </div>
      </section>

      <section id="simulateur" className="scroll-mt-20 bg-ink py-24 text-on-dark md:py-32">
        <div className="wrap">
          <Eyebrow onDark>Simulateur</Eyebrow>
          <h2 className="t-h2 mt-5 max-w-[22ch]">Combien d&rsquo;heures votre robot doit-il vous faire gagner ?</h2>
          <p className="mt-5 max-w-[60ch] text-[17px] leading-relaxed text-on-dark-muted">
            À un coût horaire employeur de {pricing.hourlyCost} €, un loyer de {eur(pricing.leaseFrom)} est couvert dès {Math.ceil(simulate({ hoursPerDay: 1 }).breakEvenHoursMonth)} heures de travail rémunéré évitées par mois. Au-delà, chaque heure économisée devient un gain.
          </p>
          <div className="mt-12">
            <Simulator />
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 md:py-32">
        <div className="wrap grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <Eyebrow>Repère</Eyebrow>
            <h2 className="t-h2 mt-5 max-w-[16ch]">Un salarié, un robot : sur {pricing.leaseMonths} mois.</h2>
            <p className="mt-5 max-w-[46ch] text-[17px] leading-relaxed text-text-muted">
              Base : un salarié au SMIC à temps plein, coût employeur estimé à {eur(pricing.employeeMonthly)} par mois, face au premier loyer de la gamme. L&rsquo;écart atteint {eur((pricing.employeeMonthly - pricing.leaseFrom) * pricing.leaseMonths)} sur trois ans.
            </p>
            <p className="mt-5 max-w-[46ch] border-l-2 border-lime pl-4 text-[15px] leading-relaxed text-text-muted">
              Cet écart n&rsquo;est pas une économie automatique : il suppose que le robot remplace tout le travail comparé, ce qui est rarement le cas. Le simulateur ci-dessus, fondé sur les heures réellement économisées, est le calcul à retenir.
            </p>
          </div>
          <div className="min-w-0">
            <table className="w-full table-fixed border-collapse text-left">
              <thead>
                <tr className="border-b border-ink">
                  <th className="t-mono w-[34%] py-4 font-normal text-text-subtle">Critère</th>
                  <th className="t-h3 py-4 pr-3 text-[18px] md:text-[20px]">Salarié</th>
                  <th className="t-h3 bg-ink px-3 py-4 text-[18px] text-on-dark md:px-4 md:text-[20px]">Robot</th>
                </tr>
              </thead>
              <tbody>
                {employeeComparison.map(([k, a, b]) => (
                  <tr key={k} className="border-b border-border">
                    <th className="t-mono w-[34%] break-words py-4 pr-3 align-top font-normal text-text-muted">{k}</th>
                    <td className="py-4 pr-3 align-top text-[15px] md:text-[16px]">{a}</td>
                    <td className="bg-ink px-3 py-4 align-top text-[15px] text-on-dark md:px-4 md:text-[16px]">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
