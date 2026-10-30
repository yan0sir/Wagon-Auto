import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Sans_Arabic } from "next/font/google";
import { getContent, getLocale, locales } from "@/content";
import { site } from "@/content/site";
import { waHref } from "@/lib/whatsapp";
import { organizationJsonLd } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Rail } from "@/components/layout/Rail";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import "../globals.css";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});
const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-plex-arabic",
  display: "swap",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const c = await getContent();
  return {
    metadataBase: new URL(site.url),
    title: { default: c.home.seo.title, template: "%s | Wagon Auto" },
    description: c.home.seo.description,
    applicationName: "Wagon Auto",
  };
}

export const viewport: Viewport = {
  themeColor: "#0a0e1a",
  colorScheme: "dark",
};

export default async function LocaleLayout({ children }: LayoutProps<"/[locale]">) {
  const locale = await getLocale();
  const c = await getContent();

  const nav = [
    { href: `/${locale}/about`, label: c.nav.about },
    { href: `/${locale}/services`, label: c.nav.services },
    { href: `/${locale}/partners`, label: c.nav.partners },
    { href: `/${locale}/contact`, label: c.nav.contact },
  ];
  const wa = waHref(c.wa.general, locale);

  return (
    <html
      lang={locale}
      dir={c.dir}
      className={`${plexSans.variable} ${plexArabic.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Enables scroll-reveal styles only when JavaScript runs */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd(locale)) }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="t-label fixed start-4 top-4 z-[60] -translate-y-24 bg-red-500 px-4 py-3 text-white focus:translate-y-0"
        >
          {c.ui.skipToContent}
        </a>
        <Header
          locale={locale}
          items={nav}
          homeLabel={c.nav.home}
          waHref={wa}
          waLabel={c.nav.cta}
          languageLabel={c.nav.language}
          menuLabel={c.nav.menu}
          closeLabel={c.nav.close}
        />
        <Rail />
        <main id="main">{children}</main>
        <Footer c={c} locale={locale} />
        <FloatingWhatsApp href={wa} label={c.ui.whatsapp} />
        <RevealObserver />
        <SmoothScroll />
      </body>
    </html>
  );
}
