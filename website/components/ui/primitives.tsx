import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { ArrowIcon, ChatIcon, MailIcon } from "./icons";

/** Page-width wrapper. On desktop, content starts after the vertical rail. */
export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:ps-[128px] lg:pe-16 ${className}`}>{children}</div>
  );
}

/**
 * Centered section heading with an optional intro line underneath.
 * `title` may contain `**highlight**` markers (rendered by the caller via `rich`).
 */
export function SectionTitle({
  title,
  intro,
  tone = "dark",
  as: Tag = "h2",
  className = "",
}: {
  title: ReactNode;
  intro?: ReactNode;
  tone?: "dark" | "light";
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-3xl text-center ${className}`}>
      <Tag className="t-display-m mx-auto max-w-[22ch]" {...reveal(0)}>
        {title}
      </Tag>
      {intro && (
        <p
          className={`t-body mx-auto mt-6 max-w-2xl ${tone === "light" ? "text-navy-700/75" : "text-paper-50/75"}`}
          {...reveal(1)}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

/** Adds a scroll-reveal with an optional stagger step. */
export const reveal = (step = 0) => ({ "data-reveal": "", style: { "--d": step } as CSSProperties });

type Variant = "primary" | "ghost" | "ghostLight" | "navy";
const variants: Record<Variant, string> = {
  primary: "bg-red-500 text-white hover:bg-red-700",
  ghost: "border border-paper-50/25 text-paper-50 hover:border-paper-50 hover:bg-paper-50/5",
  ghostLight: "border border-navy-700/30 text-navy-700 hover:border-navy-700",
  navy: "bg-navy-700 text-white hover:bg-ink-900",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  icon = "arrow",
  size = "md",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  icon?: "arrow" | "chat" | "mail" | "none";
  size?: "md" | "lg";
  className?: string;
}) {
  const external = /^(https?:|mailto:)/.test(href);
  const cls = `group t-label inline-flex items-center justify-between gap-6 transition-colors duration-300 ${
    size === "lg" ? "h-16 px-8 text-[12.5px]" : "h-12 px-5"
  } ${variants[variant]} ${className}`;
  const iconEl =
    icon === "arrow" ? (
      <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
    ) : icon === "chat" ? (
      <ChatIcon />
    ) : icon === "mail" ? (
      <MailIcon />
    ) : null;
  const inner = (
    <>
      <span>{children}</span>
      {iconEl}
    </>
  );
  return external ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

/** Inline text link with arrow. */
export function TextLink({
  href,
  children,
  tone = "dark",
}: {
  href: string;
  children: ReactNode;
  tone?: "dark" | "light";
}) {
  return (
    <Link
      href={href}
      className={`group t-label inline-flex items-center gap-3 border-b pb-1 transition-colors ${
        tone === "light"
          ? "border-navy-700/30 text-navy-700 hover:border-red-500"
          : "border-paper-50/25 text-paper-50 hover:border-red-500"
      }`}
    >
      {children}
      <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
    </Link>
  );
}
