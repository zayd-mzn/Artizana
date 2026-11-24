import Link from "next/link";
import { shopCategories, type Category } from "@/data/products";

/** Links between category pages (Tout + one per category). */
export default function CategoryNav({ active }: { active: Category }) {
  const items = [{ id: "tous" as Category, label: "Tout", href: "/collections" }, ...shopCategories.map((c) => ({ id: c.id, label: c.label, href: `/collections/${c.id}` }))];
  return (
    <nav aria-label="Catégories" className="no-scrollbar -mx-[var(--gutter)] mb-10 flex gap-2 overflow-x-auto border-b border-manganese/10 px-[var(--gutter)] pb-6">
      {items.map((c) => (
        <Link
          key={c.id}
          href={c.href}
          aria-current={active === c.id ? "page" : undefined}
          className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold ${
            active === c.id ? "bg-terre text-chaux" : "bg-manganese/5 hover:bg-manganese/10"
          }`}
        >
          {c.label}
        </Link>
      ))}
    </nav>
  );
}
