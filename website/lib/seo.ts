import type { Metadata } from "next";
import { site } from "@/content/site";
import { locales, type Locale } from "@/content";

/** Per-page metadata with hreflang alternates. `path` is the route without the locale, e.g. "/about". */
export function pageMetadata(
  { title, description }: { title: string; description: string },
  locale: Locale,
  path = "",
): Metadata {
  const languages = Object.fromEntries(locales.map((l) => [l, `/${l}${path}`]));
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/${locale}${path}`, languages: { ...languages, "x-default": `/en${path}` } },
    openGraph: {
      title,
      description,
      url: `/${locale}${path}`,
      siteName: "Wagon Auto",
      locale: locale === "ar" ? "ar_BH" : "en_BH",
      type: "website",
      images: [{ url: "/brand/og.png", width: 1200, height: 630, alt: "Wagon Auto" }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/brand/og.png"] },
  };
}

export function organizationJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: locale === "ar" ? "واجن أوتو" : "Wagon Auto",
    legalName: locale === "ar" ? "واجن أوتو لتجارة السيارات ذ.م.م" : "Wagon Auto Auto Trading W.L.L.",
    url: `${site.url}/${locale}`,
    logo: `${site.url}/brand/wagon-auto-logo.svg`,
    address: {
      "@type": "PostalAddress",
      addressCountry: "BH",
      ...(site.address[locale] ? { streetAddress: site.address[locale] } : {}),
    },
    ...(site.email ? { email: site.email } : {}),
    ...(site.whatsappNumber ? { telephone: `+${site.whatsappNumber.replace(/\D/g, "")}` } : {}),
  };
}
