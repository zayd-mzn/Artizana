import { ChevronDown, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="accueil"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(160deg, #2C1A0E 0%, #7A1515 40%, #9C3D1A 70%, #C4603B 100%)" }}
    >
      {/* Zellige background pattern */}
      <div className="absolute inset-0 zellige-bg opacity-30 pointer-events-none" />

      {/* Decorative corner ornaments */}
      <OrnamentSVG className="absolute top-6 left-6 opacity-30 w-16 h-16 text-gold" />
      <OrnamentSVG className="absolute top-6 right-6 opacity-30 w-16 h-16 text-gold rotate-90" />
      <OrnamentSVG className="absolute bottom-24 left-6 opacity-20 w-12 h-12 text-gold rotate-180" />
      <OrnamentSVG className="absolute bottom-24 right-6 opacity-20 w-12 h-12 text-gold -rotate-90" />

      {/* Arch frame */}
      <div className="relative z-10 flex flex-col items-center px-6 max-w-3xl mx-auto text-center">
        {/* Decorative arch top */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-3 text-gold-light text-sm font-body tracking-[0.4em] uppercase">
            <span className="w-8 h-px bg-gold-light/60" />
            <Sparkles size={14} />
            <span>Fait à la main au Maroc</span>
            <Sparkles size={14} />
            <span className="w-8 h-px bg-gold-light/60" />
          </div>
        </div>

        {/* Arabic calligraphy ornament */}
        <div className="text-gold/60 text-4xl mb-4 font-heading">❧</div>

        {/* Main heading */}
        <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold text-cream leading-tight mb-4">
          ARTIZANA
        </h1>

        <div className="moroccan-divider w-48 mx-auto mb-6">
          <span className="text-gold text-xl">✦</span>
        </div>

        <p className="font-body text-xl sm:text-2xl text-cream/80 mb-4 font-light italic">
          L&apos;art artisanal marocain authentique
        </p>

        <p className="font-body text-base text-cream/60 max-w-lg mb-10 leading-relaxed">
          Djellabas brodées, tapis berbères, poteries de Fès et bijoux en argent —
          chaque pièce porte en elle le savoir-faire ancestral de nos artisans.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <a
            href="#collections"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-brown font-heading font-semibold text-base px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Voir les collections
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 border-2 border-cream/40 hover:border-cream text-cream font-body font-semibold text-base px-8 py-4 rounded-full transition-all duration-300 hover:bg-cream/10"
          >
            Nous contacter
          </a>
        </div>
      </div>

      {/* Bottom arch wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 80 L0 40 Q180 0 360 40 Q540 80 720 40 Q900 0 1080 40 Q1260 80 1440 40 L1440 80 Z"
            fill="#FDF6EC"
          />
        </svg>
      </div>

      {/* Scroll indicator */}
      <a
        href="#collections"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-cream/50 hover:text-cream transition-colors animate-bounce"
        aria-label="Défiler vers le bas"
      >
        <ChevronDown size={28} />
      </a>
    </section>
  );
}

function OrnamentSVG({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <polygon
        points="30,2 36,22 56,22 40,34 46,54 30,42 14,54 20,34 4,22 24,22"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <circle cx="30" cy="30" r="6" stroke="currentColor" strokeWidth="1" fill="none" />
      <line x1="30" y1="2" x2="30" y2="10" stroke="currentColor" strokeWidth="1" />
      <line x1="30" y1="50" x2="30" y2="58" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
