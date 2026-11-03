import { SITE_COPY } from "@/lib/copywriting";

/**
 * Single source of truth for contact channels (synced from lib/copywriting.ts).
 * WhatsApp number can be overridden via NEXT_PUBLIC_WHATSAPP_NUMBER (format: 628xxxxxxxxx).
 */
export const CONTACT = SITE_COPY.contact;

export const DEFAULT_WA_MESSAGE = SITE_COPY.defaultWhatsAppMessage;

/** Builds a wa.me deep link with a prefilled message. */
export function buildWhatsAppLink(message: string = DEFAULT_WA_MESSAGE): string {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
