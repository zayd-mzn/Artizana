import { useId } from "react";
import { buildPattern, toPath, GLAZES, hash, shade, starPoints } from "@/lib/zellige";

export type ArtVariant =
  | "zellige"
  | "tapis"
  | "kilim"
  | "poterie"
  | "tagine"
  | "dinanderie"
  | "theiere"
  | "cuir"
  | "bijoux"
  | "bracelet"
  | "collier"
  | "djellaba"
  | "bois"
  | "tadelakt";

interface Props {
  variant: ArtVariant;
  colors?: [string, string];
  seed?: number;
  className?: string;
  title?: string;
}

const W = 400;
const H = 500;
const SABLE = "#E6D6BC";

/**
 * Generative illustrations of Moroccan crafts, drawn from the same glazes and geometry
 * as the brand. They stand in for photography until the shop has its own product shots.
 */
export default function CraftArt({ variant, colors, seed = 1, className, title }: Props) {
  const uid = useId().replace(/:/g, "");
  const [c1, c2] = colors ?? DEFAULTS[variant];
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label={title ?? variant}
    >
      {RENDER[variant](c1, c2, seed, uid)}
    </svg>
  );
}

const DEFAULTS: Record<ArtVariant, [string, string]> = {
  zellige: [GLAZES.cobalt, GLAZES.miel],
  tapis: [GLAZES.chaux, GLAZES.manganese],
  kilim: [GLAZES.terre, GLAZES.miel],
  poterie: [GLAZES.cobalt, GLAZES.miel],
  tagine: [GLAZES.cobalt, GLAZES.chaux],
  dinanderie: [GLAZES.miel, GLAZES.manganese],
  theiere: [GLAZES.miel, GLAZES.cobalt],
  cuir: [GLAZES.miel, GLAZES.terre],
  bijoux: ["#C9C4BA", GLAZES.cuivre],
  bracelet: ["#C9C4BA", GLAZES.terre],
  collier: ["#D98A1F", "#C9C4BA"],
  djellaba: [GLAZES.chaux, GLAZES.manganese],
  bois: ["#7A4A2A", GLAZES.cuivre],
  tadelakt: [GLAZES.miel, GLAZES.terre],
};

type Renderer = (c1: string, c2: string, seed: number, uid: string) => React.ReactNode;

const RENDER: Record<ArtVariant, Renderer> = {
  zellige(c1, c2, seed) {
    const pattern = seed % 2 === 0 ? "khatam" : "octagone";
    const tiles = buildPattern(pattern, 5, 6, 92, 16, 22);
    const roleFill: Record<string, string> = {
      heart: c2,
      point: c1,
      cross: GLAZES.chaux,
      gem: GLAZES.cuivre === c1 ? GLAZES.miel : GLAZES.cuivre,
      edge: GLAZES.chaux,
      link: GLAZES.terre,
    };
    return (
      <>
        <rect width={W} height={H} fill={GLAZES.chaux} />
        {tiles.map((t, i) => (
          <path
            key={i}
            d={toPath(t.points)}
            fill={shade(roleFill[t.role], (hash(i + seed * 31) - 0.5) * 0.12)}
            stroke={GLAZES.chaux}
            strokeWidth={2.4}
            strokeLinejoin="round"
          />
        ))}
      </>
    );
  },

  tapis(c1, c2, seed) {
    // Beni Ourain / Azilal: an irregular hand-drawn diamond lattice on wool
    const lines: React.ReactNode[] = [];
    const step = 92;
    for (let k = -6; k < 10; k++) {
      for (const dir of [1, -1]) {
        const pts: string[] = [];
        for (let y = -20; y <= H + 20; y += 20) {
          const x = (dir === 1 ? k * step + y * 0.62 : k * step + 120 - y * 0.62) + (hash(k * 13 + y + seed + (dir > 0 ? 0 : 99)) - 0.5) * 9;
          pts.push(`${x.toFixed(1)},${y}`);
        }
        lines.push(
          <polyline key={`${k}${dir}`} points={pts.join(" ")} fill="none" stroke={c2} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" opacity={0.9} />,
        );
      }
    }
    const marks: React.ReactNode[] = [];
    for (let i = 0; i < 14; i++) {
      const x = 30 + hash(i * 7 + seed) * 340;
      const y = 30 + hash(i * 11 + seed) * 420;
      marks.push(<path key={i} d={`M${x - 8},${y - 8}L${x + 8},${y + 8}M${x + 8},${y - 8}L${x - 8},${y + 8}`} stroke={c2} strokeWidth={4} strokeLinecap="round" opacity={0.7} />);
    }
    return (
      <>
        <rect width={W} height={H} fill={c1} />
        <WoolTexture color={c2} seed={seed} />
        {lines}
        {marks}
        {Array.from({ length: 40 }, (_, i) => (
          <line key={i} x1={6 + i * 10} y1={H - 24} x2={6 + i * 10 + (hash(i) - 0.5) * 6} y2={H} stroke={shade(c1, -0.15)} strokeWidth={3} />
        ))}
      </>
    );
  },

  kilim(c1, c2, seed) {
    const bands = [c1, GLAZES.manganese, c2, GLAZES.chaux, c1, GLAZES.cobalt, c2, GLAZES.manganese, c1];
    const bh = H / bands.length;
    return (
      <>
        {bands.map((c, i) => (
          <g key={i}>
            <rect y={i * bh} width={W} height={bh + 1} fill={c} />
            {i % 2 === 1 &&
              Array.from({ length: 10 }, (_, k) => {
                const x = k * 40 + (seed % 3) * 6;
                const col = bands[(i + 2) % bands.length];
                return <path key={k} d={`M${x},${(i + 1) * bh}L${x + 20},${i * bh + 6}L${x + 40},${(i + 1) * bh}Z`} fill={col} />;
              })}
            {i % 3 === 0 &&
              Array.from({ length: 8 }, (_, k) => {
                const x = 25 + k * 50;
                const y = i * bh + bh / 2;
                return <path key={`d${k}`} d={`M${x},${y - 12}L${x + 12},${y}L${x},${y + 12}L${x - 12},${y}Z`} fill={GLAZES.chaux} opacity={0.9} />;
              })}
          </g>
        ))}
      </>
    );
  },

  poterie(c1, c2, seed, uid) {
    const cx = W / 2;
    const cy = H / 2;
    const petals = 8 + (seed % 2) * 4;
    return (
      <>
        <defs>
          <radialGradient id={`${uid}g`} cx="40%" cy="35%" r="75%">
            <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
            <stop offset="0.35" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width={W} height={H} fill={shade(c1, -0.35)} />
        <circle cx={cx} cy={cy} r={182} fill={GLAZES.chaux} />
        <circle cx={cx} cy={cy} r={182} fill="none" stroke={c1} strokeWidth={14} />
        <circle cx={cx} cy={cy} r={160} fill="none" stroke={c2} strokeWidth={4} />
        {Array.from({ length: 24 }, (_, k) => {
          const a = (k / 24) * Math.PI * 2;
          return <circle key={k} cx={cx + Math.cos(a) * 168} cy={cy + Math.sin(a) * 168} r={4} fill={c1} />;
        })}
        {Array.from({ length: petals }, (_, k) => {
          const a = (k / petals) * 360;
          return (
            <path
              key={k}
              transform={`rotate(${a} ${cx} ${cy})`}
              d={`M${cx},${cy - 40} C${cx + 36},${cy - 80} ${cx + 22},${cy - 132} ${cx},${cy - 146} C${cx - 22},${cy - 132} ${cx - 36},${cy - 80} ${cx},${cy - 40}Z`}
              fill={k % 2 ? c1 : c2}
              opacity={0.92}
            />
          );
        })}
        <path d={toPath(starPoints(cx, cy, 44, 0.55))} fill={c1} />
        <circle cx={cx} cy={cy} r={10} fill={c2} />
        <circle cx={cx} cy={cy} r={182} fill={`url(#${uid}g)`} />
      </>
    );
  },

  tagine(c1, c2, _seed, uid) {
    const cx = W / 2;
    return (
      <>
        <defs>
          <linearGradient id={`${uid}l`} x1="0" x2="1">
            <stop offset="0" stopColor="#000" stopOpacity="0.25" />
            <stop offset="0.45" stopColor="#fff" stopOpacity="0.18" />
            <stop offset="1" stopColor="#000" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <rect width={W} height={H} fill={SABLE} />
        <ellipse cx={cx} cy={410} rx={170} ry={26} fill={GLAZES.manganese} opacity={0.18} />
        <path d={`M${cx - 165},360 Q${cx},420 ${cx + 165},360 L${cx + 150},390 Q${cx},440 ${cx - 150},390Z`} fill={c1} />
        <path d={`M${cx - 150},360 Q${cx - 70},150 ${cx - 14},110 L${cx + 14},110 Q${cx + 70},150 ${cx + 150},360Z`} fill={c1} />
        {[0.32, 0.5, 0.68, 0.84].map((t, i) => {
          const y = 110 + t * 250;
          const half = 14 + (150 - 14) * Math.pow(t, 1.25);
          return (
            <g key={i}>
              <line x1={cx - half} x2={cx + half} y1={y} y2={y} stroke={c2} strokeWidth={3} />
              {Array.from({ length: Math.round(half / 14) }, (_, k, arr) => {
                const x = cx - half + ((k + 0.5) * (half * 2)) / arr.length;
                return <path key={k} d={toPath(starPoints(x, y - 14, 8, 0.45))} fill={c2} />;
              })}
            </g>
          );
        })}
        <circle cx={cx} cy={100} r={18} fill={c1} />
        <circle cx={cx} cy={100} r={18} fill={`url(#${uid}l)`} />
        <path d={`M${cx - 150},360 Q${cx - 70},150 ${cx - 14},110 L${cx + 14},110 Q${cx + 70},150 ${cx + 150},360Z`} fill={`url(#${uid}l)`} />
      </>
    );
  },

  dinanderie(c1, c2, seed, uid) {
    const cx = W / 2;
    const holes: React.ReactNode[] = [];
    for (let r = 0; r < 9; r++) {
      const y = 170 + r * 24;
      const half = 70 + Math.sin((r / 8) * Math.PI) * 30;
      const n = Math.round(half / 13);
      for (let k = 0; k < n; k++) {
        const x = cx - half + 8 + (k * (half * 2 - 16)) / Math.max(1, n - 1);
        holes.push(
          r % 3 === 1 ? (
            <path key={`${r}-${k}`} d={toPath(starPoints(x, y, 6.5, 0.45))} fill="#FFE7A8" />
          ) : (
            <circle key={`${r}-${k}`} cx={x} cy={y} r={3.2} fill="#FFE7A8" />
          ),
        );
      }
    }
    // stars thrown on the wall by the lantern
    const thrown = Array.from({ length: 26 }, (_, i) => {
      const a = hash(i + seed) * Math.PI * 2;
      const d = 170 + hash(i * 3 + seed) * 150;
      const x = cx + Math.cos(a) * d;
      const y = 260 + Math.sin(a) * d * 0.9;
      return <path key={i} d={toPath(starPoints(x, y, 3 + hash(i * 5) * 6, 0.45))} fill={c1} opacity={0.25 + hash(i * 9) * 0.4} />;
    });
    return (
      <>
        <defs>
          <radialGradient id={`${uid}r`} cx="50%" cy="52%" r="55%">
            <stop offset="0" stopColor={c1} stopOpacity="0.55" />
            <stop offset="1" stopColor={c1} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${uid}b`} x1="0" x2="1">
            <stop offset="0" stopColor={shade(c1, -0.45)} />
            <stop offset="0.5" stopColor={shade(c1, 0.2)} />
            <stop offset="1" stopColor={shade(c1, -0.55)} />
          </linearGradient>
        </defs>
        <rect width={W} height={H} fill={c2} />
        <rect width={W} height={H} fill={`url(#${uid}r)`} />
        {thrown}
        <line x1={cx} y1={0} x2={cx} y2={92} stroke={shade(c1, -0.3)} strokeWidth={3} />
        <path d={`M${cx - 24},128 Q${cx},70 ${cx + 24},128Z`} fill={`url(#${uid}b)`} />
        <circle cx={cx} cy={92} r={8} fill="none" stroke={c1} strokeWidth={3} />
        <path d={`M${cx - 70},150 L${cx + 70},150 L${cx + 100},270 L${cx + 70},390 L${cx - 70},390 L${cx - 100},270Z`} fill={`url(#${uid}b)`} />
        <path d={`M${cx - 70},150 L${cx + 70},150 L${cx + 100},270 L${cx + 70},390 L${cx - 70},390 L${cx - 100},270Z`} fill="none" stroke={shade(c1, -0.5)} strokeWidth={2} />
        <rect x={cx - 76} y={130} width={152} height={20} rx={3} fill={shade(c1, -0.2)} />
        <rect x={cx - 76} y={390} width={152} height={18} rx={3} fill={shade(c1, -0.2)} />
        <path d={`M${cx - 40},408 L${cx + 40},408 L${cx + 26},430 L${cx - 26},430Z`} fill={shade(c1, -0.35)} />
        {holes}
      </>
    );
  },

  theiere(c1, c2, _seed, uid) {
    const cx = 170;
    return (
      <>
        <defs>
          <linearGradient id={`${uid}m`} x1="0" x2="1">
            <stop offset="0" stopColor={shade(c1, -0.5)} />
            <stop offset="0.38" stopColor={shade(c1, 0.35)} />
            <stop offset="0.6" stopColor={c1} />
            <stop offset="1" stopColor={shade(c1, -0.55)} />
          </linearGradient>
        </defs>
        <rect width={W} height={H} fill={c2} />
        <ellipse cx={W / 2} cy={420} rx={190} ry={40} fill={`url(#${uid}m)`} />
        <ellipse cx={W / 2} cy={414} rx={176} ry={32} fill={shade(c1, -0.25)} />
        <path d={`M${cx + 70},300 C${cx + 120},290 ${cx + 130},230 ${cx + 175},200 L${cx + 182},210 C${cx + 150},240 ${cx + 140},310 ${cx + 72},336Z`} fill={`url(#${uid}m)`} />
        <path d={`M${cx - 74},250 C${cx - 140},250 ${cx - 140},340 ${cx - 70},350`} fill="none" stroke={`url(#${uid}m)`} strokeWidth={14} />
        <path d={`M${cx - 80},400 C${cx - 110},330 ${cx - 90},250 ${cx - 40},230 L${cx + 40},230 C${cx + 90},250 ${cx + 110},330 ${cx + 80},400Z`} fill={`url(#${uid}m)`} />
        <path d={`M${cx - 40},230 C${cx - 40},180 ${cx - 20},150 ${cx},140 C${cx + 20},150 ${cx + 40},180 ${cx + 40},230Z`} fill={`url(#${uid}m)`} />
        <circle cx={cx} cy={132} r={12} fill={`url(#${uid}m)`} />
        {[0, 1, 2].map((r) =>
          Array.from({ length: 7 }, (_, k) => (
            <circle key={`${r}${k}`} cx={cx - 60 + k * 20} cy={290 + r * 30} r={3} fill={shade(c1, -0.5)} opacity={0.6} />
          )),
        )}
        {[300, 345].map((x, i) => (
          <g key={i}>
            <path d={`M${x - 22},${300 - i * 10} L${x + 22},${300 - i * 10} L${x + 16},${385} L${x - 16},${385}Z`} fill="#7FB7A6" opacity={0.5} />
            <path d={`M${x - 20},${330 - i * 10} L${x + 20},${330 - i * 10} L${x + 16},${385} L${x - 16},${385}Z`} fill="#9A5B12" opacity={0.75} />
            <path d={`M${x - 22},${300 - i * 10} L${x + 22},${300 - i * 10}`} stroke={GLAZES.miel} strokeWidth={3} />
          </g>
        ))}
      </>
    );
  },

  cuir(c1, c2, seed) {
    // Chouara from above: honeycomb of dye vats
    const dyes = [c1, c2, "#7A3B1A", GLAZES.chaux, "#C9A227", "#5A2E1A", "#9C2F1E", "#D9B27A"];
    const vats: React.ReactNode[] = [];
    const r = 46;
    for (let row = 0; row < 7; row++) {
      for (let col = 0; col < 5; col++) {
        const x = 40 + col * 82 + (row % 2) * 41;
        const y = 40 + row * 72;
        const fill = dyes[Math.floor(hash(row * 9 + col + seed) * dyes.length)];
        vats.push(
          <g key={`${row}-${col}`}>
            <circle cx={x} cy={y} r={r} fill="#D8C3A0" />
            <circle cx={x} cy={y} r={r - 7} fill={fill} />
            <circle cx={x - 8} cy={y - 6} r={(r - 7) * 0.55} fill="none" stroke="#fff" strokeOpacity={0.18} strokeWidth={2} />
            <circle cx={x + 4} cy={y + 3} r={(r - 7) * 0.3} fill="none" stroke="#000" strokeOpacity={0.12} strokeWidth={2} />
          </g>,
        );
      }
    }
    return (
      <>
        <rect width={W} height={H} fill="#BFA47E" />
        {vats}
      </>
    );
  },

  bijoux(c1, c2, _seed, uid) {
    // Tiznit triangular fibula (tizerzai)
    const cx = W / 2;
    return (
      <>
        <defs>
          <linearGradient id={`${uid}s`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={shade(c1, 0.5)} />
            <stop offset="0.5" stopColor={c1} />
            <stop offset="1" stopColor={shade(c1, -0.45)} />
          </linearGradient>
        </defs>
        <rect width={W} height={H} fill={GLAZES.manganese} />
        <circle cx={cx} cy={120} r={62} fill="none" stroke={`url(#${uid}s)`} strokeWidth={14} />
        <line x1={cx - 80} y1={78} x2={cx + 40} y2={190} stroke={`url(#${uid}s)`} strokeWidth={6} strokeLinecap="round" />
        <path d={`M${cx - 120},190 L${cx + 120},190 L${cx},430Z`} fill={`url(#${uid}s)`} />
        <path d={`M${cx - 92},210 L${cx + 92},210 L${cx},392Z`} fill="none" stroke={shade(c1, -0.4)} strokeWidth={2} />
        {[0, 1, 2].map((i) => (
          <path key={i} d={toPath(starPoints(cx, 250 + i * 46, 16 - i * 3, 0.5))} fill={i === 1 ? GLAZES.terre : c2} />
        ))}
        {Array.from({ length: 18 }, (_, i) => {
          const t = i / 17;
          return (
            <g key={i}>
              <circle cx={cx - 108 + t * 108} cy={200 + t * 214} r={3.5} fill={shade(c1, 0.4)} />
              <circle cx={cx + 108 - t * 108} cy={200 + t * 214} r={3.5} fill={shade(c1, 0.4)} />
            </g>
          );
        })}
        <circle cx={cx} cy={444} r={10} fill={GLAZES.terre} stroke={`url(#${uid}s)`} strokeWidth={4} />
      </>
    );
  },

  bracelet(c1, c2, _seed, uid) {
    const cx = W / 2;
    return (
      <>
        <defs>
          <linearGradient id={`${uid}s`} x1="0" x2="1">
            <stop offset="0" stopColor={shade(c1, -0.5)} />
            <stop offset="0.3" stopColor={shade(c1, 0.55)} />
            <stop offset="0.7" stopColor={c1} />
            <stop offset="1" stopColor={shade(c1, -0.5)} />
          </linearGradient>
        </defs>
        <rect width={W} height={H} fill={GLAZES.cobalt} />
        <ellipse cx={cx} cy={300} rx={150} ry={60} fill="none" stroke={shade(c1, -0.4)} strokeWidth={50} />
        <ellipse cx={cx} cy={250} rx={150} ry={60} fill="none" stroke={`url(#${uid}s)`} strokeWidth={50} />
        {Array.from({ length: 11 }, (_, k) => {
          const x = cx - 125 + k * 25;
          const y = 250 + 60 * Math.sqrt(Math.max(0, 1 - ((x - cx) / 150) ** 2)) + 2;
          return <path key={k} d={`M${x - 9},${y - 14}L${x + 9},${y - 14}L${x},${y + 4}Z`} fill={shade(c1, -0.45)} />;
        })}
        {[-1, 0, 1].map((k) => (
          <circle key={k} cx={cx + k * 60} cy={250 + 60 * Math.sqrt(1 - ((k * 60) / 150) ** 2)} r={11} fill={k === 0 ? c2 : GLAZES.cuivre} stroke={shade(c1, 0.3)} strokeWidth={3} />
        ))}
      </>
    );
  },

  collier(c1, c2, seed, uid) {
    const cx = W / 2;
    const beads = 15;
    return (
      <>
        <defs>
          <radialGradient id={`${uid}a`} cx="35%" cy="30%" r="70%">
            <stop offset="0" stopColor={shade(c1, 0.55)} />
            <stop offset="0.6" stopColor={c1} />
            <stop offset="1" stopColor={shade(c1, -0.45)} />
          </radialGradient>
        </defs>
        <rect width={W} height={H} fill={GLAZES.cuivre} />
        <path d={`M40,40 Q${cx},560 360,40`} fill="none" stroke={c2} strokeWidth={2} />
        {Array.from({ length: beads }, (_, i) => {
          const t = 0.08 + (i / (beads - 1)) * 0.84;
          const x = (1 - t) ** 2 * 40 + 2 * (1 - t) * t * cx + t ** 2 * 360;
          const y = (1 - t) ** 2 * 40 + 2 * (1 - t) * t * 560 + t ** 2 * 40;
          const big = i === Math.floor(beads / 2);
          const r = big ? 42 : 14 + Math.sin(t * Math.PI) * 12 + hash(i + seed) * 3;
          return (
            <g key={i}>
              <circle cx={x} cy={y} r={r} fill={`url(#${uid}a)`} />
              {i % 2 === 0 && !big && <rect x={x - 5} y={y - r - 6} width={10} height={6} fill={c2} />}
            </g>
          );
        })}
      </>
    );
  },

  djellaba(c1, c2, _seed, uid) {
    const cx = W / 2;
    return (
      <>
        <defs>
          <linearGradient id={`${uid}f`} x1="0" x2="1">
            <stop offset="0" stopColor={shade(c1, -0.18)} />
            <stop offset="0.5" stopColor={c1} />
            <stop offset="1" stopColor={shade(c1, -0.22)} />
          </linearGradient>
        </defs>
        <rect width={W} height={H} fill={c1 === GLAZES.chaux || c1 === "#E6D6BC" ? GLAZES.cuivre : SABLE} />
        {/* hood */}
        <path d={`M${cx - 58},120 Q${cx},20 ${cx + 58},120 Q${cx},150 ${cx - 58},120Z`} fill={shade(c1, -0.12)} />
        {/* body with sleeves */}
        <path d={`M${cx - 60},118 Q${cx},140 ${cx + 60},118 L${cx + 150},210 L${cx + 128},250 L${cx + 92},222 L${cx + 112},480 L${cx - 112},480 L${cx - 92},222 L${cx - 128},250 L${cx - 150},210Z`} fill={`url(#${uid}f)`} />
        {/* sfifa trim and aakad buttons */}
        <path d={`M${cx - 20},124 L${cx},240 L${cx + 20},124`} fill="none" stroke={c2} strokeWidth={5} />
        <line x1={cx} y1={240} x2={cx} y2={480} stroke={c2} strokeWidth={5} />
        {Array.from({ length: 9 }, (_, i) => (
          <circle key={i} cx={cx} cy={140 + i * 12} r={3.2} fill={c2} />
        ))}
        {[-1, 1].map((s) => (
          <path key={s} d={`M${cx + s * 128},250 L${cx + s * 150},210`} stroke={c2} strokeWidth={5} />
        ))}
        {Array.from({ length: 8 }, (_, i) => (
          <path key={i} d={toPath(starPoints(cx + (i % 2 ? 22 : -22), 290 + i * 22, 5, 0.45))} fill={c2} opacity={0.8} />
        ))}
      </>
    );
  },

  bois(c1, c2) {
    // carved cedar rosette with painted zouaq accents
    const cx = W / 2;
    const cy = H / 2;
    const rings: React.ReactNode[] = [];
    for (let k = 0; k < 16; k++) {
      const a = k * 22.5;
      rings.push(
        <path key={k} transform={`rotate(${a} ${cx} ${cy})`} d={`M${cx},${cy - 30} L${cx + 26},${cy - 96} L${cx},${cy - 176} L${cx - 26},${cy - 96}Z`} fill={k % 2 ? shade(c1, -0.15) : shade(c1, 0.12)} stroke={shade(c1, -0.5)} strokeWidth={2} />,
      );
    }
    return (
      <>
        <rect width={W} height={H} fill={shade(c1, -0.35)} />
        {Array.from({ length: 26 }, (_, i) => (
          <path key={i} d={`M0,${i * 20 + 4} Q${W / 2},${i * 20 + 14 * Math.sin(i)} ${W},${i * 20 + 4}`} stroke={shade(c1, -0.5)} strokeOpacity={0.35} fill="none" />
        ))}
        <circle cx={cx} cy={cy} r={186} fill={shade(c1, -0.2)} stroke={shade(c1, -0.55)} strokeWidth={3} />
        {rings}
        <path d={toPath(starPoints(cx, cy, 44, 0.5))} fill={c2} stroke={shade(c1, -0.55)} strokeWidth={2} />
        <circle cx={cx} cy={cy} r={12} fill={GLAZES.miel} />
        {Array.from({ length: 16 }, (_, k) => {
          const a = ((k * 22.5 + 11.25) * Math.PI) / 180;
          return <circle key={k} cx={cx + Math.cos(a) * 140} cy={cy + Math.sin(a) * 140} r={6} fill={k % 2 ? GLAZES.terre : c2} />;
        })}
      </>
    );
  },

  tadelakt(c1, c2, seed, uid) {
    return (
      <>
        <defs>
          <radialGradient id={`${uid}t`} cx="30%" cy="25%" r="90%">
            <stop offset="0" stopColor={shade(c1, 0.35)} />
            <stop offset="0.55" stopColor={c1} />
            <stop offset="1" stopColor={shade(c2, -0.1)} />
          </radialGradient>
          <filter id={`${uid}n`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="3" seed={seed} />
            <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0" />
            <feComposite in2="SourceGraphic" operator="in" />
          </filter>
        </defs>
        <rect width={W} height={H} fill={`url(#${uid}t)`} />
        <rect width={W} height={H} fill="#000" filter={`url(#${uid}n)`} opacity={0.5} />
        {Array.from({ length: 22 }, (_, i) => {
          const x = hash(i + seed) * W;
          const y = hash(i * 3 + seed) * H;
          const r = 30 + hash(i * 7) * 70;
          return <path key={i} d={`M${x - r},${y} A${r},${r * 0.6} 0 0 1 ${x + r},${y}`} fill="none" stroke="#fff" strokeOpacity={0.12} strokeWidth={2 + hash(i) * 4} strokeLinecap="round" />;
        })}
        <circle cx={W * 0.72} cy={H * 0.7} r={46} fill={shade(c1, -0.2)} />
        <ellipse cx={W * 0.72 - 12} cy={H * 0.7 - 16} rx={18} ry={10} fill="#fff" opacity={0.3} />
      </>
    );
  },
};

function WoolTexture({ color, seed }: { color: string; seed: number }) {
  return (
    <g opacity={0.08}>
      {Array.from({ length: 120 }, (_, i) => {
        const x = hash(i * 3 + seed) * W;
        const y = hash(i * 5 + seed) * H;
        return <path key={i} d={`M${x},${y} q4,-6 8,0 t8,0`} stroke={color} fill="none" strokeWidth={1.5} />;
      })}
    </g>
  );
}
