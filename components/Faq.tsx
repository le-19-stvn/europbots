// d'après sites-detail/clicknland.md §1 (FAQ) : liste à filets, « + » qui pivote à 45°, ouverture grid-rows 450 ms.
"use client";

import { useState } from "react";

export default function Faq({ items, onDark = false }: { items: { q: string; a: string }[]; onDark?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);
  const line = onDark ? "border-ink-line" : "border-border";
  return (
    <div className={`border-t ${line}`}>
      {items.map((it, i) => (
        <div key={it.q} className={`faq-item border-b ${line}`} data-open={open === i}>
          <button
            type="button"
            className="flex w-full items-start justify-between gap-6 py-6 text-left"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <h3 className="text-[18px] font-semibold leading-snug tracking-[-0.015em] md:text-[20px]">{it.q}</h3>
            <span className={`faq-plus mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full ${onDark ? "bg-ink-3 text-lime" : "bg-surface text-ink"}`} aria-hidden>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 1v10M1 6h10" /></svg>
            </span>
          </button>
          <div className="faq-body">
            <div className="overflow-hidden">
              <p className={`max-w-[68ch] pb-7 text-[16px] leading-relaxed ${onDark ? "text-on-dark-muted" : "text-text-muted"}`}>{it.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
