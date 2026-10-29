"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { submitForm } from "@/lib/submit-form";

type Status = "idle" | "loading" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      type: "contact",
      firstName: (form.elements.namedItem("firstName") as HTMLInputElement).value.trim(),
      lastName: (form.elements.namedItem("lastName") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      company: (form.elements.namedItem("company") as HTMLInputElement).value.trim(),
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim(),
    };

    const error = await submitForm(
      data,
      "We couldn't send your message. Check your connection and try again, or email us directly.",
    );
    if (error) {
      setStatus("error");
      setErrorMsg(error);
      return;
    }

    toast.success("Message sent!", {
      description: "We've received your message and will get back to you within 24 hours.",
      position: "top-center",
    });
    setStatus("idle");
    form.reset();
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName">First name</Label>
          <Input id="firstName" name="firstName" autoComplete="given-name" placeholder="John" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last name</Label>
          <Input id="lastName" name="lastName" autoComplete="family-name" placeholder="Doe" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" autoComplete="email" placeholder="john@example.com" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="company">Company (optional)</Label>
        <Input id="company" name="company" autoComplete="organization" placeholder="Your Company Ltd." />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="How can we help you today?"
          className="min-h-[150px] resize-y"
          required
        />
      </div>

      {status === "error" && (
        <div role="alert" className="flex items-center gap-2 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {errorMsg}
        </div>
      )}

      <Button type="submit" size="lg" className="mt-2 w-full sm:w-auto" disabled={status === "loading"}>
        {status === "loading" ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Send className="w-4 h-4 mr-2" />
        )}
        {status === "loading" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
