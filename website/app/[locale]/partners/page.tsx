import type { Metadata } from "next";
import { getContent, getLocale } from "@/content";
import { site } from "@/content/site";
import { rich } from "@/lib/rich";
import { pageMetadata } from "@/lib/seo";
import { waHref } from "@/lib/whatsapp";
import { ButtonLink, Container, SectionTitle, reveal } from "@/components/ui/primitives";
import { Carousel } from "@/components/ui/Carousel";
import { CardGrid, CtaBand, PageHero, Steps } from "@/components/sections/shared";

export async function generateMetadata(): Promise<Metadata> {
  const [c, locale] = await Promise.all([getContent(), getLocale()]);
  return pageMetadata(c.partners.seo, locale, "/partners");
}

export default async function PartnersPage() {
  const [c, locale] = await Promise.all([getContent(), getLocale()]);
  const p = c.partners;
  const ctaText = site.email ? p.cta.textWithEmail.replace("{email}", site.email) : p.cta.text;

  return (
    <>
      <PageHero headline={p.hero.headline} />

      <section className="py-16 lg:py-24">
        <Container>
          <SectionTitle title={p.whoWeWorkWith.label} intro={p.intro} />
          <div className="mt-10 lg:mt-12" {...reveal(1)}>
            <Carousel items={p.whoWeWorkWith.items} prevLabel={c.ui.previous} nextLabel={c.ui.next} />
          </div>
        </Container>
      </section>

      <section className="border-t border-rule py-16 lg:py-24">
        <Container>
          <SectionTitle title={rich(p.whatToExpect.title)} />
          <div className="mt-10">
            <CardGrid items={p.whatToExpect.items} columns={3} />
          </div>
        </Container>
      </section>

      <Steps title={p.howToStart.title} steps={p.howToStart.steps} />

      <CtaBand title={p.cta.title} text={ctaText}>
        <ButtonLink href={waHref(c.wa.supplier, locale)} icon="chat" size="lg">
          {c.ui.whatsapp}
        </ButtonLink>
        {site.email && (
          <ButtonLink href={`mailto:${site.email}`} variant="ghost" icon="mail" size="lg">
            {c.ui.email}
          </ButtonLink>
        )}
      </CtaBand>
    </>
  );
}
