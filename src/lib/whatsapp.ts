/** Placeholder number kept from v1 — replace with the shop's real WhatsApp number. */
export const WHATSAPP_NUMBER = "212600000000";

export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
