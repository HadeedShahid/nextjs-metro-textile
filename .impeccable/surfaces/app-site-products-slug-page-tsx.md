---
version: 1
slug: "app-site-products-slug-page-tsx"
primary_target: "app/(site)/products/[[...slug]]/page.tsx"
related_targets: []
---

# Surface brief: Metro Metal catalogue and search (/products)

## Scope and mode
The product listing pages (`/products`, `/products/[family]`, `/products/[family]/[type]`), plus the global nav and the product card everywhere it appears. Operate: the visitor is browsing or searching the catalogue to find a style and ask about it. `/products` is the search page: it opens with `?q=` filled in when the home page search sends someone there, and keeps the search in the address.

## Audience, job, action
Suppliers' and brands' sourcing people, many on phones. They need to see the products at once, narrow them by family and type, and send a quote request or WhatsApp message that names the product.

## Constraints
- Owner's words (2026-11-04): the Apple style didn't work; this is a simple site for suppliers; products must be visible immediately and filterable; the August 2026 build (filter chips over a full grid, families named in the nav) "did make sense". Start from scratch.
- Owner's answers: the catalogue opens on one short line and a search box, then every product with family chips. Later the same day the owner liked it and asked for a traditional home page as well, with this catalogue as the search page (see the home brief).
- Keep Sanity data, URLs, quote and contact flows, SEO and JSON-LD. No invented claims.

## Direction contract
THESIS: A trade catalogue played straight: the products are the page. Every catalogue view opens on filter chips and the grid of every style, with nothing to scroll past first. It refuses hero theatre, family "stage" pages, lineup rails and marketing bands ahead of the products.
OWN-WORLD: White ground; ink #1d1d1f text and #6e6e73 secondary; #f5f5f7 photo wells; #e3e3e8 hairlines. Plum is the quote action, the selected chip and text links. Geist on a fixed rem scale (page title 24 to 30px, section 20px, body 15 to 16px, meta 13px). Product cards are white with a hairline border and the same 8px corner as the buttons, around a square photo well. Filter chips are 36px pills with a hairline border; the selected one is filled plum with white text, and each carries its count.
STORY: See every product at once, narrow by family and type, open one or ask for a quote that names it (form or WhatsApp).
FIRST VIEWPORT: From 768px, the contact bar: email, phone and WhatsApp on the left, and the company pages (About us, Compliance, Blog, Contact) on the right. They live there, not in the nav, so the nav names only the catalogue. Then a white nav: logo, All products, Buckles, Buttons, Patches, Plates, Zippers, and a plum "Request a quote". Phones get the logo, a WhatsApp icon and a menu holding every link. Each products page: breadcrumbs, then one header row on white (the title, a line with the count, the search on the right), the family chips, then the chosen family's type chips (smaller, the selected one a plum tint), then the grid in chip order. The first row of products is visible without scrolling at 390, 1280 and 1440px.
FORM: The category standard (canon), pinned by the owner's plain request on 2026-11-04 with the August 2026 build as reference; no roll and no seed. Signature: chips carry live counts, and the search narrows the grid as you type, with an empty state that offers a quote for anything not listed.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved
Whether the product page needs changes beyond the new card; permission to feature client logos; the shank-button photos in Sanity show belts.
