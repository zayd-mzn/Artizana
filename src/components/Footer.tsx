import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Mark } from "./Logo";
import NewsletterForm from "./NewsletterForm";
import { whatsappLink } from "@/lib/whatsapp";
import { shop } from "@/data/site";
import { shopCategories } from "@/data/products";

const useful = [
  { label: "À propos", href: "/a-propos" },
  { label: "Notre blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "L'atelier zellige", href: "/atelier" },
  { label: "Nous contacter", href: "/contact" },
];

const legal = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/politique-de-confidentialite" },
];

const heading = "eyebrow mb-5 text-chaux/40";
const link = "link-underline text-chaux/80 hover:text-chaux";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-manganese text-chaux">
      <div className="zellige-band opacity-90" aria-hidden="true" />
      <div className="mx-auto max-w-[1500px] px-[var(--gutter)] pt-20">
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Mark variant="reverse" className="h-32 w-auto" />
            <p className="mt-6 max-w-sm font-display text-2xl leading-snug">
              Préserver l&apos;artisanat marocain, <em className="text-miel">une pièce à la fois.</em>
            </p>
            <p className={`${heading} mt-10`}>Newsletter</p>
            <p className="mb-4 text-sm text-chaux/70">Nouvelles pièces, offres et conseils d&apos;entretien, une fois par mois.</p>
            <NewsletterForm />
          </div>

          <nav className="lg:col-span-2" aria-label="Collections">
            <p className={heading}>Collections</p>
            <ul className="space-y-3">
              {shopCategories.map((c) => (
                <li key={c.id}>
                  <Link href={`/collections/${c.id}`} className={link}>{c.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="lg:col-span-2" aria-label="Liens utiles">
            <p className={heading}>Liens utiles</p>
            <ul className="space-y-3">
              {useful.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={link}>{l.label}</Link>
                </li>
              ))}
            </ul>
            <p className={`${heading} mt-10`}>Informations légales</p>
            <ul className="space-y-3">
              {legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={link}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <p className={heading}>Contact</p>
            <address className="space-y-2 not-italic text-chaux/80">
              <p>{shop.address}</p>
              <p><a href={`tel:${shop.phone.replace(/\s/g, "")}`} className="hover:text-chaux">{shop.phone}</a></p>
              <p><a href={`mailto:${shop.email}`} className="hover:text-chaux">{shop.email}</a></p>
              <p className="pt-2 text-chaux/50">{shop.hours}</p>
            </address>
            <p className={`${heading} mt-10`}>Réseaux sociaux</p>
            <div className="flex gap-3">
              <a
                href={whatsappLink("Bonjour !")}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-11 w-11 place-items-center rounded-full border border-chaux/20 transition-colors hover:border-whatsapp hover:bg-whatsapp"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
              <a href={shop.social.instagram} target="_blank" rel="noopener noreferrer" className="grid h-11 w-11 place-items-center rounded-full border border-chaux/20 text-xs font-bold transition-colors hover:border-miel hover:text-miel" aria-label="Instagram">
                IG
              </a>
              <a href={shop.social.facebook} target="_blank" rel="noopener noreferrer" className="grid h-11 w-11 place-items-center rounded-full border border-chaux/20 text-xs font-bold transition-colors hover:border-miel hover:text-miel" aria-label="Facebook">
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
