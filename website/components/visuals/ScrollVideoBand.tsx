"use client";

import { useEffect, useRef } from "react";

/**
 * Full-width video break that only plays while the visitor is scrolling.
 * - Plays when a scroll happens while the band is on screen; pauses ~150ms after scrolling stops.
 * - Muted + playsInline so browsers allow playback without a click (incl. iOS).
 * - Visitors with prefers-reduced-motion only see the poster frame.
 */
export function ScrollVideoBand({ src, poster }: { src: string; poster: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = wrap.current;
    const v = video.current;
    if (!el || !v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let stopTimer: number | undefined;

    const stop = () => {
      window.clearTimeout(stopTimer);
      v.pause();
    };
    // Checked on every scroll event (cheap), so it doesn't depend on IntersectionObserver timing.
    const onScreen = () => {
      const r = el.getBoundingClientRect();
      return r.bottom > 0 && r.top < window.innerHeight;
    };
    const onScroll = () => {
      if (!onScreen()) return stop();
      if (v.paused) v.play().catch(() => {});
      window.clearTimeout(stopTimer);
      stopTimer = window.setTimeout(() => v.pause(), 150);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      stop();
    };
  }, []);

  return (
    <div ref={wrap} aria-hidden className="relative h-[clamp(260px,42vw,560px)] overflow-hidden" data-reveal="">
      <video
        ref={video}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        className="band-photo absolute inset-0 size-full object-cover grayscale-[25%]"
      />
      <div className="absolute inset-0 bg-navy-700/30 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-transparent to-ink-950" />
      <div className="bg-grid absolute inset-0 opacity-25" />
    </div>
  );
}
