/**
 * Per-category SEO content for the /products/[[...slug]] listing pages.
 * Keyed by the LEAF category slug ("all" = the /products index).
 *
 * Titles ≤60 chars (the " | Metro Metal" suffix is added by the title
 * template in the layout, so titles here omit the brand). Descriptions ≤155.
 * Intro copy is unique per page (no template-swapping) and contains NO
 * invented product specs — only safe, generic positioning.
 */
export type CategorySeo = {
  /** Title WITHOUT the " | Metro Metal" suffix (added by the template). */
  title: string;
  description: string;
  h1: string;
  intro: string;
};

const CATEGORY_SEO: Record<string, CategorySeo> = {
  all: {
    title: "Garment Accessories Manufacturer & Supplier",
    description:
      "Metro Metal manufactures buckles, buttons, patches, plates & zippers for global fashion brands. ISO & OEKO-TEX certified. Request a quote.",
    h1: "Garment & Leather-Goods Accessories Manufacturer",
    intro:
      "Metro Metal designs and manufactures the full range of garment and leather goods accessories — buckles, buttons, patches, plates and zippers — through an integrated network across Pakistan, China and Hong Kong. With 20+ years supplying global apparel and leather brands, we pair precision manufacturing with commercial scale, ISO-certified quality and OEKO-TEX compliance. Browse by category below or request a quote from any product page.",
  },
  buckles: {
    title: "Buckles Manufacturer & Wholesale Supplier",
    description:
      "Custom metal buckles for garments, bags and belts, made in bulk to spec. ISO & OEKO-TEX certified. Trusted by global fashion brands. Get a quote.",
    h1: "Buckles Manufacturer for Garments & Leather Goods",
    intro:
      "Metro Metal manufactures metal buckles for garment, belt, bag and leather goods applications — custom-engineered to your specification and produced at bulk scale for fashion brands and OEM manufacturers worldwide. We finish buckles to match your brand's identity across a range of platings and coatings, with manufacturing oversight across Pakistan and China and direct export to Europe and North America. If you need hardware that pairs aesthetic precision with production reliability, our team handles both sampling and the full run.",
  },
  buttons: {
    title: "Garment Buttons Manufacturer & Bulk Supplier",
    description:
      "Metro Metal manufactures garment buttons — plastic, prong & shank — for wholesale buyers. Custom finishes and bulk OEM orders. Request a quote.",
    h1: "Buttons Manufacturer — Plastic, Prong & Shank",
    intro:
      "Metro Metal manufactures the core button types used across modern apparel — plastic buttons for lightweight applications, prong snap buttons for denim and casualwear, and shank buttons for outerwear and structured garments — all available with custom branding, private-label stamping and bulk wholesale supply. Backed by ISO-certified quality and supply relationships with leading European fashion labels, we handle button orders from first sample through full production. Explore a specific button type below or contact us for a cross-category quote.",
  },
  patches: {
    title: "Custom Patches Manufacturer & Supplier",
    description:
      "Leather & PU patches in bulk for jeans, bags & outerwear. Custom embossing, debossing & logo branding. OEKO-TEX certified. Request a quote.",
    h1: "Custom Patches Manufacturer — Leather & PU",
    intro:
      "Metro Metal produces leather and PU patches for jeans, hats, bags, outerwear and branded accessories, with in-house capability for embossing, debossing, printing and engraving. Our patches act as functional brand identifiers for labels that need consistent logo reproduction across high-volume runs, and both materials are produced to OEKO-TEX standards for brands operating under EU retail requirements. Choose a material below or request samples of both to compare finish quality before committing to a run.",
  },
  plates: {
    title: "Metal Plates & Labels Manufacturer",
    description:
      "Custom metal plates & logo labels for clothing and leather goods. Bulk B2B supply with premium finishes. Get a quote from Metro Metal.",
    h1: "Metal Plates & Logo Labels Manufacturer",
    intro:
      "Metro Metal manufactures custom metal plates, name plates and logo labels for jeans, leather bags, belts and branded accessories, where a premium metal identifier is part of the product. We work directly with brand managers and sourcing teams on artwork conversion, prototype approval and mass production — no retail minimums, no catalogue-pricing constraints. Request a sample or discuss your volume requirements with our team.",
  },
  zippers: {
    title: "Zipper Manufacturer & Wholesale Supplier",
    description:
      "Wholesale metal zippers for garments, bags & footwear — custom pulls & private-label branding. ISO & OEKO-TEX certified. Request a quote.",
    h1: "Zipper Manufacturer & Wholesale Supplier",
    intro:
      "Metro Metal supplies wholesale zippers for garment, bag and footwear applications, with current production focused on durable metal-tooth zippers preferred by denim labels, premium outerwear brands and leather goods makers. As a vertically integrated partner with factory relationships across China and Pakistan, we source, inspect and export zippers to ISO and OEKO-TEX criteria, with documented compliance for European retail. Explore our metal zippers below or contact us with a specification brief.",
  },
  "plastic-buttons": {
    title: "Plastic Buttons Manufacturer & Wholesale",
    description:
      "Bulk plastic buttons for apparel — lightweight, with custom colours & finishes. B2B wholesale manufacturer. Request a quote from Metro Metal.",
    h1: "Plastic Buttons Manufacturer — Custom Colours & Finishes",
    intro:
      "Metro Metal manufactures plastic buttons for casualwear, sportswear and cost-optimised garment lines, available in a range of configurations with custom colour-matching and surface finishes. Production runs at commercial volumes with flexible minimums, suitable for seasonal collections and private-label projects.",
  },
  "prong-buttons": {
    title: "Prong Buttons Manufacturer & Wholesale",
    description:
      "Metal prong snap buttons for jeans & denim in bulk. Custom branding & finishes. Trusted by European fashion brands. Request a quote.",
    h1: "Prong Buttons Manufacturer — Snap Buttons for Denim",
    intro:
      "Metro Metal supplies metal prong snap buttons engineered for denim, jeans and workwear, where mechanical strength and decorative branding meet on a single fastener. Custom logo stamping and a range of finishes make our prong buttons a direct fit for brands that need branded hardware at the waistband.",
  },
  "shank-buttons": {
    title: "Shank Buttons Manufacturer & Wholesale",
    description:
      "Custom shank buttons for coats, jackets & formalwear — bulk B2B supply in multiple finishes. ISO-certified manufacturer. Request a quote.",
    h1: "Shank Buttons Manufacturer — Coats, Jackets & Formalwear",
    intro:
      "Metro Metal manufactures shank buttons for outerwear, suiting and structured garments, where a thread shank provides clearance over thick fabric layers. Custom moulding and logo engraving are available across materials, with bulk wholesale supply for fashion brands and private-label producers.",
  },
  "leather-patches": {
    title: "Leather Patches Manufacturer & Wholesale",
    description:
      "Genuine leather patches for jeans, bags & hats — custom embossed, debossed or printed logos. Bulk supply, OEKO-TEX certified. Request a quote.",
    h1: "Leather Patches Manufacturer — Embossed & Debossed",
    intro:
      "Metro Metal produces leather patches with custom embossed, debossed or printed branding for jeans waistbands, leather bags, hats and premium outerwear, where authentic texture is part of the brand story. OEKO-TEX compliant materials are available for brands with traceability requirements.",
  },
  "pu-patches": {
    title: "PU Patches Manufacturer & Bulk Supplier",
    description:
      "Custom PU leather patches for jeans & bags — a durable, eco-conscious alternative to genuine leather. Bulk B2B supply. Request a quote.",
    h1: "PU Patches Manufacturer — Custom PU Leather Patches",
    intro:
      "Metro Metal manufactures PU leather patches as a durable, water-resistant and ethically positioned alternative to genuine leather, delivering consistent colour and emboss fidelity at volume. Custom embossing, debossing and printing make them a practical choice for brands balancing aesthetics, compliance and cost.",
  },
  "metal-zippers": {
    title: "Metal Zippers Manufacturer & Wholesale",
    description:
      "Metal zippers for jeans, bags & outerwear — custom pulls & finishes, bulk wholesale. ISO & OEKO-TEX certified factory. Request a quote.",
    h1: "Metal Zipper Manufacturer — Wholesale Metal Zippers",
    intro:
      "Metro Metal manufactures metal-tooth zippers for jeans, denim jackets, premium bags and technical outerwear, with custom slider and pull designs. Our metal zippers are produced to ISO standards and OEKO-TEX certified — a compliant, premium choice for brands sourcing for European and North American retail.",
  },
};

/** Resolve the SEO entry for a /products[/...slug] path. Falls back to a
 *  generic entry derived from the leaf slug for any category not mapped. */
export function getCategorySeo(slugArray?: string[]): CategorySeo {
  const leaf = slugArray && slugArray.length ? slugArray[slugArray.length - 1] : "all";
  if (CATEGORY_SEO[leaf]) return CATEGORY_SEO[leaf];

  // Generic fallback for an unmapped category slug.
  const pretty = leaf
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return {
    title: `${pretty} Manufacturer & Supplier`,
    description: `Metro Metal manufactures and supplies ${pretty.toLowerCase()} for global apparel and leather goods brands. Bulk B2B supply. Request a quote.`,
    h1: `${pretty} Manufacturer & Supplier`,
    intro: `Metro Metal manufactures and supplies ${pretty.toLowerCase()} for apparel and leather goods brands worldwide, with bulk B2B production, custom options and certified quality. Contact us for samples and a quote.`,
  };
}
