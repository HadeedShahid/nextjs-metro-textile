"use client";

import React, { useMemo } from "react";
import Autoplay from "embla-carousel-autoplay";
import EmblaCarouselWrapper from "./emblaCarousel/EmblaCarouselWrapper";

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

type Props = {
  testimonials: Testimonial[];
  eyebrow?: string;
  autoplayDelay?: number;
};

const TestimonialsCarousel = ({
  testimonials,
  eyebrow = "In their words",
  autoplayDelay = 5000,
}: Props) => {
  const plugins = useMemo(
    () => [Autoplay({ delay: autoplayDelay, stopOnInteraction: true })],
    [autoplayDelay],
  );

  if (!testimonials.length) return null;

  return (
    <section className="breakout bg-foreground text-background py-24 lg:py-32">
      <div className="main-container">
        <p className="eyebrow text-background/60">{eyebrow}</p>

        <div className="mt-6">
          <EmblaCarouselWrapper
            options={{ loop: true }}
            plugins={plugins}
            showArrows={false}
            alwaysShowDots
            dotActiveClassName="bg-background w-6"
            dotClassName="bg-background/30 hover:bg-background/60"
          >
            {testimonials.map((t, i) => (
              <div key={i}>
                <blockquote className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight text-balance">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <p className="mt-8 text-sm text-background/70">
                  {t.author} · {t.role}
                </p>
              </div>
            ))}
          </EmblaCarouselWrapper>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
