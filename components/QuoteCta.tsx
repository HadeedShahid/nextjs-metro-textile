import { Button } from "@/components/ui/button";
import { ArrowRight, FileText } from "lucide-react";
import Section from "./base/Section";
import { QuoteModal } from "./QuoteModal";

const QuoteCta = () => {
  return (
    <Section className="py-6">
      <div className="relative overflow-hidden rounded-[2rem] bg-slate-900 px-6 py-16 md:py-20 lg:px-16 lg:py-24 shadow-2xl border border-slate-800">
        {/* Subtle decorative ambient glow */}
        <div className="absolute -top-32 -right-32 h-[30rem] w-[30rem] rounded-full bg-[#7f2f82]/30 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 h-[30rem] w-[30rem] rounded-full bg-[#7f2f82]/20 blur-[120px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/80 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-primary" />
            Custom Manufacturing
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
            Need Custom Accessories for Your Next Collection?
          </h2>
          
          <p className="text-lg text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto">
            From personalized zipper pullers to precise plating finishes. Our in-house design team and manufacturing centers are ready to bring your brand's vision to life.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <QuoteModal>
              <Button size="lg" className="w-full sm:w-auto bg-[#7f2f82] hover:bg-[#6a276d] text-white rounded-full h-14 px-8 text-base shadow-lg shadow-[#7f2f82]/20 transition-all hover:scale-105">
                <FileText className="mr-2 h-5 w-5" />
                Request a Custom Quote
              </Button>
            </QuoteModal>
            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-slate-600 text-white hover:bg-white/10 rounded-full h-14 px-8 text-base transition-all">
              View Product Specs
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default QuoteCta;
