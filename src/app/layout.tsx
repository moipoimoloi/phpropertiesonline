import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Open_Sans, Cormorant_Garamond } from "next/font/google";
import { BROKER } from "@/data/properties";
import "./globals.css";

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-display",
  display: "swap"
});

const body = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-body",
  display: "swap"
});

const accent = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-accent",
  display: "swap"
});

const ICONS_USED = [
  "add",
  "arrow_forward",
  "calculate",
  "call",
  "close",
  "cookie",
  "handshake",
  "location_on",
  "mail",
  "menu",
  "military_tech",
  "open_in_new",
  "place",
  "play_arrow",
  "search",
  "search_off",
  "verified",
  "workspace_premium"
].join(",");

const MATERIAL_SYMBOLS_URL = `https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@400,0..1&icon_names=${ICONS_USED}&display=swap`;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://phpropertiesonline.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#b3252b" },
    { media: "(prefers-color-scheme: dark)", color: "#8a1d22" }
  ]
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Avida Land Properties Philippines — Abigail S. Natan, Licensed Broker",
    template: "%s · Avida by Abigail"
  },
  description:
    "Authorized Avida Land property specialist for Metro Manila, Laguna, and Pampanga. REB Lic. 0033432. Sample computations and guided site visits.",
  keywords: [
    "Avida Land",
    "Philippines real estate",
    "Makati condo",
    "Mandaluyong condo",
    "Pampanga house and lot",
    "Laguna properties",
    "Abigail Natan",
    "REB 0033432"
  ],
  authors: [{ name: BROKER.name }],
  creator: BROKER.name,
  alternates: {
    canonical: "/"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 }
  },
  // Favicon auto-attached via app/icon.svg
  openGraph: {
    title: "Avida Land Properties Philippines — by Abigail S. Natan",
    description:
      "Premier Philippine properties guided by an authorized Avida Land specialist. REB Lic. 0033432.",
    url: SITE_URL,
    siteName: "Avida by Abigail",
    locale: "en_PH",
    type: "website"
    // OG image is auto-attached via app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: "Avida Land Properties Philippines — by Abigail S. Natan",
    description: "Premier Philippine properties guided by an authorized Avida Land specialist."
    // Twitter image is auto-attached via app/opengraph-image.tsx
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "@id": `${SITE_URL}#broker`,
  name: BROKER.name,
  jobTitle: BROKER.title,
  url: SITE_URL,
  image: `${SITE_URL}/assets/abigail.jpg`,
  telephone: BROKER.phone,
  email: BROKER.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Theater Drive, Circuit Corporate Tower 1",
    addressLocality: "Makati",
    postalCode: "1207",
    addressCountry: "PH"
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Metro Manila" },
    { "@type": "AdministrativeArea", name: "Laguna" },
    { "@type": "AdministrativeArea", name: "Pampanga" }
  ],
  identifier: `REB ${BROKER.reb}`,
  sameAs: ["https://www.facebook.com/avidapropertiesph"]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${accent.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="image" href="/hero-poster.jpg" fetchPriority="high" />
        <link rel="stylesheet" href={MATERIAL_SYMBOLS_URL} />
        <script
          key="ld-json-real-estate-agent"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background text-on-surface">{children}</body>
    </html>
  );
}
