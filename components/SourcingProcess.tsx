"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Section from "./base/Section";
import { Button } from "./ui/button";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Text from "./base/Text";

const steps = [
  {
    number: "1",
    title: "Choose Your Materials",
    description:
      "Browse our catalog of premium fabrics and textiles tailored for your brand.",
    image: "/assets/landing-card-1.png",
  },
  {
    number: "2",
    title: "Technical Consulting",
    description:
      "Work with our production specialists for spec sheets and technical drawings.",
    image: "/assets/landing-card-2.png",
  },
  {
    number: "3",
    title: "Quality Controlled Sampling",
    description:
      "Get physical samples to feel the fabric and verify color accuracy.",
    image: "/assets/landing-zipper.jpg",
  },
  {
    number: "4",
    title: "Bulk Production & Delivery",
    description:
      "Sit back as your orders are manufactured and delivered on time, every time.",
    image: "/assets/landing-button.jpg",
  },
];

export default function SourcingProcess() {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [activeTab]);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <Section title="Sourcing Process">
      <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-3 lg:gap-6 items-stretch">
        {/* Left: Vertical Tabs (Hidden on mobile) */}
        <div className="hidden lg:block space-y-4">
          {steps.map((step, index) => (
            <div
              key={index}
              onClick={() => handleTabClick(index)}
              className={cn(
                "group relative flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300",
                activeTab === index
                  ? "bg-linear-to-r from-primary/3 to-transparent border border-primary/50 shadow-sm"
                  : "hover:bg-slate-100/50 border border-slate-200",
              )}
            >
              <div
                className={cn(
                  "text-lg font-bold transition-all duration-300 shrink-0",
                  activeTab === index
                    ? "text-primary scale-110"
                    : "text-slate-500",
                )}
              >
                {(index + 1).toString().padStart(2, "0")}
              </div>

              <div className="space-y-1">
                <h3
                  className={cn(
                    "text-lg font-semibold transition-colors duration-300",
                    activeTab === index ? "text-slate-900" : "text-slate-700",
                  )}
                >
                  {step.title}
                </h3>
                <p
                  className={cn(
                    "text-sm leading-relaxed transition-colors duration-300",
                    activeTab === index ? "text-slate-600" : "text-slate-500",
                  )}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Area: Image Preview + Mobile Context */}
        <div className="flex flex-col gap-4">
          <div className="relative w-full h-[400px] lg:h-full rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 shadow-sm">
            {steps.map((step, index) => (
              <div
                key={index}
                className={cn(
                  "absolute inset-0 transition-opacity duration-1000 ease-in-out",
                  activeTab === index ? "opacity-100" : "opacity-0",
                )}
              >
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  priority={index === 0}
                  className="object-cover"
                />
              </div>
            ))}

            {/* Desktop Overlay: Minimalist CTA */}
            <div className="hidden lg:block absolute bottom-8 left-8 z-20">
              <Button
                size="lg"
                className="rounded-xl px-8 font-semibold transition-all group/btn shadow-lg shadow-primary/20"
              >
                Send Inquiry
                <ArrowUpRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="lg:hidden p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-start gap-4">
              <Text className="text-lg font-bold text-primary">
                {(activeTab + 1).toString().padStart(2, "0")}
              </Text>
              <div className="space-y-4 flex-1">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-900">
                    {steps[activeTab].title}
                  </h3>
                  <p className="text-slate-600 text-sm">
                    {steps[activeTab].description}
                  </p>
                </div>
                <Button size="lg" className="w-full font-semibold">
                  Inquire Now
                  <ArrowUpRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
