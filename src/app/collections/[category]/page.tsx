import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/shop/PageHeader";
import CategoryNav from "@/components/shop/CategoryNav";
import ProductBrowser from "@/components/shop/ProductBrowser";
import CtaBanner from "@/components/shop/CtaBanner";
import { products, shopCategories } from "@/data/products";

export function generateStaticParams() {
  return shopCategories.map((c) => ({ category: c.id }));
}

const findCategory = (id: string) => shopCategories.find((c) => c.id === id);

export async function generateMetadata({ params }: PageProps<"/collections/[category]">): Promise<Metadata> {
  const c = findCategory((await params).category);
  if (!c) return {};
  return {
    title: `${c.label} artisanal`,
    description: `${c.label} fait main au Maroc : ${products
      .filter((p) => p.category === c.id)
      .map((p) => p.name)
      .join(", ")}.`,
  };
}

export default async function CategoryPage({ params }: PageProps<"/collections/[category]">) {
  const c = findCategory((await params).category);
  if (!c) notFound();
  const items = products.filter((p) => p.category === c.id);

  return (
    <>
      <PageHeader
        eyebrow={`Collection · ${c.arabic}`}
        title={c.label}
        intro={`${items.length} pièce${items.length > 1 ? "s" : ""} faite${items.length > 1 ? "s" : ""} à la main, choisie${items.length > 1 ? "s" : ""} dans les ateliers de ${[...new Set(items.map((p) => p.origin))].join(", ")}.`}
        crumbs={[{ label: "Collections", href: "/collections" }, { label: c.label }]}
      />
      <section className="bg-chaux py-16 text-manganese md:py-24">
        <div className="mx-auto max-w-[1500px] px-[var(--gutter)]">
          <CategoryNav active={c.id} />
          <ProductBrowser products={items} />
          <p className="mt-16 text-center text-sm text-[var(--ink-soft)]">
            Prix en dirhams marocains (MAD), toutes taxes comprises (TTC).
          </p>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
