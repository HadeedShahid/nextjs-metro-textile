import React from "react";
import Image from "next/image";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import GlobalPresence from "@/components/GlobalPresence";
import ContactActionGroup from "@/components/common/ContactActionGroup";
import Clients from "@/components/clients";

export default function AboutUsPage() {
  const clients = [
    "New Yorker",
    "Arma",
    "New Look",
    "Citizens",
    "Kaparol",
    "Tigha",
    "Pull & Bear",
    "Cordon",
    "South Pole",
    "MNG",
  ];

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
                items={[{ label: "Home", href: "/" }, { label: "About Us" }]}
              />
            </div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-8">
              <div className="max-w-xl">
                <h1 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight">
                  About Metro Metal
                </h1>
                <p className="text-sm md:text-base text-primary-foreground/80">
                  Your trusted partner in the global leather and textile
                  industry. We provide premium accessories to the global soft
                  and hard goods industry.
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

      <div className="container mx-auto px-4 -mt-12 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 p-8 md:p-12 lg:p-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Section */}
            <div className="space-y-6">
              <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-semibold text-sm rounded-full mb-2">
                Company Profile
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                Decades of Excellence in Manufacturing
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed md:text-lg">
                <p>
                  Metro Metal is a partner to the global leather and textile
                  industry. We provide accessories to the global soft and hard
                  goods industry. Our company is based in China and has been
                  catering to our clients and exporting accessories all over the
                  world for decades.
                </p>
                <p>
                  We have a very strong global network through which we cater
                  the needs of our clients. We have our business presence in
                  Asia and Europe.
                </p>
                <p>
                  All of the manufacturing units are{" "}
                  <strong className="text-slate-800 font-semibold">
                    ISO 9002 certified
                  </strong>{" "}
                  and our all products are according to{" "}
                  <strong className="text-slate-800 font-semibold">
                    Oeko-Tex standard
                  </strong>{" "}
                  and carry an excellent track record of timely delivery. We
                  carry state-of-the-art technology and special emphasis on
                  design, higher quality and value-added activities.
                </p>
              </div>
            </div>

            {/* Image Section */}
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-lg border border-slate-100">
              <Image
                src="/assets/about-us.jpg"
                alt="Metro Metal Manufacturing"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Clients Section */}
      <div className="container mx-auto px-4 mt-16 mb-8 text-center">
        <h3 className="text-2xl font-bold text-slate-900 mb-8">
          Trusted by Global Brands
        </h3>
        <Clients />
      </div>

      {/* Reusing Global Presence Component */}
      <div className="mt-8">
        <GlobalPresence />
      </div>

      {/* Mobile Breadcrumbs before footer */}
      <div className="container mx-auto md:hidden flex justify-start">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "About Us" }]}
        />
      </div>
    </div>
  );
}
