import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "212600000000";

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "#1E0E05" }}
    >
      {/* Top gold border */}
      <div className="h-px" style={{ background: "linear-gradient(to right, transparent, #C9962A, transparent)" }} />

      {/* Zellige pattern top strip */}
      <div className="h-8 zellige-bg opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div>
              <h3 className="font-heading text-3xl font-bold text-cream tracking-widest">ARTIZANA</h3>
              <p className="text-gold text-xs tracking-[0.4em] uppercase mt-1">Artisanat Marocain</p>
            </div>
            <p className="font-body text-cream/50 text-sm leading-relaxed">
              Préserver et valoriser l&apos;artisanat marocain authentique, une pièce à la fois.
              Chaque produit est une oeuvre d&apos;art vivante.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-cream/20 hover:border-[#25D366] hover:bg-[#25D366]/10 flex items-center justify-center text-cream/50 hover:text-[#25D366] transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-cream/20 hover:border-pink-400 hover:bg-pink-400/10 flex items-center justify-center text-cream/50 hover:text-pink-400 transition-all text-sm font-bold"
                aria-label="Instagram"
              >
                IG
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-cream/20 hover:border-blue-400 hover:bg-blue-400/10 flex items-center justify-center text-cream/50 hover:text-blue-400 transition-all text-sm font-bold"
                aria-label="Facebook"
              >
                FB
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading font-semibold text-cream text-sm tracking-wider uppercase mb-5">
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Accueil", href: "#accueil" },
                { label: "Collections", href: "#collections" },
                { label: "Catalogue", href: "#catalogue" },
                { label: "Notre histoire", href: "#a-propos" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-body text-cream/50 hover:text-gold text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-heading font-semibold text-cream text-sm tracking-wider uppercase mb-5">
              Contact
            </h4>
            <ul className="space-y-3 font-body text-sm text-cream/50">
              <li>📍 Medina de Fès, Maroc</li>
              <li>📞 +212 6 00 00 00 00</li>
              <li>✉️ contact@artizana.ma</li>
              <li className="pt-2">
                <span className="text-cream/30">Horaires :</span>
                <br />
                Lun – Sam : 9h00 – 20h00
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: "rgba(201,150,42,0.15)" }}
        >
          <p className="font-body text-cream/30 text-xs">
            © 2025 Artizana. Tous droits réservés.
          </p>
          <div className="flex items-center gap-3 text-gold/60 text-lg">
            <span>✦</span>
            <span>❧</span>
            <span>✦</span>
          </div>
          <p className="font-body text-cream/20 text-xs">
            Artisanat authentique — Fait au Maroc avec ❤️
          </p>
        </div>
      </div>
    </footer>
  );
}
