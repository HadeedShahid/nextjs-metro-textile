import { Button, ButtonProps } from "@/components/ui/button";
import { IconMailFilled } from "@tabler/icons-react";
import React from "react";
import { cn } from "@/lib/utils";

export interface EmailActionProps extends ButtonProps {
    email?: string;
    subject?: string;
    label?: React.ReactNode;
    icon?: React.ReactNode;
}

export default function EmailAction({
    email = "info@metrotextile.com",
    subject,
    label = "Email",
    icon = <IconMailFilled className="w-5 h-5 mr-1" />,
    className,
    variant = "secondary",
    ...props
}: EmailActionProps) {
    const href = subject ? `mailto:${email}?subject=${encodeURIComponent(subject)}` : `mailto:${email}`;
    
    return (
        <Button
            href={href}
            variant={variant}
            className={cn("bg-primary/5 border border-primary/30 hover:bg-primary/10 hover:border-primary/50 text-primary font-semibold", className)}
            {...props}
        >
            {icon} {label}
        </Button>
    );
}
