import { MapPin, Video, CalendarCheck, MessageCircle, LucideIcon } from "lucide-react";

export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  meta?: string[];
  ctaText: string;
  href: string;
  icon: LucideIcon;
}

export const services: Service[] = [
  {
    id: "in-person",
    number: "01",
    title: "In-Person Consultation",
    description: "Meet Dr. M Islam at his available chamber locations in Beldanga, Berhampur and Kolkata for a personalised homoeopathic consultation.",
    meta: ["Beldanga · Berhampur · Kolkata"],
    ctaText: "Book Appointment",
    href: "/contact",
    icon: MapPin,
  },
  {
    id: "video-consultation",
    number: "02",
    title: "Video Consultation",
    description: "If you are unable to visit a chamber, you can schedule a video consultation with Dr. M Islam from wherever you are.",
    meta: ["Friday · Saturday · Sunday", "9:00 PM – 10:00 PM"],
    ctaText: "Book Video Consultation",
    href: "/contact?type=video",
    icon: Video,
  },
  {
    id: "follow-up",
    number: "03",
    title: "Follow-up Consultation",
    description: "Continue your consultation through a follow-up discussion to review your concerns and discuss the next steps in your ongoing care.",
    ctaText: "Book Follow-up",
    href: "/contact",
    icon: CalendarCheck,
  },
  {
    id: "appointment-assistance",
    number: "04",
    title: "Appointment Assistance",
    description: "Need help choosing a chamber or consultation option? Get in touch for appointment assistance.",
    ctaText: "Contact Us",
    href: "/contact",
    icon: MessageCircle,
  },
];
