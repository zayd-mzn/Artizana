"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { crafts } from "@/data/crafts";
import CraftArt from "./CraftArt";

/**
 * Les Métiers: eight crafts in a pinned horizontal scroll on large screens,
 * a native swipeable row on small ones.
 */
export default function Metiers() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const el = track.current!;
      const distance = () => el.scrollWidth - window.innerWidth;
      const tween = gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => gsap.set(bar.current, { scaleX: self.progress }),
        },
      });
      // the artwork inside each panel drifts against the scroll (parallax)
      el.querySelectorAll<HTMLElement>("[data-parallax]").forEach((art) => {
        gsap.fromTo(
          art,
          { xPercent: -8 },
          {
            xPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: art.parentElement,
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          },
        );
      });
      return () => ScrollTrigger.refresh();
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={section} id="metiers" className="relative overflow-hidden bg-chaux text-manganese lg:h-screen">
      <div ref={track} className="flex h-full flex-col gap-0 lg:w-max lg:flex-row">
        {/* intro panel */}
        <div className="flex shrink-0 flex-col justify-between gap-10 px-[var(--gutter)] py-24 lg:h-full lg:w-[42vw] lg:py-28">
          <p className="eyebrow text-terre">01 — Les Métiers</p>
          <div>
            <h2 data-reveal="lines" className="display text-[clamp(3rem,6.5vw,7rem)]">
              Huit gestes,
              <br />
              <em>mille ans</em> de mains
            </h2>
            <p data-reveal="fade" className="mt-8 max-w-md text-lg leading-relaxed text-[var(--ink-soft)]">
              Du zellige de Fès à l&apos;argent de Tiznit, chaque métier a sa ville, ses outils et
              ses familles de maâlems. Voici ceux avec qui nous travaillons.
            </p>
          </div>
          <p className="eyebrow hidden items-center gap-3 text-[var(--ink-soft)] lg:flex">
            Faites défiler <span className="h-px w-16 bg-current" /> →
          </p>
        </div>

        {/* mobile: swipe row; desktop: part of the pinned track */}
        <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-16 lg:contents">
          {crafts.map((c, i) => (
            <article
              key={c.id}
              className="relative flex w-[86vw] shrink-0 snap-center flex-col overflow-hidden rounded-[2rem] sm:w-[60vw] lg:h-full lg:w-[min(78vw,1100px)] lg:flex-row lg:rounded-none"
              style={{ background: c.tone, color: c.ink }}
              aria-labelledby={`craft-${c.id}`}
            >
              <div className="relative h-[52vh] overflow-hidden lg:h-full lg:w-1/2">
                <div data-parallax className="absolute inset-[-10%_-12%]">
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
      <div className="absolute inset-x-0 bottom-0 hidden h-1 bg-manganese/10 lg:block">
        <div ref={bar} className="h-full origin-left scale-x-0 bg-terre" />
      </div>
    </section>
  );
}
