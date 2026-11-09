// Accueil — sections et sources dans PLAN.md / PROVENANCE.md.
import Link from "next/link";
import Catalogue from "@/components/Catalogue";
import CtaFinal from "@/components/CtaFinal";
import Faq from "@/components/Faq";
import HeroVideo from "@/components/HeroVideo";
import MapEmbed from "@/components/MapEmbed";
import RangePanels from "@/components/RangePanels";
import Simulator from "@/components/Simulator";
import { pricing } from "@/lib/pricing";
import Sectors from "@/components/Sectors";
import { CountUp, LineReveal, Reveal } from "@/components/motion";
import { Arrow, Button, Eyebrow } from "@/components/ui";
import { formulas, homeFaq, sectors, steps } from "@/lib/home";
import { categories, getRobot, makers, robots, robotsBy, type CategoryId } from "@/lib/robots";
import { BOOKING_HREF, demoFor, showrooms } from "@/lib/site";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function Home() {
  const nova = getRobot("novabot")!;
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* 1. Hero — dafolle (hero qui recule) + bluestar (titre affiche bas de page) */}
      <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden text-on-dark">
        <HeroVideo poster="/assets/robots/novabot/situation.webp" src="/assets/video/hero.mp4" />
        <div className="wrap pb-10 pt-32 md:pb-14">
          <Eyebrow onDark>Leasing dès 500 € HT / mois · Location · Achat</Eyebrow>
          <h1 className="t-display mt-6 text-[clamp(2.6rem,9.2vw,9.5rem)]">
            <LineReveal lines={["Robotique", "de service", <span key="a" className="text-lime">accessible.</span>]} />
          </h1>
          <div className="mt-10 grid gap-8 border-t border-on-dark/15 pt-8 md:grid-cols-[1fr_auto] md:items-end">
            <p className="max-w-[52ch] text-[clamp(1.05rem,1.4vw,1.25rem)] leading-relaxed text-on-dark-muted">
              Robots d&rsquo;accueil, serveurs, autolaveuses et robots logistiques, en location ou en leasing. Nous les installons, cartographions vos locaux et assurons le support.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href={BOOKING_HREF}>Demander une démo</Button>
              <Button href="#catalogue" variant="line" onDark>Voir le catalogue</Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Bande chiffres + constructeurs — waalaxy (marquee 40 px/s, masque 12 %) */}
      <section className="border-b border-border bg-paper">
        <div className="wrap"><div className="grid grid-cols-2 gap-px bg-border md:grid-cols-4">
          {[
            [String(robots.length), "robots au catalogue"],
            ["500 €", "HT par mois, leasing sur 36 mois"],
            ["2", "showrooms ouverts, 3 en préparation"],
            ["24 h", "pour recevoir votre devis"],
          ].map(([v, l]) => (
            <div key={l} className="bg-paper px-4 py-8 first:pl-0 md:px-6 [&:nth-child(3)]:pl-0 md:[&:nth-child(3)]:pl-6">
              <CountUp value={v} className="block text-[clamp(2.2rem,3.6vw,3.4rem)] t-h3 " />
              <span className="mt-1 block text-[14px] text-text-muted">{l}</span>
            </div>
          ))}
        </div></div>
        <div className="marquee-mask overflow-hidden border-t border-border py-6" data-allow-overflow>
          <div className="marquee flex w-max items-center gap-16 pr-16">
            {[...makers, ...makers, ...makers, ...makers].map((m, i) => (
              <span key={i} className="flex items-center gap-16 whitespace-nowrap font-brand text-[18px] font-bold uppercase tracking-[0.08em] text-text-subtle">
                {m}
                <span className="h-1.5 w-1.5 rounded-full bg-lime" aria-hidden />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Manifeste — attio M25 (texte révélé), mise en page asymétrique */}
      <section className="bg-paper py-28 md:py-40">
        <div className="wrap grid gap-14 lg:grid-cols-[0.35fr_1fr]">
          <Eyebrow index="01">Notre métier</Eyebrow>
          <div>
            <Reveal as="p" className="text-[clamp(1.6rem,3.3vw,3rem)] font-medium leading-[1.12] tracking-[-0.035em]">
              Vos équipes gardent l&rsquo;accueil, le conseil et la relation client.{" "}
              <span className="text-text-subtle">Nos robots prennent les trajets, le ménage et les charges, avec une régularité que l&rsquo;on peut mesurer.</span>
            </Reveal>
            <div className="mt-16 grid gap-10 border-t border-border pt-10 md:grid-cols-3">
              {[
                ["Leasing", "Dès 500 € HT par mois sur 36 mois, sans investissement lourd."],
                ["Clé en main", "Livraison, cartographie, paramétrage et formation de vos équipes."],
                ["Support", "Des techniciens à distance et sur site, pendant toute la durée du contrat."],
              ].map(([t, d]) => (
                <div key={t}>
                  <h3 className="text-[20px] t-h3 ">{t}</h3>
                  <p className="mt-2 text-[16px] leading-relaxed text-text-muted">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Les trois gammes — clickway (panneaux extensibles) */}
      <section className="bg-paper pb-28 md:pb-40">
        <div className="wrap">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow index="02">Trois gammes</Eyebrow>
              <h2 className="t-h2 mt-5 max-w-[16ch]">Un robot pour chaque geste répétitif.</h2>
            </div>
            <Link href="/robots" className="ulink flex items-center gap-2 text-[15px] font-semibold">Tout le catalogue <Arrow size={14} /></Link>
          </div>
          <RangePanels
            panels={(Object.keys(categories) as CategoryId[]).map((id) => ({
              id,
              name: categories[id].name,
              title: categories[id].title,
              lead: categories[id].lead,
              photo: categories[id].photo,
              count: robotsBy(id).length,
              names: robotsBy(id).map((r) => r.name),
            }))}
          />
        </div>
      </section>

      {/* 5. Catalogue complet — linkupapi (onglets glider) + cartes projets dafolle */}
      <section id="catalogue" className="scroll-mt-20 border-t border-border bg-paper py-28 md:py-36">
        <div className="wrap">
          <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div>
              <Eyebrow index="03">Catalogue</Eyebrow>
              <h2 className="t-h2 mt-5">Les {robots.length} robots, disponibles en location, leasing ou achat.</h2>
            </div>
            <p className="text-[17px] leading-relaxed text-text-muted lg:justify-self-end lg:text-right">
              Chaque fiche détaille les usages, les chiffres clés, la fiche technique et les questions fréquentes.
            </p>
          </div>
          <Catalogue robots={robots} mobileLimit={4} />
        </div>
      </section>

      {/* 6. Robot à la une — fiche produit Europbots (image + données) sur fond sombre */}
      <section className="bg-ink py-28 text-on-dark md:py-36">
        <div className="wrap grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          <div className="relative aspect-[4/5] overflow-hidden lg:aspect-[5/6]">
            <img src={nova.photo!} alt="Novabot accueillant des visiteurs dans un hall" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            <span className="t-mono absolute left-5 top-5 bg-lime px-2.5 py-1 text-ink">À la une</span>
          </div>
          <div>
            <Eyebrow onDark>{nova.maker} · {nova.label}</Eyebrow>
            <h2 className="t-display mt-6 text-[clamp(2.6rem,6vw,5.5rem)]">{nova.name}</h2>
            <p className="mt-6 max-w-[48ch] text-[18px] leading-relaxed text-on-dark-muted">{nova.intro[0]}</p>
            <div className="mt-10 grid grid-cols-2 gap-px bg-ink-line">
              {nova.stats.map((s) => (
                <div key={s.label} className="bg-ink py-6 pr-6">
                  <CountUp value={s.value} className="grad-dark block text-[clamp(2.4rem,4vw,3.6rem)] t-h3 leading-none " />
                  <span className="t-mono mt-2 block text-on-dark-subtle">{s.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href={`/robots/${nova.slug}`}>Découvrir le Novabot</Button>
              <Button href={demoFor(nova.slug)} variant="line" onDark>Demander une démo</Button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Formules — pricing.md (offre phare au centre, CTA plein, autres en contour, prix sur devis) */}
      <section className="bg-surface py-28 md:py-36">
        <div className="wrap">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <Eyebrow index="04">Formules</Eyebrow>
            <h2 className="t-h2 mt-5">Louer, prendre en leasing ou acheter.</h2>
            <p className="mt-4 text-[17px] text-text-muted">Les trois formules incluent l&rsquo;installation et la formation. Leasing sur 36 mois à partir de 500 € HT par mois ; location courte et achat sur devis, sous 24 h.</p>
          </div>
          <div className="grid gap-4 lg:grid-cols-3 lg:items-stretch">
            {formulas.map((f) => (
              <div key={f.name} className={`relative flex flex-col p-8 md:p-10 ${f.featured ? "bg-ink text-on-dark lg:-my-4 lg:py-14" : "bg-paper"}`}>
                {f.featured && <span className="t-mono absolute right-6 top-6 bg-lime px-2.5 py-1 text-ink">Le plus choisi</span>}
                <p className={`t-mono ${f.featured ? "text-on-dark-muted" : "text-text-subtle"}`}>{f.for}</p>
                <h3 className="mt-3 text-[clamp(2.2rem,3.4vw,3rem)] t-h3 leading-none">{f.name}</h3>
                <p className={`mt-3 text-[18px] font-medium ${f.featured ? "text-lime" : "text-text-muted"}`}>{f.price}</p>
                <p className={`mt-4 text-[16px] leading-relaxed ${f.featured ? "text-on-dark-muted" : "text-text-muted"}`}>{f.text}</p>
                <ul className={`mt-8 grid gap-3 border-t pt-8 text-[15px] ${f.featured ? "border-ink-line" : "border-border"}`}>
                  {f.lines.map((l) => (
                    <li key={l} className="flex gap-3">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={f.featured ? "var(--lime)" : "var(--ink)"} strokeWidth="2.4" className="mt-0.5 shrink-0" aria-hidden><path d="M5 12l5 5L20 7" /></svg>
                      {l}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-10">
                  <Button href={f.href} variant={f.featured ? "lime" : "line"} className="w-full justify-between">{f.cta}</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 bis. Rentabilité — simulateur (chiffres Europbots) */}
      <section id="simulateur" className="scroll-mt-20 bg-ink py-28 text-on-dark md:py-36">
        <div className="wrap">
          <div className="mb-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <Eyebrow onDark>Rentabilité</Eyebrow>
              <h2 className="t-h2 mt-5 max-w-[20ch]">
                Un robot à {pricing.leaseFrom} € par mois n&rsquo;a pas besoin de remplacer un salarié <span className="text-lime">pour être rentable.</span>
              </h2>
            </div>
            <p className="max-w-[48ch] text-[17px] leading-relaxed text-on-dark-muted lg:justify-self-end">
              Il lui suffit de faire économiser assez d&rsquo;heures de travail. À 13 € de l&rsquo;heure, le loyer est couvert dès 39 heures évitées par mois, soit moins de deux heures par jour. Réglez les curseurs selon votre activité.
            </p>
          </div>
          <Simulator compact />
        </div>
      </section>

      {/* 8. Méthode — étapes numérotées à filet (lemlist / scalead process), fond papier */}
      <section className="bg-paper py-28 md:py-36">
        <div className="wrap">
          <div className="grid gap-6 lg:grid-cols-[0.35fr_1fr]">
            <Eyebrow index="05">Déploiement</Eyebrow>
            <h2 className="t-h2 max-w-[18ch]">De la démonstration au premier service, en quatre étapes.</h2>
          </div>
          <ol className="mt-16 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.t} className="group bg-paper py-8 md:p-8 md:first:pl-0">
                <span className="font-display text-[72px] font-medium leading-none text-surface-2 transition-colors duration-500 group-hover:text-lime">{i + 1}</span>
                <h3 className="mt-6 text-[21px] t-h3 ">{s.t}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-text-muted">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 9. Secteurs — dafolle (liste + image collante qui suit le survol) */}
      <section className="border-t border-border bg-paper py-28 md:py-36">
        <div className="wrap">
          <div className="mb-14">
            <Eyebrow index="06">Secteurs</Eyebrow>
            <h2 className="t-h2 mt-5 max-w-[20ch]">Restaurants, hôtels, commerces, hôpitaux, entrepôts.</h2>
          </div>
          <Sectors sectors={sectors} />
        </div>
      </section>

      {/* 10. Showrooms — bande sombre de villes, statut live (atrakt B1) */}
      <section className="bg-ink py-24 text-on-dark md:py-32">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="t-h2 max-w-[16ch]">Voyez-les travailler avant de choisir.</h2>
            <Button href="/showrooms" variant="line" onDark>Nos showrooms</Button>
          </div>
          <ul className="mt-14 grid border-t border-ink-line md:grid-cols-5">
            {showrooms.map((s) => (
              <li key={s.city} className="border-b border-ink-line py-6 md:border-b-0 md:border-r md:px-6 md:py-8 md:first:pl-0 md:last:border-r-0">
                <span className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    {s.open && <span className="ping absolute inline-flex h-full w-full rounded-full bg-lime opacity-60" />}
                    <span className={`relative inline-flex h-2 w-2 rounded-full ${s.open ? "bg-lime" : "bg-on-dark-subtle"}`} />
                  </span>
                  <span className="t-mono text-on-dark-subtle">{s.open ? "Ouvert" : "Bientôt"}</span>
                </span>
                <p className="mt-4 text-[26px] t-h3 ">{s.city}</p>
                <p className="mt-1 text-[14px] text-on-dark-muted">{s.open ? s.address : s.country}</p>
              </li>
            ))}
          </ul>
          <MapEmbed address={showrooms[0].address} label="Europbots Paris · siège et showroom" className="mt-12 aspect-[4/3] w-full border border-ink-line md:aspect-[21/8]" />
        </div>
      </section>

      {/* 11. FAQ — clicknland §1 */}
      <section className="bg-paper py-28 md:py-36">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow index="07">Questions</Eyebrow>
            <h2 className="t-h2 mt-5 max-w-[14ch]">Avant de vous lancer.</h2>
            <p className="mt-5 max-w-sm text-[17px] text-text-muted">
              Une autre question ? Appelez-nous au <a href="tel:+33185370337" className="font-semibold text-ink underline underline-offset-4">01 85 37 03 37</a>.
            </p>
          </div>
          <Faq items={homeFaq} />
        </div>
      </section>

      <CtaFinal />
    </main>
  );
}
