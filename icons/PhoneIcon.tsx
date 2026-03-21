import React from "react"
import { cn } from "@/lib/utils"

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

export const PhoneIcon = ({ className, size = 16, width, height, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width || size}
    height={height || size}
    viewBox="0 0 16 16"
    className={cn("fill-current", className)}
    {...props}
  >
    <path d="M13.3 10.3A8 8 0 0 1 11 10a.7.7 0 0 0-.7.1l-1 1.4a10 10 0 0 1-4.6-4.6L6 5.7A.7.7 0 0 0 6 5a7 7 0 0 1-.3-2.3A.7.7 0 0 0 5 2H2.8c-.4 0-.8.2-.8.7A11.4 11.4 0 0 0 13.3 14a.7.7 0 0 0 .7-.8V11a.7.7 0 0 0-.7-.6z" />
  </svg>
)
