import type { Metadata } from "next";
import { Marcellus, Sora } from "next/font/google";
import "./globals.css";

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-marcellus",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://elivique-carvings.vercel.app"),
  title: "Elivique Carvings — Hand-Carved Wood Sculpture, Los Angeles",
  description:
    "Elivique Carvings is the Los Angeles studio of carver Gus Elivique, making sculptural work cut by hand from single blocks of hardwood. Studio visits and commissions by appointment.",
  openGraph: {
    title: "Elivique Carvings — Hand-Carved Wood Sculpture, Los Angeles",
    description:
      "Sculptural carving from single blocks of hardwood. Los Angeles. Commissions by appointment.",
    url: "https://elivique-carvings.vercel.app",
    siteName: "Elivique Carvings",
    images: [
      {
        url: "/images/work/carving-01.jpeg",
        width: 1200,
        height: 630,
        alt: "Hand-carved hardwood sculpture",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elivique Carvings — Hand-Carved Wood Sculpture, Los Angeles",
    description: "Sculptural carving from single blocks of hardwood. Los Angeles.",
    images: ["/images/work/carving-01.jpeg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Elivique Carvings",
  description:
    "Wood carving studio making sculptural work from single blocks of hardwood.",
  image: "https://elivique-carvings.vercel.app/images/work/carving-01.jpeg",
  telephone: "+1-310-988-8522",
  founder: "Gus Elivique",
  areaServed: "Los Angeles",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Los Angeles",
    addressRegion: "CA",
    addressCountry: "US",
  },
  url: "https://elivique-carvings.vercel.app",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${marcellus.variable} ${sora.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
