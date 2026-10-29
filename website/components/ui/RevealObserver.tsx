"use client";

import { useEffect } from "react";

/**
 * Marks `[data-reveal]` elements with `data-in` once they scroll into view.
 * One observer for the whole app, so sections stay Server Components.
 */
export function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-in", "");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
    );
    // Anything already on screen is revealed directly, so above-the-fold content never
    // depends on the observer firing (e.g. in background tabs, where it is paused).
    const scan = () =>
      document.querySelectorAll("[data-reveal]:not([data-in])").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.95 && r.bottom > 0) {
          window.setTimeout(() => el.setAttribute("data-in", ""), 40);
        } else {
          io.observe(el);
        }
      });
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
  return null;
}
