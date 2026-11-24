"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { buildPattern, GLAZES, hash, shade, starPoints, toPath } from "@/lib/zellige";

const steps = [
  {
    title: "L'argile",
    arabic: "الطين",
    text: "L'argile grise de Fès est trempée, foulée aux pieds puis moulée en carreaux. Ils sèchent ensuite plusieurs jours au soleil.",
  },
  {
    title: "La cuisson",
    arabic: "الطهي",
    text: "Les carreaux passent au four. L'argile grise devient un biscuit couleur de terre, dur et sonore.",
  },
  {
    title: "L'émail",
    arabic: "الطلاء",
    text: "Chaque carreau est trempé à la main dans un émail : blanc, noir manganèse, bleu cobalt, jaune miel ou vert cuivre. Une seconde cuisson le vitrifie.",
  },
  {
    title: "La taille",
    arabic: "النقش",
    text: "Le maâlem trace la forme, puis la taille au menqach, un marteau tranchant. Il la biseaute par-dessous pour que les pièces s'emboîtent.",
  },
  {
    title: "L'assemblage",
    arabic: "التركيب",
    text: "Les tesselles sont posées face contre terre, à l'envers et de mémoire. L'artisan ne voit pas le motif qu'il compose.",
  },
  {
    title: "Le panneau",
    arabic: "اللوحة",
    text: "On coule un mortier au dos, puis on retourne le panneau. Le motif apparaît enfin, à la lumière, pour la première fois.",
  },
];

const stats = [
  { value: 50, suffix: "+", label: "Maâlems partenaires" },
  { value: 15, suffix: " ans", label: "D'expérience" },
  { value: 500, suffix: "+", label: "Pièces uniques" },
  { value: 100, suffix: "%", label: "Fait main" },
];

const C = 200;
const STAR = toPath(starPoints(C, C, 120, 0.62));
const PANEL = buildPattern("khatam", 4, 4, 100, 0, 0);

function Visual({ step }: { step: number }) {
  const layer = (n: number) => ({
    opacity: step === n ? 1 : 0,
    transform: step === n ? "scale(1)" : step > n ? "scale(1.06)" : "scale(0.94)",
    transformOrigin: "200px 200px",
    transition: "opacity .8s var(--ease-maalem), transform 1.2s var(--ease-maalem)",
  });
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" role="img" aria-label={`Étape ${step + 1} : ${steps[step].title}`}>
      <defs>
        <radialGradient id="kiln" cx="50%" cy="100%" r="80%">
          <stop offset="0" stopColor="#FF9A3C" stopOpacity="0.9" />
          <stop offset="1" stopColor="#FF9A3C" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="glaze" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={shade(GLAZES.cobalt, 0.35)} />
          <stop offset="0.45" stopColor={GLAZES.cobalt} />
          <stop offset="1" stopColor={shade(GLAZES.cobalt, -0.3)} />
        </linearGradient>
      </defs>
      {/* 0 clay */}
      <g style={layer(0)}>
        <rect x="70" y="70" width="260" height="260" rx="18" fill="#8E8A80" />
        {Array.from({ length: 9 }, (_, i) => (
          <path key={i} d={`M${100 + i * 4},${200 - i * 12} q50,-${14 + i} 100,0 t100,0`} stroke="#6E6A61" strokeWidth="2" fill="none" opacity={0.6} />
        ))}
      </g>
      {/* 1 firing */}
      <g style={layer(1)}>
        <rect x="0" y="200" width="400" height="200" fill="url(#kiln)" />
        <rect x="70" y="70" width="260" height="260" rx="10" fill={GLAZES.terre} />
        <rect x="70" y="70" width="260" height="260" rx="10" fill="none" stroke={shade(GLAZES.terre, -0.3)} strokeWidth="4" />
      </g>
      {/* 2 glaze */}
      <g style={layer(2)}>
        <rect x="70" y="70" width="260" height="260" rx="10" fill="url(#glaze)" />
        <path d="M70,70 L330,70 L330,96 Q300,110 280,96 Q250,130 220,98 Q190,118 160,96 Q120,124 100,98 Q85,106 70,96Z" fill="#fff" opacity="0.15" />
        <ellipse cx="140" cy="130" rx="40" ry="14" fill="#fff" opacity="0.25" transform="rotate(-30 140 130)" />
      </g>
      {/* 3 cutting */}
      <g style={layer(3)}>
        <rect x="70" y="70" width="260" height="260" rx="10" fill={GLAZES.cobalt} opacity="0.25" />
        <path d={STAR} fill={GLAZES.cobalt} />
        <path d={toPath(starPoints(C, C, 132, 0.62))} fill="none" stroke={GLAZES.miel} strokeWidth="2" strokeDasharray="6 6" />
        {Array.from({ length: 10 }, (_, i) => (
          <path
            key={i}
            d={`M${80 + hash(i) * 240},${300 + hash(i * 3) * 80} l${6 + hash(i * 5) * 8},-4 l-2,9z`}
            fill={GLAZES.cobalt}
            opacity="0.7"
          />
        ))}
      </g>
      {/* 4 face-down assembly: the pieces seen from the back, one flipped */}
      <g style={layer(4)}>
        <g transform="translate(0 0)">
          {PANEL.filter((t) => Math.hypot(t.cx - 200, t.cy - 200) < 150).map((t, i) => (
            <path key={i} d={toPath(t.points)} fill={i % 7 === 0 ? (t.role === "heart" ? GLAZES.miel : GLAZES.cobalt) : "#B9A58A"} stroke="#8C7A62" strokeWidth="2" />
          ))}
        </g>
      </g>
      {/* 5 finished panel */}
      <g style={layer(5)}>
        {PANEL.map((t, i) => (
          <path
            key={i}
            d={toPath(t.points)}
            fill={shade(t.role === "heart" ? GLAZES.miel : t.role === "point" ? GLAZES.cobalt : GLAZES.chaux, (hash(i) - 0.5) * 0.12)}
            stroke={GLAZES.chaux}
            strokeWidth="2.5"
          />
        ))}
      </g>
    </svg>
  );
}

export default function Geste() {
  const [step, setStep] = useState(0);
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const items = root.current!.querySelectorAll<HTMLElement>("[data-step]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setStep(Number((e.target as HTMLElement).dataset.step)));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.forEach((i) => io.observe(i));

    // counters
    const counters = root.current!.querySelectorAll<HTMLElement>("[data-count-to]");
    const ctx = gsap.context(() => {
      counters.forEach((el) => {
        const to = Number(el.dataset.countTo);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: to,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => (el.textContent = String(Math.round(obj.v))),
        });
      });
    }, root);
    return () => {
      io.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={root} id="geste" className="bg-chaux py-24 text-manganese md:py-32">
      <div className="mx-auto max-w-[1500px] px-[var(--gutter)]">
        <div className="mb-16 grid gap-8 md:grid-cols-12">
          <p className="eyebrow text-terre md:col-span-3">03 — Le geste</p>
          <h2 data-reveal="lines" className="display text-[clamp(2.8rem,6vw,6.5rem)] md:col-span-9">
            De la terre <em>au motif</em>
          </h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="sticky top-24 aspect-square overflow-hidden rounded-[2rem] bg-chaux-deep">
              <Visual step={step} />
              <div className="absolute bottom-5 left-5 flex gap-1.5" aria-hidden="true">
                {steps.map((_, i) => (
                  <span key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === step ? "w-8 bg-terre" : "w-1.5 bg-manganese/25"}`} />
                ))}
              </div>
            </div>
          </div>
          <ol className="lg:col-span-5 lg:col-start-8">
            {steps.map((s, i) => (
              <li
                key={s.title}
                data-step={i}
                className={`flex min-h-[55vh] flex-col justify-center border-t border-manganese/15 py-10 transition-opacity duration-500 lg:min-h-[70vh] ${
                  i === step ? "opacity-100" : "opacity-35"
                }`}
              >
                <div className="flex items-baseline justify-between">
                  <span className="eyebrow text-terre">Étape {String(i + 1).padStart(2, "0")}</span>
                  <span className="arabic text-2xl text-[var(--ink-soft)]">{s.arabic}</span>
                </div>
                <h3 className="display mt-4 text-5xl md:text-6xl">{s.title}</h3>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-[var(--ink-soft)]">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <dl className="mt-24 grid grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] bg-manganese/10 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-chaux p-6 md:p-10">
              <dt className="eyebrow text-[var(--ink-soft)]">{s.label}</dt>
              <dd className="display mt-3 text-6xl md:text-7xl">
                <span data-count-to={s.value}>{s.value}</span>
                <span className="text-terre">{s.suffix}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
