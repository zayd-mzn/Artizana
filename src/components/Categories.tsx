const categoryList = [
  {
    id: "djellaba",
    title: "Djellaba & Vêtements",
    subtitle: "Tradition & élégance",
    description: "Djellabas, caftans et tenues traditionnelles brodées à la main.",
    gradient: "linear-gradient(160deg, #9C3D1A 0%, #C4603B 50%, #E0B547 100%)",
    count: "30+ modèles",
    icon: "👘",
  },
  {
    id: "tapis",
    title: "Tapis & Kilims",
    subtitle: "Art ancestral berbère",
    description: "Tapis Beni Ourain, Kilim, Azilal — tissés à la main dans l'Atlas.",
    gradient: "linear-gradient(160deg, #2C1A0E 0%, #7A1515 50%, #C9962A 100%)",
    count: "50+ pièces",
    icon: "🪞",
  },
  {
    id: "poterie",
    title: "Poterie & Céramique",
    subtitle: "Savoir-faire de Fès",
    description: "Tagines, vases zellige, services à thé — l'art de la terre cuite marocaine.",
    gradient: "linear-gradient(160deg, #1A4D6E 0%, #2C6B9A 50%, #F0D49A 100%)",
    count: "40+ articles",
    icon: "🏺",
  },
  {
    id: "bijoux",
    title: "Bijoux & Accessoires",
    subtitle: "Argent & pierres naturelles",
    description: "Bracelets, colliers et boucles d'oreilles en argent et ambre naturel.",
    gradient: "linear-gradient(160deg, #5C3317 0%, #C9962A 50%, #E0E0E0 100%)",
    count: "25+ créations",
    icon: "💎",
  },
];

export default function Categories() {
  return (
    <section id="collections" className="py-24" style={{ backgroundColor: "#F5EDD8" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-gold font-body text-sm tracking-[0.4em] uppercase mb-3">
            Nos Collections
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-brown mb-4">
            Explorer par catégorie
          </h2>
          <div className="moroccan-divider w-64 mx-auto">
            <span className="text-gold text-xl px-2">✦</span>
          </div>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryList.map((cat) => (
            <a
              key={cat.id}
              href={`#catalogue`}
              className="group relative overflow-hidden rounded-3xl cursor-pointer block"
              style={{ minHeight: "380px" }}
            >
              {/* Background gradient */}
              <div
                className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                style={{ background: cat.gradient }}
              />

              {/* Zellige overlay */}
              <div className="absolute inset-0 zellige-bg opacity-20 group-hover:opacity-30 transition-opacity duration-300" />

              {/* Arch decoration at top */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-28 opacity-10 group-hover:opacity-20 transition-opacity"
                style={{
                  borderRadius: "100% 100% 0 0 / 50% 50% 0 0",
                  border: "2px solid rgba(255,255,255,0.6)",
                  borderBottom: "none",
                }}
              />

              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-6 text-cream">
                <div className="mb-3">
                  <span className="text-4xl">{cat.icon}</span>
                </div>
                <div className="text-xs font-body tracking-[0.3em] uppercase text-cream/60 mb-1">
                  {cat.subtitle}
                </div>
                <h3 className="font-heading text-xl font-bold text-cream mb-2">{cat.title}</h3>
                <p className="font-body text-sm text-cream/70 leading-relaxed mb-3">
                  {cat.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-body font-semibold text-gold-light tracking-wide">
                    {cat.count}
                  </span>
                  <span className="text-cream/60 group-hover:text-cream group-hover:translate-x-1 transition-all duration-300 text-sm font-body font-semibold">
                    Explorer →
                  </span>
                </div>
              </div>

              {/* Gold border on hover */}
              <div className="absolute inset-0 rounded-3xl border-2 border-gold/0 group-hover:border-gold/60 transition-all duration-300" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
