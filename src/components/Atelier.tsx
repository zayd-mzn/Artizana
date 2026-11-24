"use client";

import { useMemo, useRef, useState } from "react";
import { Download, MessageCircle, RotateCcw, Shuffle } from "lucide-react";
import {
  buildPattern,
  GLAZE_LABELS,
  GLAZES,
  hash,
  shade,
  toPath,
  type GlazeName,
  type PatternId,
} from "@/lib/zellige";
import { whatsappLink } from "@/lib/whatsapp";

const SIZE = 600;
const CELL = 100;

const PATTERNS: { id: PatternId; label: string; hint: string }[] = [
  { id: "khatam", label: "Khatam", hint: "Étoile et croix" },
  { id: "octagone", label: "Octogone", hint: "Étoile dans l'octogone" },
];

const ROLE_NAMES: Record<string, string> = {
  heart: "Cœur d'étoile",
  point: "Branche",
  cross: "Croix",
  gem: "Losange",
  edge: "Amande",
  link: "Lien",
};

const PRESETS: Record<PatternId, GlazeName[][]> = {
  khatam: [
    ["miel", "cobalt", "cuivre", "chaux"],
    ["cobalt", "chaux", "chaux", "terre"],
    ["chaux", "cuivre", "manganese", "miel"],
  ],
  octagone: [
    ["miel", "cobalt", "chaux", "cuivre", "chaux"],
    ["terre", "manganese", "chaux", "cobalt", "miel"],
    ["chaux", "cuivre", "miel", "manganese", "chaux"],
  ],
};

export default function Atelier() {
  const [pattern, setPattern] = useState<PatternId>("octagone");
  const [brush, setBrush] = useState<GlazeName>("cobalt");
  const [hover, setHover] = useState<string | null>(null);
  const [presetIdx, setPresetIdx] = useState(0);
  const [painted, setPainted] = useState<Record<PatternId, Record<string, GlazeName>>>({ khatam: {}, octagone: {} });
  const svgRef = useRef<SVGSVGElement>(null);

  const tiles = useMemo(
    () =>
      buildPattern(pattern, SIZE / CELL, SIZE / CELL, CELL, 0, 0).filter(
        (t) => t.cx > -CELL / 2 && t.cx < SIZE + CELL / 2 && t.cy > -CELL / 2 && t.cy < SIZE + CELL / 2,
      ),
    [pattern],
  );

  // the distinct pieces (orbits) of this pattern, ordered from the centre outward
  const orbits = useMemo(() => {
    const seen = new Map<string, { key: string; role: string; count: number; dist: number }>();
    for (const t of tiles) {
      const o = seen.get(t.orbit);
      const dist = Math.hypot(t.cx - SIZE / 2, t.cy - SIZE / 2);
      if (o) {
        o.count++;
        o.dist = Math.min(o.dist, dist);
      } else seen.set(t.orbit, { key: t.orbit, role: t.role, count: 1, dist });
    }
    return [...seen.values()].sort((a, b) => a.dist - b.dist);
  }, [tiles]);

  const colorOf = (orbit: string, index: number): GlazeName =>
    painted[pattern][orbit] ?? PRESETS[pattern][0][index % PRESETS[pattern][0].length];

  const orbitIndex = useMemo(() => new Map(orbits.map((o, i) => [o.key, i])), [orbits]);

  const paint = (orbit: string) =>
    setPainted((p) => ({ ...p, [pattern]: { ...p[pattern], [orbit]: brush } }));

  const applyPreset = (preset: GlazeName[]) =>
    setPainted((p) => ({ ...p, [pattern]: Object.fromEntries(orbits.map((o, i) => [o.key, preset[i % preset.length]])) }));

  const randomize = () => {
    const names = Object.keys(GLAZES) as GlazeName[];
    const seed = Math.random() * 1000;
    applyPreset(orbits.map((_, i) => names[Math.floor(hash(seed + i * 17) * names.length)]));
  };

  const recipe = orbits
    .map((o, i) => `${ROLE_NAMES[o.role]} : ${GLAZE_LABELS[colorOf(o.key, i)]}`)
    .join("\n");
  const orderHref = whatsappLink(
    `Bonjour ! J'ai composé ce zellige dans l'Atelier Artizana.\n\nMotif : ${PATTERNS.find((p) => p.id === pattern)!.label}\n${recipe}\n\nJe souhaiterais un devis (dimensions : ...).`,
  );

  const download = () => {
    const svg = svgRef.current;
    if (!svg) return;
    const clone = svg.cloneNode(true) as SVGSVGElement;
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    const blob = new Blob([clone.outerHTML], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `artizana-zellige-${pattern}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="atelier" className="relative overflow-hidden bg-manganese py-24 text-chaux md:py-32">
      <div className="mx-auto max-w-[1500px] px-[var(--gutter)]">
        <div className="mb-14 grid gap-8 md:grid-cols-12">
          <p className="eyebrow text-miel md:col-span-3">02 — L&apos;Atelier</p>
          <div className="md:col-span-9">
            <h2 className="display text-[clamp(2.8rem,6vw,6.5rem)]">
              Composez votre <em className="text-miel">zellige</em>
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-chaux/70">
              Un maâlem part d&apos;une étoile centrale, la <em>ras al-shabaka</em>, et la répète par
              symétrie. Ici, chaque pièce que vous émaillez se répète sur tout le panneau. Survolez
              une tesselle pour voir ses jumelles.
            </p>
          </div>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-12">
          {/* the panel */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-[1.75rem] bg-chaux p-3 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)]">
              <svg
                ref={svgRef}
                viewBox={`0 0 ${SIZE} ${SIZE}`}
                className="block aspect-square w-full rounded-[1.25rem]"
                role="group"
                aria-label="Panneau de zellige. Cliquez sur une tesselle pour l'émailler."
                onMouseLeave={() => setHover(null)}
              >
                <rect width={SIZE} height={SIZE} fill={GLAZES.chaux} />
                {tiles.map((t, i) => {
                  const idx = orbitIndex.get(t.orbit) ?? 0;
                  const glaze = GLAZES[colorOf(t.orbit, idx)];
                  const isTwin = hover === t.orbit;
                  return (
                    <path
                      key={`${pattern}-${i}`}
                      d={toPath(t.points)}
                      fill={shade(glaze, (hash(i * 3.7) - 0.5) * 0.1)}
                      stroke={isTwin ? GLAZES.miel : GLAZES.chaux}
                      strokeWidth={isTwin ? 3.5 : 2.2}
                      strokeLinejoin="round"
                      className="cursor-pointer transition-[fill] duration-500"
                      style={{ transitionDelay: `${Math.hypot(t.cx - SIZE / 2, t.cy - SIZE / 2) * 0.9}ms` }}
                      onMouseEnter={() => setHover(t.orbit)}
                      onClick={() => paint(t.orbit)}
                    />
                  );
                })}
                {/* draw highlighted twins on top so their outline is not hidden by neighbours */}
                {hover &&
                  tiles
                    .filter((t) => t.orbit === hover)
                    .map((t, i) => (
                      <path key={`h${i}`} d={toPath(t.points)} fill="none" stroke={GLAZES.miel} strokeWidth={3.5} pointerEvents="none" />
                    ))}
              </svg>
            </div>
            <p className="mt-4 text-sm text-chaux/50">
              {tiles.length} tesselles · {orbits.length} formes taillées · symétrie p4m (×8)
            </p>
          </div>

          {/* controls */}
          <div className="flex flex-col gap-10 lg:col-span-5">
            <fieldset>
              <legend className="eyebrow mb-4 text-chaux/60">Motif</legend>
              <div className="grid grid-cols-2 gap-3">
                {PATTERNS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPattern(p.id)}
                    aria-pressed={pattern === p.id}
                    className={`rounded-2xl border px-5 py-4 text-left transition-colors ${
                      pattern === p.id ? "border-miel bg-miel/10" : "border-chaux/15 hover:border-chaux/40"
                    }`}
                  >
                    <span className="display block text-3xl">{p.label}</span>
                    <span className="text-sm text-chaux/60">{p.hint}</span>
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="eyebrow mb-4 text-chaux/60">
                Émail — <span className="text-chaux">{GLAZE_LABELS[brush]}</span>
              </legend>
              <div className="flex flex-wrap gap-3">
                {(Object.keys(GLAZES) as GlazeName[]).map((g) => (
                  <button
                    key={g}
                    onClick={() => setBrush(g)}
                    aria-pressed={brush === g}
                    aria-label={GLAZE_LABELS[g]}
                    title={GLAZE_LABELS[g]}
                    className={`h-12 w-12 rounded-full border-2 transition-transform ${
                      brush === g ? "scale-110 border-miel" : "border-chaux/20 hover:scale-105"
                    }`}
                    style={{ background: GLAZES[g] }}
                  />
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="eyebrow mb-4 text-chaux/60">Pièces — cliquez pour émailler</legend>
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {orbits.map((o, i) => {
                  const g = colorOf(o.key, i);
                  return (
                    <li key={o.key}>
                      <button
                        onClick={() => paint(o.key)}
                        onMouseEnter={() => setHover(o.key)}
                        onMouseLeave={() => setHover(null)}
                        onFocus={() => setHover(o.key)}
                        onBlur={() => setHover(null)}
                        className="flex w-full items-center gap-3 rounded-xl border border-chaux/10 px-3 py-2.5 text-left text-sm transition-colors hover:border-chaux/40"
                      >
                        <span className="h-6 w-6 shrink-0 rounded-md border border-chaux/20" style={{ background: GLAZES[g] }} />
                        <span className="flex-1">
                          {ROLE_NAMES[o.role]}
                          <span className="block text-xs text-chaux/50">
                            {GLAZE_LABELS[g]} · ×{o.count}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </fieldset>

            <div className="flex flex-wrap gap-3">
              <button onClick={randomize} className="btn btn-ghost text-chaux !py-3 text-sm">
                <Shuffle size={16} /> Hasard
              </button>
              <button
                onClick={() => {
                  const next = (presetIdx + 1) % PRESETS[pattern].length;
                  setPresetIdx(next);
                  applyPreset(PRESETS[pattern][next]);
                }}
                className="btn btn-ghost text-chaux !py-3 text-sm"
              >
                <RotateCcw size={16} /> Classique
              </button>
              <button onClick={download} className="btn btn-ghost text-chaux !py-3 text-sm">
                <Download size={16} /> SVG
              </button>
            </div>

            <a href={orderHref} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp justify-center text-base">
              <MessageCircle size={18} /> Commander ce motif
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
