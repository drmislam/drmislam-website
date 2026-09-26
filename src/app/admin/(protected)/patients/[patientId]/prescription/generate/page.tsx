"use client";

import { generatePrescriptionAction } from "@/actions/prescription-actions";
import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";
import { Loader2 } from "lucide-react";

export default function GeneratePrescriptionPage({ params }: { params: Promise<{ patientId: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    const generate = async () => {
      try {
        const result = await generatePrescriptionAction(resolvedParams.patientId);
        if (isMounted) {
          if (result.success && result.prescriptionId) {
            router.replace(`/admin/patients/${resolvedParams.patientId}/prescription/${result.prescriptionId}`);
          } else {
            setError(result.error || "Failed to generate prescription");
          }
        }
      } catch (e) {
        if (isMounted) setError("Something went wrong");
      }
    };
    
    generate();
    
    return () => { isMounted = false; };
  }, [resolvedParams.patientId, router]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] w-full space-y-4">
        <div className="text-xl font-medium text-destructive">Failed to generate prescription</div>
        <p className="text-muted-foreground">{error}</p>
        <button onClick={() => router.back()} className="text-primary hover:underline">Go Back</button>
      </div>
    );
  }

  // Minimal loading UI
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] w-full">
      <Loader2 className="w-8 h-8 text-primary animate-spin" />
      <div className="mt-4 text-sm font-medium text-muted-foreground flex items-center">
        Generating prescription
        <span className="flex items-center ml-1">
          <span className="animate-bounce" style={{ animationDelay: "0ms" }}>.</span>
          <span className="animate-bounce" style={{ animationDelay: "150ms" }}>.</span>
          <span className="animate-bounce" style={{ animationDelay: "300ms" }}>.</span>
        </span>
      </div>
    </div>
  );
}
