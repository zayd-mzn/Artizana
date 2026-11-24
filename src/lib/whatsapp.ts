/** The shop's WhatsApp number, international format without "+" or spaces (wa.me links). */
export const WHATSAPP_NUMBER = "212619116030";

export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
