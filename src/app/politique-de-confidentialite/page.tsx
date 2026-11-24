import type { Metadata } from "next";
import LegalPage from "@/components/shop/LegalPage";
import { shop } from "@/data/site";

export const metadata: Metadata = { title: "Politique de confidentialité" };

export default function Confidentialite() {
  return (
    <LegalPage
      title="Politique de confidentialité"
      updated="24 novembre 2026"
      sections={[
        [
          "Responsable du traitement",
          [`${shop.name}, ${shop.address}. Contact : ${shop.email}.`],
        ],
        [
          "Données collectées",
          [
            "Ce site n'enregistre aucune donnée sur ses serveurs. Le formulaire de contact et les boutons « Commander » ouvrent WhatsApp avec un message prérempli : c'est vous qui choisissez de l'envoyer.",
            "Lorsque vous nous écrivez, nous recevons votre nom, votre numéro de téléphone, votre email s'il est indiqué, et le contenu de votre message. Si vous vous inscrivez à la newsletter, nous recevons votre adresse email.",
          ],
        ],
        [
          "Utilisation des données",
          [
            "Vos données servent uniquement à répondre à vos demandes, à traiter vos commandes, à organiser la livraison et, si vous l'avez demandé, à vous envoyer la newsletter. Elles ne sont ni vendues ni cédées à des tiers.",
          ],
        ],
        [
          "Durée de conservation",
          ["Les échanges liés à une commande sont conservés [durée] pour le suivi et la garantie. Vous pouvez vous désinscrire de la newsletter à tout moment."],
        ],
        [
          "Services tiers",
          [
            "WhatsApp (Meta) traite les messages que vous nous envoyez selon sa propre politique de confidentialité. La page Contact affiche une carte OpenStreetMap, chargée depuis openstreetmap.org.",
          ],
        ],
        [
          "Vos droits",
          [
            "Conformément à la loi n° 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel, vous disposez d'un droit d'accès, de rectification et d'opposition. Pour l'exercer, écrivez-nous à " + shop.email + ".",
            "Ce traitement a fait l'objet d'une déclaration auprès de la CNDP sous le numéro [numéro].",
          ],
        ],
        ["Cookies", ["Ce site n'utilise pas de cookies de suivi ni de publicité."]],
      ]}
    />
  );
}
