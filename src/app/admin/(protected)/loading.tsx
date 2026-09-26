import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] w-full">
      <Loader2 className="w-8 h-8 text-primary animate-spin" />
      <div className="mt-4 text-sm font-medium text-muted-foreground flex items-center">
        Loading
        <span className="flex items-center ml-1">
          <span className="animate-bounce" style={{ animationDelay: "0ms" }}>.</span>
          <span className="animate-bounce" style={{ animationDelay: "150ms" }}>.</span>
          <span className="animate-bounce" style={{ animationDelay: "300ms" }}>.</span>
        </span>
      </div>
    </div>
  );
}
