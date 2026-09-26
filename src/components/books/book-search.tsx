"use client";

import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";

export function BookSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");

  const handleSearch = useCallback(
    (term: string) => {
      const params = new URLSearchParams(searchParams);
      if (term) {
        params.set("q", term);
      } else {
        params.delete("q");
      }
      
      startTransition(() => {
        const query = params.toString();
        router.push(query ? `${pathname}?${query}` : pathname);
      });
    },
    [router, pathname, searchParams]
  );

  // Simple debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== (searchParams.get("q") || "")) {
        handleSearch(searchTerm);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm, handleSearch, searchParams]);

  return (
    <div className="relative flex w-full md:w-80 items-center">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search books by name..."
        className="pl-10 pr-10 bg-background w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-foreground rounded-md"
          onClick={() => setSearchTerm("")}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
      {isPending && (
        <div className="absolute -bottom-6 text-xs text-muted-foreground left-0 animate-pulse">
          Searching...
        </div>
      )}
    </div>
  );
}
