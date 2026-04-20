import Image from "next/image";
import React from "react";
import Link from "next/link";
import Section from "./base/Section";
import HeroSlideshow from "./HeroSlideshow";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <Section className="text-center items-center gap-10 py-10">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-6xl font-bold text-slate-900 max-w-4xl">
          Sourcing the world's finest
        </h1>
        <p className="text-lg md:text-xl text-slate-500 max-w-2xl">
          Showcasing our commitment to quality textile manufacturing and
          innovative design solutions for global brands.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Button href="/products" size={"lg"}>
          Explore Products
        </Button>
        <Button variant="outline" size={"lg"}>
          Request a Quote
        </Button>
      </div>

      <HeroSlideshow />
    </Section>
  );
};

export default Hero;
