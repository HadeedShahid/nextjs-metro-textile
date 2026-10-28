import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionIntroProps {
  title: string;
  lede?: React.ReactNode;
  action?: { href: string; label: string };
  align?: "left" | "center";
  tone?: "light" | "die";
  /** Heading level; sections default to h2. */
  as?: "h1" | "h2";
  id?: string;
  className?: string;
}

/**
 * A section's opening: a large statement heading, an optional one-line lede
 * and a quiet "›" link. No eyebrow labels; the heading carries the weight.
 */
export default function SectionIntro({
  title,
  lede,
  action,
  align = "left",
  tone = "light",
  as: Heading = "h2",
  id,
  className,
}: SectionIntroProps) {
  const centered = align === "center";
  return (
    // The outer box takes the caller's layout (often container-x); the inner
    // one caps the measure, so a left-aligned intro stays on the page edge.
    <div className={className}>
      <div className={cn("flex max-w-3xl flex-col gap-4", centered && "mx-auto items-center text-center")}>
        <Heading id={id} className="text-headline">
          {title}
        </Heading>
        {lede && (
          <p
            className={cn(
              "text-lede max-w-2xl",
              tone === "die" ? "text-die-muted" : "text-muted-foreground",
            )}
          >
            {lede}
          </p>
        )}
        {action && (
          <Link
            href={action.href}
            className={cn(
              "group mt-1 inline-flex items-center gap-0.5 text-[1.0625rem] hover:underline",
              tone === "die" ? "text-die-foreground" : "text-primary",
            )}
          >
            {action.label}
            <ChevronRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>
    </div>
  );
}
