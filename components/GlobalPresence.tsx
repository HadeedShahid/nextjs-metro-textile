import React from "react";
import Section from "./base/Section";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Building2, Globe2, Briefcase } from "lucide-react";
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

/** Full two-card layout — used on the About, Compliance and Contact pages. */
function DetailedPresence() {
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
}

type Role = "business" | "operational";

const flagBase = "h-8 w-auto rounded-[4px] overflow-hidden shrink-0";

const locations: {
  country: string;
  company: string;
  Flag: React.ReactNode;
  roles: Role[];
}[] = [
  {
    country: "China",
    company: "Metro Metal",
    Flag: <FlagCN className={flagBase} />,
    roles: ["business", "operational"],
  },
  {
    country: "Pakistan",
    company: "Metro Textiles Sourcing",
    Flag: <FlagPK className={`${flagBase} border border-slate-200`} />,
    roles: ["business", "operational"],
  },
  {
    country: "Hong Kong",
    company: "Metro Company",
    Flag: <FlagHK className={flagBase} />,
    roles: ["business"],
  },
];

const roleMeta: Record<Role, { label: string; icon: React.ReactNode; className: string }> = {
  business: {
    label: "Business",
    icon: <Briefcase className="h-3 w-3" />,
    className: "bg-primary/10 text-primary",
  },
  operational: {
    label: "Operational",
    icon: <Building2 className="h-3 w-3" />,
    className: "bg-emerald-50 text-emerald-700",
  },
};

/** Condensed single-row layout — used on the landing page. */
function CompactPresence() {
  return (
    <Section
      eyebrow="Global presence"
      title="Our Global Presence"
      className="py-12"
    >
      <p className="-mt-2 max-w-2xl text-sm text-slate-500">
        Our sister concerns have catered to clients for decades, operating across
        Asia and Europe.
      </p>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {locations.map((loc) => (
          <li
            key={loc.country}
            className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              {loc.Flag}
              <div>
                <p className="text-base font-semibold text-slate-900">
                  {loc.country}
                </p>
                <p className="text-sm text-slate-500">{loc.company}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {loc.roles.map((role) => {
                const meta = roleMeta[role];
                return (
                  <span
                    key={role}
                    className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium ${meta.className}`}
                  >
                    {meta.icon}
                    {meta.label}
                  </span>
                );
              })}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

const GlobalPresence = ({
  variant = "detailed",
}: {
  variant?: "detailed" | "compact";
}) => {
  return variant === "compact" ? <CompactPresence /> : <DetailedPresence />;
};

export default GlobalPresence;
