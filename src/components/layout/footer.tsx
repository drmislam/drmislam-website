import Link from "next/link";
import { Heart, ArrowUpRight, Lock } from "lucide-react";
import { chambers } from "@/data/chambers";

export function Footer() {
  return (
    <footer className="bg-background pt-16 pb-8 border-t border-primary/10">
      <div className="container max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Column 1: Doctor Brand */}
          <div className="flex flex-col">
            <h2 className="text-xl font-extrabold text-foreground tracking-tight">
              Dr. M Islam
            </h2>
            <p className="text-sm font-semibold text-primary mt-1">
              Senior Consultant Physician in Homoeopathy
            </p>
            <p className="text-sm text-muted-foreground mt-4 leading-relaxed max-w-xs">
              Dr. M Islam provides personalised homoeopathic consultation through selected chambers in Murshidabad and Kolkata, with scheduled video consultations available for patients who are unable to visit a chamber.
            </p>
            <p className="text-xs text-muted-foreground mt-6 opacity-70 font-medium">
              Reg. No. 33027 (WBHMC)
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-6">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-3">
              <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit">
                Home
              </Link>
              <Link href="/#specialities" className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit">
                Specialities
              </Link>
              <Link href="/#services" className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit">
                Services
              </Link>
              <Link href="/#chambers" className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit">
                Chambers
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit">
                Contact Us
              </Link>
            </nav>
          </div>

          {/* Column 3: Consultation */}
          <div className="flex flex-col">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-6">
              Consultation
            </h3>
            <nav className="flex flex-col gap-3">
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit">
                In-Person Consultation
              </Link>
              <Link href="/contact?type=video" className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit">
                Video Consultation
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit">
                Follow-up Consultation
              </Link>
              <Link href="/contact" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors w-fit mt-2">
                Book an Appointment →
              </Link>
            </nav>
          </div>

          {/* Column 4: Chambers */}
          <div className="flex flex-col">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-6">
              Chambers
            </h3>
            <div className="flex flex-col gap-5">
              {chambers.map((chamber) => (
                <div key={chamber.id} className="flex flex-col">
                  <span className="text-sm font-semibold text-foreground">
                    {chamber.name}
                  </span>
                  {chamber.alsoKnownAs && (
                    <span className="text-xs text-muted-foreground italic mt-0.5">
                      {chamber.alsoKnownAs}
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {chamber.address}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
        </div>

        {/* Admin Login Section */}
        <div className="mt-12 mb-6 flex justify-center md:justify-end">
          <Link href="/admin/login" className="group flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-primary transition-colors bg-muted/40 hover:bg-primary/5 px-4 py-2 rounded-full border border-border/50 hover:border-primary/20">
            <Lock className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
            Admin Login
          </Link>
        </div>

        {/* Bottom Copyright Section */}
        <div className="border-t border-border/60 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-medium text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} Dr. M Islam. All rights reserved.
          </p>

          <div className="flex items-center">
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center cursor-pointer"
              href="https://dgisight.oxzeen.com"
              aria-label="Build with dgisight"
            >
              <div className="flex items-center h-8 px-4 rounded-full bg-primary/10 group-hover:bg-primary/15 border border-primary/20 text-xs font-medium text-foreground transition-colors z-10 relative">
                Build with
                <Heart
                  className="w-3.5 h-3.5 mx-1.5 text-primary fill-primary motion-safe:animate-pulse"
                  aria-hidden="true"
                />
                dgisight
              </div>

              <div className="flex items-center justify-center h-8 bg-primary text-primary-foreground rounded-full transition-all duration-300 w-0 opacity-0 overflow-hidden group-hover:w-8 group-hover:opacity-100 group-hover:ml-1 shrink-0">
                <ArrowUpRight
                  className="w-4 h-4"
                  aria-hidden="true"
                />
              </div>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
