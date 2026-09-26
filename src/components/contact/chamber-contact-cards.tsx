"use client";

import { chambers } from "@/data/chambers";
import { Card } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight, MapPin, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "cn";

export function ChamberContactCards() {
  const router = useRouter();

  const handleBookClick = (chamberId: string) => {
    router.push(`/contact?type=in-person&chamber=${chamberId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {chambers.map((chamber) => (
        <Card key={chamber.id} className="flex flex-col h-full bg-card rounded-xl border-primary/10 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="p-6 md:p-8 flex-grow flex flex-col">
            <div className="flex flex-col gap-1 mb-6">
              <span className="text-sm font-bold text-muted-foreground mb-2">{chamber.number}</span>
              <h3 className="text-xl font-bold text-foreground leading-tight">{chamber.name}</h3>
              {chamber.alsoKnownAs && (
                <span className="text-sm italic text-muted-foreground">{chamber.alsoKnownAs}</span>
              )}
              <p className="text-sm text-muted-foreground mt-3 flex items-start gap-2">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-primary opacity-70" />
                {chamber.address}
              </p>
            </div>

            <div className="mt-auto border-t border-primary/10 pt-6">
              <div className="flex flex-col gap-3">
                {chamber.timings.map((timing, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-sm font-semibold text-foreground">{timing.day}</span>
                    <span className="text-sm text-muted-foreground">{timing.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 pt-0 mt-auto flex flex-col gap-3">
            <Button 
              className="w-full group shadow-sm" 
              onClick={() => handleBookClick(chamber.id)}
            >
              Book Appointment
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <div className="flex gap-3 w-full">
              {chamber.mapUrl && (
                <Link
                  href={chamber.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ variant: "outline" }), "flex-1 justify-center")}
                >
                  <MapPin className="h-4 w-4 mr-2" /> Map
                </Link>
              )}
              {chamber.whatsappNumber && (
                <Link
                  href={`https://wa.me/${chamber.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ variant: "outline" }), "flex-1 justify-center")}
                >
                  <MessageCircle className="h-4 w-4 mr-2" /> WhatsApp
                </Link>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
