"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search, ChevronLeft } from "lucide-react";
import { searchPatientsAction, createExistingVisitAction } from "@/actions/patient-actions";
import { getDiagnoses, getAdvises } from "@/app/admin/(protected)/settings/actions";
import { toast } from "sonner";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { existingVisitSchema, ExistingVisitInput } from "@/schemas/patient-schema";
import { SerialReceiptDialog } from "./serial-receipt-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Controller } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { MultiSelect, Option } from "@/components/ui/multi-select";
import { Separator } from "@/components/ui/separator";

interface ExistingPatientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExistingPatientDialog({ open, onOpenChange }: ExistingPatientDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<any | null>(null);
  
  const [isPending, setIsPending] = useState(false);
  const [receiptData, setReceiptData] = useState<any | null>(null);

  const form = useForm<ExistingVisitInput>({
    resolver: zodResolver(existingVisitSchema) as any,
    defaultValues: {
      patientId: "",
      visitDate: new Date(),
      investigations: "",
      medicines: "",
      diagnoses: [],
      advices: [],
    },
  });

  const [diagnosesOptions, setDiagnosesOptions] = useState<Option[]>([]);
  const [advicesOptions, setAdvisesOptions] = useState<Option[]>([]);

  useEffect(() => {
    async function fetchOptions() {
      try {
        const [diagnoses, advices] = await Promise.all([
          getDiagnoses(),
          getAdvises()
        ]);
        setDiagnosesOptions(diagnoses.map(d => ({ label: d.value, value: d.value })));
        setAdvisesOptions(advices.map(a => ({ label: a.value, value: a.value })));
      } catch (error) {
        console.error("Failed to fetch options", error);
      }
    }
    fetchOptions();
  }, []);

  // Reset state when dialog opens/closes
  useEffect(() => {
    if (open) {
      setSearchQuery("");
      setSearchResults([]);
      setSelectedPatient(null);
      form.reset({
        patientId: "",
        visitDate: new Date(),
        investigations: "",
        medicines: "",
        diagnoses: [],
        advices: [],
      });
    }
  }, [open, form]);

  // Handle search with debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.length >= 2) {
        setIsSearching(true);
        const result = await searchPatientsAction(searchQuery);
        if (result.success && result.patients) {
          setSearchResults(result.patients);
        } else {
          setSearchResults([]);
        }
        setIsSearching(false);
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSelectPatient = (patient: any) => {
    setSelectedPatient(patient);
    form.setValue("patientId", patient.id);
    form.setValue("investigations", "");
    form.setValue("diagnoses", []);
    form.setValue("advices", []);
    form.setValue("medicines", "");
  };

  const handleBackToSearch = () => {
    setSelectedPatient(null);
    form.reset({
      patientId: "",
      visitDate: new Date(),
      investigations: "",
      medicines: "",
      diagnoses: [],
      advices: [],
    });
  };

  const handleSubmit = form.handleSubmit(async (data) => {
    setIsPending(true);
    try {
      const result = await createExistingVisitAction(data) as any;
      if (result.error) {
        toast.error(result.error);
      } else if (result.success && result.visit) {
        toast.success("Visit added successfully.");
        onOpenChange(false);
        
        setReceiptData({
          patientId: result.patient.patientId,
          patientName: result.patient.name,
          visitNumber: result.visit.visitNumber,
          dailySerialNumber: result.visit.dailySerialNumber,
          visitDate: result.visit.visitDate,
        });
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsPending(false);
    }
  });

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold tracking-tight">Existing Patient</DialogTitle>
            <DialogDescription>
              Find an existing patient and add a new visit.
            </DialogDescription>
          </DialogHeader>

          {!selectedPatient ? (
            <div className="flex flex-col flex-1 gap-4">
              <Separator className="my-2" />
              <div className="relative shrink-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search by patient ID, name or mobile number..." 
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="flex-1">
                {isSearching ? (
                  <div className="text-center py-8 text-sm text-muted-foreground">Searching...</div>
                ) : searchResults.length > 0 ? (
                  <div className="space-y-3">
                    {searchResults.map((patient) => {
                      const lastVisit = patient.visits?.[0];
                      return (
                        <div 
                          key={patient.id}
                          onClick={() => handleSelectPatient(patient)}
                          className="p-3 border border-border/60 rounded-md bg-card hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer group"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-semibold text-primary text-sm group-hover:text-primary/80 transition-colors">{patient.patientId}</h4>
                              <p className="font-medium text-foreground text-sm mt-0.5">{patient.name}</p>
                            </div>
                            <span className="text-[11px] bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                              Visits: {patient._count?.visits || 0}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground mt-2 pt-2 border-t border-border/40">
                            <div>
                              <span className="font-medium text-foreground block">Mobile</span>
                              <span>{patient.mobile || "Not provided"}</span>
                            </div>
                            <div>
                              <span className="font-medium text-foreground block">Last Visit</span>
                              <span>{lastVisit ? format(new Date(lastVisit.visitDate), "dd MMM yyyy") : "None"}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : searchQuery.length >= 2 ? (
                  <div className="text-center py-8 text-sm text-muted-foreground">
                    No patients found matching "{searchQuery}"
                  </div>
                ) : (
                  <div className="text-center py-8 text-sm text-muted-foreground">
                    Enter at least 2 characters to search.
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col flex-1">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleBackToSearch}
                className="self-start -ml-2 mb-3 text-muted-foreground hover:text-foreground shrink-0 h-7 text-xs"
              >
                <ChevronLeft className="h-3.5 w-3.5 mr-1" />
                Back to Search
              </Button>

              <Separator className="my-2" />

              <div className="space-y-6">
                {/* Selected Patient Summary */}
                <div className="flex items-center justify-between bg-muted/30 px-3 py-2 rounded-md">
                  <h3 className="text-lg font-medium text-primary">Selected Patient</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Patient ID</p>
                    <p className="font-medium text-foreground">{selectedPatient.patientId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Name</p>
                    <p className="font-medium text-foreground truncate" title={selectedPatient.name}>{selectedPatient.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Mobile</p>
                    <p className="font-medium text-foreground">{selectedPatient.mobile || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Total Visits</p>
                    <p className="font-medium text-foreground">{selectedPatient._count?.visits || 0}</p>
                  </div>
                </div>

                <Separator className="my-4" />

                {/* New Visit Form */}
                <form id="existing-visit-form" onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center justify-between bg-muted/30 px-3 py-2 rounded-md">
                    <h3 className="text-lg font-medium text-foreground">New Visit</h3>
                    <div className="shrink-0">
                      <Controller
                        control={form.control}
                        name="visitDate"
                        render={({ field }) => (
                          <Popover>
                            <PopoverTrigger render={
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "justify-start text-left font-normal bg-background h-7 text-xs px-2",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-1.5 h-3.5 w-3.5" />
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              </Button>
                            } />
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() || date < new Date("1900-01-01")
                                }
                              />
                            </PopoverContent>
                          </Popover>
                        )}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* 1. Investigation */}
                    <div className="space-y-2">
                      <Label htmlFor="investigations">Investigation</Label>
                      <Textarea
                        id="investigations"
                        placeholder="Enter investigation details..."
                        rows={2}
                        className="resize-none"
                        {...form.register("investigations")}
                      />
                      {form.formState.errors.investigations && (
                        <p className="text-sm text-destructive">
                          {form.formState.errors.investigations.message}
                        </p>
                      )}
                    </div>

                    {/* 2. Diagnoses & Advises */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Diagnoses (Optional)</Label>
                        <Controller
                          control={form.control}
                          name="diagnoses"
                          render={({ field }) => (
                            <MultiSelect
                              options={diagnosesOptions}
                              selected={field.value || []}
                              onChange={field.onChange}
                              placeholder="Select diagnoses..."
                            />
                          )}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Advises (Optional)</Label>
                        <Controller
                          control={form.control}
                          name="advices"
                          render={({ field }) => (
                            <MultiSelect
                              options={advicesOptions}
                              selected={field.value || []}
                              onChange={field.onChange}
                              placeholder="Select advices..."
                            />
                          )}
                        />
                      </div>
                    </div>

                    {/* 3. Medicine / Treatment Notes / Rx */}
                    <div className="space-y-2">
                      <Label htmlFor="medicines">Medicine / Treatment Notes / Rx</Label>
                      <Textarea
                        id="medicines"
                        placeholder="Enter medicines given or treatment notes..."
                        rows={4}
                        className="resize-none min-h-[120px]"
                        {...form.register("medicines")}
                      />
                      {form.formState.errors.medicines && (
                        <p className="text-sm text-destructive">
                          {form.formState.errors.medicines.message}
                        </p>
                      )}
                    </div>
                  </div>
                </form>
              </div>

              <Separator className="my-6" />
              <div className="flex items-center justify-end gap-2 pb-2">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
                  Cancel
                </Button>
                <Button type="submit" form="existing-visit-form" disabled={isPending}>
                  {isPending ? "Adding visit..." : "Add Visit"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Show receipt dialog on success */}
      {receiptData && (
        <SerialReceiptDialog 
          open={!!receiptData} 
          onOpenChange={(isOpen) => {
            if (!isOpen) setReceiptData(null);
          }}
          data={receiptData}
        />
      )}
    </>
  );
}
