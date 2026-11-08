// d'après clickway (panneaux qui s'élargissent au survol) : les trois gammes en colonnes photo.
"use client";

import Link from "next/link";
import { useState } from "react";
import { Arrow } from "./ui";

type Panel = { id: string; name: string; title: string; lead: string; photo: string; count: number; names: string[] };

export default function RangePanels({ panels }: { panels: Panel[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="flex flex-col gap-3 lg:h-[680px] lg:flex-row">
      {panels.map((p, i) => {
        const on = active === i;
        return (
          <Link
            key={p.id}
            href={`/gammes/${p.id}`}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            className="group relative isolate flex min-h-[460px] flex-col justify-between overflow-hidden bg-ink p-6 text-on-dark transition-[flex-grow] duration-[700ms] ease-[cubic-bezier(.32,.72,0,1)] md:p-8 lg:min-h-0"
            style={{ flexGrow: on ? 2.2 : 1, flexBasis: 0 }}
          >
            <img src={p.photo} alt={p.title} loading="lazy" className={`absolute inset-0 -z-10 h-full w-full object-cover transition-[transform,opacity] duration-[900ms] ease-[cubic-bezier(.32,.72,0,1)] ${on ? "scale-100 opacity-70" : "scale-[1.08] opacity-40"}`} />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />
            <div className="flex items-start justify-between">
              <span className="t-mono text-on-dark-muted">0{i + 1} · {p.count} robots</span>
              <span className={`grid h-11 w-11 place-items-center rounded-full transition-colors duration-300 ${on ? "bg-lime text-ink" : "border border-on-dark/30"}`}>
                <Arrow />
              </span>
            </div>
            <div>
              <h3 className="t-display text-[clamp(1.8rem,3.2vw,3.2rem)]">{p.name}</h3>
              <div className={`grid transition-[grid-template-rows,opacity] duration-[700ms] ease-[cubic-bezier(.32,.72,0,1)] ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[1fr] opacity-100 lg:grid-rows-[0fr] lg:opacity-0"}`}>
                <div className="overflow-hidden">
                  <p className="mt-4 max-w-[44ch] text-[16px] leading-relaxed text-on-dark-muted">{p.lead}</p>
                  <p className="t-mono mt-5 text-[11px] leading-relaxed text-on-dark">{p.names.join("  ·  ")}</p>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
