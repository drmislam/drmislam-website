import { getPatients } from "@/lib/patients/patient-service";
import { getTodayQueue } from "@/lib/patients/queue-service";
import { getDashboardChartData, getDashboardMetrics } from "@/lib/dashboard/dashboard-service";
import { DashboardCharts } from "@/components/dashboard/dashboard-charts";
import { DashboardTables } from "@/components/dashboard/dashboard-tables";
import { Users, UserPlus, CalendarCheck, RotateCw } from "lucide-react";

export const metadata = {
  title: "Dashboard | Dr M Islam",
};

export default async function DashboardPage() {
  // Fetch data
  const [{ patients }, todayQueue, chartData, metrics] = await Promise.all([
    getPatients("", 0, 10), // Get latest 10 patients
    getTodayQueue(),
    getDashboardChartData(),
    getDashboardMetrics(),
  ]);

  return (
    <main className="container max-w-7xl mx-auto space-y-6">

      {/* Top 4 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Total Patients */}
        <div className="rounded-md border bg-card p-4 sm:p-6 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">Total Patients</h3>
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{metrics.totalPatients}</p>
            <p className="text-xs text-muted-foreground mt-1">All registered records</p>
          </div>
        </div>

        {/* New This Month */}
        <div className="rounded-md border bg-card p-4 sm:p-6 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">New This Month</h3>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{metrics.newThisMonth}</p>
            <p className="text-xs text-muted-foreground mt-1">Joined this month</p>
          </div>
        </div>

        {/* Today's Patients */}
        <div className="rounded-md border bg-card p-4 sm:p-6 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">Today's Patients</h3>
            <CalendarCheck className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{metrics.todayPatients}</p>
            <p className="text-xs text-muted-foreground mt-1">Appointments for today</p>
          </div>
        </div>

        {/* Frequently Visit Patients */}
        <div className="rounded-md border bg-card p-4 sm:p-6 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">Frequent Patients</h3>
            <RotateCw className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{metrics.frequentPatients}</p>
            <p className="text-xs text-muted-foreground mt-1">Visited more than once</p>
          </div>
        </div>
      </div>

      {/* Side-by-Side Charts Container */}
      <DashboardCharts data={chartData} />

      {/* Side-by-Side Tables Container */}
      <DashboardTables recentPatients={patients} todayQueue={todayQueue} />

    </main>
  );
}
