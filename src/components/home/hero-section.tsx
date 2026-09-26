import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, MapPin, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { doctor } from "@/data/doctor";
import { cn } from "cn";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background pt-16 md:pt-24 lg:pt-32 pb-16 md:pb-24">
      {/* Animated Background Gradient Blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[100px] animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute top-[20%] -right-[10%] w-[35%] h-[50%] rounded-full bg-primary/5 blur-[120px] animate-pulse" style={{ animationDuration: '7s' }} />
        <div className="absolute -bottom-[20%] left-[20%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] animate-pulse" style={{ animationDuration: '5s' }} />
      </div>

      <div className="container relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Side Content */}
          <div className="flex flex-col gap-6 md:gap-8 items-start">
            <div className="flex flex-col gap-4 items-start">
              
              {/* Badge UI */}
              <Badge variant="outline" className="text-xs sm:text-sm rounded-md px-3 py-2 font-medium bg-primary/5 text-primary border-primary/20 shadow-sm flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                {doctor.designation} · {doctor.speciality}
              </Badge>
              
              <div className="flex flex-col gap-2 relative">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground">
                  {doctor.name}
                </h1>
                <p className="text-xl md:text-2xl font-semibold text-foreground/80 max-w-xl">
                  {doctor.designation} in {doctor.speciality}
                </p>
              </div>
              
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-[600px]">
                Consult {doctor.name} at chamber locations in Beldanga, Berhampur and Kolkata, with video consultation available on selected days.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto relative">
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "rounded-md h-12 px-8 shadow-md group text-sm"
                )}
              >
                Book an Appointment
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/#chambers">
                <Button size="lg" variant="outline" className="rounded-md h-12 px-8 w-full sm:w-auto">
                  View Chambers
                </Button>
              </Link>
            </div>

            {/* Information Cards */}
            <div className="flex flex-wrap gap-3 mt-2 relative">
              <div className="flex items-center gap-2 bg-muted/50 border border-primary/10 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted/80 transition-colors">
                <MapPin className="h-4 w-4 text-primary" />
                {doctor.locations.length} Chamber Locations
              </div>
              <div className="flex items-center gap-2 bg-muted/50 border border-primary/10 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted/80 transition-colors">
                <MapPin className="h-4 w-4 text-primary" />
                Murshidabad & Kolkata
              </div>
              <div className="flex items-center gap-2 bg-muted/50 border border-primary/10 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted/80 transition-colors">
                <Calendar className="h-4 w-4 text-primary" />
                Video Consultation
              </div>
            </div>
          </div>

          {/* Right Side: Image and Floating Card */}
          <div className="relative mx-auto lg:mx-0 lg:ml-auto w-full max-w-md lg:max-w-none">
            {/* Main Portrait Container */}
            <div className="relative aspect-[3/4] md:aspect-[4/5] rounded-2xl overflow-hidden border border-primary/10 bg-muted/30 shadow-2xl">
              {/* Fallback pattern/gradient if image is missing, otherwise image will cover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-primary/5"></div>
              
              {/* Doctor Image - assuming there's an image. You can adjust the src later. */}
              <Image 
                src="/doctor.webp" 
                alt={`${doctor.name} Portrait`}
                fill
                className="object-cover object-top hover:scale-105 transition-transform duration-1000"
                priority
              />
            </div>

            {/* Floating Card */}
            <Card className="absolute -bottom-4 left-4 sm:-bottom-6 sm:-left-6 md:-left-10 bg-card/95 backdrop-blur-sm p-4 rounded-xl shadow-2xl border-primary/20 flex items-start gap-4 max-w-[220px] animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary animate-pulse">
                <Clock className="h-5 w-5" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-sm leading-none">Consultation</p>
                <div className="text-xs text-muted-foreground font-medium flex flex-col gap-0.5 mt-1">
                  <span>{doctor.locations.length} Locations</span>
                  <span>+ Video Call</span>
                </div>
              </div>
            </Card>
            
          </div>
        </div>
      </div>
    </section>
  );
}
