// d'après footers-cta.md (CTA final pleine largeur sur photo, titre affiche + 2 actions, réassurance d'une ligne).
import { Button } from "./ui";
import { LineReveal } from "./motion";
import { BOOKING_HREF } from "@/lib/site";

export default function CtaFinal({ photo = "/assets/robots/luckibot/situation.webp", title = ["Votre robot", "en service", "ce mois-ci."] }: { photo?: string; title?: string[] }) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-on-dark">
      <img src={photo} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-45" loading="lazy" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/80 to-ink/20" />
      <div className="wrap grid gap-12 py-28 md:py-40 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <h2 className="t-display text-[clamp(2.4rem,7.4vw,7rem)]">
          <LineReveal lines={title.map((l, i) => (i === title.length - 1 ? <span key={l} className="text-lime">{l}</span> : l))} />
        </h2>
        <div className="max-w-md">
          <p className="text-[18px] leading-relaxed text-on-dark-muted">
            Démonstration dans nos showrooms ou sur votre site, cartographie de vos locaux, formation des équipes : nous préparons le déploiement avec vous.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={BOOKING_HREF}>Demander une démo</Button>
            <Button href="/contact#devis" variant="line" onDark>Demander un devis</Button>
          </div>
          <p className="t-mono mt-5 text-on-dark-subtle">Réponse sous 24 h ouvrées</p>
        </div>
      </div>
    </section>
  );
}
