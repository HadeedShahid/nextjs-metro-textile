---
version: 1
slug: "app-home-page-tsx"
primary_target: "app/(home)/page.tsx"
related_targets: ["app/(site)/products/[[...slug]]/page.tsx","app/(site)/product/[slug]/page.tsx"]
---

# Surface brief: Metro Metal storefront (site-wide redesign)

## Scope and mode
Replacement visual world for the whole storefront: home, product listing and detail, about, compliance, contact and journal. Persuade mode for home and the inner marketing pages. Product listing and detail lean toward Operate inside the same world. The journal is Read.

## Audience, job, action
Brand sourcing and product-development buyers judge finish and quality from imagery, then send a quote request (modal with attachments), an email or a WhatsApp message. The primary action is **Request a quote**, prefilled with the product wherever a product is in view.

## Constraints
- The owner pinned the brief: **Apple-style, imagery-heavy, product-led**. It beats the roll.
- Code-led build: no image generation is available.
- Assets on hand: two hero renders, five bento cutouts, single-object studio shots, two dark mood shots (`cta-pic`, `hero2`), and 205 phone-shot catalog photos in Sanity.
- Preserve the Sanity data, quote and contact flows, SEO and JSON-LD.
- No invented claims. MOQ, lead time, Incoterms and the exact ISO number are unconfirmed.

## Grounded directions (by resonance)
1. Trim card / hardware sample board.
2. Plater's finish ring.
3. Tech-pack trims page.
4. Denim waistband close-up (back patch, rivet, shank).
5. **The die and its strike: an engraved steel tool and the mark it leaves (assigned, seed 5ec5b347).**
6. Trade-fair vitrine.
7. Sealed-sample tag and QC report.

**Resolution:** the pinned Apple product theatre owns palette, type and layout. The assigned die/strike world binds topology, control states and ritual.

## Challenger verdicts
All six are declined; none beats the direction on both audience identification and product clarity. Each still donates one discipline.
- **Op-art textile repeat:** declined. Raise: tonal discipline. Ground, ink and one accent only; no decorative mid-greys.
- **Soundsystem poster:** declined. Raise: rank by scale. Display type is enormous and body is small, never a flat ladder of 24 px headings.
- **ANSI bulletin board:** declined. Raise: complete keyboard path. Every rail, chip and quote action is reachable and visibly focused.
- **Cutting-bench select rail:** declined. Raise: state is a mark, not a hue. A rail snaps to pitch and never stops between frames.
- **Jacquard brocade:** declined. Raise: traceability. Finished object → family → spec → quote request carrying the product name.
- **Tensegrity column:** declined. Raise: annotations belong to the object. Specs sit beside the image as a measured list, not in floating cards.

## Direction contract
THESIS: One piece of hardware per viewport, at studio scale, with one sentence about it. Metro Metal's catalog presented the way a maker presents its finest objects. It refuses the category default: eyebrow-titled card grids, icon tiles and five identical carousels.

OWN-WORLD:
- **Grounds:** gallery white (#fff) and aluminium grey (#f5f5f7) bands, broken by one near-black die band (#0b0b0c).
- **Ink:** #1d1d1f; secondary text #6e6e73.
- **Accent:** plum #7f2f82, reserved for the quote action and text links.
- **Type:** Geist, with display 56–96 px at −0.035em semibold, 17 px body and 12–14 px captions. No eyebrows.
- **Controls:** pill buttons and "Learn more ›" links. Tiles are borderless rounded-3xl on #f5f5f7.
- **States are impressions:** pressed is a 1 px inset deboss, selected is filled ink, focus is a 2 px ink ring offset 3 px.

STORY:
- **See:** the hardware at full scale.
- **Understand:** the five families and that Metro makes to the buyer's mark across Pakistan, China and Hong Kong.
- **Believe:** the client marks and the sample → seal → produce → inspect discipline.
- **Do:** request a quote that already names what they looked at.

FIRST VIEWPORT:
- **Desktop:** the full-bleed hero render (objects right, white field left). On the left: "Metro Metal" at 21 px semibold, the headline "Hardware, made to your mark." at clamp(48px, 7vw, 96px), one 21 px line of offer, a plum "Request a quote" pill and an "Explore products ›" link.
- **Nav:** a sticky 52 px translucent bar with the logo, the families and a small quote pill.
- **Mobile:** text sits above the cropped portrait render.

FORM: Apple product theatre (the pinned brief) carrying the die-and-strike ritual, candidate 5 of 7, seed 5ec5b347.
- **Signature interaction:** the lineup rail. Large family tiles snap to pitch, are keyboard-operable, and each tile offers Explore and Quote.
- **Motion grammar:** the strike. The hero render settles from scale 1.06 to 1 and from blur to sharp as it enters view (scroll-driven, visible by default, disabled under reduced motion). Reveals are otherwise absent.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved
Exact ISO standard; MOQ, lead time and Incoterms; Sanity copy that still says "Metro Textile" and "ISO 9002"; real social URLs; permission to feature client logos prominently; a new studio shoot for the catalog.
