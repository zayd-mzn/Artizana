# Artizana — Design Direction (v2)

## 1. Diagnosis of v1

| Area | v1 | Problem |
| --- | --- | --- |
| Logo | The word "ARTIZANA" in Playfair | No mark, no symbol, nothing ownable |
| Pattern | CSS checkerboard called `.zellige-bg` | Real zellige is 8/16-fold star geometry, not a checkerboard |
| Imagery | Emoji (👘 🪞 🏺 💎) and flat gradients | Reads as a template, not a maison |
| Colour | Terracotta + gold gradients everywhere | Generic "oriental" palette, low contrast, no system |
| Motion | `animate-bounce`, hover scale | No narrative, no interaction |
| Content | 4 categories, 12 products | Ignores most of Moroccan craft (zellige, dinanderie, cuir, bois, tadelakt) |

## 2. Concept — « La Maison des Maâlems »

A Fès zellige panel starts from a single star, the *ras al-shabaka* ("head of the net"),
and the whole pattern grows outward from it by reflection and rotation. The site does the same:
one star (the logo) opens the page, and every section grows out of that geometry.

Three rules:
1. **Geometry is real.** Every pattern is constructed from the 8-point khatam and 16-point
   rosette on a p4m lattice, with angles in multiples of 22.5°, the way a maâlem lays them out.
2. **Three scripts, like Moroccan signage.** French for reading, with Arabic (أرتيزانا) and
   Tifinagh (ⴰⵔⵜⵉⵣⴰⵏⴰ) as accents.
3. **Made, not printed.** Hand-cut tiles have slightly irregular glaze. Tiles get a tiny
   per-tile tone jitter, and the whole page has paper grain.

## 3. Logo

**Mark — « Bab ez-Zellige » (the zellige door).**
- Silhouette: a pointed Marinid horseshoe arch with a gold line, a dark band and a threshold.
- Panel: real zellige. An octagon-and-star pattern (p4m, angles in multiples of 22.5°) grows
  from one terracotta-and-white eight-point star, the *ras al-shabaka*. Every tesselle is cut
  where it meets the arch, as tiles are cut to fit a doorway. Slivers are dropped, and grout
  joints separate the pieces.
- Why not a star on its own? Two overlapping squares (v1 of this mark) form ۞, the Rub el
  Hizb, a widely used sign that no brand can own. The door silhouette filled with a specific
  pattern is ownable and reads as "Moroccan craft" without borrowing a symbol.
- Small sizes (favicon, navbar): the panel becomes a single large star, because 300+ tesselles
  turn to noise below about 80 px.

**Wordmark.** ARTIZANA in a high-contrast serif with wide tracking, with a Tifinagh line
ⴰⵔⵜⵉⵣⴰⵏⴰ underneath. The Tifinagh spelling contains ⵣ (yaz).

**Lockups:** horizontal, stacked, mark only, and a favicon (the star with the arch only).

**Pipeline:** the geometry is generated exactly in `brand/build_logo.py`, with tiles clipped to
the arch as plain polygons, and written as SVG.
**VectorCraft** (`vectorcraft-cli convert`) exports the master to PDF, `.ai`, and PNG.
**EffectCraft** (`brand/build_reveal.py` → `logo_reveal.jsx`) renders the reveal: the tesselles
are laid from the central star outward, the frame draws, and the name rises. The website
preloader plays the same story.

## 4. Colour — the five glazes of Fès + the clay

| Token | Name | Hex | Use |
| --- | --- | --- | --- |
| `chaux` | Chaux (lime white) | `#F4ECDF` | Page ground |
| `manganese` | Noir manganèse | `#17120F` | Ink, dark sections |
| `cobalt` | Bleu de Fès | `#1D3B8B` | Primary accent |
| `cuivre` | Vert cuivre | `#17654F` | Secondary accent |
| `miel` | Jaune miel | `#D6A243` | Highlights, the star |
| `terre` | Terre de Safi | `#B04A2B` | Craft warmth, CTAs |
| `sable` | Sable | `#E6D6BC` | Borders, muted surfaces |

The first five follow the traditional Fès glaze set (white, manganese black, cobalt, honey,
copper green). Terracotta is the unglazed clay underneath.

## 5. Type

- **Display:** Instrument Serif (roman + italic). Editorial, high-contrast, current.
- **Text / UI:** Manrope. Geometric but warm, and legible at small sizes.
- **Accents:** Noto Sans Tifinagh and Amiri (Arabic).

## 6. Site architecture & interactions

1. **Preloader.** The logo star draws its strapwork, the arch fills, then tiles flip outward
   to reveal the page. It is skipped for `prefers-reduced-motion` and on repeat visits.
2. **Hero — living zellige.** A full-bleed canvas of a star-and-cross tiling. Tiles near the
   cursor lift and change glaze like a maâlem placing them. A giant 16-point rosette turns on
   scroll. Headline: « L'âme des mains marocaines ».
3. **Trilingual marquee.** Craft names in French, Arabic and Tifinagh.
4. **Les Métiers (pinned horizontal scroll).** Eight crafts, each with a generative artwork,
   city and technique: Zellige (Fès), Tapis (Moyen & Haut Atlas), Poterie (Safi, Tamegroute),
   Dinanderie (Fès), Cuir (Chouara, Fès), Bijoux (Tiznit), Bois de cèdre (Fès), Tadelakt
   (Marrakech).
5. **L'Atelier Zellige (signature interaction).** Visitors compose their own panel: pick a
   pattern (8-star, 16-rosette), pick glazes, paint tiles, randomize, then « Commander ce
   motif » sends the composition to WhatsApp.
6. **Le Geste (process).** Scroll-driven steps from clay to panel: Argile, Cuisson, Émail,
   Taille au menqach, Assemblage face cachée, Scellement. Animated counters.
7. **Catalogue.** Arch-framed cards with per-product generative art instead of emoji, an
   animated filter, a quick-view drawer and a WhatsApp order button.
8. **Contact.** The same WhatsApp flow, restyled.
9. **Footer.** Oversized wordmark, the three scripts, a zellige band.

Global: Lenis smooth scroll, GSAP ScrollTrigger, split-text line reveals, arch clip-path
reveals, a magnetic CTA, a star cursor on desktop, a grain overlay, full `prefers-reduced-motion`
support, and keyboard-accessible controls.

## 7. References

- Awwwards SOTY 2025, *Lando Norris* by OFF+BRAND: a reactive hero surface, a tight
  4-colour palette, and modular storytelling. We borrow the idea of a hero that answers the
  cursor.
- Awwwards luxury category (Cartier Watches & Wonders, Maison Alaïa): editorial serif scale,
  restraint, and one signature interaction per page.
- MIT Tiling Search, Fès entries: p4m star polygons with angles in multiples of 22.5°.
