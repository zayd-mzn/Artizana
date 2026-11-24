import type { Metadata } from "next";
import { Playfair_Display, Nunito } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Artizana — L'artisanat marocain authentique",
  description:
    "Découvrez notre collection de produits artisanaux marocains : djellabas, tapis berbères, poteries et bijoux faits à la main par des artisans passionnés.",
  keywords: "artisanat marocain, djellaba, tapis berbère, poterie, bijoux, Maroc",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${playfair.variable} ${nunito.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
