"use client";

import {
 LineChart,
 Line,
 XAxis,
 YAxis,
 CartesianGrid,
 Tooltip,
 ResponsiveContainer,
 BarChart,
 Bar,
} from"recharts";
import { Activity, UserPlus } from"lucide-react";

interface ChartData {
 date: string;
 visits: number;
 registrations: number;
}

interface DashboardChartsProps {
 data: ChartData[];
}

export function DashboardCharts({ data }: DashboardChartsProps) {
 return (
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
 
 {/* Visits Chart */}
 <div className="rounded-md border bg-card overflow-hidden">
 <div className="flex items-center justify-between gap-4 bg-muted/30 px-4 py-3 border-b">
 <div>
 <h2 className="text-sm font-medium text-primary">Patient Visits</h2>
 <p className="text-xs text-muted-foreground mt-0.5">Visits over the last 7 days</p>
 </div>
 <Activity className="h-4 w-4 text-muted-foreground hidden sm:block" />
 </div>
 
 <div className="p-4 h-[300px] w-full">
 <ResponsiveContainer width="100%" height="100%">
 <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="color-mix(in oklab, var(--muted-foreground) 20%, transparent)" />
 <XAxis 
 dataKey="date" 
 axisLine={false} 
 tickLine={false} 
 tick={{ fontSize: 12, fill:"var(--muted-foreground)" }} 
 dy={10}
 />
 <YAxis 
 axisLine={false} 
 tickLine={false} 
 tick={{ fontSize: 12, fill:"var(--muted-foreground)" }} 
 />
 <Tooltip 
 contentStyle={{ borderRadius: '6px', border: '1px solid var(--border)', backgroundColor: 'var(--card)' }}
 itemStyle={{ color: 'var(--foreground)', fontSize: '12px' }}
 labelStyle={{ color: 'var(--muted-foreground)', fontSize: '12px', marginBottom: '4px' }}
 />
 <Line 
 type="monotone" 
 dataKey="visits" 
 stroke="var(--primary)" 
 strokeWidth={2} 
 dot={{ r: 3, strokeWidth: 2, fill:"var(--card)" }} 
 activeDot={{ r: 5, strokeWidth: 0, fill:"var(--primary)" }}
 name="Visits"
 />
 </LineChart>
 </ResponsiveContainer>
 </div>
 </div>

 {/* Registrations Chart */}
 <div className="rounded-md border bg-card overflow-hidden">
 <div className="flex items-center justify-between gap-4 bg-muted/30 px-4 py-3 border-b">
 <div>
 <h2 className="text-sm font-medium text-primary">New Registrations</h2>
 <p className="text-xs text-muted-foreground mt-0.5">Patients registered in the last 7 days</p>
 </div>
 <UserPlus className="h-4 w-4 text-muted-foreground hidden sm:block" />
 </div>
 
 <div className="p-4 h-[300px] w-full">
 <ResponsiveContainer width="100%" height="100%">
 <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="color-mix(in oklab, var(--muted-foreground) 20%, transparent)" />
 <XAxis 
 dataKey="date" 
 axisLine={false} 
 tickLine={false} 
 tick={{ fontSize: 12, fill:"var(--muted-foreground)" }} 
 dy={10}
 />
 <YAxis 
 axisLine={false} 
 tickLine={false} 
 tick={{ fontSize: 12, fill:"var(--muted-foreground)" }} 
 />
 <Tooltip 
 cursor={{ fill: 'color-mix(in oklab, var(--muted) 50%, transparent)' }}
 contentStyle={{ borderRadius: '6px', border: '1px solid var(--border)', backgroundColor: 'var(--card)' }}
 itemStyle={{ color: 'var(--foreground)', fontSize: '12px' }}
 labelStyle={{ color: 'var(--muted-foreground)', fontSize: '12px', marginBottom: '4px' }}
 />
 <Bar 
 dataKey="registrations" 
 fill="var(--primary)" 
 radius={[4, 4, 0, 0]} 
 maxBarSize={30}
 name="New Patients"
 />
 </BarChart>
 </ResponsiveContainer>
 </div>
 </div>

 </div>
 );
}
