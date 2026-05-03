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
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
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
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="p-0 overflow-hidden bg-white border-0 shadow-2xl sm:max-w-[600px] sm:rounded-2xl">
          <div className="bg-gradient-to-br from-[#7f2f82]/10 to-transparent p-5 md:p-8 border-b border-slate-100">
            <DialogHeader>
              <DialogTitle className="text-xl md:text-2xl font-semibold text-slate-900">
                Request a Custom Quote
              </DialogTitle>
              <DialogDescription className="text-slate-600 text-sm mt-1.5 md:mt-2">
                Provide us with a few details about your project, and our sourcing team will get back to you with a personalized estimate within 24 hours.
              </DialogDescription>
            </DialogHeader>
          </div>
          <QuoteForm className="px-5 pb-5 md:px-8 md:pb-8" />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="bg-white p-0">
        <div className="bg-gradient-to-br from-[#7f2f82]/10 to-transparent p-5 border-b border-slate-100 rounded-t-2xl">
          <DrawerHeader className="text-left p-0">
            <DrawerTitle className="text-xl font-semibold text-slate-900">
              Request a Custom Quote
            </DrawerTitle>
            <DrawerDescription className="text-slate-600 text-sm mt-1.5">
              Provide us with a few details about your project, and our sourcing team will get back to you with a personalized estimate within 24 hours.
            </DrawerDescription>
          </DrawerHeader>
        </div>
        <div className="overflow-y-auto">
          <QuoteForm className="px-5 py-6" />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function QuoteForm({ className }: React.ComponentProps<"form">) {
  return (
    <form className={className} onSubmit={(e) => e.preventDefault()}>
      <div className="space-y-5 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-slate-700">First Name <span className="text-red-500">*</span></Label>
            <Input id="firstName" placeholder="John" required className="bg-slate-50 focus-visible:ring-primary/20" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-slate-700">Last Name <span className="text-red-500">*</span></Label>
            <Input id="lastName" placeholder="Doe" required className="bg-slate-50 focus-visible:ring-primary/20" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-700">Email Address <span className="text-red-500">*</span></Label>
            <Input id="email" type="email" placeholder="john@company.com" required className="bg-slate-50 focus-visible:ring-primary/20" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company" className="text-slate-700">Company Name</Label>
            <Input id="company" placeholder="Acme Corp" className="bg-slate-50 focus-visible:ring-primary/20" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="requirements" className="text-slate-700">Project Requirements / Notes <span className="text-red-500">*</span></Label>
          <Textarea 
            id="requirements" 
            required
            placeholder="Tell us about the materials, finishes, specific dimensions, or custom designs you need..." 
            className="min-h-[120px] resize-none bg-slate-50 focus-visible:ring-primary/20"
          />
        </div>

        <Button type="submit" className="w-full text-base font-semibold h-12 bg-[#7f2f82] hover:bg-[#6a276d] shadow-md hover:shadow-lg transition-all rounded-xl mt-2">
          Submit Quote Request
        </Button>
      </div>
    </form>
  );
}
