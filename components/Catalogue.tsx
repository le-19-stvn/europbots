// d'après linkupapi (onglets à glider spring 520/44/.7) + grille de cartes produit, filtrage avec layout animé.
"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useState } from "react";
import type { CategoryId, Robot } from "@/lib/robots";
import RobotCard from "./RobotCard";
import { Button } from "./ui";

const TABS: { id: "all" | CategoryId; label: string }[] = [
  { id: "all", label: "Tous" },
  { id: "service", label: "Service" },
  { id: "nettoyage", label: "Nettoyage" },
  { id: "logistique", label: "Logistique" },
];

/** mobileLimit : nombre de fiches visibles sous 640 px, suivies d'un bouton vers le catalogue complet. */
export default function Catalogue({ robots, initial = "all", mobileLimit }: { robots: Robot[]; initial?: "all" | CategoryId; mobileLimit?: number }) {
  const [tab, setTab] = useState<"all" | CategoryId>(initial);
  const list = tab === "all" ? robots : robots.filter((r) => r.category === tab);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
        <LayoutGroup>
          <div className="flex flex-wrap gap-1" role="tablist" aria-label="Filtrer par gamme">
            {TABS.map((t) => {
              const n = t.id === "all" ? robots.length : robots.filter((r) => r.category === t.id).length;
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTab(t.id)}
                  className={`relative h-11 rounded-full px-5 text-[15px] font-medium transition-colors duration-300 ${active ? "text-lime" : "text-text-muted hover:text-ink"}`}
                >
                  {active && (
                    <motion.span layoutId="cat-glider" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 520, damping: 44, mass: 0.7 }} />
                  )}
                  <span className="relative">
                    {t.label} <span className={active ? "text-on-dark-muted" : "text-text-subtle"}>{n}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
        <p className="t-mono text-text-subtle">Location · Leasing · Achat</p>
      </div>

      <motion.div layout className="mt-10 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {list.map((r, i) => (
            <motion.div
              key={r.slug}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.45, delay: Math.min(i, 8) * 0.03, ease: [0.32, 0.72, 0, 1] }}
              className={mobileLimit !== undefined && i >= mobileLimit ? "max-sm:hidden" : undefined}
            >
              <RobotCard robot={r} index={i} priority={i < 4} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {mobileLimit !== undefined && list.length > mobileLimit && (
        <div className="mt-12 border-t border-border pt-8 sm:hidden">
          <p className="text-[15px] text-text-muted">
            {list.length - mobileLimit} autres robots {tab === "all" ? "au catalogue" : `dans la gamme ${TABS.find((t) => t.id === tab)!.label.toLowerCase()}`}.
          </p>
          <Button href={tab === "all" ? "/robots" : `/gammes/${tab}`} className="mt-4 w-full justify-between">
            {tab === "all" ? `Voir les ${list.length} robots` : `Voir toute la gamme`}
          </Button>
        </div>
      )}
    </div>
  );
}
