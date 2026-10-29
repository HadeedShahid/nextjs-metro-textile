// Buyer-intent FAQs for a B2B garment-accessories manufacturer.
// Written in third person ("Metro Metal …") for AI answer-engine citation.
// MOQ, lead-time and Incoterm figures are unconfirmed, so the answers point
// buyers to the team instead of quoting numbers. No invented numbers, no named
// third-party inspectors (legal risk) until confirmed.
export const DEFAULT_FAQS = [
  {
    question: "What products does Metro Metal manufacture?",
    answer:
      "Metro Metal manufactures and sources garment and leather goods accessories including zippers, buttons (plastic, prong and shank), buckles, leather and PU patches, and metal plates, for apparel brands, garment manufacturers, and leather goods makers worldwide.",
  },
  {
    question: "What is Metro Metal's minimum order quantity (MOQ)?",
    answer:
      "MOQs are flexible and depend on the product type and level of customization. Standard catalogue items carry lower minimums than fully custom, tooled hardware. Contact us with your requirements for an exact figure.",
  },
  {
    question: "What are your typical lead times?",
    answer:
      "After you approve a pre-production sample, bulk production time depends on order size and customization. Shipping transit is additional and varies by destination and Incoterm. Share your seasonal calendar and we'll confirm a schedule.",
  },
  {
    question: "Do you offer custom, OEM and private-label accessories?",
    answer:
      "Yes. Metro Metal produces hardware to your artwork, tech pack, or reference sample, with options including logo embossing, debossing and engraving, custom finishes and platings, and bespoke colourways. Our technical team advises on feasibility before sampling begins.",
  },
  {
    question: "What certifications does Metro Metal hold?",
    answer:
      "Metro Metal's manufacturing is quality-certified (ISO quality management) and OEKO-TEX compliant, with accessories tested against OEKO-TEX criteria for harmful substances. Certification documentation is available on request for your compliance team.",
  },
  {
    question: "Do you provide samples before bulk production?",
    answer:
      "Yes. We produce a pre-production sample against your specification for approval, followed by a sealed production sample that is signed off before bulk manufacturing begins, so the final goods match exactly what you approved.",
  },
  {
    question: "Which regions does Metro Metal supply, and on what terms?",
    answer:
      "Metro Metal exports worldwide, with significant volume to Europe, and a manufacturing and sourcing network across Pakistan, China and Hong Kong. Contact us to confirm the shipping terms for your destination.",
  },
  {
    question: "How does Metro Metal manage quality control?",
    answer:
      "Quality is checked at multiple stages: incoming material inspection, in-process checks against approved sealed samples, and a pre-shipment inspection before goods are packed. Buyers are welcome to arrange their own third-party inspections and factory audits.",
  },
];

export type Faq = (typeof DEFAULT_FAQS)[number];

/** The FAQs with these exact questions, in the order given; a renamed question is simply skipped. */
export const pickFaqs = (questions: string[]): Faq[] =>
  questions.map((q) => DEFAULT_FAQS.find((f) => f.question === q)).filter((f): f is Faq => Boolean(f));
