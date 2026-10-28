import * as React from "react";
import Link from "next/link";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Pills that press like a die: a 1px deboss on :active, an ink ring on focus.
  "group/button inline-flex shrink-0 items-center justify-center rounded-full border border-transparent bg-clip-padding font-medium tracking-[-0.01em] whitespace-nowrap transition-[background-color,color,border-color,box-shadow,transform] duration-200 ease-out select-none active:translate-y-px active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.25)] disabled:pointer-events-none disabled:opacity-40 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-[color-mix(in_oklab,var(--primary)_88%,black)]",
        ink: "bg-foreground text-background hover:bg-[#3a3a3c]",
        light: "bg-white text-foreground hover:bg-[#e8e8ed]",
        outline:
          "border-[#d2d2d7] bg-transparent text-foreground hover:border-foreground/40 hover:bg-foreground/[0.03] aria-expanded:bg-muted",
        secondary:
          "bg-muted text-foreground hover:bg-[#e8e8ed] aria-expanded:bg-[#e8e8ed]",
        ghost:
          "text-foreground hover:bg-foreground/[0.05] aria-expanded:bg-foreground/[0.05]",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20",
        link: "rounded-none px-0 text-primary hover:underline active:translate-y-0 active:shadow-none",
      },
      size: {
        default: "h-10 gap-1.5 px-5 text-[0.9375rem]",
        xs: "h-7 gap-1 px-3 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1 px-3.5 text-sm",
        lg: "h-12 gap-2 px-7 text-[1.0625rem] [&_svg:not([class*='size-'])]:size-5",
        icon: "size-10",
        "icon-xs": "size-7 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  href?: string;
  external?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      href,
      external = false,
      ...props
    },
    ref,
  ) => {
    if (href) {
      return (
        <Link
          href={href}
          className={cn(buttonVariants({ variant, size, className }))}
          {...(external && { target: "_blank", rel: "noopener noreferrer" })}
          {...(props as any)}
        />
      );
    }

    return (
      <ButtonPrimitive
        ref={ref}
        data-slot="button"
        className={cn(
          "cursor-pointer",
          buttonVariants({ variant, size, className }),
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
