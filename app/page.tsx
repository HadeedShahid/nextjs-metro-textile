import Hero from "@/components/Hero";
import CoreProducts from "@/components/CoreProducts";
import TrustedProducts from "@/components/TrustedProducts";
import OurClient from "@/components/OurClient";
import Cta from "@/components/Cta";
import BlogSection from "@/components/common/BlogSection";
import Clients from "@/components/clients";
import CategoryShowcase from "@/components/CategoryShowcase";
import ParentCategoryShowcase from "@/components/ParentCategoryShowcase";
import SourcingProcess from "@/components/SourcingProcess";

export default function Home() {
  return (
    <>
      <Hero />
      <Clients />
      <CoreProducts />
      <TrustedProducts />
      <ParentCategoryShowcase />
      <SourcingProcess />
      {/* <OurClient /> */}
      <BlogSection />
      <Cta />
    </>
  );
}
