import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Image slot. Shows the slot's licensed photo (see public/images/CREDITS.md) graded with the
 * brand's navy treatment, or brand-built abstract artwork when no photo is set (or `art` is passed).
 */
export type VisualKind = "import" | "export" | "sourcing" | "partnerships" | "bahrain" | "about" | "gulf";

const photos: Partial<Record<VisualKind, { src: string; position?: string }>> = {
  import: { src: "/images/import-vehicles-on-ship.jpg", position: "50% 85%" },
  export: { src: "/images/export-ship-aerial.jpg", position: "50% 45%" },
  sourcing: { src: "/images/sourcing-cars-aerial.jpg", position: "50% 40%" },
  partnerships: { src: "/images/partnerships-signing.jpg", position: "45% 40%" },
  about: { src: "/images/about-bahrain-bay.jpg", position: "50% 15%" },
  gulf: { src: "/images/manama-sunset.jpg", position: "50% 50%" },
};

const RED = "#ed1c24";
const FOLD = "#ac1929";
const LINE = "rgb(244 243 239 / 0.28)";
const FAINT = "rgb(244 243 239 / 0.1)";

export function Visual({
  kind,
  art = false,
  alt = "",
  caption,
  className = "",
  sizes = "(min-width: 1024px) 45vw, 100vw",
}: {
  kind: VisualKind;
  /** Force the abstract artwork even if the slot has a photo. */
  art?: boolean;
  /** Photos here are decorative (the text beside them carries the meaning), so alt defaults to "". */
  alt?: string;
  caption?: string;
  className?: string;
  sizes?: string;
}) {
  const photo = art ? undefined : photos[kind];
  return (
    <figure className={`group/visual relative overflow-hidden border border-rule bg-ink-900 ${className}`}>
      {photo ? (
        <>
          <Image
            src={photo.src}
            alt={alt}
            fill
            sizes={sizes}
            className="object-cover grayscale-[40%] transition-transform duration-[1.6s] ease-[cubic-bezier(.2,.7,.2,1)] group-hover/visual:scale-[1.03]"
            style={{ objectPosition: photo.position }}
          />
          {/* Brand grading: navy wash, darker base for captions, faint blueprint grid */}
          <div className="absolute inset-0 bg-navy-700/30 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/75 via-ink-950/10 to-ink-950/20" />
          <div className="bg-grid absolute inset-0 opacity-40" />
        </>
      ) : (
        <>
          <div className="bg-grid absolute inset-0" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgb(0_36_106/0.55),transparent_65%)]" />
          <svg
            viewBox="0 0 480 360"
            className="absolute inset-0 size-full rtl:-scale-x-100"
            aria-hidden
            preserveAspectRatio="xMidYMid slice"
          >
            {artwork[kind === "gulf" ? "bahrain" : kind]}
          </svg>
        </>
      )}
      {caption && (
        <figcaption className="t-num absolute start-4 bottom-3 text-[10px] tracking-[0.18em] text-mute-400 uppercase">
          {caption}
        </figcaption>
      )}
      <span aria-hidden className="absolute end-3 top-3 size-[6px] bg-red-500" />
    </figure>
  );
}

const node = (x: number, y: number, s = 1) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r="26" fill="none" stroke={LINE} className="anim-pulse" />
    <circle r="12" fill="none" stroke={FAINT} />
    <path d="M0 -14 8 0 0 14 -8 0Z" fill={RED} />
  </g>
);

const artwork: Record<Exclude<VisualKind, "gulf">, ReactNode> = {
  // Many origins converge on one Bahrain node.
  import: (
    <>
      {[50, 120, 190, 260, 320].map((y, i) => (
        <g key={y}>
          <path
            d={`M -10 ${y} C 160 ${y}, 220 180, 360 180`}
            fill="none"
            stroke={i === 2 ? RED : LINE}
            strokeWidth={i === 2 ? 1.5 : 1}
            strokeDasharray={i === 2 ? "0" : "4 6"}
            className={i === 2 ? "" : "anim-dash"}
          />
          <rect x="22" y={y - 3} width="6" height="6" fill={i === 2 ? RED : LINE} />
        </g>
      ))}
      {node(360, 180)}
      <text x="392" y="184" fill={LINE} fontSize="10" fontFamily="monospace" letterSpacing="2">
        BH
      </text>
    </>
  ),
  // One node fans out to many destinations.
  export: (
    <>
      {[40, 110, 180, 250, 320].map((y, i) => (
        <g key={y}>
          <path
            d={`M 120 180 C 260 180, 300 ${y}, 490 ${y}`}
            fill="none"
            stroke={i === 1 ? RED : LINE}
            strokeWidth={i === 1 ? 1.5 : 1}
            strokeDasharray={i === 1 ? "0" : "4 6"}
            className={i === 1 ? "" : "anim-dash"}
          />
          <rect x="440" y={y - 3} width="6" height="6" fill={i === 1 ? RED : LINE} />
        </g>
      ))}
      {node(120, 180)}
      <text x="72" y="150" fill={LINE} fontSize="10" fontFamily="monospace" letterSpacing="2">
        BH
      </text>
    </>
  ),
  // A field of options, one located and bracketed.
  sourcing: (
    <>
      {Array.from({ length: 7 }).map((_, r) =>
        Array.from({ length: 9 }).map((__, c) => {
          const x = 60 + c * 45;
          const y = 45 + r * 45;
          const hit = r === 3 && c === 5;
          return hit ? null : <rect key={`${r}-${c}`} x={x - 2} y={y - 2} width="4" height="4" fill={FAINT} />;
        }),
      )}
      <line x1="285" y1="0" x2="285" y2="360" stroke={LINE} strokeDasharray="2 6" />
      <line x1="0" y1="180" x2="480" y2="180" stroke={LINE} strokeDasharray="2 6" />
      <g stroke={RED} strokeWidth="1.5" fill="none">
        <path d="M255 160v-10h10M305 150h10v10M315 200v10h-10M265 210h-10v-10" />
      </g>
      <path d="M285 166 293 180 285 194 277 180Z" fill={RED} />
      <text x="324" y="150" fill={LINE} fontSize="10" fontFamily="monospace" letterSpacing="2">
        MATCH
      </text>
    </>
  ),
  // Two strokes of the W meeting at the fold: two parties, one agreement.
  partnerships: (
    <g transform="translate(70 40) scale(2.2)">
      <path d="M26 0H54.5L87.37 56H58.87Z" fill="none" stroke={LINE} />
      <path d="M127 0H155.5L124.25 56H95.75Z" fill="none" stroke={LINE} />
      <path d="M88.9 0L101.75 20.7L84.15 52.2L71.2 30.2Z" fill={FOLD} />
      <path d="M26 0H54.5L72 30 63 45Z" fill={RED} opacity="0.9" />
      <path d="M0 80H182" stroke={FAINT} />
      <path d="M0 -12H182" stroke={FAINT} />
    </g>
  ),
  // Bahrain as a hub: port, causeway, GCC.
  bahrain: (
    <>
      {[60, 110, 160, 210].map((r) => (
        <circle
          key={r}
          cx="240"
          cy="190"
          r={r}
          fill="none"
          stroke={r === 110 ? LINE : FAINT}
          strokeDasharray={r === 160 ? "3 7" : undefined}
        />
      ))}
      <path d="M240 190 L80 70" stroke={LINE} strokeDasharray="4 6" className="anim-dash" />
      <path d="M240 190 L420 110" stroke={RED} strokeWidth="1.5" />
      <path d="M240 190 L330 340" stroke={LINE} strokeDasharray="4 6" className="anim-dash" />
      <rect x="77" y="67" width="6" height="6" fill={LINE} />
      <rect x="417" y="107" width="6" height="6" fill={RED} />
      <rect x="327" y="337" width="6" height="6" fill={LINE} />
      <text x="56" y="56" fill={LINE} fontSize="10" fontFamily="monospace" letterSpacing="2">
        PORT
      </text>
      <text x="400" y="96" fill={LINE} fontSize="10" fontFamily="monospace" letterSpacing="2">
        KSA
      </text>
      <text x="344" y="344" fill={LINE} fontSize="10" fontFamily="monospace" letterSpacing="2">
        GCC
      </text>
      {node(240, 190, 1.2)}
    </>
  ),
  // The W mark, large and quiet.
  about: (
    <g transform="translate(60 70) scale(2.25)">
      <path d="M26 0H54.5L85.93 53.5H57.4Z" fill="none" stroke={LINE} />
      <path d="M127 0H155.5L125.65 53.5H97.15Z" fill="none" stroke={LINE} />
      <path d="M88.9 0L101.75 20.7L84.15 52.2L71.2 30.2Z" fill={RED} />
    </g>
  ),
};
