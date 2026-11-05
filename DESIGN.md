---
name: Metro Metal
description: A plain trade catalogue of garment and leather goods hardware, products first, every style one step from a quote, behind a traditional home page.
colors:
  white: "#ffffff"
  ink: "#1d1d1f"
  ink-secondary: "#6e6e73"
  well: "#f5f5f7"
  well-pressed: "#e8e8ed"
  hairline: "#e3e3e8"
  field-stroke: "#d2d2d7"
  hero-ground: "#f5f4f9"
  plum: "oklch(0.4533 0.1522 326.27)"
  plum-pressed: "color-mix(in oklab, oklch(0.4533 0.1522 326.27) 88%, black)"
  ink-pressed: "#3a3a3c"
  destructive: "oklch(0.577 0.245 27.325)"
  die: "#0b0b0c"
  die-foreground: "#f5f5f7"
  die-muted: "#a1a1a6"
typography:
  hero:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-0.025em"
  hero-md:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.5rem"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-0.025em"
  display:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  display-md:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.015em"
  headline-md:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "-0.01em"
  card-title:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.375
  card-title-sm:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1.375
  lede:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.55
  lede-md:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "-0.005em"
  small:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.43
  control:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.01em"
  meta:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.4
  field:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
  field-sm:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
  label:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1
rounded:
  inset: "0.2rem"
  card: "0.25rem"
  dialog: "0.35rem"
  control: "0.5rem"
  pill: "9999px"
spacing:
  chip-gap: "8px"
  grid-gap: "12px"
  grid-gap-wide: "16px"
  gutter: "20px"
  gutter-wide: "32px"
  container: "1200px"
  section: "40px"
  section-wide: "56px"
  section-lg: "64px"
components:
  button-primary:
    backgroundColor: "{colors.plum}"
    textColor: "{colors.white}"
    typography: "{typography.control}"
    rounded: "{rounded.control}"
    height: "40px"
    padding: "0 20px"
  button-primary-hover:
    backgroundColor: "{colors.plum-pressed}"
  button-primary-lg:
    backgroundColor: "{colors.plum}"
    textColor: "{colors.white}"
    typography: "{typography.control}"
    rounded: "{rounded.control}"
    height: "44px"
    padding: "0 24px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.control}"
    rounded: "{rounded.control}"
    height: "40px"
    padding: "0 20px"
  button-outline-sm:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    height: "32px"
    padding: "0 14px"
  button-outline-lg:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    typography: "{typography.control}"
    rounded: "{rounded.control}"
    height: "44px"
    padding: "0 24px"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    typography: "{typography.control}"
    rounded: "{rounded.control}"
    height: "44px"
    padding: "0 20px"
  button-ink-hover:
    backgroundColor: "{colors.ink-pressed}"
  button-secondary:
    backgroundColor: "{colors.well}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    height: "44px"
    padding: "0 24px"
  button-secondary-hover:
    backgroundColor: "{colors.well-pressed}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    size: "44px"
  chip-family:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    height: "36px"
    padding: "0 12px"
  chip-family-sm:
    height: "40px"
    padding: "0 16px"
  chip-family-selected:
    backgroundColor: "{colors.plum}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
  chip-type:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    height: "32px"
    padding: "0 12px"
  chip-type-selected:
    backgroundColor: "color-mix(in oklab, oklch(0.4533 0.1522 326.27) 10%, transparent)"
    textColor: "{colors.plum}"
    rounded: "{rounded.pill}"
  input-field:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    typography: "{typography.field}"
    rounded: "{rounded.control}"
    height: "40px"
    width: "100%"
    padding: "0 12px"
  input-field-sm:
    typography: "{typography.field-sm}"
  textarea-field:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    typography: "{typography.field}"
    rounded: "{rounded.control}"
    width: "100%"
    padding: "10px 12px"
  textarea-field-sm:
    typography: "{typography.field-sm}"
  field-label:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
  input-search:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    height: "40px"
    width: "100%"
    padding: "0 36px"
  input-search-sm:
    width: "288px"
  input-search-hero:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    height: "44px"
    padding: "0 12px 0 36px"
  hero-band:
    backgroundColor: "{colors.hero-ground}"
    textColor: "{colors.ink}"
  hero-band-lg:
    height: "24rem"
  hero-band-xl:
    height: "26rem"
  product-card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "12px"
  family-tile:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "12px"
  family-tile-sm:
    padding: "16px"
  family-tile-well:
    backgroundColor: "{colors.well}"
  quote-tile:
    backgroundColor: "{colors.well}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "16px"
  quote-tile-sm:
    padding: "20px"
  custom-request:
    backgroundColor: "{colors.well}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "20px"
  quote-dialog:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.dialog}"
    width: "440px"
    padding: "24px"
  quote-sheet:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.dialog}"
    padding: "20px"
  order-steps:
    backgroundColor: "{colors.well}"
    textColor: "{colors.ink}"
    padding: "40px 0"
  order-steps-md:
    padding: "56px 0"
  order-step-number:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    size: "40px"
  top-bar:
    backgroundColor: "{colors.well}"
    textColor: "{colors.ink-secondary}"
    typography: "{typography.meta}"
    height: "36px"
  nav:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    height: "64px"
  footer:
    backgroundColor: "{colors.well}"
    textColor: "{colors.ink-secondary}"
    typography: "{typography.small}"
---

# Design System: Metro Metal

## Overview

**Creative North Star: "The Trade Counter"**

Metro Metal is a trade catalogue played straight. A buyer walks up to the counter and every style is laid out on it: the products are the page. Every catalogue view opens on a short header row, the filter chips and the full grid, with nothing to scroll past first. The world is the category standard, chosen on purpose: white ground, ink text, grey photo wells, hairline borders, one plum for the actions that matter. It earns trust through clarity and completeness rather than staging.

Density is moderate and steady. Type sits on a fixed rem scale that steps once at 768px instead of growing with the window, so a page title reads the same at 1280 and 1920px. Surfaces are flat; a card lifts only slightly on hover. The phone-shot product photos carry the visual weight, cropped square into identical grey wells so the grid reads as one even field.

The home page is the shop front in front of the counter. At the owner's request on 2026-11-04 it is a traditional business home page in the same world: one hero band that says what Metro Metal makes and holds a product search, then the client logos, the range as family tiles, a few styles, the order steps on a grey band, the FAQ and the blog. The hero search hands its words to the catalogue, which opens already filtered; the catalogue at `/products` is the search page.

The owner rejected the earlier Apple-style imagery world (hero theatre, family stage pages, lineup rails, marketing bands ahead of the products) on 2026-11-04. The home hero is not a return to it: one band at fixed type steps, no die band, no scroll-driven motion. The die-black band survives only as the closing band on the About, Compliance and Blog index pages and as the product photo lightbox; it is not part of the catalogue or the home page.

**Key Characteristics:**
- Products first on every catalogue view: header row, family chips, then the grid, all inside the first viewport at 390, 1280 and 1440px.
- A traditional home page: one hero band with a search that opens the catalogue, then family tiles with their types as links.
- Filter chips carry live counts; search narrows the grid as you type and stays in the address.
- One plum, spent on the quote action, the selected family chip and text links.
- White cards with a hairline border around a grey photo well.
- Fixed type steps, Geist throughout, no display face.
- Flat surfaces; hairlines and grey wells separate, not shadows.

## Colors

A near-achromatic Apple-grey neutral set carrying a single saturated plum.

### Primary
- **Metro Plum** (oklch(0.4533 0.1522 326.27)): the brand colour. Fills "Request a quote" in the nav, the home hero, under the grid, in the "Something else?" tile, in empty states, as "Start your request" in the order-steps band and as "Send request" in the quote form; fills the selected family chip; colours text links ("Label ›" links, the family tiles' type links, the FAQ and order-steps WhatsApp links, link buttons) and the active nav underline. At 10% it tints the selected type chip, at 20% over white it is the text selection colour. Pressed and hovered, it mixes 12% toward black.

### Neutral
- **White** (#ffffff): the page ground, nav, cards, family tiles, chips at rest, every field, the quote dialog and sheet, and the hero's outline button.
- **Ink** (#1d1d1f): all body text and headings, the focus ring, the selected chip's border when not plum, and the fill of the ink button (the hero Search submit and the 404 page) and of the order-step number circles. Ink Pressed (#3a3a3c) is the ink button's hover.
- **Ink Secondary** (#6e6e73): meta lines, ledes, type labels on cards, chip and tile counts, the top bar, the footer, placeholders.
- **Well Grey** (#f5f5f7): photo wells (square on product cards, 16:10 on family tiles), the top bar, the "Need something that isn't listed?" panel, the "Something else?" tile, the About-category band, the order-steps and blog bands on home, the "Quote for" line and file chips in the quote form, and the footer. Well Pressed (#e8e8ed) is the hover of secondary buttons.
- **Hero Ground** (#f5f4f9): the home hero band only. It is the studio render's own ground, so the render fades into the band with no visible edge.
- **Hairline** (#e3e3e8): card and tile borders, chip borders, section rules (under the logo row, above the family carousels), FAQ row dividers, the quote sheet's top edge, nav bottom border.
- **Field Stroke** (#d2d2d7): every field border (search, quote and contact forms), outline buttons and the dashed empty-state border; one step darker than the hairline so controls read as controls.
- **Destructive** (oklch(0.577 0.245 27.325)): form errors (invalid field border and ring, the error panel at 10% with destructive text) and the required-field asterisk.

### Legacy (inner pages only)
- **Die Black** (#0b0b0c), **Die Foreground** (#f5f5f7), **Die Muted** (#a1a1a6): still defined and still used by the closing band on About us, Compliance and the Blog index, and by the full-screen product photo lightbox. Not used on home, the products pages or the product page body.

### Named Rules
**The One Plum Rule.** Plum marks the quote action, the selected family filter and text links, and nothing else. Never use it for decoration, section grounds or illustration.

**The Grey Well Rule.** Product photos and family cut-outs always sit in a #f5f5f7 well, so photos shot on grey paper and the missing-photo state read as one material.

**The Render Ground Rule.** The hero band takes the colour of the render it carries (#f5f4f9 for the current studio render), so the picture meets the band with no edge. It is not a general section ground.

## Typography

**Display Font:** Geist (with Geist Fallback, ui-sans-serif, system-ui)
**Body Font:** Geist
**Label Font:** Geist

**Character:** One neutral grotesque at every role; hierarchy comes from size and weight (600 headings, 500 controls, 400 text), never from a second family.

Responsive steps are written as separate tokens: the base token holds the phone size and a sibling with a breakpoint suffix holds the size from that width (`-sm` from 640px, `-md` from 768px). `hero` / `hero-md`, `display` / `display-md`, `headline` / `headline-md`, `card-title` / `card-title-sm`, `lede` / `lede-md`, `field` / `field-sm`.

### Hierarchy
- **Hero** (600, 30px, 40px from 768px, 1.12, -0.025em, balanced): the home hero's h1 only, two lines ("Garment accessories, made to your logo."). One step, on one page. Hero copy stays short and plain: no hyphenated compounds such as "leather-goods", which break across lines.
- **Display** (600, 24px, 28px from 768px, 1.2, -0.02em): the one page title per view on every other page: products page titles, blog posts, the 404 page. Fits one line on desktop.
- **Headline** (600, 20px, 22px from 768px, 1.3, -0.015em): section headings (Our product range, the family names over their carousels, How an order works, FAQ, blog) and the product page title.
- **Title** (600, 17px, 1.35, -0.01em): small panel headings (custom-request panel, About-category heading) and family tile names from 640px (16px/600 below).
- **Card title** (600, 14px, 15px from 640px, 1.375): product names on cards.
- **Lede** (400, 15px, 16px from 768px, 1.55): one-line section introductions and the hero's line under the h1.
- **Body** (400, 16px, 1.55, -0.005em): running text and FAQ answers, capped at 65 to 68ch.
- **Small** (400, 14px): the meta line under a page title, panel text, footer.
- **Control** (500, 15px, -0.01em): buttons, nav links, search text.
- **Field** (400, 16px, 15px from 640px): text typed into the quote and contact fields. 16px on phones keeps iOS from zooming into a focused field.
- **Label** (500, 14px, line-height 1): field labels; the required asterisk follows 4px after the label text.
- **Meta** (400, 13px, 1.4): card type labels, family tile counts, taglines and type links on phones (14px from 640px), the top bar, dates, the search result count. Chip counts are 12px tabular figures.

### Named Rules
**The Fixed Step Rule.** Sizes are fixed rem steps that change at most once, at one breakpoint. No clamp() or viewport-scaled type.

**The No Eyebrow Rule.** Sections open on their heading, with no small label above it.

## Layout

One centred container: `min(100% - 40px, 1200px)`, widening to `min(100% - 64px, 1200px)` from 768px. Under it sit a 36px top bar (from 768px, scrolls away) and a sticky 64px white nav.

A catalogue view (`/products`, `/products/[family]`, `/products/[family]/[type]`) is one vertical stack with 16px between parts: the header row (title and meta line on the left, a 288px search on the right from 640px; stacked on phones), the family chip row, the type chip row when the family has two or more types, then the grid. Chips wrap with 8px gaps. The grid is 2 columns on phones, 3 from 640px, 4 from 1024px, with 12px gaps (16px from 640px). The custom-request panel follows 32px under the grid. Products pages put breadcrumbs above the header row, and an About-category band and the FAQ below the grid.

The home page runs in this order: the hero band, the client logos, Our product range, the family carousels, How an order works, the FAQ, then the blog. Sections after the hero are plain stacked bands, each opening on a headline, a lede and a "›" link. Hairlines divide the white sections down to the family carousels; from there the grounds alternate (grey order steps, white FAQ, grey blog), so no rule sits between them. Sections pad 40px vertically, 56px from 768px, some (the FAQ) 64px from 1024px.

- **Hero band:** copy on the left, capped at 34rem (25rem from 1024px, 29rem from 1280px), 32px from the top (48px from 768px). Content height on phones and tablets; 24rem tall from 1024px and 26rem from 1280px, with the copy centred vertically.
- **Product range:** five family tiles and the "Something else?" tile, 2 columns on phones and 3 from 768px, 12px gaps (16px from 640px).
- **Family carousels:** one carousel per family (Buckles, Buttons, Patches, Plates, Zippers, in title order), 40px apart (56px from 768px), each up to 12 of the family's styles in a random order (the page is cached, so the order changes each time it is rebuilt, about every 15 minutes). Each opens on one header line: on the left the family name as a headline with its style count beside it in meta grey (14px from 640px), on the right an outline "View all ›" button that opens the family's catalogue page and, from 768px, the 40px outline back and forward arrows, 8px apart. Then one row that scrolls sideways with snap points: cards 70% of the container on phones, 42% from 640px, 2.5 in view from 768px and 3.5 from 1024px, gaps 12px (16px from 640px, 24px from 768px), the scrollbar hidden. Each arrow greys out (the disabled state) at its end of the row, and both do when the row fits; they page by 80% of the row (instantly under reduced motion). Phones swipe. Arrows never sit over the photos: an outline button there turns see-through on hover. The only sideways rows on the site, chosen by the owner on 2026-11-05.
- **Order steps:** a grey band, 40px vertical padding (56px from 768px). A header row with the section intro left and the actions right (stacked on phones, side by side and bottom-aligned from 768px, 40px apart), then the steps 32px below (40px from 768px): one vertical timeline on phones, four columns with 24px gaps from 768px.
- The **FAQ** (a sticky intro column and the accordion, two columns from 1024px) and the **blog** on a grey band close the page.

**The Nothing First Rule.** On catalogue views (`/products`, `/products/[family]`, `/products/[family]/[type]`), no hero, band, rail or banner precedes the grid, and the first row of products is visible without scrolling at 390, 1280 and 1440px. The home page is the one exception and has a traditional hero on purpose, at the owner's request on 2026-11-04.

## Elevation & Depth

Flat by default. Depth comes from the grey well against white and from hairlines. There are two shadows in the vocabulary, both responses to state. The hero render separates from its band by soft edge fades (mask gradients), not by shadow or frame.

### Shadow Vocabulary
- **Card lift** (`box-shadow: 0 4px 16px rgb(0 0 0 / 0.07)`): a product card or family tile on hover, with the border darkening to ink at 20%.
- **Press** (`box-shadow: inset 0 1px 2px rgb(0 0 0 / 0.25)`): every button on :active, with a 1px downward nudge.

### Named Rules
**The Flat Rest Rule.** Nothing casts a shadow at rest. The phone menu sheet, the quote sheet and dialogs carry none either. The one floating list, the hero search's suggestions, lifts off the page with `0 8px 24px rgb(0 0 0 / 0.08)` over a hairline border.

## Shapes

Three page corners, each with one job, plus two for overlays. Cards, tiles and panels (product card, family tile, "Something else?" tile, custom-request panel, empty state) take a small 4px corner (`--radius` 0.25rem). Buttons, every field and the search clear button take a firmer 8px corner (`--radius-control`). The quote dialog takes a 5.6px corner (the sheet only on its top edge), and the small insets inside it (the "Quote for" line, file chips, the error panel) a 3.2px one. Filter chips and the order-step numbers are full pills or circles. Borders are 1px hairlines; the empty state alone uses a dashed field-stroke border. Photos are clipped square inside product cards; family cut-outs sit contained in a 16:10 well. The hero render has no frame: it is cropped by the band and dissolves into it at the edges.

## Components

### Buttons
Firm, quiet, tactile: they press 1px on click.
- **Shape:** 8px corner.
- **Primary (plum):** white text on plum, 40px tall, 20px side padding, 15px/500. "Request a quote" in the nav (from 1024px), the custom-request panel, the "Something else?" tile, the empty state, "Start your request" in the order-steps band, and the full-width "Send request" in the quote form. The large size (44px, 24px side padding) serves the home hero and the phone menu (full width).
- **Hover / Focus:** plum mixes 12% toward black over 200ms. Focus is a 2px ink outline offset 3px, global for every focusable element.
- **Outline:** transparent with a #d2d2d7 border, ink text; hover darkens the border to ink at 40% and adds a 3% ink wash. The card's quote button is outline, full card width, 36px. The small outline (32px, 14px side padding, 14px text) is the quote form's "Attach files", led by a paperclip.
- **Ink:** white text on ink, 44px, 20px side padding; hover #3a3a3c. Only the hero Search submit and the 404 page's catalogue link.
- **Secondary:** grey well fill, hover #e8e8ed; used for email and WhatsApp on the product page.
- **Ghost:** no fill, 5% ink wash on hover; the 44px WhatsApp and menu icons in the phone nav.
- **Link:** plum text, underline on hover.

### Chips
Filters you can read at a glance, each a real link with its own address.
- **Family chip:** white pill, hairline border, ink 13px/500 label (14px from 640px), 36px tall (40px from 640px); the count follows in 12px tabular secondary grey. Hover: border ink at 30%, grey well fill.
- **Selected family chip:** solid plum, white label, count in white at 75%.
- **Type chip:** a smaller second row, 32px, same rest style. **Selected:** plum at 10% with a plum border and plum label, so the two rows never read as one.

### Cards / Containers
- **Product card:** white, 1px hairline, 4px corner. A square grey well holds the photo (object-cover; a family cut-out contained with 16px inset when the photo is a placeholder; "Photo coming soon" otherwise). Below, 12px padding: name, type label in meta grey, and the outline quote button pinned to the bottom. The whole card is the product link; hover lifts it (Card lift) and scales the photo to 1.03 over 300ms. The same card serves related products on the product page and the home page's From the catalogue row.
- **Family tile (home):** white, 1px hairline, 4px corner. A 16:10 grey well holds the family's cut-out, contained with 12px inset (20px from 640px). Below, 12px padding (16px from 640px): the family name (16px/600, title size from 640px) with its style count in tabular meta grey on the same baseline, the tagline in secondary grey (13px, 14px from 640px), then the family's types as plum text links ("Plastic", "Prong", "Shank"; 13px, 14px from 640px, 32px tall) when it has two or more. The name links the whole tile; the type links sit above that link. Hover: Card lift and the cut-out scales to 1.03.
- **"Something else?" tile (home):** the sixth tile, grey well, no border, 4px corner, 16px padding (20px from 640px): a heading, one line in small secondary grey, then the plum quote button (full width on phones) and, from 640px, a plum "Search the catalogue" link.
- **Showcase card (home family carousels):** lighter than the product card, so the home page reads as a showcase. No border: a square grey well (4px corner) holds the photo, scaled to 1.03 on hover (a placeholder shows the family cut-out with 24px inset). Below, 12px down: the name at 15px/600 (16px from 640px, underlined on hover), the type in meta grey, then a plum "Request a quote" text link (14px, 40px tall). The whole card opens the product. Drawn from the family's whole catalogue at the owner's request (2026-11-05), so client-marked photos appear here as they do in the catalogue grid.
- **Custom-request panel:** grey well, 4px corner, 20px padding; a title-size heading and one line on the left, the plum quote button on the right from 640px.
- **Empty state:** dashed #d2d2d7 border, 4px corner, centred: what didn't match, an offer to quote anything not listed, then the plum quote button and an outline "Clear the search".

### Inputs / Fields
Compact and plain: one 40px field shared by the quote and contact forms.
- **Text field:** 40px, white, #d2d2d7 border, 8px corner, 12px side padding; 16px text on phones, 15px from 640px; placeholder in secondary grey.
- **Text area:** the same stroke, corner and text sizes, 12px sides and 10px top and bottom; grows with its content. "What you need" in the quote form is at least 96px and does not resize.
- **Label:** 14px/500 above its field, 6px between them in the quote form; required fields end on a destructive asterisk.
- **Focus:** the border goes to ink with a 3px ink-at-10% halo, under the global 2px ink outline. **Invalid:** destructive border with a 3px destructive-at-20% halo. **Disabled:** 50% opacity.
- **Search (catalogue):** 40px, white, #d2d2d7 border, 8px corner, 15px text, a 16px search glyph inset left and a 32px clear button on the right once there is a query; full width on phones, 288px from 640px. Focus darkens the border to ink and draws the global ink ring. Results update as you type; a polite live region states "N of M products match". The page reads `?q=` as its opening search and keeps the current search in the address (replaced, not pushed), so a reload or a shared link shows the same results.
- **Hero search (home):** 44px, white, #d2d2d7 border, 8px corner, 16px text on phones and 15px from 640px, the 16px search glyph inset left, placeholder "Search products"; beside it the ink Search submit, together capped at 448px. It is a Base UI Autocomplete (`components/home/HeroSearch.tsx`): opening the field lists every category and type, each with its family's small cut-out and a style count or family name on the right; typing narrows them (up to five) and adds matching products (up to six, text only, since product photos often carry a client's mark), then a last "See all results for “…”" row. The list is a white panel the field's width, 8px radius, hairline border, the suggestion shadow, 40px rows, the highlighted row on Panel Grey. Picking a row (pointer, or Enter on a highlighted row) opens its page; Enter with nothing highlighted, or the Search button, opens `/products?q=` with the words.

### Hero band (home)
One band, the render's own ground (#f5f4f9), kept short at the owner's request. Left: the hero h1 on two lines, one lede ("Buckles, buttons, patches, plates and zippers, made across Pakistan, China and Hong Kong."), the hero search, then "Request a quote" (plum, 40px) and a plain "Browse all products →" text link. Right: the studio render, served art-directed from one picture element so each device downloads one image.
- **Phones:** the portrait render (`public/assets/home/hero-mobile.webp`, objects at the bottom) under the copy, full width, its top faded into the band.
- **From 768px:** the landscape render (`public/assets/home/hero-desktop.webp`, objects at the right) tucked up 4rem beside the actions, at the right at 72% width, faded at its left and top edges.
- **From 1024px:** the render anchored to the band's right edge at full band height (24rem, 26rem from 1280px), with a left fade only, so its empty field sits under the text and the hardware stays clear of it. Offset -4rem past the right edge at 1024px, flush from 1280px.
- Loaded eagerly at high priority, with one alt text for both crops.

### Quote request
One form, two containers: a dialog from 768px, a bottom sheet below.
- **Dialog:** 440px wide, at most 90dvh with a thin scrollbar, 24px padding, white, 5.6px corner, a 1px ink-at-10% ring, no shadow; 20px between header and form.
- **Sheet (phones):** sized to the form, up to 92dvh; top corners 5.6px and a hairline top edge; 20px sides and top, bottom padding at least 20px or the safe-area inset.
- **Header:** "Request a quote" at 18px/600, -0.01em; under it, 14px secondary grey: "Tell us what you need and our team will reply within 24 hours."
- **Form:** 14px between rows. When opened from a product, a "Quote for" line leads on the grey well (3.2px corner, 14px, the product name in 500, truncated). Name and Email sit side by side from 640px (12px gap). Then "What you need", then one line holding the small outline "Attach files" and a 12px secondary-grey note ("Optional. Up to 5 files, 4 MB in all."); chosen files show as 12px chips on the grey well with a hairline, size in grey and a remove button. Errors appear in a 3.2px-corner destructive panel. The default-size (40px) plum "Send request" closes it, full width.

### Navigation
- **Top bar (from 768px):** grey well, 36px, meta-size secondary grey. Email, phone and WhatsApp with 14px icons on the left; About us, Compliance, Blog, Contact on the right. Hover: ink and underline.
- **Nav:** sticky, white, 64px, hairline bottom border. Logo (40px tall) left; from 1024px, All products and the five families centred at 15px/500 in ink at 75%; the current one goes full ink with a 2px plum underline. Plum "Request a quote" on the right.
- **Phone:** logo, a WhatsApp icon and a menu icon. The menu is a full-height sheet: "Products" and "Company" groups of 48px rows with hairline dividers and a chevron, the current row in 600; then a full-width plum quote button and the contact routes.
- **Footer:** grey well, 14px secondary grey, logo and tagline then three link columns, 40px tap rows on phones; a hairline-ruled meta line at the bottom.

### Supporting home sections
- **Section intro:** headline, one lede in secondary grey, and a plum "›" link to the full catalogue; no label above.
- **Logo row:** client marks in one quiet row, grayscale at 75% opacity, full on hover; on the home page it sits right under the hero band with a hairline below; 4 columns on phones, one spread row from 1024px.
- **Order steps (How an order works):** on a grey band. The header row holds the section intro (no "›" link) and, on the right from 768px, a default-size plum "Start your request" quote button and a plum "Ask on WhatsApp" text link with its 20px icon. Below, four steps as a numbered timeline: 40px ink circles with white 14px/600 tabular numerals, joined by a 1px ink-at-15% rule that runs down the left on phones and across the row from 768px. Each step: a 16px/600 heading led by a small (18px) secondary-grey line icon, then 14px secondary-grey body. The steps (Send your request, Approve the sample, Bulk production, Inspected and shipped) are worded from the FAQ.
- **FAQ:** headline and lede in a sticky left column with a plum WhatsApp link; an accordion of 48px question rows divided by hairlines.
- **Blog:** three posts on a grey band; thumbnails left of the text on phones, above it from 640px.

### Legacy: Closing band (inner pages only)
A die-black band with a low-light buckle photo, a centred headline, a white "light" quote button and a WhatsApp link, closing About us, Compliance and the Blog index. Focus rings turn light inside it. It is a holdover from the previous world, not a pattern for new surfaces.

## Do's and Don'ts

### Do:
- **Do** open every catalogue view on the header row, the family chips and the grid, with the first product row inside the first viewport.
- **Do** show a live count on every filter chip and keep each chip a real link.
- **Do** put product photos in the square #f5f5f7 well inside a white card with a #e3e3e8 hairline.
- **Do** keep plum to the quote action, the selected family chip and text links.
- **Do** use the fixed type steps (hero 30/40px on the home hero only, display 24/28px, headline 20/22px, title 17px, meta 13px) and the 1200px container.
- **Do** offer a quote wherever a search or filter comes up empty.
- **Do** keep the home hero to one band on the render's own ground, with the search that opens `/products?q=` and the two actions.
- **Do** keep family tiles and the hero on studio cut-outs and renders. Catalogue photos (many carry client marks) appear only in the catalogue grid, product pages and the home family carousels.

### Don't:
- **Don't** put a hero, family stage page, lineup rail or marketing band ahead of the products on a catalogue view (`/products`, `/products/[family]`, `/products/[family]/[type]`). The home page's traditional hero is deliberate, at the owner's request on 2026-11-04.
- **Don't** grow the home hero into theatre: no type above the hero step, no lineup rail, no die band, no scroll-driven motion.
- **Don't** add other sideways rows. The home family carousels are the one exception, at the owner's request on 2026-11-05; catalogue views and every other home section stay grids.
- **Don't** add the die-black band or the strike animation to catalogue or home surfaces; they remain only where the inner pages already use them.
- **Don't** use clamp() or viewport-scaled type.
- **Don't** add eyebrow labels above headings.
- **Don't** give surfaces a shadow at rest.
- **Don't** introduce a second accent or a second typeface.
