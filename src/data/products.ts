export type Category = "tous" | "djellaba" | "tapis" | "poterie" | "bijoux";

export interface Product {
  id: number;
  name: string;
  category: Exclude<Category, "tous">;
  priceFrom: number;
  priceTo: number;
  description: string;
  gradient: string;
  badge?: string;
}

export const categories: { id: Category; label: string; icon: string }[] = [
  { id: "tous", label: "Tous", icon: "✦" },
  { id: "djellaba", label: "Djellaba", icon: "👘" },
  { id: "tapis", label: "Tapis", icon: "🪞" },
  { id: "poterie", label: "Poterie", icon: "🏺" },
  { id: "bijoux", label: "Bijoux", icon: "💎" },
];

export const products: Product[] = [
  {
    id: 1,
    name: "Djellaba Homme Traditionnelle",
    category: "djellaba",
    priceFrom: 350,
    priceTo: 650,
    description: "Djellaba en laine pure, broderie à la main, capuche classique.",
    gradient: "linear-gradient(135deg, #C4603B 0%, #9C3D1A 50%, #5C3317 100%)",
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Djellaba Femme Brodée",
    category: "djellaba",
    priceFrom: 450,
    priceTo: 900,
    description: "Djellaba en coton fin avec broderies florales dorées.",
    gradient: "linear-gradient(135deg, #E0B547 0%, #C9962A 50%, #9A6E10 100%)",
    badge: "Nouveau",
  },
  {
    id: 3,
    name: "Djellaba Enfant",
    category: "djellaba",
    priceFrom: 200,
    priceTo: 380,
    description: "Djellaba confortable pour enfant, coton doux, couleurs vives.",
    gradient: "linear-gradient(135deg, #D97B55 0%, #C4603B 60%, #7A1515 100%)",
  },
  {
    id: 4,
    name: "Tapis Beni Ourain",
    category: "tapis",
    priceFrom: 800,
    priceTo: 2800,
    description: "Tapis authentique en laine pure des tribus Beni Ourain, motifs géométriques.",
    gradient: "linear-gradient(135deg, #F0D49A 0%, #C9962A 50%, #5C3317 100%)",
    badge: "Authentique",
  },
  {
    id: 5,
    name: "Tapis Kilim Berbère",
    category: "tapis",
    priceFrom: 600,
    priceTo: 1800,
    description: "Kilim tissé à plat, motifs berbères traditionnels multicolores.",
    gradient: "linear-gradient(135deg, #7A1515 0%, #C4603B 50%, #E0B547 100%)",
    badge: "Fait main",
  },
  {
    id: 6,
    name: "Tapis Azilal",
    category: "tapis",
    priceFrom: 700,
    priceTo: 2200,
    description: "Tapis Azilal de l'Atlas, laine naturelle, designs uniques.",
    gradient: "linear-gradient(135deg, #1A4D6E 0%, #C4603B 60%, #9C3D1A 100%)",
  },
  {
    id: 7,
    name: "Tagine en Céramique",
    category: "poterie",
    priceFrom: 150,
    priceTo: 350,
    description: "Tagine peint à la main, argile de Fès, motifs zellige.",
    gradient: "linear-gradient(135deg, #1A4D6E 0%, #2C6B9A 50%, #F0D49A 100%)",
    badge: "Artisanal",
  },
  {
    id: 8,
    name: "Vase Zellige Traditionnel",
    category: "poterie",
    priceFrom: 200,
    priceTo: 550,
    description: "Vase en céramique émaillée, motifs zellige colorés.",
    gradient: "linear-gradient(135deg, #2C6B9A 0%, #1A4D6E 50%, #9C3D1A 100%)",
  },
  {
    id: 9,
    name: "Service à Thé Marocain",
    category: "poterie",
    priceFrom: 300,
    priceTo: 700,
    description: "Service complet : théière, verres, plateau en cuivre ciselé.",
    gradient: "linear-gradient(135deg, #C9962A 0%, #9A6E10 50%, #2C1A0E 100%)",
    badge: "Coffret",
  },
  {
    id: 10,
    name: "Bracelet Berbère Argent",
    category: "bijoux",
    priceFrom: 150,
    priceTo: 450,
    description: "Bracelet en argent massif, gravures berbères, pierres naturelles.",
    gradient: "linear-gradient(135deg, #C9C9C9 0%, #9A9A9A 40%, #C9962A 100%)",
    badge: "Argent 925",
  },
  {
    id: 11,
    name: "Collier Ambre Traditionnel",
    category: "bijoux",
    priceFrom: 200,
    priceTo: 650,
    description: "Collier en ambre naturel du Maroc, perles gravées à la main.",
    gradient: "linear-gradient(135deg, #E8A020 0%, #C4603B 50%, #7A1515 100%)",
    badge: "Naturel",
  },
  {
    id: 12,
    name: "Boucles d'Oreilles Filigrane",
    category: "bijoux",
    priceFrom: 100,
    priceTo: 320,
    description: "Boucles d'oreilles en filigrane d'argent, travail de dentelle traditionnel.",
    gradient: "linear-gradient(135deg, #E0E0E0 0%, #C9962A 60%, #9A6E10 100%)",
  },
];
