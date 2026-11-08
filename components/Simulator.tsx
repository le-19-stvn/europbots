// Simulateur de rentabilité du leasing : hypothèses Europbots (lib/pricing.ts), calcul en direct.
// d'après clicknland (chiffre qui compte + jauges qui se remplissent, motion §16.1) et pricing.md (calculateur à curseurs).
"use client";

import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { eur, pricing, signedEur, simulate } from "@/lib/pricing";
import { Button } from "./ui";

function Live({ value, signed }: { value: number; signed?: boolean }) {
  const mv = useMotionValue(value);
  const text = useTransform(mv, (v) => (signed ? signedEur(v) : eur(v)));
  useEffect(() => {
    const c = animate(mv, value, { duration: 0.45, ease: [0.32, 0.72, 0, 1] });
    return () => c.stop();
  }, [mv, value]);
  return <motion.span>{text}</motion.span>;
}

function Slider({ label, value, min, max, step, onChange, format }: { label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; format: (v: number) => string }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-4">
        <span className="text-[15px] text-on-dark-muted">{label}</span>
        <span className="t-h3 text-[22px] text-on-dark">{format(value)}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="range mt-3 w-full"
        style={{ ["--pct" as string]: `${pct}%` }}
      />
    </label>
  );
}

export default function Simulator({ compact = false, initialHours = 4 }: { compact?: boolean; initialHours?: number }) {
  const [hours, setHours] = useState(initialHours);
  const [rate, setRate] = useState(pricing.hourlyCost);
  const [days, setDays] = useState(pricing.workDays);
  const [lease, setLease] = useState(pricing.leaseFrom);
  const r = simulate({ hoursPerDay: hours, hourlyCost: rate, workDays: days, lease });
  const max = Math.max(r.gross, lease) * 1.08 || 1;
  const positive = r.net >= 0;

  return (
    <div className="grid gap-px bg-ink-line lg:grid-cols-[0.9fr_1.1fr]">
      <div className="bg-ink-2 p-6 md:p-10">
        <p className="t-mono text-on-dark-subtle">Vos hypothèses</p>
        <div className="mt-8 grid gap-8">
          <Slider label="Heures de travail économisées par jour" value={hours} min={0.5} max={8} step={0.5} onChange={setHours} format={(v) => `${v.toLocaleString("fr-FR")} h`} />
          <Slider label="Coût horaire employeur" value={rate} min={11} max={35} step={0.5} onChange={setRate} format={(v) => `${v.toLocaleString("fr-FR")} €`} />
          <Slider label="Jours d'activité par mois" value={days} min={15} max={31} step={1} onChange={setDays} format={(v) => `${v} j`} />
          <Slider label="Loyer mensuel du robot (HT)" value={lease} min={500} max={2500} step={50} onChange={setLease} format={(v) => eur(v)} />
        </div>
        <p className="mt-8 text-[13px] leading-relaxed text-on-dark-subtle">
          Leasing sur {pricing.leaseMonths} mois, à partir de {eur(pricing.leaseFrom)} HT par mois selon le modèle. Calcul hors maintenance, consommables et supervision.
        </p>
      </div>

      <div className="flex flex-col bg-ink p-6 md:p-10">
        <p className="t-mono text-on-dark-subtle">Gain net estimé par mois</p>
        <p className={`t-display mt-3 text-[clamp(3rem,7vw,6rem)] normal-case ${positive ? "text-lime" : "text-on-dark-muted"}`}>
          <Live value={r.net} signed />
        </p>
        <p className="mt-3 text-[15px] text-on-dark-muted">
          {positive ? "Le robot finance son loyer et dégage un gain." : "Pas encore rentable : il faut davantage d'heures économisées."} Seuil : <span className="text-on-dark">{Math.ceil(r.breakEvenHoursMonth)} h par mois</span>, soit {r.breakEvenHoursDay.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} h par jour.
        </p>

        <div className="mt-8 grid gap-3">
          {[
            ["Économie brute", r.gross, "bg-on-dark"],
            ["Loyer", lease, "bg-on-dark-subtle"],
          ].map(([l, v, c]) => (
            <div key={l as string} className="grid grid-cols-[110px_1fr_auto] items-center gap-4 text-[14px]">
              <span className="text-on-dark-muted">{l}</span>
              <span className="h-2.5 overflow-hidden rounded-full bg-ink-3">
                <motion.span className={`block h-full rounded-full ${c}`} animate={{ width: `${((v as number) / max) * 100}%` }} transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }} />
              </span>
              <span className="w-[86px] text-right font-mono text-on-dark"><Live value={v as number} /></span>
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-px bg-ink-line">
          <div className="bg-ink py-4 pr-4">
            <p className="t-mono text-on-dark-subtle">Par an</p>
            <p className="t-h3 mt-1 text-[clamp(1.6rem,2.6vw,2.2rem)]"><Live value={r.yearly} signed /></p>
          </div>
          <div className="bg-ink py-4 pl-4">
            <p className="t-mono text-on-dark-subtle">Sur {pricing.leaseMonths} mois</p>
            <p className="t-h3 mt-1 text-[clamp(1.6rem,2.6vw,2.2rem)]"><Live value={r.overTerm} signed /></p>
          </div>
        </div>

        {!compact && (
          <div className="mt-8 overflow-hidden border-t border-ink-line">
            <table className="w-full text-left text-[14px]">
              <thead>
                <tr className="text-on-dark-subtle">
                  <th className="t-mono py-3 font-normal">Heures / jour</th>
                  <th className="t-mono py-3 font-normal">Économie brute</th>
                  <th className="t-mono py-3 text-right font-normal">Après leasing</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5, 6].map((h) => {
                  const x = simulate({ hoursPerDay: h, hourlyCost: rate, workDays: days, lease });
                  return (
                    <tr key={h} className={`border-t border-ink-line transition-colors duration-300 ${h === hours ? "bg-ink-3 text-on-dark" : "text-on-dark-muted"}`}>
                      <td className="py-2.5 pl-2">{h} h</td>
                      <td className="py-2.5">{eur(x.gross)}</td>
                      <td className={`py-2.5 pr-2 text-right font-mono ${x.net >= 0 ? "text-lime" : ""}`}>{signedEur(x.net)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-auto pt-8">
          <Button href={`/contact?sujet=leasing#devis`}>Recevoir mon étude de rentabilité</Button>
          <p className="mt-4 text-[12px] leading-relaxed text-on-dark-subtle">
            Estimation indicative. Ces économies ne sont réelles que si les heures libérées réduisent effectivement les dépenses de personnel ou évitent un recrutement. Vérifiez les frais inclus dans votre contrat de leasing.
          </p>
        </div>
      </div>
    </div>
  );
}
