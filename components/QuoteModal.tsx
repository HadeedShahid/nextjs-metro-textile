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
import { AlertCircle, Loader2, Paperclip, X } from "lucide-react";
import { toast } from "sonner";
import { submitForm } from "@/lib/submit-form";
import {
  MAX_QUOTE_ATTACHMENT_BYTES,
  MAX_QUOTE_ATTACHMENTS,
} from "@/constants";

const QUOTE_TITLE = "Request a quote";
const QUOTE_DESCRIPTION = "Tell us what you need and our team will reply within 24 hours.";

export function QuoteModal({
  children,
  product,
}: {
  children: React.ReactNode;
  /** The product the buyer was looking at, carried into the request. */
  product?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger render={children as React.ReactElement} />
        <DialogContent className="max-h-[90dvh] gap-5 overflow-y-auto p-6 thin-scrollbar sm:max-w-[440px]">
          <DialogHeader className="gap-1 pr-8">
            <DialogTitle className="text-lg font-semibold tracking-[-0.01em]">{QUOTE_TITLE}</DialogTitle>
            <DialogDescription className="text-sm">{QUOTE_DESCRIPTION}</DialogDescription>
          </DialogHeader>
          <QuoteForm product={product} onSuccess={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={children as React.ReactElement} />
      {/* As tall as the form, up to 92% of the screen; the cap goes through the
          data-[side=bottom] variant so it outweighs the base sheet's h-auto. */}
      <SheetContent
        side="bottom"
        className="gap-0 overflow-y-auto rounded-t-lg shadow-none thin-scrollbar data-[side=bottom]:max-h-[92dvh]"
      >
        <SheetHeader className="gap-1 px-5 pb-0 pr-12 pt-5 text-left">
          <SheetTitle className="text-lg font-semibold tracking-[-0.01em]">{QUOTE_TITLE}</SheetTitle>
          <SheetDescription className="text-sm">{QUOTE_DESCRIPTION}</SheetDescription>
        </SheetHeader>
        <div className="px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4">
          <QuoteForm product={product} onSuccess={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

type QuoteStatus = "idle" | "loading" | "error";

// "4 MB", "1.5 MB", "320 KB": a whole number of megabytes loses its ".0".
function formatBytes(bytes: number): string {
  return bytes >= 1024 * 1024
    ? `${Number((bytes / (1024 * 1024)).toFixed(1))} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function QuoteForm({
  className,
  product,
  onSuccess,
}: React.ComponentProps<"form"> & { product?: string; onSuccess?: () => void }) {
  const [status, setStatus] = React.useState<QuoteStatus>("idle");
  const [errorMsg, setErrorMsg] = React.useState("");
  const [files, setFiles] = React.useState<File[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  // Unique per form, so the open dialog's fields never share ids with another form on the page.
  const uid = React.useId();
  const fieldId = (name: string) => `${uid}-${name}`;

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
    if (product) data.set("product", product);
    data.set("name", (form.elements.namedItem("name") as HTMLInputElement).value.trim());
    data.set("email", (form.elements.namedItem("email") as HTMLInputElement).value.trim());
    data.set("requirements", (form.elements.namedItem("requirements") as HTMLTextAreaElement).value.trim());
    for (const file of files) data.append("files", file);

    const error = await submitForm(
      data,
      "We couldn't send your request. Check your connection and try again, or email us directly.",
    );
    if (error) {
      setStatus("error");
      setErrorMsg(error);
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
      <div className="grid gap-3.5">
        {product && (
          <p className="flex min-w-0 items-center gap-1.5 rounded-md bg-muted px-3 py-2 text-sm">
            <span className="shrink-0 text-muted-foreground">Quote for</span>
            <span className="truncate font-medium">{product}</span>
          </p>
        )}

        <div className="grid gap-3.5 sm:grid-cols-2 sm:gap-3">
          <div className="grid gap-1.5">
            <Label htmlFor={fieldId("name")}>
              Name <span aria-hidden className="text-destructive">*</span>
            </Label>
            <Input id={fieldId("name")} name="name" autoComplete="name" placeholder="Your name" required />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor={fieldId("email")}>
              Email <span aria-hidden className="text-destructive">*</span>
            </Label>
            <Input id={fieldId("email")} name="email" type="email" autoComplete="email" placeholder="you@company.com" required />
          </div>
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor={fieldId("requirements")}>
            What you need <span aria-hidden className="text-destructive">*</span>
          </Label>
          <Textarea
            id={fieldId("requirements")}
            name="requirements"
            required
            placeholder={
              product
                ? "Quantity, finish, size and any branding you need on it"
                : "Products, quantities, finishes, sizes and any branding you need"
            }
            className="min-h-24 resize-none"
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
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
            <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
              <Paperclip aria-hidden />
              Attach files
            </Button>
            <span className="text-xs text-muted-foreground">
              Optional. Up to {MAX_QUOTE_ATTACHMENTS} files, {formatBytes(MAX_QUOTE_ATTACHMENT_BYTES)} in all.
            </span>
          </div>

          {files.length > 0 && (
            <ul className="flex flex-wrap gap-1.5">
              {files.map((file, index) => (
                <li
                  key={`${file.name}-${file.size}`}
                  className="flex max-w-[180px] items-center gap-1.5 rounded-md border border-border bg-muted py-1 pl-2.5 pr-1 text-xs"
                >
                  <span className="truncate">{file.name}</span>
                  <span className="shrink-0 text-muted-foreground">{formatBytes(file.size)}</span>
                  <button
                    type="button"
                    aria-label={`Remove ${file.name}`}
                    className="shrink-0 rounded-sm p-0.5 text-muted-foreground hover:bg-border hover:text-foreground"
                    onClick={() => removeFile(index)}
                  >
                    <X className="size-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {status === "error" && (
          <div role="alert" className="flex items-start gap-2 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
            <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
            {errorMsg}
          </div>
        )}

        <Button type="submit" className="mt-1 w-full" disabled={status === "loading"}>
          {status === "loading" && <Loader2 className="size-4 animate-spin" aria-hidden />}
          {status === "loading" ? "Sending" : "Send request"}
        </Button>
      </div>
    </form>
  );
}

interface QuoteModalButtonProps extends React.ComponentProps<typeof Button> {
  text?: string;
  icon?: React.ReactNode;
  /** Prefills the request with this product. */
  product?: string;
}

export function QuoteModalButton({
  text = QUOTE_TITLE,
  icon,
  product,
  className,
  size = "lg",
  ...props
}: QuoteModalButtonProps) {
  return (
    <QuoteModal product={product}>
      <Button size={size} className={className} {...props}>
        {icon}
        {text}
      </Button>
    </QuoteModal>
  );
}
