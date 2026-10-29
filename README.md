# Wagon Auto

Bilingual (English / Arabic) company-profile website for **Wagon Auto Auto Trading W.L.L.**, a
vehicle import and export company in the Kingdom of Bahrain.

## What's in this repo

| Path | What |
|---|---|
| [`website/`](website/) | The site: Next.js 16, React 19, Tailwind CSS 4. See its [README](website/README.md). |
| [`WEBSITE_BRIEF.md`](WEBSITE_BRIEF.md) | Purpose, audience, design system and page structure |
| [`IMPLEMENTATION_PLAN.md`](IMPLEMENTATION_PLAN.md) | Build plan, phase by phase |
| [`content/`](content/) | Approved copy in English and Arabic (source for the site's text) |
| [`assets/brand/`](assets/brand/) | Logo files: SVG (full color, reversed, white, mark) and the original PNG |

## Run the site

```bash
cd website
npm install
npm run dev      # development, http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

On Windows PowerShell, use `npm.cmd` in place of `npm` if script execution is blocked.

## Before launch

Contact details (WhatsApp number, email, Commercial Registration number, address) are still empty
in [`website/content/site.ts`](website/content/site.ts). Empty values are hidden on the site.

Photos are from Unsplash under the Unsplash License; credits are in
[`website/public/images/CREDITS.md`](website/public/images/CREDITS.md).
