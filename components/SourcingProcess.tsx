import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowRight, ChevronRightCircle } from "lucide-react";

const steps = [
  {
    number: "01.",
    title: "Choose a Plan",
    description: "Select the flexible or premium plan that suits your business needs",
  },
  {
    number: "02.",
    title: "Subscribe Instantly",
    description: "Activate your subscription with just a click - no forms, no hassle.",
  },
  {
    number: "03.",
    title: "Get Tailored Solutions",
    description: "Receive personalized products & support for your operations.",
  },
  {
    number: "04.",
    title: "Receive Your Supplies",
    description: "Sit back as your chemicals are delivered on time, every time.",
  },
];

const avatars = [
  { src: "https://i.pravatar.cc/150?u=1", fallback: "JD" },
  { src: "https://i.pravatar.cc/150?u=2", fallback: "AS" },
  { src: "https://i.pravatar.cc/150?u=3", fallback: "MK" },
  { src: "https://i.pravatar.cc/150?u=4", fallback: "RL" },
];

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";
import Section from "./base/Section";
import Text from "./base/Text";

export default function SourcingProcess() {
  return (
    <Section>
      {/* Header Section */}
      <Text as="h2" className="text-4xl font-semibold">
        Sourcing Process
      </Text>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        {steps.map((step, index) => (
          <Card
            key={index}
            className="border-slate-200 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300 flex flex-col justify-between min-h-[280px]"
          >
            <CardHeader>
              <span className="text-xl font-bold text-slate-400 group-hover/card:text-purple-600 transition-colors">
                {step.number}
              </span>
              <CardTitle className="text-2xl font-bold leading-snug text-slate-900">
                {step.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-500 leading-relaxed text-sm">
                {step.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer Bar */}
      <Card className="bg-slate-100/80 border-slate-200 py-4 md:py-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <CardContent className="flex flex-col md:flex-row items-center justify-between gap-6 w-full">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-4">
              {avatars.map((avatar, i) => (
                <Avatar key={i} className="border-2 border-white w-10 h-10 shadow-sm">
                  <AvatarImage src={avatar.src} />
                  <AvatarFallback>{avatar.fallback}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <p className="text-sm md:text-base font-medium text-slate-600">
              Align with Businesses that <span className="text-slate-900 font-bold underline decoration-purple-500 underline-offset-4">Choose Quality</span>
            </p>
          </div>

          <Button
            size={"lg"}
          // className="bg-[#7F2F82] text-white hover:bg-[#6b266e] rounded-full pl-6 pr-2 py-6 group flex items-center gap-4 transition-all shadow-lg shadow-purple-900/10"
          >
            Start Now
            <ChevronRightCircle className="w-5 h-5" />
          </Button>
        </CardContent>
      </Card>
    </Section>
  );
}
