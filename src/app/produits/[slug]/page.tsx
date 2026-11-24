import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageCircle, Truck, Wallet, RotateCcw } from "lucide-react";
import CraftArt from "@/components/CraftArt";
import ProductCard from "@/components/shop/ProductCard";
import { Stars } from "@/components/shop/Testimonials";
import { mad } from "@/components/shop/format";
import { getProduct, products, shopCategories } from "@/data/products";
import { productReviews } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/produits/[slug]">): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  return { title: p.name, description: p.description };
}

export default async function ProductPage({ params }: PageProps<"/produits/[slug]">) {
  const p = getProduct((await params).slug);
  if (!p) notFound();

  const category = shopCategories.find((c) => c.id === p.category)!;
  const reviews = productReviews[p.category];
  const average = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  // same category first, then other pieces, so there are always suggestions
  const suggestions = [
    ...products.filter((o) => o.category === p.category && o.id !== p.id),
    ...products.filter((o) => o.category !== p.category && o.badge),
  ].slice(0, 4);

  const specs = [
    ["Catégorie", `${category.label} · ${p.subcategory}`],
    ["Origine", p.origin],
    ["Matière", p.material],
    ["Technique", p.technique],
    ["Entretien", p.care],
    ["Fabrication", "Fait main, pièce unique : légères variations possibles"],
  ];

  return (
    <>
      {/* spacer for the fixed header, on a dark band so the light header text stays readable */}
      <div className="h-20 bg-manganese" />
      <section className="bg-chaux py-10 text-manganese md:py-16">
        <div className="mx-auto max-w-[1500px] px-[var(--gutter)]">
          <nav aria-label="Fil d'Ariane" className="mb-10 text-sm text-[var(--ink-soft)]">
            <ol className="flex flex-wrap gap-2">
              <li><Link href="/" className="hover:text-terre">Accueil</Link> /</li>
              <li><Link href="/collections" className="hover:text-terre">Collections</Link> /</li>
              <li><Link href={`/collections/${category.id}`} className="hover:text-terre">{category.label}</Link> /</li>
              <li aria-current="page" className="text-manganese">{p.name}</li>
            </ol>
          </nav>

          <div className="grid gap-12 lg:grid-cols-12">
            {/* visuals: the piece, a detail, and the piece in a room */}
            <div className="grid gap-4 lg:col-span-7">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-manganese/5 sm:aspect-[5/4]">
                <CraftArt variant={p.art} colors={p.colors} seed={p.id} title={p.name} className="absolute inset-0 h-full w-full" />
                {p.badge && (
                  <span className="absolute left-5 top-5 rounded-full bg-chaux/90 px-3 py-1 text-xs font-semibold">{p.badge}</span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <figure className="overflow-hidden rounded-[1.5rem] bg-manganese/5">
                  <div className="aspect-square">
                    <CraftArt variant={p.art} colors={[p.colors[1], p.colors[0]]} seed={p.id + 7} title={`${p.name}, détail`} className="h-full w-full scale-150" />
                  </div>
                  <figcaption className="px-4 py-3 text-xs text-[var(--ink-soft)]">Détail du travail</figcaption>
                </figure>
                <figure className="overflow-hidden rounded-[1.5rem] bg-sable">
                  <div className="relative aspect-square">
                    {/* mise en situation: the piece on a lime-washed wall above a floor line */}
                    <div className="absolute inset-x-0 bottom-0 h-1/4 bg-terre/25" />
                    <div className="absolute left-1/2 top-[18%] h-[58%] w-[48%] -translate-x-1/2 overflow-hidden arch-css shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)]">
                      <CraftArt variant={p.art} colors={p.colors} seed={p.id} title={`${p.name}, mise en situation`} className="h-full w-full" />
                    </div>
                  </div>
                  <figcaption className="px-4 py-3 text-xs text-[var(--ink-soft)]">Mise en situation</figcaption>
                </figure>
              </div>
              <p className="text-xs text-[var(--ink-soft)]">
                Illustrations. Nous vous envoyons des photos de la pièce exacte avant toute commande.
              </p>
            </div>

            <div className="flex flex-col gap-7 lg:col-span-5">
              <div>
                <p className="eyebrow text-terre">{category.label} · {p.origin}</p>
                <h1 className="display mt-4 text-[clamp(2.8rem,5vw,5rem)]">{p.name}</h1>
                <a href="#avis" className="mt-4 flex items-center gap-3 text-sm text-[var(--ink-soft)] hover:text-terre">
                  <Stars rating={Math.round(average)} /> {average.toFixed(1)} / 5 · {reviews.length} avis
                </a>
              </div>

              <div className="border-y border-manganese/10 py-6">
                <p className="font-display text-4xl">
                  {mad(p.priceFrom)} – {mad(p.priceTo)} MAD
                </p>
                <p className="mt-2 text-sm text-[var(--ink-soft)]">
                  Prix TTC, selon la taille et les finitions. Le prix exact vous est confirmé avec les photos.
                </p>
              </div>

              <div className="space-y-4 text-lg leading-relaxed text-[var(--ink-soft)]">
                <p>{p.description}</p>
                <p>{p.details}</p>
              </div>

              <a
                href={whatsappLink(`Bonjour, je suis intéressé(e) par : ${p.name}. Pouvez-vous m'envoyer des photos et les prix disponibles ?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp justify-center text-base"
              >
                <MessageCircle size={18} /> Commander via WhatsApp
              </a>

              <ul className="grid gap-3 text-sm sm:grid-cols-3">
                <li className="flex items-center gap-2"><Truck size={16} className="text-terre" /> Livraison au Maroc</li>
                <li className="flex items-center gap-2"><Wallet size={16} className="text-terre" /> Paiement à la livraison</li>
                <li className="flex items-center gap-2"><RotateCcw size={16} className="text-terre" /> Retour sous 7 jours</li>
              </ul>

              <div>
                <h2 className="display mb-4 text-3xl">Caractéristiques</h2>
                <dl className="divide-y divide-manganese/10 border-y border-manganese/10">
                  {specs.map(([k, v]) => (
                    <div key={k} className="grid grid-cols-3 gap-4 py-3 text-sm">
                      <dt className="font-semibold">{k}</dt>
                      <dd className="col-span-2 text-[var(--ink-soft)]">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="avis" className="scroll-mt-24 bg-chaux-deep py-16 text-manganese md:py-24">
        <div className="mx-auto max-w-[1500px] px-[var(--gutter)]">
          <h2 className="display mb-10 text-[clamp(2rem,4vw,3.5rem)]">Avis clients</h2>
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r) => (
              <li key={r.author} className="flex flex-col gap-4 rounded-[1.5rem] bg-chaux p-7">
                <Stars rating={r.rating} />
                <blockquote className="font-display text-xl leading-snug">« {r.quote} »</blockquote>
                <p className="mt-auto text-sm text-[var(--ink-soft)]">
                  {r.author}, {r.city} <span className="opacity-70">(avis d&apos;exemple)</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-chaux py-16 text-manganese md:py-24">
        <div className="mx-auto max-w-[1500px] px-[var(--gutter)]">
          <h2 className="display mb-10 text-[clamp(2rem,4vw,3.5rem)]">Vous aimerez aussi</h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {suggestions.map((s) => (
              <ProductCard key={s.id} product={s} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
