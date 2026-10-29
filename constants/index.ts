// ─── Company ──────────────────────────────────────────────────────────────────
export const COMPANY_NAME = "Metro Metal";
export const COMPANY_TAGLINE = "Your trusted partner in the global leather and textile industry.";

// ─── Contact ──────────────────────────────────────────────────────────────────
export const CONTACT_EMAIL = "shahid@metro-metal.com";

/** E.164 format — use for tel: href */
export const CONTACT_PHONE_E164 = "+923018474268";
/** Human-readable display format */
export const CONTACT_PHONE_DISPLAY = "+92 301 8474268";

/** Digits only (no +) — use for wa.me/ links */
export const CONTACT_WHATSAPP_NUMBER = "923018474268";
export const CONTACT_WHATSAPP_HREF = `https://wa.me/${CONTACT_WHATSAPP_NUMBER}`;

// ─── Links ────────────────────────────────────────────────────────────────────
export const CONTACT_EMAIL_HREF = `mailto:${CONTACT_EMAIL}`;
export const CONTACT_PHONE_HREF = `tel:${CONTACT_PHONE_E164}`;

/** WhatsApp chat link, optionally opening with a prefilled message. */
export const whatsappHref = (text?: string) =>
  text ? `${CONTACT_WHATSAPP_HREF}?text=${encodeURIComponent(text)}` : CONTACT_WHATSAPP_HREF;

export type ContactRoute = {
  kind: "email" | "phone" | "whatsapp";
  label: string;
  /** The address or number itself. */
  value: string;
  /** What a compact link shows: the address, the number, or "WhatsApp". */
  linkText: string;
  href: string;
  external: boolean;
};

/** Every way to reach the team, in the order the site lists them. */
export const CONTACT_ROUTES: ContactRoute[] = [
  { kind: "email", label: "Email", value: CONTACT_EMAIL, linkText: CONTACT_EMAIL, href: CONTACT_EMAIL_HREF, external: false },
  { kind: "phone", label: "Phone", value: CONTACT_PHONE_DISPLAY, linkText: CONTACT_PHONE_DISPLAY, href: CONTACT_PHONE_HREF, external: false },
  { kind: "whatsapp", label: "WhatsApp", value: CONTACT_PHONE_DISPLAY, linkText: "WhatsApp", href: CONTACT_WHATSAPP_HREF, external: true },
];

// ─── Quote attachments ────────────────────────────────────────────────────────
/** Vercel functions cap request bodies at 4.5 MB, so 4 MB total is the real ceiling. */
export const MAX_QUOTE_ATTACHMENT_BYTES = 4 * 1024 * 1024;
export const MAX_QUOTE_ATTACHMENTS = 5;
