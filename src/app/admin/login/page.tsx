import { LoginForm } from "@/components/auth/login-form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Admin Sign In | Dr M Islam",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10 relative">
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-20">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground font-medium px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl transition-all text-sm sm:text-base">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>

      <div className="w-full max-w-sm z-10">
        <LoginForm />
      </div>
    </div>
  );
}
