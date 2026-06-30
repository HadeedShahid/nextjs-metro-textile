"use client";

import { useState } from "react";
import { SearchIcon } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

export interface SearchSelectItem {
  label: string;
  value: string;
  /** Small secondary label rendered on the right, e.g. a parent category name. */
  meta?: string | null;
}

export interface SearchSelectGroup {
  heading: string;
  items: SearchSelectItem[];
}

interface SearchSelectProps {
  groups: SearchSelectGroup[];
  onSelect: (value: string) => void;
  placeholder?: string;
  triggerLabel?: string;
  emptyText?: string;
  sheetTitle?: string;
  className?: string;
}

const triggerClassName =
  "flex w-72 items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2 text-left text-sm text-slate-500 shadow-sm transition-colors hover:border-primary/30";

/**
 * Generic search/select: a desktop combobox (Popover + Command) that becomes
 * a mobile bottom sheet below `lg`, same as QuoteModal's Dialog/Sheet switch.
 * Caller supplies the data (`groups`) and what to do with a selected value
 * (`onSelect`) — no knowledge of products/categories lives in here.
 */
export default function SearchSelect({
  groups,
  onSelect,
  placeholder = "Search…",
  triggerLabel = "Search",
  emptyText = "No results found.",
  sheetTitle = "Search",
  className,
}: SearchSelectProps) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const hasResults = groups.some((group) => group.items.length > 0);
  if (!hasResults) return null;

  const handleSelect = (value: string) => {
    setOpen(false);
    onSelect(value);
  };

  const listContent = (
    <>
      <CommandEmpty>{emptyText}</CommandEmpty>
      {groups.map((group) =>
        group.items.length > 0 ? (
          <CommandGroup key={group.heading} heading={group.heading}>
            {group.items.map((item) => (
              <CommandItem
                key={item.value}
                value={item.label}
                onSelect={() => handleSelect(item.value)}
              >
                <span className="flex-1 truncate">{item.label}</span>
                {item.meta && (
                  <span className="text-xs text-muted-foreground">{item.meta}</span>
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        ) : null,
      )}
    </>
  );

  const trigger = (
    <>
      <SearchIcon className="h-3.5 w-3.5 shrink-0 text-slate-400" />
      {triggerLabel}
    </>
  );

  if (!isDesktop) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className={cn(triggerClassName, className)}>{trigger}</SheetTrigger>
        <SheetContent side="bottom" className="flex h-[75vh] flex-col p-0">
          <SheetHeader className="px-4 pt-6 pb-0 text-left">
            <SheetTitle>{sheetTitle}</SheetTitle>
            <SheetDescription className="sr-only">{placeholder}</SheetDescription>
          </SheetHeader>
          <Command className="flex-1 overflow-hidden rounded-none bg-transparent">
            <CommandInput placeholder={placeholder} />
            <CommandList className="max-h-none flex-1">{listContent}</CommandList>
          </Command>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className={cn(triggerClassName, className)}>{trigger}</PopoverTrigger>
      <PopoverContent
        className="w-[320px] p-0 sm:w-[420px]"
        align="start"
        side="bottom"
        sideOffset={8}
        collisionAvoidance={{ side: "shift" }}
      >
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList className="max-h-60">{listContent}</CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
