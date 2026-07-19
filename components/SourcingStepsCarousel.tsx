"use client";

import React from "react";
import Autoplay from "embla-carousel-autoplay";
import EmblaCarouselWrapper from "./emblaCarousel/EmblaCarouselWrapper";
import { sourcingSteps } from "./sourcingSteps";

/**
 * Mobile-only view of the sourcing steps — one auto-advancing slide instead of
 * a tall vertical stack, so the section stays compact and the CTA sits higher.
 * The desktop horizontal path lives in the (server-rendered) SourcingProcess.
 */
export default function SourcingStepsCarousel() {
  // Memoized so the plugin instance stays stable and Embla doesn't re-init.
  const plugins = React.useMemo(
    () => [Autoplay({ delay: 3500, stopOnInteraction: false })],
    [],
  );

  return (
    <EmblaCarouselWrapper
      options={{ loop: true, align: "center" }}
      plugins={plugins}
      slideClassName="basis-full"
      showArrows={false}
      alwaysShowDots
    >
      {sourcingSteps.map((step) => {
        const Icon = step.icon;
        return (
          <div
            key={step.title}
            className="flex flex-col items-center px-6 py-2 text-center"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-primary/30 bg-white text-primary">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="text-base font-semibold text-slate-900">
              {step.title}
            </h3>
            <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-slate-500">
              {step.description}
            </p>
          </div>
        );
      })}
    </EmblaCarouselWrapper>
  );
}
