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
      {sourcingSteps.map((step, index) => {
        const Icon = step.icon;
        return (
          <div key={step.title} className="h-full px-2">
            <div className="relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              {/* Big ghosted step number fills the card behind the content */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-4 right-2 select-none text-[80px] font-bold leading-none tracking-tighter text-primary/10"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="relative flex flex-col gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-primary/30 bg-white text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-500">
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </EmblaCarouselWrapper>
  );
}
