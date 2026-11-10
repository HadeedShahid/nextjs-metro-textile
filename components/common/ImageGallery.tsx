"use client"

import * as React from "react"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight, Expand } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { urlFor } from "@/sanity/image"
import { cn } from "@/lib/utils"
import type { SanityImage } from "@/lib/api"

/**
 * Product photos at studio scale: one large frame that swipes between photos,
 * thumbnails beneath it, and a full-screen viewer for close inspection that
 * swipes too. Both are Embla carousels; a drag never counts as a click, so
 * swiping the frame does not open the viewer.
 */
export default function ImageGallery({
  images = [],
  alt = "Product",
}: {
  images: SanityImage[]
  alt?: string
}) {
  const [active, setActive] = React.useState(0)
  const [open, setOpen] = React.useState(false)
  const [frameRef, frame] = useEmblaCarousel()

  React.useEffect(() => {
    if (!frame) return
    const onSelect = () => setActive(frame.selectedScrollSnap())
    frame.on("select", onSelect)
    return () => {
      frame.off("select", onSelect)
    }
  }, [frame])

  // Keep the page's frame on the photo the buyer stopped at in the viewer.
  const syncFrame = React.useCallback((i: number) => frame?.scrollTo(i, true), [frame])

  const count = images.length

  if (!count) {
    return (
      <div className="flex aspect-[4/3] items-center justify-center rounded-lg bg-muted text-muted-foreground">
        Photo coming soon
      </div>
    )
  }

  const label = (i: number) => `${alt}, photo ${i + 1} of ${count}`

  return (
    // min-w-0 lets the frame shrink with its grid column.
    <div className="min-w-0">
      <div className="group relative">
        <div ref={frameRef} className="overflow-hidden rounded-lg bg-muted" aria-roledescription="carousel" aria-label={`${alt} photos`}>
          <ul className="flex touch-pan-y">
            {images.map((image, i) => (
              <li key={image?._key ?? i} className="relative aspect-[4/3] min-w-0 shrink-0 grow-0 basis-full">
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="absolute inset-0 cursor-zoom-in"
                  aria-label={`View ${label(i)} full screen`}
                >
                  <Image
                    src={urlFor(image).width(1600).height(1200).fit("crop").url()}
                    alt={label(i)}
                    fill
                    preload={i === 0}
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover"
                    draggable={false}
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <span className="pointer-events-none absolute bottom-4 right-4 flex size-10 items-center justify-center rounded-control bg-white/85 text-foreground backdrop-blur transition-opacity lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100">
          <Expand className="size-4" aria-hidden />
        </span>
      </div>

      {count > 1 && (
        // Thumbnails wrap onto a second row rather than scrolling sideways.
        <ul className="mt-3 grid grid-cols-5 gap-2 sm:flex sm:flex-wrap sm:gap-3" aria-label="Photos">
          {images.map((image, i) => (
            <li key={image?._key ?? i}>
              <button
                type="button"
                onClick={() => frame?.scrollTo(i)}
                aria-label={`Show photo ${i + 1}`}
                aria-current={i === active ? "true" : undefined}
                className={cn(
                  "relative block aspect-square w-full overflow-hidden rounded-lg bg-muted ring-offset-2 transition sm:size-[4.5rem] md:size-20",
                  i === active ? "ring-2 ring-foreground" : "opacity-70 hover:opacity-100",
                )}
              >
                <Image
                  src={urlFor(image).width(200).height(200).fit("crop").url()}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="on-die h-dvh max-h-none w-screen max-w-none gap-0 rounded-none bg-die p-0 text-die-foreground ring-0 sm:max-w-none [&>[data-slot=dialog-close]]:right-5 [&>[data-slot=dialog-close]]:top-5 [&>[data-slot=dialog-close]]:z-10 [&>[data-slot=dialog-close]]:size-11 [&>[data-slot=dialog-close]]:bg-white/12 [&>[data-slot=dialog-close]]:text-die-foreground [&>[data-slot=dialog-close]]:hover:bg-white/20">
          <DialogTitle className="sr-only">{alt} photos</DialogTitle>
          <Viewer
            images={images}
            label={label}
            start={active}
            onSelect={syncFrame}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

/** The full-screen viewer: one photo at a time, contained, with arrows, arrow keys and swipe. */
function Viewer({
  images,
  label,
  start,
  onSelect,
}: {
  images: SanityImage[]
  label: (i: number) => string
  start: number
  onSelect: (i: number) => void
}) {
  const [viewportRef, api] = useEmblaCarousel({ startIndex: start })
  const [current, setCurrent] = React.useState(start)
  const count = images.length

  React.useEffect(() => {
    if (!api) return
    const update = () => {
      const i = api.selectedScrollSnap()
      setCurrent(i)
      onSelect(i)
    }
    api.on("select", update)
    return () => {
      api.off("select", update)
    }
  }, [api, onSelect])

  // The arrows wrap round at the ends rather than greying out: a disabled
  // button that still holds focus swallows key presses in Firefox.
  const next = () => api?.scrollTo(api.canScrollNext() ? api.selectedScrollSnap() + 1 : 0)
  const prev = () => api?.scrollTo(api.canScrollPrev() ? api.selectedScrollSnap() - 1 : count - 1)

  // Arrow keys page through photos. The dialog stops arrow keys from reaching
  // the window, so they are caught here, inside it.
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") next()
    if (e.key === "ArrowLeft") prev()
  }

  // Centred with inset-y-0 and my-auto, not a translate, so the 1px press does not move the arrow off the pointer.
  const arrow = "absolute inset-y-0 my-auto size-11 bg-white/12 text-die-foreground hover:bg-white/20"

  return (
    <div className="relative h-full w-full" onKeyDown={onKeyDown}>
      <div ref={viewportRef} className="h-full overflow-hidden">
        <ul className="flex h-full touch-pan-y">
          {images.map((image, i) => (
            <li key={image?._key ?? i} className="relative h-full min-w-0 shrink-0 grow-0 basis-full">
              <Image
                src={urlFor(image).width(2400).url()}
                alt={label(i)}
                fill
                sizes="100vw"
                className="object-contain p-4 md:p-14"
                draggable={false}
              />
            </li>
          ))}
        </ul>
      </div>
      {count > 1 && (
        <>
          <Button variant="ghost" size="icon" aria-label="Previous photo" onClick={prev} className={cn(arrow, "left-4")}>
            <ChevronLeft className="size-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Next photo" onClick={next} className={cn(arrow, "right-4")}>
            <ChevronRight className="size-5" />
          </Button>
          <p className="pointer-events-none absolute inset-x-0 bottom-5 text-center text-sm text-die-muted tabular-nums" aria-live="polite">
            {current + 1} / {count}
          </p>
        </>
      )}
    </div>
  )
}
