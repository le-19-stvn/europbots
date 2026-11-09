// Génère le kit réseaux sociaux (1080 × 1350, LinkedIn / Instagram) à la DA du site :
//  - social/visuels/robots/<slug>.png      : le robot en action + 2 chiffres + prix d'appel
//  - social/visuels/verticales/<slug>.png  : le calcul de rentabilité par secteur
//  - social/visuels/chiffres/*.png         : posts « chiffre » (seuil de rentabilité, comparatif)
//  - social/planche.html                   : aperçu de tous les visuels
// Usage : npx tsx scripts/social.mts   (Playwright et Chromium déjà installés pour check-pages)
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { robots, categories } from "../lib/robots";
import { sectorPages } from "../lib/sectors";
import { eur, pricing, signedEur, simulate } from "../lib/pricing";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "social");
const pub = (p: string) => "file://" + path.join(ROOT, "public", p);
const LOGO = fs.readFileSync(path.join(ROOT, "public/assets/brand/logo-jaune.svg"), "utf8").replace(/<\?xml[^>]*>/, "");

const BASE = `
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400..700&family=Geist+Mono:wght@400;500&family=Syncopate:wght@700&display=block" rel="stylesheet">
<link href="https://api.fontshare.com/v2/css?f[]=clash-grotesk@500,600&display=block" rel="stylesheet">
<style>
  :root { --ink:#080808; --ink2:#111; --line:#262626; --paper:#fafafa; --muted:#a6a6a0; --subtle:#6f6f6a; --lime:#d2ff00; }
  * { margin:0; padding:0; box-sizing:border-box; }
  body { width:1080px; height:1350px; overflow:hidden; background:var(--ink); color:var(--paper); font-family:Geist, sans-serif; }
  .d { font-family:"Clash Grotesk", Geist, sans-serif; font-weight:500; letter-spacing:-0.035em; line-height:.92; }
  .m { font-family:"Geist Mono", monospace; font-size:22px; letter-spacing:.02em; text-transform:uppercase; }
  .logo { display:flex; align-items:center; gap:18px; }
  .logo svg { height:40px; width:auto; }
  .logo span { font-family:Syncopate, sans-serif; font-weight:700; font-size:22px; letter-spacing:.18em; text-transform:uppercase; }
  .bars { display:inline-grid; gap:3px; margin-right:14px; vertical-align:middle; }
  .bars i { display:block; height:3px; background:var(--lime); }
  .bars i:nth-child(1){ width:14px } .bars i:nth-child(2), .bars i:nth-child(3){ width:24px; border-radius:0 3px 3px 0 }
  .pill { display:inline-flex; align-items:center; gap:14px; height:64px; padding:0 12px 0 28px; border-radius:0 999px 999px 0; background:var(--lime); color:var(--ink); font-weight:700; font-size:26px; }
  .pill b { display:grid; place-items:center; width:42px; height:42px; border-radius:99px; background:var(--ink); color:var(--lime); font-size:22px; }
</style>`;

const header = (tag: string) => `
  <div style="position:absolute;left:64px;right:64px;top:60px;display:flex;justify-content:space-between;align-items:center;z-index:5">
    <div class="logo">${LOGO}<span>Europbots</span></div>
    <span class="m" style="background:rgba(8,8,8,.7);padding:10px 16px;color:var(--paper)">${tag}</span>
  </div>`;

function robotCard(r: (typeof robots)[number]) {
  const img = r.photo ? pub(r.photo) : null;
  const media = img
    ? `<img src="${img}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">`
    : `<div style="position:absolute;inset:0;background:#f1f1ee"></div><img src="${pub(r.image)}" style="position:absolute;left:15%;top:10%;width:70%;height:62%;object-fit:contain;mix-blend-mode:multiply">`;
  const [a, b] = r.stats;
  return `<!doctype html><html><head><meta charset="utf-8">${BASE}</head><body>
  <div style="position:absolute;inset:0;height:860px;overflow:hidden">${media}
    <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(8,8,8,.55) 0%,rgba(8,8,8,0) 30%,rgba(8,8,8,0) 60%,var(--ink) 100%)"></div></div>
  ${header(categories[r.category].name + " · " + r.label)}
  <div style="position:absolute;left:64px;right:64px;bottom:64px">
    <p class="m" style="color:var(--muted)"><span class="bars"><i></i><i></i><i></i></span>${r.maker}</p>
    <h1 class="d" style="font-size:120px;text-transform:uppercase;margin-top:18px">${r.name}</h1>
    <p style="font-size:36px;line-height:1.2;margin-top:20px;max-width:900px;letter-spacing:-.015em">${r.tagline}</p>
    <div style="display:grid;grid-template-columns:1fr 1fr;margin-top:40px;border-top:1px solid var(--line)">
      ${[a, b].map((s, i) => `<div style="padding:26px ${i ? "0 0 0 28px" : "28px 0 0"};${i ? "border-left:1px solid var(--line)" : ""}"><div class="d" style="font-size:84px">${s.value}</div><div class="m" style="color:var(--subtle);margin-top:10px">${s.label}</div></div>`).join("")}
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-top:40px">
      <span class="pill">Leasing dès ${pricing.leaseFrom} € HT / mois <b>→</b></span>
      <span class="m" style="color:var(--muted)">europbots.com</span>
    </div>
  </div></body></html>`;
}

function verticalCard(s: (typeof sectorPages)[number]) {
  const h = s.pitch!.hours;
  const r = simulate({ hoursPerDay: h });
  const rows = [1, 2, 3, 4, 5, 6].map((x) => ({ x, ...simulate({ hoursPerDay: x }) }));
  return `<!doctype html><html><head><meta charset="utf-8">${BASE}</head><body>
  <div style="position:absolute;right:0;top:0;width:520px;height:620px;overflow:hidden"><img src="${pub(s.photo)}" style="width:100%;height:100%;object-fit:cover;opacity:.7"><div style="position:absolute;inset:0;background:linear-gradient(90deg,var(--ink),rgba(8,8,8,0) 60%),linear-gradient(0deg,var(--ink),rgba(8,8,8,0) 50%)"></div></div>
  ${header("Rentabilité · " + s.name)}
  <div style="position:absolute;left:64px;top:200px;width:620px">
    <p class="m" style="color:var(--muted)"><span class="bars"><i></i><i></i><i></i></span>${s.name}</p>
    <h1 class="d" style="font-size:78px;margin-top:22px">${s.pitch!.title}</h1>
  </div>
  <div style="position:absolute;left:64px;right:64px;top:640px">
    <p class="m" style="color:var(--subtle)">${h} h de travail économisées par jour</p>
    <div style="display:flex;align-items:flex-end;gap:28px;margin-top:10px">
      <span class="d" style="font-size:190px;color:var(--lime)">${signedEur(r.net)}</span>
      <span style="font-size:30px;color:var(--muted);padding-bottom:26px">net / mois<br>après le loyer</span>
    </div>
    <table style="width:100%;border-collapse:collapse;margin-top:26px;font-size:26px">
      <tr class="m" style="color:var(--subtle)"><td style="padding:10px 0">Heures / jour</td><td>Économie brute</td><td style="text-align:right">Après leasing</td></tr>
      ${rows.map((x) => `<tr style="border-top:1px solid var(--line);${x.x === h ? "background:#1a1a1a;color:var(--paper)" : "color:var(--muted)"}"><td style="padding:12px 10px">${x.x} h</td><td>${eur(x.gross)}</td><td style="text-align:right;padding-right:10px;font-family:'Geist Mono';${x.net >= 0 ? "color:var(--lime)" : ""}">${signedEur(x.net)}</td></tr>`).join("")}
    </table>
    <p style="font-size:19px;color:var(--subtle);margin-top:22px;line-height:1.4">Leasing ${pricing.leaseMonths} mois dès ${pricing.leaseFrom} € HT/mois · ${pricing.hourlyCost} €/h, ${pricing.workDays} j/mois · estimation hors maintenance, consommables et supervision, valable si les heures libérées réduisent les dépenses de personnel.</p>
  </div></body></html>`;
}

function figureCard(kind: "seuil" | "comparatif") {
  const be = Math.ceil(simulate({ hoursPerDay: 1 }).breakEvenHoursMonth);
  const body =
    kind === "seuil"
      ? `<p class="m" style="color:var(--muted)"><span class="bars"><i></i><i></i><i></i></span>Le seuil de rentabilité</p>
         <h1 class="d" style="font-size:520px;color:var(--lime);margin-top:30px;letter-spacing:-.06em">${be}h</h1>
         <p style="font-size:46px;line-height:1.15;letter-spacing:-.02em;margin-top:10px;max-width:900px">de travail évitées par mois suffisent pour qu'un robot à ${pricing.leaseFrom} € couvre son loyer.</p>
         <p style="font-size:30px;color:var(--muted);margin-top:28px">Soit moins de 2 h par jour. Au-delà, chaque heure est un gain.</p>`
      : `<p class="m" style="color:var(--muted)"><span class="bars"><i></i><i></i><i></i></span>Sur ${pricing.leaseMonths} mois</p>
         <h1 class="d" style="font-size:96px;margin-top:26px">Un robot n'a pas besoin de remplacer un salarié <span style="color:var(--lime)">pour être rentable.</span></h1>
         <div style="display:grid;grid-template-columns:1fr 1fr;margin-top:60px;border-top:1px solid var(--line)">
           <div style="padding:30px 30px 0 0"><div class="m" style="color:var(--subtle)">Salarié au SMIC</div><div class="d" style="font-size:92px;margin-top:14px;white-space:nowrap">${eur(pricing.employeeMonthly * pricing.leaseMonths)}</div></div>
           <div style="padding:30px 0 0 30px;border-left:1px solid var(--line)"><div class="m" style="color:var(--subtle)">Robot Europbots</div><div class="d" style="font-size:92px;margin-top:14px;white-space:nowrap;color:var(--lime)">${eur(pricing.leaseFrom * pricing.leaseMonths)}</div></div>
         </div>
         <p style="font-size:24px;color:var(--subtle);margin-top:40px;line-height:1.4">Le bon calcul : les heures de tâches répétitives que le robot reprend. 4 h par jour = ${signedEur(simulate({ hoursPerDay: 4 }).net)} net par mois.</p>`;
  return `<!doctype html><html><head><meta charset="utf-8">${BASE}</head><body>
  ${header("Leasing dès " + pricing.leaseFrom + " € HT / mois")}
  <div style="position:absolute;left:64px;right:64px;top:210px">${body}</div>
  <div style="position:absolute;left:64px;right:64px;bottom:64px;display:flex;justify-content:space-between;align-items:center">
    <span class="pill">Calculer ma rentabilité <b>→</b></span><span class="m" style="color:var(--muted)">europbots.com</span>
  </div></body></html>`;
}

const jobs: { file: string; html: string }[] = [
  ...robots.map((r) => ({ file: `visuels/robots/${r.slug}.png`, html: robotCard(r) })),
  ...sectorPages.filter((s) => s.pitch).map((s) => ({ file: `visuels/verticales/${s.slug}.png`, html: verticalCard(s) })),
  { file: "visuels/chiffres/seuil-39-heures.png", html: figureCard("seuil") },
  { file: "visuels/chiffres/salarie-vs-robot.png", html: figureCard("comparatif") },
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
for (const j of jobs) {
  const out = path.join(OUT, j.file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const tmp = path.join(OUT, ".tmp.html");
  fs.writeFileSync(tmp, j.html);
  await page.goto("file://" + tmp, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: out });
  console.log("✓", j.file);
}
fs.rmSync(path.join(OUT, ".tmp.html"));
await browser.close();

fs.writeFileSync(
  path.join(OUT, "planche.html"),
  `<!doctype html><meta charset="utf-8"><title>Kit réseaux Europbots</title><style>body{background:#080808;color:#fafafa;font-family:system-ui;padding:32px}div{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px}img{width:100%;display:block}p{font:12px monospace;color:#a6a6a0;margin:6px 0 0}</style>
<h1>Kit réseaux Europbots · ${jobs.length} visuels 1080 × 1350</h1><div>${jobs.map((j) => `<figure style="margin:0"><img src="${j.file}"><p>${j.file}</p></figure>`).join("")}</div>`,
);
// Légendes « robot en action » : promesse, deux chiffres, un usage, le prix d'appel.
const legend = robots
  .map((r) => {
    const [a, b] = r.stats;
    const c = r.cases[0];
    return `## ${r.name} (${r.maker})\nVisuel : \`visuels/robots/${r.slug}.png\`\n\n${r.tagline}\n\n${a.value} ${a.label.toLowerCase()}. ${b.value} ${b.label.toLowerCase()}.\n\nSur le terrain (${c.place.toLowerCase()}) : ${c.text}\n\nEn leasing dès ${pricing.leaseFrom} € HT par mois sur ${pricing.leaseMonths} mois. Rentable dès ${Math.ceil(simulate({ hoursPerDay: 1 }).breakEvenHoursMonth)} heures de travail évitées par mois.\n\neuropbots.com/robots/${r.slug}\n`;
  })
  .join("\n---\n\n");
fs.writeFileSync(path.join(OUT, "legendes-robots.md"), `# Légendes « robot en action » · Europbots\n\nGénéré par \`npx tsx scripts/social.mts\` à partir des données du site.\n\n${legend}`);
console.log(`${jobs.length} visuels et ${robots.length} légendes générés dans social/`);
