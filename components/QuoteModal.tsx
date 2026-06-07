"use client";

import * as React from "react";
import { FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMediaQuery } from "@/hooks/use-media-query";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export function QuoteModal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger render={children as React.ReactElement} />
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Request a Custom Quote
            </DialogTitle>
            <DialogDescription className="text-sm">
              Tell us about your project, and our team will provide a
              personalized estimate within 24 hours.
            </DialogDescription>
          </DialogHeader>
          <QuoteForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={children as React.ReactElement} />
      <SheetContent side="bottom" className="h-[85vh] overflow-y-auto">
        <SheetHeader className="text-left px-4 pt-6 pb-0">
          <SheetTitle className="text-lg font-semibold">
            Request a Custom Quote
          </SheetTitle>
          <SheetDescription className="text-sm">
            Tell us about your project, and our team will provide a personalized
            estimate within 24 hours.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4 px-4 pb-6">
          <QuoteForm />
        </div>
      </SheetContent>
    </Sheet>
  );
}

type QuoteStatus = "idle" | "loading" | "success" | "error";

function QuoteForm({ className }: React.ComponentProps<"form">) {
  const [status, setStatus] = React.useState<QuoteStatus>("idle");
  const [errorMsg, setErrorMsg] = React.useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      type: "quote",
      firstName: (form.elements.namedItem("firstName") as HTMLInputElement).value.trim(),
      lastName: (form.elements.namedItem("lastName") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      company: (form.elements.namedItem("company") as HTMLInputElement).value.trim(),
      requirements: (form.elements.namedItem("requirements") as HTMLTextAreaElement).value.trim(),
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!res.ok || json.error) {
      setStatus("error");
      setErrorMsg(json.error ?? "Something went wrong. Please try again.");
      return;
    }

    setStatus("success");
    form.reset();
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-4 py-6">
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
          <CheckCircle className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-slate-900">Request sent!</h3>
          <p className="text-slate-500 text-sm mt-1">
            We'll prepare a personalized estimate and get back to you within 24 hours.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setStatus("idle")}>
          Submit another request
        </Button>
      </div>
    );
  }

  return (
    <form className={className} onSubmit={handleSubmit}>
      <div className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="firstName">
              First Name <span className="text-red-500">*</span>
            </Label>
            <Input id="firstName" name="firstName" placeholder="John" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastName">
              Last Name <span className="text-red-500">*</span>
            </Label>
            <Input id="lastName" name="lastName" placeholder="Doe" required />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">
              Email Address <span className="text-red-500">*</span>
            </Label>
            <Input id="email" name="email" type="email" placeholder="john@company.com" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="company">Company Name</Label>
            <Input id="company" name="company" placeholder="Acme Corp" />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="requirements">
            Project Requirements / Notes <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="requirements"
            name="requirements"
            required
            placeholder="Tell us about the materials, finishes, specific dimensions, or custom designs you need..."
            className="min-h-[120px] resize-none"
          />
        </div>

        {status === "error" && (
          <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {errorMsg}
          </div>
        )}

        <Button type="submit" className="w-full mt-2" size="lg" disabled={status === "loading"}>
          {status === "loading" && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {status === "loading" ? "Sending…" : "Submit Quote Request"}
        </Button>
      </div>
    </form>
  );
}

interface QuoteModalButtonProps extends React.ComponentProps<typeof Button> {
  text?: string;
  icon?: React.ReactNode;
}

export function QuoteModalButton({
  text = "Request a Custom Quote",
  icon,
  className,
  size = "lg",
  ...props
}: QuoteModalButtonProps) {
  return (
    <QuoteModal>
      <Button size={size} className={className} {...props}>
        {icon}
        {text}
      </Button>
    </QuoteModal>
  );
}
