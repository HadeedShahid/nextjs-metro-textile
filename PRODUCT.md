# Product

<!-- impeccable:product-schema 1 -->

> Written 2026-10-28 from the repository, the live Sanity dataset and the owner's brief. The owner skipped the interview and said to proceed, so facts marked *(inferred)* came from the code and content, not from the owner. Confirm or correct them.

## Platform

web

## Users

- **Primary:** sourcing, procurement and product-development people at apparel, denim and leather-goods brands, plus the garment factories that make for them. *(inferred from copy, FAQ and quote form)*
- **Their job:** find a hardware supplier that can match their spec and finish at volume, judge quality from photos and certifications, then request samples or a quote.
- **Situation:** often first contact from a search result or a referral, comparing several Asian suppliers. Many arrive on mobile and follow up by WhatsApp or email.

## Product Purpose

The website is Metro Metal's catalog and lead engine. Success means a qualified buyer sends a quote request, email or WhatsApp message about specific products. There are no prices and no cart: all business is quote-based B2B.

## Positioning

Metro Metal makes and sources the metal and leather hardware brands put their name on: zippers, buttons (plastic, prong, shank), buckles, leather and PU patches, and metal plates, finished and branded to spec. It runs an integrated network across Pakistan, China and Hong Kong and has 20+ years supplying apparel and leather brands, with significant export volume to Europe. *(inferred from site copy)*

## Operating Context

- Buyers bring artwork, tech packs or reference samples. The quote form accepts up to 5 attachments (4 MB total).
- The flow is: pre-production sample → sealed sample → bulk production → pre-shipment inspection.
- Contact routes are email (shahid@metro-metal.com), phone and WhatsApp (+92 301 8474268), and the quote and contact forms, which email through Resend.
- The catalog lives in Sanity (project `qrdka284`): 49 products, 11 categories in a parent/child tree, and 6 blog posts.

## Capabilities and Constraints

- The stack is Next.js 16 App Router, Tailwind v4, shadcn on Base UI, and Sanity via next-sanity, with 15-minute ISR.
- Category, product and blog content, SEO fields and product images come from Sanity. Page copy outside the CMS lives in code.
- **Undecided or unconfirmed:**
  - The exact quality certification. Site copy says ISO 9002, which was withdrawn around 2000. Structured data says ISO 9001.
  - MOQ figures, lead times and Incoterms.
  - Real social profile URLs.
  - Founding year and employee count.
  - Whether the business is primarily a manufacturer or a sourcing agent, and which country leads.

## Brand Commitments

- The company name is **Metro Metal**. "Metro Textile" in product copy is a legacy name.
- The group companies were already published on the old site, and the Presence section reuses them: Metro Metal (China), Metro Company (Hong Kong) and Metro Textiles Sourcing (Pakistan).
- The logo is `public/logo.png`. The established accent is plum (`oklch(0.4533 0.1522 326.27)`, ≈ `#7f2f82`).
- **Owner's direction:** an Apple-style site, very heavy on imagery and product-led, because Metro Metal sells physical products the way Apple does. This is a binding brief for the visual direction.

## Evidence on Hand

- **Client logos** (`public/assets/logos/`): Levi's, Diesel, Calvin Klein, Burberry, Pull&Bear, Kaporal, Stone Age, One. Confirm permission before giving them more prominence.
- **Studio renders:**
  - Hero renders: `public/assets/hero-desktop.png` 3168×1344 and `hero-mobile.png` 1536×2754.
  - Five category cutouts: `public/assets/bento/*.webp`.
  - Single-object studio shots: `landing-*.jpg`, `button.jpg`, `buckle.jpg`.
  - Dark mood shots: `cta-pic.jpg`, `hero2.jpg`.
  - These renders show fictional brand marks (ATELIER 47, MERIDIAN, NORDEN).
- **Catalog photos:** 205 Sanity images at about 4000 px, phone-shot on grey paper with inconsistent light and scale. The Zippers category has only a 512 px placeholder image.
- **Testimonials:** three anonymous quotes in `app/(home)/page.tsx`. Do not attribute them to real people or brands without confirmation.
- **Absent, so never fabricate:** prices, named customer quotes, certificate numbers, factory headcount, capacity figures, and process or factory photography of hardware production.

## Product Principles

1. **The object is the argument.** Buyers judge finish and quality from what they can see; show the hardware, not icons about it.
2. **Every product leads to a quote.** Any product or category view is one step from a quote request that already knows what the buyer was looking at.
3. **Only true claims.** No invented numbers, certifications or customers; an unconfirmed fact is left out, not approximated.
4. **Built for the buyer's follow-up.** WhatsApp and email are first-class routes, because that is how this trade talks.

## Accessibility & Inclusion

Target WCAG 2.2 AA: text contrast, visible focus, keyboard-complete quote flow, pinch-zoom allowed, and reduced-motion alternatives for any autoplay or scroll-driven motion. *(inferred standard)*
