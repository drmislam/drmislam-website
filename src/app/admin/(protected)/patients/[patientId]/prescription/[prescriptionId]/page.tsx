import { getPatientById } from "@/lib/patients/patient-service";
import { notFound } from "next/navigation";
import { PrescriptionActionsHeader } from "@/components/patients/prescription-actions-header";
import { format } from "date-fns";
import { prisma } from "@/lib/db/prisma";
import { PrescriptionDocumentScaler } from "@/components/patients/prescription-document-scaler";

// Easily adjustable print measurements for the pre-printed A4 template
const PRINT_CONFIG = {
  // Page Size (A4)
  pageWidth: "21cm",
  pageHeight: "29.7cm",
  
  // Vertical position from the top edge of the paper for Name/Age/Sex/Date
  topPosition: "5.3cm",
  
  // Horizontal positions from the left edge of the paper
  nameLeft: "3.5cm",
  ageLeft: "14cm",
  genderLeft: "16cm",
  dateLeft: "18.5cm", // Restored back to standard 18.5cm
  
  // Position for the main body (Patient ID, Investigation, Rx, etc.)
  bodyTop: "7cm",
  bodyLeft: "1.75cm",
  
  // Typography for top row
  fontSize: "15px",
  fontFamily: "Arial, sans-serif",
  fontWeight: "bold",
  textColor: "#000000",
  
  // Typography for body text
  bodyFontSize: "15px",
  headingFontWeight: "bold"
};

export const metadata = {
  title: "Prescription | Dr M Islam",
};

interface PrescriptionPageProps {
  params: Promise<{ patientId: string, prescriptionId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PrescriptionPage({ params, searchParams }: PrescriptionPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  // Verify the prescription exists
  const prescription = await prisma.prescription.findUnique({
    where: { id: resolvedParams.prescriptionId },
  });

  if (!prescription) {
    notFound();
  }

  const patient = await getPatientById(resolvedParams.patientId);

  if (!patient) {
    notFound();
  }

  const visitIdParam = typeof resolvedSearchParams.visitId === "string" ? resolvedSearchParams.visitId : null;

  // Get the selected visit data to display on the prescription
  // Default to Visit 1 (first visit) if no visitId is provided
  const sortedVisits = [...patient.visits].sort((a, b) => a.visitNumber - b.visitNumber);
  
  let selectedVisit = sortedVisits[0]; // Default to Visit 1
  if (visitIdParam) {
    const foundVisit = patient.visits.find(v => v.id === visitIdParam);
    if (foundVisit) {
      selectedVisit = foundVisit;
    }
  }

  // Format Gender (e.g. "Male" -> "M", "Female" -> "F")
  const formatGender = (gender: string | null) => {
    if (!gender) return "";
    const g = gender.toLowerCase();
    if (g.startsWith("f")) return "F";
    if (g.startsWith("m")) return "M";
    return gender.charAt(0).toUpperCase();
  };

  return (
    <main className="container max-w-4xl mx-auto px-4 sm:px-6 py-6 min-h-screen print:p-0 print:m-0 print:min-h-0">
      <PrescriptionActionsHeader 
        patientId={patient.patientId} 
        patientDbId={patient.id}
        prescriptionId={resolvedParams.prescriptionId} 
        visits={sortedVisits}
        selectedVisitId={selectedVisit?.id}
      />

      <PrescriptionDocumentScaler>
        {/* Visual Frame for Screen */}
        <div className="bg-white shadow-xl overflow-hidden print:shadow-none border border-gray-200 print:border-none relative">
          
          {/* Custom Size Content - A4 */}
          <div 
            id="prescription-content"
            className="relative bg-white"
            style={{
              width: PRINT_CONFIG.pageWidth,
              height: PRINT_CONFIG.pageHeight,
              boxSizing: 'border-box'
            }}
          >
            {/* 
              TOP ROW CONTAINER
            */}
            <div 
              className="absolute w-full" 
              style={{ 
                top: PRINT_CONFIG.topPosition, 
                fontSize: PRINT_CONFIG.fontSize, 
                fontFamily: PRINT_CONFIG.fontFamily,
                fontWeight: PRINT_CONFIG.fontWeight as React.CSSProperties["fontWeight"],
                color: PRINT_CONFIG.textColor
              }}
            >
              <span className="absolute" style={{ left: PRINT_CONFIG.nameLeft }}>
                {patient.name}
              </span>
              
              <span className="absolute" style={{ left: PRINT_CONFIG.ageLeft }}>
                {patient.age || ""}
              </span>
              
              <span className="absolute" style={{ left: PRINT_CONFIG.genderLeft }}>
                {formatGender(patient.gender)}
              </span>
              
              <span className="absolute" style={{ left: PRINT_CONFIG.dateLeft }}>
                {selectedVisit ? format(selectedVisit.visitDate, "dd/MM/yyyy") : format(new Date(), "dd/MM/yyyy")}
              </span>
            </div>

            {/* 
              MAIN BODY CONTAINER
            */}
            <div 
              className="absolute flex flex-col"
              style={{
                top: PRINT_CONFIG.bodyTop,
                left: PRINT_CONFIG.bodyLeft,
                width: `calc(100% - ${PRINT_CONFIG.bodyLeft} - 2cm)`, // Gives 2cm right margin
                fontFamily: PRINT_CONFIG.fontFamily,
                fontSize: PRINT_CONFIG.bodyFontSize,
                color: PRINT_CONFIG.textColor
              }}
            >
              {/* Patient ID (Small Text) */}
              <div 
                className="text-[11px] text-gray-500 mb-[1cm]"
              >
                {patient.patientId}
              </div>

              {/* Investigation Section */}
              {selectedVisit?.investigations && (
                <div className="flex flex-col mb-[1cm]">
                  <div style={{ fontWeight: PRINT_CONFIG.headingFontWeight }}>Investigation :-</div>
                  <div className="pl-4 mt-1 whitespace-pre-wrap">
                    {selectedVisit.investigations}
                  </div>
                </div>
              )}

              {/* Diagnoses Section */}
              {selectedVisit?.diagnoses && selectedVisit.diagnoses.length > 0 && (
                <div className="flex flex-col mb-[1cm]">
                  <div style={{ fontWeight: PRINT_CONFIG.headingFontWeight }}>Diagonoses :-</div>
                  <div className="pl-4 mt-1 space-y-1">
                    {selectedVisit.diagnoses.map((diagnosis, index) => (
                      <div key={index}>{diagnosis}</div>
                    ))}
                  </div>
                </div>
              )}

              {/* Rx (Medicines) Section */}
              {selectedVisit?.medicines && (
                <div className="flex flex-col mb-[1cm]">
                  <div style={{ fontWeight: PRINT_CONFIG.headingFontWeight }}>Rx: -</div>
                  <div className="pl-4 mt-1 whitespace-pre-wrap">
                    {selectedVisit.medicines}
                  </div>
                </div>
              )}

              {/* Advises Section */}
              {selectedVisit?.advices && selectedVisit.advices.length > 0 && (
                <div className="flex flex-col mb-[1cm]">
                  <div style={{ fontWeight: PRINT_CONFIG.headingFontWeight }}>Advises :-</div>
                  <div className="pl-4 mt-1 space-y-1">
                    {selectedVisit.advices.map((advice, index) => (
                      <div key={index}>{advice}</div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </PrescriptionDocumentScaler>

      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body {
            background: white;
            margin: 0;
            padding: 0;
          }
          @page {
            size: 21cm 29.7cm; /* A4 Size */
            margin: 0;
          }
        }
      `}} />
    </main>
  );
}
