import type { Metadata } from "next";
import { getContent, getLocale } from "@/content";
import { pageMetadata } from "@/lib/seo";
import { waHref } from "@/lib/whatsapp";
import { ButtonLink, Container, SectionTitle, TextLink, reveal } from "@/components/ui/primitives";
import { FoldMark, PlusIcon } from "@/components/ui/icons";
import { CtaBand, PageHero, Steps } from "@/components/sections/shared";
import { Visual, type VisualKind } from "@/components/visuals/Visual";

export async function generateMetadata(): Promise<Metadata> {
  const [c, locale] = await Promise.all([getContent(), getLocale()]);
  return pageMetadata(c.services.seo, locale, "/services");
}

const pad = (n: number) => String(n).padStart(2, "0");

export default async function ServicesPage() {
  const [c, locale] = await Promise.all([getContent(), getLocale()]);
  const s = c.services;

  return (
    <>
      <PageHero headline={s.hero.headline} text={s.hero.text} />

      {/* Jump list */}
      <nav aria-label={s.hero.label} className="border-b border-rule">
        <Container>
          <ul className="grid grid-cols-2 border-s border-rule lg:grid-cols-4">
            {s.items.map((item, i) => (
              <li key={item.id} className="border-e border-b border-rule lg:border-b-0">
                <a
                  href={`#${item.id}`}
                  className="group flex items-center gap-4 px-1 py-6 transition-colors hover:text-paper-50 sm:px-6"
                >
                  <span className="t-num text-xs text-red-500">{pad(i + 1)}</span>
                  <span className="text-paper-50/80 group-hover:text-paper-50">{item.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      {/* Services in depth */}
      {s.items.map((item, i) => (
        <section key={item.id} id={item.id} className="scroll-mt-20 border-b border-rule py-14 lg:py-20">
          <Container>
            <SectionTitle
              title={
                <>
                  <span className="t-num mb-5 block text-sm text-red-500">{pad(i + 1)}</span>
                  {item.title}
                </>
              }
              intro={item.subtitle}
            />
            <div className="mt-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
              <p className="t-body text-paper-50/75" {...reveal(0)}>
                {item.text}
              </p>
              <div {...reveal(1)}>
                <Visual kind={item.id as VisualKind} caption={`Fig. ${pad(i + 1)}`} className="aspect-[4/3]" />
              </div>
            </div>

            <div className="mt-10 grid gap-px border border-rule bg-rule md:grid-cols-5">
              <div className="bg-ink-950 p-8 md:col-span-3 lg:p-10" {...reveal(0)}>
                <h3 className="t-label text-mute-400">{c.ui.included}</h3>
                <ul className="mt-6 space-y-4">
                  {item.included.map((line) => (
                    <li key={line} className="flex items-start gap-4">
                      <FoldMark className="mt-1.5 shrink-0 text-red-500" />
                      <span className="t-body">{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col bg-ink-900 p-8 md:col-span-2 lg:p-10" {...reveal(1)}>
                <h3 className="t-label text-mute-400">{c.ui.whoFor}</h3>
                <p className="t-title mt-6">{item.whoFor}</p>
                {item.id === "partnerships" && (
                  <div className="mt-auto pt-10">
                    <TextLink href={`/${locale}/partners`}>{s.partnersLink}</TextLink>
                  </div>
                )}
              </div>
            </div>
          </Container>
        </section>
      ))}

      <Steps title={c.home.howWeWork.title} steps={c.home.howWeWork.steps} />

      {/* FAQ */}
      <section className="py-16 lg:py-24">
        <Container>
          <SectionTitle title={s.faq.label} />
          <div className="mx-auto mt-10 max-w-4xl border-t border-rule">
            {s.faq.items.map((f, i) => (
              <details key={f.q} className="group border-b border-rule" {...reveal(i)}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-7 [&::-webkit-details-marker]:hidden">
                  <span className="t-title">{f.q}</span>
                  <PlusIcon className="shrink-0 text-red-500 transition-transform duration-300 group-open:rotate-45" />
                </summary>
                <p className="t-body max-w-2xl pb-8 text-paper-50/75">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand title={c.home.cta.title} text={c.home.cta.text}>
        <ButtonLink href={waHref(c.wa.general, locale)} icon="chat" size="lg">
          {c.home.cta.button}
        </ButtonLink>
      </CtaBand>
    </>
  );
}
