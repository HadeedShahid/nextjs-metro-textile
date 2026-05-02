import React from "react";
import Section from "./base/Section";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Building2, Globe2, MapPin, Briefcase } from "lucide-react";
import ContactActionGroup from "./common/ContactActionGroup";
import { cn } from "@/lib/utils";

const sisterConcerns = [
  { name: "Metro Metal", location: "China", flag: "🇨🇳" },
  { name: "Metro Company", location: "Hong Kong", flag: "🇭🇰" },
  { name: "Metro Textiles Sourcing", location: "Pakistan", flag: "🇵🇰" },
];

const countriesData: Record<string, string> = {
  Pakistan: "🇵🇰",
  "Hong Kong": "🇭🇰",
  China: "🇨🇳",
};

const GlobalPresence = () => {
  return (
    <Section title="Our Global Presence" className="py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Companies of the Group */}
        <Card className="h-full flex flex-col bg-slate-50/50 hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
              <Building2 className="w-6 h-6" />
            </div>
            <CardTitle className="text-2xl">Companies of the Group</CardTitle>
            <CardDescription className="text-base text-slate-500">
              Below is the list of our sister concerns, which are catering to
              the needs of our valuable clients, serving them for decades.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center">
            <ul className="space-y-4">
              {sisterConcerns.map((company, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white border shadow-sm"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-800">
                      {company.name}
                    </span>
                    <span className="text-sm text-slate-500 flex items-center gap-1.5 mt-0.5">
                      <span className="text-base leading-none">
                        {company.flag}
                      </span>{" "}
                      {company.location}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Our Presence */}
        <Card className="h-full flex flex-col bg-slate-50/50 hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
              <Globe2 className="w-6 h-6" />
            </div>
            <CardTitle className="text-2xl">Our Presence</CardTitle>
            <CardDescription className="text-base text-slate-500">
              We are currently operating in Asia and Europe. Our offices are
              located in the following countries.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
              {/* Business Presence */}
              <div className="bg-white p-5 rounded-lg border shadow-sm flex flex-col gap-3">
                <div className="flex items-center gap-2 text-primary font-semibold border-b pb-2">
                  <Briefcase className="w-5 h-5" />
                  Business Presence
                </div>
                <ul className="space-y-2 mt-2">
                  {["Pakistan", "Hong Kong", "China"].map((country, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-slate-700"
                    >
                      <span className="text-lg leading-none">
                        {countriesData[country]}
                      </span>
                      {country}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Operational Presence */}
              <div className="bg-white p-5 rounded-lg border shadow-sm flex flex-col gap-3">
                <div className="flex items-center gap-2 text-primary font-semibold border-b pb-2">
                  <Building2 className="w-5 h-5" />
                  Operational Presence
                </div>
                <ul className="space-y-2 mt-2">
                  {["China", "Pakistan"].map((country, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-slate-700"
                    >
                      <span className="text-lg leading-none">
                        {countriesData[country]}
                      </span>
                      {country}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Outro CTA */}
      <Card className="mt-8 bg-slate-100/80 border-slate-200 py-6 px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="flex-1 text-center md:text-left">
          <p className="text-lg md:text-xl font-medium text-slate-800">
            Ready to fulfill your accessories sourcing needs?
          </p>
          <p className="text-slate-600 mt-2 text-base md:text-sm lg:text-base max-w-3xl ">
            We bring decades of industry expertise to every client relationship.
            Whether you're sourcing accessories or exploring new partnerships,
            our dedicated professionals are here to deliver. Feel free to reach
            out or send us an inquiry anytime.
          </p>
        </div>

        <ContactActionGroup
          emailProps={{
            label: "Email Us",
          }}
          callProps={{
            label: "Call Us",
          }}
          whatsappProps={{
            label: "WhatsApp",
          }}
        />
      </Card>
    </Section>
  );
};

export default GlobalPresence;
