import Link from "next/link";
import { Mark } from "../Logo";

const reasons = [
  { title: "Pièces authentiques", text: "Achetées directement aux ateliers, sans intermédiaire." },
  { title: "Commerce équitable", text: "Les maâlems fixent leur prix et sont payés à la commande." },
  { title: "Service personnel", text: "Photos de la pièce exacte, conseils et suivi par message." },
];

export default function AboutTeaser() {
  return (
    <section className="bg-chaux-deep py-20 text-manganese md:py-28">
      <div className="mx-auto grid max-w-[1500px] gap-12 px-[var(--gutter)] lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="eyebrow mb-5 text-terre">À propos</p>
          <h2 className="display text-[clamp(2.4rem,5vw,5rem)]">Qui sommes-nous ?</h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--ink-soft)]">
            Artizana est née dans la médina de Fès. Nous travaillons avec plus de cinquante maâlems,
            du zellige au tapis, pour vendre leurs pièces au juste prix et faire vivre leurs métiers.
          </p>
          <Link href="/a-propos" className="btn btn-ghost mt-8">
            Découvrir notre histoire
          </Link>
        </div>
        <div className="lg:col-span-6">
          <h3 className="display mb-6 text-4xl">Pourquoi nous choisir ?</h3>
          <ul className="space-y-5">
            {reasons.map((r) => (
              <li key={r.title} className="flex gap-4 border-t border-manganese/15 pt-5">
                <Mark small className="h-8 w-auto shrink-0" />
                <p>
                  <strong className="font-semibold">{r.title}</strong>
                  <span className="text-[var(--ink-soft)]"> : {r.text}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
