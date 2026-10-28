import Image from "next/image";

const STEPS = [
  {
    title: "Pre-production sample",
    body: "Made against your specification and sent for your approval.",
  },
  {
    title: "Sealed sample",
    body: "Signed off by you before bulk manufacturing begins.",
  },
  {
    title: "Bulk production",
    body: "Checked in-process against the sealed sample you approved.",
  },
  {
    title: "Pre-shipment inspection",
    body: "Every order inspected before packing. Your own inspectors are welcome.",
  },
];

/** One studio-lit object beside the four steps every order moves through. */
export default function ProcessBand() {
  return (
    <section aria-labelledby="process-title" className="py-24 md:py-32">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-[#f0eff2]">
          <Image
            src="/assets/home/studio-button.webp"
            alt="A dark wooden four-hole button, lit in the studio"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div>
          <h2 id="process-title" className="text-headline">
            Sampled. Sealed. Produced. Inspected.
          </h2>
          <p className="text-lede mt-4 max-w-xl text-muted-foreground">
            Every order moves through the same four steps, so the bulk run matches
            exactly what you approved.
          </p>
          <ol className="mt-10 border-t border-border">
            {STEPS.map((step) => (
              <li key={step.title} className="border-b border-border py-5">
                <h3 className="text-[1.1875rem] font-semibold tracking-[-0.02em]">{step.title}</h3>
                <p className="mt-1 text-[1.0625rem] leading-relaxed text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
