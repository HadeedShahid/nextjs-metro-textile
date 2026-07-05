import { cn } from "@/lib/utils";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import Section from "./base/Section";

const brands = [
  { src: "/assets/logos/burberry-logo.webp", name: "Burberry", wide: true },
  { src: "/assets/logos/ck-logo.webp", name: "Calvin Klein", wide: false },
  { src: "/assets/logos/diesel-logo.webp", name: "Diesel", wide: false },
  { src: "/assets/logos/kaporal-logo.webp", name: "Kaporal", wide: true },
  { src: "/assets/logos/levis-logo.webp", name: "Levi's", wide: false },
  { src: "/assets/logos/one-logo.webp", name: "One", wide: false },
  { src: "/assets/logos/pullbear-logo.webp", name: "Pull & Bear", wide: false },
  { src: "/assets/logos/stoneage-logo.webp", name: "Stone Age", wide: true },
];

const Clients = ({ breakout = true }: { breakout?: boolean }) => {
  return (
    // Standalone (homepage) gets Section framing so its typography stays in
    // sync with every other section; inside CompaniesTrust the parent supplies
    // the copy, so only the marquee renders. The header stays inside the page
    // container — only the marquee itself breaks out to full bleed.
    <Section
      eyebrow={breakout ? "Trusted worldwide" : undefined}
      title={breakout ? "The hardware behind the world's leading labels" : undefined}
    >
      <div className={cn(breakout && "breakout")}>
      <Marquee
        speed={40}
        loop={0}
        autoFill
        gradient
        gradientColor="white"
        gradientWidth={80}
        className="overflow-hidden py-2"
      >
        {brands.map((brand) => (
          <div
            key={brand.name}
            className="group mx-2.5 md:mx-3 flex h-20 w-40 md:h-24 md:w-52 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
          >
            <Image
              src={brand.src}
              alt={`${brand.name} logo`}
              width={160}
              height={80}
              className={cn(
                "w-auto object-contain",
                brand.wide ? "max-h-12 md:max-h-16" : "max-h-8 md:max-h-10",
              )}
            />
          </div>
        ))}
      </Marquee>
      </div>
    </Section>
  );
};

export default Clients;
