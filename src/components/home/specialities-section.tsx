import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { specialities } from "@/data/specialities";
import { cn } from "cn";

export function SpecialitiesSection() {
  return (
    <section id="specialities" className="relative py-16 md:py-24 bg-background">
      <div className="container max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start gap-4 mb-12 md:mb-16">
          <Badge variant="outline" className="text-xs sm:text-sm rounded-md px-3 py-2 font-medium bg-primary/5 text-primary border-primary/20 shadow-sm flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            SPECIALITIES & CONSULTATION
          </Badge>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground max-w-2xl">
            Personalised Care for Your Health Concerns
          </h2>
          
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-[600px]">
            Dr. M Islam provides individualised homoeopathic consultations based on each patient's health history, concerns and consultation needs.
          </p>
        </div>

        {/* Cards Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specialities.map((item) => {
            const isFeatured = item.featured;
            const isVideo = item.id === "video-consultation";

            // Determine column span for bento grid
            let colSpanClass = "col-span-1";
            if (isFeatured) {
              colSpanClass = "md:col-span-2 lg:col-span-2 md:row-span-2 lg:row-span-2";
            } else if (isVideo) {
              // Video consultation at the bottom
              colSpanClass = "col-span-1 md:col-span-2 lg:col-span-1";
            }

            return (
              <Card 
                key={item.id}
                className={`group relative overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-md border-primary/10 ${colSpanClass} ${
                  isFeatured 
                    ? "bg-gradient-to-br from-primary/5 via-background to-background p-8 shadow-sm" 
                    : "bg-muted/30 p-6 shadow-sm hover:bg-muted/50"
                }`}
              >
                <div className="flex flex-col gap-4 items-start">
                  <div className={`flex shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary ${isFeatured ? 'h-14 w-14' : 'h-10 w-10'}`}>
                    <item.icon className={isFeatured ? "h-7 w-7" : "h-5 w-5"} />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <h3 className={`font-bold text-foreground ${isFeatured ? 'text-2xl md:text-3xl mt-2' : 'text-lg'}`}>
                      {item.title}
                    </h3>
                    <p className={`text-muted-foreground ${isFeatured ? 'text-base md:text-lg max-w-md mt-2' : 'text-sm'}`}>
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* CTA only for featured and video consultation */}
                {(isFeatured || isVideo) && (
                  <div className="mt-8 pt-4 border-t border-primary/5 flex items-center">
                    <Link
                      href={isVideo ? "/contact?type=video" : "/contact"}
                      className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "p-0 h-auto hover:bg-transparent font-semibold text-primary group-hover:text-primary/80"
                      )}
                    >
                      {isFeatured ? "Book a Consultation" : "Book Video Consultation"}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
}
