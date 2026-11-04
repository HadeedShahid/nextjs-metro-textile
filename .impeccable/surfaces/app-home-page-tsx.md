---
version: 1
slug: "app-home-page-tsx"
primary_target: "app/(home)/page.tsx"
related_targets: []
---

# Surface brief: Metro Metal home page (traditional)

## Scope and mode
The home page only (`app/(home)/page.tsx`). Persuade: a first-time visitor should know what Metro Metal makes, see the range, and either search the catalogue or ask for a quote. The catalogue and its search live at `/products` (their own brief).

## Audience, job, action
Sourcing people at apparel and leather-goods brands and the factories that make for them, often on a phone. They judge the range from the hero and the family tiles, then search, open a family or type, or request a quote.

## Constraints
- Owner's words (2026-11-04, after seeing the products-first build): "I really like it... it's very forward... it also makes sense... But I do need a traditional home page too. Traditional hero section, with the products introduction and maybe the categories too. Maybe this can be a good search page."
- Keep from the earlier home: client logos, how an order works, FAQ and blog. No anonymous buyer quotes. No invented claims (no "popular", no stats).
- Assets: the studio renders `public/assets/home/hero-desktop.webp` (3168x1344, objects right on a #f5f4f9 field) and `hero-mobile.webp` (1536x2400, objects at the bottom), and the five family cut-outs in `public/assets/bento/`.

## Direction contract
THESIS: A traditional business home page in the catalogue's world: a hero that says what Metro Metal makes and lets you search, then the range by family, then a few styles. It refuses the Apple-style theatre the owner rejected: giant type, lineup rails, die bands, scroll-driven motion.
OWN-WORLD: The catalogue's system (DESIGN.md): white ground, ink text, #f5f5f7 wells, hairline cards, plum only for the quote action and links, Geist on fixed steps. The hero band is the render's own ground, #f5f4f9, so the photo meets it with no edge; the Search submit is ink. One extra step for the hero title: 30px, 40px from 768px.
STORY: Understand what Metro Metal makes and where, see the five families and their types, then search, open a family or type, or request a quote.
FIRST VIEWPORT: Contact bar and nav as on every page. The hero band is 26rem tall at 1024px and 30rem from 1280px. On the left: the h1 "Garment and leather-goods accessories, made to your logo." (40px, three lines), one lede, a search field with an ink Search button that opens `/products?q=`, then "Request a quote" (plum) and "Browse products" (outline). On the right, the studio render anchored to the band's right edge, its empty field under the text. Tablets tuck the landscape render up at the right beside the actions; phones show the copy, the search, two half-width buttons, then the portrait render faded into the band. Below the band: "Our product range", five family tiles (cut-out in a grey well, name, count, tagline, type links) and a sixth "Something else?" quote tile, in 2 columns on phones and 3 from 768px.
FORM: The category standard (canon), pinned by the owner's plain request; no roll and no seed. Signature: the hero search hands its words to the catalogue, which opens already filtered.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved
Permission to feature client logos; the shank-button photos in Sanity show belts (they appear when someone searches "shank").
