import React from "react";
import EmailAction, { EmailActionProps } from "./EmailAction";
import CallAction, { CallActionProps } from "./CallAction";
import WhatsappAction, { WhatsappActionProps } from "./WhatsappAction";
import { cn } from "@/lib/utils";

interface ContactActionGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    emailProps?: EmailActionProps;
    callProps?: CallActionProps;
    whatsappProps?: WhatsappActionProps;
    /**
     * When true, buttons stretch to fill the available width on small screens:
     * Email + Call sit side by side (50% each), WhatsApp spans the full width
     * below. Reverts to the natural inline row from md upward.
     */
    fill?: boolean;
}

export default function ContactActionGroup({
    emailProps,
    callProps,
    whatsappProps,
    className,
    fill = false,
    ...props
}: ContactActionGroupProps) {
    const containerCls = fill
        ? "grid grid-cols-2 gap-2 w-full md:flex md:flex-wrap md:items-center md:w-auto"
        : "flex flex-wrap items-center gap-2";

    return (
        <div className={cn(containerCls, className)} {...props}>
            <EmailAction
                {...emailProps}
                className={cn(fill && "w-full md:w-auto", emailProps?.className)}
            />
            <CallAction
                {...callProps}
                className={cn(fill && "w-full md:w-auto", callProps?.className)}
            />
            <WhatsappAction
                {...whatsappProps}
                className={cn(
                    fill && "col-span-2 w-full md:col-auto md:w-auto",
                    whatsappProps?.className,
                )}
            />
        </div>
    );
}
