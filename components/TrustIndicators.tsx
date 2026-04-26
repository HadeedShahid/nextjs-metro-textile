import React from "react";

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "Global", label: "Sourcing" },
  { value: "100%", label: "Quality Assured" },
];

const TrustIndicators = () => {
  return (
    <div className="flex flex-row items-center justify-between lg:justify-start gap-2 lg:gap-12 mt-12 w-full border-t border-slate-100 pt-8">
      {stats.map((stat, index) => (
        <div key={index} className="text-center flex-1 lg:flex-none">
          <p className="text-3xl md:text-4xl font-bold text-slate-900">
            {stat.value}
          </p>
          <p className="text-[10px] sm:text-xs font-medium text-slate-500 mt-1 uppercase tracking-wider">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TrustIndicators;
