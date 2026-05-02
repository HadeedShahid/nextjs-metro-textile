import React from "react";
import Image from "next/image";
import ContactSection from "@/components/ContactSection";
import GlobalPresence from "@/components/GlobalPresence";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ContactActionGroup from "@/components/common/ContactActionGroup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Send } from "lucide-react";

export default function ContactUsPage() {
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
                items={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
              />
            </div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-8">
              <div className="max-w-xl">
                <h1 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight">
                  Let's Build Something Great Together
                </h1>
                <p className="text-sm md:text-base text-primary-foreground/80">
                  Whether you have a question about our products, pricing, or
                  anything else, our team is ready to answer all your questions.
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
        <div className="grid md:grid-cols-5 gap-8 bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          {/* Left Side: Form */}
          <div className="md:col-span-3 p-8 md:p-12 lg:p-16">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                Send us a Message
              </h2>
              <p className="text-slate-500">
                Fill out the form below and we'll get back to you as soon as
                possible.
              </p>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    className="bg-slate-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    className="bg-slate-50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  className="bg-slate-50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company (Optional)</Label>
                <Input
                  id="company"
                  placeholder="Your Company Ltd."
                  className="bg-slate-50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="How can we help you today?"
                  className="min-h-[150px] bg-slate-50 resize-y"
                />
              </div>

              <Button type="button" size="lg" className="w-full sm:w-auto mt-4">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          </div>

          {/* Right Side: Graphic/Image */}
          <div className="md:col-span-2 relative min-h-[300px] md:min-h-full bg-slate-100 hidden md:block">
            <Image
              src="/assets/contact-bg.jpg"
              alt="Apparel Support and Tailoring"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-10">
              <div className="text-white">
                <h3 className="text-2xl font-bold mb-2">Dedicated Support</h3>
                <p className="text-white/80">
                  Our experts are available around the clock to provide you with
                  the best sourcing experience in the industry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <GlobalPresence />

      {/* Mobile Breadcrumbs before footer */}
      <div className="container mx-auto md:hidden flex justify-start">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
        />
      </div>
    </div>
  );
}
