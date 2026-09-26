import { getPatientById } from "@/lib/patients/patient-service";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Trash2 } from "lucide-react";
import Link from "next/link";
import { EditPatientDialog } from "@/components/patients/edit-patient-dialog";
import { DeletePatientDialog } from "@/components/patients/delete-patient-dialog";

export const metadata = {
  title: "Patient Profile | Nabadiganta Homeo Darpan",
};

interface PatientProfilePageProps {
  params: Promise<{ patientId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PatientProfilePage({ params, searchParams }: PatientProfilePageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const patient = await getPatientById(resolvedParams.patientId);

  if (!patient) {
    notFound();
  }

  const isEditMode = resolvedSearchParams.edit === "true";

  // Prepare initial data for the edit form
  const initialData = {
    id: patient.id,
    name: patient.name,
    mobile: patient.mobile,
    age: patient.age || "",
    gender: patient.gender || "",
    registrationDate: patient.registrationDate,
    visits: patient.visits.map(v => ({
      id: v.id,
      visitDate: v.visitDate,
      investigations: v.investigations || "",
      medicines: v.medicines,
      diagnoses: v.diagnoses || [],
      advices: v.advices || [],
    })),
  };

  return (
    <main className="container max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-2 pb-8 space-y-6">
      <div className="flex items-center gap-4 mb-2">
        <Link 
          href="/admin/patients" 
          className="inline-flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 h-8 w-8 rounded-md transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground">
            Patient Profile
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            View and manage details for {patient.name}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Patient Details Section */}
        <div className="rounded-md border bg-card overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-muted/30 px-4 sm:px-6 py-4 border-b">
            <div>
              <h2 className="text-lg font-medium text-primary">Patient Information</h2>
              <p className="text-sm text-muted-foreground mt-0.5">Personal details and contact info</p>
            </div>
            <div className="flex items-center gap-2">
              <EditPatientDialog 
                patientId={patient.id} 
                initialData={initialData} 
                defaultOpen={isEditMode}
                trigger={
                  <Button variant="outline" size="sm" className="h-8 px-3 gap-1.5 text-primary hover:bg-primary/10 hover:text-primary border">
                    <span className="leading-none mt-[1px]">Edit</span>
                  </Button>
                }
              />
              <DeletePatientDialog 
                patientId={patient.id} 
                trigger={
                  <Button variant="outline" size="sm" className="h-8 px-3 gap-1.5 text-destructive hover:bg-destructive/10 hover:text-destructive border">
                    <Trash2 className="h-3.5 w-3.5" />
                    <span className="leading-none mt-[1px]">Delete</span>
                  </Button>
                }
              />
            </div>
          </div>
          
          <div className="p-4 sm:px-6 py-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-sm">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Patient ID</p>
                <p className="font-medium text-foreground">{patient.patientId}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Name</p>
                <p className="font-medium text-foreground">{patient.name}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Mobile</p>
                <p className="font-medium text-foreground">{patient.mobile || "N/A"}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Age</p>
                <p className="font-medium text-foreground">{patient.age || "N/A"}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Sex</p>
                <p className="font-medium text-foreground">{patient.gender || "N/A"}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Registered On</p>
                <p className="font-medium text-foreground">{format(patient.registrationDate, "dd MMM yyyy")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Visit History Section */}
        <div className="rounded-md border bg-card overflow-hidden">
          <div className="bg-muted/30 px-4 sm:px-6 py-4 border-b">
            <h2 className="text-lg font-medium text-primary">Visit History</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Previous appointments and treatments</p>
          </div>
          
          <div className="p-4 sm:px-6 py-6 space-y-6">
            {patient.visits.map((visit, index) => (
              <div key={visit.id} className="relative group">
                {/* Content Card */}
                <div className="bg-background rounded-md border shadow-sm">
                  <div className="flex flex-row items-center justify-between bg-muted/20 px-4 py-2.5 border-b">
                    <h3 className="text-sm font-semibold text-primary">
                      Visit {visit.visitNumber}
                    </h3>
                    <div className="flex items-center text-xs font-medium text-muted-foreground">
                      <Calendar className="mr-1.5 h-3.5 w-3.5" />
                      {format(visit.visitDate, "dd MMM yyyy")}
                    </div>
                  </div>
                  <div className="p-4 space-y-4 text-sm">
                    {visit.investigations && (
                      <div>
                        <h4 className="font-medium text-foreground mb-1">Investigation</h4>
                        <div className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                          {visit.investigations}
                        </div>
                      </div>
                    )}

                    {((visit.diagnoses && visit.diagnoses.length > 0) || (visit.advices && visit.advices.length > 0)) && (
                      <div className={visit.investigations ? "pt-4 border-t grid gap-4 sm:grid-cols-2" : "grid gap-4 sm:grid-cols-2"}>
                        {visit.diagnoses && visit.diagnoses.length > 0 && (
                          <div>
                            <h4 className="font-medium text-foreground mb-2">Diagnoses</h4>
                            <div className="flex flex-wrap gap-1.5">
                              {visit.diagnoses.map((d, i) => (
                                <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-muted text-muted-foreground border">
                                  {d}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {visit.advices && visit.advices.length > 0 && (
                          <div>
                            <h4 className="font-medium text-foreground mb-2">Advises</h4>
                            <div className="flex flex-wrap gap-1.5">
                              {visit.advices.map((a, i) => (
                                <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-muted text-muted-foreground border">
                                  {a}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className={(visit.investigations || (visit.diagnoses && visit.diagnoses.length > 0) || (visit.advices && visit.advices.length > 0)) ? "pt-4 border-t" : ""}>
                      <h4 className="font-medium text-foreground mb-1">Medicine / Treatment Notes / Rx</h4>
                      <div className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                        {visit.medicines || <span className="italic">No medicines or treatment notes recorded.</span>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {patient.visits.length === 0 && (
              <div className="text-center py-8 text-sm text-muted-foreground border rounded-md bg-muted/10">
                No visits recorded yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
