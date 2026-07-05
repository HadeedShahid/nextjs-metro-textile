import { cn } from "@/lib/utils";
import React from "react";
import Text, { TextProps } from "./Text";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  title?: string;
  /** Small uppercase kicker above the title, brand purple — same treatment as the logo section. */
  eyebrow?: string;
  titleAs?: React.ElementType;
  titleClassName?: string;
  /** Extra classes for the header row — e.g. `main-container` when the section itself is full-bleed. */
  headerClassName?: string;
  headerAction?: React.ReactNode;
}

const Section = ({
  children,
  className,
  title,
  eyebrow,
  titleAs = "h2",
  titleClassName,
  headerClassName,
  headerAction,
  ...props
}: SectionProps) => {
  return (
    <section className={cn("flex flex-col gap-6", className)} {...props}>
      {(title || eyebrow || headerAction) && (
        <div className={cn("flex items-end justify-between gap-4", headerClassName)}>
          <div>
            {eyebrow && (
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-primary">
                {eyebrow}
              </p>
            )}
            {title && (
              <Text
                as={titleAs}
                className={cn(
                  "text-xl md:text-2xl font-bold tracking-tight text-slate-900",
                  titleClassName,
                )}
              >
                {title}
              </Text>
            )}
          </div>
          {headerAction}
        </div>
      )}
      {children}
    </section>
  );
};

export default Section;
