import { crafts } from "@/data/crafts";
import CraftArt from "./CraftArt";

/** Les Métiers: eight crafts in a swipeable row. */
export default function Metiers() {
  return (
    <section id="metiers" className="relative overflow-hidden bg-chaux text-manganese">
      <div className="flex flex-col">
        {/* intro panel */}
        <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-10 px-[var(--gutter)] pb-12 pt-24 lg:pt-28">
          <p className="eyebrow text-terre">01 — Les Métiers</p>
          <div>
            <h2 className="display text-[clamp(3rem,6.5vw,7rem)]">
              Huit gestes,
              <br />
              <em>mille ans</em> de mains
            </h2>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-[var(--ink-soft)]">
              Du zellige de Fès à l&apos;argent de Tiznit, chaque métier a sa ville, ses outils et
              ses familles de maâlems. Voici ceux avec qui nous travaillons.
            </p>
          </div>
        </div>

        {/* swipe row */}
        <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-24">
          {crafts.map((c, i) => (
            <article
              key={c.id}
              className="relative flex w-[86vw] shrink-0 snap-center flex-col overflow-hidden rounded-[2rem] sm:w-[60vw] lg:h-[75vh] lg:w-[min(78vw,1100px)] lg:flex-row"
              style={{ background: c.tone, color: c.ink }}
              aria-labelledby={`craft-${c.id}`}
            >
              <div className="relative h-[52vh] overflow-hidden lg:h-full lg:w-1/2">
                <div className="absolute inset-0">
                  <CraftArt variant={c.art} className="h-full w-full" seed={i + 2} title={`Illustration : ${c.name}`} />
                </div>
                <span className="absolute left-5 top-5 rounded-full bg-black/25 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                  {String(i + 1).padStart(2, "0")} / {String(crafts.length).padStart(2, "0")}
                </span>
              </div>
              <div className="flex flex-1 flex-col justify-between gap-8 p-7 lg:p-14">
                <div className="flex items-start justify-between gap-6">
                  <p className="eyebrow opacity-70">{c.city}</p>
                  <p className="arabic text-4xl opacity-90 lg:text-5xl">{c.arabic}</p>
                </div>
                <div>
                  <h3 id={`craft-${c.id}`} className="display text-[clamp(3rem,6vw,6.5rem)]">
                    {c.name}
                  </h3>
                  <p className="eyebrow mt-4 opacity-70">
                    {c.technique} · {c.region}
                  </p>
                  <p className="mt-6 max-w-md text-[0.98rem] leading-relaxed opacity-85">{c.description}</p>
                </div>
                <p className="border-t border-current/20 pt-5 font-display text-xl italic leading-snug opacity-95 lg:text-2xl">
                  « {c.fact} »
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
