import type { ArtVariant } from "@/components/CraftArt";

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  readingMinutes: number;
  art: ArtVariant;
  colors: [string, string];
  /** paragraphs; a line starting with "## " is a subheading */
  body: string[];
  /** product slugs suggested at the end of the article */
  related: string[];
}

export const posts: Post[] = [
  {
    slug: "reconnaitre-un-vrai-zellige",
    title: "Comment reconnaître un vrai zellige de Fès",
    excerpt: "Carreaux taillés à la main ou carrelage imprimé ? Quatre signes qui ne trompent pas.",
    date: "2026-10-12",
    readingMinutes: 4,
    art: "zellige",
    colors: ["#1D3B8B", "#D6A243"],
    body: [
      "Le zellige est une mosaïque d'argile émaillée, taillée pièce par pièce au marteau, le menqach. On en trouve aujourd'hui beaucoup d'imitations. Voici comment faire la différence.",
      "## La surface n'est jamais parfaitement plane",
      "Chaque carreau est émaillé puis cuit au four traditionnel. L'émail forme de légères vagues et de petits points. Une surface lisse et uniforme indique souvent un carreau industriel.",
      "## Les couleurs varient d'une pièce à l'autre",
      "Sur un même panneau, deux tesselles bleues n'ont jamais exactement le même ton. Cette variation donne au zellige sa profondeur.",
      "## Les bords sont taillés en biseau",
      "Retournez une pièce : le maâlem la taille en biais, pour que le ciment la tienne par-dessous. Un bord droit et net signale une découpe à la machine.",
      "## Le motif part d'une étoile",
      "Un vrai panneau de Fès se construit à partir d'une étoile centrale, la ras al-shabaka, et grandit par symétrie. Les motifs imprimés se répètent sans centre.",
    ],
    related: ["panneau-khatam", "table-en-zellige"],
  },
  {
    slug: "entretenir-un-tapis-berbere",
    title: "Entretenir un tapis berbère en laine",
    excerpt: "Les gestes simples qui gardent un Beni Ourain ou un Azilal beau pendant des décennies.",
    date: "2026-09-28",
    readingMinutes: 3,
    art: "tapis",
    colors: ["#F4ECDF", "#17120F"],
    body: [
      "Un tapis noué à la main est fait pour durer plusieurs générations. Quelques habitudes suffisent pour le garder en bon état.",
      "## Aspirer sans brosse rotative",
      "Passez l'aspirateur une fois par semaine, embout plat, dans le sens des poils. La brosse rotative arrache les nœuds de laine.",
      "## Traiter les taches tout de suite",
      "Épongez avec un chiffon blanc et de l'eau froide, sans frotter. Évitez les détachants chimiques, qui décolorent la laine naturelle.",
      "## Le retourner deux fois par an",
      "Tournez le tapis d'un demi-tour pour qu'il s'use de façon égale et que la lumière ne le décolore pas d'un seul côté.",
      "## Un nettoyage complet tous les deux ou trois ans",
      "Confiez-le à un professionnel du tapis fait main. Au Maroc, on le lave encore à l'eau et au savon noir, puis on le sèche au soleil.",
    ],
    related: ["tapis-beni-ourain", "tapis-azilal", "tapis-kilim-berbere"],
  },
  {
    slug: "argent-de-tiznit",
    title: "L'argent de Tiznit, des bijoux qui racontent une région",
    excerpt: "Fibules, bracelets et colliers : ce que signifient les bijoux amazighs du Souss.",
    date: "2026-09-02",
    readingMinutes: 5,
    art: "bijoux",
    colors: ["#C9C4BA", "#17654F"],
    body: [
      "Tiznit, au sud d'Agadir, est la capitale marocaine du bijou en argent. Ses orfèvres travaillent encore selon les gestes de leurs grands-parents.",
      "## La fibule, bijou et outil",
      "La tizerzai, fibule triangulaire, servait à fermer le drapé des vêtements. Sa taille et son décor indiquaient la région et le statut de la femme qui la portait.",
      "## Pourquoi l'argent plutôt que l'or",
      "Dans la tradition amazighe, l'argent est associé à la pureté. L'or était réservé aux villes. Les bijoux en argent se transmettent de mère en fille.",
      "## Reconnaître un travail fait main",
      "Regardez les gravures de près : elles sont légèrement irrégulières. L'émail et le filigrane sont posés à la main, pièce par pièce.",
    ],
    related: ["fibule-de-tiznit", "bracelet-berbere-argent", "collier-ambre-traditionnel"],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("fr-MA", { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));
