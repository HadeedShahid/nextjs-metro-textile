import Image from "next/image";
import Marquee from "react-fast-marquee";

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
    </section>
  );
};

export default OurClient;
