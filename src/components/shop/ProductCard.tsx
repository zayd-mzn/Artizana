import Link from "next/link";
import type { Product } from "@/data/products";
import CraftArt from "../CraftArt";
import { mad } from "./format";

export default function ProductCard({ product: p }: { product: Product }) {
  return (
    <article className="group flex flex-col">
      <Link href={`/produits/${p.slug}`} className="flex flex-col">
        <div className="relative aspect-[4/5] w-full overflow-hidden arch-css bg-manganese/5">
          <CraftArt variant={p.art} colors={p.colors} seed={p.id} title={p.name} className="h-full w-full" />
          {p.badge && (
            <span className="absolute bottom-4 left-4 rounded-full bg-chaux/90 px-3 py-1 text-xs font-semibold text-manganese">
              {p.badge}
            </span>
          )}
        </div>
        <p className="eyebrow mt-5 text-[0.62rem] text-[var(--ink-soft)]">
          {p.subcategory} · {p.origin}
        </p>
        <h3 className="mt-1.5 font-display text-2xl leading-tight group-hover:text-terre">{p.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{p.description}</p>
        <p className="mt-3 text-sm font-semibold">
          {mad(p.priceFrom)} – {mad(p.priceTo)} MAD <span className="font-normal text-[var(--ink-soft)]">TTC</span>
        </p>
        <span className="mt-3 text-sm font-semibold text-terre underline-offset-4 group-hover:underline">
          Voir le produit →
        </span>
      </Link>
    </article>
  );
}
