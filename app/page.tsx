import CoreProducts from "@/components/CoreProducts";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import OurClient from "@/components/OurClient";
import TrustedProducts from "@/components/TrustedProducts";

export default function Home() {
  return (
    <>
      <Hero />
      <CoreProducts />
      <TrustedProducts />
      <OurClient />
      <Cta />
    </>
  );
}
