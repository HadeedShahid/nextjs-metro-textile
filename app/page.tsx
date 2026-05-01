import Hero from "@/components/Hero";
import TrustedProducts from "@/components/TrustedProducts";
import Cta from "@/components/Cta";
import BlogSection from "@/components/common/BlogSection";
import ParentCategoryShowcase from "@/components/ParentCategoryShowcase";
import SourcingProcess from "@/components/SourcingProcess";
import VideoSection from "@/components/VideoSection";
import CompaniesTrust from "@/components/common/CompaniesTrust";
import ContactSection from "@/components/ContactSection";
import ActionCTA from "@/components/ActionCTA";
import Clients from "@/components/clients";
import FAQSection from "@/components/FAQSection";

export default function Home() {
  return (
    <>
      <Hero />
      {/* <VideoSection /> */}
      <Clients />
      <TrustedProducts />
      <ParentCategoryShowcase />
      <SourcingProcess />
      <ActionCTA />
      <ContactSection />
      <FAQSection />
      <BlogSection />
      <Cta />
    </>
  );
}
