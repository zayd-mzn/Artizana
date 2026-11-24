import { Star } from "lucide-react";
import type { Testimonial } from "@/data/site";

export function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5 text-miel" role="img" aria-label={`${rating} sur 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={14} fill={i < rating ? "currentColor" : "none"} />
      ))}
    </span>
  );
}

export default function Testimonials({
  items,
  title = "Ils nous font confiance",
  eyebrow = "Témoignages",
}: {
  items: (Testimonial & { rating?: number })[];
  title?: string;
  eyebrow?: string;
}) {
  return (
    <section className="bg-chaux-deep py-20 text-manganese md:py-28">
      <div className="mx-auto max-w-[1500px] px-[var(--gutter)]">
        <p className="eyebrow mb-5 text-terre">{eyebrow}</p>
        <h2 className="display mb-12 text-[clamp(2.4rem,5vw,5rem)]">{title}</h2>
        <ul className="grid gap-6 md:grid-cols-3">
          {items.map((t) => (
            <li key={t.author + t.quote} className="flex flex-col gap-5 rounded-[1.5rem] bg-chaux p-8">
              {t.rating && <Stars rating={t.rating} />}
              <blockquote className="font-display text-2xl leading-snug">« {t.quote} »</blockquote>
              <p className="mt-auto text-sm text-[var(--ink-soft)]">
                {t.author}, {t.city} <span className="opacity-70">(avis d&apos;exemple)</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
