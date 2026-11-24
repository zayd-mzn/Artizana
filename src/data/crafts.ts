import type { ArtVariant } from "@/components/CraftArt";

export interface Craft {
  id: string;
  name: string;
  arabic: string;
  city: string;
  region: string;
  technique: string;
  description: string;
  fact: string;
  art: ArtVariant;
  tone: string; // panel background
  ink: string; // panel text colour
}

export const crafts: Craft[] = [
  {
    id: "zellige",
    name: "Zellige",
    arabic: "الزليج",
    city: "Fès",
    region: "Fès-Meknès",
    technique: "Taille au menqach",
    description:
      "Des carreaux d'argile émaillés, taillés pièce par pièce en étoiles, croix et amandes, puis assemblés face contre terre selon une géométrie à 8 et 16 branches.",
    fact: "Chaque angle est un multiple de 22,5°. Une erreur d'un millimètre se voit sur tout le panneau.",
    art: "zellige",
    tone: "#1D3B8B",
    ink: "#F4ECDF",
  },
  {
    id: "tapis",
    name: "Tapis",
    arabic: "الزربية",
    city: "Moyen & Haut Atlas",
    region: "Beni Ourain · Azilal",
    technique: "Nouage à la main",
    description:
      "Laine non teinte et losanges sombres chez les Beni Ourain, couleurs vives chez les Azilal, chutes de tissus recyclées dans le boucherouite. Des tapis tissés par des femmes, nœud après nœud.",
    fact: "Un même motif peut signifier protection dans un village et fertilité dans le suivant.",
    art: "tapis",
    tone: "#EBE0CF",
    ink: "#17120F",
  },
  {
    id: "poterie",
    name: "Poterie",
    arabic: "الفخار",
    city: "Safi · Tamegroute",
    region: "Atlantique · Vallée du Drâa",
    technique: "Tour & émail",
    description:
      "Le bleu cobalt de Fès, la polychromie de Safi, et le vert profond de Tamegroute, un émail apporté par des familles venues de Fès au XVIIᵉ siècle.",
    fact: "À Tamegroute, chaque pièce garde les coulures de son émail : il n'y en a pas deux pareilles.",
    art: "poterie",
    tone: "#17654F",
    ink: "#F4ECDF",
  },
  {
    id: "dinanderie",
    name: "Dinanderie",
    arabic: "النحاس",
    city: "Fès · Marrakech",
    region: "Médinas impériales",
    technique: "Martelage & ciselure",
    description:
      "Cuivre et laiton martelés, ciselés puis ajourés au poinçon. Les lanternes projettent leurs étoiles sur les murs quand la nuit tombe.",
    fact: "Un plateau ciselé peut demander plusieurs jours de frappe, motif par motif.",
    art: "dinanderie",
    tone: "#17120F",
    ink: "#E9C27A",
  },
  {
    id: "cuir",
    name: "Cuir",
    arabic: "الدباغة",
    city: "Chouara, Fès",
    region: "Médina de Fès",
    technique: "Tannage végétal",
    description:
      "Dans la plus grande tannerie de Fès, les peaux passent de cuve en cuve, entièrement à la main. Elles deviennent babouches, poufs et sacs.",
    fact: "Aucune machine moderne : tout le travail de Chouara se fait encore à la main.",
    art: "cuir",
    tone: "#B04A2B",
    ink: "#F4ECDF",
  },
  {
    id: "bijoux",
    name: "Bijoux",
    arabic: "الحلي",
    city: "Tiznit",
    region: "Souss",
    technique: "Argent & filigrane",
    description:
      "Tiznit, capitale de l'argent : fibules, bracelets et colliers d'ambre. Un savoir-faire transmis entre orfèvres juifs et apprentis amazighs.",
    fact: "La fibule triangulaire retenait le drapé du vêtement. Elle se portait par paires, reliées d'une chaîne.",
    art: "bijoux",
    tone: "#E6D6BC",
    ink: "#17120F",
  },
  {
    id: "bois",
    name: "Bois de cèdre",
    arabic: "خشب الأرز",
    city: "Fès · Meknès",
    region: "Cèdre de l'Atlas",
    technique: "Sculpture & zouaq",
    description:
      "Le cèdre de l'Atlas sculpté en entrelacs, puis peint (zouaq) pour les plafonds, portes et moucharabiehs des riads.",
    fact: "Le cèdre garde son parfum pendant des décennies. Les palais de Fès sentent encore le bois.",
    art: "bois",
    tone: "#4A2340",
    ink: "#F4ECDF",
  },
  {
    id: "tadelakt",
    name: "Tadelakt",
    arabic: "تادلاكت",
    city: "Marrakech",
    region: "Haouz",
    technique: "Chaux polie au galet",
    description:
      "Un enduit de chaux lissé au galet puis nourri au savon noir. La surface devient douce, imperméable et lumineuse.",
    fact: "Le tadelakt habillait les hammams : il résiste à l'eau sans un seul joint.",
    art: "tadelakt",
    tone: "#D6A243",
    ink: "#17120F",
  },
];
