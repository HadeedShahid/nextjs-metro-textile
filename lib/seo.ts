import { COMPANY_NAME } from "@/constants";

/**
 * Single source of truth for SEO/metadata across the app.
 *
 * The production domain is NOT hardcoded. Set `NEXT_PUBLIC_SITE_URL` (e.g.
 * https://www.metrometal.com) when the site goes live and every piece of
 * SEO — metadataBase, canonicals, sitemap, robots, OG images, JSON-LD —
 * updates from this one value.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

/** Brand name used everywhere ("Metro Metal"). */
export const SITE_NAME = COMPANY_NAME;

/** Appended to per-page titles via Next.js `title.template`. */
export const TITLE_TEMPLATE = `%s | ${SITE_NAME}`;

/**
 * Homepage / default title and description.
 * NOTE: refined from the landing-page SEO spec — keep in sync with app/page.tsx.
 */
export const DEFAULT_TITLE = `${SITE_NAME} | Garment & Leather Goods Accessories Manufacturer`;
export const DEFAULT_DESCRIPTION =
  "B2B manufacturer and sourcing partner for zippers, buttons, buckles, patches and plates. ISO 9002 certified, OEKO-TEX compliant, 20+ years serving global apparel and leather brands.";

/** Default social share image. TODO: replace with a 1200x630 branded OG card. */
export const DEFAULT_OG_IMAGE = "/logo.png";

export const OG_LOCALE = "en_US";

// ─── Certifications ───────────────────────────────────────────────────────────
// TODO(confirm): exact quality standard. ISO 9002 was withdrawn ~2003 and
// superseded by ISO 9001 — using the current label until the business confirms.
export const QUALITY_CERTIFICATION = "ISO 9001";
export const OEKO_TEX = "OEKO-TEX Standard 100";

// ─── Unconfirmed business facts ───────────────────────────────────────────────
// Placeholder tokens that ship visibly so they're easy to find and replace.
// Search the codebase for "_PENDING" to surface everything awaiting real values.
export const PENDING = {
  moq: "[MOQ_PENDING]",
  leadTime: "[LEAD_TIME_PENDING]",
  sampleTime: "[SAMPLE_LEAD_TIME_PENDING]",
  foundingYear: "[FOUNDING_YEAR_PENDING]",
  employeeCount: "[EMPLOYEE_COUNT_PENDING]",
  incoterms: "[INCOTERMS_PENDING]",
  linkedinUrl: "[LINKEDIN_URL_PENDING]",
} as const;

/** Build an absolute URL from a path (for canonicals, OG urls, sitemap, JSON-LD). */
export function absoluteUrl(path = "/"): string {
  return new URL(path, siteUrl).toString();
}
