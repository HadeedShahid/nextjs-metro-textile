import React from "react";
import EmailAction, { EmailActionProps } from "./EmailAction";
import CallAction, { CallActionProps } from "./CallAction";
import WhatsappAction, { WhatsappActionProps } from "./WhatsappAction";
import { cn } from "@/lib/utils";

interface ContactActionGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    emailProps?: EmailActionProps;
    callProps?: CallActionProps;
    whatsappProps?: WhatsappActionProps;
}

export default function ContactActionGroup({
    emailProps,
    callProps,
    whatsappProps,
    className,
    ...props
}: ContactActionGroupProps) {
    return (
        <div className={cn("flex flex-wrap items-center gap-2", className)} {...props}>
            <EmailAction {...emailProps} />
            <CallAction {...callProps} />
            <WhatsappAction {...whatsappProps} />
        </div>
    );
}
