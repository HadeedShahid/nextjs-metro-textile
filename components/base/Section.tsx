import { cn } from "@/lib/utils";
import React from "react";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

const Section = ({ children, className, ...props }: SectionProps) => {
  return (
    <section className={cn("flex flex-col gap-6", className)} {...props}>
      {children}
    </section>
  );
};

export default Section;
