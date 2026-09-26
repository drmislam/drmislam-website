"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, CheckCircle2, Clock3, Video, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { chambers, videoConsultation } from "@/data/chambers";

type ConsultationType = "in-person" | "video";

type FormData = {
  name: string;
  age: string;
  sex: string;
  address: string;
  phone: string;
  chamberId: string;
  date: Date | undefined;
};

const controlClass = `
  h-12
  min-h-12
  w-full
  rounded-md
  border
  border-primary/10
  bg-background
  px-4
  py-0
  text-sm
  text-foreground
  shadow-none
  outline-none
  transition-all
  duration-200
  placeholder:text-muted-foreground/60
  hover:border-primary/20
  focus-visible:border-primary/30
  focus-visible:ring-2
  focus-visible:ring-primary/10
  disabled:cursor-not-allowed
  disabled:opacity-50
`;

const errorControlClass = `
  border-destructive
  hover:border-destructive
  focus-visible:border-destructive
  focus-visible:ring-destructive/10
`;

export function AppointmentForm() {
  const searchParams = useSearchParams();

  const [tab, setTab] = useState<ConsultationType>(
    searchParams.get("type") === "video" ? "video" : "in-person",
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    age: "",
    sex: "",
    address: "",
    phone: "",
    chamberId: searchParams.get("chamber") || "",
    date: undefined,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const typeParam = searchParams.get("type");
    const chamberParam = searchParams.get("chamber");

    if (typeParam === "video") {
      setTab("video");
    }

    if (chamberParam) {
      setTab("in-person");

      setFormData((prev) => ({
        ...prev,
        chamberId: chamberParam,
      }));
    }
  }, [searchParams]);

  const updateField = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleTabChange = (value: string) => {
    setTab(value as ConsultationType);
    setErrors({});
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      nextErrors.name = "Please enter your full name.";
    }

    const age = Number(formData.age);

    if (!formData.age || !Number.isInteger(age) || age < 1 || age > 120) {
      nextErrors.age = "Please enter a valid age.";
    }

    if (!formData.sex) {
      nextErrors.sex = "Please select your sex.";
    }

    if (!formData.address.trim()) {
      nextErrors.address = "Please enter your address.";
    }

    if (!formData.phone.trim()) {
      nextErrors.phone = "Please enter your phone number.";
    }

    if (tab === "in-person" && !formData.chamberId) {
      nextErrors.chamberId = "Please select a chamber.";
    }

    if (!formData.date) {
      nextErrors.date = "Please select a preferred date.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    const payload = {
      consultationType: tab,
      name: formData.name.trim(),
      age: Number(formData.age),
      sex: formData.sex,
      address: formData.address.trim(),
      phone: formData.phone.trim(),
      chamberId: tab === "in-person" ? formData.chamberId : undefined,
      date: formData.date ? format(formData.date, "yyyy-MM-dd") : undefined,
    };

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        console.error("Failed to submit appointment");
        // We could show an error toast here in the future
      }
    } catch (error) {
      console.error("An error occurred during submission:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSuccess(false);
    setErrors({});
  };

  if (isSuccess) {
    return (
      <div className="w-full rounded-2xl border border-primary/10 bg-card p-8 shadow-sm md:p-12">
        <div className="mx-auto flex max-w-md flex-col items-center text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CheckCircle2 className="h-8 w-8" />
          </div>

          <h3 className="text-2xl font-bold tracking-tight text-foreground">
            Request Received
          </h3>

          <p className="mt-3 text-sm leading-6 text-muted-foreground md:text-base">
            {tab === "in-person"
              ? "Thank you. Your consultation request has been received. We will contact you with the appointment details."
              : "Your video consultation request has been received. We will contact you regarding the scheduled consultation."}
          </p>

          <Button
            type="button"
            variant="outline"
            onClick={resetForm}
            className="mt-8 h-11 rounded-md px-6"
          >
            Book Another Appointment
          </Button>
        </div>
      </div>
    );
  }

  const dateFieldJsx = (
    <div className="w-full space-y-2">
      <Label
        htmlFor="date"
        className="text-sm font-semibold text-foreground"
      >
        Preferred Date
      </Label>

      <Popover>
        <PopoverTrigger
          className={cn(
            buttonVariants({ variant: "outline" }),
            "w-full flex",
            controlClass,
            "justify-start text-left font-normal",
            !formData.date && "text-muted-foreground",
            errors.date ? errorControlClass : ""
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {formData.date ? format(formData.date, "PPP") : <span>Select a date</span>}
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={formData.date}
            onSelect={(date) => updateField("date", date)}
            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {errors.date && (
        <p className="text-xs font-medium text-destructive">
          {errors.date}
        </p>
      )}
    </div>
  );

  return (
    <div className="w-full rounded-2xl border border-primary/10 bg-card p-5 shadow-sm sm:p-6 md:p-8">
      <form onSubmit={handleSubmit} className="w-full" noValidate>
        {/* ========================================
            CONSULTATION TYPE — RADIO GROUP
        ========================================= */}

        <fieldset className="w-full" aria-label="Consultation type">
          <legend className="mb-3 text-sm font-semibold text-foreground">
            Consultation Type
          </legend>

          <div className="flex flex-col gap-3 sm:flex-row">
            {(
              [
                {
                  value: "in-person" as ConsultationType,
                  label: "In-Person Appointment",
                  description:
                    "Visit a chamber in Beldanga, Berhampur or Kolkata",
                },
                {
                  value: "video" as ConsultationType,
                  label: "Video Consultation",
                  description: "Fri · Sat · Sun, 9:00 PM – 10:00 PM",
                },
              ] as const
            ).map((option) => {
              const isSelected = tab === option.value;
              return (
                <label
                  key={option.value}
                  htmlFor={`type-${option.value}`}
                  className={[
                    "group relative flex flex-1 cursor-pointer items-start gap-3 rounded-xl border p-4 transition-all duration-200",
                    isSelected
                      ? "border-primary/40 bg-primary/5 shadow-sm ring-1 ring-primary/20"
                      : "border-border/60 bg-muted/30 hover:border-primary/20 hover:bg-muted/50",
                  ].join(" ")}
                >
                  {/* Hidden native radio */}
                  <input
                    type="radio"
                    id={`type-${option.value}`}
                    name="consultationType"
                    value={option.value}
                    checked={isSelected}
                    onChange={() => handleTabChange(option.value)}
                    className="sr-only"
                  />

                  {/* Custom radio circle */}
                  <div
                    className={[
                      "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-200",
                      isSelected
                        ? "border-primary bg-primary"
                        : "border-muted-foreground/40 bg-background",
                    ].join(" ")}
                  >
                    {isSelected && (
                      <div className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
                    )}
                  </div>

                  {/* Label and description */}
                  <div className="min-w-0">
                    <p
                      className={[
                        "text-sm font-semibold leading-5 transition-colors",
                        isSelected ? "text-primary" : "text-foreground",
                      ].join(" ")}
                    >
                      {option.label}
                    </p>
                    <p className="mt-0.5 text-xs leading-4 text-muted-foreground">
                      {option.description}
                    </p>
                  </div>
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* ========================================
            COMMON FIELDS
        ========================================= */}

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-x-8 md:gap-y-7">
          {/* FULL NAME */}
          <div className="min-w-0 space-y-2">
            <Label
              htmlFor="name"
              className="text-sm font-semibold text-foreground"
            >
              Full Name
            </Label>

            <Input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(event) => updateField("name", event.target.value)}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={`${controlClass} ${
                errors.name ? errorControlClass : ""
              }`}
            />

            {errors.name && (
              <p
                id="name-error"
                className="text-xs font-medium text-destructive"
              >
                {errors.name}
              </p>
            )}
          </div>

          {/* AGE */}
          <div className="min-w-0 space-y-2">
            <Label
              htmlFor="age"
              className="text-sm font-semibold text-foreground"
            >
              Age
            </Label>

            <Input
              id="age"
              name="age"
              type="number"
              inputMode="numeric"
              min={1}
              max={120}
              placeholder="Enter your age"
              value={formData.age}
              onChange={(event) => updateField("age", event.target.value)}
              aria-invalid={!!errors.age}
              aria-describedby={errors.age ? "age-error" : undefined}
              className={`${controlClass} ${
                errors.age ? errorControlClass : ""
              }`}
            />

            {errors.age && (
              <p
                id="age-error"
                className="text-xs font-medium text-destructive"
              >
                {errors.age}
              </p>
            )}
          </div>

          {/* SEX */}
          <div className="min-w-0 space-y-2">
            <Label
              htmlFor="sex"
              className="text-sm font-semibold text-foreground"
            >
              Sex
            </Label>

            <Select
              value={formData.sex}
              onValueChange={(value) => updateField("sex", value)}
            >
              <SelectTrigger
                id="sex"
                aria-invalid={!!errors.sex}
                aria-describedby={errors.sex ? "sex-error" : undefined}
                className={`${controlClass} ${
                  errors.sex ? errorControlClass : ""
                }`}
              >
                <SelectValue placeholder="Select sex" />
              </SelectTrigger>

              <SelectContent
                position="popper"
                sideOffset={6}
                className="
                  min-w-[var(--radix-select-trigger-width)]
                  rounded-lg
                  border
                  border-border
                  bg-popover
                  p-1.5
                  shadow-lg
                "
              >
                <SelectItem
                  value="Male"
                  className="
                    min-h-10
                    cursor-pointer
                    rounded-md
                    px-3
                    py-2.5
                    pl-8
                    text-sm
                    leading-5
                  "
                >
                  Male
                </SelectItem>

                <SelectItem
                  value="Female"
                  className="
                    min-h-10
                    cursor-pointer
                    rounded-md
                    px-3
                    py-2.5
                    pl-8
                    text-sm
                    leading-5
                  "
                >
                  Female
                </SelectItem>

                <SelectItem
                  value="Other"
                  className="
                    min-h-10
                    cursor-pointer
                    rounded-md
                    px-3
                    py-2.5
                    pl-8
                    text-sm
                    leading-5
                  "
                >
                  Other
                </SelectItem>

                <SelectItem
                  value="Prefer not to say"
                  className="
                    min-h-10
                    cursor-pointer
                    rounded-md
                    px-3
                    py-2.5
                    pl-8
                    text-sm
                    leading-5
                  "
                >
                  Prefer not to say
                </SelectItem>
              </SelectContent>
            </Select>

            {errors.sex && (
              <p
                id="sex-error"
                className="text-xs font-medium text-destructive"
              >
                {errors.sex}
              </p>
            )}
          </div>

          {/* PHONE */}
          <div className="min-w-0 space-y-2">
            <Label
              htmlFor="phone"
              className="text-sm font-semibold text-foreground"
            >
              Phone Number
            </Label>

            <Input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              className={`${controlClass} ${
                errors.phone ? errorControlClass : ""
              }`}
            />

            {errors.phone && (
              <p
                id="phone-error"
                className="text-xs font-medium text-destructive"
              >
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        {/* ========================================
            VIDEO: DATE SELECTION (ABOVE ADDRESS)
        ========================================= */}

        {tab === "video" && (
          <div className="mt-6 md:mt-7 w-full">
            {dateFieldJsx}
          </div>
        )}

        {/* ========================================
            ADDRESS
        ========================================= */}

        <div className="mt-6 space-y-2 md:mt-7">
          <Label
            htmlFor="address"
            className="text-sm font-semibold text-foreground"
          >
            Address
          </Label>

          <Textarea
            id="address"
            name="address"
            autoComplete="street-address"
            placeholder="Enter your full address"
            value={formData.address}
            onChange={(event) => updateField("address", event.target.value)}
            aria-invalid={!!errors.address}
            aria-describedby={errors.address ? "address-error" : undefined}
            className={`
              min-h-[120px]
              w-full
              resize-y
              rounded-md
              border
              border-primary/10
              bg-background
              px-4
              py-3
              text-sm
              leading-6
              shadow-none
              transition-all
              duration-200

              placeholder:text-muted-foreground/60

              hover:border-primary/20

              focus-visible:border-primary/30
              focus-visible:ring-2
              focus-visible:ring-primary/10

              ${errors.address ? errorControlClass : ""}
            `}
          />

          {errors.address && (
            <p
              id="address-error"
              className="text-xs font-medium text-destructive"
            >
              {errors.address}
            </p>
          )}
        </div>

        {/* ========================================
            IN-PERSON: CHAMBER & DATE
        ========================================= */}

        {tab === "in-person" && (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-7 md:gap-x-8 md:gap-y-7">
            <div className="min-w-0 space-y-2">
              <Label
                htmlFor="chamber"
                className="text-sm font-semibold text-foreground"
              >
                Choose a Chamber
              </Label>
  
              <Select
                value={formData.chamberId}
                onValueChange={(value) => updateField("chamberId", value)}
              >
                <SelectTrigger
                  id="chamber"
                  aria-invalid={!!errors.chamberId}
                  aria-describedby={
                    errors.chamberId ? "chamber-error" : undefined
                  }
                  className={`${controlClass} ${
                    errors.chamberId ? errorControlClass : ""
                  }`}
                >
                  <SelectValue placeholder="Select a convenient location" />
                </SelectTrigger>
  
                <SelectContent
                  position="popper"
                  sideOffset={6}
                  className="
                    min-w-[var(--radix-select-trigger-width)]
                    max-w-[calc(100vw-2rem)]
                    rounded-lg
                    border
                    border-border
                    bg-popover
                    p-1.5
                    shadow-lg
                  "
                >
                  {chambers.map((chamber) => (
                    <SelectItem
                      key={chamber.id}
                      value={chamber.id}
                      className="
                        min-h-12
                        cursor-pointer
                        rounded-md
                        px-3
                        py-2.5
                        pl-8
                        text-sm
                      "
                    >
                      <div className="flex min-w-0 flex-col gap-0.5 pr-2">
                        <span className="truncate text-sm font-medium leading-5">
                          {chamber.name}
                        </span>
  
                        <span className="truncate text-xs leading-4 text-muted-foreground">
                          {chamber.address}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
  
              {errors.chamberId && (
                <p
                  id="chamber-error"
                  className="text-xs font-medium text-destructive"
                >
                  {errors.chamberId}
                </p>
              )}
            </div>

            <div className="min-w-0 w-full">
              {dateFieldJsx}
            </div>
          </div>
        )}

        {/* ========================================
            VIDEO CONSULTATION
        ========================================= */}

        {tab === "video" && (
          <div
            className="
              mt-6
              rounded-xl
              border
              border-primary/15
              bg-primary/[0.04]
              p-5
              md:mt-7
              md:p-6
            "
          >
            <div className="flex items-start gap-3">
              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-primary/10
                  text-primary
                "
              >
                <Video className="h-4 w-4" />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">
                  Video Consultation
                </p>

                <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                  If you are unable to visit a chamber, you can request a
                  scheduled video consultation with Dr. M Islam.
                </p>
              </div>
            </div>

            <div
              className="
                mt-5
                grid
                grid-cols-1
                gap-4
                border-t
                border-primary/10
                pt-4
                sm:grid-cols-2
              "
            >
              <div className="flex items-start gap-2.5">
                <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

                <div className="min-w-0">
                  <p className="text-xs font-medium text-muted-foreground">
                    Available
                  </p>

                  <p className="mt-0.5 text-sm font-medium text-foreground">
                    {videoConsultation.days.join(" · ")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

                <div className="min-w-0">
                  <p className="text-xs font-medium text-muted-foreground">
                    Consultation Hours
                  </p>

                  <p className="mt-0.5 text-sm font-semibold text-primary">
                    {videoConsultation.time}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}



        {/* ========================================
            SUBMIT BUTTON
        ========================================= */}

        <div className="mt-8">
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="
              group
              h-12
              w-full
              rounded-md
              px-7
              text-sm
              sm:w-auto
            "
          >
            {isSubmitting
              ? "Submitting..."
              : tab === "video"
                ? "Book Video Consultation"
                : "Book Appointment"}

            {!isSubmitting && (
              <ArrowRight
                className="
                  ml-2
                  h-4
                  w-4
                  transition-transform
                  duration-200
                  group-hover:translate-x-1
                "
              />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
