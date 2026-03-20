"use client"

import * as React from "react"
import ContactCTA from "./ContactCTA"
import { Phone } from "lucide-react"

const DEFAULT_CONTACTS = [
  {
    id: 1,
    name: "Alex Johnson",
    description: "Account Manager",
    phone: "+880 1234 567 890",
    avatarUrl: "/placeholder-user.jpg",
  },
  {
    id: 2,
    name: "Priya Singh",
    description: "Customer Success",
    phone: "+880 0987 654 321",
    avatarUrl: "/placeholder-user.jpg",
  },
]

interface CallProps {
  className?: string
  buttonLabel?: string
  contacts?: any[]
  title?: string
  subtitle?: string
}

const Call = ({
  className,
  buttonLabel = "Call",
  contacts = DEFAULT_CONTACTS,
  title = "Call a contact",
  subtitle = "Choose a person to call from the list below.",
}: CallProps) => {
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
      kind="call"
      className={className}
      buttonLabel={buttonLabel}
      title={title}
      subtitle={subtitle}
      contacts={mapped}
      icon={Phone}
    />
  )
}

export default Call
