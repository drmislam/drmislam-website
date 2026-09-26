import { Badge } from "@/components/ui/badge";
import { AppointmentForm } from "./appointment-form";
import { AppointmentInfo } from "./appointment-info";
import { ChamberContactCards } from "./chamber-contact-cards";
import { Suspense } from "react";

export function ContactPage() {
  return (
    <div className="flex flex-col">
      {/* Hero / Intro */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-background">
        <div className="container max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex flex-col items-start gap-4">
          <Badge variant="outline" className="text-xs sm:text-sm rounded-md px-3 py-2 font-medium bg-primary/5 text-primary border-primary/20 shadow-sm flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            CONTACT & APPOINTMENT
          </Badge>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground max-w-2xl">
            Book a Consultation with Dr. M Islam
          </h1>
          
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-[700px]">
            Choose an in-person chamber appointment or a scheduled video consultation based on what works best for you.
          </p>
        </div>
      </section>

      {/* Main Appointment Area */}
      <section className="py-8 md:py-12 bg-background">
        <div className="container max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-8 w-full">
              <Suspense fallback={<div className="h-[600px] w-full bg-muted/20 animate-pulse rounded-2xl" />}>
                <AppointmentForm />
              </Suspense>
            </div>
            <div className="lg:col-span-4 w-full lg:sticky lg:top-24">
              <AppointmentInfo />
            </div>
          </div>
        </div>
      </section>

      {/* Chambers Section */}
      <section className="py-16 md:py-24 bg-background border-t border-border/40">
        <div className="container max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <Badge variant="outline" className="w-fit text-xs font-bold tracking-wider bg-background border-primary/20 text-primary">
              CONSULTATION LOCATIONS
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Choose a Chamber Near You
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              View chamber locations, consultation hours and available contact options before booking your appointment.
            </p>
          </div>
          
          <ChamberContactCards />
        </div>
      </section>
    </div>
  );
}
