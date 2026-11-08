// d'après la fiche produit Europbots actuelle (image collante + blocs qui défilent) et gojiberry (pile sticky) :
// l'image reste à gauche, l'index actif suit le scroll, les métriques comptent à l'entrée.
"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Robot } from "@/lib/robots";
import { CountUp } from "./motion";
import { Stage } from "./ui";

function Block({ f, i, onActive }: { f: Robot["features"][number]; i: number; onActive: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(i);
  }, [inView, i, onActive]);
  return (
    <div ref={ref} className="border-t border-border py-14 first:border-t-0 lg:min-h-[70vh] lg:py-24">
      <p className="t-mono text-text-subtle">{String(i + 1).padStart(2, "0")} / 03</p>
      <h3 className="mt-4 text-[clamp(1.9rem,3.4vw,3rem)] t-h3 leading-[1.02] ">{f.title}</h3>
      <p className="mt-5 max-w-[46ch] text-[18px] leading-relaxed text-text-muted">{f.desc}</p>
      <div className="mt-10 grid max-w-md grid-cols-2 gap-px bg-border">
        {f.metrics.map((m) => (
          <div key={m.label} className="bg-paper py-4 pr-4">
            <CountUp value={m.value} className="block text-[34px] t-h3 " />
            <span className="t-mono text-text-subtle">{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StickyFeatures({ robot }: { robot: Robot }) {
  const [active, setActive] = useState(0);
  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
      <div className="hidden lg:block">
        <div className="sticky top-[104px]">
          <Stage className="aspect-[4/5] overflow-hidden">
            <span className="floor-glow" />
            <img src={robot.image} alt={`${robot.name} vu de face`} loading="lazy" className="absolute inset-0 m-auto h-[80%] w-[80%] object-contain mix-blend-multiply" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              <span className="t-mono text-text-subtle">{robot.maker} · {robot.name}</span>
              <span className="flex gap-1.5">
                {robot.features.map((_, i) => (
                  <span key={i} className={`h-1.5 rounded-full transition-all duration-[450ms] ${i === active ? "w-6 bg-ink" : "w-1.5 bg-text-subtle/40"}`} />
                ))}
              </span>
            </div>
            <div className="absolute left-6 top-6 max-w-[60%]">
              <p key={active} className="t-mono animate-[fadein_.45s_ease] text-ink">{robot.features[active]?.title}</p>
            </div>
          </Stage>
        </div>
      </div>
      <div>
        {robot.features.map((f, i) => (
          <Block key={f.title} f={f} i={i} onActive={setActive} />
        ))}
      </div>
    </div>
  );
}
