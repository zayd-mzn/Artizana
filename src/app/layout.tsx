import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope, Noto_Sans_Tifinagh, Amiri } from "next/font/google";
import "./globals.css";

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const tifinagh = Noto_Sans_Tifinagh({
  variable: "--font-tifinagh",
  weight: "400",
  subsets: ["tifinagh"],
  display: "swap",
});

const amiri = Amiri({
  variable: "--font-amiri",
  weight: ["400", "700"],
  subsets: ["arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Artizana — L'artisanat marocain authentique",
  description:
    "Zellige de Fès, tapis de l'Atlas, poteries de Safi et de Tamegroute, argent de Tiznit : des pièces faites à la main par plus de cinquante maâlems marocains. Composez votre propre zellige en ligne.",
  keywords: [
    "artisanat marocain",
    "zellige",
    "zellige de Fès",
    "tapis berbère",
    "Beni Ourain",
    "poterie de Safi",
    "Tamegroute",
    "bijoux de Tiznit",
    "djellaba",
    "dinanderie",
    "Maroc",
  ],
  icons: { icon: "/brand/artizana-favicon.svg" },
  openGraph: {
    title: "Artizana — L'âme des mains marocaines",
    description: "Pièces faites à la main par des maâlems marocains, et un atelier pour composer votre zellige.",
    images: [{ url: "/brand/artizana-og.png", width: 1200, height: 630 }],
    locale: "fr_MA",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#17120F",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${instrument.variable} ${manrope.variable} ${tifinagh.variable} ${amiri.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
