import { Button } from "@/components/ui/button";
import { ArrowRight, FileText } from "lucide-react";
import Image from "next/image";
import Section from "./base/Section";
import { QuoteModal } from "./QuoteModal";

const QuoteCta = () => {
  return (
    <Section className="py-6">
      <div className="relative overflow-hidden rounded-[2rem] px-6 py-16 md:py-20 lg:px-16 lg:py-24 shadow-2xl border border-slate-800">
        {/* Background Image */}
        <Image
          src="/assets/cta-pic.jpg"
          alt="cta-background"
          fill
          priority
          className="object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-slate-900/85" />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/80 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-primary" />
            Custom Manufacturing
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
            Need Custom Accessories for Your Next Collection?
          </h2>

          <p className="text-lg text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto">
            From personalized zipper pullers to precise plating finishes. Our
            in-house design team and manufacturing centers are ready to bring
            your brand's vision to life.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <QuoteModal>
              <Button size="lg">
                <FileText className="mr-2 h-5 w-5" />
                Request a Custom Quote
              </Button>
            </QuoteModal>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default QuoteCta;
