# Artizana

Website for Artizana, a shop in Fès that sells handmade Moroccan crafts: zellige, Berber rugs,
pottery, dinanderie, leather, silver jewellery and djellabas. The site is in French, with
Arabic and Tifinagh accents.

The site has no cart or online payment. Every « Commander » button opens WhatsApp with a
pre-filled message, and the shop confirms the piece, the price and the delivery there.

The page structure follows the « Création et conception d'un SWM » brief (pages a merchant site
needs and what each one contains). The visual direction, palette and type are explained in
[DESIGN.md](DESIGN.md).

## Pages

| URL | File | Contents |
| --- | --- | --- |
| `/` | `src/app/page.tsx` | Hero on the zellige wall, reassurance strip, categories, current offers, featured products, « Qui sommes-nous ? », testimonials, latest blog posts, closing CTA |
| `/collections` | `src/app/collections/page.tsx` | All categories, then every product with filter and sort |
| `/collections/[category]` | `src/app/collections/[category]/page.tsx` | One page per category (6), filter by subcategory, sort by price or name |
| `/produits/[slug]` | `src/app/produits/[slug]/page.tsx` | One page per product (17): title, description, specs, visuals, price TTC, reviews, WhatsApp CTA, suggestions |
| `/a-propos` | `src/app/a-propos/page.tsx` | Story, values, figures, Les Métiers, Le Geste, testimonials |
| `/atelier` | `src/app/atelier/page.tsx` | Zellige composer: pick a pattern and glazes, export SVG, request a quote on WhatsApp |
| `/contact` | `src/app/contact/page.tsx` | Contact form (sent through WhatsApp), address, phone, email, map and directions |
| `/faq` | `src/app/faq/page.tsx` | Payment, delivery, returns and guarantee, with FAQ structured data for search engines |
| `/blog`, `/blog/[slug]` | `src/app/blog/` | Articles, each linking to the products it mentions |
| `/mentions-legales` | `src/app/mentions-legales/page.tsx` | Legal notice (required) |
| `/politique-de-confidentialite` | `src/app/politique-de-confidentialite/page.tsx` | Privacy policy (required) |

The header (`Navbar.tsx`) and footer (`Footer.tsx`) are rendered once in `src/app/layout.tsx`
and appear on every page. The footer holds the legal links, useful links, social links and the
newsletter signup.

All pages are generated at build time: 41 in total, including one per category, product and
article. An unknown product, category or article slug returns a 404.

## Editing content

Almost all text lives in `src/data/`, so most edits don't touch the components.

| What | File | Notes |
| --- | --- | --- |
| Products | `src/data/products.ts` | Name, `slug` (the URL), category, subcategory, price range, description, details, material, technique, care, badge. `art` and `colors` choose the generated illustration. |
| Categories | `src/data/products.ts` | `categories`. Adding one also needs a product in it, since the category page uses its first product as the cover. |
| Shop details | `src/data/site.ts` | `shop`: phone, email, address, hours, map position, social links |
| Reassurance strip | `src/data/site.ts` | `reassurance` (the four points under the hero) |
| Offers | `src/data/site.ts` | `promotions` (« Les bons plans du moment ») |
| Testimonials and reviews | `src/data/site.ts` | `testimonials` for the home and about pages, `productReviews` per category for product pages |
| FAQ | `src/data/site.ts` | `faq`, grouped by topic |
| Blog articles | `src/data/posts.ts` | A body line starting with `## ` becomes a subheading. `related` lists product slugs. |
| Crafts (Les Métiers) | `src/data/crafts.ts` | The eight crafts on the about page |
| WhatsApp number | `src/lib/whatsapp.ts` | International format without `+` or spaces. Keep `shop.phone` in `site.ts` in sync. |
| Legal pages | `src/app/mentions-legales/`, `src/app/politique-de-confidentialite/` | Text is inline in each page |
| Site title, description, social image | `src/app/layout.tsx` | `metadata`. Each page sets its own title and description too. |

### Placeholders to replace before launch

These are written to look finished but are not real shop data yet:

- **Contact:** the email, the street address, the map position (a general point in Fès
  el-Bali) and the Instagram and Facebook links (`src/data/site.ts`).
- **Policies:** delivery in 48–72 h, cash on delivery, 7-day returns, free delivery from
  1 000 MAD, quote within 24 h, 2–6 weeks for custom work. They appear in the FAQ, the
  reassurance strip, the offers, the product pages and the legal notice.
- **Reviews:** every testimonial and product review is invented and labelled « avis
  d'exemple » on the site.
- **About page:** the founding story (2021) and the figures (50+ maâlems, 12 apprentices). The
  hero text also mentions « plus de cinquante maâlems », and the Le Geste figures
  (`src/components/Geste.tsx`) add « 15 ans d'expérience » and « 500+ pièces uniques ». The
  15 years doesn't match a 2021 founding, so one of the two needs changing.
- **Products:** images are generated illustrations, not photos. Prices, materials, techniques
  and care instructions need checking.
- **Legal pages:** fields in `[brackets]` (legal form, RC, IF, ICE, Patente, host, CNDP number,
  data retention). Both pages should be reviewed by a legal adviser.
- **Newsletter:** the form opens an email to the shop, because there is no newsletter service
  yet (`src/components/NewsletterForm.tsx`).

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router, Turbopack) with Cache Components and Partial
  Prefetching enabled in `next.config.ts`
- [React](https://react.dev) 19 and TypeScript
- [Tailwind CSS](https://tailwindcss.com) 4, with the design tokens (colours, fonts, easing) in
  `src/app/globals.css`
- [lucide-react](https://lucide.dev) icons
- Fonts loaded through `next/font`: Instrument Serif, Manrope, Noto Sans Tifinagh, Amiri
- Map from [OpenStreetMap](https://www.openstreetmap.org), embedded on the contact page

This Next.js version has breaking changes from older releases. Its documentation ships in
`node_modules/next/dist/docs/`; check it before changing routing, params or caching.

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
brand/                        # logo source, fonts and generated brand kit
├── build_logo.py             # generates every logo SVG + src/brand/geometry.ts
├── build_reveal.py           # renders the logo-reveal clip with EffectCraft
├── logo_reveal.jsx           # EffectCraft animation script
├── fonts/                    # fonts used to outline the wordmark (SIL OFL)
└── kit/                      # exports: PDF, .ai, PNG, MP4
public/brand/                 # logo SVGs, favicon, social image, zellige band
src/
├── app/                      # one folder per route (see Pages), layout.tsx, globals.css
├── brand/geometry.ts         # generated logo paths (do not edit by hand)
├── components/
│   ├── Hero.tsx              # home hero on the zellige wall
│   ├── ZelligeCanvas.tsx     # the interactive zellige wall (canvas)
│   ├── Atelier.tsx           # zellige composer
│   ├── Metiers.tsx           # the eight crafts, swipe row
│   ├── Geste.tsx             # six steps from clay to panel
│   ├── Marquee.tsx           # scrolling craft names
│   ├── Contact.tsx           # contact form → WhatsApp
│   ├── CraftArt.tsx          # generated SVG illustrations for products and articles
│   ├── Navbar.tsx, Footer.tsx, Logo.tsx, NewsletterForm.tsx
│   └── shop/                 # shared shop blocks: PageHeader, ProductCard,
│                             # ProductBrowser, CategoryGrid, CategoryNav, Testimonials,
│                             # Reassurance, Promotions, AboutTeaser, CtaBanner, LegalPage
├── data/                     # all site content (see Editing content)
└── lib/
    ├── whatsapp.ts           # WhatsApp number and link builder
    └── zellige.ts            # zellige pattern geometry
```

## Interactions

The site keeps motion light. The parts that move are:

- **The zellige wall** behind the home hero and the inner page headers. Tiles light up under
  the pointer, and a click re-glazes the wall in a ripple. Text over the wall can't be selected,
  so clicking and dragging on it doesn't highlight the headline.
- **The Atelier composer**, where painting one piece glazes all its symmetric twins.
- **Le Geste**, where the illustration changes as you scroll through the steps.
- **The marquee** of craft names.

With `prefers-reduced-motion`, the wall is drawn once without animation and CSS animations
are turned off.

## The brand kit

The mark is « Bab ez-Zellige »: a Marinid horseshoe door laid with zellige that grows from a
central eight-point star. It is generated from exact geometry, not drawn by hand.

```bash
python -I brand/build_logo.py     # SVGs → brand/out, public/brand, src/brand/geometry.ts
python -I brand/build_reveal.py   # EffectCraft project + brand/kit/artizana-logo-reveal.mp4
```

`build_logo.py` needs [fontTools](https://pypi.org/project/fonttools/)
(`pip install fonttools`). `build_reveal.py` calls EffectCraft at a hard-coded Windows path
(`EC` at the top of the script); change it on other machines, or pass `--no-render` to only
generate the project.

The PDF, `.ai` and PNG exports in `brand/kit/` come from VectorCraft's headless CLI, for
example:

```bash
vectorcraft-cli convert brand/out/artizana-mark.svg brand/kit/artizana-mark.pdf
vectorcraft-cli convert brand/out/artizana-og.svg public/brand/artizana-og.png
```

The wordmark glyphs are converted to outlines, so the SVGs don't need any fonts installed.

## Deployment

Every page is generated at build time, so the site deploys to any Next.js host.
[Vercel](https://vercel.com/new) works without extra configuration.

Before going live, set `metadataBase` in `src/app/layout.tsx` to the real domain. Without it,
the social sharing image resolves to `http://localhost:3000` and the build prints a warning.
