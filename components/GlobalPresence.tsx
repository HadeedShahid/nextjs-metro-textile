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

import { FlagCN, FlagHK, FlagPK } from "@/icons";

const flagClass = "w-5 h-auto rounded-[2px] shrink-0";
const flagClassPK = `${flagClass} border border-slate-200`;

const sisterConcerns = [
  { name: "Metro Metal", location: "China", Flag: <FlagCN className={flagClass} /> },
  { name: "Metro Company", location: "Hong Kong", Flag: <FlagHK className={flagClass} /> },
  { name: "Metro Textiles Sourcing", location: "Pakistan", Flag: <FlagPK className={flagClassPK} /> },
];

const countriesData: Record<string, React.ReactNode> = {
  Pakistan: <FlagPK className={flagClassPK} />,
  "Hong Kong": <FlagHK className={flagClass} />,
  China: <FlagCN className={flagClass} />,
};

const GlobalPresence = () => {
  return (
    <Section title="Our Global Presence" className="py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Companies of the Group */}
        <Card className="h-full flex flex-col bg-white hover:shadow-md transition-shadow">
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
                      {company.Flag}
                      {company.location}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Our Presence */}
        <Card className="h-full flex flex-col bg-white hover:shadow-md transition-shadow">
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
                      {countriesData[country]}
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
                      {countriesData[country]}
                      {country}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

    </Section>
  );
};

export default GlobalPresence;
