import Hero from "@/components/Hero";
import CoreProducts from "@/components/CoreProducts";
import TrustedProducts from "@/components/TrustedProducts";
import OurClient from "@/components/OurClient";
import Cta from "@/components/Cta";
import BlogSection from "@/components/common/BlogSection";
import CategoryShowcase from "@/components/CategoryShowcase";
import ParentCategoryShowcase from "@/components/ParentCategoryShowcase";
import SourcingProcess from "@/components/SourcingProcess";
import VideoSection from "@/components/VideoSection";
import CompaniesTrust from "@/components/common/CompaniesTrust";
import Clients from "@/components/clients";

export default function Home() {
  return (
    <>
      <Hero />
      <Clients />
      <VideoSection />
      <CompaniesTrust />
      {/* <Clients /> */}
      {/* <CoreProducts /> */}
      <TrustedProducts />
      <ParentCategoryShowcase />
      <SourcingProcess />
      {/* <OurClient /> */}
      <BlogSection />
      <Cta />
    </>
  );
}
