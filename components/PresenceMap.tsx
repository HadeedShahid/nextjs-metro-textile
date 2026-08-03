"use client";

import * as React from "react";
import { Briefcase, Factory } from "lucide-react";
import { FlagCN, FlagHK, FlagPK } from "@/icons";
import { cn } from "@/lib/utils";

type Role = "business" | "operational";

/** viewBox is 960×320 — pin coords come from scripts/generate-presence-map.mjs
 *  (real projected geography), hardcoded here so the baked country paths never
 *  enter the client bundle. */
const VB = { w: 960, h: 320 };

const locations = [
  {
    country: "China",
    company: "Metro Metal",
    Flag: FlagCN,
    roles: ["business", "operational"] as Role[],
    x: 557.2,
    y: 108.3,
  },
  {
    country: "Pakistan",
    company: "Metro Textiles Sourcing",
    Flag: FlagPK,
    roles: ["business", "operational"] as Role[],
    x: 256.9,
    y: 169.3,
  },
  {
    country: "Hong Kong",
    company: "Metro Company",
    Flag: FlagHK,
    roles: ["business"] as Role[],
    x: 687.7,
    y: 259.3,
  },
];

const roleMeta: Record<Role, { label: string; Icon: typeof Briefcase; className: string }> = {
  business: { label: "Business", Icon: Briefcase, className: "bg-primary/10 text-primary" },
  operational: { label: "Operational", Icon: Factory, className: "bg-emerald-50 text-emerald-700" },
};

function RoleBadges({ roles }: { roles: Role[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {roles.map((role) => {
        const { label, Icon, className } = roleMeta[role];
        return (
          <span
            key={role}
            className={cn(
              "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium",
              className,
            )}
          >
            <Icon className="h-3 w-3" />
            {label}
          </span>
        );
      })}
    </div>
  );
}

export default function PresenceMap({ mapArt }: { mapArt: React.ReactNode }) {
  const [active, setActive] = React.useState<string | null>(null);
  const [hovered, setHovered] = React.useState<string | null>(null);
  // Sticks at the last focused pin so zooming back out scales around the same
  // point — swapping the origin mid-transition is what caused a visible jerk.
  const [origin, setOrigin] = React.useState<[number, number] | null>(null);

  // Tooltip follows hover; falls back to the card-selected country.
  const tipFor = hovered ?? active;
  const tip = locations.find((l) => l.country === tipFor);
  const focus = locations.find((l) => l.country === active);

  const toggleCountry = (country: string) => {
    if (active === country) {
      setActive(null); // leave `origin` alone so the zoom-out stays anchored
      return;
    }
    const loc = locations.find((l) => l.country === country);
    if (loc) setOrigin([loc.x, loc.y]);
    setActive(country);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Company cards — clicking one focuses its country on the map */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {locations.map((loc) => (
          <button
            key={loc.country}
            type="button"
            onClick={() => toggleCountry(loc.country)}
            aria-pressed={active === loc.country}
            className={cn(
              "rounded-xl border bg-white p-4 text-left shadow-sm transition-colors",
              active === loc.country
                ? "border-primary/50 shadow-md"
                : "border-slate-200 hover:border-primary/30",
            )}
          >
            <div className="flex items-center gap-3">
              <loc.Flag className="h-6 w-auto shrink-0 overflow-hidden rounded-[4px]" />
              <div>
                <p className="text-base font-semibold leading-tight text-slate-900">
                  {loc.country}
                </p>
                <p className="text-sm text-slate-500">{loc.company}</p>
              </div>
            </div>
            <div className="mt-2.5">
              <RoleBadges roles={loc.roles} />
            </div>
          </button>
        ))}
      </div>

      {/* Map — desktop only. At phone widths the 3:1 band is too short for
          legible labels, and the cards above already carry every detail. */}
      <div
        className="relative hidden overflow-hidden rounded-xl border border-slate-200 bg-white md:block"
        onClick={() => setActive(null)}
      >
        {/* Aspect locked to the viewBox so the HTML pin overlays stay aligned */}
        <div className="relative aspect-[3/1] w-full">
          <svg
            viewBox={`0 0 ${VB.w} ${VB.h}`}
            className="h-full w-full"
            preserveAspectRatio="xMidYMid meet"
            aria-label="Map of Asia showing Metro Metal locations in Pakistan, China and Hong Kong"
          >
            {/* Everything zooms toward the focused pin */}
            <g
              className="motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out"
              style={{
                transform: focus ? "scale(1.45)" : "scale(1)",
                transformOrigin: origin ? `${origin[0]}px ${origin[1]}px` : "center",
              }}
            >
              {/* Server-rendered silver country geometry */}
              {mapArt}

              {locations.map((loc) => {
                const lit = active === loc.country || hovered === loc.country;
                const dimmed = focus && active !== loc.country;
                return (
                  <g
                    key={loc.country}
                    className="transition-opacity duration-300"
                    opacity={dimmed ? 0.35 : 1}
                  >
                    <circle cx={loc.x} cy={loc.y} r={lit ? 15 : 11} fill="#7F2F82" opacity={lit ? 0.22 : 0.14} className="transition-all duration-300" />
                    <circle cx={loc.x} cy={loc.y} r="4.5" fill="#7F2F82" />
                    <circle cx={loc.x} cy={loc.y} r="4.5" fill="none" stroke="#fff" strokeWidth="1.5" />
                    <text
                      x={loc.x}
                      y={loc.country === "China" ? loc.y - 15 : loc.y + 24}
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="500"
                      letterSpacing="0.3"
                      fill="#5B3560"
                      stroke="#fff"
                      strokeWidth="2.6"
                      paintOrder="stroke"
                    >
                      {loc.country}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>

          {/* Invisible hit targets over each pin — hover/tap for the tooltip */}
          {locations.map((loc) => (
            <button
              key={loc.country}
              type="button"
              aria-label={`${loc.country} — ${loc.company}`}
              onMouseEnter={() => setHovered(loc.country)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(loc.country)}
              onBlur={() => setHovered(null)}
              onClick={(e) => {
                e.stopPropagation();
                toggleCountry(loc.country);
              }}
              className="absolute h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                left: `${(loc.x / VB.w) * 100}%`,
                top: `${(loc.y / VB.h) * 100}%`,
              }}
            />
          ))}

          {/* Tooltip */}
          {tip && (
            <div
              className="pointer-events-none absolute z-10 w-52 -translate-x-1/2 rounded-lg border border-slate-200 bg-white p-3 shadow-md"
              style={{
                left: `${(tip.x / VB.w) * 100}%`,
                top: `${(tip.y / VB.h) * 100}%`,
                transform: "translate(-50%, calc(-100% - 18px))",
              }}
            >
              <div className="flex items-center gap-2">
                <tip.Flag className="h-5 w-auto shrink-0 overflow-hidden rounded-[3px]" />
                <div>
                  <p className="text-sm font-semibold leading-tight text-slate-900">
                    {tip.country}
                  </p>
                  <p className="text-xs text-slate-500">{tip.company}</p>
                </div>
              </div>
              <div className="mt-2">
                <RoleBadges roles={tip.roles} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
