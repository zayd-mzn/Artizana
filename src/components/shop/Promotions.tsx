import Link from "next/link";
import { Tag } from "lucide-react";
import { promotions } from "@/data/site";

export default function Promotions() {
  return (
    <section aria-labelledby="promos-title" className="bg-chaux py-20 text-manganese md:py-24">
      <div className="mx-auto max-w-[1500px] px-[var(--gutter)]">
        <p className="eyebrow mb-5 text-terre">Les bons plans du moment</p>
        <h2 id="promos-title" className="display mb-10 text-[clamp(2.4rem,5vw,5rem)]">
          Offres <em>en cours</em>
        </h2>
        <ul className="grid gap-6 md:grid-cols-2">
          {promotions.map((p) => (
            <li key={p.title} className="flex flex-col gap-4 rounded-[1.75rem] border border-terre/30 bg-terre/5 p-8 md:p-10">
              <Tag size={22} className="text-terre" />
              <h3 className="display text-4xl">{p.title}</h3>
              <p className="text-[var(--ink-soft)]">{p.text}</p>
              <Link href={p.href} className="btn btn-primary mt-2 self-start">
                {p.cta}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
