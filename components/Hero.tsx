import React from "react";
import HeroSlideshow from "./HeroSlideshow";
import TrustIndicators from "./TrustIndicators";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <section className="relative w-full min-h-[90vh] lg:min-h-screen grid grid-cols-1 lg:grid-cols-2 lg:items-center bg-white overflow-hidden">
      {/* Left side: Text & CTAs */}
      <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-12 lg:py-0 z-10 w-full h-full order-2 lg:order-1">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1]">
            <span className="block">Sourcing the</span>
            <span className="block mt-2">
              world's <span className="text-primary">Finest</span>
            </span>
          </h1>
          <p className="text-lg text-slate-500 mt-6 lg:mt-8 max-w-xl leading-relaxed">
            Showcasing our commitment to quality textile manufacturing and
            innovative design solutions for global brands.
          </p>
          <div className="flex flex-row items-center gap-4 mt-10">
            <Button href="/products" size="lg">
              Explore Products
            </Button>
            <Button variant="outline" size="lg">
              Request a Quote
            </Button>
          </div>

          <TrustIndicators />
        </div>
      </div>

      <div className="w-full h-full min-h-[45vh] lg:min-h-[600px] relative rounded-2xl overflow-hidden shadow-2xl order-1 lg:order-2">
        <HeroSlideshow />
      </div>
    </section>
  );
};

export default Hero;
