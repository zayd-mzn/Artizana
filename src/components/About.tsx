import { Award, Users, Heart, Package } from "lucide-react";

const stats = [
  { icon: Users, value: "50+", label: "Artisans locaux" },
  { icon: Award, value: "15 ans", label: "D'expérience" },
  { icon: Package, value: "500+", label: "Produits uniques" },
  { icon: Heart, value: "100%", label: "Fait main" },
];

export default function About() {
  return (
    <section id="a-propos" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-gold font-body text-sm tracking-[0.4em] uppercase mb-3">
            Notre Histoire
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-brown mb-4">
            L&apos;âme de l&apos;artisanat marocain
          </h2>
          <div className="moroccan-divider w-64 mx-auto">
            <span className="text-gold text-xl px-2">✦</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text side */}
          <div className="space-y-6">
            <p className="font-body text-lg text-brown-medium leading-relaxed">
              Depuis plus de 15 ans, <strong className="text-terracotta">Artizana</strong> sélectionne
              et met en valeur le meilleur de l&apos;artisanat marocain. Nous travaillons directement
              avec des artisans passionnés des quatre coins du Royaume — de Fès à Marrakech, de
              Tiznit à Khénifra.
            </p>
            <p className="font-body text-lg text-brown-medium leading-relaxed">
              Chaque djellaba est cousue à la main, chaque tapis tissé selon des techniques
              transmises de génération en génération, chaque poterie décorée avec soin par des
              maîtres artisans. Ici, il n&apos;y a pas de production en masse — seulement des
              pièces uniques qui racontent une histoire.
            </p>
            <p className="font-body text-lg text-brown-medium leading-relaxed">
              Notre mission : vous offrir un accès direct à l&apos;authenticité marocaine, avec
              des prix justes pour les artisans et pour vous.
            </p>

            <div className="pt-4">
              <a
                href="#catalogue"
                className="inline-flex items-center gap-2 text-terracotta font-heading font-semibold text-lg hover:text-terracotta-dark transition-colors group"
              >
                Explorer notre catalogue
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>

          {/* Stats side */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="relative bg-white rounded-2xl p-6 shadow-sm border border-sand/60 hover:border-gold/40 hover:shadow-md transition-all duration-300 overflow-hidden group"
              >
                {/* Background decoration */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-terracotta/5 rounded-full group-hover:bg-gold/10 transition-colors" />

                <div className="relative">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-terracotta/10 rounded-xl mb-4">
                    <Icon size={22} className="text-terracotta" />
                  </div>
                  <div className="font-heading text-3xl font-bold text-brown mb-1">{value}</div>
                  <div className="font-body text-sm text-brown-medium/70 font-semibold tracking-wide">
                    {label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative bottom border */}
      <div className="mt-16 mx-4 sm:mx-8 h-px" style={{ background: "linear-gradient(to right, transparent, #C9962A40, transparent)" }} />
    </section>
  );
}
