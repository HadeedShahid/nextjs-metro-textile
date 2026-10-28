export type BuyerQuote = { quote: string; author: string; place: string };

/** Three buyer quotes set large, side by side; they stack on phones. */
export default function BuyerQuotes({ quotes }: { quotes: BuyerQuote[] }) {
  return (
    <section aria-labelledby="quotes-title" className="bg-muted py-24 md:py-32">
      <div className="container-x">
        <h2 id="quotes-title" className="text-headline max-w-3xl">
          What buyers say.
        </h2>
        <ul className="mt-12 grid gap-x-10 gap-y-14 md:mt-16 md:grid-cols-3">
          {quotes.map((q) => (
            <li key={q.author}>
              <figure className="flex h-full flex-col">
                <blockquote className="text-[clamp(1.25rem,1.7vw,1.5rem)] font-medium leading-[1.35] tracking-[-0.02em]">
                  “{q.quote}”
                </blockquote>
                <figcaption className="mt-6 text-[0.9375rem] text-muted-foreground">
                  <span className="block text-foreground">{q.author}</span>
                  {q.place}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
