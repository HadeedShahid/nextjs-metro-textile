"use client"

import * as React from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Expand } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { urlFor } from "@/sanity/image"
import { cn } from "@/lib/utils"

/**
 * Product photos at studio scale: one large frame on the aluminium ground,
 * thumbnails beneath it, and a full-screen viewer for close inspection.
 */
export default function ImageGallery({
  images = [],
  alt = "Product",
}: {
  images: any[]
  alt?: string
}) {
  const [active, setActive] = React.useState(0)
  const [open, setOpen] = React.useState(false)

  const count = images?.length ?? 0
  const go = (direction: 1 | -1) => setActive((i) => (i + direction + count) % count)

  // Arrow keys page through photos while the viewer is open.
  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setActive((i) => (i + 1) % count)
      if (e.key === "ArrowLeft") setActive((i) => (i - 1 + count) % count)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, count])

  if (!count) {
    return (
      <div className="flex aspect-[4/3] items-center justify-center rounded-[2rem] bg-muted text-muted-foreground">
        Photo coming soon
      </div>
    )
  }

  const label = (i: number) => `${alt}, photo ${i + 1} of ${count}`

  return (
    // min-w-0 lets the thumbnail strip scroll instead of widening a grid column.
    <div className="min-w-0">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-[2rem] bg-muted"
        aria-label={`View ${label(active)} full screen`}
      >
        <Image
          src={urlFor(images[active]).width(1600).height(1200).fit("crop").url()}
          alt={label(active)}
          fill
          preload={active === 0}
          sizes="(max-width: 1024px) 100vw, 58vw"
          className="object-cover"
        />
        <span className="absolute bottom-4 right-4 flex size-10 items-center justify-center rounded-full bg-white/85 text-foreground opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          <Expand className="size-4" aria-hidden />
        </span>
      </button>

      {count > 1 && (
        <ul className="no-scrollbar mt-4 flex gap-3 overflow-x-auto pb-1" aria-label="Photos">
          {images.map((image, i) => (
            <li key={image?._key ?? i} className="shrink-0">
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show photo ${i + 1}`}
                aria-current={i === active ? "true" : undefined}
                className={cn(
                  "relative block size-[4.5rem] overflow-hidden rounded-2xl bg-muted ring-offset-2 transition md:size-20",
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
        <DialogContent className="on-die h-dvh max-h-none w-screen max-w-none gap-0 rounded-none bg-die p-0 text-die-foreground ring-0 sm:max-w-none [&>[data-slot=dialog-close]]:right-5 [&>[data-slot=dialog-close]]:top-5 [&>[data-slot=dialog-close]]:size-11 [&>[data-slot=dialog-close]]:bg-white/12 [&>[data-slot=dialog-close]]:text-die-foreground [&>[data-slot=dialog-close]]:hover:bg-white/20">
          <DialogTitle className="sr-only">{alt} photos</DialogTitle>
          <div className="relative h-full w-full">
            <Image
              src={urlFor(images[active]).width(2400).url()}
              alt={label(active)}
              fill
              sizes="100vw"
              className="object-contain p-4 md:p-14"
            />
            {count > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Previous photo"
                  onClick={() => go(-1)}
                  className="absolute left-4 top-1/2 size-11 -translate-y-1/2 bg-white/12 text-die-foreground hover:bg-white/20"
                >
                  <ChevronLeft className="size-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Next photo"
                  onClick={() => go(1)}
                  className="absolute right-4 top-1/2 size-11 -translate-y-1/2 bg-white/12 text-die-foreground hover:bg-white/20"
                >
                  <ChevronRight className="size-5" />
                </Button>
                <p className="absolute inset-x-0 bottom-5 text-center text-sm text-die-muted tabular-nums">
                  {active + 1} / {count}
                </p>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
