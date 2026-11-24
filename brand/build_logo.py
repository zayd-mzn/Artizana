"""Artizana brand mark generator.

The mark, « Bab ez-Zellige » (the zellige door): a pointed Marinid horseshoe arch whose panel is
laid with real zellige. An octagon-and-star pattern grows from a central eight-point star
(the ras al-shabaka), and the tesselles are cut exactly where they meet the arch, as a maâlem
cuts tiles to fit a doorway. Every piece is a plain polygon (clipped here, not with SVG
clip-paths), so VectorCraft, EffectCraft and browsers all read it the same way.

Wordmark glyphs are converted to outlines with fontTools, so the SVGs need no fonts.

Run:  python -I brand/build_logo.py      (writes brand/out/, public/brand/, src/brand/geometry.ts)
"""

from __future__ import annotations

import json
import math
from pathlib import Path

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

HERE = Path(__file__).resolve().parent
OUT = HERE / "out"
PUBLIC = HERE.parent / "public" / "brand"
FONTS = HERE / "fonts"

PALETTE = {
    "chaux": "#F4ECDF",
    "manganese": "#17120F",
    "cobalt": "#1D3B8B",
    "cuivre": "#17654F",
    "miel": "#D6A243",
    "terre": "#B04A2B",
}

Pt = tuple[float, float]

# ---------------------------------------------------------------- arch

C = 256.0            # horizontal centre of the mark
ARCH_CY = 236.0      # height of the two arc centres
ARCH_R = 196.0       # arc radius
ARCH_D = 44.0        # centre offset → pointed apex
ARCH_WB = 142.0      # half-width at the jambs (< R - D → horseshoe return)
ARCH_BASE = 470.0    # threshold
FRAME = 17.0         # frame thickness (miel line + cobalt band)
SILL = 12.0          # threshold bar height


def arch_points(inset: float = 0.0, n: int = 48) -> list[Pt]:
    """Arch outline, optionally inset by `inset` (same centres, smaller radius)."""
    r = ARCH_R - inset
    wb = ARCH_WB - inset
    base = ARCH_BASE - (inset if inset else 0)
    dx = (C - wb) - (C + ARCH_D)
    spring_y = ARCH_CY + math.sqrt(r * r - dx * dx)
    apex_y = ARCH_CY - math.sqrt(r * r - ARCH_D * ARCH_D)
    a0 = math.atan2(spring_y - ARCH_CY, dx)                       # left spring, seen from the right-hand centre
    a1 = math.atan2(apex_y - ARCH_CY, C - (C + ARCH_D)) + 2 * math.pi  # apex
    b0 = math.atan2(apex_y - ARCH_CY, C - (C - ARCH_D)) + 2 * math.pi
    b1 = math.atan2(spring_y - ARCH_CY, (C + wb) - (C - ARCH_D)) + 2 * math.pi
    pts: list[Pt] = [(C - wb, base)]
    for i in range(n + 1):
        a = a0 + (a1 - a0) * i / n
        pts.append((C + ARCH_D + r * math.cos(a), ARCH_CY + r * math.sin(a)))
    for i in range(1, n + 1):
        a = b0 + (b1 - b0) * i / n
        pts.append((C - ARCH_D + r * math.cos(a), ARCH_CY + r * math.sin(a)))
    pts.append((C + wb, base))
    return pts


def path(points: list[Pt]) -> str:
    return "M" + "L".join(f"{x:.2f},{y:.2f}" for x, y in points) + "Z"


# ---------------------------------------------------------------- zellige

S = 74.0                       # lattice spacing
ORIGIN: Pt = (C, 268.0)        # the ras al-shabaka sits on this lattice node


def polar(cx: float, cy: float, r: float, deg: float) -> Pt:
    a = math.radians(deg)
    return (cx + r * math.cos(a), cy + r * math.sin(a))


def octagone_tiles() -> list[tuple[list[Pt], str, Pt]]:
    """Octagon-and-square tiling with an eight-point star inscribed in each octagon.
    Returns (polygon, role, lattice node) — same construction as src/lib/zellige.ts."""
    ro = (S / 2) / math.cos(math.radians(22.5))
    side = ro * math.sin(math.radians(22.5)) * 2
    h = side / math.sqrt(2)
    tiles = []
    for j in range(-5, 6):
        for i in range(-4, 5):
            cx, cy = ORIGIN[0] + i * S, ORIGIN[1] + j * S
            node = (cx, cy)
            octv = [polar(cx, cy, ro, 22.5 + 45 * k) for k in range(8)]
            inner = [polar(cx, cy, ro * 0.52, 45 * k) for k in range(8)]
            tiles.append((inner, "heart", node))
            for k in range(8):
                nk = (k + 1) % 8
                tiles.append(([inner[k], octv[k], inner[nk]], "point", node))
                tiles.append(([octv[k], octv[nk], inner[nk]], "edge", node))
            gx, gy = cx + S / 2, cy + S / 2
            tiles.append(([(gx, gy - h), (gx + h, gy), (gx, gy + h), (gx - h, gy)], "gem", node))
    return tiles


def shrink(poly: list[Pt], by: float) -> list[Pt]:
    """Pull every vertex toward the centroid: leaves a grout joint between tesselles."""
    cx = sum(p[0] for p in poly) / len(poly)
    cy = sum(p[1] for p in poly) / len(poly)
    out = []
    for x, y in poly:
        d = math.hypot(x - cx, y - cy) or 1
        k = max(0.0, (d - by) / d)
        out.append((cx + (x - cx) * k, cy + (y - cy) * k))
    return out


def area(poly: list[Pt]) -> float:
    return abs(sum(poly[i][0] * poly[i - 1][1] - poly[i - 1][0] * poly[i][1] for i in range(len(poly)))) / 2


def clip(subject: list[Pt], window: list[Pt]) -> list[Pt]:
    """Sutherland–Hodgman: clip `subject` (any simple polygon) to a CONVEX `window`."""
    # orientation of the window
    s = sum(window[i][0] * window[i - 1][1] - window[i - 1][0] * window[i][1] for i in range(len(window)))
    sign = -1 if s > 0 else 1

    def inside(p: Pt, a: Pt, b: Pt) -> bool:
        return sign * ((b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0])) >= 0

    def cross(p: Pt, q: Pt, a: Pt, b: Pt) -> Pt:
        x1, y1, x2, y2 = p[0], p[1], q[0], q[1]
        x3, y3, x4, y4 = a[0], a[1], b[0], b[1]
        den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)
        if abs(den) < 1e-12:
            return q
        t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den
        return (x1 + t * (x2 - x1), y1 + t * (y2 - y1))

    out = subject
    for i in range(len(window)):
        a, b = window[i - 1], window[i]
        inp, out = out, []
        if not inp:
            break
        prev = inp[-1]
        for cur in inp:
            if inside(cur, a, b):
                if not inside(prev, a, b):
                    out.append(cross(prev, cur, a, b))
                out.append(cur)
            elif inside(prev, a, b):
                out.append(cross(prev, cur, a, b))
            prev = cur
    return out


GLAZE = {  # role → glaze, colour variant
    "heart": PALETTE["miel"],
    "point": PALETTE["cobalt"],
    "edge": "#FBF6EE",
    "gem": PALETTE["cuivre"],
    "heart*": PALETTE["chaux"],   # the ras al-shabaka
    "point*": PALETTE["terre"],
}


def pieces() -> list[dict]:
    """The cut tesselles inside the arch, ordered from the central star outward."""
    field = arch_points(FRAME)
    out = []
    for poly, role, node in octagone_tiles():
        cut = clip(field, poly)  # the convex tile is the clip window, the arch the subject
        if len(cut) < 3 or area(cut) < 26:
            continue  # a maâlem would not lay a sliver
        centre = node == ORIGIN and role in ("heart", "point")
        cx = sum(p[0] for p in cut) / len(cut)
        cy = sum(p[1] for p in cut) / len(cut)
        out.append({
            "poly": shrink(cut, 1.9),
            "role": role + ("*" if centre else ""),
            "dist": math.hypot(cx - ORIGIN[0], cy - ORIGIN[1]),
        })
    out.sort(key=lambda p: p["dist"])
    return out


PIECES = pieces()


def star(cx: float, cy: float, r: float, inner: float = 0.42, rot: float = -90) -> list[Pt]:
    return [polar(cx, cy, r if k % 2 == 0 else r * inner, rot + 22.5 * k) for k in range(16)]


# ---------------------------------------------------------------- mark

MARK_VB = (C - 176, 26.0, 352.0, 470.0)  # x, y, w, h of the mark's frame
MARK_ASPECT = MARK_VB[2] / MARK_VB[3]


def mark_inner(variant: str = "color") -> str:
    """variant: color | reverse (on dark) | mono (one ink, cut-out joints) | favicon."""
    outer, frame_in = arch_points(0), arch_points(7)
    field = arch_points(FRAME)
    sill = f'<rect x="{C - ARCH_WB - 22:.2f}" y="{ARCH_BASE - 2:.2f}" width="{(ARCH_WB + 22) * 2:.2f}" height="{SILL}" rx="2"'

    if variant == "mono":
        body = [f'<path d="{path(outer)}" fill="currentColor"/>',
                f'<path d="{path(field)}" fill="var(--logo-cut, #fff)"/>']
        body += [f'<path d="{path(p["poly"])}" fill="currentColor"/>' for p in PIECES]
        body.append(f'{sill} fill="currentColor"/>')
        return "".join(body)

    line, band_, grout = PALETTE["miel"], PALETTE["cobalt"], "#E2D3B9"
    if variant == "reverse":
        band_, grout = PALETTE["manganese"], "#2A211B"
    body = [
        f'<path d="{path(outer)}" fill="{line}"/>',
        f'<path d="{path(frame_in)}" fill="{band_}"/>',
        f'<path d="{path(field)}" fill="{grout}"/>',
    ]
    if variant == "favicon":
        # too small for tesselles: one large ras al-shabaka star in the door
        body.append(f'<path d="{path(field)}" fill="{PALETTE["chaux"]}"/>')
        body.append(f'<path d="{path(star(C, 262, 104, 0.5))}" fill="{PALETTE["cobalt"]}"/>')
        body.append(f'<path d="{path(star(C, 262, 40, 0.5, -78.75))}" fill="{PALETTE["miel"]}"/>')
    else:
        for p in PIECES:
            fill = GLAZE[p["role"]]
            if variant == "reverse" and p["role"] == "edge":
                fill = PALETTE["chaux"]
            body.append(f'<path d="{path(p["poly"])}" fill="{fill}"/>')
    body.append(f'{sill} fill="{line}"/>')
    return "".join(body)


def mark_svg(variant: str = "color", height: int = 470) -> str:
    x, y, w, h = MARK_VB
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{x:.0f} {y:.0f} {w:.0f} {h:.0f}" '
            f'width="{height * MARK_ASPECT:.0f}" height="{height}" role="img" aria-label="Artizana">'
            f'{mark_inner(variant)}</svg>')


def favicon_svg() -> str:
    """Square favicon: the door centred on a square."""
    x, y, w, h = MARK_VB
    pad = (h - w) / 2
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{x - pad:.0f} {y:.0f} {h:.0f} {h:.0f}" width="64" height="64">'
            f'{mark_inner("favicon")}</svg>')


def place_mark(variant: str, x: float, y: float, height: float) -> str:
    """The mark as a group whose frame's top-left is (x, y), scaled to `height`."""
    vx, vy, _, vh = MARK_VB
    s = height / vh
    return f'<g transform="translate({x:.2f},{y:.2f}) scale({s:.5f}) translate({-vx:.2f},{-vy:.2f})">{mark_inner(variant)}</g>'


# ---------------------------------------------------------------- type → outlines


def text_path(font_file: str, text: str, size: float, x: float, y: float, tracking: float = 0.0) -> tuple[str, float]:
    """Return (svg path d, advance width) for text set at baseline (x, y)."""
    font = TTFont(FONTS / font_file)
    gs = font.getGlyphSet()
    cmap = font.getBestCmap()
    s = size / font["head"].unitsPerEm
    pen = SVGPathPen(gs)
    cursor = 0.0
    for ch in text:
        gname = cmap.get(ord(ch))
        if gname is None:
            raise ValueError(f"{font_file} has no glyph for {ch!r}")
        gs[gname].draw(TransformPen(pen, (s, 0, 0, -s, x + cursor, y)))
        cursor += gs[gname].width * s + tracking
    return pen.getCommands(), cursor - tracking


def wordmark(x: float, y: float, size: float, color: str, accent: str, align: str = "left") -> tuple[str, float]:
    word, w = text_path("InstrumentSerif-Regular.ttf", "ARTIZANA", size, 0, 0, tracking=size * 0.16)
    tif_size = size * 0.30
    tif, tw = text_path("NotoSansTifinagh-Regular.ttf", "ⴰⵔⵜⵉⵣⴰⵏⴰ", tif_size, 0, 0, tracking=tif_size * 0.38)
    ox = x - (w / 2 if align == "center" else 0)
    tx = ox + (w - tw) / 2
    ty = y + size * 0.42
    rule_y = y + size * 0.20
    rule_w = (w - tw) / 2 - size * 0.18
    g = (
        f'<g transform="translate({ox:.2f},{y:.2f})"><path d="{word}" fill="{color}"/></g>'
        f'<g transform="translate({tx:.2f},{ty:.2f})"><path d="{tif}" fill="{accent}"/></g>'
        f'<rect x="{ox:.2f}" y="{rule_y - 0.6:.2f}" width="{rule_w:.2f}" height="1.2" fill="{accent}"/>'
        f'<rect x="{tx + tw + size * 0.18:.2f}" y="{rule_y - 0.6:.2f}" width="{rule_w:.2f}" height="1.2" fill="{accent}"/>'
    )
    return g, w


def horizontal(theme: str = "light") -> str:
    ink = PALETTE["manganese"] if theme == "light" else PALETTE["chaux"]
    variant = "color" if theme == "light" else "reverse"
    mark_h = 200
    mark_w = mark_h * MARK_ASPECT
    words, w = wordmark(mark_w + 56, 128, 96, ink, PALETTE["miel"] if theme == "dark" else PALETTE["cobalt"])
    W = mark_w + 56 + w + 24
    bg = "" if theme == "light" else f'<rect width="{W:.0f}" height="220" fill="{PALETTE["manganese"]}"/>'
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W:.0f} 220" role="img" aria-label="Artizana">'
            f'{bg}{place_mark(variant, 20, 10, mark_h)}{words}</svg>')


def stacked(theme: str = "light") -> str:
    ink = PALETTE["manganese"] if theme == "light" else PALETTE["chaux"]
    variant = "color" if theme == "light" else "reverse"
    mark_h = 330
    words, _ = wordmark(300, 448, 92, ink, PALETTE["miel"] if theme == "dark" else PALETTE["cobalt"], align="center")
    bg = "" if theme == "light" else f'<rect width="600" height="540" fill="{PALETTE["manganese"]}"/>'
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 540" role="img" aria-label="Artizana">'
            f'{bg}{place_mark(variant, 300 - mark_h * MARK_ASPECT / 2, 18, mark_h)}{words}</svg>')


def og_image() -> str:
    """1200 × 630 social card."""
    mark_h = 330
    words, _ = wordmark(600, 470, 110, PALETTE["chaux"], PALETTE["miel"], align="center")
    tile = zellige_tile_pattern("og", 90, PALETTE["manganese"], "#231b16")
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">'
            f'<defs>{tile}</defs><rect width="1200" height="630" fill="{PALETTE["manganese"]}"/>'
            f'<rect width="1200" height="630" fill="url(#og)"/>'
            f'{place_mark("reverse", 600 - mark_h * MARK_ASPECT / 2, 34, mark_h)}{words}</svg>')


def zellige_tile_pattern(pid: str, s: float, ground: str, line: str) -> str:
    """Faint background pattern of eight-point stars."""
    pts = star(s / 2, s / 2, s * 0.5, 0.6, 0)
    return (f'<pattern id="{pid}" width="{s}" height="{s}" patternUnits="userSpaceOnUse">'
            f'<rect width="{s}" height="{s}" fill="{ground}"/>'
            f'<path d="{path(pts)}" fill="none" stroke="{line}" stroke-width="2"/></pattern>')


def line_mark(color: str) -> str:
    """Line-art mark for watermarks: the door and every tesselle, outlined."""
    x, y, w, h = MARK_VB
    style = f'fill="none" stroke="{color}" stroke-linejoin="round"'
    body = [f'<path d="{path(arch_points(0))}" {style} stroke-width="5"/>']
    body += [f'<path d="{path(p["poly"])}" {style} stroke-width="2"/>' for p in PIECES]
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{x:.0f} {y:.0f} {w:.0f} {h:.0f}">{"".join(body)}</svg>'


def band() -> str:
    """Repeatable horizontal zellige band (a row of stars between two rules)."""
    w = h = 28.0
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.0f} {h:.0f}" width="{w:.0f}" height="{h:.0f}">'
            f'<rect width="{w:.0f}" height="{h:.0f}" fill="{PALETTE["cobalt"]}"/>'
            f'<path d="{path(star(w / 2, h / 2, 11.5, 0.62, 0))}" fill="{PALETTE["miel"]}"/>'
            f'<circle cx="{w / 2}" cy="{h / 2}" r="3" fill="{PALETTE["cobalt"]}"/>'
            f'<path d="M0,0.75H{w:.0f}M0,{h - 0.75:.2f}H{w:.0f}" stroke="{PALETTE["chaux"]}" stroke-width="1.5"/></svg>')


def main() -> None:
    OUT.mkdir(exist_ok=True)
    PUBLIC.mkdir(parents=True, exist_ok=True)
    files = {
        "artizana-mark.svg": mark_svg("color"),
        "artizana-mark-reverse.svg": mark_svg("reverse"),
        "artizana-mark-mono.svg": mark_svg("mono"),
        "artizana-favicon.svg": favicon_svg(),
        "artizana-horizontal.svg": horizontal("light"),
        "artizana-horizontal-dark.svg": horizontal("dark"),
        "artizana-stacked.svg": stacked("light"),
        "artizana-stacked-dark.svg": stacked("dark"),
        "artizana-og.svg": og_image(),
        "artizana-mark-mono-light.svg": line_mark(PALETTE["chaux"]),
        "band.svg": band(),
    }
    for name, svg in files.items():
        (OUT / name).write_text(svg, encoding="utf-8")
        (PUBLIC / name).write_text(svg, encoding="utf-8")

    # geometry the website reuses (preloader animation, Logo component)
    x, y, w, h = MARK_VB
    pieces_ts = [{"d": path(p["poly"]), "fill": GLAZE[p["role"]], "dist": round(p["dist"], 1)} for p in PIECES]
    ts = (
        "// Generated by brand/build_logo.py — do not edit by hand.\n"
        f'export const MARK_VIEWBOX = "{x:.0f} {y:.0f} {w:.0f} {h:.0f}";\n'
        f"export const ARCH_OUTER = {json.dumps(path(arch_points(0)))};\n"
        f"export const ARCH_BAND = {json.dumps(path(arch_points(7)))};\n"
        f"export const ARCH_FIELD = {json.dumps(path(arch_points(FRAME)))};\n"
        f"export const SILL = {json.dumps({'x': round(C - ARCH_WB - 22, 2), 'y': ARCH_BASE - 2, 'width': round((ARCH_WB + 22) * 2, 2), 'height': SILL})};\n"
        f"export const PIECES: {{ d: string; fill: string; dist: number }}[] = {json.dumps(pieces_ts)};\n"
        f"export const MARK_INNER = {json.dumps(mark_inner('color'))};\n"
        f"export const MARK_INNER_REVERSE = {json.dumps(mark_inner('reverse'))};\n"
        f"export const MARK_INNER_SMALL = {json.dumps(mark_inner('favicon'))};\n"
    )
    ts_path = HERE.parent / "src" / "brand" / "geometry.ts"
    ts_path.parent.mkdir(parents=True, exist_ok=True)
    ts_path.write_text(ts, encoding="utf-8")
    print(f"wrote {len(files)} svgs, {len(PIECES)} tesselles, and {ts_path.relative_to(HERE.parent)}")


if __name__ == "__main__":
    main()
