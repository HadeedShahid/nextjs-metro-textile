import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <section className=" py-8 md:py-12">
      <div className=" flex w-full h-[400px] sm:h-[550px] md:h-[650px] rounded-2xl overflow-hidden">
        <div className="flex w-full h-full items-center justify-center">
          {/* Overlay layer */}
          <div className=" w-full h-full flex items-center justify-center bg-black/40">
            {/* Background image */}
            <Image
              src="/assets/hero2.jpg"
              alt="hero-img"
              width={1400}
              height={800}
              priority
              className="w-full h-full object-fill"
            />

            {/* Content */}
            <div className="absolute flex flex-col justify-center items-center text-center text-white px-4 sm:px-6 md:px-10">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[80px] font-semibold max-w-[90%] md:max-w-[800px] leading-tight md:leading-[1.1]">
                A Portfolio of Precision & Design
              </h1>
              <p className="text-sm sm:text-base md:text-lg font-medium mt-4 max-w-[90%] md:max-w-[600px] opacity-90">
                We deliver premium zippers, buttons, buckles, and trims to
                brands worldwide — trusted by manufacturers for over 20 years.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mt-8 md:mt-12">
                <Link href="/products">
                  <Button className="cursor-pointer bg-[#7F2F82] hover:bg-[#7f2f82] transition-all hover:scale-105 duration-300 ease-in-out">
                    Explore Products
                  </Button>
                </Link>
                <Button className="cursor-pointer bg-transparent  hover:bg-white hover:text-black transition-all hover:scale-105 duration-300 ease-in-out">
                  Request a Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
