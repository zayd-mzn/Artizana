import { Hand, Truck, Wallet, Camera } from "lucide-react";
import { reassurance } from "@/data/site";

const icons = [Hand, Truck, Wallet, Camera];

export default function Reassurance() {
  return (
    <section id="engagements" aria-label="Nos engagements" className="border-b border-manganese/10 bg-chaux text-manganese">
      <ul className="mx-auto grid max-w-[1500px] gap-px bg-manganese/10 sm:grid-cols-2 lg:grid-cols-4">
        {reassurance.map((r, i) => {
          const Icon = icons[i];
          return (
            <li key={r.title} className="flex items-start gap-4 bg-chaux px-[var(--gutter)] py-8 lg:px-8">
              <Icon size={22} className="mt-0.5 shrink-0 text-terre" />
              <div>
                <p className="font-semibold">{r.title}</p>
                <p className="mt-1 text-sm text-[var(--ink-soft)]">{r.text}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
