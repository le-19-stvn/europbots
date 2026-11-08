// d'après dafolle (liste de services à filets, image qui suit la ligne survolée) — usages par secteur.
"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export type Sector = { name: string; slug: string; text: string; photo: string; robots: { slug: string; name: string }[] };

export default function Sectors({ sectors }: { sectors: Sector[] }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
      <ul className="border-t border-border">
        {sectors.map((s, i) => (
          <li key={s.name} className="border-b border-border" onMouseEnter={() => setHover(i)}>
            <div className="grid gap-4 py-7 md:grid-cols-[64px_1fr] md:gap-8">
              <span className={`t-mono pt-2 transition-colors duration-300 ${hover === i ? "text-ink" : "text-text-subtle"}`}>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className={`t-h3 text-[clamp(1.6rem,2.6vw,2.4rem)] leading-tight transition-colors duration-300 ${hover === i ? "text-ink" : "text-text-muted"}`}>
                  <Link href={`/secteurs/${s.slug}`} className="ulink">{s.name}</Link>
                </h3>
                <p className="mt-2 max-w-[52ch] text-[16px] leading-relaxed text-text-muted">{s.text}</p>
                <Link href={`/secteurs/${s.slug}`} className="mt-3 inline-flex items-center gap-1.5 text-[14px] font-semibold">Robots pour ce secteur <span aria-hidden>→</span></Link>
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.robots.map((r) => (
                    <Link key={r.slug} href={`/robots/${r.slug}`} className="rounded-full border border-border px-3 py-1.5 text-[13px] font-medium transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-lime">
                      {r.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="relative hidden lg:block">
        <div className="sticky top-[110px] aspect-[4/5] overflow-hidden bg-ink">
          <AnimatePresence initial={false}>
            <motion.img
              key={sectors[hover].photo}
              src={sectors[hover].photo}
              alt={`Robot en situation : ${sectors[hover].name}`}
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ opacity: 0, scale: 1.08, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            />
          </AnimatePresence>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-6">
            <p className="t-mono text-lime">{sectors[hover].name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
