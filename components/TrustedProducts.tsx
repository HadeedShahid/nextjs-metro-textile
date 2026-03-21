import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";

const TrustedProducts = () => {
  // card data for card 1 & card 2
  const productCards = [
    {
      title: (
        <>
          <span className="text-gray-500">Metro</span> - Zipper Sliders
        </>
      ),
      img: "/assets/landing-card-1.png",
      alt: "zipper-card",
      link: "/products", // Added dummy link
    },
    {
      title: (
        <>
          <span className="text-gray-500">Metro</span> - Metal Buckles
        </>
      ),
      img: "/assets/landing-card-2.png",
      alt: "buckle-card",
      link: "/products", // Added dummy link
    },
  ];

  return (
    <section className="py-12 h-fit">
      {/* header */}
      <div className="w-full">
        <h2 className="text-4xl md:text-6xl font-medium max-w-[600px]">
          Genuine & Trusted Products
        </h2>
      </div>

      {/* cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch gap-6 pt-14">
        {/* mapped cards */}
        {productCards.map((card, idx) => (
          <Link
            key={idx}
            href={card.link}
            className="flex flex-col items-start p-7 justify-between bg-[#f3f3f3] rounded-lg w-full min-h-[500px] group transition-all duration-300 hover:shadow-lg hover:bg-[#ebebeb] cursor-pointer"
          >
            <p className="font-medium">{card.title}</p>
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

        {/* unique card */}
        <Link
          href="/products"
          className="flex flex-col justify-between p-7 bg-black rounded-lg w-full min-h-[500px] group transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer"
        >
          <h5 className="text-white text-2xl md:text-3xl uppercase w-[350px]">
            Take a look on all accessories
          </h5>
          <div className="flex w-full justify-end">
            <div className="group/btn border border-white py-4 px-4 rounded-full transition-all ease-in-out duration-300 group-hover:bg-white text-white group-hover:text-black">
              <ArrowUpRight />
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default TrustedProducts;
