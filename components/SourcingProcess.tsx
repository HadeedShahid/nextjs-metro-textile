"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Section from "./base/Section";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "1",
    title: "Choose Your Materials",
    description:
      "Browse our extensive catalog of premium fabrics and textiles tailored for your brand.",
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
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % steps.length);
    }, 6000); // Slower cycle for more sophistication
    return () => clearInterval(interval);
  }, [activeTab, isPaused]);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    setIsPaused(true);
  };

  return (
    <Section title="Sourcing Process">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start pt-8">
        {/* Left: Sophisticated Vertical Tabs */}
        <div className="space-y-2">
          {steps.map((step, index) => (
            <div
              key={index}
              onClick={() => handleTabClick(index)}
              className={cn(
                "group relative flex items-start gap-8 p-6 rounded-xl cursor-pointer transition-all duration-300",
                activeTab === index
                  ? "bg-linear-to-r from-primary/3 to-transparent border border-primary/50 shadow-sm"
                  : "hover:bg-slate-50/50 border border-slate-100",
              )}
            >
              <div
                className={cn(
                  "text-2xl font-bold transition-all duration-300 shrink-0",
                  activeTab === index
                    ? "text-primary scale-110"
                    : "text-slate-300",
                )}
              >
                {(index + 1).toString().padStart(2, "0")}
              </div>

              <div className="space-y-2">
                <h3
                  className={cn(
                    "text-xl font-semibold transition-colors duration-300",
                    activeTab === index ? "text-slate-900" : "text-slate-600",
                  )}
                >
                  {step.title}
                </h3>
                <p
                  className={cn(
                    "text-base leading-relaxed transition-colors duration-300",
                    activeTab === index ? "text-slate-600" : "text-slate-500",
                  )}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Elegant Visual Preview */}
        <div className="relative w-full aspect-4/3 lg:aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-100">
          {steps.map((step, index) => (
            <div
              key={index}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000 ease-in-out",
                activeTab === index
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none",
              )}
            >
              <Image
                src={step.image}
                alt={step.title}
                fill
                priority={index === 0}
                className="object-cover"
              />
              {/* Subtle bottom gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-60" />

              {/* Sophisticated floating CTA */}
              <div
                className={cn(
                  "absolute bottom-8 left-8 transition-all duration-700 delay-300",
                  activeTab === index
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0 pointer-events-none",
                )}
              >
                <Button className="rounded-xl px-8 h-12 text-base font-semibold transition-all group/btn shadow-lg shadow-primary/20">
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
