# Artizana

Marketing site for Artizana, a seller of handmade Moroccan crafts: djellabas, Berber rugs, pottery and jewelry. The site is in French.

## Features

- Single-page layout with Navbar, Hero, Categories, About, Products, Contact and Footer sections
- Product catalog with category filtering and price ranges, defined in `src/data/products.ts`
- Playfair Display and Nunito fonts loaded through `next/font`
- SEO metadata (title, description, keywords) set in `src/app/layout.tsx`

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router, Turbopack)
- [React](https://react.dev) 19
- [Tailwind CSS](https://tailwindcss.com) 4
- [TypeScript](https://www.typescriptlang.org)
- [lucide-react](https://lucide.dev) icons

## Getting started

Requires Node.js 20 or later.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | Description                      |
| --------------- | -------------------------------- |
| `npm run dev`   | Start the development server     |
| `npm run build` | Create a production build        |
| `npm run start` | Serve the production build       |
| `npm run lint`  | Run ESLint                       |

## Project structure

```
src/
├── app/            # Root layout, global styles, home page
├── components/     # One component per page section
└── data/           # Product and category data
public/             # Static assets
```

## Editing content

- **Products and categories:** edit `src/data/products.ts`.
- **Page sections:** edit the matching file in `src/components/`.
- **Page title and description:** edit `metadata` in `src/app/layout.tsx`.

## Deployment

The site builds as static content, so it deploys to any Next.js host. [Vercel](https://vercel.com/new) works without extra configuration.
