"use client";

import { useTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput } from "@/schemas/auth-schema";
import { loginAction } from "@/actions/auth-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { cn } from "cn";
import Image from "next/image";

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginInput) => {
    setServerError("");
    startTransition(async () => {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
      
      const result = await loginAction(formData);
      if (result?.error) {
        setServerError(result.error);
        toast.error(result.error);
      }
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a href="/" className="flex flex-col items-center gap-2 font-medium">
              <div className="flex aspect-square size-10 items-center justify-center rounded-full bg-primary/10 overflow-hidden shrink-0 border border-border/50">
                <Image src="/logo.webp" alt="Dr M Islam" width={40} height={40} className="object-cover" />
              </div>
              <span className="sr-only">Dr M Islam</span>
            </a>
            <h1 className="text-xl font-bold">Admin Login</h1>
            <div className="text-center text-sm text-muted-foreground">
              Sign in to access your administrative dashboard
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                {...register("email")}
                required
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password")}
                required
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>
            
            {serverError && (
              <div className="text-sm text-destructive font-medium p-3 bg-destructive/10 rounded-md border border-destructive/20 text-center shadow-sm">
                {serverError}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Signing in..." : "Login"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
