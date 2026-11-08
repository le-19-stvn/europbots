// Fiche robot — structure de la fiche produit Europbots actuelle (hero, chiffres, fonctionnalités collantes, specs),
// enrichie pour le SEO : introduction, usages, FAQ, maillage par gamme. Sources dans PROVENANCE.md.
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaFinal from "@/components/CtaFinal";
import Faq from "@/components/Faq";
import RobotCard from "@/components/RobotCard";
import StickyFeatures from "@/components/StickyFeatures";
import { CountUp, Reveal } from "@/components/motion";
import { Arrow, Button, Eyebrow, Stage } from "@/components/ui";
import { categories, getRobot, robots, summary } from "@/lib/robots";
import { BOOKING_HREF, SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return robots.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const r = getRobot((await params).slug);
  if (!r) return {};
  return {
    title: { absolute: r.seoTitle },
    description: r.metaDescription,
    keywords: r.keywords,
    alternates: { canonical: `/robots/${r.slug}` },
    openGraph: { title: r.seoTitle, description: r.metaDescription, images: [{ url: r.photo ?? r.image, alt: r.name }] },
  };
}

export default async function RobotPage({ params }: { params: Promise<{ slug: string }> }) {
  const r = getRobot((await params).slug);
  if (!r) notFound();
  const cat = categories[r.category];
  const idx = robots.findIndex((x) => x.slug === r.slug);
  const prev = robots[(idx - 1 + robots.length) % robots.length];
  const next = robots[(idx + 1) % robots.length];
  const related = robots.filter((x) => x.category === r.category && x.slug !== r.slug).slice(0, 4);
  const url = `${SITE_URL}/robots/${r.slug}`;
  const brief = summary(r);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: `${r.maker} ${r.name}`,
      brand: { "@type": "Brand", name: r.maker },
      description: r.metaDescription,
      image: [`${SITE_URL}${r.image}`, ...(r.photo ? [`${SITE_URL}${r.photo}`] : [])],
      category: cat.title,
      url,
      additionalProperty: r.specs.map((s) => ({ "@type": "PropertyValue", name: s.label, value: s.value })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: cat.title, item: `${SITE_URL}/gammes/${r.category}` },
        { "@type": "ListItem", position: 3, name: r.name, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: r.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero produit */}
      <section className="bg-paper pt-[72px]">
        <div className="wrap pt-6">
          <nav aria-label="Fil d'Ariane" className="t-mono flex flex-wrap items-center gap-2 text-text-subtle">
            <Link href="/" className="hover:text-ink">Accueil</Link>
            <span>/</span>
            <Link href={`/gammes/${r.category}`} className="hover:text-ink">{cat.name}</Link>
            <span>/</span>
            <span className="text-ink">{r.name}</span>
          </nav>
        </div>
        <div className="wrap grid gap-10 pb-16 pt-10 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16 lg:pb-24">
          <div>
            <Eyebrow>{r.maker} · {r.label}</Eyebrow>
            <h1 className="t-display mt-6 text-[clamp(2.8rem,7vw,6.5rem)]">{r.name}</h1>
            <p className="mt-6 text-[clamp(1.35rem,2vw,1.75rem)] font-medium leading-snug tracking-[-0.025em]">{r.tagline}</p>
            <p className="mt-5 max-w-[54ch] text-[17px] leading-relaxed text-text-muted">{r.desc}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href={`/contact?robot=${r.slug}#devis`}>Demander un devis</Button>
              <Button href={BOOKING_HREF} variant="line">Demander une démo</Button>
            </div>
            <p className="t-mono mt-6 text-text-subtle">Leasing 36 mois · gamme dès 500 € HT / mois · <Link href="/location-leasing-robot#simulateur" className="underline underline-offset-4 hover:text-ink">calculer la rentabilité</Link></p>
          </div>
          <Stage className="aspect-square overflow-hidden lg:aspect-[5/5.4]">
            <span className="floor-glow" />
            <img src={r.image} alt={`${r.maker} ${r.name}, ${cat.title.toLowerCase()}`} fetchPriority="high" className="absolute inset-0 m-auto h-[82%] w-[82%] object-contain mix-blend-multiply" />
            <span className="t-mono absolute bottom-5 left-5 text-text-subtle">Réf. {r.slug.toUpperCase()}</span>
            {r.highlight && (
              <div className="absolute right-5 top-5 bg-paper px-4 py-3">
                <p className="t-mono text-[12px] text-text-subtle">{r.highlight.label}</p>
                <p className="text-[20px] t-h3 ">{r.highlight.value}</p>
              </div>
            )}
          </Stage>
        </div>
      </section>

      {/* Bande chiffres */}
      <section className="bg-ink text-on-dark">
        <div className="wrap grid grid-cols-2 md:grid-cols-4">
          {r.stats.map((s, i) => (
            <div key={s.label} className={`py-10 md:py-14 ${i > 0 ? "md:border-l md:border-ink-line md:pl-8" : ""} ${i % 2 === 1 ? "border-l border-ink-line pl-6 md:pl-8" : ""}`}>
              <CountUp value={s.value} className="grad-dark block text-[clamp(2.4rem,5vw,4.5rem)] t-h3 leading-none " />
              <span className="t-mono mt-3 block text-on-dark-subtle">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* En bref : résumé factuel (GEO) */}
      <section className="border-b border-border bg-paper py-16 md:py-20">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <p className="t-mono text-text-subtle">En bref</p>
            <p className="mt-4 text-[clamp(1.15rem,1.6vw,1.4rem)] leading-relaxed">{brief.sentence}</p>
          </div>
          <dl className="grid content-start border-t border-ink sm:grid-cols-2 sm:gap-x-8">
            {brief.facts.map(([k, v]) => (
              <div key={k} className="border-b border-border py-3.5">
                <dt className="t-mono text-[12px] text-text-subtle">{k}</dt>
                <dd className="mt-1 text-[15px] font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Présentation SEO + photo en situation */}
      <section className="bg-paper py-24 md:py-32">
        <div className="wrap grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <Eyebrow index="01">Présentation</Eyebrow>
            <h2 className="t-h2 mt-5">Le {r.name} en quelques mots.</h2>
            <div className="mt-8 grid gap-5 text-[18px] leading-relaxed text-text-muted">
              <p>{r.intro[0]}</p>
              <p>{r.intro[1]}</p>
            </div>
            <h3 className="t-mono mt-12 text-ink">Où il travaille</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {r.uses.map((u) => (
                <li key={u} className="rounded-full border border-border px-3.5 py-1.5 text-[14px] font-medium">{u}</li>
              ))}
            </ul>
          </div>
          {r.photo ? (
            <Reveal className="relative aspect-[4/5] overflow-hidden bg-ink">
              <img src={r.photo} alt={`${r.name} en situation réelle`} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              <span className="t-mono absolute bottom-5 left-5 bg-paper px-2.5 py-1 text-ink">{r.name} en situation</span>
            </Reveal>
          ) : (
            <Stage dark className="relative aspect-[4/5] overflow-hidden">
              <img src={r.image} alt={`${r.name} de profil`} loading="lazy" className="absolute inset-0 m-auto h-[80%] w-[80%] object-contain" />
            </Stage>
          )}
        </div>
      </section>

      {/* Fonctionnalités collantes */}
      <section className="border-t border-border bg-paper pt-24 md:pt-32">
        <div className="wrap">
          <Eyebrow index="02">Fonctionnalités</Eyebrow>
          <h2 className="t-h2 mt-5 max-w-[20ch]">Ce qui fait la différence au quotidien.</h2>
          <div className="mt-6">
            <StickyFeatures robot={r} />
          </div>
        </div>
      </section>

      {/* Cas d'usage */}
      <section className="bg-ink py-24 text-on-dark md:py-32">
        <div className="wrap">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div>
              <Eyebrow index="03" onDark>Cas d&rsquo;usage</Eyebrow>
              <h2 className="t-h2 mt-5 max-w-[18ch]">Le {r.name} sur le terrain.</h2>
            </div>
            <p className="text-[17px] leading-relaxed text-on-dark-muted lg:justify-self-end lg:text-right">Trois situations où il change le quotidien des équipes.</p>
          </div>
          <div className="mt-14 grid gap-px bg-ink-line md:grid-cols-3">
            {r.cases.map((c, i) => (
              <article key={c.title} className="flex flex-col bg-ink p-0 py-8 md:px-8 md:py-10 md:first:pl-0">
                <div className="flex items-center justify-between">
                  <span className="t-mono text-lime">{c.place}</span>
                  <span className="t-mono text-on-dark-subtle">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="t-h3 mt-8 text-[clamp(1.5rem,2.2vw,1.9rem)]">{c.title}</h3>
                <p className="mt-4 text-[16px] leading-relaxed text-on-dark-muted">{c.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Fiche technique */}
      <section id="specs" className="bg-surface py-24 md:py-32">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <Eyebrow index="04">Fiche technique</Eyebrow>
            <h2 className="t-h2 mt-5">Caractéristiques du {r.name}.</h2>
            {r.specDesc && <p className="mt-5 max-w-md text-[17px] leading-relaxed text-text-muted">{r.specDesc}</p>}
            <p className="mt-8 text-[14px] text-text-subtle">Données constructeur ({r.maker}). Elles peuvent varier selon la version livrée.</p>
          </div>
          <dl className="border-t border-ink">
            {r.specs.map((s) => (
              <div key={s.label} className="grid grid-cols-[0.9fr_1.1fr] gap-6 border-b border-border py-5">
                <dt className="t-mono pt-0.5 text-text-muted">{s.label}</dt>
                <dd className="text-[17px] font-medium tracking-[-0.01em]">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-paper py-24 md:py-32">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow index="05">Questions fréquentes</Eyebrow>
            <h2 className="t-h2 mt-5 max-w-[14ch]">Tout savoir sur le {r.name}.</h2>
          </div>
          <Faq items={r.faq} />
        </div>
      </section>

      {/* Même gamme */}
      {related.length > 0 && (
        <section className="border-t border-border bg-paper py-24 md:py-32">
          <div className="wrap">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <h2 className="t-h2 max-w-[18ch]">Dans la gamme {cat.name.toLowerCase()}.</h2>
              <Link href={`/gammes/${r.category}`} className="ulink flex items-center gap-2 text-[15px] font-semibold">Toute la gamme <Arrow size={14} /></Link>
            </div>
            <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((x) => (
                <RobotCard key={x.slug} robot={x} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Précédent / suivant */}
      <nav className="grid border-t border-border bg-paper md:grid-cols-2" aria-label="Robot précédent et suivant">
        <Link href={`/robots/${prev.slug}`} className="group flex items-center gap-6 border-b border-border px-[var(--gutter)] py-10 md:border-b-0 md:border-r">
          <span className="grid h-12 w-12 rotate-180 place-items-center rounded-full border border-border transition-colors group-hover:bg-ink group-hover:text-lime"><Arrow /></span>
          <span>
            <span className="t-mono block text-text-subtle">Précédent</span>
            <span className="text-[24px] t-h3 ">{prev.name}</span>
          </span>
        </Link>
        <Link href={`/robots/${next.slug}`} className="group flex items-center justify-end gap-6 px-[var(--gutter)] py-10 text-right">
          <span>
            <span className="t-mono block text-text-subtle">Suivant</span>
            <span className="text-[24px] t-h3 ">{next.name}</span>
          </span>
          <span className="grid h-12 w-12 place-items-center rounded-full border border-border transition-colors group-hover:bg-ink group-hover:text-lime"><Arrow /></span>
        </Link>
      </nav>

      <CtaFinal photo={r.photo ?? undefined} title={["Le " + r.name, "chez vous,", "bientôt."]} />
    </main>
  );
}
