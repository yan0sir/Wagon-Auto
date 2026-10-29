import { locale as localeParam } from "next/root-params";
import { notFound } from "next/navigation";
import { en, type Content } from "./en";
import { ar } from "./ar";

export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

const dictionaries: Record<Locale, Content> = { en, ar };

export const hasLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

/** Content for the current request's locale (read from the [locale] root segment). */
export async function getContent(): Promise<Content> {
  const value = await localeParam();
  if (!hasLocale(value)) notFound();
  return dictionaries[value];
}

export async function getLocale(): Promise<Locale> {
  const value = await localeParam();
  if (!hasLocale(value)) notFound();
  return value;
}

export type { Content };
