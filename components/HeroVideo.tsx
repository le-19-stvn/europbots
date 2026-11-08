// Vidéo du site actuel en plein cadre (jamais réduite) ; au scroll, le média glisse légèrement et s'assombrit. Poster en repli et sur mobile.
"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, useSyncExternalStore } from "react";

export default function HeroVideo({ poster, src }: { poster: string; src: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const shade = useTransform(scrollYProgress, [0, 1], [0, 0.55]);
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
      <div className="absolute inset-0 overflow-hidden bg-ink">
        <motion.div style={reduce ? undefined : { y }} className="absolute inset-0">
        <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
        {video && (
          <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline preload="metadata" poster={poster}>
            <source src={src} type="video/mp4" />
          </video>
        )}
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/20 to-transparent" />
        {!reduce && <motion.div style={{ opacity: shade }} className="absolute inset-0 bg-ink" />}
      </div>
    </div>
  );
}
