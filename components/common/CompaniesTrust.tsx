import React from "react";
import Image from "next/image";
import Clients from "../clients";

const CompaniesTrust = () => {
  const logos = [
    "/assets/burberry.png",
    "/assets/calvin-klein.png",
    "/assets/diesel.png",
    "/assets/kaporal-logo.png",
    "/assets/levis.png",
    "/assets/one-logo.png",
    "/assets/pull-and-bear.png",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16">
        {/* Left Side Text */}
        <div className="max-w-[180px] text-center md:text-left">
          <p className="text-slate-500 text-sm font-medium leading-relaxed">
            Trusted by over 50,000 companies of all sizes
          </p>
        </div>

        {/* Logos Grid */}
        <Clients breakout={false} />
      </div>
    </div>
  );
};

export default CompaniesTrust;
