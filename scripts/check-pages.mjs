#!/usr/bin/env node
// Vérifie des pages produites : erreurs console, débordements (y compris masqués par overflow-hidden),
// checklist QA automatisable, et une capture par section en desktop et en mobile.
// Usage : node scripts/check-pages.mjs <base-url> <dossier-captures> [/,/offres,/contact]
// Prérequis : playwright dans le projet (npm i -D playwright && npx playwright install chromium).
import { chromium } from "playwright";
import fs from "node:fs";

const [BASE, OUT, list = "/"] = process.argv.slice(2);
if (!BASE || !OUT) { console.error("usage: node scripts/check-pages.mjs <base-url> <dossier-captures> [/,/page]"); process.exit(1); }
fs.mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let problems = 0;

const audit = () => {
  const W = innerWidth, H = innerHeight, out = {};
  const visible = (e) => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return r.width > 0 && r.height > 0 && cs.visibility !== "hidden" && cs.opacity !== "0"; };
  const label = (e) => `${e.tagName.toLowerCase()} « ${(e.innerText || "").trim().replace(/\s+/g, " ").slice(0, 50)} »`;
  out.h1 = [...document.querySelectorAll("h1")].filter(visible).length;
  // Éléments plus larges que la fenêtre, même cachés par un parent en overflow-hidden
  out.widerThanViewport = [...document.querySelectorAll("body *")].filter((e) => { const r = e.getBoundingClientRect(); return r.width > 4 && (r.right > W + 1 || r.left < -1) && getComputedStyle(e).position !== "fixed" && !e.closest("[data-allow-overflow], [aria-hidden=true]"); }).slice(0, 8).map(label);
  // Texte coupé : contenu plus large que la boîte (ellipsis, overflow-hidden, nowrap)
  out.clippedText = [...document.querySelectorAll("h1,h2,h3,p,a,button,li,span")].filter((e) => visible(e) && e.innerText?.trim() && e.scrollWidth > e.clientWidth + 2 && getComputedStyle(e).overflowX !== "visible").slice(0, 8).map(label);
  // Texte trop petit
  out.tinyText = [...document.querySelectorAll("body *")].filter((e) => visible(e) && [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()) && parseFloat(getComputedStyle(e).fontSize) < 12).slice(0, 8).map((e) => label(e) + " " + getComputedStyle(e).fontSize);
  // Éléments fixes ou collants posés en bas d'écran
  out.fixedBottom = [...document.querySelectorAll("body *")].filter((e) => { const cs = getComputedStyle(e); if (!["fixed", "sticky"].includes(cs.position) || !visible(e)) return false; const r = e.getBoundingClientRect(); return r.bottom > H - 140 && r.top > H / 2; }).filter((e, i, a) => !a.some((o) => o !== e && o.contains(e))).map(label);
  // CTA visible au premier écran : un lien ou bouton plein dans la première hauteur de fenêtre
  out.ctaAboveFold = [...document.querySelectorAll("a,button")].some((e) => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); const filled = (cs.backgroundColor !== "rgba(0, 0, 0, 0)" && cs.backgroundColor !== "transparent") || cs.backgroundImage !== "none"; return visible(e) && r.top < H && r.bottom > 0 && r.height >= 32 && filled; });
  // Polices chargées mais jamais utilisées
  const used = new Set([...document.querySelectorAll("body *")].map((e) => getComputedStyle(e).fontFamily.split(",")[0].replace(/["']/g, "").trim()));
  out.unusedFonts = [...new Set([...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family.replace(/["']/g, "")))].filter((f) => !used.has(f));
  // Mobile : meta viewport sans blocage du zoom, champs en 16 px (sinon zoom iOS au focus), cibles tactiles
  const vp = document.querySelector('meta[name="viewport"]')?.content || "";
  out.viewport = vp ? (/maximum-scale|user-scalable\s*=\s*no/.test(vp) ? "bloque le zoom : " + vp : "ok") : "absente";
  out.smallInputs = [...document.querySelectorAll("input, textarea, select")].filter((e) => visible(e) && parseFloat(getComputedStyle(e).fontSize) < 16).length;
  out.smallTargets = W < 500 ? [...document.querySelectorAll("a, button")].filter((e) => { const r = e.getBoundingClientRect(); return visible(e) && r.height > 0 && r.height < 32 && r.width < 32 && !e.closest("footer, nav"); }).length : 0;
  out.title = document.title; out.description = !!document.querySelector('meta[name="description"]'); out.ogImage = !!document.querySelector('meta[property="og:image"]');
  out.imgNoAlt = [...document.querySelectorAll("img")].filter((i) => !i.hasAttribute("alt")).length;
  return out;
};

const browser = await chromium.launch();
for (const [vw, vh, tag] of [[1440, 900, "desktop"], [390, 844, "mobile"]]) {
  const ctx = await browser.newContext({ viewport: { width: vw, height: vh }, deviceScaleFactor: 1 });
  for (const route of list.split(",")) {
    const p = await ctx.newPage(); const errs = [];
    p.on("console", (m) => m.type() === "error" && errs.push(m.text().slice(0, 160)));
    p.on("pageerror", (e) => errs.push("PAGEERROR " + e.message.slice(0, 160)));
    await p.goto(BASE.replace(/\/$/, "") + route, { waitUntil: "load" });
    await sleep(1500);
    // Le smooth scroll du site fausse les captures : on le coupe pendant la vérification
    await p.addStyleTag({ content: "html, body { scroll-behavior: auto !important; }" });
    const name = route === "/" ? "home" : route.replace(/\//g, "_").replace(/^_/, "");
    const a = await p.evaluate(audit);
    // Scroll complet pour déclencher les animations, puis une capture par section
    const total = await p.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < total; y += vh * 0.7) { await p.evaluate((y) => scrollTo(0, y), y); await sleep(250); }
    const sections = await p.evaluate(() => [...document.querySelectorAll("header, main > *, section, footer")].filter((e, i, all) => e.getBoundingClientRect().height > 80 && !all.some((o) => o !== e && o.contains(e) && o.tagName === "SECTION")).map((e) => ({ y: e.getBoundingClientRect().top + scrollY, h: e.getBoundingClientRect().height })).sort((x, z) => x.y - z.y));
    let i = 0;
    for (const s of sections) {
      await p.evaluate((y) => scrollTo(0, y), Math.max(0, s.y - 60)); await sleep(700);
      await p.screenshot({ path: `${OUT}/${name}-${tag}-${String(i++).padStart(2, "0")}.png` });
    }
    const issues = [];
    if (errs.length) issues.push(`erreurs console : ${[...new Set(errs)].join(" | ")}`);
    if (a.h1 !== 1) issues.push(`${a.h1} h1 visibles (attendu : 1)`);
    if (a.widerThanViewport.length) issues.push(`plus large que l'écran : ${a.widerThanViewport.join(" ; ")}`);
    if (a.clippedText.length) issues.push(`texte coupé : ${a.clippedText.join(" ; ")}`);
    if (a.tinyText.length) issues.push(`texte < 12px : ${a.tinyText.join(" ; ")}`);
    if (a.fixedBottom.length > 2) issues.push(`${a.fixedBottom.length} éléments fixes en bas : ${a.fixedBottom.join(" ; ")}`);
    if (!a.ctaAboveFold) issues.push("aucun CTA plein au premier écran");
    if (a.unusedFonts.length) issues.push(`polices chargées non utilisées : ${a.unusedFonts.join(", ")}`);
    if (!a.description || !a.ogImage) issues.push(`meta manquantes :${a.description ? "" : " description"}${a.ogImage ? "" : " og:image"}`);
    if (a.imgNoAlt) issues.push(`${a.imgNoAlt} images sans alt`);
    if (a.viewport !== "ok") issues.push(`meta viewport ${a.viewport}`);
    if (a.smallInputs) issues.push(`${a.smallInputs} champ(s) de formulaire sous 16 px (zoom iOS au focus)`);
    if (a.smallTargets) issues.push(`${a.smallTargets} cible(s) tactile(s) sous 32 px dans le contenu`);
    problems += issues.length;
    console.log(`${route} [${tag}] ${total}px, ${i} captures, ${issues.length ? issues.length + " point(s)" : "OK"}${issues.map((x) => "\n  - " + x).join("")}`);
    await p.close();
  }
  await ctx.close();
}
await browser.close();
console.log(problems ? `\n${problems} point(s) à corriger. Regarde aussi les captures : ce script ne voit ni les contrastes sur image ni le rendu des animations.` : "\nAucun problème détecté. Regarde quand même les captures.");
