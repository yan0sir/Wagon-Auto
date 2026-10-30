"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll-scrubbed video (like an image sequence): the section is tall, the video is pinned
 * full-screen, and the scroll position sets the video's current time from the moment the
 * section enters the screen until it has fully left.
 * Scrolling down plays it forward, scrolling up plays it back, stopping holds the frame.
 *
 * The video is encoded with a keyframe every 2 frames so seeking is fast.
 * An optional short paragraph fades in as the section comes into view and out as it leaves.
 * Visitors with prefers-reduced-motion get a shorter, static section showing the poster frame.
 */
export function ScrollScrubVideo({ src, poster, text }: { src: string; poster: string; text?: string }) {
  const section = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const para = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const sec = section.current;
    const v = video.current;
    if (!sec || !v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sec.dataset.static = "true";
      return;
    }

    // Some browsers (iOS Safari) only allow seeking after playback has started once.
    v.play()
      .then(() => v.pause())
      .catch(() => {});

    let raf = 0;
    let current = 0;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const r = sec.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < -100 || r.top > vh + 100) return;

      // Progress runs across the whole time any part of the section is on screen
      // (top edge entering at the bottom → bottom edge leaving at the top), so the video
      // keeps moving while it slides in and out and only rests when fully out of sight.
      const p = Math.min(1, Math.max(0, (vh - r.top) / (r.height + vh)));

      // Ease toward the target time so scrubbing feels smooth, and skip while a seek is running.
      const duration = v.duration || 0;
      if (duration) {
        const target = p * (duration - 0.05);
        current += (target - current) * 0.18;
        if (!v.seeking && Math.abs(v.currentTime - current) > 0.02) v.currentTime = current;
      }

      // Paragraph: fades in once the section is about half on screen, out as it half leaves.
      const el = para.current;
      if (el) {
        const fadeIn = Math.min(1, Math.max(0, (p - 0.22) / 0.14));
        const fadeOut = Math.min(1, Math.max(0, (0.78 - p) / 0.14));
        el.style.opacity = String(Math.min(fadeIn, fadeOut));
        el.style.transform = `translateY(${(1 - fadeIn) * 32 - (1 - fadeOut) * 32}px)`;
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section ref={section} className="group/scrub relative h-[140vh] data-[static=true]:h-[70svh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <video
          aria-hidden
          ref={video}
          src={src}
          poster={poster}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          className="absolute inset-0 size-full object-cover grayscale-[20%]"
        />
        <div aria-hidden className="absolute inset-0 bg-navy-700/35 mix-blend-multiply" />
        <div aria-hidden className="absolute inset-0 bg-ink-950/30" />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--color-ink-950)_0%,transparent_22%,transparent_78%,var(--color-ink-950)_100%)]"
        />
        {text && (
          <div className="absolute inset-0 flex items-center justify-center px-5">
            <p
              ref={para}
              className="t-display-s mx-auto max-w-[30ch] text-center text-paper-50 opacity-0 [text-shadow:0_2px_24px_rgb(10_14_26/0.7)] group-data-[static=true]/scrub:opacity-100"
            >
              {text}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
