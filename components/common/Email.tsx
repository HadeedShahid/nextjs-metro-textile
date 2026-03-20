"use client"

import * as React from "react"
import ContactCTA from "./ContactCTA"
import { Mail } from "lucide-react"

const DEFAULT_CONTACTS = [
  {
    id: 1,
    name: "Sales Department",
    description: "General Inquiries",
    email: "info@metrotextile.com",
    avatarUrl: "/placeholder-user.jpg",
  },
]

interface EmailProps {
  className?: string
  buttonLabel?: string
  contacts?: any[]
  title?: string
  subtitle?: string
}

const Email = ({
  className,
  buttonLabel = "Email",
  contacts = DEFAULT_CONTACTS,
  title = "Email a contact",
  subtitle = "Choose a person to email from the list below.",
}: EmailProps) => {
  const mapped = React.useMemo(
    () =>
      (contacts || []).map((c) => ({
        id: c.id,
        name: c.name,
        description: c.description,
        value: c.email || c.value,
        avatarUrl: c.avatarUrl,
      })),
    [contacts]
  )

  return (
    <ContactCTA
      kind="email"
      className={className}
      buttonLabel={buttonLabel}
      title={title}
      subtitle={subtitle}
      contacts={mapped}
      icon={Mail}
    />
  )
}

export default Email
