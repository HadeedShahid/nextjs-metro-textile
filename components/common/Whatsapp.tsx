"use client"

import * as React from "react"
import ContactCTA from "./ContactCTA"
import { MessageCircle } from "lucide-react"

const DEFAULT_CONTACTS = [
  {
    id: 1,
    name: "Support Team",
    description: "WhatsApp Support",
    phone: "+880 1234 567123",
    avatarUrl: "/placeholder-user.jpg",
  },
]

interface WhatsappProps {
  className?: string
  buttonLabel?: string
  contacts?: any[]
  title?: string
  subtitle?: string
}

const Whatsapp = ({
  className,
  buttonLabel = "WhatsApp",
  contacts = DEFAULT_CONTACTS,
  title = "WhatsApp a contact",
  subtitle = "Choose a person to message on WhatsApp.",
}: WhatsappProps) => {
  const mapped = React.useMemo(
    () =>
      (contacts || []).map((c) => ({
        id: c.id,
        name: c.name,
        description: c.description,
        value: c.phone || c.value,
        avatarUrl: c.avatarUrl,
      })),
    [contacts]
  )

  return (
    <ContactCTA
      kind="whatsapp"
      className={className}
      buttonLabel={buttonLabel}
      title={title}
      subtitle={subtitle}
      contacts={mapped}
      icon={MessageCircle}
    />
  )
}

export default Whatsapp
