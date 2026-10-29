import Image from "next/image";
import { BadgeCheck, Factory, PencilRuler, SearchCheck } from "lucide-react";

const STEPS = [
  {
    Icon: PencilRuler,
    title: "Pre-production sample",
    body: "Made against your specification and sent for your approval.",
  },
  {
    Icon: BadgeCheck,
    title: "Sealed sample",
    body: "Signed off by you before bulk manufacturing begins.",
  },
  {
    Icon: Factory,
    title: "Bulk production",
    body: "Checked in-process against the sealed sample you approved.",
  },
  {
    Icon: SearchCheck,
    title: "Pre-shipment inspection",
    body: "Every order inspected before packing. Your own inspectors are welcome.",
  },
];

/** One studio-lit object beside the four steps every order moves through, each with its icon. */
export default function ProcessBand() {
  return (
    <section aria-labelledby="process-title" className="py-10 md:py-14 lg:py-16">
      <div className="container-x grid items-center gap-8 md:grid-cols-[2fr_3fr] md:gap-12">
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-[#f0eff2] md:aspect-[4/3]">
          <Image
            src="/assets/home/studio-button.webp"
            alt="A dark wooden four-hole button, lit in the studio"
            fill
            sizes="(max-width: 768px) 100vw, 30rem"
            className="object-cover"
          />
        </div>

        <div>
          <h2 id="process-title" className="text-headline">
            Sampled. Sealed. Produced. Inspected.
          </h2>
          <p className="text-lede mt-3 max-w-xl text-muted-foreground">
            Every order moves through the same four steps, so the bulk run matches
            exactly what you approved.
          </p>
          <ol className="mt-5 space-y-4">
            {STEPS.map(({ Icon, title, body }) => (
              <li key={title} className="flex gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">
                  <Icon className="size-[1.125rem]" strokeWidth={1.75} aria-hidden />
                </span>
                <div>
                  <h3 className="text-base font-semibold">{title}</h3>
                  <p className="text-sm text-muted-foreground">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
