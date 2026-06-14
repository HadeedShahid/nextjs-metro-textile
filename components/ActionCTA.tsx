import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRightCircle } from "lucide-react";
import ContactActionGroup from "@/components/common/ContactActionGroup";

const brandLogos = [
  { src: "/assets/logos/levis-logo.webp", alt: "Levi's" },
  { src: "/assets/logos/diesel-logo.webp", alt: "Diesel" },
  { src: "/assets/logos/ck-logo.webp", alt: "Calvin Klein" },
  { src: "/assets/logos/pullbear-logo.webp", alt: "Pull & Bear" },
];

const ActionCTA = () => {
  return (
    <Card className="bg-white border-zinc-200 py-6 px-4 md:px-8 shadow-sm">
      <CardContent className="flex flex-col gap-6 w-full p-0">
        {/* Top row: avatars + tagline + explore button */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-5">
              {brandLogos.map((logo) => (
                <Image
                  key={logo.src}
                  src={logo.src}
                  alt={logo.alt}
                  width={80}
                  height={32}
                  className="h-6 w-auto object-contain grayscale opacity-60"
                />
              ))}
            </div>
            <p className="text-sm md:text-base font-medium text-slate-600">
              Align with Businesses that{" "}
              <span className="text-slate-900 font-bold underline decoration-purple-500 underline-offset-4">
                Choose Quality
              </span>
            </p>
          </div>
          <Button size="lg" href="/products">
            Explore Products
            <ChevronRightCircle className="w-5 h-5" />
          </Button>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-100" />

        {/* Bottom row: sourcing copy + contact buttons */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-lg md:text-xl font-medium text-slate-800">
              Ready to fulfill your accessories sourcing needs?
            </p>
            <p className="text-slate-500 mt-1 text-sm max-w-xl">
              Whether you're sourcing accessories or exploring new partnerships,
              our team is here to help. Reach out anytime.
            </p>
          </div>
          <ContactActionGroup
            emailProps={{ label: "Email Us" }}
            callProps={{ label: "Call Us" }}
            whatsappProps={{ label: "WhatsApp" }}
            className="shrink-0"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ActionCTA;
