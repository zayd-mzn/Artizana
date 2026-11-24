"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import ZelligeCanvas from "./ZelligeCanvas";
import { onReady } from "./Preloader";
import { prefersReducedMotion } from "./Motion";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = root.current!;
    const ctx = gsap.context(() => {
      gsap.set("[data-hero-fade]", { autoAlpha: 0, y: 24 });
      const split = SplitText.create("[data-hero-title]", { type: "lines", mask: "lines" });
      gsap.set(split.lines, { yPercent: 115 });

      // the headline drifts up and the wall darkens as you scroll away
      gsap.to("[data-hero-copy]", {
        yPercent: -18,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to("[data-hero-veil]", {
        opacity: 0.85,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });

      const off = onReady(() => {
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .to(split.lines, { yPercent: 0, duration: 1.5, stagger: 0.12 })
          .to("[data-hero-fade]", { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.08 }, 0.35);
      });
      return off;
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="accueil"
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-manganese text-chaux"
      data-cursor
    >
      <div className="absolute inset-0 -z-10">
        <ZelligeCanvas />
      </div>
      {/* legibility veils: bottom fade for the copy, scroll-driven darkening */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-manganese via-manganese/55 to-transparent" />
      <div data-hero-veil className="pointer-events-none absolute inset-0 -z-10 bg-manganese opacity-0" />

      <div
        data-hero-copy
        className="mx-auto grid w-full max-w-[1500px] gap-10 px-[var(--gutter)] pb-10 pt-40 md:grid-cols-12 md:pb-14"
      >
        <div className="md:col-span-8">
          <p data-hero-fade className="eyebrow mb-6 flex items-center gap-3 text-miel">
            <span className="h-px w-10 bg-miel" />
            Maison d&apos;artisanat marocain · Fès
          </p>
          <h1 data-hero-title className="display text-[clamp(3.3rem,10.5vw,10.5rem)]">
            L&apos;âme des mains
            <br />
            <em className="text-miel">marocaines</em>
          </h1>
        </div>

        <div className="flex flex-col justify-end gap-8 md:col-span-4 md:pb-4">
          <p data-hero-fade className="arabic text-3xl text-chaux/80 md:text-right">
            صُنع بأيادٍ مغربية
          </p>
          <p data-hero-fade className="max-w-sm text-base leading-relaxed text-chaux/75">
            Zellige taillé au menqach, tapis noués dans l&apos;Atlas, poteries de Safi et argent de
            Tiznit. Nous travaillons directement avec plus de cinquante maâlems, et chaque pièce
            arrive avec l&apos;histoire de ses mains.
          </p>
          <div data-hero-fade className="flex flex-wrap gap-3">
            <a href="#collection" className="btn btn-light" data-magnetic>
              Voir la collection <ArrowUpRight size={18} />
            </a>
            <a href="#atelier" className="btn btn-ghost text-chaux" data-magnetic>
              Composer un zellige
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[1500px] items-center justify-between border-t border-chaux/15 px-[var(--gutter)] py-5 text-chaux/60">
        <p data-hero-fade className="eyebrow hidden sm:block">
          Déplacez la lanterne · cliquez pour changer l&apos;émail
        </p>
        <p data-hero-fade className="eyebrow sm:hidden">Touchez le mur pour changer l&apos;émail</p>
        <a href="#metiers" data-hero-fade className="eyebrow flex items-center gap-2 hover:text-miel" aria-label="Défiler vers les métiers">
          Défiler <ArrowDown size={14} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
}
