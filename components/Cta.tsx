import Image from "next/image";
import React from "react";
import { ArrowUpRight } from "lucide-react";

const Cta = () => {
  return (
    <section className="w-full bg-white py-12">
      <div className="relative flex flex-col md:flex-row items-start justify-between">
        {/* Logo  */}
        <div className="py-4 md:pr-8">
          <Image src="/logo.png" width={80} height={80} alt="logo-image" />
        </div>

        {/* Hero / CTA */}
        <div className="relative w-full max-w-6xl overflow-hidden rounded-2xl">
          {/* Background Image */}
          <Image
            src="/assets/cta-pic.jpg"
            alt="cta-background"
            width={1200}
            height={600}
            priority
            className="w-full h-[320px] sm:h-[420px] lg:h-[560px] object-cover"
          />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6 md:p-10 text-white">
            {/* Top bar */}
            <div className="flex items-center justify-between text-xs sm:text-sm md:text-base">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                <span>Metro Metals</span>
              </div>
              <p className="text-gray-200 hidden sm:block">
                We are fashion & manufacturers
              </p>
            </div>

            {/* Middle content */}
            <div className="flex  md:flex-row justify-between items-end md:items-end gap-8">
              <div className="flex flex-col text-left">
                <h1 className="text-3xl sm:text-5xl lg:text-8xl font-medium mb-3 leading-tight">
                  METRO METALS
                </h1>
                <p className="text-gray-300 text-sm sm:text-base lg:text-lg max-w-lg">
                  Partner with Us and elevate your collections with details that
                  last. Trusted by leading fashion brands worldwide.
                </p>
              </div>

              {/* CTA Button */}
              <div className="flex md:justify-end md:items-end ">
                <button
                  className="group border border-white 
    py-2 px-2 sm:py-3 sm:px-3 md:py-4 md:px-4 
    rounded-full transition-all ease-in-out duration-300  
    hover:bg-white cursor-pointer"
                >
                  <ArrowUpRight
                    className="text-white group-hover:text-black 
      w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
