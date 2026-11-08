// d'après footers-cta.md (footer sombre à colonnes + wordmark géant en pied, dafolle / bluestar).
import Link from "next/link";
import { categories, robotsBy, type CategoryId } from "@/lib/robots";
import { sectorPages } from "@/lib/sectors";
import { company, showrooms } from "@/lib/site";
import { LogoMark } from "./ui";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-on-dark">
      <div className="wrap grid gap-12 pb-16 pt-20 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1.1fr]">
        <div>
          <LogoMark className="h-8 w-auto" color="var(--lime)" />
          <p className="mt-6 max-w-[30ch] text-[17px] leading-snug text-on-dark-muted">
            Location, leasing et vente de robots de service, de nettoyage et de logistique. Installés, cartographiés et suivis par nos équipes.
          </p>
          <div className="mt-8 grid gap-1.5 text-[15px]">
            <a href={`mailto:${company.email}`} className="ulink w-fit">{company.email}</a>
            <a href={company.phoneHref} className="ulink w-fit">{company.phone}</a>
            <span className="text-on-dark-subtle">{company.hours}</span>
          </div>
        </div>
        {(Object.keys(categories) as CategoryId[]).map((id) => (
          <div key={id}>
            <Link href={`/gammes/${id}`} className="t-mono text-on-dark-subtle hover:text-lime">Gamme {categories[id].name}</Link>
            <ul className="mt-5 grid gap-2 text-[15px] text-on-dark-muted">
              {robotsBy(id).map((r) => (
                <li key={r.slug}>
                  <Link href={`/robots/${r.slug}`} className="ulink hover:text-on-dark">{r.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <p className="t-mono text-on-dark-subtle">Secteurs</p>
          <ul className="mt-5 grid gap-2 text-[15px] text-on-dark-muted">
            {sectorPages.map((x) => (
              <li key={x.slug}><Link href={`/secteurs/${x.slug}`} className="ulink hover:text-on-dark">{x.name}</Link></li>
            ))}
            <li className="pt-3"><Link href="/location-leasing-robot" className="ulink text-on-dark hover:text-lime">Guide location et leasing</Link></li>
          </ul>
          <p className="t-mono mt-10 text-on-dark-subtle">Showrooms</p>
          <ul className="mt-5 grid gap-2 text-[15px] text-on-dark-muted">
            {showrooms.map((s) => (
              <li key={s.city} className="flex items-center gap-2">
                <span className={`h-1.5 w-1.5 rounded-full ${s.open ? "bg-lime" : "bg-on-dark-subtle"}`} />
                <Link href="/showrooms" className="ulink hover:text-on-dark">{s.city}</Link>
                {!s.open && <span className="text-[12px] text-on-dark-subtle">bientôt</span>}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex gap-3">
            <a href={company.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid h-11 w-11 place-items-center rounded-full border border-ink-line transition-colors hover:border-lime hover:text-lime">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4v11H3zM9.5 9.75h3.8v1.5h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1v5.45h-4v-4.83c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55v4.91h-4z" /></svg>
            </a>
            <a href={company.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid h-11 w-11 place-items-center rounded-full border border-ink-line transition-colors hover:border-lime hover:text-lime">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>
            </a>
          </div>
        </div>
      </div>

      <div className="wrap" aria-hidden>
        <p className="select-none whitespace-nowrap text-center font-brand text-[13.4vw] font-bold uppercase leading-[0.8] tracking-[-0.04em] text-ink-3 xl:text-[188px]">Europbots</p>
      </div>

      <div className="border-t border-ink-line">
        <div className="wrap flex flex-col gap-4 py-6 text-[13px] text-on-dark-subtle md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {company.legalName} · 9 Avenue de la Grande Armée, 75016 Paris</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/mentions-legales" className="ulink">Mentions légales</Link>
            <Link href="/confidentialite" className="ulink">Confidentialité</Link>
            <Link href="/cgv" className="ulink">CGV</Link>
            <a href="https://www.google.com/preferences/source?q=europbots.com" target="_blank" rel="noopener noreferrer" className="ulink flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden><path fill="#4285F4" d="M22.5 12.3c0-.8-.1-1.5-.2-2.2H12v4.2h5.9a5 5 0 0 1-2.2 3.3v2.7h3.5c2.1-1.9 3.3-4.7 3.3-8z"/><path fill="#34A853" d="M12 23c2.9 0 5.4-1 7.2-2.6l-3.5-2.7c-1 .7-2.3 1.1-3.7 1.1-2.9 0-5.3-1.9-6.2-4.5H2.2v2.8A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.8 14.3a6.6 6.6 0 0 1 0-4.2V7.3H2.2a11 11 0 0 0 0 9.8z"/><path fill="#EA4335" d="M12 5.4c1.6 0 3 .6 4.2 1.6l3.1-3.1A11 11 0 0 0 2.2 7.3l3.6 2.8C6.7 7.4 9.1 5.4 12 5.4z"/></svg>
              Ajouter Europbots comme source préférée sur Google
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
