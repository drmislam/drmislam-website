"use client";

import * as React from "react";
import Image from "next/image";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  GalleryVerticalEndIcon,
  AudioLinesIcon,
  TerminalIcon,
  TerminalSquareIcon,
  BotIcon,
  BookOpenIcon,
  Settings2Icon,
  FrameIcon,
  PieChartIcon,
  MapIcon,
} from "lucide-react";

import { LayoutDashboard, Users, Settings, Book } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Define the clinic routes
const navItems = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Patients",
    url: "/admin/patients",
    icon: Users,
  },
  {
    title: "Books",
    url: "/admin/books",
    icon: Book,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
];

export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  user: { name: string; email: string; avatar: string };
}) {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props} className="print:hidden">
      <SidebarHeader className="py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="pointer-events-none hover:bg-transparent data-[state=open]:bg-transparent">
              <div className="flex aspect-square size-10 items-center justify-center rounded-full bg-primary/10 overflow-hidden shrink-0 border border-border/50">
                <Image src="/logo.webp" alt="Dr M Islam" width={40} height={40} className="object-cover" />
              </div>
              <div className="grid flex-1 text-left leading-tight ml-1">
                <span className="truncate font-bold text-lg text-primary tracking-tight">Dr M Islam</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* Simplified Nav menu for flat routes */}
        <SidebarMenu className="px-2 mt-4 gap-2">
          {navItems.map((item) => {
            const isActive =
              item.url === "/admin/patients"
                ? pathname === "/admin/patients" || pathname.startsWith("/admin/patients/")
                : pathname === item.url || pathname.startsWith(`${item.url}/`);
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  render={
                    <Link
                      href={item.url}
                      onClick={() => setOpenMobile(false)}
                    />
                  }
                  tooltip={item.title}
                  isActive={isActive}
                  className="[&>svg]:size-5"
                >
                  <item.icon className="shrink-0" />
                  <span className="text-base">{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="mb-3">
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
