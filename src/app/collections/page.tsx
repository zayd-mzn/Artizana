import type { Metadata } from "next";
import PageHeader from "@/components/shop/PageHeader";
import CategoryGrid from "@/components/shop/CategoryGrid";
import CategoryNav from "@/components/shop/CategoryNav";
import ProductBrowser from "@/components/shop/ProductBrowser";
import CtaBanner from "@/components/shop/CtaBanner";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Collections",
  description: "Djellabas, tapis berbères, poteries, zellige, objets de maison et bijoux en argent, faits à la main au Maroc.",
};

export default function CollectionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Collections"
        title={<>Toute la <em className="text-miel">collection</em></>}
        intro="Nos pièces sont rangées par métier. Choisissez une catégorie, ou parcourez tout et triez par prix."
        crumbs={[{ label: "Collections" }]}
      />
      <section className="bg-chaux-deep py-16 text-manganese md:py-24">
        <div className="mx-auto max-w-[1500px] px-[var(--gutter)]">
          <h2 className="display mb-10 text-[clamp(2rem,4vw,3.5rem)]">Par catégorie</h2>
          <CategoryGrid />
        </div>
      </section>
      <section className="bg-chaux py-16 text-manganese md:py-24">
        <div className="mx-auto max-w-[1500px] px-[var(--gutter)]">
          <h2 className="display mb-10 text-[clamp(2rem,4vw,3.5rem)]">Toutes les pièces</h2>
          <CategoryNav active="tous" />
          <ProductBrowser products={products} />
          <p className="mt-16 text-center text-sm text-[var(--ink-soft)]">
            Prix en dirhams marocains (MAD), toutes taxes comprises (TTC). Livraison dans tout le Maroc.
          </p>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
