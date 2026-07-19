import Section from "./base/Section";
import { sourcingSteps } from "./sourcingSteps";
import SourcingStepsCarousel from "./SourcingStepsCarousel";

export default function SourcingProcess() {
  return (
    <Section eyebrow="How it works" title="From first idea to delivered order">
      {/* Desktop: horizontal journey path */}
      <ol className="relative hidden gap-6 lg:grid lg:grid-cols-4">
        {/* Connector line runs behind the step markers */}
        <div
          aria-hidden="true"
          className="absolute left-[12.5%] right-[12.5%] top-7 h-px bg-primary/20"
        />

        {sourcingSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <li
              key={step.title}
              className="relative flex flex-col items-center px-2 text-center"
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

      {/* Mobile: compact auto-advancing carousel */}
      <div className="lg:hidden">
        <SourcingStepsCarousel />
      </div>
    </Section>
  );
}
