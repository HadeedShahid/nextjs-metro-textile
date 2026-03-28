import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowRight } from "lucide-react";

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

export default function SourcingProcess() {
  return (
    <section className="bg-slate-50/50 border border-slate-200/60 rounded-[2.5rem] p-8 md:p-16 text-slate-900 overflow-hidden relative">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center gap-2 text-purple-600 font-bold tracking-wider text-sm uppercase">
            <span className="w-2 h-2 bg-purple-600 rounded-full animate-pulse" />
            4 SIMPLE STEPS
          </div>
          <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight text-slate-900">
            Effortless Process, <br />
            Continuous Supply
          </h2>
        </div>
        <div className="hidden md:block h-px bg-slate-300 flex-1 ml-12 mb-4" />
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white border border-slate-200 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300 p-8 rounded-[2rem] flex flex-col justify-between min-h-[280px] group"
          >
            <div className="space-y-6">
              <span className="text-xl font-bold text-slate-400 group-hover:text-purple-600 transition-colors">
                {step.number}
              </span>
              <h3 className="text-2xl font-bold leading-snug text-slate-900">
                {step.title}
              </h3>
            </div>
            <p className="text-slate-500 leading-relaxed text-sm mt-8">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      {/* Footer Bar */}
      <div className="bg-slate-100/80 border border-slate-200 p-4 md:p-6 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
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
          variant={"outline"}
          className="bg-[#7F2F82] text-white hover:bg-[#6b266e] rounded-full pl-6 pr-2 py-6 group flex items-center gap-4 transition-all shadow-lg shadow-purple-900/10"
        >
          <span className="font-bold text-lg">Start Now</span>
          <div className="bg-white/20 rounded-full p-2 text-white group-hover:scale-110 group-hover:rotate-[-10deg] transition-all backdrop-blur-sm">
            <ArrowRight className="w-5 h-5" />
          </div>
        </Button>
      </div>
    </section>
  );
}
