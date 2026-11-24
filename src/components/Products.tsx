"use client";

import { useState } from "react";
import { MessageCircle, Tag } from "lucide-react";
import { products, categories, type Category } from "@/data/products";

const WHATSAPP_NUMBER = "212600000000";

export default function Products() {
  const [activeCategory, setActiveCategory] = useState<Category>("tous");

  const filtered =
    activeCategory === "tous"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section id="catalogue" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-gold font-body text-sm tracking-[0.4em] uppercase mb-3">
            Catalogue
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-brown mb-4">
            Nos Produits
          </h2>
          <div className="moroccan-divider w-64 mx-auto mb-8">
            <span className="text-gold text-xl px-2">✦</span>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-body font-semibold transition-all duration-200 ${
                  activeCategory === cat.id
                    ? "bg-terracotta text-cream shadow-md scale-105"
                    : "bg-white text-brown border border-sand hover:border-gold/40 hover:text-terracotta"
                }`}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => {
            const whatsappMsg = encodeURIComponent(
              `Bonjour, je suis intéressé(e) par : ${product.name}. Pouvez-vous me donner plus d'informations ?`
            );
            const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`;

            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-sand/60 hover:shadow-lg hover:border-gold/30 transition-all duration-300 flex flex-col"
              >
                {/* Product image placeholder */}
                <div
                  className="relative h-56 overflow-hidden"
                  style={{ background: product.gradient }}
                >
                  {/* Arch decoration */}
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 opacity-20"
                    style={{
                      borderRadius: "100% 100% 0 0 / 50% 50% 0 0",
                      border: "1.5px solid rgba(255,255,255,0.8)",
                      borderBottom: "none",
                    }}
                  />

                  {/* Category badge */}
                  {product.badge && (
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1 bg-brown/80 backdrop-blur-sm text-cream text-xs font-body font-semibold px-2.5 py-1 rounded-full">
                        <Tag size={10} />
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Product icon center */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-5xl opacity-30 group-hover:opacity-50 transition-opacity">
                      {categories.find((c) => c.id === product.category)?.icon}
                    </div>
                  </div>

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-brown/0 group-hover:bg-brown/20 transition-colors duration-300" />
                </div>

                {/* Product info */}
                <div className="p-4 flex flex-col flex-1">
                  <p className="text-xs font-body font-semibold tracking-wide text-gold-dark uppercase mb-1">
                    {product.category}
                  </p>
                  <h3 className="font-heading text-base font-bold text-brown leading-tight mb-2">
                    {product.name}
                  </h3>
                  <p className="font-body text-sm text-brown-medium/70 leading-relaxed flex-1 mb-3">
                    {product.description}
                  </p>

                  {/* Price + CTA */}
                  <div className="flex items-center justify-between pt-3 border-t border-sand/60">
                    <div>
                      <p className="text-xs text-brown-medium/50 font-body">À partir de</p>
                      <p className="font-heading font-bold text-terracotta text-lg">
                        {product.priceFrom} MAD
                      </p>
                    </div>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1EB857] text-white text-xs font-body font-bold px-3 py-2 rounded-full transition-colors shadow-sm"
                    >
                      <MessageCircle size={13} />
                      Commander
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <div className="mt-12 text-center">
          <p className="font-body text-brown-medium/60 text-sm">
            Tous nos prix sont en <strong>Dirhams marocains (MAD)</strong>. Livraison disponible
            dans tout le Maroc. Contactez-nous pour les commandes personnalisées.
          </p>
        </div>
      </div>
    </section>
  );
}
