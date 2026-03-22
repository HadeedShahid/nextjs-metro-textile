import Hero from "@/components/Hero";
import CoreProducts from "@/components/CoreProducts";
import TrustedProducts from "@/components/TrustedProducts";
import OurClient from "@/components/OurClient";
import Cta from "@/components/Cta";
import BlogSection from "@/components/common/BlogSection";
import Clients from "@/components/clients";

export default function Home() {
  return (
    <>
      <Hero />
      <Clients />
      <CoreProducts />
      <TrustedProducts />
      {/* <OurClient /> */}
      <BlogSection />
      <Cta />
    </>
  );
}
