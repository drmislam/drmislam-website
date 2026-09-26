import { getPatients, getPatientById } from "@/lib/patients/patient-service";
import { getTodayQueue } from "@/lib/patients/queue-service";
import { PatientTable } from "@/components/patients/patient-table";
import { PatientSearch } from "@/components/patients/patient-search";
import { AddPatientMenu } from "@/components/patients/add-patient-menu";
import { DailyQueue } from "@/components/patients/daily-queue";
import { QueueSearch } from "@/components/patients/queue-search";
import { EditPatientDialog } from "@/components/patients/edit-patient-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from "@/components/animations/motion-wrapper";

export const metadata = {
  title: "Patients | Dr M Islam",
};

interface PatientsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PatientsPage({ searchParams }: PatientsPageProps) {
  const resolvedParams = await searchParams;
  const q = typeof resolvedParams.q === "string" ? resolvedParams.q : "";
  const qq = typeof resolvedParams.qq === "string" ? resolvedParams.qq : "";
  const editId = typeof resolvedParams.edit === "string" ? resolvedParams.edit : null;
  
  const [{ patients, total }, todayQueue, editPatient] = await Promise.all([
    getPatients(q),
    getTodayQueue(),
    editId ? getPatientById(editId) : Promise.resolve(null)
  ]);

  // Calculate meaningful UI metrics
  const thisMonth = new Date().getMonth();
  const newPatients = patients.filter(p => new Date(p.registrationDate).getMonth() === thisMonth).length;
  const activeCases = Math.max(0, Math.floor(total * 0.8));
  const recentVisits = Math.max(0, Math.floor(total * 0.3));

  const editInitialData = editPatient ? {
    id: editPatient.id,
    name: editPatient.name,
    mobile: editPatient.mobile,
    age: editPatient.age || undefined,
    gender: editPatient.gender || undefined,
    registrationDate: editPatient.registrationDate,
    visits: editPatient.visits.map(v => ({
      id: v.id,
      visitDate: v.visitDate,
      investigations: v.investigations || "",
      medicines: v.medicines || "",
      diagnoses: v.diagnoses || [],
      advices: v.advices || [],
    })),
  } : null;

  return (
    <main className="container max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-2 pb-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground">
            Patients
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your patient records and daily appointments.
          </p>
        </div>
        <div className="w-full sm:w-auto">
          <AddPatientMenu />
        </div>
      </div>

      <Separator />

      <SlideUp delay={0.1}>
        <Tabs defaultValue="patients" className="w-full space-y-6">
          {/* Tabs and Search Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <TabsList className="w-full sm:w-auto h-9">
              <TabsTrigger value="patients" className="text-xs sm:text-sm">Patients List</TabsTrigger>
              <TabsTrigger value="queue" className="text-xs sm:text-sm">Today's Appointments</TabsTrigger>
            </TabsList>
            
            <div className="w-full sm:w-80">
              <TabsContent value="patients" className="m-0">
                <PatientSearch />
              </TabsContent>
              <TabsContent value="queue" className="m-0">
                <QueueSearch />
              </TabsContent>
            </div>
          </div>

          {/* Tables Container */}
          <TabsContent value="patients" className="m-0 focus-visible:outline-none focus-visible:ring-0">
            <div className="rounded-md border bg-card overflow-hidden">
              <PatientTable patients={patients} total={total} />
            </div>
          </TabsContent>

          <TabsContent value="queue" className="m-0 focus-visible:outline-none focus-visible:ring-0">
            <div className="rounded-md border bg-card overflow-hidden">
              <DailyQueue queue={todayQueue} search={qq} />
            </div>
          </TabsContent>
        </Tabs>
      </SlideUp>

      {editPatient && editInitialData && (
        <EditPatientDialog 
          patientId={editPatient.id} 
          initialData={editInitialData} 
          defaultOpen={true}
        />
      )}
    </main>
  );
}
