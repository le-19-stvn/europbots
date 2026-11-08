import type { Metadata } from "next";
import { Suspense } from "react";
import MapEmbed from "@/components/MapEmbed";
import QuoteForm from "@/components/QuoteForm";
import { Eyebrow } from "@/components/ui";
import { company, showrooms } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact, devis et démonstration de robots",
  description:
    "Demandez un devis de location, de leasing ou d'achat de robot, ou une démonstration en showroom à Paris, à Clermont-Ferrand ou sur votre site. Réponse de l'équipe Europbots sous 24 h ouvrées.",
  alternates: { canonical: "/contact" },
};

const localJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://europbots.com/#paris",
  name: "Europbots · Siège et showroom Paris",
  parentOrganization: { "@id": "https://europbots.com/#organization" },
  image: "https://europbots.com/og.jpg",
  telephone: company.phone,
  email: company.email,
  address: { "@type": "PostalAddress", streetAddress: company.address.street, postalCode: company.address.postalCode, addressLocality: "Paris", addressCountry: "FR" },
  geo: { "@type": "GeoCoordinates", latitude: 48.874589, longitude: 2.292391 },
  openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00" }],
};

export default function ContactPage() {
  const paris = showrooms[0];
  return (
    <main className="bg-paper pt-[72px]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localJsonLd) }} />
      <section className="wrap pb-14 pt-16 md:pt-24">
        <Eyebrow>Contact</Eyebrow>
        <h1 className="t-display mt-6 text-[clamp(2.4rem,7vw,6.6rem)]">
          Parlons de <span className="text-text-subtle">votre projet</span>
        </h1>
      </section>

      <section className="wrap">
        <div className="grid gap-px bg-border md:grid-cols-3">
          {[
            ["Email", company.email, `mailto:${company.email}`],
            ["Téléphone", company.phone, company.phoneHref],
            ["Siège et showroom", "9 Avenue de la Grande Armée, 75016 Paris", "#plan"],
          ].map(([l, v, h]) => (
            <a key={l} href={h} className="group bg-paper py-7 md:px-8 md:first:pl-0">
              <span className="t-mono text-text-subtle">{l}</span>
              <span className="t-h3 mt-3 block text-[22px] group-hover:underline group-hover:underline-offset-4">{v}</span>
              {l === "Téléphone" && <span className="mt-1 block text-[14px] text-text-muted">{company.hours}</span>}
            </a>
          ))}
        </div>
      </section>

      <section id="devis" className="scroll-mt-24 border-t border-border">
        <div className="wrap grid gap-12 py-20 md:py-24 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <Eyebrow index="01">Devis et démonstration</Eyebrow>
            <h2 className="t-h2 mt-5">Réponse sous 24 h ouvrées.</h2>
            <p className="mt-5 max-w-sm text-[17px] leading-relaxed text-text-muted">
              Location courte, leasing, achat ou démonstration : décrivez votre établissement et votre besoin, un expert vous rappelle avec une proposition adaptée.
            </p>
            <ul className="mt-8 grid gap-3 text-[15px]">
              {["Démonstration en showroom, sur site ou en visio", "Étude de vos surfaces et de vos flux", "Devis chiffré, sans engagement"].map((t) => (
                <li key={t} className="flex gap-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2.4" className="mt-0.5 shrink-0" aria-hidden><path d="M5 12l5 5L20 7" /></svg>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <Suspense>
            <QuoteForm />
          </Suspense>
        </div>
      </section>

      <section id="plan" className="scroll-mt-24 bg-surface">
        <div className="wrap grid gap-10 py-20 md:py-24 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <Eyebrow index="02">Nous trouver</Eyebrow>
            <h2 className="t-h2 mt-5">À deux pas de l&rsquo;Arc de Triomphe.</h2>
            <p className="mt-5 max-w-sm text-[17px] leading-relaxed text-text-muted">
              {paris.address}. Métro et RER Charles de Gaulle – Étoile, ligne 1 Argentine. Visites du lundi au vendredi, sur rendez-vous.
            </p>
            <p className="mt-6 text-[15px] text-text-muted">
              Également à Clermont-Ferrand : <span className="text-ink">{showrooms[1].address}</span>.
            </p>
          </div>
          <MapEmbed address={paris.address} label="Europbots Paris" className="aspect-[4/3] w-full md:aspect-[16/10]" />
        </div>
      </section>
    </main>
  );
}
