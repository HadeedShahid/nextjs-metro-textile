import "server-only";

// Mail settings for the contact and quote forms. Server-only, so the inbox
// address and API key never reach a client bundle. Each can be overridden per
// environment; the defaults are the values the site has shipped with.

export const RESEND_API_KEY = process.env.RESEND_API_KEY ?? "";
export const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
export const FORM_RECIPIENT_EMAIL = process.env.FORM_RECIPIENT_EMAIL ?? "hadeed.shahid08@gmail.com";
