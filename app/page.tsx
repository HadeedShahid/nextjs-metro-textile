import Hero from "@/components/Hero";
import TrustedProducts from "@/components/TrustedProducts";
import ComplianceSection from "@/components/ComplianceSection";
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
import GlobalPresence from "@/components/GlobalPresence";

export default function Home() {
  return (
    <>
      <Hero />
      {/* <VideoSection /> */}
      <Clients />
      <TrustedProducts />
      <ComplianceSection />
      <ParentCategoryShowcase />
      <SourcingProcess />
      <ActionCTA />
      <GlobalPresence />
      <ContactSection />
      <FAQSection />
      <BlogSection />
      <Cta />
    </>
  );
}
