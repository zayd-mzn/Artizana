"use client";

import { useState, useEffect } from "react";
import { Menu, X, MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "212600000000";

const navLinks = [
  { label: "Accueil", href: "#accueil" },
  { label: "Collections", href: "#collections" },
  { label: "Catalogue", href: "#catalogue" },
  { label: "À propos", href: "#a-propos" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=Bonjour%2C%20je%20souhaite%20passer%20une%20commande.`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-cream/95 backdrop-blur-sm shadow-sm border-b border-gold/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#accueil" className="flex flex-col leading-tight">
            <span
              className={`text-2xl font-heading font-bold tracking-widest transition-colors ${
                isScrolled ? "text-terracotta-dark" : "text-cream"
              }`}
            >
              ARTIZANA
            </span>
            <span
              className={`text-xs tracking-[0.3em] uppercase font-body transition-colors ${
                isScrolled ? "text-gold-dark" : "text-gold-light"
              }`}
            >
              Artisanat Marocain
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-body font-semibold tracking-wide transition-colors hover:text-gold ${
                  isScrolled ? "text-brown" : "text-cream/90"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 bg-[#25D366] hover:bg-[#1EB857] text-white text-sm font-semibold px-4 py-2.5 rounded-full transition-colors shadow-md"
            >
              <MessageCircle size={16} />
              Commander
            </a>

            <button
              className={`md:hidden p-2 rounded-lg transition-colors ${
                isScrolled ? "text-brown hover:bg-brown/10" : "text-cream hover:bg-white/10"
              }`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-cream border-t border-gold/20 shadow-lg">
          <nav className="flex flex-col px-4 py-4 gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-brown font-semibold py-3 px-2 border-b border-sand/50 hover:text-terracotta transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold py-3 px-4 rounded-full"
            >
              <MessageCircle size={18} />
              Commander via WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
