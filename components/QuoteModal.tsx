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
import { AlertCircle, Loader2, Paperclip, X } from "lucide-react";
import { toast } from "sonner";
import {
  MAX_QUOTE_ATTACHMENT_BYTES,
  MAX_QUOTE_ATTACHMENTS,
} from "@/constants";

export function QuoteModal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger render={children as React.ReactElement} />
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto thin-scrollbar">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Request a Custom Quote
            </DialogTitle>
            <DialogDescription className="text-sm">
              Tell us about your project, and our team will provide a
              personalized estimate within 24 hours.
            </DialogDescription>
          </DialogHeader>
          <QuoteForm onSuccess={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={children as React.ReactElement} />
      {/* Height must go through the data-[side=bottom] variant — the base
          sheet's h-auto outweighs a plain h-[85vh] and kills scrolling. */}
      <SheetContent
        side="bottom"
        className="data-[side=bottom]:h-[85vh] overflow-y-auto rounded-t-2xl thin-scrollbar"
      >
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
          <QuoteForm onSuccess={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

type QuoteStatus = "idle" | "loading" | "error";

function formatBytes(bytes: number): string {
  return bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function QuoteForm({
  className,
  onSuccess,
}: React.ComponentProps<"form"> & { onSuccess?: () => void }) {
  const [status, setStatus] = React.useState<QuoteStatus>("idle");
  const [errorMsg, setErrorMsg] = React.useState("");
  const [files, setFiles] = React.useState<File[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  function addFiles(picked: FileList | null) {
    if (!picked?.length) return;
    setErrorMsg("");

    // Dedupe by name+size so re-picking the same file doesn't double it
    const merged = [...files];
    for (const file of Array.from(picked)) {
      if (!merged.some((f) => f.name === file.name && f.size === file.size)) {
        merged.push(file);
      }
    }

    if (merged.length > MAX_QUOTE_ATTACHMENTS) {
      setStatus("error");
      setErrorMsg(`You can attach up to ${MAX_QUOTE_ATTACHMENTS} files.`);
      return;
    }
    const total = merged.reduce((sum, f) => sum + f.size, 0);
    if (total > MAX_QUOTE_ATTACHMENT_BYTES) {
      setStatus("error");
      setErrorMsg(
        `Attachments can't exceed ${formatBytes(MAX_QUOTE_ATTACHMENT_BYTES)} in total.`,
      );
      return;
    }

    setStatus("idle");
    setFiles(merged);
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    // Removing a file resolves any count/size complaint — clear it
    setErrorMsg("");
    setStatus("idle");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData();
    data.set("type", "quote");
    data.set("name", (form.elements.namedItem("name") as HTMLInputElement).value.trim());
    data.set("email", (form.elements.namedItem("email") as HTMLInputElement).value.trim());
    data.set("requirements", (form.elements.namedItem("requirements") as HTMLTextAreaElement).value.trim());
    for (const file of files) data.append("files", file);

    // No Content-Type header — the browser sets the multipart boundary itself
    const res = await fetch("/api/contact", { method: "POST", body: data });

    const json = await res.json();

    if (!res.ok || json.error) {
      setStatus("error");
      setErrorMsg(json.error ?? "Something went wrong. Please try again.");
      return;
    }

    toast.success("Quote request sent!", {
      description: "We've received your message and will get back to you within 24 hours.",
      position: "top-center"
    });
    setStatus("idle");
    setFiles([]);
    form.reset();
    onSuccess?.();
  }

  return (
    <form className={className} onSubmit={handleSubmit}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">
            Name <span className="text-red-500">*</span>
          </Label>
          <Input id="name" name="name" placeholder="John Doe" required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">
            Email Address <span className="text-red-500">*</span>
          </Label>
          <Input id="email" name="email" type="email" placeholder="john@company.com" required />
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

        <div className="grid gap-2">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.webp,.svg,.ai,.zip"
            onChange={(e) => {
              addFiles(e.target.files);
              e.target.value = "";
            }}
          />
          <Button
            type="button"
            variant="outline"
            className="w-full justify-center"
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip className="w-4 h-4" />
            Attach specs or reference files
          </Button>
          <p className="text-xs text-muted-foreground">
            Optional — up to {MAX_QUOTE_ATTACHMENTS} files,{" "}
            {formatBytes(MAX_QUOTE_ATTACHMENT_BYTES)} total.
          </p>

          {files.length > 0 && (
            <ul className="flex flex-wrap gap-1.5">
              {files.map((file, index) => (
                <li
                  key={`${file.name}-${file.size}`}
                  className="flex max-w-[180px] items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 py-1 pl-2.5 pr-1 text-xs"
                >
                  <span className="truncate">{file.name}</span>
                  <span className="shrink-0 text-muted-foreground">
                    {formatBytes(file.size)}
                  </span>
                  <button
                    type="button"
                    aria-label={`Remove ${file.name}`}
                    className="shrink-0 rounded-full p-0.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700"
                    onClick={() => removeFile(index)}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
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
