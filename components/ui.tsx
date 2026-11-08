// Primitives de la charte : logo, bouton « B », eyebrow à trois barres.
import Link from "next/link";
import type { ReactNode } from "react";

export function LogoMark({ className = "", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 120 84.5" className={className} fill={color} aria-hidden>
      <rect width="60" height="12" />
      <path d="M115.41,54c2.85,3.19,4.59,7.39,4.59,12,0,9.94-8.06,18-18,18h-42v-12h42c3.31,0,6-2.69,6-6s-2.69-6-6-6H0v-12h102c3.31,0,6-2.69,6-6s-2.69-6-6-6H0v-12h102c9.94,0,18,8.06,18,18,0,4.61-1.74,8.81-4.59,12Z" />
    </svg>
  );
}

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="Europbots, accueil">
      <LogoMark className="h-[22px] w-auto" color={dark ? "var(--lime)" : "var(--ink)"} />
      <span className={`font-brand text-[13px] font-bold uppercase tracking-[0.18em] ${dark ? "text-on-dark" : "text-ink"}`}>
        Europbots
      </span>
    </Link>
  );
}

export function Arrow({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

type BtnProps = {
  href: string;
  children: ReactNode;
  variant?: "lime" | "ink" | "line";
  size?: "md" | "sm";
  onDark?: boolean;
  className?: string;
};

export function Button({ href, children, variant = "lime", size = "md", onDark, className = "" }: BtnProps) {
  return (
    <Link
      href={href}
      className={`btn btn-${variant} ${size === "sm" ? "btn-sm" : ""} ${onDark ? "on-dark" : ""} ${className}`}
    >
      <span>{children}</span>
      <span className="btn-icon">
        <Arrow size={size === "sm" ? 14 : 16} />
        <Arrow size={size === "sm" ? 14 : 16} />
      </span>
    </Link>
  );
}

export function Eyebrow({ children, index, onDark }: { children: ReactNode; index?: string; onDark?: boolean }) {
  return (
    <p className={`eyebrow t-mono ${onDark ? "text-on-dark-muted" : "text-text-muted"}`}>
      <span className={`eyebrow-bars ${onDark ? "text-lime" : "text-ink"}`} aria-hidden>
        <i />
        <i />
        <i />
      </span>
      {index && <span className={onDark ? "text-on-dark" : "text-ink"}>{index}</span>}
      <span>{children}</span>
    </p>
  );
}

export function Stage({ children, className = "", dark }: { children: ReactNode; className?: string; dark?: boolean }) {
  return (
    <div className={`stage ${dark ? "dark" : ""} ${className}`}>
      <span className="stage-c1" />
      <span className="stage-c2" />
      {children}
    </div>
  );
}
