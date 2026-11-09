// Kit réseaux Europbots : visuels, vidéos et descriptions par canal, générés depuis les données du site.
//
//   npx tsx scripts/social.mts                         tous les visuels, 3 formats, + descriptions
//   npx tsx scripts/social.mts --format=story          un seul format (portrait | carre | story)
//   npx tsx scripts/social.mts --only=robots           une seule famille (robots | verticales | chiffres)
//   npx tsx scripts/social.mts --robot=novabot         un seul robot (ou --secteur=hotellerie)
//   npx tsx scripts/social.mts --video                 ajoute les vidéos MP4 (story 1080 × 1920, 25 i/s)
//   npx tsx scripts/social.mts --video --no-images     vidéos seules
//   SOCIAL_DOMAIN=europbots.vercel.app npx tsx ...     domaine affiché dans les visuels et les textes
//
// Sorties : social/visuels/<format>/<famille>/<slug>.png · social/videos/<famille>/<slug>.mp4
//           social/descriptions/<famille>/<slug>.md · social/planche.html
// Charte et règles : .claude/skills/europbots-reseaux/ (skill « europbots-reseaux »).
import { chromium, type Page } from "playwright";
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import ffmpegPath from "ffmpeg-static";
import { categories, robots, type Robot } from "../lib/robots";
import { sectorPages, type SectorPage } from "../lib/sectors";
import { eur, pricing, signedEur, simulate } from "../lib/pricing";

/* ---------- Options ---------- */
const arg = (k: string) => process.argv.find((a) => a.startsWith(`--${k}=`))?.split("=")[1];
const flag = (k: string) => process.argv.includes(`--${k}`);
const DOMAIN = process.env.SOCIAL_DOMAIN ?? "europbots.com";
const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "social");
const FORMATS = { portrait: { w: 1080, h: 1350 }, carre: { w: 1080, h: 1080 }, story: { w: 1080, h: 1920 } } as const;
type Format = keyof typeof FORMATS;
const formats = (arg("format")?.split(",") ?? Object.keys(FORMATS)) as Format[];
const only = arg("only")?.split(",");
const pickRobots = robots.filter((r) => !arg("robot") || arg("robot")!.split(",").includes(r.slug));
const pickSectors = sectorPages.filter((s) => s.pitch && (!arg("secteur") || arg("secteur")!.split(",").includes(s.slug)));
const want = (fam: string) => !only || only.includes(fam);

/* ---------- Charte ---------- */
const pub = (p: string) => "file://" + path.join(ROOT, "public", p);
const LOGO = fs.readFileSync(path.join(ROOT, "public/assets/brand/logo-jaune.svg"), "utf8").replace(/<\?xml[^>]*>/, "");
const BREAK_EVEN = Math.ceil(simulate({ hoursPerDay: 1 }).breakEvenHoursMonth);
const CTA = { demo: "Demander une démo", roi: "Calculer ma rentabilité" };

const css = (w: number, h: number) => `
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400..700&family=Geist+Mono:wght@400;500&family=Syncopate:wght@700&display=block" rel="stylesheet">
<link href="https://api.fontshare.com/v2/css?f[]=clash-grotesk@500,600&display=block" rel="stylesheet">
<style>
  @property --n { syntax: '<integer>'; inherits: false; initial-value: 0; }
  :root { --ink:#080808; --ink3:#1a1a1a; --line:#262626; --paper:#fafafa; --muted:#a6a6a0; --subtle:#6f6f6a; --lime:#d2ff00; --pad:${w * 0.06}px; }
  * { margin:0; padding:0; box-sizing:border-box; }
  body { width:${w}px; height:${h}px; overflow:hidden; position:relative; background:var(--ink); color:var(--paper); font-family:Geist,sans-serif; }
  .d { font-family:"Clash Grotesk",Geist,sans-serif; font-weight:500; letter-spacing:-.035em; line-height:.92; }
  .m { font-family:"Geist Mono",monospace; font-size:22px; letter-spacing:.02em; text-transform:uppercase; }
  .top { position:absolute; left:var(--pad); right:var(--pad); top:${h > 1500 ? 90 : 60}px; display:flex; justify-content:space-between; align-items:center; z-index:5; }
  .logo { display:flex; align-items:center; gap:18px; } .logo svg { height:40px; width:auto; }
  .logo span { font-family:Syncopate,sans-serif; font-weight:700; font-size:22px; letter-spacing:.18em; text-transform:uppercase; }
  .tag { background:rgba(8,8,8,.72); padding:10px 16px; }
  .bars { display:inline-grid; gap:3px; margin-right:14px; vertical-align:middle; }
  .bars i { display:block; height:3px; background:var(--lime); }
  .bars i:nth-child(1){width:14px} .bars i:nth-child(2),.bars i:nth-child(3){width:24px;border-radius:0 3px 3px 0}
  .pill { display:inline-flex; align-items:center; gap:16px; height:68px; padding:0 12px 0 30px; border-radius:0 999px 999px 0; background:var(--lime); color:var(--ink); font-weight:700; font-size:27px; white-space:nowrap; }
  .pill b { display:grid; place-items:center; width:46px; height:46px; border-radius:99px; background:var(--ink); color:var(--lime); font-size:24px; }
  .foot { display:flex; justify-content:space-between; align-items:center; gap:24px; }
  .count::after { content: counter(n); } .count { counter-reset: n var(--n); }
  /* Animations (vidéo) : pilotées image par image, inactives sur les visuels fixes */
  .anim .kb { animation: kb 9s linear both; }
  .anim .up { animation: up .8s cubic-bezier(.22,1,.36,1) both; }
  .anim .fade { animation: fade .6s ease both; }
  .anim .end { animation: fade .5s ease both; }
  .still .end { display:none; }
  @keyframes kb { from { transform: scale(1.14); } to { transform: scale(1); } }
  @keyframes up { from { opacity:0; transform: translateY(60px); } to { opacity:1; transform:none; } }
  @keyframes fade { from { opacity:0; } to { opacity:1; } }
</style>`;

const top = (tag: string) => `<div class="top fade" style="animation-delay:.1s"><div class="logo">${LOGO}<span>Europbots</span></div><span class="m tag">${tag}</span></div>`;
const endCard = (cta: string, at: number) => `
  <div class="end" style="position:absolute;inset:0;z-index:20;background:var(--ink);display:flex;flex-direction:column;justify-content:center;align-items:center;gap:56px;animation-delay:${at}s">
    <div class="logo" style="transform:scale(1.6)">${LOGO}<span>Europbots</span></div>
    <p class="d" style="font-size:96px;text-align:center">Leasing dès <span style="color:var(--lime)">${pricing.leaseFrom}&nbsp;€</span><br>HT par mois</p>
    <span class="pill">${cta} <b>→</b></span>
    <span class="m" style="color:var(--muted)">${DOMAIN}</span>
  </div>`;

/* ---------- Gabarits ---------- */
function robotHtml(r: Robot, f: Format, video = false) {
  const { w, h } = FORMATS[f];
  const mediaH = Math.round(h * (f === "story" ? 0.62 : f === "carre" ? 0.6 : 0.64));
  const k = f === "carre" ? 0.82 : 1;
  const media = r.photo
    ? `<img class="kb" src="${pub(r.photo)}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">`
    : `<div style="position:absolute;inset:0;background:#f1f1ee"></div><img class="kb" src="${pub(r.image)}" style="position:absolute;left:15%;top:12%;width:70%;height:70%;object-fit:contain;mix-blend-mode:multiply">`;
  const [a, b] = r.stats;
  return `<!doctype html><html><head><meta charset="utf-8">${css(w, h)}</head><body class="${video ? "anim" : "still"}">
  <div style="position:absolute;left:0;right:0;top:0;height:${mediaH}px;overflow:hidden">${media}
    <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(8,8,8,.6) 0%,rgba(8,8,8,0) 26%,rgba(8,8,8,0) 58%,var(--ink) 100%)"></div></div>
  ${top(categories[r.category].name + " · " + r.label)}
  <div style="position:absolute;left:var(--pad);right:var(--pad);bottom:${f === "story" ? 110 : 60}px">
    <p class="m up" style="color:var(--muted);animation-delay:.4s"><span class="bars"><i></i><i></i><i></i></span>${r.maker}</p>
    <h1 class="d up" style="font-size:${Math.round(118 * k)}px;text-transform:uppercase;margin-top:16px;animation-delay:.6s">${r.name}</h1>
    <p class="up" style="font-size:${Math.round(36 * k)}px;line-height:1.2;margin-top:18px;max-width:920px;letter-spacing:-.015em;animation-delay:1s">${r.tagline}</p>
    <div style="display:grid;grid-template-columns:1fr 1fr;margin-top:${Math.round(34 * k)}px;border-top:1px solid var(--line)">
      ${[a, b].map((s, i) => `<div class="up" style="animation-delay:${1.8 + i * 0.4}s;padding:${Math.round(24 * k)}px ${i ? "0 0 0 28px" : "28px 0 0"};${i ? "border-left:1px solid var(--line)" : ""}"><div class="d" style="font-size:${Math.round(84 * k)}px">${s.value}</div><div class="m" style="color:var(--subtle);margin-top:10px">${s.label}</div></div>`).join("")}
    </div>
    <p class="m fade" style="color:var(--lime);margin-top:${Math.round(30 * k)}px;animation-delay:3s">Leasing dès ${pricing.leaseFrom} € HT / mois · ${pricing.leaseMonths} mois</p>
    <div class="foot up" style="margin-top:22px;animation-delay:3.4s"><span class="pill">${CTA.demo} <b>→</b></span><span class="m" style="color:var(--muted)">${DOMAIN}</span></div>
  </div>
  ${video ? endCard(CTA.demo, 6.8) : ""}
  </body></html>`;
}

function sectorHtml(s: SectorPage, f: Format, video = false) {
  const { w, h } = FORMATS[f];
  const hrs = s.pitch!.hours;
  const r = simulate({ hoursPerDay: hrs });
  const rows = (f === "carre" ? [2, 3, 4, 5] : [1, 2, 3, 4, 5, 6]).map((x) => ({ x, ...simulate({ hoursPerDay: x }) }));
  const k = f === "carre" ? 0.8 : 1;
  const titleTop = f === "story" ? 260 : 180;
  return `<!doctype html><html><head><meta charset="utf-8">${css(w, h)}</head><body class="${video ? "anim" : "still"}">
  <div style="position:absolute;right:0;top:0;width:${f === "story" ? w : 540}px;height:${f === "story" ? 760 : 600}px;overflow:hidden"><img class="kb" src="${pub(s.photo)}" style="width:100%;height:100%;object-fit:cover;opacity:.62"><div style="position:absolute;inset:0;background:linear-gradient(90deg,var(--ink),rgba(8,8,8,0) 65%),linear-gradient(0deg,var(--ink),rgba(8,8,8,0) 55%)"></div></div>
  ${top("Rentabilité · " + s.name)}
  <div style="position:absolute;left:var(--pad);top:${titleTop}px;width:${f === "story" ? 900 : 640}px">
    <p class="m up" style="color:var(--muted);animation-delay:.3s"><span class="bars"><i></i><i></i><i></i></span>${s.name}</p>
    <h1 class="d up" style="font-size:${Math.round((f === "story" ? 96 : 76) * k)}px;margin-top:20px;animation-delay:.5s">${s.pitch!.title}</h1>
  </div>
  <div style="position:absolute;left:var(--pad);right:var(--pad);bottom:${f === "story" ? 110 : 56}px">
    <p class="m fade" style="color:var(--subtle);animation-delay:1.6s">${hrs} h de travail économisées par jour</p>
    <div class="fade" style="display:flex;align-items:flex-end;gap:24px;margin-top:6px;animation-delay:1.8s">
      <span class="d" style="font-size:${Math.round(178 * k)}px;color:var(--lime)">${video ? `+<span class="count cnt"></span> €` : signedEur(r.net)}</span>
      <span style="font-size:${Math.round(29 * k)}px;color:var(--muted);padding-bottom:${Math.round(24 * k)}px">net / mois<br>après le loyer</span>
    </div>
    <table style="width:100%;border-collapse:collapse;margin-top:${Math.round(22 * k)}px;font-size:${Math.round(25 * k)}px">
      <tr class="m fade" style="color:var(--subtle);animation-delay:3.8s"><td style="padding:8px 0">Heures / jour</td><td>Économie brute</td><td style="text-align:right">Après leasing</td></tr>
      ${rows.map((x, i) => `<tr class="fade" style="animation-delay:${4 + i * 0.18}s;border-top:1px solid var(--line);${x.x === hrs ? "background:var(--ink3);color:var(--paper)" : "color:var(--muted)"}"><td style="padding:${Math.round(11 * k)}px 10px">${x.x} h</td><td>${eur(x.gross)}</td><td style="text-align:right;padding-right:10px;font-family:'Geist Mono';${x.net >= 0 ? "color:var(--lime)" : ""}">${signedEur(x.net)}</td></tr>`).join("")}
    </table>
    <div class="foot up" style="margin-top:${Math.round(26 * k)}px;animation-delay:5.4s"><span class="pill">${CTA.roi} <b>→</b></span><span class="m" style="color:var(--muted)">${DOMAIN}</span></div>
    <p style="font-size:17px;color:var(--subtle);margin-top:18px;line-height:1.4">Leasing ${pricing.leaseMonths} mois dès ${pricing.leaseFrom} € HT/mois · ${pricing.hourlyCost} €/h, ${pricing.workDays} j/mois · hors maintenance, consommables et supervision · économie réelle si les heures libérées réduisent les dépenses de personnel.</p>
  </div>
  <style>.anim .cnt { animation: cnt 2.2s cubic-bezier(.22,1,.36,1) 1.9s both; } @keyframes cnt { from { --n: 0; } to { --n: ${Math.round(r.net)}; } }</style>
  ${video ? endCard(CTA.roi, 7.6) : ""}
  </body></html>`;
}

function figureHtml(kind: "seuil" | "comparatif", f: Format) {
  const { w, h } = FORMATS[f];
  const k = f === "carre" ? 0.78 : 1;
  const four = signedEur(simulate({ hoursPerDay: 4 }).net);
  const body =
    kind === "seuil"
      ? `<p class="m" style="color:var(--muted)"><span class="bars"><i></i><i></i><i></i></span>Le seuil de rentabilité</p>
         <h1 class="d" style="font-size:${Math.round(500 * k)}px;color:var(--lime);margin-top:24px;letter-spacing:-.06em">${BREAK_EVEN}h</h1>
         <p style="font-size:${Math.round(46 * k)}px;line-height:1.15;letter-spacing:-.02em;margin-top:6px;max-width:920px">de travail évitées par mois suffisent pour qu'un robot à ${pricing.leaseFrom} € couvre son loyer.</p>
         <p style="font-size:${Math.round(30 * k)}px;color:var(--muted);margin-top:24px">Moins de 2 h par jour. Au-delà, chaque heure est un gain.</p>`
      : `<p class="m" style="color:var(--muted)"><span class="bars"><i></i><i></i><i></i></span>Sur ${pricing.leaseMonths} mois</p>
         <h1 class="d" style="font-size:${Math.round(92 * k)}px;margin-top:24px">Un robot n'a pas besoin de remplacer un salarié <span style="color:var(--lime)">pour être rentable.</span></h1>
         <div style="display:grid;grid-template-columns:1fr 1fr;margin-top:${Math.round(56 * k)}px;border-top:1px solid var(--line)">
           <div style="padding:28px 28px 0 0"><div class="m" style="color:var(--subtle)">Salarié au SMIC</div><div class="d" style="font-size:${Math.round(92 * k)}px;margin-top:14px;white-space:nowrap">${eur(pricing.employeeMonthly * pricing.leaseMonths)}</div></div>
           <div style="padding:28px 0 0 28px;border-left:1px solid var(--line)"><div class="m" style="color:var(--subtle)">Robot Europbots</div><div class="d" style="font-size:${Math.round(92 * k)}px;margin-top:14px;white-space:nowrap;color:var(--lime)">${eur(pricing.leaseFrom * pricing.leaseMonths)}</div></div>
         </div>
         <p style="font-size:${Math.round(24 * k)}px;color:var(--subtle);margin-top:36px;line-height:1.4">Cet écart n'est pas une économie automatique. Le bon calcul : les heures de tâches répétitives que le robot reprend. 4 h par jour = ${four} net par mois.</p>`;
  return `<!doctype html><html><head><meta charset="utf-8">${css(w, h)}</head><body class="still">
  ${top("Leasing dès " + pricing.leaseFrom + " € HT / mois")}
  <div style="position:absolute;left:var(--pad);right:var(--pad);${f === "story" ? "top:50%;transform:translateY(-55%)" : `top:${f === "carre" ? 150 : 200}px`}">${body}</div>
  <div class="foot" style="position:absolute;left:var(--pad);right:var(--pad);bottom:${f === "story" ? 110 : 60}px"><span class="pill">${CTA.roi} <b>→</b></span><span class="m" style="color:var(--muted)">${DOMAIN}</span></div>
  </body></html>`;
}

/* ---------- Descriptions par canal ---------- */
const TAGS: Record<string, string[]> = {
  service: ["#robotique", "#robotdeservice", "#hotellerie", "#restauration", "#innovation", "#accueil"],
  nettoyage: ["#robotique", "#proprete", "#nettoyage", "#facilitymanagement", "#autolaveuse", "#innovation"],
  logistique: ["#robotique", "#logistique", "#entrepot", "#industrie", "#AMR", "#supplychain"],
};

const lc = (t: string) => t.charAt(0).toLowerCase() + t.slice(1);
/** « L50 » seul ne dit rien : on préfixe le constructeur aux noms de modèle courts. */
const fullName = (r: Robot) => (/^[A-Z]{1,3}\s?[A-Z]?\d/.test(r.name) ? `${r.maker} ${r.name}` : r.name);
const stat = (x: { value: string; label: string }) => `${x.label} : ${x.value}`;

function robotChannels(r: Robot) {
  const [a, b] = r.stats;
  const c = r.cases[0];
  const n = fullName(r);
  const url = `${DOMAIN}/robots/${r.slug}`;
  const tags = ["#Europbots", ...TAGS[r.category], `#${r.maker.replace(/\s/g, "")}`];
  return `# ${n} (${r.maker}) · descriptions par canal

Visuels : \`visuels/<format>/robots/${r.slug}.png\` · Vidéo : \`videos/robots/${r.slug}.mp4\`

## LinkedIn
${n} : ${lc(r.tagline)}

${stat(a)}. ${stat(b)}.

${c.place} : ${lc(c.text)}

En leasing dès ${pricing.leaseFrom} € HT par mois sur ${pricing.leaseMonths} mois. À ${pricing.hourlyCost} € de l'heure, le loyer est couvert dès ${BREAK_EVEN} heures de travail évitées par mois : moins de 2 heures par jour.

${CTA.demo} : ${url}

${tags.slice(0, 3).join(" ")}

## Instagram (feed et carrousel)
${n} : ${lc(r.tagline)}

${stat(a)} · ${stat(b)}
${c.title}.

Leasing dès ${pricing.leaseFrom} € HT/mois. Loyer couvert dès ${BREAK_EVEN} h de travail évitées par mois.
${CTA.demo} : lien en bio.

${tags.join(" ")}

## Reels, TikTok, YouTube Shorts
Texte à l'écran : « ${c.title} »

Légende : ${n}, ${lc(r.tagline)} Dès ${pricing.leaseFrom} €/mois en leasing. ${tags.slice(0, 4).join(" ")}

Titre Shorts : ${n} · ${lc(c.title)}

## Facebook
${n} : ${lc(r.tagline)} ${c.text}

Disponible en location, en leasing (dès ${pricing.leaseFrom} € HT par mois) ou à l'achat, installé et suivi par nos équipes. Démonstration dans nos showrooms de Paris et de Clermont-Ferrand.

${url}

## Google Business Profile (actualité, bouton « En savoir plus »)
${n} : ${lc(r.tagline)} ${stat(a)}, ${lc(stat(b))}. Leasing dès ${pricing.leaseFrom} € HT par mois sur ${pricing.leaseMonths} mois, installation et formation comprises. Démonstration au showroom de Paris, 9 avenue de la Grande Armée.
Lien du bouton : https://${url}

## X
${n} : ${lc(r.tagline).replace(/\.$/, "")}. ${stat(a)}, dès ${pricing.leaseFrom} €/mois en leasing. ${url}
`;
}

function sectorChannels(s: SectorPage) {
  const hrs = s.pitch!.hours;
  const r = simulate({ hoursPerDay: hrs });
  const url = `${DOMAIN}/secteurs/${s.slug}`;
  const names = s.solutions.slice(0, 3).map((x) => fullName(robots.find((y) => y.slug === x.slug)!)).join(", ");
  return `# ${s.name} · descriptions par canal

Visuels : \`visuels/<format>/verticales/${s.slug}.png\` · Vidéo : \`videos/verticales/${s.slug}.mp4\`

## LinkedIn
${s.pitch!.title}

${s.pitch!.text}

Le calcul avec un robot en leasing à ${pricing.leaseFrom} € HT par mois et ${pricing.hourlyCost} € de l'heure :
→ ${hrs} heures reprises par jour
→ ${eur(r.gross)} d'heures évitées par mois
→ ${signedEur(r.net)} net après le loyer
→ ${signedEur(r.overTerm)} sur ${pricing.leaseMonths} mois

Une condition : les heures libérées doivent réduire vos dépenses de personnel ou vous éviter un recrutement.

Robots adaptés : ${names}.
${CTA.roi} : ${DOMAIN}/location-leasing-robot

## Instagram
${s.pitch!.title}
${hrs} h reprises par jour = ${signedEur(r.net)} net par mois après le loyer.
${CTA.roi} : lien en bio.

#Europbots #robotique #${s.slug.replace(/-/g, "")} #rentabilite #innovation #leasing

## Reels, TikTok, YouTube Shorts
Texte à l'écran : « ${hrs} h par jour = ${signedEur(r.net)} par mois »
Légende : Un robot à ${pricing.leaseFrom} €/mois n'a pas besoin de remplacer un salarié pour être rentable. #Europbots #robotique #rentabilite

## Facebook
${s.pitch!.text} Faites le calcul avec vos propres chiffres : ${DOMAIN}/location-leasing-robot

## Google Business Profile
${s.h1} : leasing dès ${pricing.leaseFrom} € HT par mois sur ${pricing.leaseMonths} mois. Rentable dès ${BREAK_EVEN} heures de travail évitées par mois. Démonstration au showroom de Paris.
Lien du bouton : https://${url}
`;
}

/* ---------- Rendu ---------- */
async function load(page: Page, html: string) {
  const tmp = path.join(OUT, ".tmp.html");
  fs.writeFileSync(tmp, html);
  await page.goto("file://" + tmp, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
}

async function still(page: Page, html: string, file: string) {
  await load(page, html);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  await page.screenshot({ path: file });
}

async function video(page: Page, html: string, file: string, seconds: number, fps = 25) {
  await load(page, html);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const ff = spawn(ffmpegPath as unknown as string, ["-y", "-f", "image2pipe", "-framerate", String(fps), "-i", "-", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "20", "-movflags", "+faststart", file], { stdio: ["pipe", "ignore", "ignore"] });
  for (let i = 0; i < seconds * fps; i++) {
    const t = (i / fps) * 1000;
    await page.evaluate((ms) => document.getAnimations().forEach((a) => { a.pause(); a.currentTime = ms; }), t);
    ff.stdin.write(await page.screenshot({ type: "jpeg", quality: 90 }));
  }
  ff.stdin.end();
  await new Promise((res) => ff.on("close", res));
}

const browser = await chromium.launch();
const made: string[] = [];
for (const f of formats) {
  const page = await browser.newPage({ viewport: { width: FORMATS[f].w, height: FORMATS[f].h } });
  if (!flag("no-images")) {
    if (want("robots")) for (const r of pickRobots) { const p = `visuels/${f}/robots/${r.slug}.png`; await still(page, robotHtml(r, f), path.join(OUT, p)); made.push(p); }
    if (want("verticales")) for (const s of pickSectors) { const p = `visuels/${f}/verticales/${s.slug}.png`; await still(page, sectorHtml(s, f), path.join(OUT, p)); made.push(p); }
    if (want("chiffres")) for (const k of ["seuil", "comparatif"] as const) { const p = `visuels/${f}/chiffres/${k}.png`; await still(page, figureHtml(k, f), path.join(OUT, p)); made.push(p); }
  }
  await page.close();
  console.log(`✓ ${f}`);
}
if (flag("video")) {
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  if (want("robots")) for (const r of pickRobots) { const p = `videos/robots/${r.slug}.mp4`; await video(page, robotHtml(r, "story", true), path.join(OUT, p), 9); made.push(p); console.log("✓", p); }
  if (want("verticales")) for (const s of pickSectors) { const p = `videos/verticales/${s.slug}.mp4`; await video(page, sectorHtml(s, "story", true), path.join(OUT, p), 10); made.push(p); console.log("✓", p); }
}
fs.rmSync(path.join(OUT, ".tmp.html"), { force: true });
await browser.close();

for (const r of pickRobots) { const p = path.join(OUT, "descriptions/robots", `${r.slug}.md`); fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, robotChannels(r)); }
for (const s of pickSectors) { const p = path.join(OUT, "descriptions/verticales", `${s.slug}.md`); fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, sectorChannels(s)); }

// Planche d'aperçu : tout ce qui existe dans social/, pas seulement ce run
const walk = (d: string): string[] => (fs.existsSync(d) ? fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)])) : []);
const rel = (p: string) => path.relative(OUT, p);
const imgs = walk(path.join(OUT, "visuels")).filter((p) => p.endsWith(".png")).map(rel).sort();
const vids = walk(path.join(OUT, "videos")).filter((p) => p.endsWith(".mp4")).map(rel).sort();
fs.writeFileSync(
  path.join(OUT, "planche.html"),
  `<!doctype html><meta charset="utf-8"><title>Kit réseaux Europbots</title><style>body{background:#080808;color:#fafafa;font-family:system-ui;padding:32px}h2{margin:40px 0 12px;font-weight:500}div{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:14px}img,video{width:100%;display:block;background:#111}p{font:11px monospace;color:#a6a6a0;margin:6px 0 0;word-break:break-all}</style>
<h1>Kit réseaux Europbots</h1><p>${imgs.length} visuels · ${vids.length} vidéos · domaine affiché : ${DOMAIN}</p>
${vids.length ? `<h2>Vidéos (story 1080 × 1920)</h2><div>${vids.map((v) => `<figure style="margin:0"><video src="${v}" controls muted loop playsinline preload="metadata"></video><p>${v}</p></figure>`).join("")}</div>` : ""}
${(Object.keys(FORMATS) as Format[]).map((f) => { const l = imgs.filter((i) => i.startsWith(`visuels/${f}/`)); return l.length ? `<h2>${f} (${FORMATS[f].w} × ${FORMATS[f].h})</h2><div>${l.map((i) => `<figure style="margin:0"><img src="${i}" loading="lazy"><p>${i}</p></figure>`).join("")}</div>` : ""; }).join("")}`,
);
console.log(`${made.length} fichiers générés · descriptions dans social/descriptions/ · aperçu : social/planche.html`);
