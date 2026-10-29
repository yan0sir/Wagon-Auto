# Wagon Auto — Implementation Plan

> Companion to [WEBSITE_BRIEF.md](WEBSITE_BRIEF.md). Copy: [content/content-en.md](content/content-en.md) · [content/content-ar.md](content/content-ar.md). Logos: [assets/brand/](assets/brand/).
> Build in order; each phase ends in something reviewable.

## Stack

| Concern | Choice |
|---|---|
| Framework | **Next.js (App Router) + TypeScript**, static output (SSG) |
| Styling | **Tailwind CSS** with tokens as CSS variables and logical (RTL-safe) utilities |
| i18n | `next-intl` with `[locale]` routing (`en`, `ar`) and middleware locale detection |
| Fonts | `next/font/google`: IBM Plex Sans, IBM Plex Sans Arabic, IBM Plex Mono |
| Motion | **Framer Motion** for reveals and highlight wipes |
| Carousel | Embla Carousel (RTL support built in) |
| QR code | `qrcode` package, generated at build time |
| Content | Typed TS content files per locale, converted from the two content docs (no CMS) |
| Hosting | Vercel |
| Quality | ESLint, Prettier, Lighthouse CI, axe |

## Folder structure

```
wagon-auto/
├── app/[locale]/
│   ├── layout.tsx          # html lang/dir, fonts, header, footer, floating WhatsApp
│   ├── page.tsx            # Home
│   ├── about/page.tsx
│   ├── services/page.tsx
│   ├── partners/page.tsx
│   ├── contact/page.tsx
│   └── not-found.tsx
├── components/
│   ├── layout/    Header, MobileMenu, Footer, Rail, LanguageSwitch, FloatingWhatsApp
│   ├── ui/        HighlightHeading, SectionLabel, Button, WhatsAppButton, Reveal, Accordion, Carousel
│   └── sections/  Hero, Statement, ServicePanel, WhyBahrain, Process, Commitments,
│                  PartnerTeaser, CtaBand, CompanyDetails, ValuesGrid, MissionVision,
│                  ServiceDetail, Faq, PartnerTypes, ContactTopics, ContactDetails
├── content/
│   ├── types.ts            # one shared Content type
│   ├── site.ts             # contact placeholders: WHATSAPP_NUMBER, EMAIL, CR_NUMBER, ADDRESS, HOURS
│   ├── en.ts               # from content-en.md
│   └── ar.ts               # from content-ar.md (same type, so missing keys fail the build)
├── lib/                    whatsapp.ts, seo.ts, i18n.ts
├── public/
│   ├── brand/              SVG logos from assets/brand
│   ├── images/             graded stock + CREDITS.md
│   └── video/              hero.mp4, hero.webm, hero-poster.jpg
└── styles/globals.css      design tokens
```

---

## Phase 0 — Inputs
- [x] Logo converted to SVG: full color, reversed, white and mark-only versions.
- [x] English and Arabic copy written.
- [ ] Shortlist stock: 1 hero video + poster, about 9 stills (4 services, Bahrain port/causeway, process, about, partners, CTA). Log licenses in `public/images/CREDITS.md`.
- [ ] Later: WhatsApp number, email, CR number, address, hours, domain. The site ships with placeholders in `content/site.ts`, and anything still empty is hidden.

## Phase 1 — Scaffolding
- [ ] `create-next-app` (TS, Tailwind, App Router, ESLint) + Prettier.
- [ ] Install `next-intl`, `framer-motion`, `embla-carousel-react`, `qrcode`, `clsx`.
- [ ] `[locale]` routing + middleware (default `en`, detect `ar`); `generateStaticParams`.
- [ ] Root layout sets `<html lang dir>` and loads fonts, switching the font stack by locale.
- [ ] Copy `assets/brand/*.svg` → `public/brand/`; generate favicons from `wagon-auto-mark.svg`.
- [ ] Deploy the empty shell to Vercel.

**Done when:** `/en` and `/ar` render, `/ar` is RTL, and there is a preview URL.

## Phase 2 — Tokens and primitives
- [ ] Tokens from brief §3 in `globals.css` (exact logo colors `#ED1C24`, `#AC1929`, `#00246A`) and mapped in Tailwind.
- [ ] `HighlightHeading`: turns `**…**` in content strings into red highlight spans; `box-decoration-break: clone`; wipes in from the start side.
- [ ] `SectionLabel` (`■ LABEL`), `Reveal`, `Button`, `Accordion`, `Carousel` (`01 / 05` counter, mirrored arrows).
- [ ] `lib/whatsapp.ts`: `waLink(key, locale)` → `https://wa.me/{number}?text={encoded message}`; returns `null` while the number is a placeholder, so buttons fall back to `/contact`.
- [ ] `Rail` (start-side 1px rule; hidden under `md`).
- [ ] Temporary `/[locale]/styleguide` page.

## Phase 3 — Content layer
- [ ] Define `content/types.ts` from the section keys in the content docs.
- [ ] Convert `content-en.md` → `en.ts` and `content-ar.md` → `ar.ts` word for word, without rewording.
- [ ] `content/site.ts` holds the `{{…}}` placeholders. Helpers hide the CR row, email and address until they are filled.

## Phase 4 — Global layout
- [ ] Header (reversed logo, nav, language switch keeping the current path, red WhatsApp block, scroll state).
- [ ] Mobile menu (full screen, focus trap).
- [ ] Footer (description, nav, services, contact, legal line).
- [ ] Floating WhatsApp (hidden when a `CtaBand` is visible).

## Phase 5 — Home
- [ ] `hero`: video (muted, loop, `playsInline`, poster first), navy overlay, highlight headline, two CTAs, pause/play, mono location label.
- [ ] `who-we-are`: large statement, highlights on scroll.
- [ ] `what-we-do`: 4 × `ServicePanel` (full-bleed image, alternating sides).
- [ ] `why-bahrain`: statement + 3 facts over a port image.
- [ ] `how-we-work`: light paper section, 5 numbered steps.
- [ ] `commitments`: 2×2 grid.
- [ ] `partner-teaser` → `/partners`.
- [ ] `cta` band.

## Phase 6 — Inner pages
- [ ] **About:** hero, story, mission/vision, values, `CompanyDetails` card (registration-style), CTA.
- [ ] **What We Do:** hero, 4 × `ServiceDetail` (text + included list + "who it's for"), process (reused), FAQ accordion, CTA.
- [ ] **Partner With Us:** hero, intro, partner-types carousel, what-to-expect grid, 4-step start, CTA (WhatsApp `wa.supplier` + email).
- [ ] **Contact:** hero, topic chips (change the WhatsApp message), desktop QR code, details list.
- [ ] **404** page.

## Phase 7 — RTL and language QA
- [ ] Check every page in `/ar`: mirrored rail, wipes, carousel, arrows (`←` / `→`), list markers.
- [ ] Arabic display sizes: no clipped diacritics; line-height 1.8 for body.
- [ ] Highlight blocks wrap correctly in Arabic (no broken joins across spans).
- [ ] Native Arabic proofread, and confirm the registered Arabic legal name.

## Phase 8 — SEO, performance, accessibility
- [ ] `generateMetadata` from the SEO lines in the content docs; `hreflang` alternates; OG image per locale (logo on ink background).
- [ ] JSON-LD `Organization` + `LocalBusiness` (Bahrain); add the address and phone once known.
- [ ] `sitemap.ts`, `robots.ts`, manifest.
- [ ] AVIF/WebP images with `sizes`; hero video under 4MB (mp4 + webm).
- [ ] Lighthouse mobile at 90 or above; axe shows 0 critical issues; keyboard pass.

## Phase 9 — Launch
- [ ] Fill `content/site.ts` with the real contact details and CR number.
- [ ] Domain on Vercel, HTTPS, `www` redirect.
- [ ] Optional analytics with WhatsApp clicks as the key event.
- [ ] Remove `/styleguide`; cross-browser check (iOS Safari, Android Chrome, desktop browsers).

## Later
- Replace stock with real photography (office, yard, shipments).
- Add a facts/numbers section once real figures exist (vehicles traded, markets, partners).
- Add a downloadable company profile PDF (EN/AR) for supplier introductions.
- CMS (e.g. Sanity) if news or inventory becomes necessary.
