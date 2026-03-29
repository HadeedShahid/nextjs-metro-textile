"use client";

import React from "react";
import Image from "next/image";
import { Play, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const VideoSection = () => {
  return (
    <section className="relative w-full py-12 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="relative aspect-video w-full rounded-[2rem] md:rounded-[3rem] overflow-hidden group shadow-2xl">
        {/* Placeholder Video Thumbnail */}
        <Image
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
          alt="Video Showcase"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />

        {/* Play Button Overlay */}
        <div className="absolute top-8 left-8 md:top-12 md:left-12">
          <Button
            size="lg"
            className="bg-white/90 hover:bg-white text-black rounded-full h-12 md:h-14 pl-2 pr-6 flex items-center gap-3 backdrop-blur-md border-none shadow-xl transition-all hover:scale-105"
          >
            <div className="bg-slate-100 rounded-full p-2">
              <Play className="w-4 h-4 fill-black" />
            </div>
            <span className="font-bold text-sm tracking-tight">Play</span>
          </Button>
        </div>

      </div>

    </section>
  );
};

export default VideoSection;
