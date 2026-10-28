/**
 * Built-in visuals and copy for the product families, keyed by category slug.
 * Sanity's tagline, heroImage and highlights fields win wherever they are set;
 * these keep every page whole until they are (and stay in step with them).
 */

export type StudioImage = { src: string; alt: string; width: number; height: number };

export type FamilyDefaults = {
  /** Transparent studio cut-out, shown on the family hero, tile and strip. */
  cutout: StudioImage;
  /** A 320px copy of the cut-out for the family strip. */
  thumb: string;
  /** Studio photographs that lead the "Get to know" row before catalog photos. */
  studio: StudioImage[];
  tagline: string;
  highlights: { title: string; body: string }[];
};

export const FAMILY_DEFAULTS: Record<string, FamilyDefaults> = {
  buckles: {
    cutout: {
      src: "/assets/bento/buckles.webp",
      alt: "Five belt buckles in nickel, antique brass, gunmetal and rose-gold finishes",
      width: 1600,
      height: 604,
    },
    thumb: "/assets/bento/thumb/buckles.webp",
    studio: [
      {
        src: "/assets/home/landing-buckle.webp",
        alt: "Six polished nickel roller and prong buckles",
        width: 1200,
        height: 1200,
      },
    ],
    tagline: "Engineered to your spec, plated in the finish you choose.",
    highlights: [
      {
        title: "Engineered to your spec.",
        body: "Each buckle is built from your design and sampled for your approval before production.",
      },
      {
        title: "Plated to match.",
        body: "A range of platings and coatings, so every buckle matches the rest of your hardware.",
      },
      {
        title: "From sample to full run.",
        body: "One team handles sampling and bulk production, with direct export to Europe and North America.",
      },
    ],
  },
  buttons: {
    cutout: {
      src: "/assets/bento/buttons.webp",
      alt: "Six buttons in polished nickel, gunmetal, antique brass, black and rose-gold finishes",
      width: 1600,
      height: 653,
    },
    thumb: "/assets/bento/thumb/buttons.webp",
    studio: [],
    tagline: "Plastic, prong and shank, branded to your mark.",
    highlights: [
      {
        title: "Your mark on every one.",
        body: "Custom branding and private-label stamping, on all three types.",
      },
      {
        title: "A button for every garment.",
        body: "Prong snaps for denim and workwear, shank buttons for coats and suiting, plastic for casual and sportswear.",
      },
      {
        title: "Colour and finish to spec.",
        body: "Plastic buttons colour-matched to your fabric, metal buttons in a range of finishes.",
      },
    ],
  },
  patches: {
    cutout: {
      src: "/assets/bento/patches.webp",
      alt: "Four leather patches, embossed and debossed with brand marks",
      width: 1600,
      height: 753,
    },
    thumb: "/assets/bento/thumb/patches.webp",
    studio: [],
    tagline: "Leather and PU, embossed or debossed with your logo.",
    highlights: [
      {
        title: "Four ways to mark it.",
        body: "Embossing, debossing, printing and engraving, all done in-house.",
      },
      {
        title: "Leather or PU.",
        body: "Genuine leather for waistbands and bags, or water-resistant PU that holds its colour at volume.",
      },
      {
        title: "Made for denim and beyond.",
        body: "Jeans, hats, bags, outerwear and branded accessories.",
      },
    ],
  },
  plates: {
    cutout: {
      src: "/assets/bento/plates.webp",
      alt: "Four metal name plates and logo labels in silver, brass, gunmetal and rose gold",
      width: 1600,
      height: 836,
    },
    thumb: "/assets/bento/thumb/plates.webp",
    studio: [
      {
        src: "/assets/home/landing-badge.webp",
        alt: "A gold-finish metal plate with an embossed walking bull",
        width: 1200,
        height: 1200,
      },
      {
        src: "/assets/home/studio-plate.webp",
        alt: "A brushed brass plate engraved with a wolf crest",
        width: 640,
        height: 640,
      },
    ],
    tagline: "Name plates and logo labels in metal, for denim, bags and belts.",
    highlights: [
      {
        title: "Your artwork, in metal.",
        body: "We convert your logo artwork for the plate and send a prototype for your approval.",
      },
      {
        title: "Finished your way.",
        body: "Including silver, gold, antique brass, black and gunmetal.",
      },
      {
        title: "Sized for denim, bags and belts.",
        body: "Name plates and logo labels for jeans, leather bags, belts and accessories.",
      },
    ],
  },
  zippers: {
    cutout: {
      src: "/assets/bento/zippers.webp",
      alt: "An open-ended zipper with brass teeth on dark tape",
      width: 1600,
      height: 605,
    },
    thumb: "/assets/bento/thumb/zippers.webp",
    studio: [
      {
        src: "/assets/home/landing-zipper.webp",
        alt: "A nickel-finish metal zipper with a polished puller on black fabric",
        width: 1200,
        height: 1200,
      },
    ],
    tagline: "Metal teeth and custom pulls, for denim, bags and outerwear.",
    highlights: [
      {
        title: "Metal teeth, made for denim.",
        body: "Metal-tooth zippers for jeans, denim jackets, premium bags and outerwear.",
      },
      {
        title: "Your slider, your pull.",
        body: "Custom slider and pull designs that carry your brand.",
      },
      {
        title: "Ready for European retail.",
        body: "Inspected before export, with compliance documentation for European retail.",
      },
    ],
  },
};

/** Built-in taglines for subcategories, keyed by slug. */
export const SUBCATEGORY_TAGLINES: Record<string, string> = {
  "plastic-buttons": "Colour-matched to your fabric, for casual and sportswear lines.",
  "prong-buttons": "Metal snaps for denim and workwear, stamped with your logo.",
  "shank-buttons": "A raised shank that sits clear of thick coat and jacket fabric.",
  "leather-patches": "Embossed, debossed or printed, for waistbands, bags and hats.",
  "pu-patches": "Water-resistant, consistent in colour, and embossed at volume.",
  "metal-zippers": "Metal teeth and custom pulls for denim, bags and outerwear.",
};

/**
 * Catalog photos cleared to lead a type tile or a "Get to know" card. Most of
 * the catalog is client work carrying the client's own mark, and one product
 * shows the wrong object; those stay in the style grids only. Product slugs.
 */
export const LEAD_PHOTOS = new Set([
  "buckle-style-01",
  "buckle-style-02",
  "plastic-button-style-01",
  "plastic-button-style-02",
  "plastic-button-style-03",
  "prong-button-style-02",
  "leather-patch-style-03",
  "leather-patch-style-06",
]);
