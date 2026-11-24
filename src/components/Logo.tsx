import { MARK_INNER, MARK_INNER_REVERSE, MARK_INNER_SMALL, MARK_VIEWBOX } from "@/brand/geometry";

/**
 * The « Bab ez-Zellige » mark: a Marinid door laid with zellige that grows from a central star.
 * `small` swaps the 300+ tesselles for a single star, which stays legible below ~80px.
 */
export function Mark({
  variant = "color",
  small = false,
  className,
  title = "Artizana",
}: {
  variant?: "color" | "reverse";
  small?: boolean;
  className?: string;
  title?: string;
}) {
  const inner = small ? MARK_INNER_SMALL : variant === "color" ? MARK_INNER : MARK_INNER_REVERSE;
  return (
    <svg viewBox={MARK_VIEWBOX} className={className} role="img" aria-label={title}>
      <g dangerouslySetInnerHTML={{ __html: inner }} />
    </svg>
  );
}

/** Mark + wordmark, set in live type so it inherits colour. */
export default function Logo({ className = "", compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Mark small className="h-11 w-auto shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.55rem] tracking-[0.18em]">ARTIZANA</span>
        {!compact && (
          <span className="tifinagh mt-1 text-[0.62rem] opacity-70" aria-hidden="true">
            ⴰⵔⵜⵉⵣⴰⵏⴰ
          </span>
        )}
      </span>
    </span>
  );
}
