---
name: Metro Metal
description: Garment and leather-goods hardware, shown clearly on every screen size and made to the buyer's mark.
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
    fontSize: "clamp(1.875rem, 1.5rem + 1.6vw, 2.5rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.375rem, 1.15rem + 0.9vw, 1.75rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem)"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  lede:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1rem, 0.95rem + 0.25vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "-0.005em"
  body:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "-0.005em"
  item-title:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.375
  control:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.01em"
  field:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.5
  small:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.43
  meta:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.4
rounded:
  pill: "9999px"
  field: "1.225rem"
  tile: "1.575rem"
  sheet: "1.75rem"
spacing:
  gutter-mobile: "1.25rem"
  gutter-desktop: "2rem"
  container: "75rem"
  nav-height: "4rem"
  contact-bar-height: "2.25rem"
  section-mobile: "2.5rem"
  section-tablet: "3.5rem"
  section-desktop: "4rem"
  intro-gap-mobile: "1.25rem"
  intro-gap-desktop: "1.5rem"
  grid-gap-mobile: "0.75rem"
  grid-gap-desktop: "1rem"
  card-pad-mobile: "0.75rem"
  card-pad-sm: "1rem"
  card-pad-md: "1.25rem"
  tap-min: "2.5rem"
  tap-comfort: "2.75rem"
  icon-disc: "2.25rem"
components:
  button-primary:
    backgroundColor: "{colors.plum}"
    textColor: "{colors.gallery-white}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "40px"
    typography: "{typography.control}"
  button-primary-large:
    backgroundColor: "{colors.plum}"
    textColor: "{colors.gallery-white}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "44px"
    typography: "{typography.control}"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.gallery-white}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "44px"
    typography: "{typography.control}"
  button-ink-hover:
    backgroundColor: "{colors.ink-pressed}"
  button-light:
    backgroundColor: "{colors.gallery-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "44px"
    typography: "{typography.control}"
  button-light-hover:
    backgroundColor: "{colors.aluminium-pressed}"
  button-secondary:
    backgroundColor: "{colors.aluminium}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "40px"
    typography: "{typography.control}"
  button-secondary-hover:
    backgroundColor: "{colors.aluminium-pressed}"
  button-icon:
    rounded: "{rounded.pill}"
    size: "44px"
  link-more:
    textColor: "{colors.plum}"
    typography: "{typography.control}"
    height: "40px"
  input:
    backgroundColor: "{colors.gallery-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "0 16px"
    height: "48px"
    typography: "{typography.field}"
  nav-bar:
    backgroundColor: "{colors.gallery-white}"
    textColor: "{colors.ink}"
    height: "{spacing.nav-height}"
    typography: "{typography.control}"
  contact-bar:
    backgroundColor: "{colors.aluminium}"
    textColor: "{colors.ink-secondary}"
    height: "{spacing.contact-bar-height}"
    typography: "{typography.meta}"
  icon-disc:
    backgroundColor: "{colors.aluminium}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    size: "{spacing.icon-disc}"
  family-strip-item:
    textColor: "{colors.ink-secondary}"
    typography: "{typography.meta}"
    height: "{spacing.tap-comfort}"
  family-strip-item-current:
    textColor: "{colors.ink}"
  card-family:
    backgroundColor: "{colors.aluminium}"
    textColor: "{colors.ink}"
    rounded: "{rounded.tile}"
    padding: "{spacing.card-pad-mobile}"
  card-product-image:
    backgroundColor: "{colors.aluminium}"
    rounded: "{rounded.tile}"
  card-type:
    backgroundColor: "{colors.aluminium}"
    textColor: "{colors.ink}"
    rounded: "{rounded.tile}"
    padding: "{spacing.card-pad-mobile}"
  card-highlight:
    backgroundColor: "{colors.aluminium}"
    textColor: "{colors.ink}"
    rounded: "{rounded.tile}"
    padding: "{spacing.card-pad-sm}"
  tile-made-to-spec:
    backgroundColor: "{colors.aluminium}"
    textColor: "{colors.ink}"
    rounded: "{rounded.tile}"
    padding: "{spacing.card-pad-mobile}"
  band-hero:
    backgroundColor: "{colors.aluminium}"
    textColor: "{colors.ink}"
    typography: "{typography.display}"
  band-about:
    backgroundColor: "{colors.aluminium}"
    textColor: "{colors.ink}"
  band-die:
    backgroundColor: "{colors.die}"
    textColor: "{colors.die-foreground}"
    typography: "{typography.headline}"
  quote-bar:
    backgroundColor: "rgb(255 255 255 / 0.85)"
    padding: "12px 20px"
  quote-sheet:
    backgroundColor: "{colors.gallery-white}"
    rounded: "{rounded.sheet}"
    padding: "32px"
    width: "520px"
---

# Design System: Metro Metal

## Overview

**Creative North Star: "The Die and the Strike"**

Metro Metal's catalog reads like a well-kept trade site: a normal white navbar that names every section, a contact bar above it, and pages that show everything at once in plain grids. The hardware is still the subject. Photographs and cut-out renders sit in soft aluminium wells, copy is short, and type is modest, so a buyer on a phone can take in the whole product range without scrolling sideways or decoding an unusual layout. The ground is gallery white and aluminium grey in full-width bands, closed by one near-black die band where objects are lit from above.

The world's ritual is still the die coming down on the mark. It shows up in two places: the strike motion (an opening image settling from slightly large and soft to exact and sharp) and the pressed state of every pill (a 1px deboss). Focus is the die edge, a 2px ink ring offset 3px. The current item in a wayfinding row (the nav, the family strip, the menu) reads in full ink against graphite neighbours; nothing is filled to show selection.

Density is moderate and mobile-first. Sections sit 40px apart on phones and 64px on desktop, cards sit 12 to 16px apart, and touch targets are at least 40px. Icons appear where they speed up scanning: contact routes, trust promises, process steps and the attachment hint. The one accent, plum, is spent on the quote action and on text links.

**Key Characteristics:**
- White and aluminium bands, one die-black band per page.
- Geist throughout: a modest mobile-first ramp (display 30 to 40px, body 16px) and one 15px/500 size for every control.
- Everything in view: grids wrap, nothing scrolls sideways.
- Pills for actions, plum "Label ›" links for navigation, 40px minimum tap height.
- Borderless rounded aluminium cards, no strokes and no card shadows.
- Outline icons beside contact routes, promises and steps, never on product cards or headings.
- One authored motion, the strike, always visible from the first frame and removed under reduced motion.

## Colors

A near-monochrome studio palette of white, aluminium and ink, with one plum voice and one die-black band.

### Primary
- **Mark Plum** (`plum`, renders as #7f2f82): the only accent. Fills the "Request a quote" pill everywhere except the die band, and colours every "Label ›" link, inline and prose link, the "View products ›" line on family cards and the quote link on product and type cards. It also marks the hubs on the presence map, and its 20% tint is the text-selection colour.

### Neutral
- **Gallery White** (`gallery-white`): the default page ground, the navbar, the products panel and menu sheet, field backgrounds, and the light pill on the die band.
- **Aluminium** (`aluminium`): the alternate band ground (home hero, made-to-mark, buyer quotes, journal, related products, footer), the contact bar, the family and type hero bands, the about band, and the ground of every card, image well, secondary pill and icon disc.
- **Pressed Aluminium** (`aluminium-pressed`): hover for secondary and light pills.
- **Ink** (`ink`): primary text, the ink pill, the current item in the nav, strip and menu, the active gallery thumbnail ring, and the focus ring.
- **Pressed Ink** (`ink-pressed`): ink pill hover.
- **Graphite** (`ink-secondary`): ledes, taglines, attribute lines, style counts, captions, contact-bar and footer text, card body lines, and the menu's contact routes.
- **Hairline** (`hairline`): the only divider. The navbar's bottom rule, the products panel, menu rows, spec lists, FAQ items, the trust row's bottom rule, the overview's family headings, and the land on the presence map.
- **Field Stroke** (`field-stroke`): 1px stroke of inputs, textareas and the outline pill.

### Tertiary
- **Die** (`die`): the closing band ground and the gallery lightbox. Text on it is **Die Light** (`die-foreground`), and secondary text on it is **Die Grey** (`die-muted`). Lightbox controls on die use white at 12% (20% on hover).

### Named Rules
**The One Voice Rule.** Plum fills only the quote action and colours only text links. No plum backgrounds, borders, icons or headings. On the die band the quote pill turns light, so plum never sits on black.

**The One Die Rule.** A page gets at most one die-black band, and it carries a lit object. Every element inside it sits under `.on-die`, so the focus ring flips to Die Light.

## Typography

**Display Font:** Geist (with Geist Fallback, ui-sans-serif, system-ui)
**Body Font:** Geist

**Character:** One grotesk in all roles, ranked by size and weight alone. Headings are semibold with light negative tracking; body copy is 16px at a comfortable 1.55. Sizes are set mobile first and grow only slightly with the viewport.

### Hierarchy
- **Display** (600, 30 to 40px fluid, 1.1): page H1s via the page header, the home hero statement, family and type names on their heroes, the catalog overview H1 and the 404 statement.
- **Headline** (600, 22 to 28px fluid, 1.2): every section heading through the section intro, the product H1 on the detail page, the closing die-band statement, and the statement on a "Get to know" card with no picture.
- **Title** (600, 17 to 19px fluid, 1.3): headings inside a section: family, type and "Get to know" card names, the "Not in the catalog?" tile, the overview's per-family headings, "About this piece" and the about-band heading.
- **Item title** (600, 16px): process step names, made-to-mark captions, FAQ questions, journal card titles from sm, and product names from sm (14px on phones).
- **Lede** (400, 16 to 18px fluid, 1.5): the one line under a heading, in Graphite (Die Grey on the die band), about 42rem max.
- **Body** (400, 16px, 1.55): running copy, buyer quotes, FAQ answers, menu rows. Prose is capped at 65 to 68ch.
- **Control** (500, 15px): every button, the nav links, the "Label ›" links and the quote-for note.
- **Small** (400, 14px): card body lines, style counts, spec rows, footer, trust labels (at 500), quote links on cards, the attachment hint.
- **Meta** (400, 13px): the contact bar, dates, attribute lines on product cards, card taglines on phones, family strip labels (12px on the narrowest phones), and the footer's legal row.
- **Field** (400, 17px): text inside inputs and textareas.

### Named Rules
**The No-Eyebrow Rule.** No small label sits above a heading. No kicker, no overline, no uppercase tracked tag, and no "01". The heading carries the weight, and context goes in the lede below it.

**The Scale-Utility Rule.** Headings use the display, headline, title and lede utilities; small text uses `text-sm` and `text-meta`. A new one-off size or clamp is a defect, not a new step.

**The One Control Size Rule.** Buttons, nav links and "›" links share one 15px/500 size, so every pressable thing reads as the same kind of thing.

## Layout

The container is 75rem wide, with 1.25rem gutters on phones and 2rem from 768px. Bands run full-bleed and their content sits in the container. Breakpoints are sm 640px, md 768px, lg 1024px and xl 1280px; every layout is written for phones first and widened upward.

**Section rhythm.** Sections are 2.5rem top and bottom on phones, 3.5rem from md and 4rem from lg. A section intro sits 1.25rem above its content (1.5rem from md); the catalog overview's "first look" intro, which heads a stack of sub-sections, takes 2 to 2.5rem. Inner pages open with 2 to 2.5rem above the page header. When two sections share a ground and follow each other, the second drops its top padding, so the rhythm stays one section gap rather than two.

**Grids.** Card grids sit 12px apart on phones and 16px from md. Product grids add a 24px row gap (32px in the overview's preview rows) so names and quote links stay clear of the next row. Columns:
- Family cards: 2, then 3 from sm, with a sixth "Not in the catalog?" cell closing the second row.
- Product grids: 2, then 4 from md (home and related) or 3 from md and 4 from lg (style grids). A grid may show fewer tiles on phones and let its "See all ›" link carry the rest.
- Type lineups: compact rows on phones, 2 from sm, 3 from md when there are at least three types.
- "Get to know" cards: 1, 2 from sm, then 3 or 4 by count.
- Two-part bands (process, FAQ, product detail, about band) split from md or lg at about 1:1, 2:3 or 0.85:1.15, with a 2 to 4rem gap; the text column of the FAQ and the product info column turn sticky below the nav.

**Card padding.** 12px on phones, 16px from sm, 20px from md on text-bearing cards.

### Named Rules
**The All-in-View Rule.** Nothing scrolls sideways. Rows that do not fit wrap into a grid, the family strip becomes five equal cells, and gallery thumbnails wrap to a second line. There are no carousels and no hidden overflow.

**The Thumb Reach Rule.** Every control and quote link is at least 40px tall, and icon buttons, menu rows, strip items and FAQ triggers are 44 to 48px. On a product page below 768px, the quote action lives in a bar fixed to the foot of the screen, and the footer pads itself 5.5rem so the bar never covers it.

## Elevation & Depth

The system is flat. Depth comes from tone (white against aluminium against die), from the navbar's hairline, and from impressions pressed *into* surfaces, never from shadows lifted *off* them. Two surfaces are translucent white with a backdrop blur: the phone quote bar (white at 85%, with a 6% black top rule) and the gallery's expand button.

### Shadow Vocabulary
- **Deboss** (`box-shadow: inset 0 1px 2px rgb(0 0 0 / 0.25)` with `translateY(1px)`): every pill on `:active`.
- **Object grounding** (`filter: drop-shadow(0 10px 14px rgba(15,15,20,0.14))` on cards, `drop-shadow(0 12px 18px rgba(15,15,20,0.14))` on heroes): only under transparent cut-out renders, so the object rests on its ground.

### Named Rules
**The Impression Rule.** Shadows go inward. The only outward shadow grounds a cut-out object, and it is never put on a container.

## Shapes

The form language has two shapes: the full pill for anything you press, and the soft rectangle for anything that holds an image. Cards, image wells and the quote-for note use the tile radius (1.575rem), with no border, an aluminium fill (or a ground sampled from the photo's own backdrop), and clipped overflow. Fields and the small thumbnails on phones (gallery strip, journal list) step down to the field radius. The quote dialog uses the sheet radius, and the phone quote sheet rounds only its top corners at the tile radius. Icon discs and icon buttons are full circles. Hairline rules (1px) divide lists. They are never boxes.

## Components

### Buttons
Pills that press like a die.
- **Shape:** full pill. Default 40px tall with 20px padding. Large is 44px with 24px padding and 20px icons. Small is 32px, raised to 40px wherever it is the quote action on a card. Icon buttons are 40px or 44px circles. All text is the 15px control size.
- **Primary (plum):** the quote action, and only the quote action. Hover mixes 12% black into the plum.
- **Ink:** a non-quote primary, such as "Browse products" on the 404 page.
- **Light:** the quote pill on the die band.
- **Secondary:** aluminium, for side actions with their icons: Email and WhatsApp on the product page, the WhatsApp icon button in the phone quote bar.
- **Ghost:** transparent, for the navbar's WhatsApp and menu icon buttons.
- **Outline:** 1px Field Stroke, transparent fill, for in-form utilities such as attaching files.
- **Pressed:** every pill drops 1px and takes the deboss. Disabled is 40% opacity.
- **Links ("Label ›"):** 15px plum text with a 16px chevron that nudges 2px right on hover, an underline on hover, and a 40px tall hit area. Die Light on the die band. They pair with a pill at a 1.5rem gap.

### Icons
**The Working Icon Rule.** Icons are lucide-react outlines at stroke 2 (1.75 inside discs); the WhatsApp brand mark comes from Tabler and is the only Tabler icon. They sit beside a label and help a buyer find something faster: contact routes (mail, phone, WhatsApp) in the contact bar, menu, footer, contact page and product actions; the four trust promises; the four process steps; and the attachment hint. Promises and steps set their 18px icon in a 36px aluminium circle. Inline icons are 16px (14px beside 13px contact-bar text, 20px beside the 15px WhatsApp link and on the contact page, 24px inside 44px icon buttons). Product and family cards, section headings, buyer quotes and FAQ items carry no content icons; the chevrons on links, accordions and the products disclosure are controls, not content.

### Navigation
- **Contact bar:** from 768px, a 36px aluminium strip above the navbar with email, phone and WhatsApp in 13px Graphite with their icons, and "Pakistan · China · Hong Kong" on the right. It scrolls away; the navbar stays.
- **Navbar:** sticky, 64px, plain white with a hairline beneath. Logo 40px tall on the left. From 1024px every section is named in a row (Home, Products, About, Compliance, Journal, Contact) at 15px/500 in ink at 70%, the current page in full ink, followed by the plum quote pill.
- **Products panel:** Products is a link plus a chevron button. The panel opens on mouse hover or from the button, spans the bar, and lists each family in five columns: a 96×56px cut-out thumbnail, the family name at 15px semibold, then its types at 14px Graphite. A hairline-topped row ends it with "View all products ›". Escape and focus leaving the item close it.
- **Below 1024px:** the bar holds the quote pill, a ghost WhatsApp icon button (below 768px) and a ghost menu button. The menu is a full-height top sheet: hairline-divided rows at 16px/500 (Home, Products, then each family indented at 15px, then the company pages), the current one semibold, followed by the contact routes with their icons.
- **Footer:** aluminium, 14px Graphite. A logo and tagline, then Products, Company and "Get in touch" (with contact icons). On phones the logo and contact columns span the width and Products sits beside Company; links are 40px tall (32px from md). A hairline-style rule sits above the 13px legal row.

### Family Strip
Wayfinding at the top of every family and type page, directly under the navbar.
- **Item:** a cut-out thumbnail (32px tall on phones, 44px from md) over the family name in 13px Graphite (12px below sm), at least 44px tall. Hover turns the label ink and scales the thumbnail 6% over 500ms with the strike ease.
- **Current:** the family in view reads in ink at medium weight, `aria-current="page"` on the family's own page and `"true"` on one of its types. Nothing is filled or boxed.
- **Layout:** five equal cells across the container on phones; from md a centred row of 5.75rem items with a 1.25rem gap.

### Cards / Containers
- **Corner Style:** tile radius. **Background:** aluminium, or the photo's sampled backdrop grey. **Shadow Strategy:** none (see Elevation). **Border:** none. **Internal Padding:** 12px, 16px from sm, 20px from md.
- **Family card:** a 2:1 image well (5:2 from xl) holding the cut-out, contained with the grounding shadow and scaled 4% on hover. Below it the Title-size name, a one-line tagline, and from sm a plum "View products ›" line (or the style count) at the foot. On phones a small graphite chevron sits beside the name instead. The whole card is the link.
- **Product card:** a square image well with the photo cropped 1:1, scaled 3% on hover over 700ms. Below it the name (14px semibold, 16px from sm), a 13px attribute line of up to three values separated by " · " and clipped to one line so a wrapping value hides whole, and a 40px plum "Request a quote" link that carries the product name. A placeholder lead photo (under 1000px wide) gives way to the family cut-out. The name link covers the card; the quote link sits above it.
- **Type card:** on phones a compact row, a 112px square picture beside the name, tagline, style count and quote link. From sm a picture-led card with a 16:9 well (4:3 when three or more types), then the text block and, at its foot, "Explore ›" and the quote link. The well holds the type's own Sanity image, else a cleared catalog photo, else the family cut-out.
- **"Get to know" card:** a 16:9 picture (4:3 from sm) over a Title and a 14px Graphite line. A card with no picture becomes a statement card: a Headline at the top and its line at the foot, at least 10rem tall (14rem from sm).
- **"Not in the catalog?" tile:** an aluminium tile with its text set to the foot: Title, one Graphite line asking for a drawing, tech pack or sample, and a 40px plum quote pill naming the family or type. Every style grid and every family grid closes on it. The compact version spans the row on phones and turns square beside four-up preview rows.

### Section Intro
A section's opening: a Headline, an optional Lede and an optional plum "Label ›" link (Die Light on the die band), 8px apart and capped at 48rem, aligned left or centred. No eyebrow.

### Page Header
For inner pages. Breadcrumbs at every width, then a Display H1 capped at 56rem, then a Lede in Graphite, then optional children. Padding is 2rem top and bottom (2.5rem from md).

### Home Hero
An aluminium band with the Display statement, a Lede, the large quote pill and "Explore products ›". The render is art-directed: phones get a portrait render cropped wide beneath the copy; from 768px a landscape render sits right at 78% width, tucked up beside the actions, with mask fades on its left and top edges; from 1024px it anchors to the right edge at the band's full height (26rem, 30rem from xl) and the copy sits on clear ground at its left. The render strikes on load.

### Family and Type Heroes
An aluminium band in two columns from md (1.2:1), 2rem tall padding (2.5rem from md). Left: the Display name, a Lede tagline, the style count at 14px, the large quote pill carrying the family or type, and one "›" link ("See every style" or "All {family}"). Right: the family cut-out with the grounding shadow, or the type's own image cropped 4:3 in a tile-radius well. Either one strikes on load.

### Trust Row and Process Steps
- **Trust row:** directly under the home hero, a white strip ruled by a hairline: four promises in 2 columns (4 from md), each a 36px aluminium icon disc beside a 14px/500 label.
- **Process:** a studio image (16:9, 4:3 from md) beside the headline, a lede and four steps, each a 36px icon disc beside an Item-title name and a 14px Graphite line.

### About Band
The page's search heading and intro as a quiet note near the foot of catalog pages: an aluminium band with the Title heading on the left and the intro in 14px Graphite on the right, max 68ch, split 0.85:1.15 from lg. Omitted when there is no intro.

### Product Detail
Breadcrumbs, then the gallery and the info column side by side from md (1.1:1). The info column holds the Headline name, a 16px Graphite line, a hairline-ruled spec list at 14px, and from md the actions: a full-width large plum pill over two secondary pills (Email, WhatsApp) with their icons. Below the actions, the attachment hint: a 16px paperclip beside a 14px Graphite line naming the file limit. Below 768px the actions move to the fixed quote bar: the large quote pill filling the width beside a 44px secondary WhatsApp icon button, padded for the safe area.

### Gallery
A 4:3 frame in an aluminium well; a 40px translucent expand button sits at its corner (revealed on hover from lg). Thumbnails sit in five equal cells on phones and wrap at 72px (80px from md) from sm; the active one carries a 2px ink ring, the rest sit at 70% until hovered. The full-screen viewer is die-black with 44px previous and next controls.

### Journal List
Phones get a compact list: a 112px 4:3 thumbnail beside the 13px date and a 14px semibold title. From sm, three columns of 16:10 pictures with 16px titles beneath.

### Quote Flow
Every "Request a quote" opens the same form. From 768px it is a centred dialog (max 520px, sheet radius, 32px padding, a scroll cap at 90vh with a thin scrollbar). On phones it is a bottom sheet at 85vh. When opened from a product or family, the form leads with an aluminium "Quote for **{product}**" note. Fields are name, email and "What you need", plus an outline "Attach specs or reference files" pill and a full-width large plum "Send request".

### Inputs / Fields
- **Style:** 48px tall, white, 1px Field Stroke, field radius, 16px padding, 17px text, Graphite placeholder.
- **Focus:** the border turns ink and gains a 4px ink ring at 10%.
- **Error:** destructive border with a 3px destructive ring at 20%.

### Focus
**The Die Edge Rule.** Every focusable element shows a 2px ink outline offset 3px on `:focus-visible`. Inside `.on-die` the outline is Die Light. Fields add their own soft ring on top.

### Motion: the Strike
One authored motion: the element scales from 1.045 to 1 and sharpens from a 6px blur to none, with the strike ease `cubic-bezier(0.16, 1, 0.3, 1)`.
- **On load:** 1.2s, once, on the opening image of a page only: the home hero render and the family and type hero images.
- **On view:** scroll-driven (`animation-timeline: view()`, range entry 10% to cover 45%), on the embossed plate in the home made-to-mark band only. Browsers without view timelines show the static image.
- **Reduced motion:** both are removed. The element is visible and sharp from the first frame either way.
- Other transitions are state feedback at 200ms ease-out, with 500 to 700ms strike-eased image hover scales. No scroll reveals, fades or timed carousels.

### Imagery
- **Studio renders** (home hero, made-to-mark, process, die band, family studio shots) live in `public/assets/home`, each WebP with a `.webp.json` provenance sidecar recording `prompt` and `createdAt`. Wells behind full-bleed photos take the photo's own backdrop grey.
- **Cut-outs** (`public/assets/bento`, with small strip and panel thumbnails in `public/assets/bento/thumb`) are transparent WebP served unoptimised to keep their alpha, set `object-contain`, with the grounding shadow. A cut-out is the last fallback for every catalog image spot.
- **Catalog photos** from Sanity are cropped square in product cards, 4:3 or 16:9 in type and "Get to know" cards and the type hero, 4:3 in the detail gallery; journal pictures crop 16:10.
- **Client marks** are greyscale at 75% opacity with a multiply blend, optically sized per mark, in a four-column grid on phones and one justified row from lg, with no boxes.

**The Cleared Lead Rule.** Lead spots (type cards, type heroes and "Get to know" cards) show only studio renders, cut-outs, images set on that type or card in Sanity, or catalog photos on the `LEAD_PHOTOS` allowlist that are at least 1000px wide. Catalog photos that carry a client's mark never lead. They stay in the style grids.

## Do's and Don'ts

### Do:
- **Do** write layouts for phones first, then widen at sm 640, md 768, lg 1024 and xl 1280.
- **Do** show every item at once in a wrapping grid, 12px apart on phones and 16px from md.
- **Do** space sections at 2.5rem, 3.5rem from md and 4rem from lg, and drop the top padding of a second same-ground section.
- **Do** keep every control and quote link at least 40px tall, and icon buttons 44px.
- **Do** spend plum only on the quote pill and text links. On the die band, use the light pill.
- **Do** open sections with the Section Intro and inner pages with the Page Header, using the scale utilities.
- **Do** put a 16px outline icon beside contact routes, and an 18px icon in a 36px aluminium disc beside promises and steps.
- **Do** express state as impressions: 1px deboss on press and a 2px ink ring offset 3px on focus. Mark the current page with full ink.
- **Do** carry the product name into every quote action that has one.
- **Do** ship a `.webp.json` provenance sidecar beside every new raster.
- **Do** close every style grid and family grid on the "Not in the catalog?" tile.

### Don't:
- **Don't** build rows that scroll sideways, or carousels of any kind.
- **Don't** put an eyebrow, kicker, overline or numbered tag above a heading.
- **Don't** put icons on product or family cards, section headings, buyer quotes or FAQ items.
- **Don't** add borders or drop shadows to cards. The only outward shadow grounds a cut-out object.
- **Don't** add a second authored motion, timed carousels or fade-in reveals. The strike never starts from opacity 0.
- **Don't** use off-palette greys or reds (Tailwind slate, gray or red scales). Use the named tokens.
- **Don't** add one-off type sizes or clamps outside the ramp.
- **Don't** use more than one die band on a page.
