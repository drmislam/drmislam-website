import { MapPin, Video } from "lucide-react";
import { videoConsultation } from "@/data/chambers";

export function AppointmentInfo() {
  return (
    <div className="flex flex-col h-full bg-muted/20 border border-primary/10 rounded-2xl p-8 lg:p-10 relative overflow-hidden shadow-sm">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50" />
      
      <div className="relative z-10 flex flex-col gap-8">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-foreground">Dr. M Islam</h2>
          <p className="text-sm font-semibold text-primary mt-1">Senior Consultant Physician in Homoeopathy</p>
          <p className="text-xs text-muted-foreground mt-3 font-medium opacity-80">Reg. No. 33027 (WBHMC)</p>
        </div>

        <div className="h-px w-full bg-primary/10" />

        <div className="flex flex-col gap-6">
          <div className="flex gap-4 items-start">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <MapPin className="h-5 w-5" />
            </div>
            <div className="flex flex-col gap-1 pt-1.5">
              <h3 className="text-sm font-bold text-foreground">Available Locations</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Available at selected chambers in Beldanga, Berhampur and Kolkata.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start mt-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Video className="h-5 w-5" />
            </div>
            <div className="flex flex-col gap-1 pt-1.5">
              <h3 className="text-sm font-bold text-foreground">Video Consultation</h3>
              <p className="text-sm text-muted-foreground">{videoConsultation.days.join(" · ")}</p>
              <p className="text-sm font-medium text-primary mt-1">{videoConsultation.time}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
