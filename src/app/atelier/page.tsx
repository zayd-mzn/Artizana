import type { Metadata } from "next";
import Atelier from "@/components/Atelier";
import CtaBanner from "@/components/shop/CtaBanner";

export const metadata: Metadata = {
  title: "L'Atelier — Composez votre zellige",
  description: "Choisissez un motif et ses couleurs, téléchargez votre zellige ou demandez un devis sur mesure.",
};

export default function AtelierPage() {
  return (
    <>
      <div className="h-20 bg-manganese" />
      <Atelier />
      <CtaBanner title="Un panneau sur mesure ?" text="Envoyez-nous votre composition et vos dimensions : le devis est gratuit et vous est envoyé sous 24 h." />
    </>
  );
}
