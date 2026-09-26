import { Badge } from "@/components/ui/badge";
import { ArrowRight, Stethoscope } from "lucide-react";
import Link from "next/link";
import { services } from "@/data/services";

export function ServicesSection() {
  return (
    <section id="services" className="relative py-16 md:py-24 bg-background">
      <div className="container max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start gap-4 mb-12 md:mb-16">
          <Badge variant="outline" className="text-xs sm:text-sm rounded-md px-3 py-2 font-medium bg-primary/5 text-primary border-primary/20 shadow-sm flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            CONSULTATION SERVICES
          </Badge>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground max-w-2xl">
            How You Can Consult With Dr. M Islam
          </h2>
          
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-[600px]">
            Choose an in-person chamber visit or a scheduled video consultation based on your location and availability.
          </p>
        </div>

        {/* Editorial Two-Column Layout */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Visual / Supporting Content */}
          <div className="lg:col-span-4 relative flex flex-col h-full">
            <div className="sticky top-24 flex flex-col h-full min-h-[300px] lg:min-h-[600px] rounded-2xl bg-muted/20 border border-primary/10 overflow-hidden p-8 md:p-10 justify-end transition-colors hover:bg-muted/30">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50" />
              
              {/* Decorative Subtle Icon */}
              <div className="absolute -top-10 -right-10 opacity-[0.03] text-primary rotate-12">
                <Stethoscope className="w-80 h-80" />
              </div>

              <div className="relative z-10 mt-auto">
                <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 leading-tight">
                  Flexible Care for Your Lifestyle
                </h3>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                  As an experienced homoeopathic doctor in Beldanga, Dr. M Islam offers multiple ways to connect. Whether you seek an in-person homoeopathy consultation in Murshidabad or a convenient video consultation from home, expert care is highly accessible.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Service Rows */}
          <div className="lg:col-span-8 flex flex-col">
            <div className="border-b border-primary/10" /> {/* Top border for the first item */}
            
            {services.map((service) => (
              <Link 
                key={service.id} 
                href={service.href}
                className="group flex flex-col md:flex-row gap-4 md:gap-8 py-10 md:py-12 border-b border-primary/10 transition-colors hover:bg-primary/[0.02] px-4 -mx-4 rounded-xl md:rounded-none md:mx-0 md:px-4"
              >
                {/* Number */}
                <div className="text-2xl md:text-3xl font-light text-muted-foreground group-hover:text-primary transition-colors shrink-0 md:w-12">
                  {service.number}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow">
                  <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary/90 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mt-3 leading-relaxed max-w-2xl">
                    {service.description}
                  </p>

                  {/* Metadata */}
                  {service.meta && service.meta.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-5">
                      {service.meta.map((item, index) => (
                        <div 
                          key={index} 
                          className="text-xs font-semibold tracking-wide bg-primary/10 text-primary px-3 py-1.5 rounded-md"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* CTA / Arrow */}
                <div className="mt-4 md:mt-0 flex items-end md:items-center shrink-0">
                  <span className="flex items-center text-sm font-semibold text-primary opacity-90 group-hover:opacity-100 transition-opacity">
                    {service.ctaText}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
