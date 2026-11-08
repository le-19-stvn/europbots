// Grammaire éditoriale (motion §16.2) : titres en blur-in, images 108 % → 100 %, compteurs à l'entrée.
"use client";

import { motion, useInView, useReducedMotion, animate } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

const EASE = [0.12, 0.23, 0.5, 1] as const;

export function Reveal({ children, delay = 0, className = "", as = "div" }: { children: ReactNode; delay?: number; className?: string; as?: "div" | "h1" | "h2" | "p" }) {
  const reduce = useReducedMotion();
  const M = motion[as];
  if (reduce) return <M className={className}>{children}</M>;
  return (
    <M
      className={className}
      initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </M>
  );
}

/** Titre révélé ligne par ligne : chaque ligne sort de son masque. */
export function LineReveal({ lines, className = "", delay = 0 }: { lines: ReactNode[]; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  // Le déclencheur est sur le parent : la ligne masquée par son overflow ne croise jamais le viewport.
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <span ref={ref} className={`block ${className}`}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em]">
          <motion.span
            className="block"
            initial={reduce ? false : { y: "105%" }}
            animate={inView || reduce ? { y: "0%" } : undefined}
            transition={{ duration: 0.9, delay: delay + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const reduce = useReducedMotion();
  const m = value.match(/^([^\d]*)([\d\s.,]+)(.*)$/);
  const num = m ? parseFloat(m[2].replace(/\s/g, "").replace(",", ".")) : NaN;
  const decimals = m && /[.,]\d/.test(m[2]) ? 1 : 0;
  const [shown, setShown] = useState<string | null>(null);

  useEffect(() => {
    if (!inView || reduce || !m || isNaN(num)) return;
    const c = animate(0, num, {
      duration: 1.6,
      ease: [0.33, 1, 0.68, 1],
      onUpdate: (v) => setShown(m[1] + v.toLocaleString("fr-FR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + m[3]),
      onComplete: () => setShown(null),
    });
    return () => c.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <span ref={ref} className={className}>
      {shown ?? value}
    </span>
  );
}
