// ─── API Keys ─────────────────────────────────────────────────────────────────
export const RESEND_API_KEY = process.env.RESEND_API_KEY ?? "";

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

export const MAPS_HREF = "https://maps.google.com/?q=Metro+Metal";

// ─── Email sending ────────────────────────────────────────────────────────────
export const RESEND_FROM_EMAIL = "onboarding@resend.dev";
export const FORM_RECIPIENT_EMAIL = "hadeed.shahid08@gmail.com";

// ─── Quote attachments ────────────────────────────────────────────────────────
/** Vercel functions cap request bodies at 4.5 MB, so 4 MB total is the real ceiling. */
export const MAX_QUOTE_ATTACHMENT_BYTES = 4 * 1024 * 1024;
export const MAX_QUOTE_ATTACHMENTS = 5;
