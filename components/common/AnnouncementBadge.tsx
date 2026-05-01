import React from "react";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { ChevronRight } from "lucide-react";

interface AnnouncementBadgeProps {
  badgeText?: string;
  message: string;
  linkText?: string;
  href: string;
  className?: string;
}

const AnnouncementBadge = ({
  badgeText = "New",
  message,
  linkText = "View Now",
  href,
  className = "",
}: AnnouncementBadgeProps) => {
  return (
    <Link
      href={href}
      className={`mb-8 inline-flex items-center gap-3 p-1.5 pr-4 rounded-full bg-slate-50 border border-slate-200 shadow-sm hover:border-primary/30 transition-all group ${className}`}
    >
      <Badge className="rounded-full px-3 py-1 bg-primary text-white hover:bg-primary border-none text-[10px] uppercase tracking-wider font-bold">
        {badgeText}
      </Badge>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-slate-600 whitespace-nowrap">
          {message}
        </span>
        <span className="w-1 h-1 rounded-full bg-slate-300 hidden sm:block" />
        <span className="text-sm font-semibold text-primary flex items-center gap-0.5 whitespace-nowrap">
          {linkText}
          <ChevronRight
            size={14}
            className="group-hover:translate-x-0.5 transition-transform"
          />
        </span>
      </div>
    </Link>
  );
};

export default AnnouncementBadge;
