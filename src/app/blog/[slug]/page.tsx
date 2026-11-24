import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/shop/PageHeader";
import ProductCard from "@/components/shop/ProductCard";
import CtaBanner from "@/components/shop/CtaBanner";
import { formatDate, getPost, posts } from "@/data/posts";
import { getProduct } from "@/data/products";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt, openGraph: { type: "article", publishedTime: post.date } };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const related = post.related.map(getProduct).filter((p) => p !== undefined);

  return (
    <>
      <PageHeader
        eyebrow={`${formatDate(post.date)} · ${post.readingMinutes} min de lecture`}
        title={post.title}
        crumbs={[{ label: "Blog", href: "/blog" }, { label: post.title }]}
      />
      <article className="bg-chaux py-16 text-manganese md:py-24">
        <div className="mx-auto max-w-2xl space-y-6 px-[var(--gutter)] text-lg leading-relaxed text-[var(--ink-soft)]">
          {post.body.map((para, i) =>
            para.startsWith("## ") ? (
              <h2 key={i} className="display pt-6 text-4xl text-manganese">
                {para.slice(3)}
              </h2>
            ) : (
              <p key={i}>{para}</p>
            ),
          )}
        </div>
      </article>
      {related.length > 0 && (
        <section className="bg-chaux-deep py-16 text-manganese md:py-24">
          <div className="mx-auto max-w-[1500px] px-[var(--gutter)]">
            <h2 className="display mb-10 text-[clamp(2rem,4vw,3.5rem)]">Les pièces de cet article</h2>
            <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
      <CtaBanner />
    </>
  );
}
