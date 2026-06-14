import React from "react";
import AnnouncementBadge from "./common/AnnouncementBadge";
import HeroSlideshow from "./HeroSlideshow";
import TrustIndicators from "./TrustIndicators";
import { Button } from "./ui/button";
import { QuoteModalButton } from "./QuoteModal";

const Hero = () => {
  return (
    <section className="relative w-full grid grid-cols-1 lg:grid-cols-2 lg:items-center bg-white overflow-hidden pt-2 pb-10 lg:py-0">
      {/* Left side: Text & CTAs */}
      <div className="flex flex-col justify-center items-start h-full z-10 w-full order-2 lg:order-1 px-2 md:px-0">
        <div className="max-w-2xl">
          <AnnouncementBadge message="Fireproof Zippers" href="/products" />
          <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1]">
            <span className="block">Garment Accessories</span>
            <span className="block mt-2">
              Manufacturer &amp; <span className="text-primary">Sourcing</span>{" "}
              Partner
            </span>
          </h1>
          <p className="text-base text-slate-500 mt-6 lg:mt-8 max-w-xl leading-relaxed">
            Metro Metal manufactures and sources zippers, buttons, buckles,
            patches and plates for global apparel and leather goods brands,
            backed by 20+ years of experience, ISO-certified quality and
            OEKO-TEX compliance.
          </p>
          <div className="flex flex-row items-center gap-4 mt-10">
            <Button href="/products" size="lg">
              Explore Products
            </Button>
            <QuoteModalButton
              variant="outline"
              size="lg"
              text="Request a Quote"
            />
          </div>

          <TrustIndicators />
        </div>
      </div>

      <div className="w-full h-[40vh] lg:h-[600px] relative rounded-2xl overflow-hidden shadow-2xl order-1 lg:order-2 mb-8 lg:mb-0">
        <HeroSlideshow />
      </div>
    </section>
  );
};

export default Hero;
