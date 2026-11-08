// Pages de gamme : page d'atterrissage SEO par famille (« robot de service », « robot de nettoyage », « robot logistique »).
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CtaFinal from "@/components/CtaFinal";
import RobotCard from "@/components/RobotCard";
import { LineReveal } from "@/components/motion";
import { Button, Eyebrow } from "@/components/ui";
import { categories, robotsBy, type CategoryId } from "@/lib/robots";
import { BOOKING_HREF } from "@/lib/site";

export function generateStaticParams() {
  return Object.keys(categories).map((categorie) => ({ categorie }));
}

const get = (id: string) => (id in categories ? categories[id as CategoryId] : null);

export async function generateMetadata({ params }: { params: Promise<{ categorie: string }> }): Promise<Metadata> {
  const c = get((await params).categorie);
  if (!c) return {};
  return { title: c.seoTitle, description: c.metaDescription, alternates: { canonical: `/gammes/${c.id}` } };
}

export default async function RangePage({ params }: { params: Promise<{ categorie: string }> }) {
  const c = get((await params).categorie);
  if (!c) notFound();
  const list = robotsBy(c.id);
  const others = (Object.keys(categories) as CategoryId[]).filter((x) => x !== c.id);

  return (
    <main>
      <section className="relative isolate flex min-h-[78svh] items-end overflow-hidden bg-ink text-on-dark">
        <img src={c.photo} alt={c.title} className="absolute inset-0 -z-10 h-full w-full object-cover opacity-60" fetchPriority="high" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/50 to-ink/20" />
        <div className="wrap pb-14 pt-36">
          <Eyebrow onDark>Gamme {c.name} · {list.length} robots</Eyebrow>
          <h1 className="t-display mt-6 text-[clamp(2.4rem,7vw,6.8rem)]">
            <LineReveal lines={c.title.split(" ").reduce<string[]>((acc, w, i, all) => (i < Math.ceil(all.length / 2) ? [acc[0] ? `${acc[0]} ${w}` : w, acc[1] ?? ""] : [acc[0], acc[1] ? `${acc[1]} ${w}` : w]), [])} />
          </h1>
          <div className="mt-10 grid gap-8 border-t border-on-dark/15 pt-8 md:grid-cols-[1fr_auto] md:items-end">
            <p className="max-w-[56ch] text-[18px] leading-relaxed text-on-dark-muted">{c.lead}</p>
            <Button href={BOOKING_HREF}>Demander une démo</Button>
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 md:py-32">
        <div className="wrap">
          <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((r, i) => (
              <RobotCard key={r.slug} robot={r} index={i} priority={i < 4} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-paper py-20">
        <div className="wrap flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <h2 className="text-[28px] t-h3 ">Les autres gammes</h2>
          <div className="flex flex-wrap gap-3">
            {others.map((o) => (
              <Button key={o} href={`/gammes/${o}`} variant="line" size="sm">{categories[o].title}</Button>
            ))}
          </div>
        </div>
      </section>

      <CtaFinal photo={c.photo} />
    </main>
  );
}
