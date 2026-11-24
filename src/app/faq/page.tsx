import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/shop/PageHeader";
import CtaBanner from "@/components/shop/CtaBanner";
import { faq } from "@/data/site";

export const metadata: Metadata = {
  title: "FAQ — Questions fréquentes",
  description: "Paiement, livraison, retours et garantie : les réponses à vos questions avant d'acheter.",
};

export default function FaqPage() {
  // structured data so search engines can show the answers directly
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.flatMap((t) =>
      t.items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
    ),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <PageHeader
        eyebrow="FAQ"
        title={<>Questions <em className="text-miel">fréquentes</em></>}
        intro="Paiement, livraison, retours : tout ce qu'il faut savoir avant de commander."
        crumbs={[{ label: "FAQ" }]}
      />
      <section className="bg-chaux py-16 text-manganese md:py-24">
        <div className="mx-auto grid max-w-[1500px] gap-12 px-[var(--gutter)] lg:grid-cols-12">
          <nav aria-label="Thèmes" className="lg:col-span-3">
            <ul className="sticky top-28 space-y-3">
              {faq.map((t) => (
                <li key={t.topic}>
                  <a href={`#${slugify(t.topic)}`} className="font-semibold hover:text-terre">
                    {t.topic}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-16 lg:col-span-8">
            {faq.map((t) => (
              <div key={t.topic} id={slugify(t.topic)} className="scroll-mt-28">
                <h2 className="display mb-6 text-4xl">{t.topic}</h2>
                <div className="divide-y divide-manganese/10 border-y border-manganese/10">
                  {t.items.map((i) => (
                    <details key={i.q} className="group py-5">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold">
                        {i.q}
                        <span className="text-2xl text-terre transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                      </summary>
                      <p className="mt-4 max-w-2xl leading-relaxed text-[var(--ink-soft)]">{i.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
            <p className="text-[var(--ink-soft)]">
              Vous ne trouvez pas votre réponse ?{" "}
              <Link href="/contact" className="font-semibold text-terre underline">
                Contactez-nous
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}

function slugify(s: string) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
