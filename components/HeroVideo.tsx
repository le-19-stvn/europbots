// d'après dafolle (hero qui recule au scroll, scale 1 → .92) — vidéo du site actuel, poster en repli et sur mobile.
"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, useSyncExternalStore } from "react";

export default function HeroVideo({ poster, src }: { poster: string; src: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const radius = useTransform(scrollYProgress, [0, 1], [0, 28]);
  // Vidéo en desktop seulement, jamais en mode économie de données.
  const wide = useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(min-width: 768px)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(min-width: 768px)").matches && !(navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData,
    () => false,
  );
  const video = wide && !reduce;

  return (
    <div ref={ref} className="absolute inset-0 -z-10">
      <motion.div style={reduce ? undefined : { scale, borderBottomLeftRadius: radius, borderBottomRightRadius: radius }} className="absolute inset-0 origin-top overflow-hidden bg-ink">
        <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
        {video && (
          <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline preload="metadata" poster={poster}>
            <source src={src} type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/20 to-transparent" />
      </motion.div>
    </div>
  );
}
