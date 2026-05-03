import React from "react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import GlobalPresence from "@/components/GlobalPresence";
import ComplianceSection from "@/components/ComplianceSection";
import ContactActionGroup from "@/components/common/ContactActionGroup";
import { CheckCircle2, ShieldCheck, Leaf } from "lucide-react";

export default function CompliancePage() {
  return (
    <div className="min-h-screen bg-white pb-12">
      <div className="container mx-auto">
        {/* Hero Header */}
        <div className="relative bg-primary/90 overflow-hidden text-white pt-8 pb-20 md:pt-10 md:pb-24 rounded-3xl">
          <div className="absolute inset-0 opacity-20">
            <svg
              className="h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" />
            </svg>
          </div>
          <div className="container mx-auto px-6 md:px-12 relative z-10 text-left">
            <div className="mb-6 hidden md:inline-block [&_ol]:text-white/70 [&_a]:text-white/90 [&_a:hover]:text-white [&_[aria-current]]:text-white">
              <Breadcrumbs
                items={[{ label: "Home", href: "/" }, { label: "Compliance" }]}
              />
            </div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-8">
              <div className="max-w-xl">
                <h1 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight">
                  Compliance & Certifications
                </h1>
                <p className="text-sm md:text-base text-primary-foreground/80">
                  Uncompromising commitment to global manufacturing standards, ethical sourcing, and environmental sustainability.
                </p>
              </div>

              <div className="shrink-0">
                <ContactActionGroup
                  className="justify-start md:justify-end gap-3 flex-wrap"
                  emailProps={{
                    label: "Email Us",
                    className:
                      "bg-white text-primary hover:bg-slate-100 border-none shadow-md",
                  }}
                  callProps={{
                    label: "Call Us",
                    className:
                      "bg-white text-primary hover:bg-slate-100 border-none shadow-md",
                  }}
                  whatsappProps={{
                    label: "WhatsApp",
                    className:
                      "bg-[#25D366] text-white hover:bg-[#20bd5a] border-none shadow-md",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Compliance Component */}
      <div className="container mx-auto -mt-12 relative z-20 px-4">
        <ComplianceSection className="bg-white rounded-3xl shadow-xl border border-slate-100 py-12 md:py-16" />
      </div>

      {/* Additional Policies Section */}
      <div className="container mx-auto px-4 mt-20 mb-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-4">Our Guiding Principles</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Beyond standard certifications, Metro Metal operates on a foundation of ethical practices, environmental care, and uncompromising quality assurance.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
            <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
              <ShieldCheck className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3">Ethical Sourcing</h3>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed">
              We ensure fair labor practices and safe working conditions across our entire global supply chain. All partners must adhere strictly to our code of conduct.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
            <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
              <CheckCircle2 className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3">Quality Assurance</h3>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed">
              Every batch undergoes rigorous multi-point inspections. Our in-house testing labs guarantee that all materials exceed international durability standards.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
            <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
              <Leaf className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3">Environmental Care</h3>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed">
              We are transitioning to sustainable production methods, minimizing water waste and adopting eco-friendly dyes to reduce our carbon footprint globally.
            </p>
          </div>
        </div>
      </div>

      <GlobalPresence />

      {/* Mobile Breadcrumbs before footer */}
      <div className="container mx-auto md:hidden flex justify-start mt-8 mb-4 px-4 text-slate-500">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Compliance" }]} />
      </div>
    </div>
  );
}
