// Company contact details. Leave a value empty ("") until it is known:
// empty values are hidden on the site, and WhatsApp buttons fall back to the Contact page.

export const site = {
  /** International format, digits only, e.g. "9733XXXXXXX" */
  whatsappNumber: "",
  email: "",
  /** Bahrain Commercial Registration number */
  crNumber: "",
  address: { en: "", ar: "" },
  hours: { en: "", ar: "" },
  /**
   * Public URL, used for canonical links, sitemap and share images.
   * Set NEXT_PUBLIC_SITE_URL once a custom domain is live; on Vercel it otherwise uses the
   * project's production domain (VERCEL_PROJECT_PRODUCTION_URL, set automatically at build time).
   */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
};
