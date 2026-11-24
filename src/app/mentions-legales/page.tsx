import type { Metadata } from "next";
import LegalPage from "@/components/shop/LegalPage";
import { shop } from "@/data/site";

export const metadata: Metadata = { title: "Mentions légales" };

export default function MentionsLegales() {
  return (
    <LegalPage
      title="Mentions légales"
      updated="24 novembre 2026"
      sections={[
        [
          "Éditeur du site",
          [
            `${shop.name}, [forme juridique] au capital de [montant] MAD.`,
            `Siège social : ${shop.address}.`,
            "Registre de commerce (RC) : [numéro] · Identifiant fiscal (IF) : [numéro] · ICE : [numéro] · Patente : [numéro].",
            `Téléphone : ${shop.phone} · Email : ${shop.email}.`,
            "Directeur de la publication : [nom et prénom].",
          ],
        ],
        ["Hébergement", ["Le site est hébergé par [nom de l'hébergeur], [adresse de l'hébergeur], [site web de l'hébergeur]."]],
        [
          "Propriété intellectuelle",
          [
            "Le logo « Bab ez-Zellige », les illustrations, les textes et la structure de ce site sont la propriété d'Artizana. Toute reproduction sans autorisation écrite est interdite.",
          ],
        ],
        [
          "Prix et commandes",
          [
            "Les prix sont affichés en dirhams marocains (MAD), toutes taxes comprises. Ils sont donnés à titre indicatif, sous forme de fourchette, car chaque pièce est unique. Le prix définitif est confirmé par écrit avant la commande.",
            "Conformément à la loi n° 31-08 édictant des mesures de protection du consommateur, vous disposez d'un délai de 7 jours après la livraison pour exercer votre droit de rétractation, sauf pour les pièces fabriquées sur mesure.",
          ],
        ],
        ["Responsabilité", ["Artizana s'efforce de fournir des informations exactes, mais ne peut garantir l'absence d'erreurs. Les illustrations des produits ne sont pas contractuelles."]],
      ]}
    />
  );
}
