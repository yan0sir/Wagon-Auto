import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Hero background: an optional dimmed photo, then diagonal stripes at the angle of the W,
 * a giant outlined mark and the red fold. Motion is slow and stops under prefers-reduced-motion.
 */
export function HeroBackdrop({ children, photo }: { children: ReactNode; photo?: string }) {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        {photo && (
          <>
            <Image src={photo} alt="" fill preload sizes="100vw" className="object-cover opacity-45 grayscale-[30%]" />
            <div className="absolute inset-0 bg-navy-700/35 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink-950/90 via-ink-950/55 to-ink-950/20 rtl:bg-gradient-to-l" />
          </>
        )}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_78%_20%,rgb(0_36_106/0.75),transparent_70%)] rtl:bg-[radial-gradient(ellipse_80%_70%_at_22%_20%,rgb(0_36_106/0.75),transparent_70%)]" />
        <div
          className="anim-stripes absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_70%_80%_at_75%_35%,black,transparent_75%)] rtl:-scale-x-100"
          style={{
            backgroundImage: "repeating-linear-gradient(59.6deg, rgb(244 243 239 / 0.09) 0 1px, transparent 1px 28px)",
          }}
        />
        <svg
          viewBox="0 -4 182 64"
          className="absolute -end-[30%] top-[4%] w-[120%] max-w-none opacity-60 rtl:-scale-x-100 sm:-end-[8%] sm:w-[95%] sm:opacity-100 lg:-end-[4%] lg:top-[2%] lg:w-[78%]"
        >
          <path d="M26 0H54.5L85.93 53.5H57.4Z" fill="none" stroke="rgb(244 243 239 / 0.14)" strokeWidth="0.25" />
          <path d="M127 0H155.5L125.65 53.5H97.15Z" fill="none" stroke="rgb(244 243 239 / 0.14)" strokeWidth="0.25" />
          <path d="M88.9 0L101.75 20.7L84.15 52.2L71.2 30.2Z" fill="#ac1929" opacity="0.55" className="anim-pulse" />
        </svg>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-950 via-ink-950/70 to-transparent" />
      </div>

      {children}
    </section>
  );
}
