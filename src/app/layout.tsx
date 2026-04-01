import type { Metadata } from "next";
import { Bai_Jamjuree, Outfit } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop";

const baiJamjuree = Bai_Jamjuree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.isotradition.ch"),
  title: {
    default: "ISO Tradition – Fenêtres & Portes en Suisse Romande",
    template: "%s – ISO Tradition",
  },
  description:
    "Spécialiste en fenêtres, portes, volets et protections solaires en Suisse romande. Qualité suisse, conseil personnalisé et installation par nos équipes certifiées.",
  keywords: [
    "fenêtres Suisse",
    "portes entrée Suisse",
    "baies coulissantes",
    "volets roulants",
    "portes de garage",
    "stores bannes",
    "films solaires",
    "carports pergolas",
    "rénovation énergétique Suisse",
    "ISO Tradition",
    "menuiserie Suisse romande",
  ],
  authors: [{ name: "ISO Tradition" }],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "fr_CH",
    url: "https://www.isotradition.ch",
    siteName: "ISO Tradition",
    title: "ISO Tradition – Fenêtres & Portes en Suisse Romande",
    description:
      "Spécialiste en fenêtres, portes, volets et protections solaires en Suisse romande. Qualité suisse, conseil personnalisé et installation professionnelle.",
    images: [
      {
        url: "/images/hero-terrace.webp",
        width: 2000,
        height: 1334,
        alt: "ISO Tradition – Fenêtres et portes suisses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ISO Tradition – Fenêtres & Portes en Suisse Romande",
    description:
      "Spécialiste en fenêtres, portes, volets et protections solaires en Suisse romande.",
    images: ["/images/hero-terrace.webp"],
  },
  alternates: {
    canonical: "https://www.isotradition.ch",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HomeAndConstructionBusiness",
              name: "ISO Tradition",
              url: "https://www.isotradition.ch",
              logo: "https://isotradition.ch/images/logo-couleur.webp",
              image: "https://isotradition.ch/images/hero-terrace.webp",
              description:
                "Spécialiste en fenêtres, portes, volets et protections solaires en Suisse romande.",
              telephone: "+41 21 624 53 00",
              email: "contact@isotradition.ch",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Route de Suisse 7A",
                addressLocality: "Mies",
                postalCode: "1295",
                addressCountry: "CH",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 46.3059,
                longitude: 6.2317,
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                ],
                opens: "08:00",
                closes: "17:00",
              },
              areaServed: [
                { "@type": "State", name: "Canton de Vaud" },
                { "@type": "State", name: "Canton de Genève" },
                { "@type": "State", name: "Canton de Fribourg" },
                { "@type": "State", name: "Canton du Valais" },
                { "@type": "State", name: "Canton de Neuchâtel" },
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                bestRating: "5",
                ratingCount: "120",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${baiJamjuree.variable} ${outfit.variable} font-sans antialiased`}
      >
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
