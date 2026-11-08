import type { NextConfig } from "next";
import data from "./lib/robots-data.json";

// Anciennes URL de europbots.com → nouvelles pages (301), pour conserver le référencement acquis.
const productRedirects = (data as { slug: string; oldSlug: string }[]).map((r) => ({
  source: `/produits/${r.oldSlug}`,
  destination: `/robots/${r.slug}`,
  permanent: true,
}));

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      ...productRedirects,
      { source: "/produits/:slug", destination: "/robots", permanent: true },
      { source: "/catalogue", destination: "/robots", permanent: true },
      { source: "/showroom", destination: "/showrooms", permanent: true },
      { source: "/politique-confidentialite", destination: "/confidentialite", permanent: true },
    ];
  },
};

export default nextConfig;
