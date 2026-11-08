import type { Metadata } from "next";
import CtaFinal from "@/components/CtaFinal";
import MapEmbed from "@/components/MapEmbed";
import { Button, Eyebrow } from "@/components/ui";
import { BOOKING_HREF, showrooms } from "@/lib/site";

export const metadata: Metadata = {
  title: "Showrooms robots à Paris et Clermont-Ferrand",
  description:
    "Voyez nos robots de service, de nettoyage et de logistique fonctionner en conditions réelles dans nos showrooms de Paris et de Clermont-Ferrand. Lyon, Marseille et Lisbonne ouvrent prochainement.",
  alternates: { canonical: "/showrooms" },
};

const mapUrl = (a: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a)}`;

export default function ShowroomsPage() {
  const open = showrooms.filter((s) => s.open);
  const soon = showrooms.filter((s) => !s.open);
  return (
    <main className="bg-paper pt-[72px]">
      <section className="wrap pb-16 pt-16 md:pt-24">
        <Eyebrow>Rencontrez nos robots</Eyebrow>
        <h1 className="t-display mt-6 text-[clamp(2.4rem,7.6vw,7.4rem)]">Show<span className="text-text-subtle">rooms</span></h1>
        <p className="mt-8 max-w-[58ch] text-[clamp(1.05rem,1.4vw,1.25rem)] leading-relaxed text-text-muted">
          Voyez les robots se déplacer, servir et nettoyer en conditions réelles, échangez avec nos experts et repartez avec un plan de déploiement pour votre établissement.
        </p>
      </section>

      <section className="wrap grid gap-4 pb-24 lg:grid-cols-2">
        {open.map((s, i) => (
          <article key={s.city} className="group relative isolate flex min-h-[520px] flex-col justify-between overflow-hidden bg-ink p-8 text-on-dark md:p-10">
            <img src={i === 0 ? "/assets/robots/novabot/situation.webp" : "/assets/robots/l3/situation.webp"} alt={`Showroom Europbots ${s.city}`} className="absolute inset-0 -z-10 h-full w-full scale-[1.04] object-cover opacity-55 transition-transform duration-[900ms] ease-[cubic-bezier(.32,.72,0,1)] group-hover:scale-100" loading={i === 0 ? "eager" : "lazy"} />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2"><span className="ping absolute inline-flex h-full w-full rounded-full bg-lime opacity-60" /><span className="relative h-2 w-2 rounded-full bg-lime" /></span>
              <span className="t-mono text-on-dark-muted">Ouvert · {s.note}</span>
            </div>
            <div>
              <h2 className="t-display text-[clamp(2.2rem,4.4vw,4rem)]">{s.city}</h2>
              <p className="mt-4 text-[18px]">{s.address}</p>
              <p className="t-mono mt-2 text-on-dark-subtle">{s.hours} · sur rendez-vous</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={BOOKING_HREF}>Planifier une visite</Button>
                <a href={mapUrl(s.address)} target="_blank" rel="noopener noreferrer" className="btn btn-line on-dark">
                  <span>Itinéraire</span>
                  <span className="btn-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden><path d="M7 17L17 7M9 7h8v8" /></svg><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden><path d="M7 17L17 7M9 7h8v8" /></svg></span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="wrap grid gap-4 pb-24 lg:grid-cols-2">
        {open.map((s) => (
          <div key={s.city}>
            <MapEmbed address={s.address} label={`Europbots ${s.city}`} className="aspect-[4/3] w-full" />
            <p className="t-mono mt-3 text-text-subtle">{s.city} · {s.address}</p>
          </div>
        ))}
      </section>

      <section className="border-t border-border">
        <div className="wrap grid gap-10 py-20 lg:grid-cols-[0.6fr_1.4fr]">
          <div>
            <Eyebrow>Prochaines ouvertures</Eyebrow>
            <p className="mt-5 max-w-sm text-[17px] text-text-muted">Pas de showroom près de chez vous ? Nous organisons la démonstration sur votre site ou en visio.</p>
          </div>
          <ul className="grid border-t border-border md:grid-cols-3">
            {soon.map((s) => (
              <li key={s.city} className="border-b border-border py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0">
                <p className="t-mono text-text-subtle">{s.country}</p>
                <p className="mt-3 text-[32px] t-h3 ">{s.city}</p>
                <p className="mt-1 text-[15px] text-text-muted">Ouverture prochaine</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaFinal />
    </main>
  );
}
