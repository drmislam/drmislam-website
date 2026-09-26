"use client";

import { useState } from"react";
import {
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from"@/components/ui/table";
import { Button, buttonVariants } from"@/components/ui/button";
import { Pencil, Trash2 } from"lucide-react";
import Link from"next/link";
import { Separator } from"@/components/ui/separator";
import { DeletePatientDialog } from"./delete-patient-dialog";

interface DailyQueueProps {
 queue: {
 id: string;
 patientId: string;
 visitNumber: number;
 visitDate: Date;
 dailySerialNumber: number | null;
 patient: {
 id: string;
 patientId: string;
 name: string;
 mobile: string;
 age: string | null;
 gender: string | null;
 registrationDate: Date;
 };
 }[];
 search?: string;
}

export function DailyQueue({ queue, search = "" }: DailyQueueProps) {
 const filteredQueue = search.trim()
 ? queue.filter((visit) => {
 const term = search.toLowerCase();
 return (
 visit.patient.name.toLowerCase().includes(term) ||
 visit.patient.patientId.toLowerCase().includes(term) ||
 visit.patient.mobile.toLowerCase().includes(term) ||
 (visit.dailySerialNumber?.toString() || "").includes(term)
 );
 })
 : queue;

 if (queue.length === 0) {
 return (
 <div className="flex flex-col items-center justify-center p-8 text-center bg-card h-64 border rounded-md shadow-sm">
 <h3 className="text-lg font-semibold mb-2">Queue is empty</h3>
 <p className="text-muted-foreground text-sm max-w-sm mx-auto">
 No patients have been added to today's queue yet.
 </p>
 </div>
 );
 }

 return (
 <Table className="w-full min-w-[700px] text-xs md:text-sm">
 <TableHeader>
 <TableRow>
 <TableHead className="font-semibold text-foreground/80 whitespace-nowrap w-[8%] text-center">Token No.</TableHead>
 <TableHead className="font-semibold text-foreground/80 whitespace-nowrap w-[10%]">Patient ID</TableHead>
 <TableHead className="font-semibold text-foreground/80 whitespace-nowrap w-[20%]">Name</TableHead>
 <TableHead className="font-semibold text-foreground/80 whitespace-nowrap w-[12%]">Mobile No.</TableHead>
 <TableHead className="font-semibold text-foreground/80 whitespace-nowrap w-[8%] text-center">Age</TableHead>
 <TableHead className="font-semibold text-foreground/80 whitespace-nowrap w-[7%] text-center">Sex</TableHead>
 <TableHead className="font-semibold text-foreground/80 whitespace-nowrap w-[10%] text-center">Registered</TableHead>
 <TableHead className="font-semibold text-foreground/80 whitespace-nowrap w-[25%] text-center">Actions</TableHead>
 </TableRow>
 </TableHeader>
 <TableBody>
 {filteredQueue.length === 0 ? (
 <TableRow>
 <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
 No matching patients found in today's appointments.
 </TableCell>
 </TableRow>
 ) : (
 filteredQueue.map((visit) => (
 <TableRow key={visit.id}>
 <TableCell className="font-bold text-muted-foreground text-center">
 {visit.dailySerialNumber ||"-"}
 </TableCell>
 <TableCell className="font-medium text-primary truncate">
 <Link href={`/admin/patients/${visit.patient.id}`} className="hover:underline">
 {visit.patient.patientId}
 </Link>
 </TableCell>
 <TableCell className="truncate">
 <Link href={`/admin/patients/${visit.patient.id}`} className="hover:underline">
 {visit.patient.name}
 </Link>
 </TableCell>
 <TableCell className="truncate">
 {visit.patient.mobile ||"-"}
 </TableCell>
 <TableCell className="truncate text-center">{visit.patient.age ||"-"}</TableCell>
 <TableCell className="truncate text-center">{visit.patient.gender ||"-"}</TableCell>
 <TableCell className="truncate text-center">
 {/* @ts-ignore */}
 {visit.patient.registrationDate ? new Date(visit.patient.registrationDate).toLocaleDateString() :"-"}
 </TableCell>
 <TableCell>
 <div className="flex items-center justify-center gap-2 h-8">
 <Link 
 href={`/admin/patients?edit=${visit.patient.id}`}
 className={`${buttonVariants({ variant:"outline", size:"sm" })} h-8 px-3 gap-1.5 text-primary hover:bg-primary/10 hover:text-primary flex items-center justify-center border`}
 >
 <Pencil className="h-3.5 w-3.5" />
 <span className="leading-none mt-[1px]">Edit</span>
 </Link>
 <Separator orientation="vertical" className="h-full" />
 <DeletePatientDialog 
 patientId={visit.patient.id} 
 trigger={
 <Button variant="outline" size="sm" className="h-8 px-3 gap-1.5 text-destructive hover:bg-destructive/10 hover:text-destructive flex items-center justify-center">
 <Trash2 className="h-3.5 w-3.5" />
 <span className="leading-none mt-[1px]">Delete</span>
 </Button>
 }
 />
 </div>
 </TableCell>
 </TableRow>
 ))
 )}
 </TableBody>
 </Table>
 );
}
