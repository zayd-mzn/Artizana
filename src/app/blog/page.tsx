import type { Metadata } from "next";
import Link from "next/link";
import CraftArt from "@/components/CraftArt";
import PageHeader from "@/components/shop/PageHeader";
import { formatDate, posts } from "@/data/posts";

export const metadata: Metadata = {
  title: "Blog — Conseils et savoir-faire",
  description: "Reconnaître un vrai zellige, entretenir un tapis berbère, comprendre les bijoux de Tiznit : nos conseils d'artisans.",
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Le blog"
        title={<>Conseils <em className="text-miel">de maâlems</em></>}
        intro="Pour mieux choisir, entretenir et comprendre les pièces de l'artisanat marocain."
        crumbs={[{ label: "Blog" }]}
      />
      <section className="bg-chaux py-16 text-manganese md:py-24">
        <ul className="mx-auto grid max-w-[1500px] gap-10 px-[var(--gutter)] md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}`} className="group block">
                <div className="aspect-[16/10] overflow-hidden rounded-[1.5rem]">
                  <CraftArt variant={p.art} colors={p.colors} seed={p.slug.length} title={p.title} className="h-full w-full" />
                </div>
                <p className="eyebrow mt-5 text-[0.62rem] text-[var(--ink-soft)]">
                  <time dateTime={p.date}>{formatDate(p.date)}</time> · {p.readingMinutes} min de lecture
                </p>
                <h2 className="mt-3 font-display text-3xl leading-tight group-hover:text-terre">{p.title}</h2>
                <p className="mt-3 text-[var(--ink-soft)]">{p.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
