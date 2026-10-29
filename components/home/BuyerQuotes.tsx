export type BuyerQuote = { quote: string; author: string; place: string };

/** Three buyer quotes side by side; they stack on phones. */
export default function BuyerQuotes({ quotes }: { quotes: BuyerQuote[] }) {
  return (
    <section aria-labelledby="quotes-title" className="bg-muted py-10 md:py-14 lg:py-16">
      <div className="container-x">
        <h2 id="quotes-title" className="text-headline max-w-3xl">
          What buyers say.
        </h2>
        <ul className="mt-6 grid gap-x-10 gap-y-8 md:mt-8 md:grid-cols-3">
          {quotes.map((q) => (
            <li key={q.author}>
              <figure className="flex h-full flex-col">
                <blockquote className="text-base leading-relaxed">
                  “{q.quote}”
                </blockquote>
                <figcaption className="mt-4 text-sm text-muted-foreground">
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
