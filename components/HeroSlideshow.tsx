"use client";

import React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  DotButton,
  useDotButton,
} from "./emblaCarousel/emblaCarouselDotButton";
import { cn } from "@/lib/utils";

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
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      containScroll: "trimSnaps",
    },
    [Autoplay({ delay: 2500, stopOnInteraction: true })],
  );

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <div className="relative h-full w-full">
      <div className="overflow-hidden h-full w-full" ref={emblaRef}>
        <div className="flex h-full touch-pan-y touch-pinch-zoom">
          {slideshowImages.map((image, idx) => (
            <div
              key={idx}
              className="relative flex-[0_0_100%] min-w-0 h-full bg-slate-200"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                priority={idx === 0}
                sizes="(max-width: 1024px) 100vw, 50vw" // Optimized layout
              />
              {/* Subtle overall darkening for contrast */}
              <div className="absolute inset-0 bg-black/5 pointer-events-none" />
              {/* Darker gradient at the bottom specifically to make dots pop */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Floating Dots on top of image */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center z-10">
        <div className="flex flex-wrap justify-center items-center gap-3">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300 drop-shadow-md",
                index === selectedIndex
                  ? "bg-white w-6"
                  : "bg-white/60 w-1.5 hover:bg-white",
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSlideshow;
