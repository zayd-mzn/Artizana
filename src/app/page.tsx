import Link from "next/link";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Reassurance from "@/components/shop/Reassurance";
import CategoryGrid from "@/components/shop/CategoryGrid";
import AboutTeaser from "@/components/shop/AboutTeaser";
import Promotions from "@/components/shop/Promotions";
import ProductCard from "@/components/shop/ProductCard";
import Testimonials from "@/components/shop/Testimonials";
import CtaBanner from "@/components/shop/CtaBanner";
import { products } from "@/data/products";
import { testimonials } from "@/data/site";
import { posts, formatDate } from "@/data/posts";

const featured = products.filter((p) => p.badge).slice(0, 4);

export default function Home() {
  return (
    <>
      <Hero />
      <Reassurance />

      <section className="bg-chaux-deep py-20 text-manganese md:py-28">
        <div className="mx-auto max-w-[1500px] px-[var(--gutter)]">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow mb-5 text-terre">Nos collections</p>
              <h2 className="display text-[clamp(2.4rem,5vw,5rem)]">
                Six métiers, <em>une maison</em>
              </h2>
            </div>
            <Link href="/collections" className="btn btn-ghost">
              Toutes les collections
            </Link>
          </div>
          <CategoryGrid />
        </div>
      </section>

      <Marquee />
      <Promotions />

      <section className="bg-chaux-deep py-20 text-manganese md:py-28">
        <div className="mx-auto max-w-[1500px] px-[var(--gutter)]">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow mb-5 text-terre">Nos produits</p>
              <h2 className="display text-[clamp(2.4rem,5vw,5rem)]">
                Pièces <em>choisies</em>
              </h2>
            </div>
            <Link href="/collections" className="btn btn-ghost">
              Voir tous les produits
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <AboutTeaser />
      <Testimonials items={testimonials} />

      <section className="bg-chaux py-20 text-manganese md:py-28">
        <div className="mx-auto max-w-[1500px] px-[var(--gutter)]">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow mb-5 text-terre">Le blog</p>
              <h2 className="display text-[clamp(2.4rem,5vw,5rem)]">
                Conseils <em>de maâlems</em>
              </h2>
            </div>
            <Link href="/blog" className="btn btn-ghost">
              Tous les articles
            </Link>
          </div>
          <ul className="grid gap-8 md:grid-cols-3">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="group block">
                  <p className="eyebrow text-[0.62rem] text-[var(--ink-soft)]">
                    {formatDate(p.date)} · {p.readingMinutes} min
                  </p>
                  <h3 className="mt-3 font-display text-3xl leading-tight group-hover:text-terre">{p.title}</h3>
                  <p className="mt-3 text-[var(--ink-soft)]">{p.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
