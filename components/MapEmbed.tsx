// Carte Google Maps chargée au clic : aucun cookie Google déposé avant l'accord du visiteur (RGPD).
// Le choix est mémorisé dans le navigateur ; les visites suivantes affichent la carte directement.
"use client";

import { useState, useSyncExternalStore } from "react";

const KEY = "eb-maps-ok";

export default function MapEmbed({ address, label, className = "" }: { address: string; label: string; className?: string }) {
  const remembered = useSyncExternalStore(
    () => () => {},
    () => {
      try {
        return localStorage.getItem(KEY) === "1";
      } catch {
        return false;
      }
    },
    () => false,
  );
  const [clicked, setOk] = useState(false);
  const ok = remembered || clicked;
  const q = encodeURIComponent(address);
  const accept = () => {
    setOk(true);
    try {
      localStorage.setItem(KEY, "1");
    } catch {}
  };

  return (
    <div className={`relative overflow-hidden bg-ink ${className}`}>
      {ok ? (
        <iframe
          title={`Carte : ${label}`}
          src={`https://www.google.com/maps?q=${q}&z=15&output=embed`}
          className="absolute inset-0 h-full w-full border-0 grayscale-[0.4]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center text-on-dark">
          {/* trame de plan : rues en filets */}
          <svg className="absolute inset-0 h-full w-full opacity-[0.18]" aria-hidden>
            <defs>
              <pattern id="streets" width="120" height="120" patternUnits="userSpaceOnUse" patternTransform="rotate(-18)">
                <path d="M0 60H120M60 0V120" stroke="#fafafa" strokeWidth="1" />
                <path d="M0 20H120M20 0V120" stroke="#fafafa" strokeWidth=".4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#streets)" />
          </svg>
          <div className="relative flex flex-col items-center px-6 text-center">
            <span className="relative flex h-14 w-14 items-center justify-center">
              <span className="ping absolute inline-flex h-10 w-10 rounded-full bg-lime opacity-40" />
              <svg width="34" height="34" viewBox="0 0 24 24" fill="var(--lime)" aria-hidden>
                <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
              </svg>
            </span>
            <p className="t-h3 mt-4 text-[22px]">{label}</p>
            <p className="mt-1 text-[15px] text-on-dark-muted">{address}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button type="button" onClick={accept} className="btn btn-lime btn-sm">
                <span>Afficher la carte</span>
                <span className="btn-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </span>
              </button>
              <a href={`https://www.google.com/maps/search/?api=1&query=${q}`} target="_blank" rel="noopener noreferrer" className="btn btn-line btn-sm on-dark">
                <span>Ouvrir dans Google Maps</span>
                <span className="btn-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden><path d="M7 17L17 7M9 7h8v8" /></svg>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden><path d="M7 17L17 7M9 7h8v8" /></svg>
                </span>
              </a>
            </div>
            <p className="mt-4 max-w-xs text-[12px] text-on-dark-subtle">La carte est fournie par Google, qui peut déposer des cookies.</p>
          </div>
        </div>
      )}
    </div>
  );
}
