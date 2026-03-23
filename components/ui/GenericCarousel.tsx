"use client"

import React, { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { EmblaOptionsType, EmblaPluginType, EmblaCarouselType } from "embla-carousel"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface GenericCarouselProps {
  children: React.ReactNode
  options?: EmblaOptionsType
  plugins?: EmblaPluginType[]
  className?: string
  containerClassName?: string
  slideClassName?: string
  showButtons?: boolean
  showDots?: boolean
  dragFree?: boolean
}

export function GenericCarousel({
  children,
  options,
  plugins,
  className,
  containerClassName,
  slideClassName,
  showButtons = false,
  showDots = false,
  dragFree = false,
}: GenericCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree, ...options }, plugins)
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on("reInit", () => {
      onSelect(emblaApi)
      setScrollSnaps(emblaApi.scrollSnapList())
    })
    emblaApi.on("select", onSelect)
  }, [emblaApi, onSelect])

  return (
    <div className="relative group space-y-4">
      <div className={cn("overflow-hidden -my-4 py-4", className)} ref={emblaRef}>
        <div className={cn("flex", containerClassName)}>
          {React.Children.map(children, (child, index) => (
            <div key={index} className={cn("flex-[0_0_100%] min-w-0 select-none", slideClassName)}>
              {child}
            </div>
          ))}
        </div>
      </div>

      {showButtons && (
        <>
          <button
            className={cn(
              "hidden md:flex absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg border border-slate-100 transition-all hover:bg-slate-50 disabled:opacity-0 disabled:pointer-events-none group-hover:opacity-100",
              !prevBtnEnabled && "opacity-0"
            )}
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 text-slate-700" />
          </button>
          <button
            className={cn(
              "hidden md:flex absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg border border-slate-100 transition-all hover:bg-slate-50 disabled:opacity-0 disabled:pointer-events-none group-hover:opacity-100",
              !nextBtnEnabled && "opacity-0"
            )}
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 text-slate-700" />
          </button>
        </>
      )}

      {showDots && scrollSnaps.length > 1 && (
        <div className="flex flex-wrap justify-center items-center gap-2 py-6">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === selectedIndex
                  ? "bg-indigo-600 w-6"
                  : "bg-slate-300 hover:bg-slate-400"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
