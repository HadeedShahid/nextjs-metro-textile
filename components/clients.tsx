import { cn } from "@/lib/utils";
import Image from "next/image";
import Marquee from "react-fast-marquee";

const Clients = ({ breakout = true }: { breakout?: boolean }) => {
  const marqueeImages = [
    "/assets/logos/burberry-logo.webp",
    "/assets/logos/ck-logo.webp",
    "/assets/logos/diesel-logo.webp",
    "/assets/logos/kaporal-logo.webp",
    "/assets/logos/levis-logo.webp",
    "/assets/logos/one-logo.webp",
    "/assets/logos/pullbear-logo.webp",
    "/assets/logos/stoneage-logo.webp",
  ];

  return (
    <div
      className={cn("flex justify-center items-center", breakout && "breakout")}
    >
      <Marquee speed={50} gradient={false} loop={0} className="py-4 overflow-hidden">
        {marqueeImages.map((image, idx) => {
          const isImageBased = image.includes("burberry") || image.includes("kaporal") || image.includes("stoneage");
          return (
            <div 
              key={idx} 
              className={cn(
                "mx-8 md:mx-12 flex items-center justify-center shrink-0",
                isImageBased ? "w-32 sm:w-40 md:w-48 h-16 md:h-24" : "w-24 sm:w-32 md:w-40 h-12 md:h-16"
              )}
            >
              <Image
                src={image}
                alt={`logo-${idx}`}
                width={160}
                height={80}
                className="w-full h-full object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            </div>
          );
        })}
      </Marquee>
    </div>
  );
};

export default Clients;
