"use client";

import { useState } from "react";
import type { Product } from "@/data/products";
import ProductCard from "./ProductCard";

const SORTS = {
  default: { label: "Sélection", fn: (a: Product, b: Product) => a.id - b.id },
  "price-asc": { label: "Prix croissant", fn: (a: Product, b: Product) => a.priceFrom - b.priceFrom },
  "price-desc": { label: "Prix décroissant", fn: (a: Product, b: Product) => b.priceFrom - a.priceFrom },
  name: { label: "Nom (A → Z)", fn: (a: Product, b: Product) => a.name.localeCompare(b.name, "fr") },
} as const;
type SortKey = keyof typeof SORTS;

/** Product grid with a subcategory filter and a sort menu. */
export default function ProductBrowser({ products }: { products: Product[] }) {
  const [sub, setSub] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("default");
  const subs = [...new Set(products.map((p) => p.subcategory))];
  const shown = products.filter((p) => sub === "all" || p.subcategory === sub).sort(SORTS[sort].fn);

  const chip = (active: boolean) =>
    `rounded-full border px-4 py-2 text-sm font-semibold ${
      active ? "border-manganese bg-manganese text-chaux" : "border-manganese/20 hover:border-manganese"
    }`;

  return (
    <>
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        {subs.length > 1 ? (
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer par type">
            <button type="button" className={chip(sub === "all")} aria-pressed={sub === "all"} onClick={() => setSub("all")}>
              Tout
            </button>
            {subs.map((s) => (
              <button key={s} type="button" className={chip(sub === s)} aria-pressed={sub === s} onClick={() => setSub(s)}>
                {s}
              </button>
            ))}
          </div>
        ) : (
          <span />
        )}
        <label className="flex items-center gap-3 text-sm">
          <span className="text-[var(--ink-soft)]">Trier par</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-full border border-manganese/20 bg-chaux px-4 py-2 font-semibold"
          >
            {Object.entries(SORTS).map(([k, v]) => (
              <option key={k} value={k}>
                {v.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p className="mb-8 text-sm text-[var(--ink-soft)]" aria-live="polite">
        {shown.length} pièce{shown.length > 1 ? "s" : ""}
      </p>
      <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {shown.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}
