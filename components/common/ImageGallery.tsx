"use client"

import React, { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { urlFor } from "@/sanity/image"

export default function ImageGallery({ images = [] }: { images: any[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    startIndex: selectedIndex,
  })
  
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  })

  const openGallery = (index: number) => {
    setSelectedIndex(index)
    setIsOpen(true)
  }

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  )
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  )

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaApi || !emblaThumbsApi) return
      emblaApi.scrollTo(index)
    },
    [emblaApi, emblaThumbsApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaApi || !emblaThumbsApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaThumbsApi.scrollTo(emblaApi.selectedScrollSnap())
  }, [emblaApi, emblaThumbsApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
  }, [emblaApi, onSelect])

  useEffect(() => {
    if (emblaApi && isOpen) {
      emblaApi.scrollTo(selectedIndex)
    }
  }, [emblaApi, isOpen, selectedIndex])

  const getImageUrl = (image: any) => {
    try {
      if (image) return urlFor(image).url()
    } catch (error) {
      console.error("[ImageGallery] Error generating image URL:", error)
    }
    return "/sample.jpg"
  }

  if (!images?.length) return null

  return (
    <div className="mb-12">
      <div className="w-full">
        {/* CSS Grid Layout - Strictly following Original UI */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] md:grid-rows-2 gap-4 h-[400px] md:h-[500px]">
          {/* Main Image */}
          <div
            className="relative md:row-span-2 rounded-lg overflow-hidden cursor-pointer group border border-slate-200"
            onClick={() => openGallery(0)}
          >
            <Image
              src={getImageUrl(images[0])}
              alt="Product gallery 1"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105 group-hover:brightness-90"
              sizes="(max-width: 768px) 100vw, 66vw"
              priority
            />
          </div>

          {/* Top Right */}
          {images.length > 1 && (
            <div
              className="hidden md:block relative rounded-lg overflow-hidden cursor-pointer group border border-slate-200"
              onClick={() => openGallery(1)}
            >
              <Image
                src={getImageUrl(images[1])}
                alt="Product gallery 2"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105 group-hover:brightness-90"
                sizes="33vw"
              />
            </div>
          )}

          {/* Bottom Right */}
          {images.length > 2 && (
            <div
              className="hidden md:block relative rounded-lg overflow-hidden cursor-pointer group border border-slate-200"
              onClick={() => openGallery(2)}
            >
              <Image
                src={getImageUrl(images[2])}
                alt="Product gallery 3"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105 group-hover:brightness-90"
                sizes="33vw"
              />
              {images.length > 3 && (
                <div className="absolute bottom-4 right-4 bg-black/80 text-white px-3 py-1.5 rounded-md text-sm font-medium border border-white/20">
                  +{images.length - 3} more
                </div>
              )}
            </div>
          )}
        </div>

        {/* Thumbnail Strip - Mobile */}
        <div className="mt-4 block md:hidden">
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => openGallery(index)}
                className="relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden hover:opacity-80 transition-opacity border border-slate-200"
              >
                <Image
                  src={getImageUrl(image)}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Full Gallery Modal */}
        {isOpen && (
          <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex flex-col text-white">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-50 p-2 rounded-md border border-white/20 bg-black/80 hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Main Carousel */}
            <div className="flex-1 flex items-center justify-center p-4 relative">
              <div
                className="w-full max-w-5xl overflow-hidden rounded-lg"
                ref={emblaRef}
              >
                <div className="flex">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="flex-[0_0_100%] min-w-0 px-2"
                    >
                      <div className="relative w-full h-[50vh] md:h-[70vh]">
                        <Image
                          src={getImageUrl(image)}
                          alt={`Gallery image ${index + 1}`}
                          fill
                          className="object-contain rounded-lg"
                          sizes="100vw"
                          priority
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={scrollPrev}
                className="absolute left-2 md:left-4 p-2 md:p-3 rounded-md border border-white/20 bg-black/80 hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <button
                onClick={scrollNext}
                className="absolute right-2 md:right-4 p-2 md:p-3 rounded-md border border-white/20 bg-black/80 hover:bg-white/20 transition-colors"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>

            {/* Thumbnail Carousel */}
            <div className="p-4 border-t border-white/10 bg-black/70 backdrop-blur-sm">
              <div
                className="max-w-5xl mx-auto overflow-hidden"
                ref={emblaThumbsRef}
              >
                <div className="flex gap-2 justify-center">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => onThumbClick(index)}
                      className={`flex-[0_0_80px] md:flex-[0_0_120px] min-w-0 relative rounded-md overflow-hidden transition-all h-16 md:h-20 border-2 ${
                        index === selectedIndex
                          ? "border-white opacity-100"
                          : "border-transparent opacity-50 hover:opacity-80"
                      }`}
                    >
                      <Image
                        src={getImageUrl(image)}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 80px, 120px"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
