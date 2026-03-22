import Hero from "@/components/Hero";
import CoreProducts from "@/components/CoreProducts";
import TrustedProducts from "@/components/TrustedProducts";
import OurClient from "@/components/OurClient";
import Cta from "@/components/Cta";
import BlogSection from "@/components/common/BlogSection";

export default function Home() {
  return (
    <>
      <Hero />
      <CoreProducts />
      <TrustedProducts />
      <OurClient />
      <BlogSection />
      <Cta />
    </>
  );
}
