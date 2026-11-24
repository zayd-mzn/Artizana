import type { Metadata } from "next";
import PageHeader from "@/components/shop/PageHeader";
import Metiers from "@/components/Metiers";
import Geste from "@/components/Geste";
import Testimonials from "@/components/shop/Testimonials";
import CtaBanner from "@/components/shop/CtaBanner";
import { testimonials } from "@/data/site";

export const metadata: Metadata = {
  title: "À propos — Qui sommes-nous ?",
  description: "L'histoire d'Artizana, nos valeurs et notre façon de travailler avec les maâlems marocains.",
};

const values = [
  { title: "Authenticité", text: "Nous ne vendons que des pièces faites à la main, dans des ateliers que nous avons visités." },
  { title: "Juste prix", text: "Le maâlem fixe son prix et il est payé dès la commande, pas à la vente." },
  { title: "Transparence", text: "Vous voyez la pièce exacte en photo avant de l'acheter. Pas de surprise à la livraison." },
  { title: "Transmission", text: "Une partie de chaque vente finance la formation d'apprentis dans les ateliers partenaires." },
];

const actions = [
  ["50+", "maâlems partenaires"],
  ["8", "métiers représentés"],
  ["12", "apprentis formés depuis 2023"],
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Qui sommes-nous ?"
        title={<>Une famille de Fès, <em className="text-miel">cinquante ateliers</em></>}
        crumbs={[{ label: "À propos" }]}
      />

      <section className="bg-chaux py-20 text-manganese md:py-28">
        <div className="mx-auto grid max-w-[1500px] gap-12 px-[var(--gutter)] lg:grid-cols-12">
          <p className="eyebrow text-terre lg:col-span-3">Notre histoire</p>
          <div className="space-y-6 text-lg leading-relaxed text-[var(--ink-soft)] lg:col-span-8">
            <p className="font-display text-3xl leading-snug text-manganese md:text-4xl">
              Tout a commencé dans l&apos;atelier de zellige de notre grand-père, à deux rues de la
              medersa Bou Inania.
            </p>
            <p>
              Enfants, nous le regardions tailler les tesselles au menqach, une par une, pendant des
              heures. Nous avons aussi vu les ateliers voisins fermer : les clients achetaient du
              carrelage imprimé, moins cher, et les jeunes ne voulaient plus apprendre un métier qui ne
              payait pas.
            </p>
            <p>
              Artizana est née en 2021 de cette idée simple : si les maâlems peuvent vendre directement,
              au juste prix, à des clients qui comprennent la valeur de leur travail, leurs métiers
              continueront. Nous sommes partis du zellige, puis les tisserandes de l&apos;Atlas, les
              potiers de Safi et les orfèvres de Tiznit nous ont rejoints.
            </p>
            <p>
              Aujourd&apos;hui, nous travaillons avec plus de cinquante ateliers. Nous les connaissons
              tous par leur nom, et chaque pièce que nous vendons arrive avec celui de la personne qui
              l&apos;a faite.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-chaux-deep py-20 text-manganese md:py-28">
        <div className="mx-auto max-w-[1500px] px-[var(--gutter)]">
          <p className="eyebrow mb-5 text-terre">Nos valeurs</p>
          <h2 className="display mb-12 text-[clamp(2.4rem,5vw,5rem)]">Ce qui nous guide</h2>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <li key={v.title} className="rounded-[1.5rem] bg-chaux p-7">
                <h3 className="display text-3xl">{v.title}</h3>
                <p className="mt-3 text-[var(--ink-soft)]">{v.text}</p>
              </li>
            ))}
          </ul>
          <h2 className="display mb-8 mt-20 text-[clamp(2rem,4vw,3.5rem)]">Nos actions</h2>
          <dl className="grid gap-px overflow-hidden rounded-[1.5rem] bg-manganese/10 sm:grid-cols-3">
            {actions.map(([n, l]) => (
              <div key={l} className="bg-chaux p-8">
                <dd className="display text-6xl text-terre">{n}</dd>
                <dt className="eyebrow mt-3 text-[var(--ink-soft)]">{l}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Metiers />
      <Geste />
      <Testimonials items={testimonials} />
      <CtaBanner />
    </>
  );
}
