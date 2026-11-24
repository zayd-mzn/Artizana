import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/whatsapp";

/** Repeats the header CTA (Commander) near the end of a page. */
export default function CtaBanner({
  title = "Prêt à trouver votre pièce ?",
  text = "Commandez en quelques messages : nous vous envoyons les photos des pièces disponibles et le prix exact.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-cobalt-deep py-20 text-center text-chaux md:py-28">
      <div className="zellige-band absolute inset-x-0 top-0 opacity-60" aria-hidden="true" />
      <div className="mx-auto max-w-3xl px-[var(--gutter)]">
        <h2 className="display text-[clamp(2.4rem,5vw,5rem)]">{title}</h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-chaux/75">{text}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a
            href={whatsappLink("Bonjour, je souhaite passer une commande.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
          >
            <MessageCircle size={18} /> Commander via WhatsApp
          </a>
          <Link href="/collections" className="btn btn-ghost text-chaux">
            Voir les collections
          </Link>
        </div>
      </div>
    </section>
  );
}
