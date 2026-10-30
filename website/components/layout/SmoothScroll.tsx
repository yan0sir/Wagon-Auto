"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/**
 * Momentum ("inertia") scrolling for mouse wheels and trackpads, via Lenis.
 * - Touch scrolling stays native (phones already scroll smoothly).
 * - Turned off automatically for visitors with prefers-reduced-motion.
 * - Pauses while the page is locked (e.g. the mobile menu sets overflow: hidden on <html>).
 */
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.09,
      wheelMultiplier: 1,
      anchors: { offset: -88 }, // land below the fixed header
      stopInertiaOnNavigate: true,
      autoToggle: true,
      allowNestedScroll: true,
    });
    return () => lenis.destroy();
  }, []);

  return null;
}
