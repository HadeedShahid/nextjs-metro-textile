"use client"

import React from "react"
import {
  IconBoltFilled,
  IconShieldCheckFilled,
  IconDropletFilled,
  IconStarFilled,
} from "@tabler/icons-react"
import Image from "next/image"

const KeyFeatures = () => {
  const features = [
    {
      title: "Scratch Resistant",
      icon: <IconShieldCheckFilled size={22} />,
    },
    {
      title: "Smooth Function",
      icon: <IconBoltFilled size={22} />,
    },
    {
      title: "Rust Free",
      icon: <IconDropletFilled size={22} />,
    },
    {
      title: "Premium Finish",
      icon: <IconStarFilled size={22} />,
    },
  ]

  return (
    <section className="py-10 px-4 md:px-8 lg:px-16">
      <div className="flex flex-col gap-10">
        <h2 className="font-semibold text-3xl md:text-4xl">Key Features</h2>

        {/* Main Content Wrapper */}
        <div className="flex flex-col-reverse lg:flex-row justify-between items-center lg:items-start gap-10">
          {/* Left block */}
          <div className="flex flex-col justify-between w-full lg:w-1/2">
            <div className="flex flex-col gap-6">
              {features.map((item, key) => (
                <div className="flex items-center gap-3" key={key}>
                  <div className="w-10 h-10 bg-muted rounded-lg flex justify-center items-center">
                    {item.icon}
                  </div>
                  <h6 className="font-medium text-lg md:text-xl">
                    {item.title}
                  </h6>
                </div>
              ))}
            </div>

            <div className="pt-8">
              <p className="text-zinc-500 text-sm md:text-base leading-relaxed max-w-xl">
                At Metro Metals, every product goes through a careful process.
                We choose strong materials, shape them with precision, and
                finish them with attention to detail. Our team focuses on making
                each piece reliable, stylish, and built to last, so brands can
                trust our quality season after season.
              </p>
            </div>
          </div>

          {/* Right block */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <Image
              src="/assets/detail_img.png"
              alt="Zipper product"
              width={600}
              height={600}
              className="w-full max-w-md md:max-w-lg h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default KeyFeatures
