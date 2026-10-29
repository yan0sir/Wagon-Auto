import Link from "next/link";
import type { Content, Locale } from "@/content";
import { site } from "@/content/site";
import { waUrl } from "@/lib/whatsapp";
import { Container } from "@/components/ui/primitives";

export function Footer({ c, locale }: { c: Content; locale: Locale }) {
  const nav = [
    { href: `/${locale}`, label: c.nav.home },
    { href: `/${locale}/about`, label: c.nav.about },
    { href: `/${locale}/services`, label: c.nav.services },
    { href: `/${locale}/partners`, label: c.nav.partners },
    { href: `/${locale}/contact`, label: c.nav.contact },
  ];
  const wa = waUrl(c.wa.general);
  const address = site.address[locale];
  const other = locale === "ar" ? "en" : "ar";

  return (
    <footer className="relative border-t border-rule bg-ink-950">
      <Container className="pt-14 pb-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/wagon-auto-logo-reversed.svg"
              alt="Wagon Auto"
              width={128}
              height={65}
              className="h-16 w-auto"
            />
            <p className="t-body mt-6 max-w-xs text-mute-400">{c.footer.description}</p>
          </div>

          <div className="lg:col-span-2">
            <h2 className="t-label text-mute-400">{c.footer.company}</h2>
            <ul className="mt-5 space-y-3">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-paper-50/85 transition-colors hover:text-paper-50">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="t-label text-mute-400">{c.footer.services}</h2>
            <ul className="mt-5 space-y-3">
              {c.footer.servicesList.map((s) => (
                <li key={s}>
                  <Link href={`/${locale}/services`} className="text-paper-50/85 transition-colors hover:text-paper-50">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="t-label text-mute-400">{c.footer.contact}</h2>
            <ul className="mt-5 space-y-3 text-paper-50/85">
              {wa && (
                <li>
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="hover:text-paper-50">
                    {c.footer.whatsapp} <span dir="ltr">+{site.whatsappNumber.replace(/\D/g, "")}</span>
                  </a>
                </li>
              )}
              {site.email && (
                <li>
                  <a href={`mailto:${site.email}`} className="hover:text-paper-50" dir="ltr">
                    {site.email}
                  </a>
                </li>
              )}
              <li>{address ? `${address}, ${c.footer.location}` : c.footer.location}</li>
              {!wa && (
                <li>
                  <Link href={`/${locale}/contact`} className="hover:text-paper-50">
                    {c.nav.contact}
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-rule pt-6 text-sm text-mute-400 md:flex-row md:items-center md:justify-between">
          <p>
            {c.footer.rights}
            {site.crNumber && (
              <>
                {" · "}
                {c.footer.cr} <span className="t-num">{site.crNumber}</span>
              </>
            )}
          </p>
          <Link href={`/${other}`} hrefLang={other} lang={other} className="hover:text-paper-50">
            {c.nav.language}
          </Link>
        </div>
      </Container>
    </footer>
  );
}
