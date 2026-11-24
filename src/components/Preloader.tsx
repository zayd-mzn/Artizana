"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ARCH_BAND, ARCH_FIELD, ARCH_OUTER, MARK_VIEWBOX, PIECES, SILL } from "@/brand/geometry";
import { getLenis, prefersReducedMotion } from "./Motion";

export const READY_EVENT = "artizana:ready";

const COLS = 8;
const ROWS = 6;

function announceReady() {
  (window as unknown as { __artizanaReady?: boolean }).__artizanaReady = true;
  window.dispatchEvent(new Event(READY_EVENT));
}

/** Run `fn` once the preloader has finished (immediately if it already has). */
export function onReady(fn: () => void): () => void {
  if ((window as unknown as { __artizanaReady?: boolean }).__artizanaReady) {
    fn();
    return () => {};
  }
  window.addEventListener(READY_EVENT, fn, { once: true });
  return () => window.removeEventListener(READY_EVENT, fn);
}

/**
 * The mark lays itself (tesselles from the central star outward, then the door frame), a counter runs,
 * and the screen opens in a wave of flipping tiles. Played once per session.
 */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("artizana:intro") === "1";
    } catch {}
    if (seen || prefersReducedMotion()) {
      setDone(true);
      announceReady();
      return;
    }

    const el = root.current!;
    document.documentElement.style.overflow = "hidden";
    getLenis()?.stop();
    const counter = el.querySelector<HTMLElement>("[data-count]")!;
    const state = { n: 0 };

    const ctx = gsap.context(() => {
      const strokes = el.querySelectorAll<SVGPathElement>("[data-draw]");
      strokes.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });
      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => {
          try {
            sessionStorage.setItem("artizana:intro", "1");
          } catch {}
          document.documentElement.style.overflow = "";
          getLenis()?.start();
          setDone(true);
        },
      });
      tl.to(state, {
        n: 100,
        duration: 2.2,
        ease: "power2.inOut",
        onUpdate: () => (counter.textContent = String(Math.round(state.n)).padStart(3, "0")),
      })
        // tesselles are laid from the central star outward, as a maâlem grows a panel
        .from(
          "[data-piece]",
          {
            scale: 0,
            autoAlpha: 0,
            duration: 0.45,
            ease: "back.out(2)",
            stagger: (_i: number, target: Element) => Number((target as SVGElement).dataset.dist) * 0.0068,
          },
          0.1,
        )
        .to(strokes, { strokeDashoffset: 0, duration: 1.3 }, 0.35)
        .from("[data-fill]", { autoAlpha: 0, duration: 0.6 }, 1.3)
        .from("[data-word]", { yPercent: 110, duration: 0.9, ease: "expo.out" }, 1.2)
        .to("[data-intro]", { autoAlpha: 0, scale: 0.92, duration: 0.5, ease: "power2.in" }, 2.45)
        .add(announceReady, 2.75)
        .to(
          "[data-tile]",
          {
            scaleY: 0,
            duration: 0.7,
            ease: "expo.inOut",
            stagger: { grid: [ROWS, COLS], from: "center", amount: 0.55 },
          },
          2.7,
        );
    }, el);

    return () => {
      ctx.revert();
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[80]" aria-hidden="true">
      <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 1fr)` }}>
        {Array.from({ length: COLS * ROWS }, (_, i) => (
          <div key={i} data-tile className="-m-px bg-manganese" style={{ transformOrigin: i % 2 ? "top" : "bottom" }} />
        ))}
      </div>
      <div data-intro className="absolute inset-0 flex flex-col items-center justify-center gap-8 text-chaux">
        <svg viewBox={MARK_VIEWBOX} className="h-52 w-auto md:h-64">
          <path d={ARCH_OUTER} data-fill fill="#D6A243" />
          <path d={ARCH_BAND} data-fill fill="#17120F" />
          <path d={ARCH_FIELD} fill="#2A211B" />
          {PIECES.map((p, i) => (
            <path
              key={i}
              d={p.d}
              fill={p.fill === "#FBF6EE" ? "#F4ECDF" : p.fill}
              data-piece
              data-dist={p.dist}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            />
          ))}
          <path d={ARCH_OUTER} data-draw fill="none" stroke="#D6A243" strokeWidth="5" />
          <rect {...SILL} rx={2} fill="#D6A243" data-fill />
        </svg>
        <div className="overflow-hidden">
          <p data-word className="font-display text-3xl tracking-[0.35em] md:text-4xl">
            ARTIZANA
          </p>
        </div>
        <p className="eyebrow tabular-nums text-miel">
          <span data-count>000</span>
        </p>
      </div>
    </div>
  );
}
