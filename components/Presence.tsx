import { COUNTRY_PATHS, MAP_VB, PIN_COORDS } from "./presenceMapPaths";
import SectionIntro from "./base/SectionIntro";
import { cn } from "@/lib/utils";

// Pins are real projected geography, written by scripts/generate-presence-map.mjs.
const HUBS = [
  { country: "Pakistan", company: "Metro Textiles Sourcing", role: "Business and operations" },
  { country: "China", company: "Metro Metal", role: "Business and operations" },
  { country: "Hong Kong", company: "Metro Company", role: "Business" },
].map((hub) => ({ ...hub, x: PIN_COORDS[hub.country][0], y: PIN_COORDS[hub.country][1] }));

/** The group's three hubs: a quiet aluminium map and three named columns. */
export default function Presence({ className }: { className?: string }) {
  return (
    <section aria-labelledby="presence-title" className={cn("py-10 md:py-14 lg:py-16", className)}>
      <div className="container-x">
        <SectionIntro
          id="presence-title"
          title="Three countries. One supply line."
          lede="The Metro group works across Pakistan, China and Hong Kong, from first sample to shipment."
        />

        <svg
          viewBox={`0 0 ${MAP_VB.w} ${MAP_VB.h}`}
          role="img"
          aria-label="Map of Asia marking Metro hubs in Pakistan, China and Hong Kong"
          className="mx-auto mt-6 w-full max-w-3xl md:mt-8"
        >
          <g>
            {COUNTRY_PATHS.map((d, i) => (
              <path key={i} d={d} fill="#e3e3e8" stroke="#ffffff" strokeWidth={0.8} />
            ))}
          </g>
          <path
            d="M256.9 169.3 Q400 90 557.2 108.3 M557.2 108.3 Q660 150 687.7 259.3"
            stroke="#1d1d1f"
            strokeWidth="1.2"
            strokeDasharray="3 6"
            fill="none"
            opacity=".35"
          />
          {HUBS.map((hub) => (
            <g key={hub.country}>
              <circle cx={hub.x} cy={hub.y} r="9" fill="#7f2f82" opacity=".14" />
              <circle cx={hub.x} cy={hub.y} r="3.5" fill="#7f2f82" />
            </g>
          ))}
        </svg>

        <ul className="mt-8 grid gap-6 border-t border-border pt-6 sm:grid-cols-3">
          {HUBS.map((hub) => (
            <li key={hub.country}>
              <p className="text-title">{hub.country}</p>
              <p className="mt-1 text-base">{hub.company}</p>
              <p className="text-sm text-muted-foreground">{hub.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
