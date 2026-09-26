import { Navbar } from "@/components/home/navbar";
import { HeroSection } from "@/components/home/hero-section";
import { SpecialitiesSection } from "@/components/home/specialities-section";
import { ServicesSection } from "@/components/home/services-section";
import { ChambersSection } from "@/components/home/chambers-section";
import { Footer } from "@/components/layout/footer";
import { FadeIn, SlideUp } from "@/components/animations/motion-wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dr. M Islam – Senior Consultant Physician in Homoeopathy",
  description: "Dr. M Islam is a Senior Consultant Physician in Homoeopathy offering consultations in Beldanga, Murshidabad, Berhampur and Kolkata, with scheduled video consultations.",
  keywords: [
    "Dr M Islam",
    "Dr. M Islam",
    "Dr M Islam Beldanga",
    "Dr M Islam Murshidabad",
    "homeopathy doctor in Beldanga",
    "homoeopathy doctor in Beldanga",
    "homeopathic doctor in Beldanga",
    "homoeopathic physician in Beldanga",
    "homeopathy doctor in Murshidabad",
    "homoeopathy doctor in Murshidabad",
    "homeopathic doctor in Murshidabad",
    "homeopathy consultation Beldanga",
    "homoeopathy consultation Beldanga",
    "homeopathy consultation Murshidabad",
    "homoeopathy consultation Berhampur",
    "homoeopathy consultation Kolkata",
    "Dr M Islam appointment",
    "Dr M Islam consultation",
    "Dr M Islam chamber",
    "Dr M Islam video consultation",
    "homeopathy video consultation",
    "homoeopathy video consultation",
    "online homoeopathy consultation",
    "video consultation with Dr M Islam",
    "homeopathy doctor Berhampur",
    "homoeopathy doctor Berhampur",
    "homeopathy doctor Kolkata",
    "homoeopathy doctor in Kolkata"
  ],
  openGraph: {
    title: "Dr. M Islam | Senior Consultant Physician in Homoeopathy",
    description: "Consult Dr. M Islam for homoeopathic consultation in Beldanga, Murshidabad, Berhampur and Kolkata, with scheduled video consultations available.",
    url: "https://drmislam.in/",
    siteName: "Dr. M Islam",
    images: [
      {
        url: "/og-image.jpeg",
        width: 1200,
        height: 630,
        alt: "Dr. M Islam",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://drmislam.in/",
  },
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "name": "Dr. M Islam",
    "jobTitle": "Senior Consultant Physician in Homoeopathy",
    "description": "Dr. M Islam is a Senior Consultant Physician in Homoeopathy offering consultations in Beldanga, Murshidabad, Berhampur and Kolkata, with scheduled video consultations.",
    "url": "https://drmislam.in",
    "image": "https://drmislam.in/og-image.jpeg",
    "address": [
      {
        "@type": "PostalAddress",
        "addressLocality": "Beldanga",
        "addressRegion": "West Bengal",
        "addressCountry": "IN"
      },
      {
        "@type": "PostalAddress",
        "addressLocality": "Berhampur",
        "addressRegion": "West Bengal",
        "addressCountry": "IN"
      },
      {
        "@type": "PostalAddress",
        "addressLocality": "Kolkata",
        "addressRegion": "West Bengal",
        "addressCountry": "IN"
      }
    ],
    "medicalSpecialty": "Homoeopathic",
    "availableService": {
      "@type": "MedicalTest",
      "name": "Homoeopathy Consultation"
    },
    "makesOffer": {
      "@type": "Offer",
      "name": "Video Consultation"
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <div className="overflow-hidden">
        <FadeIn delay={0.1}>
          <HeroSection />
        </FadeIn>
        <SlideUp delay={0.2} yOffset={50}>
          <SpecialitiesSection />
        </SlideUp>
        <SlideUp delay={0.2} yOffset={50}>
          <ServicesSection />
        </SlideUp>
        <SlideUp delay={0.2} yOffset={50}>
          <ChambersSection />
        </SlideUp>
        <FadeIn delay={0.3}>
          <Footer />
        </FadeIn>
      </div>
    </main>
  );
}
