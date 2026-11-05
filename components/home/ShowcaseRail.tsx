"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * A row of cards that scrolls sideways, under a one-line header: the heading
 * on the left, then "View all" and, from 768px, the back and forward arrows on
 * the right. Phones swipe. About three and a half cards show on desktop, so
 * the cut-off card says there is more. An arrow greys out at its end of the row.
 */
export default function ShowcaseRail({
  label,
  heading,
  viewAll,
  children,
}: {
  label: string;
  heading: React.ReactNode;
  viewAll: React.ReactNode;
  children: React.ReactNode[];
}) {
  const track = React.useRef<HTMLUListElement>(null);
  const [edges, setEdges] = React.useState({ start: true, end: true });

  const update = React.useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  }, []);

  React.useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const page = (direction: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        {heading}
        <div className="flex shrink-0 items-center gap-2">
          {viewAll}
          <Button
            variant="outline"
            size="icon"
            aria-label={`Previous ${label.toLowerCase()}`}
            disabled={edges.start}
            onClick={() => page(-1)}
            className="hidden md:inline-flex"
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            aria-label={`Next ${label.toLowerCase()}`}
            disabled={edges.end}
            onClick={() => page(1)}
            className="hidden md:inline-flex"
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
      <ul
        ref={track}
        onScroll={update}
        className="mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 [scrollbar-width:none] sm:gap-4 md:gap-6 [&::-webkit-scrollbar]:hidden"
      >
        {React.Children.map(children, (child) => (
          <li className="shrink-0 basis-[70%] snap-start sm:basis-[42%] md:basis-[calc((100%-3rem)/2.5)] lg:basis-[calc((100%-4.5rem)/3.5)]">
            {child}
          </li>
        ))}
      </ul>
    </>
  );
}
