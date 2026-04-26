import Image from "next/image";
import Marquee from "react-fast-marquee";
import { cn } from "@/lib/utils";

const OurClient = () => {
  const marqueeImages = [
    "/assets/burberry.png",
    "/assets/calvin-klein.png",
    "/assets/diesel.png",
    "/assets/kaporal-logo.png",
    "/assets/levis.png",
    "/assets/one-logo.png",
    "/assets/pull-and-bear.png",
    "/assets/stoneage-logo.png",
  ];

  return (
    <section className="py-12 px-4 md:px-12">
      {/* header */}
      <div className="flex flex-col items-center md:items-start">
        <div className="w-full">
          <h2 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-center md:text-left">
            Our Client&apos;s List
          </h2>
        </div>

        {/* bottom-right block */}
        <div className="flex flex-col md:flex-row w-full pt-8 md:pt-14">
          <div className="md:w-1/2 md:ml-auto flex flex-col items-center md:items-start text-center md:text-left">
            <h6 className="uppercase text-lg md:text-xl font-medium">
              who we serve
            </h6>
            <div className="flex flex-col md:flex-row gap-6 pt-4">
              <div className="w-full md:w-1/2">
                <p className="text-sm md:text-base leading-relaxed">
                  We proudly partner with leading fashion houses, manufacturers,
                  and designers who demand nothing less than perfection in every
                  detail — and we prove it to them consistently.
                </p>
              </div>
              <div className="w-full md:w-1/2">
                <p className="text-sm md:text-base leading-relaxed">
                  From luxury ready-to-wear collections to streetwear labels —
                  our products elevate garments&apos; timeless appeal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* marquee */}
      <div className="flex justify-center items-center pt-16 md:pt-32">
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
    </section>
  );
};

export default OurClient;
