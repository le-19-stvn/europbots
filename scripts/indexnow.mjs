#!/usr/bin/env node
// Envoie toutes les URL du sitemap à IndexNow (Bing, Yandex, Seznam…) après chaque mise en ligne.
// Usage : node scripts/indexnow.mjs   (le site doit être en ligne sur SITE)
const SITE = process.env.SITE ?? "https://europbots.com";
const KEY = "71b0f00213634e2ab6943a1c0f2b2403"; // fichier public/71b0f00213634e2ab6943a1c0f2b2403.txt
const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow : ${urlList.length} URL envoyées, réponse ${res.status}`);
