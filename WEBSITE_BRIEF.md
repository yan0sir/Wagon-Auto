# Wagon Auto — Website Brief

> Status: ideation, v2 (2026-10-22).
> Copy lives in [content/content-en.md](content/content-en.md) and [content/content-ar.md](content/content-ar.md).
> Placeholders such as `{{WHATSAPP_NUMBER}}` are contact details to be filled in later.

---

## 1. Purpose

**Who:** Wagon Auto Auto Trading W.L.L., a vehicle trading company registered in the Kingdom of Bahrain, focused on import and export.

**What the site is:** a bilingual (English/Arabic) **company profile**. It has no inventory, no statistics and no client list.

**The business problem it solves:** Wagon Auto is building its supply side. Before a manufacturer, distributor, dealer or exporter agrees to supply vehicles, they will look the company up. The site must make Wagon Auto look **legitimate, organised and serious**, and make it easy to start a conversation.

**The site's job:**
1. **Authenticate the company.** It shows a registered Bahraini entity, a clear legal identity, professional presentation and a defined way of working.
2. **Speak to suppliers first.** A dedicated "Partner With Us" page explains who Wagon Auto wants to work with and what partners can expect.
3. **Explain the offer.** Import, export and re-export, vehicle sourcing, and trade partnerships.
4. **Open a conversation** on WhatsApp, with email as a second channel.

**Content rule: no invented facts.** There are no volumes, years in business, client logos or brand partnerships to show, so the copy builds credibility through:
- **Identity:** legal name, legal form, Bahrain registration (CR number), office location.
- **Process:** a clear, written way of working.
- **Commitments:** what partners can expect (written terms, banked payments, compliant paperwork).
- **Context:** real facts about Bahrain as a trade base (Khalifa Bin Salman Port, King Fahd Causeway, GCC market access).

**Audiences, in priority order**
| # | Audience | What they need to see |
|---|---|---|
| 1 | **Vehicle suppliers:** manufacturers, distributors, dealers, exporters, auction houses | A real, registered company; a professional process; payment and documentation handled properly; one clear contact |
| 2 | Future buyers: dealers, fleets, rental companies, GCC traders | What Wagon Auto can source and how it works |
| 3 | Banks, logistics and insurance partners | Legal identity and a credible presentation |

**Success looks like:** a supplier who has never heard of Wagon Auto finishes a 60-second visit thinking "this is a proper company" and taps WhatsApp.

---

## 2. Reference synthesis

The direction is a **hybrid**: Atalanta's structure and restraint, plus DCVC's highlighted headlines, in Wagon red and navy.

| Take from **atalanta.tech** | Take from **dcvc.com** | Leave out |
|---|---|---|
| Dark, calm, full-bleed base | **Red highlight blocks behind key headline words** | Light/white base |
| Thin vertical rule on the start edge with **`■` section labels** | Full-screen **video hero** with a pause/play control | News, posts and media feeds |
| Very large, light-weight statement text | **Monospace micro-labels** (`01 — IMPORT`, `MANAMA · BAHRAIN`) | Portfolio, statistics and "first investment" data (we have none) |
| One repeating template per service, over full-bleed images | **Card carousel** with an `01 / 05` counter, used for "Who we work with" | Promo banners |
| Fade/rise reveals on scroll | Multi-column footer | |
| Small uppercase nav with a solid CTA block at the end | | |

---

## 3. Design system

### 3.1 Color

Brand colors are **sampled exactly from the logo**.

| Token | Value | Use |
|---|---|---|
| `--red-500` | `#ED1C24` | Brand red (logo): highlight blocks, primary CTA, active states |
| `--red-700` | `#AC1929` | Fold red (inner "W" diamond): hover/pressed, secondary accents |
| `--navy-700` | `#00246A` | Brand navy (wordmark): text on light sections, light-section accents |
| `--ink-950` | `#0A0E1A` | Page background (near-black navy) |
| `--ink-900` | `#111729` | Raised surfaces, scrolled nav |
| `--ink-800` | `#1B2440` | Borders, tiles, dividers |
| `--paper-50` | `#F4F3EF` | Light sections; primary text on dark |
| `--mute-400` | `#8A90A2` | Secondary text, labels |
| `--rule` | `rgba(244,243,239,0.12)` | Vertical rail, hairlines |
| `--whatsapp` | `#25D366` | WhatsApp icon only |

**Rules**
- Red is an accent: highlight blocks, primary CTA, active nav. Never body text, never a large fill.
- Text contrast must be at least 4.5:1. On red highlight blocks, use white text at display sizes only.
- Dark is the default. One or two light "paper" sections per page (in navy text) add rhythm.

### 3.2 Typography

| Role | English | Arabic | Notes |
|---|---|---|---|
| Display | **IBM Plex Sans** 300 | **IBM Plex Sans Arabic** 300 | Huge and light; highlighted words use 500 |
| Body | IBM Plex Sans 400 | IBM Plex Sans Arabic 400 | 17–18px; line-height 1.6 EN / 1.8 AR |
| Labels/nav | **IBM Plex Mono** 500, uppercase, +0.08em | IBM Plex Sans Arabic 500 | Arabic has no uppercase or mono |

The logo's wordmark is drawn in a heavy geometric sans (redrawn from Montserrat ExtraBold). It is part of the logo, not a site font.

**Scale (fluid `clamp`):** `display-xl` 56→128 · `display-l` 40→88 · `display-m` 32→56 · `title` 22→28 · `body` 17→18 · `label` 11→12 (px).

### 3.3 Signature elements
1. **Highlight headline.** `**words**` in the copy render on a solid red block that wipes in from the start side (left in EN, right in AR).
2. **The rail.** A 1px vertical rule near the start edge, carrying `■ SECTION` labels. It mirrors in Arabic.
3. **`■` square bullet.** Echoes the angular "W".
4. **The fold.** The logo's dark-red diamond is used as a small graphic motif: list markers, a CTA arrow corner, section dividers. Use it sparingly.
5. **Tile grid transition** (optional): Atalanta-style fading ink tiles between sections.

### 3.4 Layout
- 12-column grid, max width 1440px; content starts after the rail.
- Spacing: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 160px. Sections are 128–160px apart on desktop and 80–96px on mobile.
- Breakpoints: 640 / 768 / 1024 / 1280 / 1536. Below `md` the rail becomes an inline label.
- Square corners (0–2px), matching the logo.

### 3.5 Motion
- Reveal: fade + 24px rise, 600ms, `cubic-bezier(.2,.7,.2,1)`, 60ms stagger.
- Highlight wipe: 500ms from the start side.
- Hero video: muted loop with a visible pause/play control.
- Everything respects `prefers-reduced-motion`.

### 3.6 Imagery
- **Licensed stock only for now.** Subjects: Ro-Ro car-carrier ships, port yards with rows of vehicles, container terminals, vehicle inspection, new-vehicle close-ups, and Bahrain context (Manama skyline, the King Fahd Causeway, Khalifa Bin Salman Port).
- **Do not** use images that imply things that aren't true: no fake "our team" photos, no branded showrooms, no visible third-party logos.
- Treatment: cool and desaturated, with the same navy overlay gradient on every image.
- Hero video: slow aerial of a port yard or Ro-Ro ship, 10–20s loop, under 4MB, with a poster image.

### 3.7 Logo files
All in [assets/brand/](assets/brand/), redrawn as clean vectors from the supplied PNG, with text converted to outlines (no font dependency):

| File | Use |
|---|---|
| `wagon-auto-logo.svg` | Full color: light backgrounds, documents |
| `wagon-auto-logo-reversed.svg` | Red W + white text: **default for the dark site** |
| `wagon-auto-logo-white.svg` | All white: on red or on photos |
| `wagon-auto-mark.svg` | "W" only: favicon, app icon, social avatar |
| `wagon-auto-logo.png` | Original raster (reference) |

Header logo height is 32–40px; clear space equals the height of the "W".

---

## 4. Bilingual and RTL
- Routes `/en/...` and `/ar/...`; detects the browser language, with `en` as the default. Language switch in the header and footer.
- Arabic pages use `dir="rtl"` and `lang="ar"`, with logical CSS properties so the rail, wipes, carousel and arrows all mirror.
- Arabic copy is in Modern Standard Arabic with a formal business register ([content-ar.md](content/content-ar.md)). A native review before launch is still recommended.
- Western digits (0–9) are used in both languages.
- WhatsApp pre-filled messages are localized.
- **Company name in Arabic:** "واجن أوتو لتجارة السيارات ذ.م.م" is used. **Check this against the Arabic name on the Commercial Registration** and update if it differs.

---

## 5. Site map

```
/[locale]
├── /            Home
├── /about       About
├── /services    What We Do
├── /partners    Partner With Us   ← key page for the supplier audience
└── /contact     Contact
```

---

## 6. Page sections
Section keys match the content files.

### 6.1 Global
- **Header:** logo (reversed) · Home · About · What We Do · Partner With Us · Contact · `EN / ع` · red "WhatsApp" block. Transparent over the hero, `ink-900` with blur once scrolled. Full-screen menu on mobile.
- **Floating WhatsApp** button in the bottom end corner, hidden while a CTA band is on screen.
- **Footer:** logo, one-line description, nav, services list, contact details, legal line with the CR number, language switch.

### 6.2 Home
| Key | Section | Reference cue |
|---|---|---|
| `hero` | Video hero, highlight headline, subhead, two CTAs (Partner With Us · WhatsApp), mono location meta | DCVC hero |
| `who-we-are` | Large statement paragraph that highlights as you scroll | Atalanta "The Problem" |
| `what-we-do` | Four service panels in one repeating template | Atalanta "Argo for …" |
| `why-bahrain` | Statement plus three facts about Bahrain as a trade base, over a Bahrain port image | Atalanta full-bleed panel |
| `how-we-work` | Five numbered steps on a light paper section | Atalanta stacked rhythm |
| `commitments` | Four commitments in a 2×2 grid | DCVC team pitch |
| `partner-teaser` | Short pitch to suppliers → `/partners` | DCVC "Meet the team" block |
| `cta` | Highlight headline + WhatsApp | Atalanta "Get in touch" |

### 6.3 About
`hero` → `story` → `mission-vision` (two columns) → `values` (four) → `company-details` (a card styled like a registration certificate: legal name, legal form, HQ, CR number, activity) → `cta`.

### 6.4 What We Do
`hero` → four `service` blocks (intro + "What's included" + "Who it's for") → `how-we-work` (reused) → `faq` (accordion) → `cta`.

### 6.5 Partner With Us
`hero` → `intro` → `who-we-work-with` (DCVC-style carousel, `01 / 05`) → `what-to-expect` (five commitments) → `how-to-start` (four steps) → `cta` (WhatsApp with a "supply partner" pre-filled message, plus email).

### 6.6 Contact
`hero` → `topics` (four chips that change the WhatsApp pre-filled message) → `details` (WhatsApp, email, office, hours) → optional static map once the address is known.

---

## 7. Voice, SEO, quality
- **Voice:** confident and concise. Short declarative sentences, specific nouns, no superlatives ("best", "leading", "No. 1"), and nothing that can't be backed up.
- **SEO:** per-page and per-locale titles and descriptions (in the content files), `hreflang`, Organization + LocalBusiness JSON-LD, OG images, sitemap.
- **Performance:** Lighthouse at least 90 on mobile; LCP under 2.5s.
- **Accessibility:** WCAG 2.2 AA, keyboard support, visible red focus rings, video pause control, reduced motion.

---

## 8. To fill in later
| Placeholder | What |
|---|---|
| `{{WHATSAPP_NUMBER}}` | WhatsApp business number in international format (e.g. 9733XXXXXXX) |
| `{{EMAIL}}` | Business email (ideally on the company domain) |
| `{{CR_NUMBER}}` | Bahrain Commercial Registration number |
| `{{ADDRESS_EN}}` / `{{ADDRESS_AR}}` | Office address |
| `{{HOURS_EN}}` / `{{HOURS_AR}}` | Working hours (copy assumes Saturday–Thursday) |
| Arabic legal name | Confirm against the CR |
| Domain | e.g. wagonauto.com / wagonauto.bh |
