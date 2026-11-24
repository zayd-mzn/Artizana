/**
 * Zellige geometry.
 *
 * Every pattern lives on a square lattice with p4m symmetry (mirrors on the axes and the
 * diagonals through each star), the symmetry group of most Fès star panels. Angles are
 * multiples of 22.5°. Each tile carries an `orbit` key: tiles with the same key are images
 * of each other under the symmetry, so painting one orbit keeps the panel symmetric, the
 * way a maâlem grows a panel outward from its central star (ras al-shabaka).
 */

export type Pt = [number, number];

export interface Tile {
  points: Pt[];
  cx: number;
  cy: number;
  orbit: string;
  /** coarse role, used to pick default glazes */
  role: "heart" | "point" | "cross" | "gem" | "edge" | "link";
}

export type PatternId = "khatam" | "octagone";

const TAU = Math.PI * 2;
const deg = (d: number) => (d * Math.PI) / 180;
const polar = (cx: number, cy: number, r: number, a: number): Pt => [
  cx + r * Math.cos(deg(a)),
  cy + r * Math.sin(deg(a)),
];

/** khatam proportion: inner radius of the star formed by two squares */
export const KHATAM_INNER = 1 / (Math.SQRT2 * Math.cos(deg(22.5)));

function centroid(points: Pt[]): Pt {
  let x = 0;
  let y = 0;
  for (const p of points) {
    x += p[0];
    y += p[1];
  }
  return [x / points.length, y / points.length];
}

/** Fold a point into the fundamental triangle of p4m and return a stable key. */
function orbitKey(x: number, y: number, s: number): string {
  let fx = ((x % s) + s) % s;
  let fy = ((y % s) + s) % s;
  if (fx > s / 2) fx = s - fx;
  if (fy > s / 2) fy = s - fy;
  if (fy > fx) [fx, fy] = [fy, fx];
  return `${Math.round((fx / s) * 200)}:${Math.round((fy / s) * 200)}`;
}

function tile(points: Pt[], role: Tile["role"], s: number): Tile {
  const [cx, cy] = centroid(points);
  return { points, cx, cy, role, orbit: orbitKey(cx, cy, s) };
}

/** 8-point star (16 vertices) centred on (cx, cy). Tip at angle `rot`. */
export function starPoints(cx: number, cy: number, r: number, inner = KHATAM_INNER, rot = 0): Pt[] {
  const pts: Pt[] = [];
  for (let k = 0; k < 16; k++) pts.push(polar(cx, cy, k % 2 === 0 ? r : r * inner, rot + 22.5 * k));
  return pts;
}

/**
 * Star-and-cross (khatam): 8-point stars on every lattice node, tips touching along the axes,
 * with cross-shaped tiles between them. Each star is cut into a central octagon and eight
 * points, which gives the composer distinct pieces to glaze.
 */
function khatam(cols: number, rows: number, s: number, ox: number, oy: number): Tile[] {
  const R = s / 2;
  const rin = R * KHATAM_INNER;
  const tiles: Tile[] = [];
  for (let j = -1; j <= rows + 1; j++) {
    for (let i = -1; i <= cols + 1; i++) {
      const cx = ox + i * s;
      const cy = oy + j * s;
      const inner: Pt[] = [];
      for (let k = 0; k < 8; k++) inner.push(polar(cx, cy, rin, 22.5 + 45 * k));
      tiles.push(tile(inner, "heart", s));
      for (let k = 0; k < 8; k++) {
        const tip = polar(cx, cy, R, 45 * k);
        tiles.push(tile([inner[(k + 7) % 8], tip, inner[k]], "point", s));
      }
      // cross centred on the half-lattice point to the lower right
      const cross: Pt[] = [];
      // walk the boundary: each neighbouring star contributes the chain of its outline that
      // faces the cross, and consecutive chains share a tip
      const around: [number, number, number][] = [
        [cx, cy, 0],           // top-left star: east tip → south tip
        [cx, cy + s, 270],     // bottom-left star: north tip → east tip
        [cx + s, cy + s, 180], // bottom-right star: west tip → north tip
        [cx + s, cy, 90],      // top-right star: south tip → west tip
      ];
      for (const [sx, sy, a0] of around) {
        for (let k = 0; k < 4; k++) cross.push(polar(sx, sy, k % 2 === 0 ? R : rin, a0 + 22.5 * k));
      }
      tiles.push(tile(cross, "cross", s));
    }
  }
  return tiles;
}

/**
 * Octagon-and-square with an inscribed khatam: octagons meet edge to edge, small squares
 * (« gems ») sit in the gaps, and each octagon holds a star with triangles around it.
 */
function octagone(cols: number, rows: number, s: number, ox: number, oy: number): Tile[] {
  const apo = s / 2;
  const Ro = apo / Math.cos(deg(22.5)); // octagon circumradius
  const tiles: Tile[] = [];
  for (let j = -1; j <= rows + 1; j++) {
    for (let i = -1; i <= cols + 1; i++) {
      const cx = ox + i * s;
      const cy = oy + j * s;
      const oct: Pt[] = [];
      for (let k = 0; k < 8; k++) oct.push(polar(cx, cy, Ro, 22.5 + 45 * k));
      // star inscribed in the octagon: tips on the octagon's vertices, inner vertices at 45°·k
      const innerV: Pt[] = [];
      for (let k = 0; k < 8; k++) innerV.push(polar(cx, cy, Ro * 0.52, 45 * k));
      tiles.push(tile(innerV, "heart", s));
      for (let k = 0; k < 8; k++) {
        const next = (k + 1) % 8;
        tiles.push(tile([innerV[k], oct[k], innerV[next]], "point", s));
        // triangle between the star and the octagon edge oct[k]–oct[k+1]
        tiles.push(tile([oct[k], oct[next], innerV[next]], "edge", s));
      }
      // diamond-shaped gem at the lower-right half-lattice point
      const gx = cx + s / 2;
      const gy = cy + s / 2;
      const side = Ro * Math.sin(deg(22.5)) * 2; // octagon side
      const h = side / Math.SQRT2;
      tiles.push(tile([[gx, gy - h], [gx + h, gy], [gx, gy + h], [gx - h, gy]], "gem", s));
    }
  }
  return tiles;
}

export function buildPattern(id: PatternId, cols: number, rows: number, s: number, ox = 0, oy = 0): Tile[] {
  return id === "khatam" ? khatam(cols, rows, s, ox, oy) : octagone(cols, rows, s, ox, oy);
}

export function toPath(points: Pt[]): string {
  return "M" + points.map((p) => `${p[0].toFixed(2)},${p[1].toFixed(2)}`).join("L") + "Z";
}

/** The five glazes of Fès plus clay and a few traditional secondaries. */
export const GLAZES = {
  chaux: "#F4ECDF",
  manganese: "#17120F",
  cobalt: "#1D3B8B",
  cuivre: "#17654F",
  miel: "#D6A243",
  terre: "#B04A2B",
  turquoise: "#2C8C99",
  aubergine: "#4A2340",
} as const;

export type GlazeName = keyof typeof GLAZES;

export const GLAZE_LABELS: Record<GlazeName, string> = {
  chaux: "Blanc chaux",
  manganese: "Noir manganèse",
  cobalt: "Bleu de Fès",
  cuivre: "Vert cuivre",
  miel: "Jaune miel",
  terre: "Terre de Safi",
  turquoise: "Turquoise",
  aubergine: "Aubergine",
};

/** Deterministic pseudo-random in [0, 1) for tone jitter (hand-made glaze variation). */
export function hash(n: number): number {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

/** Lighten / darken a hex colour by `amt` (-1..1). */
export function shade(hex: string, amt: number): string {
  const n = parseInt(hex.slice(1), 16);
  let r = (n >> 16) & 255;
  let g = (n >> 8) & 255;
  let b = n & 255;
  const t = amt < 0 ? 0 : 255;
  const p = Math.abs(amt);
  r = Math.round((t - r) * p + r);
  g = Math.round((t - g) * p + g);
  b = Math.round((t - b) * p + b);
  return `rgb(${r},${g},${b})`;
}

export { TAU };
