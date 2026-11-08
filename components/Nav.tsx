// d'après principes §9 (nav) + motion §15 : fond flouté au-delà de 40 px, inversion sur hero sombre, mega menu 450 ms.
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button, Logo } from "./ui";
import { categories, robotsBy, type CategoryId } from "@/lib/robots";
import { BOOKING_HREF } from "@/lib/site";

const E = [0.32, 0.72, 0, 1] as const;
const DARK_HERO = ["/"];

export default function Nav() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // ferme les menus à chaque navigation
  const [lastPath, setLastPath] = useState(path);
  if (path !== lastPath) {
    setLastPath(path);
    setOpen(false);
    setMega(false);
  }

  const dark = DARK_HERO.includes(path) && !scrolled && !mega;
  const link = `text-[15px] font-medium transition-opacity duration-300 hover:opacity-60 ${dark ? "text-on-dark" : "text-ink"}`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-[450ms] ease-[cubic-bezier(.32,.72,0,1)] ${
        dark ? "border-b border-transparent bg-transparent" : "border-b border-border bg-paper/85 backdrop-blur-xl"
      }`}
      onMouseLeave={() => setMega(false)}
    >
      <div className="wrap flex h-[72px] items-center justify-between">
        <Logo dark={dark} />
        <nav className="hidden items-center gap-9 lg:flex" aria-label="Navigation principale">
          <button type="button" className={`${link} flex items-center gap-1.5`} onMouseEnter={() => setMega(true)} onClick={() => setMega((m) => !m)} aria-expanded={mega}>
            Nos robots
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className={`transition-transform duration-[450ms] ${mega ? "rotate-180" : ""}`} aria-hidden>
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          <Link href="/robots" className={link} onMouseEnter={() => setMega(false)}>Catalogue</Link>
          <Link href="/location-leasing-robot" className={link} onMouseEnter={() => setMega(false)}>Leasing</Link>
          <Link href="/showrooms" className={link} onMouseEnter={() => setMega(false)}>Showrooms</Link>
          <Link href="/contact" className={link} onMouseEnter={() => setMega(false)}>Contact</Link>
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <a href="tel:+33185370337" className={`hidden font-mono text-[13px] xl:block ${dark ? "text-on-dark-muted" : "text-text-muted"}`}>
            01 85 37 03 37
          </a>
          <Button href={BOOKING_HREF} size="sm">
            <span className="sm:hidden">Démo</span>
            <span className="hidden sm:inline">Demander une démo</span>
          </Button>
          <button
            type="button"
            className={`grid h-11 w-11 place-items-center lg:hidden ${dark || open ? "text-on-dark" : "text-ink"} relative z-[60]`}
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
          >
            <span className="relative block h-3 w-6">
              <span className={`absolute left-0 h-[2px] w-6 bg-current transition-all duration-[450ms] ${open ? "top-[5px] rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-[2px] bg-current transition-all duration-[450ms] ${open ? "top-[5px] w-6 -rotate-45" : "top-[10px] w-4"}`} />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mega && (
          <motion.div
            initial={{ opacity: 0, y: -8, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
            transition={{ duration: 0.45, ease: E }}
            className="absolute inset-x-0 top-full hidden border-b border-border bg-paper lg:block"
          >
            <div className="wrap grid grid-cols-[1fr_1fr_1fr_1.1fr] gap-10 py-10">
              {(Object.keys(categories) as CategoryId[]).map((id) => (
                <div key={id}>
                  <Link href={`/gammes/${id}`} className="t-mono flex items-center gap-2 text-text-muted hover:text-ink">
                    Gamme {categories[id].name}
                    <span className="text-text-subtle">· {robotsBy(id).length}</span>
                  </Link>
                  <ul className="mt-5 grid gap-2.5">
                    {robotsBy(id).map((r) => (
                      <li key={r.slug}>
                        <Link href={`/robots/${r.slug}`} className="ulink text-[17px] font-medium tracking-[-0.01em]">
                          {r.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <Link href="/robots" className="group relative flex flex-col justify-end overflow-hidden bg-ink p-6 text-on-dark">
                <img src="/assets/robots/novabot/situation.webp" alt="" className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-[900ms] ease-[cubic-bezier(.32,.72,0,1)] group-hover:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                <span className="relative t-mono text-lime">19 robots</span>
                <span className="relative mt-2 text-2xl t-h3 ">Tout le catalogue</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: E }}
            className="fixed inset-0 z-[55] overflow-y-auto bg-ink px-[var(--gutter)] pb-10 pt-24 text-on-dark lg:hidden"
          >
            <nav className="grid gap-1" aria-label="Navigation mobile">
              {[
                ["/robots", "Catalogue"],
                ["/gammes/service", "Robots de service"],
                ["/gammes/nettoyage", "Robots de nettoyage"],
                ["/gammes/logistique", "Robots logistiques"],
                ["/location-leasing-robot", "Location et leasing"],
                ["/showrooms", "Showrooms"],
                ["/contact", "Contact et devis"],
              ].map(([href, label], i) => (
                <motion.div key={href} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 + i * 0.04, duration: 0.45, ease: E }}>
                  <Link href={href} className="block border-b border-ink-line py-4 text-[28px] t-h3 ">
                    {label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-10 grid gap-4">
              <Button href={BOOKING_HREF}>Demander une démo</Button>
              <a href="tel:+33185370337" className="font-mono text-sm text-on-dark-muted">+33 1 85 37 03 37</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
