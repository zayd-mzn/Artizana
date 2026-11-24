"""Render the logo-reveal clip with EffectCraft.

EffectCraft scripts may only read files inside the project folder, so the mark's geometry and
the outlined wordmark are inlined into a generated copy of logo_reveal.jsx before it runs.

Run:  python -I brand/build_reveal.py [--no-render]
"""
import json
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import build_logo as b  # noqa: E402

EC = r"C:\Program Files\EffectCraft\effectcraft-cli.exe"
OUT = HERE / "out"


def centroid(poly):
    return [sum(p[0] for p in poly) / len(poly), sum(p[1] for p in poly) / len(poly)]


def main() -> None:
    OUT.mkdir(exist_ok=True)
    g, w = b.wordmark(0, 0, 120, b.PALETTE["chaux"], b.PALETTE["miel"])
    wordmark_svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -110 {w:.0f} 160">{g}</svg>'
    r = lambda pts: [[round(x, 2), round(y, 2)] for x, y in pts]  # noqa: E731
    data = {
        "viewBox": list(b.MARK_VB),
        "archOuter": r(b.arch_points(0, 64)),
        "archBand": r(b.arch_points(7, 64)),
        "archField": r(b.arch_points(b.FRAME, 64)),
        "sill": {"x": b.C - b.ARCH_WB - 22, "y": b.ARCH_BASE - 2, "width": (b.ARCH_WB + 22) * 2, "height": b.SILL},
        "pieces": [
            {
                "pts": r(p["poly"]),
                "c": centroid(p["poly"]),
                "dist": p["dist"],
                "fill": b.PALETTE["chaux"] if p["role"] == "edge" else b.GLAZE[p["role"]],
            }
            for p in b.PIECES
        ],
        "wordmarkSvg": wordmark_svg,
    }
    script = "var DATA = " + json.dumps(data) + ";\n" + (HERE / "logo_reveal.jsx").read_text(encoding="utf-8")
    gen = OUT / "logo_reveal.generated.jsx"
    gen.write_text(script, encoding="utf-8")
    proj = OUT / "logo-reveal.ecproj"
    subprocess.run([EC, "script", str(gen), "--empty", "--save-as", str(proj)], check=True)
    if "--no-render" not in sys.argv:
        subprocess.run([EC, "render", "--project", str(proj), "--comp", "Artizana reveal",
                        "--out", str(HERE / "kit" / "artizana-logo-reveal.mp4"),
                        "--format", "h264", "--quality", "best"], check=True)


if __name__ == "__main__":
    main()
