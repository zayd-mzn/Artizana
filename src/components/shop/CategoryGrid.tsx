import Link from "next/link";
import { products, shopCategories } from "@/data/products";
import CraftArt from "../CraftArt";

/** One tile per category, with its subcategories listed underneath. */
export default function CategoryGrid() {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {shopCategories.map((c) => {
        const items = products.filter((p) => p.category === c.id);
        const subs = [...new Set(items.map((p) => p.subcategory))];
        const cover = items[0];
        return (
          <li key={c.id}>
            <Link href={`/collections/${c.id}`} className="group block overflow-hidden rounded-[1.75rem] bg-chaux">
              <div className="relative aspect-[16/10] overflow-hidden">
                <CraftArt variant={cover.art} colors={cover.colors} seed={cover.id + 40} title={c.label} className="h-full w-full" />
              </div>
              <div className="p-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="display text-4xl group-hover:text-terre">{c.label}</h3>
                  <span className="arabic text-2xl text-[var(--ink-soft)]">{c.arabic}</span>
                </div>
                <p className="mt-3 text-sm text-[var(--ink-soft)]">{subs.join(" · ")}</p>
                <p className="mt-4 text-sm font-semibold text-terre">
                  {items.length} pièce{items.length > 1 ? "s" : ""} →
                </p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
