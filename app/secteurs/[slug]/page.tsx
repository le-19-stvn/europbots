// Page secteur : hero photo (même gabarit que les gammes), enjeux en 3 colonnes à filets, robots recommandés en lignes
// avec vignette (liste dafolle), étapes, FAQ. Sources dans PROVENANCE.md.
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaFinal from "@/components/CtaFinal";
import Faq from "@/components/Faq";
import Simulator from "@/components/Simulator";
import { LineReveal } from "@/components/motion";
import { Arrow, Button, Eyebrow, Stage } from "@/components/ui";
import { getRobot } from "@/lib/robots";
import { getSector, sectorPages } from "@/lib/sectors";
import { BOOKING_HREF, SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return sectorPages.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = getSector((await params).slug);
  if (!s) return {};
  return { title: { absolute: s.seoTitle }, description: s.metaDescription, alternates: { canonical: `/secteurs/${s.slug}` }, openGraph: { images: [{ url: s.photo }] } };
}

export default async function SectorPage({ params }: { params: Promise<{ slug: string }> }) {
  const s = getSector((await params).slug);
  if (!s) notFound();
  const words = s.h1.split(" ");
  const cut = Math.ceil(words.length / 2);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: s.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: s.name, item: `${SITE_URL}/secteurs/${s.slug}` },
      ],
    },
  ];

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative isolate flex min-h-[78svh] items-end overflow-hidden bg-ink text-on-dark">
        <img src={s.photo} alt={s.h1} className="absolute inset-0 -z-10 h-full w-full object-cover opacity-60" fetchPriority="high" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/50 to-ink/20" />
        <div className="wrap pb-14 pt-36">
          <Eyebrow onDark>Secteur · {s.name}</Eyebrow>
          <h1 className="t-display mt-6 text-[clamp(2.3rem,6.6vw,6.4rem)]">
            <LineReveal lines={[words.slice(0, cut).join(" "), <span key="b" className="text-lime">{words.slice(cut).join(" ")}</span>]} />
          </h1>
          <div className="mt-10 grid gap-8 border-t border-on-dark/15 pt-8 md:grid-cols-[1fr_auto] md:items-end">
            <p className="max-w-[58ch] text-[18px] leading-relaxed text-on-dark-muted">{s.intro[0]}</p>
            <Button href={BOOKING_HREF}>Demander une démo</Button>
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 md:py-32">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <Eyebrow index="01">Enjeux</Eyebrow>
            <h2 className="t-h2 mt-5 max-w-[14ch]">Ce que les robots changent.</h2>
            <p className="mt-6 max-w-[48ch] text-[17px] leading-relaxed text-text-muted">{s.intro[1]}</p>
          </div>
          <div className="grid gap-px self-start bg-border md:grid-cols-3">
            {s.challenges.map((c, i) => (
              <div key={c.t} className="bg-paper py-6 md:px-6 md:first:pl-0">
                <span className="t-mono text-text-subtle">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="t-h3 mt-4 text-[22px]">{c.t}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-text-muted">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-paper py-24 md:py-32">
        <div className="wrap">
          <Eyebrow index="02">Robots recommandés</Eyebrow>
          <h2 className="t-h2 mt-5 max-w-[20ch]">Quel robot pour quel besoin.</h2>
          <ul className="mt-12 border-t border-ink">
            {s.solutions.map((x) => {
              const r = getRobot(x.slug)!;
              return (
                <li key={x.slug} className="border-b border-border">
                  <Link href={`/robots/${r.slug}`} className="group grid grid-cols-[88px_1fr_auto] items-center gap-5 py-5 md:grid-cols-[120px_0.8fr_1.2fr_auto] md:gap-10">
                    <Stage className="aspect-square overflow-hidden">
                      <img src={r.image} alt={r.name} loading="lazy" className="absolute inset-0 m-auto h-[80%] w-[80%] object-contain mix-blend-multiply transition-transform duration-[700ms] ease-[cubic-bezier(.32,.72,0,1)] group-hover:scale-110" />
                    </Stage>
                    <div>
                      <p className="t-mono text-text-subtle">{r.maker}</p>
                      <h3 className="t-h3 mt-1 text-[clamp(1.4rem,2.4vw,2.2rem)]">{r.name}</h3>
                      <p className="mt-2 text-[15px] leading-snug text-text-muted md:hidden">{x.why}</p>
                    </div>
                    <p className="hidden text-[17px] leading-relaxed text-text-muted md:block">{x.why}</p>
                    <span className="grid h-11 w-11 place-items-center rounded-full border border-border transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-lime">
                      <Arrow size={15} />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {s.pitch && (
        <section className="bg-ink py-24 text-on-dark md:py-32">
          <div className="wrap">
            <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
              <div>
                <Eyebrow onDark>Rentabilité · leasing dès 500 € HT / mois</Eyebrow>
                <h2 className="t-h2 mt-5 max-w-[18ch]">{s.pitch.title}</h2>
              </div>
              <p className="max-w-[54ch] text-[17px] leading-relaxed text-on-dark-muted lg:justify-self-end">{s.pitch.text}</p>
            </div>
            <Simulator compact initialHours={s.pitch.hours} />
          </div>
        </section>
      )}

      <section className="bg-surface py-24 md:py-28">
        <div className="wrap">
          <Eyebrow index="03">Déploiement</Eyebrow>
          <ol className="mt-10 grid gap-px bg-border md:grid-cols-4">
            {s.steps.map((t, i) => (
              <li key={t} className="bg-surface py-6 md:px-6 md:first:pl-0">
                <span className="font-display text-[56px] font-medium leading-none text-surface-2">{i + 1}</span>
                <p className="t-h3 mt-4 text-[19px]">{t}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-paper py-24 md:py-32">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow index="04">Questions</Eyebrow>
            <h2 className="t-h2 mt-5 max-w-[14ch]">{s.name} : vos questions.</h2>
          </div>
          <Faq items={s.faq} />
        </div>
      </section>

      <CtaFinal photo={s.photo} />
    </main>
  );
}
