import React from "react";
import {
  MessageSquare,
  AtSign,
  Phone,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "./ui/button";
import Section from "./base/Section";
import Text from "./base/Text";

const ContactSection = () => {
  return (
    <Section>
      <Text as="h2" className="text-4xl font-semibold flex">
        We&apos;d Love to Hear From You
      </Text>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-12">
        {/* Card 1: Email Support */}
        <div className="flex flex-col items-start group">
          <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-900 mb-6 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all duration-300">
            <AtSign className="w-5 h-5" />
          </div>
          <Text className="text-lg font-bold text-slate-900 mb-2">Email Support</Text>
          <p className="text-sm text-slate-500 font-medium mb-4">Our team can respond in real time.</p>
          <Button href="mailto:hello@metrotextile.com">
            hello@metrotextile.com
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Button>
        </div>

        {/* Card 2: WhatsApp */}
        <div className="flex flex-col items-start group">
          <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-900 mb-6 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all duration-300">
            <MessageSquare className="w-5 h-5" />
          </div>
          <Text className="text-lg font-bold text-slate-900 mb-2">WhatsApp</Text>
          <p className="text-sm text-slate-500 font-medium mb-4">Chat with our specialists.</p>
          <Button href="https://wa.me/15550000000">
            Start Chat Now
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Button>
        </div>

        {/* Card 3: Call Us Directly */}
        <div className="flex flex-col items-start group">
          <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-900 mb-6 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all duration-300">
            <Phone className="w-5 h-5" />
          </div>
          <Text className="text-lg font-bold text-slate-900 mb-2">Call Us Directly</Text>
          <p className="text-sm text-slate-500 font-medium mb-4">Available during working hours.</p>
          <Button href="tel:+15550000000">
            +1 (555) 000-0000
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Button>
        </div>

        {/* Card 4: Visit Our Office */}
        <div className="flex flex-col items-start group">
          <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-900 mb-6 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all duration-300">
            <MapPin className="w-5 h-5" />
          </div>
          <Text className="text-lg font-bold text-slate-900 mb-2">Visit Our Office</Text>
          <p className="text-sm text-slate-500 font-medium mb-4">Visit our location in real life.</p>
          <Button href="https://maps.google.com/?q=221b+Elementary+Avenue,+NY" >
            221b Elementary Avenue, NY
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default ContactSection;
