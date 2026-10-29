import Image from "next/image";
import { cn } from "@/lib/utils";

// Heights are set per mark so a wide wordmark and a stacked crest carry
// similar visual weight.
const BRANDS = [
  { src: "/assets/logos/levis-logo.webp", name: "Levi's", h: "h-7 md:h-8" },
  { src: "/assets/logos/diesel-logo.webp", name: "Diesel", h: "h-3.5 md:h-4" },
  { src: "/assets/logos/ck-logo.webp", name: "Calvin Klein", h: "h-3.5 md:h-4" },
  { src: "/assets/logos/burberry-logo.webp", name: "Burberry", h: "h-9 md:h-11" },
  { src: "/assets/logos/pullbear-logo.webp", name: "Pull & Bear", h: "h-3.5 md:h-4" },
  { src: "/assets/logos/kaporal-logo.webp", name: "Kaporal", h: "h-8 md:h-10" },
  { src: "/assets/logos/stoneage-logo.webp", name: "Stone Age", h: "h-9 md:h-11" },
  { src: "/assets/logos/one-logo.webp", name: "One", h: "h-6 md:h-7" },
];

/** The client marks, set quietly in one row: no boxes, no motion. */
export default function LogoRow() {
  return (
    <section aria-labelledby="clients-title" className="py-8 md:py-10">
      <div className="container-x">
        <h2 id="clients-title" className="text-center text-sm text-muted-foreground">
          Trusted by labels including
        </h2>
        <ul className="mt-5 grid grid-cols-4 items-center gap-x-6 gap-y-6 lg:flex lg:justify-between lg:gap-x-10">
          {BRANDS.map((brand) => (
            <li key={brand.name} className="flex justify-center">
              <Image
                src={brand.src}
                alt={brand.name}
                width={200}
                height={80}
                sizes="(max-width: 768px) 22vw, 160px"
                className={cn(
                  "w-auto max-w-full object-contain opacity-75 mix-blend-multiply grayscale transition-opacity hover:opacity-100",
                  brand.h,
                )}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
