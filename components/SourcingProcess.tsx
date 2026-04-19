import React from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import ActionCTA from "./ActionCTA";

const steps = [
  {
    number: "01.",
    title: "Choose a Plan",
    description: "Select the flexible or premium plan that suits your business needs",
  },
  {
    number: "02.",
    title: "Subscribe Instantly",
    description: "Activate your subscription with just a click - no forms, no hassle.",
  },
  {
    number: "03.",
    title: "Get Tailored Solutions",
    description: "Receive personalized products & support for your operations.",
  },
  {
    number: "04.",
    title: "Receive Your Supplies",
    description: "Sit back as your chemicals are delivered on time, every time.",
  },
];


import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";
import Section from "./base/Section";
import Text from "./base/Text";

export default function SourcingProcess() {
  return (
    <Section
      title="Sourcing Process"
    >

      {/* Steps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((step, index) => (
          <Card
            key={index}
            className="hover:shadow-md flex flex-col gap-12 justify-between"
          >
            <CardHeader>
              <span className="text-sm text-slate-500 font-medium">
                {step.number}
              </span>
              <CardTitle className="text-xl font-semibold">
                {step.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-500">
                {step.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

    </Section>
  );
}
