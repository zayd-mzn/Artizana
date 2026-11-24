"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowUpRight, MessageCircle, X } from "lucide-react";
import { categories, products, type Category, type Product } from "@/data/products";
import { whatsappLink } from "@/lib/whatsapp";
import CraftArt from "./CraftArt";
import { getLenis, prefersReducedMotion } from "./Motion";

const mad = (n: number) => new Intl.NumberFormat("fr-MA").format(n);

export default function Products() {
  const [active, setActive] = useState<Category>("tous");
  const [selected, setSelected] = useState<Product | null>(null);
  const grid = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const first = useRef(true);

  const filtered = active === "tous" ? products : products.filter((p) => p.category === active);

  // animate cards in whenever the filter changes
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (prefersReducedMotion() || !grid.current) return;
    gsap.fromTo(
      grid.current.children,
      { y: 40, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.8, ease: "expo.out", stagger: 0.05 },
    );
  }, [active]);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (selected && !d.open) {
      d.showModal();
      getLenis()?.stop();
    }
    if (!selected && d.open) d.close();
  }, [selected]);

  const close = () => {
    setSelected(null);
    getLenis()?.start();
  };

  return (
    <section id="collection" className="bg-chaux-deep py-24 text-manganese md:py-32">
      <div className="mx-auto max-w-[1500px] px-[var(--gutter)]">
        <div className="mb-12 grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="eyebrow mb-6 text-terre">04 — La Collection</p>
            <h2 data-reveal="lines" className="display text-[clamp(2.8rem,6vw,6.5rem)]">
              Pièces choisies <em>chez les maâlems</em>
            </h2>
          </div>
          <p data-reveal="fade" className="max-w-md text-lg leading-relaxed text-[var(--ink-soft)] md:col-span-5">
            Chaque pièce est unique : couleurs, dimensions et finitions varient d&apos;un atelier à
            l&apos;autre. Demandez-nous une photo de la pièce exacte avant de commander.
          </p>
        </div>

        <div className="no-scrollbar -mx-[var(--gutter)] mb-12 flex gap-2 overflow-x-auto px-[var(--gutter)]" role="tablist" aria-label="Catégories">
          {categories.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={active === c.id}
              onClick={() => setActive(c.id)}
              className={`flex shrink-0 items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors duration-300 ${
                active === c.id ? "border-manganese bg-manganese text-chaux" : "border-manganese/20 hover:border-manganese"
              }`}
            >
              {c.label}
              <span className="arabic text-base opacity-60">{c.arabic}</span>
            </button>
          ))}
        </div>

        <div ref={grid} className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => (
            <article key={p.id} className="group flex flex-col">
              <button
                onClick={() => setSelected(p)}
                className="relative block aspect-[4/5] w-full overflow-hidden arch-css bg-manganese/5 text-left"
                aria-label={`Voir ${p.name}`}
              >
                <CraftArt
                  variant={p.art}
                  colors={p.colors}
                  seed={p.id}
                  title={p.name}
                  className="h-full w-full transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-110"
                />
                {p.badge && (
                  <span className="absolute bottom-4 left-4 rounded-full bg-chaux/90 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                    {p.badge}
                  </span>
                )}
                <span className="absolute bottom-4 right-4 grid h-11 w-11 translate-y-3 place-items-center rounded-full bg-manganese text-chaux opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowUpRight size={18} />
                </span>
              </button>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow text-[0.62rem] text-[var(--ink-soft)]">{p.origin}</p>
                  <h3 className="mt-1.5 font-display text-2xl leading-tight">{p.name}</h3>
                </div>
                <p className="shrink-0 pt-5 text-right text-sm">
                  <span className="block text-[0.7rem] text-[var(--ink-soft)]">dès</span>
                  <span className="font-semibold">{mad(p.priceFrom)} MAD</span>
                </p>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-16 text-center text-sm text-[var(--ink-soft)]">
          Prix en dirhams marocains (MAD). Livraison dans tout le Maroc. Commandes sur mesure sur
          demande.
        </p>
      </div>

      <dialog
        ref={dialog}
        onClose={close}
        onClick={(e) => e.target === dialog.current && close()}
        className="m-auto w-[min(1100px,94vw)] max-h-[92vh] overflow-hidden rounded-[2rem] bg-chaux p-0 text-manganese backdrop:bg-manganese/70 backdrop:backdrop-blur-sm"
        aria-labelledby="quickview-title"
      >
        {selected && (
          <div className="grid max-h-[92vh] overflow-y-auto md:grid-cols-2">
            <div className="relative aspect-[4/5] md:aspect-auto">
              <CraftArt variant={selected.art} colors={selected.colors} seed={selected.id} title={selected.name} className="absolute inset-0 h-full w-full" />
            </div>
            <div className="flex flex-col gap-6 p-8 md:p-12">
              <div className="flex items-start justify-between gap-4">
                <p className="eyebrow text-terre">
                  {categories.find((c) => c.id === selected.category)?.label} · {selected.origin}
                </p>
                <button onClick={close} className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-manganese/20 hover:bg-manganese hover:text-chaux" aria-label="Fermer">
                  <X size={18} />
                </button>
              </div>
              <h3 id="quickview-title" className="display text-5xl md:text-6xl">
                {selected.name}
              </h3>
              <p className="text-lg leading-relaxed text-[var(--ink-soft)]">{selected.description}</p>
              <dl className="grid grid-cols-2 gap-4 border-y border-manganese/10 py-6">
                <div>
                  <dt className="eyebrow text-[0.62rem] text-[var(--ink-soft)]">Prix</dt>
                  <dd className="mt-1 font-display text-3xl">
                    {mad(selected.priceFrom)} – {mad(selected.priceTo)} <span className="text-base">MAD</span>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-[0.62rem] text-[var(--ink-soft)]">Origine</dt>
                  <dd className="mt-1 font-display text-3xl">{selected.origin}</dd>
                </div>
              </dl>
              <p className="text-sm text-[var(--ink-soft)]">
                Le prix dépend de la taille et des finitions. Nous vous envoyons des photos des pièces
                disponibles avant toute commande.
              </p>
              <a
                href={whatsappLink(`Bonjour, je suis intéressé(e) par : ${selected.name}. Pouvez-vous m'envoyer des photos et les prix disponibles ?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp mt-auto justify-center"
              >
                <MessageCircle size={18} /> Commander via WhatsApp
              </a>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
