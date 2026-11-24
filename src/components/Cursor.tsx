"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { starPoints, toPath } from "@/lib/zellige";

const STAR = toPath(starPoints(50, 50, 46, 0.62, -90));

/** An 8-point star that trails the pointer and opens over interactive elements. */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.set(el, { xPercent: 0, yPercent: 0, opacity: 0 });
    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3" });
    const rot = gsap.to(el.firstElementChild, { rotation: 360, duration: 14, ease: "none", repeat: -1 });

    const move = (e: PointerEvent) => {
      gsap.to(el, { opacity: 1, duration: 0.3, overwrite: "auto" });
      xTo(e.clientX);
      yTo(e.clientY);
      const hot = (e.target as HTMLElement).closest("a, button, [data-cursor], input, textarea, select, label");
      el.classList.toggle("is-active", !!hot);
    };
    const leave = () => gsap.to(el, { opacity: 0, duration: 0.3 });
    window.addEventListener("pointermove", move);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      rot.kill();
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div ref={ref} className="cursor" aria-hidden="true">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <path d={STAR} fill="none" stroke="currentColor" strokeWidth="3" />
      </svg>
    </div>
  );
}
