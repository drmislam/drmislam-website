"use client";

import * as React from "react";
import { X, Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

export type Option = {
  label: string;
  value: string;
};

interface MultiSelectProps {
  options: Option[];
  selected: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select options...",
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(query.toLowerCase()),
  );

  const handleUnselect = (item: string) => {
    onChange(selected.filter((i) => i !== item));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "flex w-full items-center justify-between gap-1.5 rounded-md border border-input bg-input/20 px-2 py-1.5 text-xs/relaxed whitespace-nowrap transition-colors outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 h-auto min-h-7 font-normal dark:bg-input/30 dark:hover:bg-input/50",
              className,
            )}
          >
            <div className="flex gap-1 flex-wrap items-center overflow-hidden">
              {selected.length === 0 && (
                <span className="text-muted-foreground">{placeholder}</span>
              )}
              {selected.map((val) => {
                const option = options.find((o) => o.value === val);
                if (!option) return null;
                return (
                  <div
                    key={val}
                    className="flex items-center gap-1 bg-primary/10 text-primary px-1.5 py-0 rounded text-[11px] font-medium"
                  >
                    {option.label}
                    <div
                      role="button"
                      className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleUnselect(val);
                        }
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onClick={() => handleUnselect(val)}
                    >
                      <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                    </div>
                  </div>
                );
              })}
            </div>
            <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-50 text-muted-foreground" />
          </Button>
        }
      />

      <PopoverContent
        className="w-[--var(--radix-popover-trigger-width)] p-0"
        align="start"
      >
        <div className="flex flex-col">
          <div className="p-1.5 border-b">
            <Input
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-7 border-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none px-2 text-xs"
            />
          </div>
          <ScrollArea className="max-h-60 flex flex-col">
            {filteredOptions.length === 0 ? (
              <div className="p-4 text-center text-sm text-muted-foreground">
                No results found.
              </div>
            ) : (
              <div className="p-1">
                {filteredOptions.map((option) => {
                  const isSelected = selected.includes(option.value);
                  return (
                    <div
                      key={option.value}
                      onClick={() => {
                        onChange(
                          isSelected
                            ? selected.filter((item) => item !== option.value)
                            : [...selected, option.value],
                        );
                      }}
                      className={cn(
                        "flex items-center gap-2 px-2 py-1 text-xs/relaxed rounded-md cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors min-h-7",
                        isSelected ? "bg-muted/50 font-medium" : "",
                      )}
                    >
                      <div
                        className={cn(
                          "mr-1 flex h-3.5 w-3.5 items-center justify-center rounded-sm border border-primary",
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "opacity-50 [&_svg]:invisible",
                        )}
                      >
                        <Check className="h-2.5 w-2.5" />
                      </div>
                      {option.label}
                    </div>
                  );
                })}
              </div>
            )}
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  );
}

