import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Section from "./base/Section";
import Text from "./base/Text";
import EmblaCarouselWrapper from "./emblaCarousel/EmblaCarouselWrapper";

const TrustedProducts = () => {
  // card data for card 1 & card 2
  const productCards = [
    {
      title: (
        <>
          Zipper Sliders - <span className="text-gray-500">Metro</span>
        </>
      ),
      img: "/assets/landing-card-1.png",
      alt: "zipper-card",
      link: "/products", // Added dummy link
    },
    {
      title: (
        <>
          Metal Buckles - <span className="text-gray-500">Metro</span>
        </>
      ),
      img: "/assets/landing-card-2.png",
      alt: "buckle-card",
      link: "/products", // Added dummy link
    },
  ];

  return (
    <Section title=" Product Catalog">
      <EmblaCarouselWrapper
        options={{ align: "start", containScroll: "trimSnaps", dragFree: true }}
        containerClassName="gap-6"
        slideClassName="basis-[75%] sm:basis-[40%] lg:basis-[24%]"
      >
        {productCards.map((card, idx) => (
          <Link
            key={idx}
            href={card.link}
            className="flex flex-col items-start p-7 justify-between bg-[#f3f3f3] rounded-lg w-full group transition-all duration-300 hover:shadow-lg hover:bg-[#ebebeb] cursor-pointer h-full"
          >
            <Text className="font-medium">{card.title}</Text>
            <Image
              src={card.img}
              alt={card.alt}
              width={400}
              height={300}
              className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
            />
            <div className="flex w-full justify-end">
              <div className="group/btn border border-[#7F2F82] py-1 px-6 rounded-full transition-all ease-in-out duration-300 bg-transparent group-hover:bg-[#7f2f82] group-hover:text-white flex items-center justify-center">
                <ArrowRight className="text-[#7F2F82] group-hover:text-white" />
              </div>
            </div>
          </Link>
        ))}
      </EmblaCarouselWrapper>
    </Section>
  );
};

export default TrustedProducts;
