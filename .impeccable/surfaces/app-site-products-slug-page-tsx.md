---
version: 1
slug: "app-site-products-slug-page-tsx"
primary_target: "app/(site)/products/[[...slug]]/page.tsx"
related_targets: []
---

# Surface brief: product family pages

## Scope and mode
`/products` overview, `/products/[family]` landing pages and `/products/[family]/[sub]` pages. They replace the filter-chip listing. Persuade inside the established world (DESIGN.md), leaning Operate on the style grids.

## Audience, job, action
Sourcing buyers land from search or the nav on one family. They need to see the family at studio scale, understand its types and how it is made to their mark, browse every style, and request a quote that names the family or product.

## Constraints
- Owner-approved structure: Apple's iPhone page (family strip, hero, lineup, "Get to know", every style, FAQ, close). The comparison block was dropped because the catalog holds no facts that tell the types apart.
- Copy comes from Sanity (tagline, heroImage, highlights), with code defaults. No claims beyond the category intros.
- Keep URLs, metadata, JSON-LD and the Sanity h1/intro (now an about block).
- Zippers has one product and no studio catalog; Shank has one style and PU has two.

## Direction contract
THESIS: Each family gets its own stage, like a product page, not a filtered grid. One object, one sentence, then the types, then every style. It refuses filter chips, a counted grid as the page opener, and identical carousels.
OWN-WORLD: Inherited from DESIGN.md: white and aluminium bands, one die band, Geist display, plum only for quote and links, borderless tile-radius tiles, impression states, the strike motion.
STORY: See the family at studio scale → understand its types and how it is marked → browse every style → request a quote naming the family or product.
FIRST VIEWPORT: Under the global nav, a family strip of five cut-out thumbnails with labels, the current one in ink. Below it, an aluminium hero band with a centred Display family name, a one-line Lede tagline, a plum "Request a quote" pill carrying the family, and "See every style ›". The family cut-out runs wide beneath at studio scale and strikes on load.
FORM: Apple product-family page (owner-pinned via the approved sketch; no roll). It inherits the world from seed 5ec5b347. Signature interaction: the family strip as persistent wayfinding, plus the "Get to know" snap rail.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved
Hosted Studio deploy so editors see the new fields. Publishing the owner's pending Buttons and Metal Zippers drafts. Real zipper photography.
