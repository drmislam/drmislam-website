"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer, ArrowDownToLine } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

interface Visit {
  id: string;
  visitNumber: number;
  visitDate: Date;
}

interface PrescriptionActionsHeaderProps {
  patientId: string;
  patientDbId: string;
  prescriptionId: string;
  visits?: Visit[];
  selectedVisitId?: string;
}

export function PrescriptionActionsHeader({ 
  patientId, 
  patientDbId,
  prescriptionId, 
  visits = [], 
  selectedVisitId 
}: PrescriptionActionsHeaderProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const generatePDF = async () => {
    const htmlToImage = await import('html-to-image');
    const element = document.getElementById('prescription-content');
    
    if (!element) {
      throw new Error("Content not found");
    }

    const dataUrl = await htmlToImage.toPng(element, { 
      quality: 1, 
      pixelRatio: 3,
      backgroundColor: '#ffffff',
      style: {
        transform: 'scale(1)',
        transformOrigin: 'top left'
      }
    });
    
    const { jsPDF } = await import('jspdf');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'cm',
      format: [21, 29.7] // A4 format
    });

    pdf.addImage(dataUrl, 'PNG', 0, 0, 21, 29.7);
    return pdf;
  };

  const handlePrint = async () => {
    setIsProcessing(true);
    toast.info("Preparing Print...");
    try {
      const pdf = await generatePDF();
      pdf.autoPrint();
      
      const blob = pdf.output('blob');
      const blobUrl = URL.createObjectURL(blob);
      
      const printWindow = window.open(blobUrl, '_blank');
      if (!printWindow) {
        toast.warning("Please allow popups to print");
      }
    } catch (error) {
      console.error("Print generation failed:", error);
      toast.error("Failed to prepare print");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = async () => {
    setIsProcessing(true);
    toast.info("Generating PDF...");
    
    try {
      const pdf = await generatePDF();
      pdf.save(`Prescription_${patientId}.pdf`);
      toast.success("Prescription downloaded as PDF successfully");
    } catch (error) {
      console.error("PDF generation failed:", error);
      toast.error("Failed to generate PDF");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleVisitChange = (visitId: string) => {
    router.push(`/admin/patients/${patientDbId}/prescription/${prescriptionId}?visitId=${visitId}`);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 print:hidden">
      <Link href="/admin/patients" className="w-full sm:w-auto">
        <Button variant="outline" className="w-full sm:w-auto gap-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Patients</span>
        </Button>
      </Link>
      
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
        {visits.length > 0 && (
          <Select value={selectedVisitId} onValueChange={handleVisitChange}>
            <SelectTrigger className="w-full sm:w-[220px]">
              <SelectValue>
                {selectedVisitId && visits.find(v => v.id === selectedVisitId) 
                  ? `Visit ${visits.find(v => v.id === selectedVisitId)!.visitNumber} (${format(new Date(visits.find(v => v.id === selectedVisitId)!.visitDate), "dd/MM/yyyy")})` 
                  : "Select Visit"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {visits.map((visit) => (
                <SelectItem key={visit.id} value={visit.id}>
                  Visit {visit.visitNumber} ({format(new Date(visit.visitDate), "dd/MM/yyyy")})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <Button 
          variant="outline" 
          onClick={handlePrint}
          disabled={isProcessing}
          className="w-full sm:w-auto gap-2"
        >
          <Printer className="h-4 w-4" />
          <span>{isProcessing ? "Processing..." : "Print"}</span>
        </Button>
        <Button 
          onClick={handleDownload}
          disabled={isProcessing}
          className="w-full sm:w-auto gap-2"
        >
          <ArrowDownToLine className="h-4 w-4" />
          <span>{isProcessing ? "Processing..." : "Download"}</span>
        </Button>
      </div>
    </div>
  );
}
