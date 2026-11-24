"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, MessageCircle } from "lucide-react";
import Logo from "./Logo";
import { whatsappLink } from "@/lib/whatsapp";

const links = [
  { label: "Accueil", href: "/", n: "01" },
  { label: "Collections", href: "/collections", n: "02" },
  { label: "Atelier", href: "/atelier", n: "03" },
  { label: "À propos", href: "/a-propos", n: "04" },
  { label: "Blog", href: "/blog", n: "05" },
  { label: "FAQ", href: "/faq", n: "06" },
  { label: "Contact", href: "/contact", n: "07" },
];

const orderHref = whatsappLink("Bonjour, je souhaite passer une commande.");

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  useEffect(() => {
    let last = window.scrollY;
    // the home hero is a full screen; other pages open with a short dark header
    const threshold = pathname === "/" ? window.innerHeight * 0.85 : 120;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > threshold);
      setHidden(y > last && y > 400);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const light = scrolled && !open;

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,color] duration-700 ease-[var(--ease-maalem)] ${
        hidden && !open ? "-translate-y-full" : "translate-y-0"
      } ${light ? "bg-chaux/85 text-manganese shadow-[0_1px_0_var(--rule)] backdrop-blur-md" : "text-chaux"}`}
    >
      <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-[var(--gutter)]">
        <Link href="/" aria-label="Artizana, retour à l'accueil" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigation principale">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`link-underline text-sm font-medium tracking-wide ${isActive(l.href) ? "text-miel" : ""}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={orderHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp hidden !py-3 text-sm sm:inline-flex"
           
          >
            <MessageCircle size={16} /> Commander
          </a>
          <button
            className="grid h-11 w-11 place-items-center rounded-full border border-current/25 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>

      {/* outside the header: a transformed parent would trap position: fixed */}
      <div
        id="menu-mobile"
        className={`fixed inset-0 z-40 flex flex-col justify-between bg-manganese px-[var(--gutter)] pb-10 pt-28 text-chaux transition-[clip-path] duration-700 ease-[var(--ease-maalem)] lg:hidden ${
          open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        }`}
        inert={!open}
      >
        <nav className="flex flex-col" aria-label="Navigation mobile">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              aria-current={isActive(l.href) ? "page" : undefined}
              className="flex items-baseline gap-4 border-b border-chaux/10 py-3"
            >
              <span className="eyebrow text-miel">{l.n}</span>
              <span className="display text-4xl">{l.label}</span>
            </Link>
          ))}
        </nav>
        <a href={orderHref} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp justify-center">
          <MessageCircle size={18} /> Commander via WhatsApp
        </a>
      </div>
    </>
  );
}
