"use client"

import * as React from "react"
import { Phone, Mail, MessageCircle, Copy, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/)
  const first = parts[0]?.[0] || ""
  const last = parts.length > 1 ? parts[parts.length - 1][0] || "" : ""
  return (first + last).toUpperCase()
}

function sanitizeDigits(input: string) {
  return input.replace(/[^\d+]/g, "")
}

function getDefaultIcon(kind: string) {
  switch (kind) {
    case "email":
      return Mail
    case "whatsapp":
      return MessageCircle
    case "call":
    default:
      return Phone
  }
}

function buildHref(kind: string, value: string) {
  if (kind === "email") return `mailto:${value}`
  if (kind === "whatsapp") return `https://wa.me/${sanitizeDigits(value)}`
  return `tel:${sanitizeDigits(value)}`
}

function actionAria(kind: string, name: string, value: string) {
  if (kind === "email") return `Email ${name} at ${value}`
  if (kind === "whatsapp") return `Message ${name} on WhatsApp at ${value}`
  return `Call ${name} at ${value}`
}

export interface Contact {
  id: string | number
  name: string
  description?: string
  value: string
  avatarUrl?: string
}

interface ContactCTAProps {
  kind: "call" | "email" | "whatsapp"
  className?: string
  buttonLabel?: string
  title?: string
  subtitle?: string
  contacts: Contact[]
  icon?: any
}

const ContactCTA = ({
  kind,
  className,
  buttonLabel,
  title,
  subtitle,
  contacts,
  icon,
}: ContactCTAProps) => {
  const [copiedId, setCopiedId] = React.useState<string | number | null>(null)
  const Icon = icon || getDefaultIcon(kind)

  const defaultButtonLabel =
    buttonLabel ||
    (kind === "email" ? "Email" : kind === "whatsapp" ? "WhatsApp" : "Call")
  const defaultTitle =
    title ||
    (kind === "email"
      ? "Email a contact"
      : kind === "whatsapp"
      ? "WhatsApp a contact"
      : "Call a contact")
  const defaultSubtitle =
    subtitle ||
    (kind === "email"
      ? "Choose a person to email from the list below."
      : kind === "whatsapp"
      ? "Choose a person to message on WhatsApp."
      : "Choose a person to call from the list below.")

  async function handleCopy(value: string, id: string | number) {
    try {
      await navigator.clipboard.writeText(value)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 1500)
    } catch (e) {
      console.error("[ContactCTA] Copy failed:", e)
    }
  }

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button className={cn(className)}>
            <Icon className="mr-2 h-3 w-3" aria-hidden="true" />
            {defaultButtonLabel}
            <span className="sr-only">
              Open {defaultButtonLabel.toLowerCase()} contacts
            </span>
          </Button>
        }
      />

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-pretty">{defaultTitle}</DialogTitle>
          <DialogDescription className="text-pretty">
            {defaultSubtitle}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 grid gap-3" role="list">
          {contacts.map((c) => {
            const id = c.id ?? c.value
            return (
              <div
                key={id}
                className="flex items-center justify-between rounded-md border p-3"
                role="listitem"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={
                        c.avatarUrl ||
                        "/placeholder.svg?height=36&width=36&query=contact%20avatar"
                      }
                      alt={`${c.name} avatar`}
                    />
                    <AvatarFallback aria-hidden="true">
                      {getInitials(c.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <div className="truncate font-medium">{c.name}</div>
                    {c.description ? (
                      <div className="truncate text-sm text-muted-foreground">
                        {c.description}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <a
                    href={buildHref(kind, c.value)}
                    aria-label={actionAria(kind, c.name, c.value)}
                  >
                    <Button size="sm">
                      <Icon className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                      {c.value}
                    </Button>
                  </a>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCopy(c.value, id)}
                    aria-label={`Copy ${
                      kind === "email" ? "email" : "number"
                    } for ${c.name}`}
                  >
                    {copiedId === id ? (
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                    <span className="sr-only">
                      Copy {kind === "email" ? "email" : "number"}
                    </span>
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ContactCTA
