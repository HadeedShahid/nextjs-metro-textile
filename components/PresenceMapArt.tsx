import { COUNTRY_PATHS, MAP_VB } from "./presenceMapPaths";

/**
 * Static silver-gradient map art — server-rendered so the baked country
 * geometry never enters the client bundle. Rendered inside PresenceMap's
 * zoomable <g>.
 */
export default function PresenceMapArt() {
  return (
    <>
      <defs>
        <linearGradient id="pm-silver" x1="0" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#FBFCFE" />
          <stop offset="45%" stopColor="#E6EAF0" />
          <stop offset="100%" stopColor="#C9D0DA" />
        </linearGradient>
        <radialGradient id="pm-bg" cx="0.55" cy="0.4" r="0.75">
          <stop offset="0%" stopColor="#F6ECF7" />
          <stop offset="100%" stopColor="#FFFFFF" />
        </radialGradient>
      </defs>

      <rect width={MAP_VB.w} height={MAP_VB.h} fill="url(#pm-bg)" />

      <g>
        {COUNTRY_PATHS.map((d, i) => (
          <path key={i} d={d} fill="url(#pm-silver)" stroke="#fff" strokeWidth={0.8} />
        ))}
      </g>

      {/* Route linking the three hubs */}
      <path
        d="M256.9 169.3 Q400 90 557.2 108.3 M557.2 108.3 Q660 150 687.7 259.3"
        stroke="#7F2F82"
        strokeWidth="1.6"
        strokeDasharray="4 6"
        fill="none"
        opacity=".45"
      />
    </>
  );
}
