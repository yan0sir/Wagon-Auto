import type { Metadata } from "next";
import { getContent, getLocale } from "@/content";
import { site } from "@/content/site";
import { rich } from "@/lib/rich";
import { pageMetadata } from "@/lib/seo";
import { waHref } from "@/lib/whatsapp";
import { ButtonLink, Container, SectionTitle, reveal } from "@/components/ui/primitives";
import { CardGrid, CtaBand, PageHero } from "@/components/sections/shared";
import { Visual } from "@/components/visuals/Visual";

export async function generateMetadata(): Promise<Metadata> {
  const [c, locale] = await Promise.all([getContent(), getLocale()]);
  return pageMetadata(c.about.seo, locale, "/about");
}

export default async function AboutPage() {
  const [c, locale] = await Promise.all([getContent(), getLocale()]);
  const a = c.about;
  const d = a.companyDetails.rows;
  const rows = [
    d.legalName,
    d.legalForm,
    d.hq,
    ...(site.crNumber ? [{ label: d.cr.label, value: site.crNumber, mono: true }] : []),
    d.activity,
  ] as { label: string; value: string; mono?: boolean }[];

  return (
    <>
      <PageHero headline={a.hero.headline} photo="/images/hero-about-manama-waterfront.jpg" photoPosition="50% 60%" />

      {/* Story */}
      <section className="py-16 lg:py-24">
        <Container>
          <SectionTitle title={a.story.label} />
          <div className="mt-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="space-y-8">
              {a.story.paragraphs.map((p, i) => (
                <p key={i} className={i === 0 ? "t-title text-paper-50" : "t-body text-paper-50/75"} {...reveal(i)}>
                  {p}
                </p>
              ))}
            </div>
            <div {...reveal(2)}>
              <Visual kind="about" caption={c.footer.location} className="aspect-[4/3]" />
            </div>
          </div>
        </Container>
      </section>

      {/* Mission & vision */}
      <section className="bg-paper-50 py-24 text-navy-700 lg:py-36">
        <Container>
          <div className="grid gap-px md:grid-cols-2">
            {a.missionVision.map((m, i) => (
              <div
                key={m.title}
                className={`py-6 md:py-0 ${i ? "md:border-s md:border-navy-700/20 md:ps-12" : "md:pe-12"}`}
                {...reveal(i)}
              >
                <h2 className="t-title text-red-700">{m.title}</h2>
                <p className="t-display-s mt-6 max-w-[26ch]">{m.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24">
        <Container>
          <SectionTitle title={a.values.label} />
          <div className="mt-10">
            <CardGrid items={a.values.items} columns={2} />
          </div>
        </Container>
      </section>

      {/* Company details */}
      <section className="pb-16 lg:pb-24">
        <Container>
          <SectionTitle title={rich(a.companyDetails.title)} />
          <div
            className="relative mx-auto mt-10 max-w-4xl overflow-hidden border border-rule bg-ink-900"
            {...reveal(1)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/wagon-auto-mark.svg"
              alt=""
              aria-hidden
              className="pointer-events-none absolute -end-10 -bottom-10 w-72 opacity-[0.07]"
            />
            <dl>
              {rows.map((r) => (
                <div
                  key={r.label}
                  className="grid gap-2 border-b border-rule px-6 py-6 last:border-b-0 sm:grid-cols-3 sm:px-10"
                >
                  <dt className="t-label text-mute-400">{r.label}</dt>
                  <dd className={`sm:col-span-2 ${r.mono ? "t-num" : "t-title"}`}>{r.value}</dd>
                </div>
              ))}
            </dl>
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
