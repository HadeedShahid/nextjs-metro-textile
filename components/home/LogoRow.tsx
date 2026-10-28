import Image from "next/image";
import { cn } from "@/lib/utils";

// Heights are set per mark so a wide wordmark and a stacked crest carry
// similar visual weight.
const BRANDS = [
  { src: "/assets/logos/levis-logo.webp", name: "Levi's", h: "h-8 md:h-10" },
  { src: "/assets/logos/diesel-logo.webp", name: "Diesel", h: "h-4 md:h-5" },
  { src: "/assets/logos/ck-logo.webp", name: "Calvin Klein", h: "h-4 md:h-5" },
  { src: "/assets/logos/burberry-logo.webp", name: "Burberry", h: "h-11 md:h-14" },
  { src: "/assets/logos/pullbear-logo.webp", name: "Pull & Bear", h: "h-4 md:h-5" },
  { src: "/assets/logos/kaporal-logo.webp", name: "Kaporal", h: "h-10 md:h-12" },
  { src: "/assets/logos/stoneage-logo.webp", name: "Stone Age", h: "h-11 md:h-14" },
  { src: "/assets/logos/one-logo.webp", name: "One", h: "h-7 md:h-9" },
];

/** The client marks, set quietly in one row: no boxes, no motion. */
export default function LogoRow() {
  return (
    <section aria-labelledby="clients-title" className="py-14 md:py-16">
      <div className="container-x">
        <h2 id="clients-title" className="text-center text-[0.9375rem] text-muted-foreground">
          Trusted by labels including
        </h2>
        <ul className="mt-8 grid grid-cols-4 items-center gap-x-6 gap-y-8 md:flex md:flex-wrap md:justify-between md:gap-x-10">
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
