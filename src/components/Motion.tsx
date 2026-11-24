"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

let lenis: Lenis | null = null;

/** The page's smooth-scroll instance (null when reduced motion is on). */
export function getLenis(): Lenis | null {
  return lenis;
}

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Global motion layer: Lenis smooth scroll wired to GSAP's ticker, and declarative reveals.
 *
 *   data-reveal="lines"  → split into lines that rise out of a mask
 *   data-reveal="fade"   → fade and rise
 *   data-reveal="arch"   → the element opens from the bottom like a door
 *   data-reveal-delay="0.2"
 *   data-magnetic        → element is pulled toward the pointer
 */
export default function Motion() {
  useEffect(() => {
    const reduced = prefersReducedMotion();
    const cleanups: (() => void)[] = [];

    if (!reduced) {
      lenis = new Lenis({ duration: 1.15, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      const raf = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      cleanups.push(() => {
        gsap.ticker.remove(raf);
        lenis?.destroy();
        lenis = null;
      });

      // in-page anchors go through Lenis
      const onClick = (e: MouseEvent) => {
        const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
        if (!a || !lenis) return;
        const id = a.getAttribute("href")!;
        if (id.length < 2) return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target as HTMLElement, { offset: 0, duration: 1.6 });
        history.replaceState(null, "", id);
      };
      document.addEventListener("click", onClick);
      cleanups.push(() => document.removeEventListener("click", onClick));
    }

    const ctx = gsap.context(() => {});
    // wait one frame so sections can create their pins first: reveals measured before
    // a pin above them would get the wrong positions
    const frame = requestAnimationFrame(() => ctx.add(() => {
      if (reduced) return;

      document.querySelectorAll<HTMLElement>('[data-reveal="lines"]').forEach((el) => {
        SplitText.create(el, {
          type: "lines",
          mask: "lines",
          autoSplit: true, // re-split when fonts load or the width changes
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.2,
              ease: "expo.out",
              stagger: 0.09,
              delay: Number(el.dataset.revealDelay ?? 0),
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            }),
        });
      });

      document.querySelectorAll<HTMLElement>('[data-reveal="fade"]').forEach((el) => {
        gsap.from(el, {
          y: 40,
          autoAlpha: 0,
          duration: 1.1,
          ease: "expo.out",
          delay: Number(el.dataset.revealDelay ?? 0),
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      document.querySelectorAll<HTMLElement>('[data-reveal="arch"]').forEach((el) => {
        gsap.from(el, {
          clipPath: "inset(100% 0% 0% 0% round 50% 50% 0 0)",
          duration: 1.5,
          ease: "expo.inOut",
          delay: Number(el.dataset.revealDelay ?? 0),
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }));
    cleanups.push(() => {
      cancelAnimationFrame(frame);
      ctx.revert();
    });

    // magnetic elements
    if (!reduced && window.matchMedia("(hover: hover)").matches) {
      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
        const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
          yTo((e.clientY - (r.top + r.height / 2)) * 0.4);
        };
        const leave = () => {
          xTo(0);
          yTo(0);
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        });
      });
    }

    // fonts change line breaks: re-measure once they are in
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => cleanups.reverse().forEach((fn) => fn());
  }, []);

  return null;
}
