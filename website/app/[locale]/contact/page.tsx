import type { Metadata } from "next";
import QRCode from "qrcode";
import { getContent, getLocale } from "@/content";
import type { WaKey } from "@/content/en";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { waUrl } from "@/lib/whatsapp";
import { Container, SectionTitle, reveal } from "@/components/ui/primitives";
import { ArrowUpRightIcon, ChatIcon } from "@/components/ui/icons";
import { PageHero } from "@/components/sections/shared";

export async function generateMetadata(): Promise<Metadata> {
  const [c, locale] = await Promise.all([getContent(), getLocale()]);
  return pageMetadata(c.contact.seo, locale, "/contact");
}

export default async function ContactPage() {
  const [c, locale] = await Promise.all([getContent(), getLocale()]);
  const k = c.contact;
  const general = waUrl(c.wa.general);
  const qr = general
    ? await QRCode.toString(general, { type: "svg", margin: 0, color: { dark: "#0a0e1a", light: "#f4f3ef" } })
    : null;

  const details = [
    site.whatsappNumber && {
      label: k.details.whatsapp,
      value: `+${site.whatsappNumber.replace(/\D/g, "")}`,
      href: general ?? undefined,
      ltr: true,
    },
    site.email && { label: k.details.email, value: site.email, href: `mailto:${site.email}`, ltr: true },
    {
      label: k.details.office,
      value: site.address[locale]
        ? `${site.address[locale]}${locale === "ar" ? "، " : ", "}${k.details.officeFallback}`
        : k.details.officeFallback,
    },
    site.hours[locale] && { label: k.details.hours, value: site.hours[locale] },
  ].filter(Boolean) as { label: string; value: string; href?: string; ltr?: boolean }[];

  return (
    <>
      <PageHero
        headline={k.hero.headline}
        text={k.hero.text}
        photo="/images/hero-contact-manama-lights.jpg"
        photoPosition="50% 60%"
      />

      <section className="py-14 lg:py-20">
        <Container>
          <SectionTitle title={k.topics.prompt} className="mb-10" />
          <div className="mx-auto max-w-5xl">
            {!general && process.env.NODE_ENV !== "production" && (
              <p className="t-label mb-8 border border-dashed border-red-500/60 px-5 py-4 text-red-500 normal-case">
                {c.ui.devMissingWhatsapp}
              </p>
            )}

            <ul className="grid gap-px border border-rule bg-rule sm:grid-cols-2">
              {k.topics.items.map((t, i) => {
                const href = waUrl(c.wa[t.wa as WaKey]);
                const inner = (
                  <>
                    <span className="t-num text-xs text-red-500">{String(i + 1).padStart(2, "0")}</span>
                    <span className="t-title mt-10 block">{t.label}</span>
                    <span className="mt-6 flex items-center gap-3 text-mute-400 transition-colors group-hover:text-paper-50">
                      <ChatIcon />
                      <span className="t-label">{c.ui.whatsapp}</span>
                      <ArrowUpRightIcon className="ms-auto" />
                    </span>
                  </>
                );
                return (
                  <li key={t.label} className="bg-ink-950" {...reveal(i % 2)}>
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block h-full p-8 transition-colors duration-500 hover:bg-ink-900 lg:p-10"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div aria-disabled className="group block h-full cursor-not-allowed p-8 opacity-60 lg:p-10">
                        {inner}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-12 grid gap-12 lg:grid-cols-9 lg:gap-10">
              <div className="lg:col-span-6">
                <h2 className="t-title" {...reveal(0)}>
                  {k.details.label}
                </h2>
                <dl className="mt-6 border-t border-rule">
                  {details.map((d) => (
                    <div key={d.label} className="grid gap-2 border-b border-rule py-6 sm:grid-cols-3" {...reveal(0)}>
                      <dt className="t-label text-mute-400">{d.label}</dt>
                      <dd className="t-title sm:col-span-2">
                        {d.href ? (
                          <a
                            href={d.href}
                            dir={d.ltr ? "ltr" : undefined}
                            className="transition-colors hover:text-red-500"
                          >
                            {d.value}
                          </a>
                        ) : (
                          <span dir={d.ltr ? "ltr" : undefined}>{d.value}</span>
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
              {qr && (
                <div className="hidden lg:col-span-3 lg:block" {...reveal(1)}>
                  <div className="border border-rule bg-paper-50 p-6">
                    <div className="aspect-square w-full [&>svg]:size-full" dangerouslySetInnerHTML={{ __html: qr }} />
                  </div>
                  <p className="t-label mt-4 text-mute-400">{k.topics.qr}</p>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
