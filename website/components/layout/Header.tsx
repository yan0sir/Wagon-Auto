"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChatIcon, CloseIcon, MenuIcon } from "@/components/ui/icons";

type NavItem = { href: string; label: string };

export function Header({
  locale,
  items,
  homeLabel,
  waHref,
  waLabel,
  languageLabel,
  menuLabel,
  closeLabel,
}: {
  locale: string;
  items: NavItem[];
  homeLabel: string;
  waHref: string;
  waLabel: string;
  languageLabel: string;
  menuLabel: string;
  closeLabel: string;
}) {
  const pathname = usePathname() ?? `/${locale}`;
  const [scrolled, setScrolled] = useState(false);
  // The menu is open only on the page it was opened from, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (value: boolean | ((v: boolean) => boolean)) => {
    const next = typeof value === "function" ? value(open) : value;
    setOpenOn(next ? pathname : null);
  };
  const menuRef = useRef<HTMLDivElement>(null);

  const otherLocale = locale === "ar" ? "en" : "ar";
  const switchHref = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), `/${otherLocale}`) || `/${otherLocale}`;
  const isActive = (href: string) => (href === `/${locale}` ? pathname === href : pathname.startsWith(href));
  const waExternal = waHref.startsWith("http");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll while the menu is open; Escape closes it.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    window.addEventListener("keydown", onKey);
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled || open ? "border-b border-rule bg-ink-950/85 backdrop-blur-md" : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1440px] items-stretch lg:h-[72px]">
          <Link
            href={`/${locale}`}
            aria-label={`Wagon Auto · ${homeLabel}`}
            className="flex shrink-0 items-center ps-5 pe-6 sm:ps-8 lg:w-[128px] lg:justify-center lg:px-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/wagon-auto-logo-reversed.svg"
              alt="Wagon Auto"
              width={79}
              height={40}
              className="h-9 w-auto lg:h-10"
            />
          </Link>

          <nav aria-label="Main" className="hidden flex-1 items-center lg:flex">
            <ul className="flex items-center">
              {items.map((item) => (
                <li key={item.href} className="flex items-center">
                  <span aria-hidden className="mx-1 h-3 w-px bg-rule" />
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`t-label flex items-center gap-2 px-4 py-2 transition-colors ${
                      isActive(item.href) ? "text-paper-50" : "text-mute-400 hover:text-paper-50"
                    }`}
                  >
                    {isActive(item.href) && <span aria-hidden className="size-[6px] bg-red-500" />}
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ms-auto flex items-stretch">
            <Link
              href={switchHref}
              hrefLang={otherLocale}
              lang={otherLocale}
              className={`hidden items-center px-5 text-sm text-mute-400 transition-colors hover:text-paper-50 sm:flex ${
                otherLocale === "ar" ? "font-arabic text-[15px]" : "t-label"
              }`}
            >
              {languageLabel}
            </Link>
            <a
              href={waHref}
              target={waExternal ? "_blank" : undefined}
              rel={waExternal ? "noopener noreferrer" : undefined}
              className="t-label hidden items-center gap-3 bg-red-500 px-6 text-white transition-colors hover:bg-red-700 lg:flex"
            >
              <ChatIcon />
              {waLabel}
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? closeLabel : menuLabel}
              className="flex items-center px-5 text-paper-50 sm:px-8 lg:hidden"
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu: a sibling of <header>, because the header's backdrop-filter
          would otherwise become the containing block for this fixed overlay. */}
      <div
        id="mobile-menu"
        ref={menuRef}
        hidden={!open}
        className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-ink-950 lg:hidden"
      >
        <nav aria-label="Mobile" className="flex min-h-full flex-col px-5 pt-8 pb-10 sm:px-8">
          <ul className="flex flex-col">
            {items.map((item, i) => (
              <li key={item.href} className="border-b border-rule">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="flex items-baseline gap-5 py-5 text-3xl font-light"
                >
                  <span className="t-num text-xs text-mute-400">{String(i + 1).padStart(2, "0")}</span>
                  <span className={isActive(item.href) ? "text-paper-50" : "text-paper-50/80"}>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-col gap-3 pt-10">
            <a
              href={waHref}
              target={waExternal ? "_blank" : undefined}
              rel={waExternal ? "noopener noreferrer" : undefined}
              className="t-label flex h-14 items-center justify-between bg-red-500 px-5 text-white"
            >
              {waLabel}
              <ChatIcon />
            </a>
            <Link
              href={switchHref}
              hrefLang={otherLocale}
              lang={otherLocale}
              className="flex h-14 items-center justify-between border border-rule px-5 text-paper-50"
            >
              <span className={otherLocale === "ar" ? "font-arabic text-base" : "t-label"}>{languageLabel}</span>
              <span className="t-num text-xs text-mute-400">{otherLocale.toUpperCase()}</span>
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
