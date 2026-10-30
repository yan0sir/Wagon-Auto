import Image from "next/image";
import type { ReactNode } from "react";
import { rich } from "@/lib/rich";
import { ButtonLink, Container, SectionTitle, reveal } from "@/components/ui/primitives";

const pad = (n: number) => String(n).padStart(2, "0");

/** Header for inner pages: centered headline with optional intro, over an optional dimmed photo. */
export function PageHero({
  headline,
  text,
  photo,
  photoPosition = "50% 50%",
}: {
  headline: string;
  text?: string;
  photo?: string;
  photoPosition?: string;
}) {
  return (
    <section
      className={`relative isolate overflow-hidden border-b border-rule ${
        photo ? "pt-36 pb-16 lg:pt-48 lg:pb-24" : "pt-28 pb-12 lg:pt-36 lg:pb-16"
      }`}
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        {photo && (
          <>
            <Image
              src={photo}
              alt=""
              fill
              preload
              sizes="100vw"
              className="object-cover opacity-50 grayscale-[30%]"
              style={{ objectPosition: photoPosition }}
            />
            <div className="absolute inset-0 bg-navy-700/35 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-ink-950/30" />
          </>
        )}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_85%_0%,rgb(0_36_106/0.6),transparent_70%)] rtl:bg-[radial-gradient(ellipse_60%_80%_at_15%_0%,rgb(0_36_106/0.6),transparent_70%)]" />
        <svg
          viewBox="0 -4 182 64"
          className="absolute -end-[10%] top-10 w-[70%] opacity-70 rtl:-scale-x-100 lg:w-[46%]"
        >
          <path d="M26 0H54.5L85.93 53.5H57.4Z" fill="none" stroke="rgb(244 243 239 / 0.1)" strokeWidth="0.3" />
          <path d="M127 0H155.5L125.65 53.5H97.15Z" fill="none" stroke="rgb(244 243 239 / 0.1)" strokeWidth="0.3" />
          <path d="M88.9 0L101.75 20.7L84.15 52.2L71.2 30.2Z" fill="#ac1929" opacity="0.35" />
        </svg>
      </div>
      <Container className="text-center">
        <h1 className="t-display-l mx-auto max-w-[18ch]" {...reveal(0)}>
          {rich(headline)}
        </h1>
        {text && (
          <p className="t-body mx-auto mt-8 max-w-2xl text-paper-50/75" {...reveal(1)}>
            {text}
          </p>
        )}
      </Container>
    </section>
  );
}

/**
 * Full-width photo break between sections. Top and bottom fade into the page background,
 * and the photo eases in from a slight zoom when it scrolls into view.
 */
export function ImageBand({ photo, position = "50% 50%" }: { photo: string; position?: string }) {
  return (
    <div aria-hidden className="relative h-[clamp(260px,42vw,560px)] overflow-hidden" {...reveal(0)}>
      <Image
        src={photo}
        alt=""
        fill
        sizes="100vw"
        className="band-photo object-cover grayscale-[35%]"
        style={{ objectPosition: position }}
      />
      <div className="absolute inset-0 bg-navy-700/35 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-transparent to-ink-950" />
      <div className="bg-grid absolute inset-0 opacity-30" />
    </div>
  );
}

/** Numbered steps joined by a hairline. Used for "How we work" and "How to start". */
export function Steps({
  title,
  steps,
  tone = "light",
}: {
  title: string;
  steps: { title: string; text: string }[];
  tone?: "light" | "dark";
}) {
  const light = tone === "light";
  const cols = steps.length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4";
  return (
    <section className={`${light ? "bg-paper-50 text-navy-700" : ""} relative py-14 lg:py-20`}>
      <Container>
        <SectionTitle title={rich(title)} tone={light ? "light" : "dark"} />
        <ol className={`mt-10 grid gap-px sm:grid-cols-2 lg:mt-14 ${cols}`}>
          {steps.map((s, i) => (
            <li
              key={s.title}
              className={`relative border-t pt-8 pe-6 pb-8 ${light ? "border-navy-700/25" : "border-rule"}`}
              {...reveal(i)}
            >
              <span aria-hidden className="absolute -top-[4px] start-0 size-[7px] bg-red-500" />
              <span className={`t-num text-sm ${light ? "text-red-700" : "text-red-500"}`}>{pad(i + 1)}</span>
              <h3 className="t-title mt-6">{s.title}</h3>
              <p className={`t-body mt-3 ${light ? "text-navy-700/75" : "text-paper-50/70"}`}>{s.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/** Bordered grid of short title + text cards. */
export function CardGrid({
  items,
  columns = 2,
  numbered = true,
}: {
  items: { title: string; text: string }[];
  columns?: 2 | 3 | 4;
  numbered?: boolean;
}) {
  const cols = { 2: "md:grid-cols-2", 3: "md:grid-cols-2 lg:grid-cols-3", 4: "md:grid-cols-2 lg:grid-cols-4" }[columns];
  return (
    <ul className={`grid border-s border-t border-rule ${cols}`}>
      {items.map((item, i) => (
        <li
          key={item.title}
          className="group relative border-e border-b border-rule p-8 transition-colors duration-500 hover:bg-ink-900 lg:p-10"
          {...reveal(i % columns)}
        >
          {numbered && <span className="t-num text-xs text-mute-400">{pad(i + 1)}</span>}
          <h3 className="t-title mt-10 flex items-center gap-3">
            <span
              aria-hidden
              className="size-[7px] shrink-0 bg-red-500 transition-transform duration-500 group-hover:rotate-45"
            />
            {item.title}
          </h3>
          <p className="t-body mt-4 max-w-md text-paper-50/70">{item.text}</p>
        </li>
      ))}
    </ul>
  );
}

/** Closing call to action. `data-cta-band` hides the floating WhatsApp button while visible. */
export function CtaBand({ title, text, children }: { title: string; text: string; children: ReactNode }) {
  return (
    <section data-cta-band className="relative isolate overflow-hidden border-t border-rule bg-ink-900 py-16 lg:py-24">
      <div aria-hidden className="bg-grid absolute inset-0 -z-10 opacity-60" />
      <svg
        aria-hidden
        viewBox="0 -4 182 64"
        className="absolute -bottom-[20%] -end-[15%] -z-10 w-[80%] rtl:-scale-x-100 lg:w-[48%]"
      >
        <path d="M88.9 0L101.75 20.7L84.15 52.2L71.2 30.2Z" fill="#ac1929" opacity="0.5" />
        <path d="M127 0H155.5L125.65 53.5H97.15Z" fill="none" stroke="rgb(244 243 239 / 0.12)" strokeWidth="0.3" />
      </svg>
      <Container className="text-center">
        <h2 className="t-display-m mx-auto max-w-[20ch]" {...reveal(0)}>
          {rich(title)}
        </h2>
        <p className="t-body mx-auto mt-8 max-w-xl text-paper-50/75" {...reveal(1)}>
          {text}
        </p>
        <div className="mt-12 flex flex-wrap justify-center gap-4" {...reveal(2)}>
          {children}
        </div>
      </Container>
    </section>
  );
}

export { ButtonLink };
