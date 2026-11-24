# Artizana

Marketing site for Artizana, a seller of handmade Moroccan crafts: zellige, rugs, pottery,
dinanderie, leather, silver jewellery and djellabas. The site is in French, with Arabic and
Tifinagh accents.

The design direction, palette, type and the reasoning behind them are in [DESIGN.md](DESIGN.md).

## What's on the page

| Section | Component | What it does |
| --- | --- | --- |
| Preloader | `Preloader.tsx` | The logo's tesselles are laid from the central star outward, then the screen opens in a wave of tiles. It plays once per session and is skipped with reduced motion. |
| Hero « La lanterne » | `Hero.tsx`, `ZelligeCanvas.tsx` | A canvas wall of khatam zellige lit by the pointer. A click re-glazes the wall in a ripple. |
| Marquee | `Marquee.tsx` | Craft names in French and Arabic. |
| Les Métiers | `Metiers.tsx` | Eight crafts in a pinned horizontal scroll on desktop, a swipe row on mobile. |
| L'Atelier | `Atelier.tsx` | A zellige composer. Painting one piece glazes all its symmetric twins. Export as SVG, or send the design to WhatsApp. |
| Le Geste | `Geste.tsx` | Six steps from clay to panel, with a sticky illustration, plus counters. |
| La Collection | `Products.tsx` | Filterable catalogue with generated artwork, a quick-view dialog and WhatsApp ordering. |
| Contact / Footer | `Contact.tsx`, `Footer.tsx` | A WhatsApp form and the trilingual wordmark. |

Motion is handled by `Motion.tsx`: Lenis smooth scroll, GSAP ScrollTrigger and SplitText.
Elements opt in with `data-reveal="lines" | "fade" | "arch"` and `data-magnetic`.
Everything respects `prefers-reduced-motion`.

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router, Turbopack), [React](https://react.dev) 19
- [Tailwind CSS](https://tailwindcss.com) 4, design tokens in `src/app/globals.css`
- [GSAP](https://gsap.com) 3 (ScrollTrigger, SplitText) and [Lenis](https://lenis.darkroom.engineering)
- Fonts through `next/font`: Instrument Serif, Manrope, Noto Sans Tifinagh, Amiri

## Getting started

Requires Node.js 20 or later.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start the development server |
| `npm run build` | Create a production build    |
| `npm run start` | Serve the production build   |
| `npm run lint`  | Run ESLint                   |

## Project structure

```
brand/                 # logo source, fonts and generated brand kit
├── build_logo.py      # generates every logo SVG + src/brand/geometry.ts
├── build_reveal.py    # renders the logo-reveal clip with EffectCraft
├── logo_reveal.jsx    # EffectCraft (After Effects-style) animation script
└── kit/               # exports: PDF, .ai, PNG, MP4
public/brand/          # logo SVGs, favicon, social image, zellige band
src/
├── app/               # layout (fonts, metadata), globals.css, page
├── brand/geometry.ts  # generated logo paths used by the site
├── components/        # one component per section, plus CraftArt, Logo, Motion
├── data/              # crafts.ts and products.ts
└── lib/               # zellige.ts (pattern geometry), whatsapp.ts
```

## The brand kit

The mark is « Bab ez-Zellige »: a Marinid horseshoe door laid with zellige that grows from a
central eight-point star. It is generated from exact geometry, not drawn by hand.

```bash
python -I brand/build_logo.py     # SVGs → brand/out, public/brand, src/brand/geometry.ts
python -I brand/build_reveal.py   # EffectCraft project + brand/kit/artizana-logo-reveal.mp4
```

The PDF, `.ai` and PNG exports in `brand/kit/` come from VectorCraft's headless CLI, for
example:

```bash
vectorcraft-cli convert brand/out/artizana-mark.svg brand/kit/artizana-mark.pdf
vectorcraft-cli convert brand/out/artizana-og.svg public/brand/artizana-og.png
```

The wordmark glyphs are converted to outlines, so the SVGs don't need any fonts installed.
The fonts in `brand/fonts/` are under the SIL Open Font License.

## Editing content

- **Products:** `src/data/products.ts`. Each product picks a generative `art` variant and two
  `colors`. Replace these with photos when the shop has them.
- **Crafts (Les Métiers):** `src/data/crafts.ts`.
- **WhatsApp number:** `src/lib/whatsapp.ts`. It is still the v1 placeholder `212600000000`.
- **Page title, description, social image:** `metadata` in `src/app/layout.tsx`.

## Deployment

The site builds as static content, so it deploys to any Next.js host. [Vercel](https://vercel.com/new)
works without extra configuration.
