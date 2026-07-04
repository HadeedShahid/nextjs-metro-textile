import Hero from "@/components/Hero";
import TrustedProducts from "@/components/TrustedProducts";
import ComplianceSection from "@/components/ComplianceSection";
import Cta from "@/components/Cta";
import QuoteCta from "@/components/QuoteCta";
import BlogSection from "@/components/common/BlogSection";
import ParentCategoryShowcase from "@/components/ParentCategoryShowcase";
import SourcingProcess from "@/components/SourcingProcess";
import VideoSection from "@/components/VideoSection";
import CompaniesTrust from "@/components/common/CompaniesTrust";
import ContactSection from "@/components/ContactSection";
import ActionCTA from "@/components/ActionCTA";
import Clients from "@/components/clients";
import FAQSection from "@/components/FAQSection";
import GlobalPresence from "@/components/GlobalPresence";
import TestimonialsCarousel, { type Testimonial } from "@/components/TestimonialsCarousel";
import type { Metadata } from "next";
import JsonLd from "@/components/common/JsonLd";
import { faqPageSchema } from "@/lib/structured-data";
import { DEFAULT_FAQS } from "@/data/faqs";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const testimonials: Testimonial[] = [
  {
    quote: "Metro turned our hardware from an afterthought into the thing customers email us about. They're the sourcing team I wish we'd started with.",
    author: "Founder, independent leather goods brand",
    role: "Brooklyn, NY",
  },
  {
    quote: "Consistent quality across every order, no matter the volume. We've been sourcing through Metro for three years and have never had to chase a timeline.",
    author: "Head of Procurement, premium bag label",
    role: "London, UK",
  },
  {
    quote: "What sets Metro apart is how they think about our product, not just the spec sheet. They flagged a finish issue before sampling even started. That's a real partner.",
    author: "Creative Director, accessories brand",
    role: "Milan, IT",
  },
];

export default function Home() {
  return (
    <>
      <JsonLd data={faqPageSchema(DEFAULT_FAQS)} />
      <Hero />
      {/* <VideoSection /> */}
      <Clients />
      <TrustedProducts />
      <ComplianceSection />
      <ParentCategoryShowcase />
      <SourcingProcess />
      <GlobalPresence />
      <ActionCTA />
      <TestimonialsCarousel testimonials={testimonials} />
      <ContactSection />
      <FAQSection />
      <BlogSection />
      {/* <QuoteCta /> */}
      <Cta />
    </>
  );
}
