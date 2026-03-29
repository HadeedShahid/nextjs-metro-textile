import { cn } from "@/lib/utils";
import Image from "next/image";
import Marquee from "react-fast-marquee";

const Clients = ({ breakout = true }: { breakout?: boolean }) => {
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
    <div className={cn("flex justify-center items-center", breakout && "breakout")}>
      <Marquee speed={50} gradient={false} loop={0}>
        {marqueeImages.map((image, idx) => (
          <div key={idx} className="mx-6 flex items-center">
            <Image
              src={image}
              alt={`logo-${idx}`}
              width={100}
              height={50}
              className="w-20 sm:w-28 md:w-32 lg:w-40 h-auto object-contain"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Clients;
