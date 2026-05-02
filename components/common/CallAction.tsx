import { Button, ButtonProps } from "@/components/ui/button";
import { PhoneIcon } from "@/icons";
import React from "react";
import { cn } from "@/lib/utils";

export interface CallActionProps extends ButtonProps {
  phone?: string;
  label?: React.ReactNode;
  icon?: React.ReactNode;
}

export default function CallAction({
  phone = "+9230654332176",
  label = "Call",
  icon = <PhoneIcon className="w-5 h-5 mr-1" />,
  className,
  variant = "secondary",
  ...props
}: CallActionProps) {
  return (
    <Button
      href={`tel:${phone}`}
      variant={variant}
      className={cn(
        "bg-primary/5 border border-primary/30 hover:bg-primary/10 hover:border-primary/50 text-primary font-semibold",
        className,
      )}
      {...props}
    >
      {icon} {label}
    </Button>
  );
}
