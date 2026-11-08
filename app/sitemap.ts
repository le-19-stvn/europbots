import type { MetadataRoute } from "next";
import { categories, robots } from "@/lib/robots";
import { sectorPages } from "@/lib/sectors";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number) => ({ url: `${SITE_URL}${path}`, lastModified: now, priority });
  return [
    page("/", 1),
    page("/robots", 0.9),
    ...Object.keys(categories).map((c) => page(`/gammes/${c}`, 0.8)),
    ...robots.map((r) => ({ ...page(`/robots/${r.slug}`, 0.8), images: [`${SITE_URL}${r.image}`] })),
    ...sectorPages.map((x) => page(`/secteurs/${x.slug}`, 0.8)),
    page("/location-leasing-robot", 0.8),
    page("/showrooms", 0.6),
    page("/contact", 0.7),
    page("/mentions-legales", 0.2),
    page("/confidentialite", 0.2),
    page("/cgv", 0.2),
  ];
}
