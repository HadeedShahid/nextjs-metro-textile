"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RailProps {
  /** Accessible name for the scrolling list. */
  label: string;
  children: React.ReactNode;
  className?: string;
  /** Classes for each tile wrapper, e.g. its width. */
  itemClassName?: string;
  /** Dark band variant for the controls. */
  tone?: "light" | "die";
}

/**
 * A horizontal rail that snaps to its tiles and never rests between them.
 * Native scroll-snap does the work, so touch, trackpad and arrow keys all
 * behave; the buttons step one tile at a time and disable at either end.
 */
export default function Rail({
  label,
  children,
  className,
  itemClassName,
  tone = "light",
}: RailProps) {
  const listRef = React.useRef<HTMLUListElement>(null);
  const [edges, setEdges] = React.useState({ start: true, end: false });

  const measure = React.useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    setEdges({
      start: el.scrollLeft <= 2,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2,
    });
  }, []);

  React.useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    measure();
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [measure]);

  const step = (direction: 1 | -1) => {
    const el = listRef.current;
    const tile = el?.firstElementChild as HTMLElement | null;
    if (!el || !tile) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: direction * (tile.offsetWidth + gap), behavior: reduce ? "auto" : "smooth" });
  };

  const controlClass =
    tone === "die"
      ? "bg-white/12 text-die-foreground hover:bg-white/20"
      : "bg-muted text-foreground hover:bg-[#e8e8ed]";

  const showControls = !(edges.start && edges.end);

  return (
    <div className={className}>
      <ul ref={listRef} aria-label={label} className="snap-rail gap-4 pb-1 md:gap-5">
        {React.Children.map(children, (child) =>
          child ? <li className={itemClassName}>{child}</li> : null,
        )}
      </ul>

      <div className={cn("container-x mt-6 flex justify-end gap-3", !showControls && "invisible")}>
        <Button
          variant="ghost"
          size="icon"
          className={cn("size-11", controlClass)}
          aria-label="Previous"
          disabled={edges.start}
          onClick={() => step(-1)}
        >
          <ChevronLeft className="size-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={cn("size-11", controlClass)}
          aria-label="Next"
          disabled={edges.end}
          onClick={() => step(1)}
        >
          <ChevronRight className="size-5" />
        </Button>
      </div>
    </div>
  );
}
