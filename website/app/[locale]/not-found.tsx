import { getContent, getLocale } from "@/content";
import { rich } from "@/lib/rich";
import { ButtonLink, Container } from "@/components/ui/primitives";

export default async function NotFound() {
  const [c, locale] = await Promise.all([getContent(), getLocale()]);
  return (
    <section className="flex min-h-[80svh] items-center pt-32 pb-20">
      <Container>
        <p className="t-num text-sm text-red-500">404</p>
        <h1 className="t-display-l mt-6 max-w-[16ch]">{rich(c.notFound.headline)}</h1>
        <p className="t-body mt-8 text-paper-50/75">{c.notFound.text}</p>
        <div className="mt-10">
          <ButtonLink href={`/${locale}`}>{c.notFound.cta}</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
