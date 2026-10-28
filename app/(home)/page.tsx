import type { Metadata } from "next";
import HomeHero from "@/components/home/HomeHero";
import LogoRow from "@/components/home/LogoRow";
import Lineup from "@/components/home/Lineup";
import MadeToMark from "@/components/home/MadeToMark";
import ProcessBand from "@/components/home/ProcessBand";
import BuyerQuotes, { type BuyerQuote } from "@/components/home/BuyerQuotes";
import ClosingBand from "@/components/home/ClosingBand";
import ProductCarousel from "@/components/common/ProductCarousel";
import FAQSection from "@/components/FAQSection";
import BlogSection from "@/components/common/BlogSection";
import JsonLd from "@/components/common/JsonLd";
import { faqPageSchema } from "@/lib/structured-data";
import { fetchCatalogSampler } from "@/lib/api";
import { DEFAULT_FAQS } from "@/data/faqs";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const quotes: BuyerQuote[] = [
  {
    quote:
      "Metro turned our hardware from an afterthought into the thing customers email us about. They're the sourcing team I wish we'd started with.",
    author: "Founder, independent leather goods brand",
    place: "Brooklyn, NY",
  },
  {
    quote:
      "Consistent quality across every order, no matter the volume. We've been sourcing through Metro for three years and have never had to chase a timeline.",
    author: "Head of Procurement, premium bag label",
    place: "London, UK",
  },
  {
    quote:
      "What sets Metro apart is how they think about our product, not just the spec sheet. They flagged a finish issue before sampling even started.",
    author: "Creative Director, accessories brand",
    place: "Milan, IT",
  },
];

// The homepage shows the questions buyers ask before a first order; the
// FAQPage JSON-LD carries exactly the same set.
const HOME_FAQ_QUESTIONS = [
  "Do you offer custom, OEM and private-label accessories?",
  "What is Metro Metal's minimum order quantity (MOQ)?",
  "Do you provide samples before bulk production?",
  "What are your typical lead times?",
  "Which regions does Metro Metal supply, and on what terms?",
];
const homeFaqs = HOME_FAQ_QUESTIONS.map((q) => DEFAULT_FAQS.find((f) => f.question === q)).filter(
  (f): f is (typeof DEFAULT_FAQS)[number] => Boolean(f),
);

export default async function Home() {
  const { data: sampler } = await fetchCatalogSampler(2);

  return (
    <>
      <JsonLd data={faqPageSchema(homeFaqs)} />
      <HomeHero />
      <LogoRow />
      <Lineup />
      <MadeToMark />
      <ProcessBand />
      {sampler && sampler.length > 0 && (
        <ProductCarousel
          title="From the catalog."
          lede="Recent styles from every family. Ask for any of them in your finish and size."
          products={sampler}
          viewAllHref="/products"
        />
      )}
      <BuyerQuotes quotes={quotes} />
      <FAQSection items={homeFaqs} />
      <BlogSection className="bg-muted" />
      <ClosingBand />
    </>
  );
}
