import type { Metadata } from "next";
import { getContent, getLocale } from "@/content";
import { rich } from "@/lib/rich";
import { pageMetadata } from "@/lib/seo";
import { waHref } from "@/lib/whatsapp";
import { ButtonLink, Container, SectionTitle, TextLink, reveal } from "@/components/ui/primitives";
import { CardGrid, CtaBand, Steps } from "@/components/sections/shared";
import { HeroBackdrop } from "@/components/visuals/HeroBackdrop";
import { Visual, type VisualKind } from "@/components/visuals/Visual";

export async function generateMetadata(): Promise<Metadata> {
  const [c, locale] = await Promise.all([getContent(), getLocale()]);
  return pageMetadata(c.home.seo, locale);
}

const serviceVisuals: VisualKind[] = ["import", "export", "sourcing", "partnerships"];
const pad = (n: number) => String(n).padStart(2, "0");

export default async function HomePage() {
  const [c, locale] = await Promise.all([getContent(), getLocale()]);
  const h = c.home;

  return (
    <>
      {/* Hero */}
      <HeroBackdrop photo="/images/hero-highway-night.jpg">
        <Container className="flex flex-1 flex-col justify-end pt-28 pb-16 lg:pb-20">
          <h1 className="t-display-l max-w-[14ch]" {...reveal(0)}>
            {rich(h.hero.headline)}
          </h1>
          <p className="t-body mt-8 max-w-2xl text-paper-50/75" {...reveal(1)}>
            {h.hero.subhead}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap" {...reveal(2)}>
            <ButtonLink href={`/${locale}/partners`}>{h.hero.primaryCta}</ButtonLink>
            <ButtonLink href={waHref(c.wa.general, locale)} variant="ghost" icon="chat">
              {h.hero.secondaryCta}
            </ButtonLink>
          </div>
        </Container>
      </HeroBackdrop>

      {/* Who we are */}
      <section className="py-14 lg:py-20">
        <Container>
          <p className="t-display-s mx-auto max-w-[34ch] text-center text-paper-50/90" {...reveal(0)}>
            {rich(h.whoWeAre.statement)}
          </p>
        </Container>
      </section>

      {/* What we do */}
      <section className="border-t border-rule py-16 lg:py-24">
        <Container>
          <SectionTitle title={rich(h.whatWeDo.title)} />

          <div className="mt-12 flex flex-col gap-14 lg:mt-16 lg:gap-20">
            {h.whatWeDo.items.map((item, i) => (
              <article key={item.title} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-10">
                <div className={`lg:col-span-6 ${i % 2 ? "lg:order-2 lg:col-start-7" : ""}`} {...reveal(0)}>
                  <Visual kind={serviceVisuals[i]} caption={`Fig. ${pad(i + 1)}`} className="aspect-[4/3]" />
                </div>
                <div className={`lg:col-span-5 ${i % 2 ? "lg:order-1 lg:col-start-1" : "lg:col-start-8"}`}>
                  <p className="t-num text-sm text-red-500" {...reveal(0)}>
                    {pad(i + 1)} <span className="text-mute-400">/ {pad(h.whatWeDo.items.length)}</span>
                  </p>
                  <h3 className="t-display-m mt-6" {...reveal(1)}>
                    {item.title}
                  </h3>
                  <p className="t-title mt-4 text-mute-400" {...reveal(2)}>
                    {item.subtitle}
                  </p>
                  <p className="t-body mt-6 text-paper-50/75" {...reveal(3)}>
                    {item.text}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center" {...reveal(0)}>
            <TextLink href={`/${locale}/services`}>{h.whatWeDo.link}</TextLink>
          </div>
        </Container>
      </section>

      {/* How we work */}
      <Steps title={h.howWeWork.title} steps={h.howWeWork.steps} />

      {/* Commitments */}
      <section className="py-16 lg:py-24">
        <Container>
          <SectionTitle title={rich(h.commitments.title)} />
          <div className="mt-10">
            <CardGrid items={h.commitments.items} columns={2} />
          </div>
        </Container>
      </section>

      {/* For suppliers */}
      <section className="pb-16 lg:pb-24">
        <Container>
          <div className="grid overflow-hidden border border-rule bg-ink-900 lg:grid-cols-12">
            <div className="p-8 sm:p-12 lg:col-span-7 lg:p-16">
              <h2 className="t-display-m max-w-[18ch]" {...reveal(1)}>
                {rich(h.partnerTeaser.title)}
              </h2>
              <p className="t-body mt-6 max-w-xl text-paper-50/75" {...reveal(2)}>
                {h.partnerTeaser.text}
              </p>
              <div className="mt-10" {...reveal(3)}>
                <ButtonLink href={`/${locale}/partners`}>{h.partnerTeaser.cta}</ButtonLink>
              </div>
            </div>
            <div className="min-h-72 lg:col-span-5">
              <Visual
                kind="gulf"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="h-full min-h-72 border-0 border-t border-rule lg:border-t-0 lg:border-s"
              />
            </div>
          </div>
        </Container>
      </section>

      <CtaBand title={h.cta.title} text={h.cta.text}>
        <ButtonLink href={waHref(c.wa.general, locale)} icon="chat" size="lg">
          {h.cta.button}
        </ButtonLink>
      </CtaBand>
    </>
  );
}
