---
name: Metro Metal
description: Garment and leather-goods hardware, shown at studio scale and made to the buyer's mark.
colors:
  gallery-white: "#ffffff"
  aluminium: "#f5f5f7"
  aluminium-pressed: "#e8e8ed"
  ink: "#1d1d1f"
  ink-pressed: "#3a3a3c"
  ink-secondary: "#6e6e73"
  die: "#0b0b0c"
  die-foreground: "#f5f5f7"
  die-muted: "#a1a1a6"
  plum: "oklch(0.4533 0.1522 326.27)"
  hairline: "#e3e3e8"
  field-stroke: "#d2d2d7"
  destructive: "oklch(0.577 0.245 27.325)"
typography:
  display:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 6.6vw, 6rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.125rem, 4.4vw, 3.75rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.375rem, 2vw, 1.75rem)"
    fontWeight: 600
    lineHeight: 1.16
    letterSpacing: "-0.02em"
  card-title:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 600
    lineHeight: 1.375
    letterSpacing: "-0.02em"
  subtitle:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.3125rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  lede:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.1875rem, 1.6vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.42
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.47
    letterSpacing: "-0.01em"
  caption:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.47
    letterSpacing: "-0.01em"
  meta:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.47
    letterSpacing: "-0.01em"
  label-small:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "-0.01em"
rounded:
  pill: "9999px"
  field: "1.225rem"
  inset: "1.575rem"
  sheet: "1.75rem"
  tile: "2rem"
spacing:
  gutter-mobile: "1.25rem"
  gutter-desktop: "2rem"
  container: "75rem"
  nav-height: "3.25rem"
  rail-gap-mobile: "1rem"
  rail-gap-desktop: "1.25rem"
  tile-pad-mobile: "2rem"
  tile-pad-desktop: "2.5rem"
  section-mobile: "6rem"
  section-desktop: "8rem"
components:
  button-primary:
    backgroundColor: "{colors.plum}"
    textColor: "{colors.gallery-white}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "40px"
    typography: "{typography.caption}"
  button-primary-large:
    backgroundColor: "{colors.plum}"
    textColor: "{colors.gallery-white}"
    rounded: "{rounded.pill}"
    padding: "0 28px"
    height: "48px"
    typography: "{typography.body}"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.gallery-white}"
    rounded: "{rounded.pill}"
    padding: "0 28px"
    height: "48px"
  button-ink-hover:
    backgroundColor: "{colors.ink-pressed}"
  button-light:
    backgroundColor: "{colors.gallery-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 28px"
    height: "48px"
  button-light-hover:
    backgroundColor: "{colors.aluminium-pressed}"
  button-secondary:
    backgroundColor: "{colors.aluminium}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "40px"
  button-secondary-hover:
    backgroundColor: "{colors.aluminium-pressed}"
  link-more:
    textColor: "{colors.plum}"
    typography: "{typography.body}"
  family-strip-item:
    textColor: "{colors.ink-secondary}"
    typography: "{typography.label-small}"
    width: "5.75rem"
  family-strip-item-current:
    textColor: "{colors.ink}"
  input:
    backgroundColor: "{colors.gallery-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "0 16px"
    height: "48px"
    typography: "{typography.body}"
  tile-family:
    backgroundColor: "{colors.aluminium}"
    textColor: "{colors.ink}"
    rounded: "{rounded.tile}"
    padding: "{spacing.tile-pad-desktop}"
    height: "32rem"
  tile-product-image:
    backgroundColor: "{colors.aluminium}"
    rounded: "{rounded.tile}"
  tile-family-overview:
    backgroundColor: "{colors.aluminium}"
    textColor: "{colors.ink}"
    rounded: "{rounded.tile}"
    padding: "{spacing.tile-pad-desktop}"
    height: "26rem"
  tile-type:
    backgroundColor: "{colors.aluminium}"
    textColor: "{colors.ink}"
    rounded: "{rounded.tile}"
    padding: "1.75rem 2.25rem 2.25rem"
  tile-highlight:
    backgroundColor: "{colors.aluminium}"
    textColor: "{colors.ink}"
    rounded: "{rounded.tile}"
    height: "34rem"
    width: "30rem"
  tile-made-to-spec:
    backgroundColor: "{colors.aluminium}"
    textColor: "{colors.ink}"
    rounded: "{rounded.tile}"
    padding: "{spacing.tile-pad-mobile}"
  band-family-hero:
    backgroundColor: "{colors.aluminium}"
    textColor: "{colors.ink}"
    typography: "{typography.display}"
  band-about:
    backgroundColor: "{colors.aluminium}"
    textColor: "{colors.ink}"
  band-die:
    backgroundColor: "{colors.die}"
    textColor: "{colors.die-foreground}"
  nav-bar:
    backgroundColor: "rgb(255 255 255 / 0.8)"
    textColor: "{colors.ink}"
    height: "{spacing.nav-height}"
    typography: "{typography.label-small}"
  quote-sheet:
    backgroundColor: "{colors.gallery-white}"
    rounded: "{rounded.sheet}"
    padding: "32px"
    width: "520px"
---

# Design System: Metro Metal

## Overview

**Creative North Star: "The Die and the Strike"**

Metro Metal's catalog is presented the way a maker presents its finest objects: one piece of hardware per viewport, at studio scale, with one sentence about it. The ground is gallery white and aluminium grey, alternating in full-width bands, broken once per page by a near-black die band where the object is lit from above. Everything else steps back so the metal reads.

The world's ritual is the die coming down on the mark. It shows up in two places and nowhere else: the strike motion (an image settling from slightly large and soft to exact and sharp) and the pressed state of every pill (a 1px deboss). Focus is the die edge, a 2px ink ring offset 3px. The current item in a wayfinding row (the global nav, the family strip) reads in full ink at medium weight against graphite neighbours; nothing is filled to show selection. There is no decorative motion, no eyebrow label and no icon tile; size alone ranks content.

Density is low and confident. Sections breathe at 96px on phones and 128px on desktop, headings are large and tight, copy is short, and the one accent, plum, is spent on the quote action and on text links.

**Key Characteristics:**
- White and aluminium bands, one die-black band per page.
- Geist throughout, semibold and tightly tracked at display sizes, 17px body.
- Pills for actions, "Label ›" plum links for navigation.
- Borderless rounded tiles on aluminium, with no strokes and no card shadows.
- States are impressions: deboss on press, die-edge ring on focus. The current page reads in full ink at medium weight.
- One authored motion, the strike, always visible from the first frame and removed under reduced motion.

## Colors

A near-monochrome studio palette of white, aluminium and ink, with one plum voice and one die-black band.

### Primary
- **Mark Plum** (`plum`, renders as #7f2f82): the only accent. Fills the "Request a quote" pill in every context except the die band, and colours every "Label ›" text link, inline link and the quote link on tiles. It also marks the hubs on the presence map, and its 20% tint is the text-selection colour.

### Neutral
- **Gallery White** (`gallery-white`): the default page ground, field background, and the light pill on the die band.
- **Aluminium** (`aluminium`): the alternate band ground (lineup tiles, made-to-mark, buyer quotes, footer), and the ground of every tile, secondary pill and image well. It is also the ground of the family and type hero bands and the about band on catalog pages.
- **Pressed Aluminium** (`aluminium-pressed`): hover for secondary pills, light pills and rail controls.
- **Ink** (`ink`): all primary text, the ink pill, the current item in the nav and family strip, and the focus ring.
- **Pressed Ink** (`ink-pressed`): ink pill hover.
- **Graphite** (`ink-secondary`): ledes, captions, attribute lines, style counts, family strip labels, footer text and step bodies.
- **Hairline** (`hairline`): the only divider. Used for the 1px rules in the process steps, spec lists and FAQ, and for the land on the presence map.
- **Field Stroke** (`field-stroke`): 1px stroke of inputs, textareas and the outline pill.

### Tertiary
- **Die** (`die`): the closing band ground and the gallery lightbox. Text on it is **Die Light** (`die-foreground`), and secondary text on it is **Die Grey** (`die-muted`). Rail and lightbox controls on die use white at 12% (20% on hover).

### Named Rules
**The One Voice Rule.** Plum fills only the quote action and colours only text links. No plum backgrounds, borders, icons or headings. On the die band the quote pill turns light, so plum never sits on black.

**The One Die Rule.** A page gets at most one die-black band, and it carries a lit object. Every element inside it sits under `.on-die`, so the focus ring flips to Die Light.

## Typography

**Display Font:** Geist (with Geist Fallback, ui-sans-serif, system-ui)
**Body Font:** Geist

**Character:** One grotesk in all roles, ranked by size and weight alone. Display sizes are semibold and tracked tight (down to -0.035em). Body text is set slightly tight (-0.01em) at 17px.

### Hierarchy
- **Display** (600, clamp 44 to 96px, 1.02): page H1s via the page header, the family and type names on their hero bands, the catalog overview H1, the 404 statement, and the closing band statement.
- **Headline** (600, clamp 34 to 60px, 1.05): every section heading, through the section intro, and the statement on a "Get to know" card that has no picture.
- **Title** (600, clamp 22 to 28px, 1.16): headings inside a section, such as "About this piece", presence countries, contact panel titles, type tile names, "Get to know" card titles, the family heading in each overview row, the about-band heading and the full-size "Not in the catalog?" tile.
- **Card title** (600, 19px, -0.02em): product names, the compact "Not in the catalog?" tile, process steps and FAQ questions (21px from md).
- **Subtitle** (600, 21px, -0.02em): step and feature titles, photo-tile captions and journal card titles.
- **Meta** (400, 14px): dates, reading time and route labels above contact values.
- **Lede** (400, clamp 19 to 22px, 1.42): the one line under a heading, in Graphite (or Die Grey on the die band), max about 42rem.
- **Body** (400, 17px, 1.47): running copy, links and tile lines. Prose is capped at 62 to 68ch.
- **Caption** (400, 15px): attribute lines, style counts, figcaptions and dialog descriptions.
- **Label small** (400, 13px): nav links at 75% ink, family strip labels in Graphite (the current one ink and medium), and the footer.

### Named Rules
**The No-Eyebrow Rule.** No small label sits above a heading. No kicker, no overline, no uppercase tracked tag, and no "01". The heading carries the weight, and context goes in the lede below it.

**The Scale-Utility Rule.** Headings use the display, headline, title and lede scale utilities. A new one-off clamp is a defect, not a new step.

## Layout

The container is 75rem wide, with 1.25rem gutters on phones and 2rem from 768px (`min(100% - gutters, 75rem)`). Bands run full-bleed, and their content sits in the container. Section padding is 6rem on phones and 8rem from md. A section intro sits 2.5 to 3.5rem above its content (mb-10 / md:mb-14) or 3 to 4rem when centred. Inner pages open with 2.5 to 3.5rem top padding under the nav.

The global nav is sticky and 52px tall (`--nav-h`), and anchor scroll offsets include it. Two-column bands (process, FAQ, product detail) split 1:1 or 1.35:1 at lg with a 4 to 5rem gap, and the text column turns sticky at `nav-h + 2–3rem`. Product grids run 1, 2 and 3 columns with a 1.5rem column gap and a 3.5rem row gap. The catalog overview's per-family preview rows run 2 then 4 columns with a 1 to 1.25rem column gap and a 2.5rem row gap, under a title and a "See all ›" link split by a hairline. Type lineups take as many columns as they have types, up to 3 at lg, with a 1.25rem gap (1.5rem at md). The overview's family tiles sit on a 6-column grid from md: the first two span 3 columns at 32rem tall, the rest span 2 at 28rem (26rem stacked on phones).

When two sections share a ground and follow each other, the second drops its top padding, so the rhythm stays one section gap rather than two.

**Rails** bleed past the container. Their inline padding mirrors the container gutter, so the first tile lines up with the page edge, and they snap mandatorily to each tile's start. Tiles are 86% of the viewport on phones, 60% at sm, and min(46rem, 60vw) at lg. The "Get to know" rail sets narrower cards (84%, 46% at sm, 30rem at lg) so on desktop the row runs past the viewport edge and reads as more to scroll. The gap is 1rem (1.25rem at md). Previous and next controls sit right-aligned in the container under the rail. They are hidden when everything fits and disabled at each end.

## Elevation & Depth

The system is flat. Depth comes from tone (white against aluminium against die), from the translucent nav (white at 80%, backdrop blur, saturate 150%, and a black 6% hairline), and from impressions pressed *into* surfaces, never from shadows lifted *off* them.

### Shadow Vocabulary
- **Deboss** (`box-shadow: inset 0 1px 2px rgb(0 0 0 / 0.25)` with `translateY(1px)`): every pill on `:active`.
- **Object grounding** (`filter: drop-shadow(0 18px 24px rgba(15,15,20,0.14))`): only under transparent cut-out renders, wherever they sit (lineup and family tiles, family and type heroes, type tiles and product tiles that fall back to the cut-out, "Get to know" cards), so the object rests on its ground.

### Named Rules
**The Impression Rule.** Shadows go inward. The only outward shadow grounds a cut-out object, and it is never put on a container.

## Shapes

The form language has two shapes: the full pill for anything you press, and the large soft rectangle for anything that holds an image. Tiles and image wells use the tile radius, with no border, filled aluminium (or a ground sampled from the photo's own backdrop), and `overflow: hidden`. Smaller insets, such as gallery thumbnails and the "Quote for" note, step down to the inset radius. Fields use the field radius. The quote dialog uses the sheet radius, and the phone sheet rounds only its top corners. Hairline rules (1px, Hairline) divide lists. They are never boxes.

## Components

### Buttons
Pills that press like a die.
- **Shape:** full pill. Default 40px tall with 20px padding and 15px medium text. Large is 48px with 28px padding and 17px text. Small is 32px.
- **Primary (plum):** the quote action, and only the quote action. Hover mixes 12% black into the plum.
- **Ink:** a non-quote primary, such as "Browse products" on the 404 page.
- **Light:** the quote pill on the die band.
- **Secondary:** aluminium, for side actions such as Email and WhatsApp on the product page.
- **Outline:** 1px Field Stroke, transparent fill, for in-form utilities such as attaching files.
- **Pressed:** every pill drops 1px and takes the deboss. Disabled is 40% opacity.
- **Links ("Label ›"):** 17px plum text with a 16px chevron that nudges 2px right on hover, and an underline on hover. They pair with a pill at a 1.75rem gap.

### Family Strip
Persistent wayfinding at the top of every family and type page, directly under the nav.
- **Item:** a 5.75rem-wide link with the family's cut-out thumbnail (80×44px box, `object-contain`) over its name in 13px Graphite. Thumbnails are small alpha WebPs in `public/assets/bento/thumb`, served unoptimised. Hover turns the label ink and scales the thumbnail 6% over 500ms with the strike ease.
- **Current:** the family in view reads in ink at medium weight. It is `aria-current="page"` on the family's own page and `aria-current="true"` on one of its types. Nothing is filled or boxed.
- **Layout:** one row, centred from md with a 1.25rem gap. On phones it scrolls horizontally with the scrollbar hidden. The row ends on an "All products" link back to the overview.

### Cards / Containers (tiles)
- **Corner Style:** tile radius.
- **Background:** aluminium, or the photo's sampled backdrop grey for full-bleed photo tiles.
- **Shadow Strategy:** none (see Elevation).
- **Border:** none.
- **Internal Padding:** 2rem (2.5rem from md) on text-bearing tiles.
- **Product tile:** a square image well with the photo cropped to 1:1 and a 3% scale on hover over 700ms with the strike ease. Below it sit the card title, a one-line attribute list of up to three values separated by " · ", and a plum "Request a quote" link that carries the product name. The attribute line is clipped to one line height, so a value that would wrap is hidden whole, separator and all. When a page passes a `fallback` and the lead photo is a small placeholder (under 1000px wide), the well shows the family cut-out instead, contained with 1.5rem padding and the grounding shadow. The title link covers the whole tile, and the quote link sits above it.
- **Family tile (lineup):** 28rem tall (32rem at md). Name at clamp 28 to 40px. One Graphite line. "Explore ›" and "Request a quote" links. The cut-out object fills the lower part and runs slightly past the tile's sides.
- **Family tile (overview):** the same anatomy on the catalog overview. The "Explore" link carries the style count ("Explore 12 styles ›"), the name links the whole tile, and the cut-out runs 5% past each side from 13.5rem down. Heights follow the overview grid (see Layout).
- **Type tile:** a 4:3 image well on top, then a text block (1.75rem top, 2rem sides and bottom, 2.25rem at md) with the Title-size type name, a Graphite tagline, the style count in Caption, and "Explore ›" plus a plum "Request a quote" link pinned to the foot. The well holds the type's own Sanity hero image, else a cleared catalog photo (see Imagery), both cropped 4:3 to cover; else the family cut-out, contained with the grounding shadow. The image scales 3% on hover. The name links the whole tile.
- **"Get to know" card:** 30rem tall (34rem at md), in the "Get to know" rail. Text sits on top (Title plus a Graphite line, 2rem padding, 2.25rem at md) and the picture fills the space below it, covering edge to edge (a cut-out is contained and grounded instead). A card with no picture becomes a statement card: a Headline title at the top and a Lede at the foot, max 22rem.
- **"Not in the catalog?" tile:** an aluminium tile, square in style grids, with its text set to the foot: Title, one Graphite caption line asking for a drawing, tech pack or sample, and the default plum quote pill naming the family or type. Padding is 1.75rem (2rem at md). Every style grid closes on it. The compact version (Card title size) spans the row on phones and only turns square beside four-up product rows, where it fills a preview row that holds fewer than four styles.

### Inputs / Fields
- **Style:** 48px tall, white, 1px Field Stroke, field radius, 16px padding, 17px text, Graphite placeholder.
- **Focus:** the border turns ink and gains a 4px ink ring at 10%.
- **Error:** destructive border with a 3px destructive ring at 20%.

### Navigation
- **Bar:** sticky, 52px, translucent white with blur. Logo 32px tall on the left. The families and company links are 13px at 75% ink, and the current page is full ink and medium weight. A small plum quote pill is always present, on every width.
- **Mobile:** a ghost menu icon opens a full-height top sheet that lists the same links at 28px semibold.
- **Footer:** aluminium, 13px Graphite, a logo column plus three link columns, with a hairline above the legal row.

### Section Intro
A section's opening has a Headline, an optional Lede, and an optional plum "Label ›" link (Die Light on the die band). It is capped at 48rem, aligned left or centred. It has no eyebrow.

### Page Header
For inner pages. Breadcrumbs (desktop only), then a Display H1 capped at 64rem, then a Lede in Graphite, then optional children. Padding is 2.5rem top and 3.5rem bottom (3.5rem and 5rem at md).

### Family Hero
The opening of a family page: an aluminium band with a centred Display family name, a Lede tagline (max 36rem), then the large plum quote pill carrying the family and "See every style ›", which jumps to the style grid. The family render runs beneath at studio scale (max 62rem, or a Sanity hero image at 16:7) and strikes on load. On phones it is 112% wide and bleeds about 6% past each edge, so it keeps its scale. Padding is 3.5rem above the name and below the render (5rem at md).

### Type Hero
The opening of a type page: an aluminium band in two equal columns from md. On the left are the Display type name, a Lede tagline, the style count in Caption, the large quote pill carrying the type, and "All {family} ›". On the right is the type's own image (its Sanity hero image, else a cleared catalog photo), cropped square in a tile-radius well, or else the family cut-out at 118% of the column (112% and bleeding on phones). Either one strikes on load.

### About Band
The page's search heading and intro, set as a quiet note near the foot of catalog pages: an aluminium band (5rem padding, 7rem at md) with the Title heading on the left (max 28rem) and the body intro in Graphite on the right, max 68ch, split 0.85:1.15 at lg with a 5rem gap. It is omitted when there is no intro.

### Rail
See Layout. Its controls are 44px circular ghost buttons on aluminium (white at 12% on the die band). Stepping scrolls one tile plus the gap, smoothly unless the user prefers reduced motion.

### Quote Flow
Every "Request a quote" opens the same form. From 768px it is a centred dialog (max 520px, sheet radius, 32px padding, a scroll cap at 90vh with a thin scrollbar). On phones it is a bottom sheet at 85vh. The title is 24px semibold and the description is caption text. When opened from a product or family, the form leads with an aluminium "Quote for **{product}**" note, so the request already names what the buyer looked at. Fields are name, email and "What you need", plus an outline "Attach specs or reference files" pill and a full-width large plum "Send request".

### Focus
**The Die Edge Rule.** Every focusable element shows a 2px ink outline offset 3px on `:focus-visible`. Inside `.on-die` the outline is Die Light. Fields add their own soft ring on top.

### Motion: the Strike
One authored motion: the element scales from 1.045 to 1 and sharpens from a 6px blur to none, with the strike ease `cubic-bezier(0.16, 1, 0.3, 1)`.
- **On load:** 1.2s, once. Used on the opening render of a page only: the home hero, the family hero render and the type hero image.
- **On view:** scroll-driven (`animation-timeline: view()`, range entry 10% to cover 45%). Used on the embossed plate on the home page only. Browsers without view timelines show the static image.
- **Reduced motion:** both animations are removed. The element is visible and sharp from the first frame either way, because the strike never hides content.
- Other transitions are state feedback only, at 200ms ease-out, with a 700ms strike ease for the image hover scale. There are no scroll reveals, fades or carousels on timers.

### Imagery
- **Studio renders** (hero, made-to-mark, process, die band, and the family studio shots used in "Get to know" cards) live in `public/assets/home`. Each WebP ships with a `.webp.json` provenance sidecar that records `prompt` (origin and every grade or crop applied) and `createdAt`. Tiles behind full-bleed photos take the photo's own backdrop grey, so the edges disappear.
- **Cut-outs** (family renders in `public/assets/bento`, with 320px-wide strip thumbnails in `public/assets/bento/thumb`) are transparent WebP served unoptimised to keep their alpha, set `object-contain` to the bottom, with the grounding drop shadow. A cut-out is the last fallback for every catalog image spot, so no spot shows an empty well or a placeholder photo.
- **Catalog photos** from Sanity are always cropped square (800×800, `fit=crop`) in an aluminium well. Type tiles crop 4:3, and type heroes and "Get to know" cards crop square to cover. Detail galleries use 4:3. Journal images use 16:10 or 16:9.

**The Cleared Lead Rule.** Lead spots (type tiles, type heroes and "Get to know" cards) show only studio renders, cut-outs, images set on that type or card in Sanity, or catalog photos on the `LEAD_PHOTOS` allowlist that are at least 1000px wide. Catalog photos that carry a client's mark never lead. They stay in the style grids.
- **Client marks** are greyscale at 75% opacity with a multiply blend, optically sized per mark, in one row with no boxes.

## Do's and Don'ts

### Do:
- **Do** let one object own each viewport, at studio scale, on white, aluminium or die.
- **Do** spend plum only on the quote pill and text links. On the die band, use the light pill.
- **Do** open sections with the Section Intro and inner pages with the Page Header, using the scale utilities.
- **Do** express state as impressions: 1px deboss on press and a 2px ink ring offset 3px on focus. Mark the current page with full ink at medium weight.
- **Do** carry the product name into every quote action that has one.
- **Do** ship a `.webp.json` provenance sidecar beside every new raster.
- **Do** crop catalog photos square in an aluminium well with the tile radius.
- **Do** lead with studio renders or cleared catalog photos only. Client-marked photos stay in the style grids.
- **Do** close every style grid on the "Not in the catalog?" tile.

### Don't:
- **Don't** put an eyebrow, kicker, overline or numbered tag above a heading.
- **Don't** add borders or drop shadows to tiles. The only outward shadow grounds a cut-out object.
- **Don't** add a second authored motion, timed carousels or fade-in reveals. The strike never starts from opacity 0.
- **Don't** use off-palette greys or reds (Tailwind slate, gray or red scales). Use the named tokens.
- **Don't** use icon tiles or glyph icons as decoration. Icons appear only as functional chevrons, controls and brand marks (WhatsApp, mail).
- **Don't** use more than one die band on a page.
