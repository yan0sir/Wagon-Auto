# Wagon Auto — Website

Bilingual (English / Arabic) company profile for Wagon Auto Auto Trading W.L.L.
Built with Next.js 16 (App Router, Cache Components), React 19 and Tailwind CSS 4.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000 → redirects to /en or /ar
npm run build      # production build (all pages prerender as static HTML)
npm start          # serve the production build
```

## Where things live

| What | Where |
|---|---|
| **Contact details** (WhatsApp, email, CR number, address, hours) | `content/site.ts` |
| English copy | `content/en.ts` (source: `../content/content-en.md`) |
| Arabic copy | `content/ar.ts` (source: `../content/content-ar.md`) |
| Design tokens (colors, type scale, highlight, reveal) | `app/globals.css` |
| Pages | `app/[locale]/…` (home, about, services, partners, contact) |
| Header, footer, rail, floating WhatsApp | `components/layout/` |
| Shared sections (page hero, steps, card grid, CTA band) | `components/sections/shared.tsx` |
| Placeholder artwork for image slots | `components/visuals/Visual.tsx` |
| Logos, OG image | `public/brand/` |
| Locale redirect (`/` → `/en` or `/ar`) | `proxy.ts` |

## Filling in the details

Everything in `content/site.ts` starts empty. Empty values are hidden on the site, and until the
WhatsApp number is set, every WhatsApp button links to the Contact page instead (in dev, the
Contact page shows a red reminder). Once you add the number, buttons open WhatsApp with a
pre-filled message in the visitor's language, and a QR code appears on the Contact page.

## Copy conventions

- `**text**` in any headline renders as a red highlight block.
- `ar.ts` is typed against `en.ts`, so a missing Arabic string fails the build.

## Adding photos later

`<Visual kind="import" />` renders brand artwork. Pass `src="/images/your-photo.jpg"` (and `alt`)
to show a real photo with the standard navy overlay instead.
