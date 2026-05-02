import { Button, ButtonProps } from "@/components/ui/button";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import React from "react";
import { cn } from "@/lib/utils";

export interface WhatsappActionProps extends ButtonProps {
  phone?: string;
  text?: string;
  label?: React.ReactNode;
  icon?: React.ReactNode;
}

export default function WhatsappAction({
  phone = "9230654332176",
  text,
  label,
  icon = <IconBrandWhatsapp className="w-5 h-5 mr-1" />,
  className,
  variant = "default",
  ...props
}: WhatsappActionProps) {
  const href = text
    ? `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
    : `https://wa.me/${phone}`;

  return (
    <Button
      href={href}
      variant={variant}
      external
      className={cn(
        "flex-1 bg-green-50 hover:bg-green-100 text-green-600 border border-green-200 hover:border-green-300 ",
        className,
      )}
      {...props}
    >
      {icon} {label}
    </Button>
  );
}
