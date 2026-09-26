"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import {
  getDiagnoses,
  getAdvises,
} from "@/app/admin/(protected)/settings/actions";
import { patientSchema, PatientInput } from "@/schemas/patient-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Controller } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { MultiSelect, Option } from "@/components/ui/multi-select";
import { Separator } from "@/components/ui/separator";

interface NewPatientFormProps {
  onSubmit: (data: PatientInput) => Promise<void>;
  isPending: boolean;
  onCancel: () => void;
}

export function NewPatientForm({
  onSubmit,
  isPending,
  onCancel,
}: NewPatientFormProps) {
  const [diagnosesOptions, setDiagnosesOptions] = useState<Option[]>([]);
  const [advicesOptions, setAdvisesOptions] = useState<Option[]>([]);

  useEffect(() => {
    async function fetchOptions() {
      try {
        const [diagnoses, advices] = await Promise.all([
          getDiagnoses(),
          getAdvises(),
        ]);
        setDiagnosesOptions(
          diagnoses.map((d) => ({ label: d.value, value: d.value })),
        );
        setAdvisesOptions(
          advices.map((a) => ({ label: a.value, value: a.value })),
        );
      } catch (error) {
        console.error("Failed to fetch options", error);
      }
    }
    fetchOptions();
  }, []);

  const form = useForm<PatientInput>({
    resolver: zodResolver(patientSchema) as any,
    defaultValues: {
      name: "",
      mobile: "",
      age: "",
      gender: "",
      registrationDate: new Date(),
      visits: [
        {
          visitDate: new Date(),
          investigations: "",
          medicines: "",
          diagnoses: [],
          advices: [],
        },
      ],
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    await onSubmit(data);
  });

  return (
    <form id="new-patient-form" onSubmit={handleSubmit} className="space-y-6">
      <ScrollArea className="h-[60vh] pr-4">
        <div className="space-y-6">
          {/* Patient Information Section */}
          <div>
            <div className="flex items-center justify-between bg-muted/30 px-3 py-2 rounded-md mb-4">
              <h3 className="text-lg font-medium text-primary">
                Patient Information
              </h3>
              <div className="shrink-0">
                <Controller
                  control={form.control}
                  name="registrationDate"
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger
                        render={
                          <Button
                            variant={"outline"}
                            className={cn(
                              "justify-start text-left font-normal bg-background h-7 text-xs px-2",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-1.5 h-3.5 w-3.5" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        }
                      />
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
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Rahul Kumar"
                  {...form.register("name")}
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number (Optional)</Label>
                <Input
                  id="mobile"
                  placeholder="9876543210"
                  maxLength={10}
                  {...form.register("mobile")}
                />
                {form.formState.errors.mobile && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.mobile.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age (Optional)</Label>
                <Input
                  id="age"
                  placeholder="e.g. 35 or 10 months"
                  {...form.register("age")}
                />
                {form.formState.errors.age && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.age.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Sex (Optional)</Label>
                <Controller
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full bg-background border-input">
                        <SelectValue placeholder="Select sex" />
                      </SelectTrigger>
                      <SelectContent className="p-1">
                        <SelectItem value="Male" className="cursor-pointer">
                          <div className="flex items-center gap-2.5">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-blue-500"
                            >
                              <circle cx="10" cy="14" r="5" />
                              <line x1="13.54" y1="10.46" x2="21" y2="3" />
                              <line x1="16" y1="3" x2="21" y2="3" />
                              <line x1="21" y1="8" x2="21" y2="3" />
                            </svg>
                            <span className="font-medium text-foreground">
                              Male
                            </span>
                          </div>
                        </SelectItem>
                        <SelectItem value="Female" className="cursor-pointer">
                          <div className="flex items-center gap-2.5">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-pink-500"
                            >
                              <circle cx="12" cy="10" r="5" />
                              <line x1="12" y1="15" x2="12" y2="22" />
                              <line x1="9" y1="19" x2="15" y2="19" />
                            </svg>
                            <span className="font-medium text-foreground">
                              Female
                            </span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {form.formState.errors.gender && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.gender.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          {/* First Visit Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-muted/30 px-3 py-2 rounded-md">
              <h3 className="text-lg font-medium text-foreground">Visit 1</h3>
              <div className="shrink-0">
                <Controller
                  control={form.control}
                  name="visits.0.visitDate"
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger
                        render={
                          <Button
                            variant={"outline"}
                            className={cn(
                              "justify-start text-left font-normal bg-background h-7 text-xs px-2",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-1.5 h-3.5 w-3.5" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        }
                      />
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
                {form.formState.errors.visits?.[0]?.visitDate && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.visits[0]?.visitDate?.message}
                  </p>
                )}
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
                  {...form.register("visits.0.investigations")}
                />
                {form.formState.errors.visits?.[0]?.investigations && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.visits[0]?.investigations?.message}
                  </p>
                )}
              </div>

              {/* 2. Diagnoses & Advises */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Diagnoses (Optional)</Label>
                  <Controller
                    control={form.control}
                    name="visits.0.diagnoses"
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
                    name="visits.0.advices"
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
                  {...form.register("visits.0.medicines")}
                />
                {form.formState.errors.visits?.[0]?.medicines && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.visits[0]?.medicines?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
      <Separator className="my-6" />
      <div className="flex items-center justify-end gap-2 pb-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating patient..." : "Save Patient"}
        </Button>
      </div>
    </form>
  );
}
