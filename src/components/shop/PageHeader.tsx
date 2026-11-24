import Link from "next/link";
import ZelligeCanvas from "../ZelligeCanvas";

export interface Crumb {
  label: string;
  href?: string;
}

/** Dark header for inner pages, with the zellige wall behind it and a breadcrumb. */
export default function PageHeader({
  eyebrow,
  title,
  intro,
  crumbs,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  crumbs: Crumb[];
}) {
  return (
    <section className="relative isolate select-none overflow-hidden bg-manganese pb-14 pt-36 text-chaux md:pb-20 md:pt-44">
      <div className="absolute inset-0 -z-10 opacity-60">
        <ZelligeCanvas />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-manganese via-manganese/80 to-manganese/40" />
      <div className="mx-auto max-w-[1500px] px-[var(--gutter)]">
        <nav aria-label="Fil d'Ariane" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-chaux/60">
            {[{ label: "Accueil", href: "/" }, ...crumbs].map((c, i, all) => (
              <li key={c.label} className="flex items-center gap-2">
                {c.href && i < all.length - 1 ? (
                  <Link href={c.href} className="hover:text-miel">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-chaux">
                    {c.label}
                  </span>
                )}
                {i < all.length - 1 && <span aria-hidden="true">/</span>}
              </li>
            ))}
          </ol>
        </nav>
        <p className="eyebrow mb-5 text-miel">{eyebrow}</p>
        <h1 className="display max-w-5xl text-[clamp(2.8rem,7vw,7rem)]">{title}</h1>
        {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-chaux/75">{intro}</p>}
      </div>
    </section>
  );
}
