"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, Menu } from "lucide-react";
import { cn } from "cn";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const navLinks = [
  { name: "Services", href: "/#services" },
  { name: "Specialities", href: "/#specialities" },
  { name: "Chambers", href: "/#chambers" },
  { name: "Contact us", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-7xl mx-auto px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Logo and Name */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex aspect-square size-10 items-center justify-center rounded-full bg-primary/10 overflow-hidden shrink-0 border border-border/50 group-hover:border-primary/30 transition-colors">
              <Image src="/logo.webp" alt="Dr M Islam" width={40} height={40} className="object-cover" />
            </div>
            <span className="font-bold text-lg text-primary tracking-tight">
              Dr M Islam
            </span>
          </Link>
        </div>

        {/* Center: Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right: Actions (Desktop Button + Mobile Hamburger) */}
        <div className="flex items-center gap-3">
          
          {/* Desktop Button */}
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ variant: "default", size: "sm" }),
              "hidden md:inline-flex h-9 px-4 shadow-sm rounded-md group text-sm"
            )}
          >
            Book Appointment
            <ArrowRight className="h-4 w-4 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          {/* Mobile Hamburger Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger 
              className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "md:hidden")}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] sm:w-[350px] p-6 flex flex-col gap-6">
              <SheetHeader className="text-left">
                <SheetTitle>
                  <div className="flex items-center gap-2">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-full bg-primary/10 overflow-hidden shrink-0 border border-border/50">
                      <Image src="/logo.webp" alt="Dr M Islam" width={32} height={32} className="object-cover" />
                    </div>
                    <span className="font-bold text-base text-primary tracking-tight">
                      Dr M Islam
                    </span>
                  </div>
                </SheetTitle>
              </SheetHeader>
              
              <div className="flex flex-col gap-5 mt-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-base font-medium text-foreground hover:text-primary transition-colors border-b border-border/50 pb-3"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="mt-auto pb-4">
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    buttonVariants({ variant: "default", size: "default" }),
                    "w-full rounded-md group"
                  )}
                >
                  Book Appointment
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
      </div>
    </header>
  );
}
