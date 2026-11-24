import type { Category } from "./products";

/**
 * Shop facts used across the site. Everything marked « À confirmer » is a placeholder
 * that the shop must check before launch (address, policies, offers).
 */
export const shop = {
  name: "Artizana",
  phone: "+212 6 19 11 60 30", // same number as src/lib/whatsapp.ts
  email: "contact@artizana.ma", // À confirmer
  address: "Médina de Fès, Fès 30110, Maroc", // À confirmer : street address
  hours: "Lun – Sam · 9h00 – 20h00",
  /** map pin for the shop (Fès el-Bali); replace with the exact location */
  geo: { lat: 34.0617, lng: -4.9777 },
  social: {
    instagram: "https://www.instagram.com/", // À confirmer : shop account
    facebook: "https://www.facebook.com/", // À confirmer : shop account
  },
};

export const mapEmbed = `https://www.openstreetmap.org/export/embed.html?bbox=${shop.geo.lng - 0.012},${shop.geo.lat - 0.007},${shop.geo.lng + 0.012},${shop.geo.lat + 0.007}&layer=mapnik&marker=${shop.geo.lat},${shop.geo.lng}`;
export const directionsLink = `https://www.google.com/maps/dir/?api=1&destination=${shop.geo.lat},${shop.geo.lng}`;

/** Immediate reassurance shown under the hero. À confirmer. */
export const reassurance = [
  { title: "Fait main au Maroc", text: "Chaque pièce vient directement d'un atelier de maâlem." },
  { title: "Livraison partout au Maroc", text: "Expédition sous 48 à 72 h, suivi par message." },
  { title: "Paiement à la livraison", text: "Vous payez à réception, en espèces ou par carte." },
  { title: "Photos avant commande", text: "Nous vous envoyons la pièce exacte avant l'achat." },
];

/** « Les bons plans du moment ». À confirmer avec la boutique avant publication. */
export const promotions = [
  {
    title: "Livraison offerte dès 1 000 MAD",
    text: "Sur toute la collection, partout au Maroc.",
    href: "/collections",
    cta: "Voir la collection",
  },
  {
    title: "Zellige sur mesure : devis gratuit",
    text: "Composez votre panneau dans l'Atelier et recevez un devis sous 24 h.",
    href: "/atelier",
    cta: "Composer mon zellige",
  },
];

export interface Testimonial {
  quote: string;
  author: string;
  city: string;
}

/**
 * Example reviews, shown with an « avis d'exemple » label.
 * Replace them with real customer reviews before launch.
 */
export const testimonials: Testimonial[] = [
  { quote: "Le tapis Beni Ourain est encore plus beau qu'en photo. Livré en trois jours à Casablanca.", author: "Salma", city: "Casablanca" },
  { quote: "On m'a envoyé des photos de trois tagines pour que je choisisse le mien. Service très attentionné.", author: "Youssef", city: "Rabat" },
  { quote: "Notre table en zellige a été faite exactement aux dimensions demandées. Un vrai travail de maâlem.", author: "Khadija", city: "Marrakech" },
];

/** Example reviews for product pages, by category. Same rule: replace with real reviews. */
export const productReviews: Record<Exclude<Category, "tous">, (Testimonial & { rating: number })[]> = {
  djellaba: [
    { quote: "Tissu de qualité et broderies très fines. La taille correspond au guide.", author: "Omar", city: "Tanger", rating: 5 },
    { quote: "Belle djellaba, reçue rapidement. Les manches étaient un peu longues, retouche facile.", author: "Nadia", city: "Agadir", rating: 4 },
  ],
  tapis: [
    { quote: "La laine est épaisse et douce. Il a changé tout notre salon.", author: "Salma", city: "Casablanca", rating: 5 },
    { quote: "Exactement la pièce montrée en photo sur WhatsApp. Emballage soigné.", author: "Karim", city: "Fès", rating: 5 },
  ],
  poterie: [
    { quote: "Les couleurs sont magnifiques et chaque pièce est différente.", author: "Youssef", city: "Rabat", rating: 5 },
    { quote: "Bien emballé, rien de cassé. Je recommanderai.", author: "Imane", city: "Oujda", rating: 4 },
  ],
  zellige: [
    { quote: "Un travail précis, aux dimensions demandées. Le devis était clair.", author: "Khadija", city: "Marrakech", rating: 5 },
  ],
  maison: [
    { quote: "La lanterne projette des étoiles partout dans la pièce. Superbe.", author: "Hicham", city: "Meknès", rating: 5 },
    { quote: "Beau cadeau, très bien présenté.", author: "Leila", city: "Kénitra", rating: 4 },
  ],
  bijoux: [
    { quote: "Argent de belle qualité, les gravures sont fines.", author: "Meryem", city: "Tétouan", rating: 5 },
  ],
};

export const faq: { topic: string; items: { q: string; a: string }[] }[] = [
  {
    topic: "Commande et paiement",
    items: [
      {
        q: "Comment passer commande ?",
        a: "Choisissez une pièce et cliquez sur « Commander via WhatsApp ». Nous vous envoyons des photos de la pièce disponible, le prix exact et le délai, puis nous confirmons la commande avec vous.",
      },
      {
        q: "Quels moyens de paiement acceptez-vous ?",
        a: "Le paiement se fait à la livraison, en espèces ou par carte selon le transporteur. Pour les pièces sur mesure, un acompte est demandé au lancement de la fabrication.",
      },
      {
        q: "Le paiement est-il sécurisé ?",
        a: "Aucune donnée bancaire n'est saisie sur ce site. Vous ne payez qu'à réception, après avoir vu la pièce.",
      },
      {
        q: "Les prix sont-ils TTC ?",
        a: "Oui, tous les prix affichés sont en dirhams marocains (MAD), toutes taxes comprises. Ils varient selon la taille et les finitions de chaque pièce.",
      },
    ],
  },
  {
    topic: "Livraison",
    items: [
      {
        q: "Livrez-vous partout au Maroc ?",
        a: "Oui. Les commandes partent sous 48 à 72 h et vous recevez le suivi par message. La livraison est offerte dès 1 000 MAD d'achat.",
      },
      {
        q: "Livrez-vous à l'étranger ?",
        a: "Oui, sur demande. Écrivez-nous avec votre pays et la pièce choisie : nous vous indiquerons le tarif et le délai d'expédition.",
      },
      {
        q: "Combien de temps pour une pièce sur mesure ?",
        a: "Comptez deux à six semaines selon la pièce. Le délai exact figure sur le devis.",
      },
    ],
  },
  {
    topic: "Retours et garantie",
    items: [
      {
        q: "Puis-je retourner une pièce ?",
        a: "Vous disposez de 7 jours après réception pour nous retourner une pièce de la collection, dans son état d'origine. Les pièces sur mesure ne sont ni reprises ni échangées.",
      },
      {
        q: "Que faire si ma pièce arrive abîmée ?",
        a: "Envoyez-nous une photo par WhatsApp dans les 48 h suivant la livraison. Nous remplaçons la pièce ou vous remboursons.",
      },
      {
        q: "Pourquoi ma pièce diffère-t-elle un peu de la photo ?",
        a: "Chaque pièce est faite à la main : couleurs, dimensions et motifs varient légèrement. C'est pourquoi nous vous envoyons une photo de la pièce exacte avant toute commande.",
      },
    ],
  },
];
