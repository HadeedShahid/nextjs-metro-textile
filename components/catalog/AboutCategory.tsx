/**
 * The page's search copy, set as a quiet two-column note: its keyword heading
 * on the left, the paragraph on the right. Category pages take both from Sanity.
 */
export default function AboutCategory({ heading, intro }: { heading: string; intro?: string | null }) {
  if (!intro) return null;

  return (
    <section aria-labelledby="about-title" className="bg-muted py-20 md:py-28">
      <div className="container-x grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <h2 id="about-title" className="text-title max-w-md text-balance">
          {heading}
        </h2>
        <p className="max-w-[68ch] text-[1.0625rem] leading-relaxed text-muted-foreground">{intro}</p>
      </div>
    </section>
  );
}
