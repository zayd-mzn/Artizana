import { crafts } from "@/data/crafts";
import { starPoints, toPath } from "@/lib/zellige";

const STAR = toPath(starPoints(12, 12, 11, 0.55, -90));

export default function Marquee() {
  const items = crafts.flatMap((c) => [c.name, c.arabic]);
  const row = (
    <div className="flex shrink-0 items-center" aria-hidden="true">
      {items.map((t, i) => (
        <span key={i} className="flex items-center">
          <span className={i % 2 ? "arabic px-8 text-[clamp(2rem,4vw,3.4rem)] text-miel" : "display px-8 text-[clamp(2.4rem,5vw,4.4rem)] italic"}>
            {t}
          </span>
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-terre">
            <path d={STAR} fill="currentColor" />
          </svg>
        </span>
      ))}
    </div>
  );
  return (
    <section aria-label="Les métiers de l'artisanat marocain" className="overflow-hidden border-y border-manganese/10 bg-chaux py-6 text-manganese">
      <p className="sr-only">{crafts.map((c) => c.name).join(", ")}</p>
      <div className="marquee">
        {row}
        {row}
      </div>
    </section>
  );
}
