import Link from"next/link";
import { format } from"date-fns";
import {
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from"@/components/ui/table";
import { Button } from"@/components/ui/button";
import { ArrowRight } from"lucide-react";

interface PatientBasic {
 id: string;
 patientId: string;
 name: string;
 mobile: string;
 registrationDate: Date;
}

interface VisitBasic {
 id: string;
 dailySerialNumber: number | null;
 patient: {
 id: string;
 patientId: string;
 name: string;
 mobile: string;
 };
}

interface DashboardTablesProps {
 recentPatients: PatientBasic[];
 todayQueue: VisitBasic[];
}

export function DashboardTables({ recentPatients, todayQueue }: DashboardTablesProps) {
 return (
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mt-6">
 
 {/* All Patients List (Recent) */}
 <div className="rounded-md border bg-card overflow-hidden">
 <div className="flex items-center justify-between gap-4 bg-muted/30 px-4 py-3 border-b">
 <div>
 <h2 className="text-sm font-medium text-primary">Recently Registered</h2>
 <p className="text-xs text-muted-foreground mt-0.5">Latest patients added to the system</p>
 </div>
 <Link href="/admin/patients" className="flex items-center text-xs text-primary hover:underline transition-colors shrink-0">
 View All <ArrowRight className="ml-1 h-3.5 w-3.5" />
 </Link>
 </div>
 
 <Table>
 <TableHeader>
 <TableRow>
 <TableHead className="w-1/3 text-xs font-semibold">Patient ID</TableHead>
 <TableHead className="w-1/3 text-xs font-semibold">Name</TableHead>
 <TableHead className="w-1/3 text-xs font-semibold">Mobile</TableHead>
 </TableRow>
 </TableHeader>
 <TableBody>
 {recentPatients.length > 0 ? (
 recentPatients.map((patient) => (
 <TableRow key={patient.id} className="hover:bg-muted/10">
 <TableCell className="font-medium text-xs w-1/3">
 <Link href={`/admin/patients/${patient.id}`} className="hover:underline text-primary">
 {patient.patientId}
 </Link>
 </TableCell>
 <TableCell className="text-xs truncate w-1/3">
 <Link href={`/admin/patients/${patient.id}`} className="hover:underline">
 {patient.name}
 </Link>
 </TableCell>
 <TableCell className="text-xs text-muted-foreground w-1/3">
 {patient.mobile ||"N/A"}
 </TableCell>
 </TableRow>
 ))
 ) : (
 <TableRow>
 <TableCell colSpan={3} className="h-24 text-center text-sm text-muted-foreground">
 No patients found.
 </TableCell>
 </TableRow>
 )}
 </TableBody>
 </Table>
 </div>

 {/* Today's Appointments */}
 <div className="rounded-md border bg-card overflow-hidden">
 <div className="flex items-center justify-between gap-4 bg-muted/30 px-4 py-3 border-b">
 <div>
 <h2 className="text-sm font-medium text-primary">Today's Appointments</h2>
 <p className="text-xs text-muted-foreground mt-0.5">Live queue for today's visits</p>
 </div>
 <Link href="/admin/patients?tab=queue" className="flex items-center text-xs text-primary hover:underline transition-colors shrink-0">
 View Queue <ArrowRight className="ml-1 h-3.5 w-3.5" />
 </Link>
 </div>
 
 <Table>
 <TableHeader>
 <TableRow>
 <TableHead className="w-1/3 text-xs font-semibold text-center">Token No.</TableHead>
 <TableHead className="w-1/3 text-xs font-semibold">Name</TableHead>
 <TableHead className="w-1/3 text-xs font-semibold">Mobile</TableHead>
 </TableRow>
 </TableHeader>
 <TableBody>
 {todayQueue.length > 0 ? (
 todayQueue.map((visit) => (
 <TableRow key={visit.id} className="hover:bg-muted/10">
 <TableCell className="w-1/3 font-bold text-xs text-center text-muted-foreground">
 {visit.dailySerialNumber ||"-"}
 </TableCell>
 <TableCell className="w-1/3 text-xs font-medium truncate">
 <Link href={`/admin/patients/${visit.patient.id}`} className="hover:underline">
 {visit.patient.name}
 </Link>
 </TableCell>
 <TableCell className="w-1/3 text-xs text-muted-foreground">
 {visit.patient.mobile ||"N/A"}
 </TableCell>
 </TableRow>
 ))
 ) : (
 <TableRow>
 <TableCell colSpan={3} className="h-24 text-center text-sm text-muted-foreground">
 No appointments scheduled for today.
 </TableCell>
 </TableRow>
 )}
 </TableBody>
 </Table>
 </div>

 </div>
 );
}
