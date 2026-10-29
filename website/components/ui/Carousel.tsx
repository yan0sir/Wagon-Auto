"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowIcon } from "./icons";

const pad = (n: number) => String(n).padStart(2, "0");

/** Scroll-snap card carousel with a `01 / 05` counter (DCVC "Spotlight"). Works in RTL. */
export function Carousel({
  items,
  prevLabel,
  nextLabel,
}: {
  items: { title: string; text: string }[];
  prevLabel: string;
  nextLabel: string;
}) {
  const track = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [atEnd, setAtEnd] = useState(false);

  const step = () => {
    const el = track.current;
    const card = el?.querySelector("li");
    return card ? card.getBoundingClientRect().width + 16 : 0;
  };

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const x = Math.abs(el.scrollLeft); // negative in RTL
    const w = step();
    setIndex(w ? Math.min(items.length - 1, Math.round(x / w)) : 0);
    setAtEnd(x + el.clientWidth >= el.scrollWidth - 4);
  }, [items.length]);

  useEffect(() => {
    update();
    const el = track.current;
    el?.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const rtl = getComputedStyle(el).direction === "rtl";
    el.scrollBy({ left: dir * step() * (rtl ? -1 : 1), behavior: "smooth" });
  };

  const shown = atEnd ? items.length : index + 1;

  return (
    <div>
      <ul
        ref={track}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 sm:mx-0 sm:scroll-px-0 sm:px-0"
      >
        {items.map((item, i) => (
          <li
            key={item.title}
            className="group flex min-h-80 w-[82%] shrink-0 snap-start flex-col border border-rule bg-ink-900 p-8 transition-colors duration-500 hover:border-paper-50/30 sm:w-[46%] lg:w-[36%] lg:p-10"
          >
            <span className="t-num text-xs text-red-500">{pad(i + 1)}</span>
            <svg viewBox="0 -4 182 64" aria-hidden className="mt-10 w-24 rtl:-scale-x-100">
              <path d="M26 0H54.5L85.93 53.5H57.4Z" fill="none" stroke="rgb(244 243 239 / 0.25)" strokeWidth="1.5" />
              <path
                d="M127 0H155.5L125.65 53.5H97.15Z"
                fill="none"
                stroke="rgb(244 243 239 / 0.25)"
                strokeWidth="1.5"
              />
              <path
                d="M88.9 0L101.75 20.7L84.15 52.2L71.2 30.2Z"
                fill="#ed1c24"
                className="origin-center transition-opacity duration-500 group-hover:opacity-100"
                opacity="0.7"
              />
            </svg>
            <h3 className="t-title mt-auto pt-10">{item.title}</h3>
            <p className="t-body mt-3 text-paper-50/70">{item.text}</p>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex items-center gap-6">
        <p className="t-num text-sm text-mute-400" aria-live="polite" dir="ltr">
          <span className="text-paper-50">{pad(shown)}</span> / {pad(items.length)}
        </p>
        <span aria-hidden className="h-px flex-1 bg-rule" />
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={index === 0 && !atEnd}
            aria-label={prevLabel}
            className="flex size-12 items-center justify-center border border-rule text-paper-50 transition-colors hover:border-paper-50 disabled:opacity-30"
          >
            <ArrowIcon className="rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={atEnd}
            aria-label={nextLabel}
            className="flex size-12 items-center justify-center border border-rule text-paper-50 transition-colors hover:border-paper-50 disabled:opacity-30"
          >
            <ArrowIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
