"use client";

import { useEffect, useRef } from "react";
import { buildPattern, GLAZES, hash, type Tile } from "@/lib/zellige";

type RGB = [number, number, number];
const rgb = (hex: string): RGB => {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

/** Glaze sets the wall cycles through on click: heart / points / crosses. */
const PALETTES: Record<"heart" | "point" | "cross", RGB>[] = [
  { heart: rgb(GLAZES.miel), point: rgb(GLAZES.cobalt), cross: rgb(GLAZES.chaux) },
  { heart: rgb(GLAZES.cobalt), point: rgb(GLAZES.miel), cross: rgb(GLAZES.cuivre) },
  { heart: rgb(GLAZES.chaux), point: rgb(GLAZES.terre), cross: rgb(GLAZES.cobalt) },
  { heart: rgb(GLAZES.cuivre), point: rgb(GLAZES.chaux), cross: rgb(GLAZES.manganese) },
  { heart: rgb(GLAZES.terre), point: rgb(GLAZES.turquoise), cross: rgb(GLAZES.chaux) },
];

const DARK: RGB = [18, 14, 12];

interface LiveTile {
  path: Path2D;
  cx: number;
  cy: number;
  role: "heart" | "point" | "cross";
  jitter: number;
  palette: number;
  next: number;
  flipAt: number; // ms timestamp when a flip starts, 0 = none
  light: number; // smoothed light 0..1
}

/**
 * « La lanterne »: a dark wall of khatam zellige lit by the pointer. Tiles inside the pool
 * of light show their glaze and lift slightly; a click sends a ripple that re-glazes the wall.
 * On touch screens the lantern drifts by itself.
 */
export default function ZelligeCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    let tiles: LiveTile[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let size = 120;
    let raf = 0;
    let visible = true;
    let palette = 0;

    const light = { x: 0, y: 0, tx: 0, ty: 0, r: 320, active: false, lastMove: 0 };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      size = width < 640 ? 84 : width < 1200 ? 108 : 128;
      light.r = Math.max(240, Math.min(width, height) * 0.42);
      const cols = Math.ceil(width / size) + 1;
      const rows = Math.ceil(height / size) + 1;
      // centre a star on the canvas centre (the ras al-shabaka)
      const ox = (width / 2) % size;
      const oy = (height / 2) % size;
      const raw: Tile[] = buildPattern("khatam", cols, rows, size, ox - size, oy - size);
      tiles = raw
        .filter((t) => t.cx > -size && t.cx < width + size && t.cy > -size && t.cy < height + size)
        .map((t, i) => {
          const p = new Path2D();
          t.points.forEach(([x, y], k) => (k ? p.lineTo(x, y) : p.moveTo(x, y)));
          p.closePath();
          return {
            path: p,
            cx: t.cx,
            cy: t.cy,
            role: t.role as LiveTile["role"],
            jitter: (hash(i * 7.31) - 0.5) * 0.16,
            palette,
            next: palette,
            flipAt: 0,
            light: 0,
          };
        });
      if (!light.active) {
        light.x = light.tx = width * 0.68;
        light.y = light.ty = height * 0.42;
      }
    };

    const draw = (now: number) => {
      // idle drift (touch screens, or no pointer for a while)
      if (!finePointer || now - light.lastMove > 4000) {
        const t = now / 1000;
        light.tx = width * (0.5 + 0.3 * Math.sin(t * 0.35));
        light.ty = height * (0.45 + 0.22 * Math.sin(t * 0.52 + 1.3));
      }
      light.x += (light.tx - light.x) * 0.09;
      light.y += (light.ty - light.y) * 0.09;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = `rgb(${DARK.join(",")})`;
      ctx.fillRect(0, 0, width, height);

      const r2 = light.r * light.r;
      for (const t of tiles) {
        const dx = t.cx - light.x;
        const dy = t.cy - light.y;
        const d2 = dx * dx + dy * dy;
        const target = d2 > r2 ? 0 : Math.pow(1 - Math.sqrt(d2) / light.r, 1.6);
        t.light += (target - t.light) * 0.14;

        // flip animation (squash on Y, swap glaze at the midpoint)
        let scaleY = 1;
        if (t.flipAt && now >= t.flipAt) {
          const p = Math.min(1, (now - t.flipAt) / 520);
          scaleY = Math.abs(Math.cos(p * Math.PI));
          if (p >= 0.5) t.palette = t.next;
          if (p >= 1) t.flipAt = 0;
        }

        const ambient = 0.13; // even unlit tiles keep a whisper of glaze
        const k = ambient + (1 - ambient) * t.light;
        const base = PALETTES[t.palette][t.role];
        const j = 1 + t.jitter;
        const c = [0, 1, 2].map((i) => Math.round(DARK[i] + (base[i] * j - DARK[i]) * k));

        const lift = 1 + 0.06 * t.light;
        ctx.setTransform(dpr * lift, 0, 0, dpr * lift * scaleY, dpr * t.cx * (1 - lift), dpr * t.cy * (1 - lift * scaleY));
        ctx.fillStyle = `rgb(${c[0]},${c[1]},${c[2]})`;
        ctx.fill(t.path);
        if (t.light > 0.02) {
          ctx.lineWidth = 2;
          ctx.strokeStyle = `rgba(244,236,223,${(0.05 + 0.55 * t.light).toFixed(3)})`;
          ctx.stroke(t.path);
        }
      }

      // warm lantern glow on top
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const g = ctx.createRadialGradient(light.x, light.y, 0, light.x, light.y, light.r * 1.1);
      g.addColorStop(0, "rgba(255,214,140,0.16)");
      g.addColorStop(1, "rgba(255,214,140,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);
    };

    const loop = (now: number) => {
      draw(now);
      if (visible && !reduced) raf = requestAnimationFrame(loop);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      if (reduced) {
        // still frame: settle the light, then draw once
        for (const t of tiles) {
          const d = Math.hypot(t.cx - light.x, t.cy - light.y);
          t.light = d > light.r ? 0 : Math.pow(1 - d / light.r, 1.6);
        }
        draw(0);
        return;
      }
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      light.tx = e.clientX - rect.left;
      light.ty = e.clientY - rect.top;
      light.active = true;
      light.lastMove = performance.now();
    };

    const onClick = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest("a, button")) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      palette = (palette + 1) % PALETTES.length;
      const now = performance.now();
      for (const t of tiles) {
        t.next = palette;
        t.flipAt = now + Math.hypot(t.cx - x, t.cy - y) * 0.9;
      }
      if (reduced) {
        tiles.forEach((t) => {
          t.palette = palette;
          t.flipAt = 0;
        });
        draw(0);
      }
    };

    build();
    start();

    const ro = new ResizeObserver(() => {
      build();
      start();
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else cancelAnimationFrame(raf);
    });
    io.observe(canvas);

    // listen on the whole section so the lantern follows the pointer over the headline too
    const host = (canvas.closest("section") ?? canvas.parentElement)!;
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerdown", onClick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerdown", onClick);
    };
  }, []);

  return <canvas ref={canvasRef} className={`block h-full w-full ${className}`} aria-hidden="true" />;
}
