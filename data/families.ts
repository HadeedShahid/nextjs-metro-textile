/**
 * Built-in art and copy for the product families, keyed by category slug.
 * Sanity's tagline wins wherever it is set.
 */

export type StudioImage = { src: string; alt: string; width: number; height: number };

export type FamilyDefaults = {
  /** Transparent studio cut-out, shown in place of a product's placeholder photo. */
  cutout: StudioImage;
  /** One line under the family's name on its products page. */
  tagline: string;
};

export const FAMILY_DEFAULTS: Record<string, FamilyDefaults> = {
  buckles: {
    cutout: {
      src: "/assets/bento/buckles.webp",
      alt: "Five belt buckles in nickel, antique brass, gunmetal and rose-gold finishes",
      width: 1600,
      height: 604,
    },
    tagline: "Engineered to your spec, plated in the finish you choose.",
  },
  buttons: {
    cutout: {
      src: "/assets/bento/buttons.webp",
      alt: "Six buttons in polished nickel, gunmetal, antique brass, black and rose-gold finishes",
      width: 1600,
      height: 653,
    },
    tagline: "Plastic, prong and shank, branded to your mark.",
  },
  patches: {
    cutout: {
      src: "/assets/bento/patches.webp",
      alt: "Four leather patches, embossed and debossed with brand marks",
      width: 1600,
      height: 753,
    },
    tagline: "Leather and PU, embossed or debossed with your logo.",
  },
  plates: {
    cutout: {
      src: "/assets/bento/plates.webp",
      alt: "Four metal name plates and logo labels in silver, brass, gunmetal and rose gold",
      width: 1600,
      height: 836,
    },
    tagline: "Name plates and logo labels in metal, for denim, bags and belts.",
  },
  zippers: {
    cutout: {
      src: "/assets/bento/zippers.webp",
      alt: "An open-ended zipper with brass teeth on dark tape",
      width: 1600,
      height: 605,
    },
    tagline: "Metal teeth and custom pulls, for denim, bags and outerwear.",
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
 * Catalogue photos cleared to show on the home page: one or two distinct styles
 * per family, none carrying a client's mark. Most of the catalogue is client
 * work with the client's own mark (Burberry, Woodland, Kaporal and others, on
 * nearly every plate), and the shank buttons show belts; those stay in the
 * catalogue only. The zipper's photo is a placeholder, so its card shows the
 * studio cut-out. Product slugs, in the order the home page shows them.
 */
export const SHOWCASE_PHOTOS = [
  "buckle-style-01",
  "buckle-style-07",
  "plastic-button-style-01",
  "prong-button-style-02",
  "leather-patch-style-03",
  "black-zipper",
];
