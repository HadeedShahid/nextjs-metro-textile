import { ClipboardCheck, Clock, Globe, Stamp } from "lucide-react";

// Each line repeats a promise the site already makes elsewhere: the made-to-
// mark band, the four-step process, the contact page and the closing band.
const POINTS = [
  { Icon: Stamp, label: "Your logo, your finish" },
  { Icon: ClipboardCheck, label: "Sample approved before bulk" },
  { Icon: Clock, label: "Replies within 24 hours" },
  { Icon: Globe, label: "Shipped worldwide" },
];

/**
 * What every order gets, in four short lines a buyer can take in at a glance:
 * two by two on phones, then one row spread to the container edges, in line
 * with the logo row beneath it.
 */
export default function TrustRow() {
  return (
    <section aria-label="What every order gets" className="border-b border-border">
      <ul className="container-x grid grid-cols-2 gap-x-4 gap-y-3 py-4 md:flex md:justify-between md:gap-x-6 md:py-5">
        {POINTS.map(({ Icon, label }) => (
          <li key={label} className="flex items-center gap-2.5">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-foreground">
              <Icon className="size-[1.125rem]" strokeWidth={1.75} aria-hidden />
            </span>
            <span className="text-sm font-medium leading-snug">{label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
