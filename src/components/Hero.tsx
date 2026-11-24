import { ArrowDown, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import ZelligeCanvas from "./ZelligeCanvas";
import { whatsappLink } from "@/lib/whatsapp";

export default function Hero() {
  return (
    <section
      id="accueil"
      className="relative isolate flex min-h-[100svh] select-none flex-col justify-end overflow-hidden bg-manganese text-chaux"
    >
      <div className="absolute inset-0 -z-10">
        <ZelligeCanvas />
      </div>
      {/* legibility veil for the copy */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-manganese via-manganese/55 to-transparent" />

      <div className="mx-auto grid w-full max-w-[1500px] gap-10 px-[var(--gutter)] pb-10 pt-40 md:grid-cols-12 md:pb-14">
        <div className="md:col-span-8">
          <p className="eyebrow mb-6 flex items-center gap-3 text-miel">
            <span className="h-px w-10 bg-miel" />
            Maison d&apos;artisanat marocain · Fès
          </p>
          <h1 className="display text-[clamp(3.3rem,10.5vw,10.5rem)]">
            L&apos;âme des mains
            <br />
            <em className="text-miel">marocaines</em>
          </h1>
        </div>

        <div className="flex flex-col justify-end gap-8 md:col-span-4 md:pb-4">
          <p className="arabic text-3xl text-chaux/80 md:text-right">
            صُنع بأيادٍ مغربية
          </p>
          <p className="max-w-sm text-base leading-relaxed text-chaux/75">
            Zellige taillé au menqach, tapis noués dans l&apos;Atlas, poteries de Safi et argent de
            Tiznit. Nous travaillons directement avec plus de cinquante maâlems, et chaque pièce
            arrive avec l&apos;histoire de ses mains.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={whatsappLink("Bonjour, je souhaite passer une commande.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-light"
            >
              Commander maintenant <ArrowUpRight size={18} />
            </a>
            <Link href="/collections" className="btn btn-ghost text-chaux">
              Voir les collections
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[1500px] items-center justify-between border-t border-chaux/15 px-[var(--gutter)] py-5 text-chaux/60">
        <p className="eyebrow hidden sm:block">
          Déplacez la lanterne · cliquez pour changer l&apos;émail
        </p>
        <p className="eyebrow sm:hidden">Touchez le mur pour changer l&apos;émail</p>
        <a href="#engagements" className="eyebrow flex items-center gap-2 hover:text-miel" aria-label="Défiler vers la suite">
          Défiler <ArrowDown size={14} />
        </a>
      </div>
    </section>
  );
}
