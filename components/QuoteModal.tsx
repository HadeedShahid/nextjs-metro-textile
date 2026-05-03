"use client";

import * as React from "react";
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

export function QuoteModal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger render={children as React.ReactElement} />
        <DialogContent className="sm:max-w-[600px]">
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
          <SheetTitle className="text-lg font-semibold">Request a Custom Quote</SheetTitle>
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

function QuoteForm({ className }: React.ComponentProps<"form">) {
  return (
    <form className={className} onSubmit={(e) => e.preventDefault()}>
      <div className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="firstName">
              First Name <span className="text-red-500">*</span>
            </Label>
            <Input id="firstName" placeholder="John" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastName">
              Last Name <span className="text-red-500">*</span>
            </Label>
            <Input id="lastName" placeholder="Doe" required />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">
              Email Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@company.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="company">Company Name</Label>
            <Input id="company" placeholder="Acme Corp" />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="requirements">
            Project Requirements / Notes <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="requirements"
            required
            placeholder="Tell us about the materials, finishes, specific dimensions, or custom designs you need..."
            className="min-h-[120px] resize-none"
          />
        </div>

        <Button type="submit" className="w-full mt-2">
          Submit Quote Request
        </Button>
      </div>
    </form>
  );
}
