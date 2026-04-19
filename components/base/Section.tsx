import { cn } from "@/lib/utils";
import React from "react";
import Text, { TextProps } from "./Text";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  title?: string;
  titleAs?: React.ElementType;
  titleClassName?: string;
  headerAction?: React.ReactNode;
}

const Section = ({
  children,
  className,
  title,
  titleAs = "h2",
  titleClassName,
  headerAction,
  ...props
}: SectionProps) => {
  return (
    <section className={cn("flex flex-col gap-6", className)} {...props}>
      {(title || headerAction) && (
        <div className="flex items-center justify-between">
          {title && (
            <Text
              as={titleAs}
              className={cn("text-3xl font-semibold", titleClassName)}
            >
              {title}
            </Text>
          )}
          {headerAction}
        </div>
      )}
      {children}
    </section>
  );
};

export default Section;
