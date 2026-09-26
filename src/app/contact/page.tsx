import { ContactPage } from "@/components/contact/contact-page";
import { Navbar } from "@/components/home/navbar";
import { Footer } from "@/components/layout/footer";
import { FadeIn } from "@/components/animations/motion-wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book an Appointment with Dr. M Islam | Homoeopathy Consultation",
  description: "Book an in-person or video consultation with Dr. M Islam. Choose a chamber in Beldanga, Berhampur or Kolkata and request an appointment online.",
  keywords: [
    "Dr M Islam appointment",
    "Dr M Islam consultation",
    "Dr M Islam contact",
    "Dr M Islam booking",
    "Dr M Islam Beldanga appointment",
    "homeopathy appointment Beldanga",
    "homoeopathy consultation Beldanga",
    "homeopathy consultation Murshidabad",
    "homeopathy doctor appointment Murshidabad",
    "homeopathy consultation Berhampur",
    "homoeopathy consultation Berhampur",
    "homeopathy consultation Kolkata",
    "homoeopathy doctor Kolkata",
    "Dr M Islam video consultation",
    "Dr M Islam online consultation",
    "homeopathy video consultation",
    "homoeopathy video consultation",
    "online homeopathy consultation",
    "Dr M Islam chamber",
    "Dr M Islam Beldanga chamber",
    "homeopathy chamber Beldanga",
    "homeopathy chamber Berhampur",
    "homeopathy chamber Kolkata"
  ]
};

export default function ContactRoute() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <FadeIn delay={0.1}>
          <ContactPage />
        </FadeIn>
      </main>
      <Footer />
    </div>
  );
}
