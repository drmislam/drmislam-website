import { prisma } from"@/lib/db/prisma";
import { format, subDays, startOfDay, endOfDay } from"date-fns";

export async function getDashboardChartData() {
 const endDate = new Date();
 const startDate = subDays(endDate, 6); // Last 7 days including today

 // Fetch all visits in the last 7 days
 const visits = await prisma.visit.findMany({
 where: {
 visitDate: {
 gte: startOfDay(startDate),
 lte: endOfDay(endDate),
 },
 },
 select: {
 visitDate: true,
 },
 });

 // Fetch all registrations in the last 7 days
 const registrations = await prisma.patient.findMany({
 where: {
 registrationDate: {
 gte: startOfDay(startDate),
 lte: endOfDay(endDate),
 },
 },
 select: {
 registrationDate: true,
 },
 });

 // Aggregate by day
 const data = [];
 for (let i = 6; i >= 0; i--) {
 const targetDate = subDays(new Date(), i);
 const dayLabel = format(targetDate,"MMM dd");
 
 // Count visits for this day
 const dayVisits = visits.filter(
 (v) => format(v.visitDate,"MMM dd") === dayLabel
 ).length;
 
 // Count registrations for this day
 const dayRegistrations = registrations.filter(
 (p) => format(p.registrationDate,"MMM dd") === dayLabel
 ).length;

 data.push({
 date: dayLabel,
 visits: dayVisits,
 registrations: dayRegistrations,
 });
 }

 return data;
}
 
 export async function getDashboardMetrics() {
 const now = new Date();
 const { startOfMonth, startOfDay, endOfDay } = require('date-fns');
 
 const [totalPatients, newThisMonth, todayPatients, groupedVisits] = await Promise.all([
 prisma.patient.count(),
 prisma.patient.count({
 where: { registrationDate: { gte: startOfMonth(now) } },
 }),
 prisma.visit.count({
 where: { visitDate: { gte: startOfDay(now), lte: endOfDay(now) } },
 }),
 prisma.visit.groupBy({
 by: ['patientId'],
 having: {
 patientId: {
 _count: { gt: 1 }
 }
 }
 })
 ]);

 return {
 totalPatients,
 newThisMonth,
 todayPatients,
 frequentPatients: groupedVisits.length,
 };
 }
