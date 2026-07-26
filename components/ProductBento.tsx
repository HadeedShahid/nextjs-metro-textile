import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Section from "./base/Section";
import { cn } from "@/lib/utils";

/**
 * Bento grid of product categories. The renders sit on a white studio
 * background and are composited with `mix-blend-multiply`, so the white drops
 * out against each tile tint while the contact shadow is preserved.
 */
const tiles = [
  {
    title: "Zippers",
    blurb: "Brass chains, custom pulls and finishes for every garment.",
    href: "/products/zippers",
    src: "/assets/bento/zippers.webp",
    tint: "#F6EEF7",
    span: "lg:col-span-2",
    wide: true,
  },
  {
    title: "Buttons",
    blurb: "Sew-through, shank, tack and moulded.",
    href: "/products/buttons",
    src: "/assets/bento/buttons.webp",
    tint: "#EEF1F5",
    span: "",
    wide: false,
  },
  {
    title: "Buckles",
    blurb: "Roller, D-ring and prong.",
    href: "/products/buckles",
    src: "/assets/bento/buckles.webp",
    tint: "#F5EFE6",
    span: "",
    wide: false,
  },
  {
    title: "Patches",
    blurb: "Leather and PU, debossed to your mark.",
    href: "/products/patches",
    src: "/assets/bento/patches.webp",
    tint: "#F7F1E8",
    span: "lg:col-span-2",
    wide: true,
  },
  {
    title: "Plates",
    blurb: "Engraved nameplates in every finish.",
    href: "/products/plates",
    src: "/assets/bento/plates.webp",
    tint: "#EEF2F6",
    span: "lg:col-span-2",
    wide: true,
  },
];

export default function ProductBento() {
  return (
    <Section eyebrow="What we make" title="Explore the product range">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((tile) => (
          <Link
            key={tile.title}
            href={tile.href}
            style={{ backgroundColor: tile.tint }}
            className={cn(
              "group relative flex min-h-[220px] flex-col overflow-hidden rounded-xl border border-slate-200/80 p-5 shadow-sm transition-shadow duration-200 hover:shadow-lg lg:min-h-[240px]",
              tile.span,
            )}
          >
            <div
              className={cn(
                "relative z-10 max-w-[60%]",
                tile.wide ? "lg:max-w-[42%]" : "lg:max-w-[80%]",
              )}
            >
              <h3 className="flex items-center gap-1.5 text-lg font-semibold text-slate-900">
                {tile.title}
                <ArrowUpRight className="h-4 w-4 text-primary transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                {tile.blurb}
              </p>
            </div>

            <Image
              src={tile.src}
              alt={`${tile.title} made by Metro Metal`}
              width={1600}
              height={870}
              // Already hand-optimised WebP cutouts. Skipping the optimiser
              // keeps the alpha channel — it re-encodes to JPEG when a client
              // does not advertise WebP, which flattens transparency to white.
              unoptimized
              sizes={tile.wide ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 100vw, 25vw"}
              className={cn(
                // cutouts have no baked shadow, so ground them with a soft one
                "pointer-events-none absolute bottom-3 right-3 max-w-none drop-shadow-[0_10px_16px_rgba(15,23,42,0.16)]",
                tile.wide ? "w-[70%] lg:w-[56%]" : "w-[76%] lg:w-[88%]",
              )}
            />
          </Link>
        ))}
      </div>
    </Section>
  );
}
