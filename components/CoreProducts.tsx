import React from "react";
import Image from "next/image";

const CoreProducts = () => {
  const coreProducts = [
    {
      img: "/assets/landing-button.jpg",
      alt: "Button",
    },
    {
      img: "/assets/landing-zipper.jpg",
      alt: "Zipper",
    },
    {
      img: "/assets/landing-buckle.jpg",
      alt: "Buckles",
    },
    {
      img: "/assets/landing-badge.jpg",
      alt: "Badge",
    },
  ];
  return (
    <section className="py-12">
      <div className="w-full">
        <h2 className="text-4xl md:text-6xl font-medium">Our Core Products</h2>
        <p className="max-w-[450px] font-medium text-gray-600 pt-6">
          We specialize in premium metallic hardware that adds both style and
          function to your designs. From everyday essentials to statement pieces
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-14">
        {coreProducts.map((product, idx) => (
          <div key={idx} className="rounded-xl overflow-hidden border">
            <Image
              src={product.img}
              alt={product.alt}
              width={600}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CoreProducts;
