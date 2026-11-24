import { MessageCircle } from "lucide-react";
import { Mark } from "./Logo";
import { whatsappLink } from "@/lib/whatsapp";

const nav = [
  { label: "Les métiers", href: "#metiers" },
  { label: "L'atelier zellige", href: "#atelier" },
  { label: "Le geste", href: "#geste" },
  { label: "La collection", href: "#collection" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-manganese text-chaux">
      <div className="zellige-band opacity-90" aria-hidden="true" />
      <div className="mx-auto max-w-[1500px] px-[var(--gutter)] pt-20">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Mark variant="reverse" className="h-40 w-auto" />
            <p className="mt-8 max-w-sm font-display text-3xl leading-snug">
              Préserver l&apos;artisanat marocain, <em className="text-miel">une pièce à la fois.</em>
            </p>
          </div>
          <nav className="md:col-span-3" aria-label="Pied de page">
            <p className="eyebrow mb-5 text-chaux/40">Explorer</p>
            <ul className="space-y-3">
              {nav.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="link-underline text-chaux/80 hover:text-chaux">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-4">
            <p className="eyebrow mb-5 text-chaux/40">Atelier</p>
            <address className="space-y-2 not-italic text-chaux/80">
              <p>Médina de Fès, Maroc</p>
              <p>+212 6 00 00 00 00</p>
              <p>contact@artizana.ma</p>
              <p className="pt-2 text-chaux/50">Lun – Sam · 9h00 – 20h00</p>
            </address>
            <div className="mt-6 flex gap-3">
              <a
                href={whatsappLink("Bonjour !")}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-11 w-11 place-items-center rounded-full border border-chaux/20 transition-colors hover:border-whatsapp hover:bg-whatsapp"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
              <a href="#" className="grid h-11 w-11 place-items-center rounded-full border border-chaux/20 text-xs font-bold transition-colors hover:border-miel hover:text-miel" aria-label="Instagram">
                IG
              </a>
              <a href="#" className="grid h-11 w-11 place-items-center rounded-full border border-chaux/20 text-xs font-bold transition-colors hover:border-miel hover:text-miel" aria-label="Facebook">
                FB
              </a>
            </div>
          </div>
        </div>

        {/* oversized wordmark in the three scripts */}
        <div className="mt-20 border-t border-chaux/10 pt-10" aria-hidden="true">
          <p className="display select-none text-center text-[clamp(4rem,17.5vw,19rem)] leading-[0.8] tracking-[0.04em]">ARTIZANA</p>
          <div className="mt-6 flex items-center justify-between gap-6 text-chaux/50">
            <span className="tifinagh text-lg md:text-2xl">ⴰⵔⵜⵉⵣⴰⵏⴰ</span>
            <span className="h-px flex-1 bg-chaux/15" />
            <span className="arabic text-2xl md:text-3xl">أرتيزانا</span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 py-8 text-xs text-chaux/40 sm:flex-row">
          <p>© 2026 Artizana. Tous droits réservés.</p>
          <p>Fait à la main au Maroc</p>
        </div>
      </div>
    </footer>
  );
}
