import { QuoteModalButton } from "@/components/QuoteModal";
import { cn } from "@/lib/utils";

/** Under a product grid: anything not listed can still be quoted. */
export default function CustomRequest({ quoteFor, className }: { quoteFor?: string; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-4 rounded-lg bg-muted p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8", className)}>
      <div>
        <h2 className="text-title">Need something that isn&apos;t listed?</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Send a drawing, a tech pack or a sample and we&apos;ll quote it to your spec.
        </p>
      </div>
      <QuoteModalButton product={quoteFor} size="default" className="sm:shrink-0" text="Request a quote" />
    </div>
  );
}
