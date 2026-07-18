import { Search, PencilRuler, Package, Truck } from "lucide-react";
import Section from "./base/Section";
import { QuoteModalButton } from "./QuoteModal";

const steps = [
  {
    icon: Search,
    title: "Choose your materials",
    description:
      "Browse our catalog of zippers, buttons, buckles and finishes tailored to your brand.",
  },
  {
    icon: PencilRuler,
    title: "Technical consulting",
    description:
      "Work with our production specialists on spec sheets and technical drawings.",
  },
  {
    icon: Package,
    title: "Quality-controlled sampling",
    description:
      "Get physical samples to verify finish and colour accuracy before you commit.",
  },
  {
    icon: Truck,
    title: "Production and delivery",
    description:
      "Sit back as your order is manufactured and delivered on time, every time.",
  },
];

export default function SourcingProcess() {
  return (
    <Section eyebrow="How it works" title="From first idea to delivered order">
      <ol className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {/* Connector line runs behind the step markers on desktop */}
        <div
          aria-hidden="true"
          className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-px bg-primary/20 lg:block"
        />

        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <li
              key={step.title}
              className="relative flex flex-col items-center text-center lg:px-2"
            >
              {/* Outlined marker — white fill, soft purple border, purple icon */}
              <div className="relative z-10 mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-primary/30 bg-white text-primary ring-4 ring-white">
                <Icon className="h-6 w-6" />
                <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-md bg-primary text-[11px] font-bold text-white ring-2 ring-white">
                  {index + 1}
                </span>
              </div>
              <h3 className="text-base font-semibold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                {step.description}
              </p>
            </li>
          );
        })}
      </ol>

      <div className="mt-4 flex justify-center">
        <QuoteModalButton size="lg" text="Start your order" />
      </div>
    </Section>
  );
}
