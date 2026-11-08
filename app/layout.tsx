import type { Metadata, Viewport } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SITE_URL, company } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Europbots · Robots de service, de nettoyage et logistiques en location et leasing",
    template: "%s · Europbots",
  },
  description:
    "Leasing de robots dès 500 € HT/mois, location et vente : robots de service, d'accueil, de nettoyage et de logistique. 19 robots OrionStar, Keenon, temi, Cenobots… installés, cartographiés et suivis par Europbots.",
  openGraph: {
    type: "website",
    siteName: "Europbots",
    locale: "fr_FR",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Europbots, robotique de service" }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, "max-image-preview": "large" },
};

export const viewport: Viewport = { themeColor: "#080808" };

// Clash Grotesk (titres, Fontshare) · Geist (texte) · Geist Mono (données) · Syncopate (logotype uniquement).
const FONTS =
  "https://fonts.googleapis.com/css2?family=Geist:wght@400..700&family=Geist+Mono:wght@400;500&family=Syncopate:wght@700&display=swap";
const CLASH = "https://api.fontshare.com/v2/css?f[]=clash-grotesk@400,500,600&display=swap";

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: company.name,
  legalName: company.legalName,
  url: SITE_URL,
  logo: `${SITE_URL}/assets/brand/logo-jaune.png`,
  email: company.email,
  telephone: company.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: company.address.street,
    postalCode: company.address.postalCode,
    addressLocality: company.address.city,
    addressCountry: company.address.country,
  },
  sameAs: [company.linkedin, company.instagram],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        <link rel="stylesheet" href={FONTS} />
        <link rel="stylesheet" href={CLASH} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </head>
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
