import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, MapPinned, Clock, CalendarDays, Video, MapPin } from "lucide-react";
import Link from "next/link";
import { chambers, videoConsultation } from "@/data/chambers";
import { cn } from "cn";

export function ChambersSection() {
  return (
    <section id="chambers" className="relative py-16 md:py-24 bg-background">
      <div className="container max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-12 md:mb-16">
          <Badge variant="outline" className="text-xs sm:text-sm rounded-md px-3 py-2 font-medium bg-primary/5 text-primary border-primary/20 shadow-sm flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            CHAMBERS & CONSULTATION LOCATIONS
          </Badge>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground max-w-2xl">
            Consult Dr. M Islam at a Location Near You
          </h2>
          
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-[700px]">
            Dr. M Islam is available for homoeopathic consultation at selected chambers in Beldanga, Berhampur and Kolkata. Check the chamber location and consultation hours before planning your visit.
          </p>
        </div>

        {/* 3-Location Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {chambers.map((chamber) => (
            <Card 
              key={chamber.id}
              className="flex flex-col h-full bg-card rounded-xl border-primary/10 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Card Header */}
              <div className="p-6 md:p-8 flex-grow flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-light text-muted-foreground">{chamber.number}</span>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <MapPinned className="h-5 w-5" />
                  </div>
                </div>

                <div className="flex flex-col gap-1 mb-6">
                  <h3 className="text-2xl font-bold text-foreground leading-tight">
                    {chamber.name}
                  </h3>
                  {chamber.alsoKnownAs && (
                    <span className="text-sm italic text-muted-foreground">
                      {chamber.alsoKnownAs}
                    </span>
                  )}
                  <span className="inline-block mt-1 text-sm font-semibold tracking-wide text-primary">
                    {chamber.area.toUpperCase()}
                  </span>
                  <p className="text-sm text-muted-foreground mt-2 flex items-start gap-2">
                    <MapPin className="h-4 w-4 shrink-0 mt-0.5 opacity-70" />
                    {chamber.address}
                  </p>
                </div>

                <div className="mt-auto border-t border-primary/10 pt-6">
                  <h4 className="text-xs font-bold text-muted-foreground tracking-wider uppercase mb-4 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Consultation Hours
                  </h4>
                  <div className="flex flex-col gap-4">
                    {chamber.timings.map((timing, idx) => (
                      <div key={idx} className="flex flex-col">
                        <span className="text-sm font-semibold text-foreground">{timing.day}</span>
                        <span className="text-sm text-muted-foreground">{timing.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Actions */}
              <div className="p-6 md:p-8 pt-0 mt-auto flex flex-col gap-3">
                <Link
                  href={`/contact?type=in-person&chamber=${chamber.id}`}
                  className={cn(buttonVariants({ variant: "default" }), "w-full group shadow-sm justify-center")}
                >
                  Book Appointment
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href={chamber.mapUrl || "#"} className="w-full block">
                  <Button variant="outline" className="w-full">
                    View Location
                    <MapPin className="h-4 w-4 ml-2 opacity-70" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* Video Consultation Horizontal Block */}
        <div className="mt-12 md:mt-16 relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 via-primary/5 to-transparent border border-primary/20 shadow-sm transition-all hover:shadow-md">
          <div className="absolute top-0 right-0 p-8 md:p-12 opacity-5 pointer-events-none">
            <Video className="w-48 h-48 md:w-64 md:h-64 rotate-12 text-primary" />
          </div>
          
          <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
            <div className="flex flex-col gap-3 max-w-xl">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-xs font-bold tracking-wider bg-background border-primary/20 text-primary">
                  VIDEO CONSULTATION
                </Badge>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                Unable to Visit a Chamber?
              </h3>
              <p className="text-muted-foreground text-base md:text-lg">
                Schedule a video consultation with Dr. M Islam if visiting a chamber is not convenient for you.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-4">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  {videoConsultation.days.join(" · ")}
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Clock className="h-4 w-4 text-primary" />
                  {videoConsultation.time}
                </div>
              </div>
            </div>
            
            <div className="shrink-0 w-full md:w-auto mt-4 md:mt-0">
              <Link
                href="/contact?type=video"
                className={cn(buttonVariants({ variant: "default", size: "lg" }), "w-full md:w-auto h-12 px-8 shadow-md group justify-center")}
              >
                Book Video Consultation
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
