// Formulaire de devis repris du site actuel (mêmes champs), champs soulignés en filet.
// Envoi : ouvre la messagerie vers contact@europbots.com tant qu'aucune route /api/devis n'est branchée.
"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { robots } from "@/lib/robots";
import { company } from "@/lib/site";
import { Arrow } from "./ui";

const field =
  "h-[52px] w-full border-0 border-b border-border bg-transparent px-0 text-[16px] text-ink outline-none transition-colors duration-300 placeholder:text-text-subtle focus:border-ink";

export default function QuoteForm() {
  const params = useSearchParams();
  const pre = params.get("robot") ?? "";
  const subject = { demo: "Demande de démonstration", leasing: "Devis : location longue durée / leasing", achat: "Devis : achat de robot(s)", evenement: "Location courte durée (événement)" }[params.get("sujet") ?? ""] ?? "";
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = ["nom", "societe", "email", "telephone", "sujet", "robot", "projet"]
      .map((k) => `${k} : ${f.get(k) ?? ""}`)
      .join("\n");
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(`Demande de devis · ${f.get("sujet")}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  if (sent)
    return (
      <div className="py-16">
        <p className="t-mono text-text-muted">Demande prête</p>
        <p className="mt-3 text-[28px] t-h3 ">Votre messagerie s&rsquo;est ouverte avec la demande pré-remplie.</p>
        <p className="mt-3 text-text-muted">Envoyez-la : notre équipe vous répond sous 24 h ouvrées.</p>
      </div>
    );

  return (
    <form onSubmit={submit} className="grid gap-x-8 gap-y-6 md:grid-cols-2">
      <label className="grid gap-1">
        <span className="t-mono text-text-muted">Nom complet *</span>
        <input name="nom" required autoComplete="name" className={field} placeholder="Camille Martin" />
      </label>
      <label className="grid gap-1">
        <span className="t-mono text-text-muted">Société</span>
        <input name="societe" autoComplete="organization" className={field} placeholder="Nom de l'établissement" />
      </label>
      <label className="grid gap-1">
        <span className="t-mono text-text-muted">Email pro *</span>
        <input name="email" type="email" required autoComplete="email" className={field} placeholder="vous@entreprise.fr" />
      </label>
      <label className="grid gap-1">
        <span className="t-mono text-text-muted">Téléphone</span>
        <input name="telephone" type="tel" autoComplete="tel" className={field} placeholder="06 12 34 56 78" />
      </label>
      <label className="grid gap-1">
        <span className="t-mono text-text-muted">Sujet *</span>
        <select name="sujet" required className={field} defaultValue={subject}>
          <option value="" disabled>Sélectionnez une option</option>
          <option>Devis : location longue durée / leasing</option>
          <option>Devis : achat de robot(s)</option>
          <option>Location courte durée (événement)</option>
          <option>Demande de démonstration</option>
          <option>Partenariat / autre</option>
        </select>
      </label>
      <label className="grid gap-1">
        <span className="t-mono text-text-muted">Robot concerné</span>
        <select name="robot" className={field} defaultValue={robots.find((r) => r.slug === pre)?.name ?? ""}>
          <option value="">Aucun en particulier</option>
          {robots.map((r) => (
            <option key={r.slug}>{r.name}</option>
          ))}
        </select>
      </label>
      <label className="grid gap-1 md:col-span-2">
        <span className="t-mono text-text-muted">Votre projet *</span>
        <textarea name="projet" required rows={4} className={`${field} h-auto resize-none py-3`} placeholder="Type d'établissement, surface, nombre de robots, échéance…" />
      </label>
      <div className="flex flex-wrap items-center gap-5 md:col-span-2">
        <button type="submit" className="btn btn-ink">
          <span>Envoyer la demande</span>
          <span className="btn-icon"><Arrow /><Arrow /></span>
        </button>
        <p className="text-[13px] text-text-subtle">Réponse sous 24 h ouvrées. Vos données ne servent qu&rsquo;à traiter votre demande.</p>
      </div>
    </form>
  );
}
