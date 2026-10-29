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
const QUOTE_DESCRIPTION =
  "Tell us what you need: materials, finish, size and quantity. Our team replies within 24 hours.";

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
        <DialogContent className="max-h-[90vh] overflow-y-auto rounded-[1.75rem] p-8 thin-scrollbar sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold tracking-[-0.02em]">
              {QUOTE_TITLE}
            </DialogTitle>
            <DialogDescription className="text-[0.9375rem]">
              {QUOTE_DESCRIPTION}
            </DialogDescription>
          </DialogHeader>
          <QuoteForm product={product} onSuccess={() => setOpen(false)} />
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
          <SheetTitle className="text-2xl font-semibold tracking-[-0.02em]">
            {QUOTE_TITLE}
          </SheetTitle>
          <SheetDescription className="text-[0.9375rem]">
            {QUOTE_DESCRIPTION}
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4 px-4 pb-6">
          <QuoteForm product={product} onSuccess={() => setOpen(false)} />
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
      <div className="grid gap-4">
        {product && (
          <p className="rounded-2xl bg-muted px-4 py-3 text-[0.9375rem]">
            <span className="text-muted-foreground">Quote for </span>
            <span className="font-medium">{product}</span>
          </p>
        )}

        <div className="grid gap-2">
          <Label htmlFor={fieldId("name")}>
            Name <span aria-hidden className="text-destructive">*</span>
          </Label>
          <Input id={fieldId("name")} name="name" autoComplete="name" placeholder="John Doe" required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor={fieldId("email")}>
            Email <span aria-hidden className="text-destructive">*</span>
          </Label>
          <Input id={fieldId("email")} name="email" type="email" autoComplete="email" placeholder="john@company.com" required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor={fieldId("requirements")}>
            What you need <span aria-hidden className="text-destructive">*</span>
          </Label>
          <Textarea
            id={fieldId("requirements")}
            name="requirements"
            required
            placeholder={
              product
                ? "Quantity, finish, size, and any branding you need on it…"
                : "Products, quantities, finishes, sizes, and any branding you need…"
            }
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
                  className="flex max-w-[180px] items-center gap-1.5 rounded-full border border-border bg-muted py-1 pl-2.5 pr-1 text-xs"
                >
                  <span className="truncate">{file.name}</span>
                  <span className="shrink-0 text-muted-foreground">
                    {formatBytes(file.size)}
                  </span>
                  <button
                    type="button"
                    aria-label={`Remove ${file.name}`}
                    className="shrink-0 rounded-full p-0.5 text-muted-foreground hover:bg-border hover:text-foreground"
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
          <div role="alert" className="flex items-center gap-2 rounded-xl bg-destructive/10 px-4 py-3 text-[0.9375rem] text-destructive">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {errorMsg}
          </div>
        )}

        <Button type="submit" className="w-full mt-2" size="lg" disabled={status === "loading"}>
          {status === "loading" && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {status === "loading" ? "Sending…" : "Send request"}
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
