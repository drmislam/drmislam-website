import { 
  Stethoscope, 
  UserRound, 
  Activity, 
  RefreshCcw, 
  ShieldCheck, 
  Video,
  LucideIcon
} from "lucide-react";

export interface Speciality {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  featured?: boolean;
}

export const specialities: Speciality[] = [
  {
    id: "personalised-consultation",
    title: "Personalised Homoeopathic Consultation",
    description: "Discuss your health concerns with Dr. M Islam through a detailed consultation designed around your individual history and needs.",
    icon: Stethoscope,
    featured: true,
  },
  {
    id: "individualised-consultation",
    title: "Individualised Consultation",
    description: "Each consultation begins with understanding the patient's symptoms, history and overall health concerns.",
    icon: UserRound,
  },
  {
    id: "chronic-health",
    title: "Chronic Health Concerns",
    description: "Long-term health concerns can be discussed through a detailed consultation and personalised follow-up.",
    icon: Activity,
  },
  {
    id: "preventive-wellness",
    title: "Preventive & Wellness Consultation",
    description: "Discuss general health, lifestyle and wellness concerns through a personalised consultation.",
    icon: ShieldCheck,
  },
  {
    id: "follow-up",
    title: "Follow-up Consultation",
    description: "Follow-up consultations help review the patient's progress and continue care based on the consultation plan.",
    icon: RefreshCcw,
  },
  {
    id: "video-consultation",
    title: "Video Consultation",
    description: "Patients who are unable to visit a chamber can book a video consultation during available consultation hours.",
    icon: Video,
  }
];
