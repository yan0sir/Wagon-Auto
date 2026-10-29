import { site } from "@/content/site";

/** True once a WhatsApp number has been added in content/site.ts. */
export const hasWhatsapp = () => site.whatsappNumber.replace(/\D/g, "").length > 0;

/** wa.me click-to-chat link with a pre-filled message, or null if no number is set. */
export function waUrl(message: string): string | null {
  const number = site.whatsappNumber.replace(/\D/g, "");
  if (!number) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** WhatsApp link, falling back to the Contact page while the number is missing. */
export function waHref(message: string, locale: string): string {
  return waUrl(message) ?? `/${locale}/contact`;
}
