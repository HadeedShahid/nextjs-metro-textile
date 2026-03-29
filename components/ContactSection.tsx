import React from "react";
import { 
  Calendar, 
  MessageSquare, 
  AtSign, 
  Phone, 
  ExternalLink, 
  ArrowRight, 
  CheckCircle2 
} from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

const ContactSection = () => {
  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Schedule an Interview */}
        <div className="md:col-span-2 bg-slate-50/50 border border-slate-100 rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between group overflow-hidden relative">
          <div className="space-y-6 relative z-10">
            <div className="bg-[#7F2F82] w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg shadow-purple-900/20">
              <Calendar className="w-6 h-6" />
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">
              Schedule an Interview
            </h2>
            <p className="text-slate-500 max-w-md leading-relaxed text-lg font-medium">
              Book a dedicated technical session via Calendly to discuss material sourcing, logistics, and compliance standards with our production lead.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-12 relative z-10">
            <Button
              className="bg-[#7F2F82] hover:bg-[#6b266e] text-white px-8 py-7 rounded-2xl flex items-center gap-3 font-bold text-lg shadow-2xl shadow-purple-900/20 transition-all hover:scale-105 active:scale-95 group-hover:-translate-y-1"
            >
              Open Calendly
              <ExternalLink className="w-5 h-5 opacity-70" />
            </Button>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full border border-slate-100">
              <CheckCircle2 className="w-5 h-5 text-purple-600" />
              <span className="text-purple-900 font-black text-sm uppercase tracking-wider">
                Instant Confirmation
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Chat on WhatsApp */}
        <div className="bg-slate-100/60 border border-slate-200 rounded-[2.5rem] p-8 md:p-10 flex flex-col items-start min-h-[400px]">
          <div className="bg-[#7F2F82] w-12 h-12 rounded-xl flex items-center justify-center text-white mb-8">
            <MessageSquare className="w-6 h-6 fill-white" />
          </div>
          <h3 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 mb-4">
            Chat on WhatsApp
          </h3>
          <p className="text-slate-500 leading-relaxed font-medium mb-12">
            Direct line for active project updates and rapid-response manufacturing inquiries.
          </p>
          <a
            href="#"
            className="mt-auto group flex items-center gap-3 text-purple-700 font-black text-xl hover:text-purple-900 transition-all underline decoration-2 underline-offset-8"
          >
            Start Chat
            <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
          </a>
        </div>

        {/* Card 3: Email Us */}
        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-10 flex flex-col shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
          <div className="text-purple-600 mb-8 transform transition-transform group-hover:scale-110 group-hover:rotate-12 duration-500">
            <AtSign className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black tracking-tight text-slate-900 mb-4">
            Email Us
          </h3>
          <p className="text-slate-500 leading-relaxed font-medium mb-12">
            Formal proposals, RFP submissions, and documentation exchanges.
          </p>
          <div className="mt-auto space-y-2">
            <span className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">
              General Inquiries
            </span>
            <a
              href="mailto:hello@metrotextile.com"
              className="block text-slate-900 font-black text-xl hover:text-purple-700 transition-colors"
            >
              hello@metrotextile.com
            </a>
          </div>
        </div>

        {/* Card 4: Call Now */}
        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-10 flex flex-col shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
          <div className="text-purple-600 mb-8 transform transition-transform group-hover:scale-110 group-hover:rotate-12 duration-500">
            <Phone className="w-10 h-10 fill-purple-600" />
          </div>
          <h3 className="text-2xl font-black tracking-tight text-slate-900 mb-4">
            Call Now
          </h3>
          <p className="text-slate-500 leading-relaxed font-medium mb-12">
            Speak directly with our regional manufacturing consultants.
          </p>
          <div className="mt-auto space-y-2">
            <span className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">
              HQ Office
            </span>
            <a
              href="tel:+15550000000"
              className="block text-slate-900 font-black text-xl hover:text-purple-700 transition-colors"
            >
              +1 (555) 000-0000
            </a>
          </div>
        </div>

        {/* Card 5: Image Section */}
        <div className="relative rounded-[2.5rem] overflow-hidden group min-h-[300px]">
          <Image
            src="https://images.unsplash.com/photo-1549416878-b9ca95e26903?q=80&w=2070&auto=format&fit=crop"
            alt="Metro Quality"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500" />
          <div className="absolute bottom-6 left-6">
            <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-lg border border-white/10">
              Metro Quality
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;
