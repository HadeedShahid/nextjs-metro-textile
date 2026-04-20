import React from "react";
import Image from "next/image";
import EmblaCarouselWrapper from "./emblaCarousel/EmblaCarouselWrapper";

const slideshowImages = [
  {
    src: "/assets/landing-zipper.jpg",
    alt: "Premium Zipper Detail",
  },
  {
    src: "/assets/landing-button.jpg",
    alt: "Metallic Button Showcase",
  },
  {
    src: "/assets/landing-buckle.jpg",
    alt: "Brushed Metal Buckle",
  },
  {
    src: "/assets/landing-badge.jpg",
    alt: "Embossed Logo Badge",
  },
];

const HeroSlideshow = () => {
  return (
    <div className="w-full mt-10">
      <EmblaCarouselWrapper
        options={{ loop: true, align: "center", containScroll: "trimSnaps" }}
        className="rounded-[32px] overflow-hidden"
        slideClassName="basis-full md:basis-[80%] lg:basis-[70%] px-2"
      >
        {slideshowImages.map((image, idx) => (
          <div
            key={idx}
            className="relative aspect-[21/9] w-full rounded-[24px] overflow-hidden bg-slate-100"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              priority={idx === 0}
            />
            {/* Subtle Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>
        ))}
      </EmblaCarouselWrapper>
    </div>
  );
};

export default HeroSlideshow;
