"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChatIcon } from "@/components/ui/icons";

/** Small persistent WhatsApp button; hidden at the top of the page and while a CTA band is visible. */
export function FloatingWhatsApp({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const [pastHero, setPastHero] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target);
        else visible.delete(e.target);
      }
      setCtaVisible(visible.size > 0);
    });
    // Re-scan after navigation so the new page's CTA bands are watched.
    const t = window.setTimeout(() => {
      document.querySelectorAll("[data-cta-band]").forEach((el) => io.observe(el));
    }, 50);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, [pathname]);

  const show = pastHero && !ctaVisible;
  const external = href.startsWith("http");

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={label}
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      className={`group fixed end-5 bottom-5 z-40 flex h-14 items-center gap-3 bg-red-500 px-5 text-white shadow-[0_12px_40px_-12px_rgb(237_28_36/0.6)] transition-all duration-500 hover:bg-red-700 sm:end-8 sm:bottom-8 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <ChatIcon width={20} height={20} />
      <span className="t-label hidden sm:inline">{label}</span>
    </a>
  );
}
