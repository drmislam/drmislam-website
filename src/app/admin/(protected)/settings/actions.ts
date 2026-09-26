"use server";

import { prisma } from"@/lib/db/prisma";
import { revalidatePath } from"next/cache";

// --- DIAGNOSES ---

export async function getDiagnoses() {
 return await prisma.diagnosis.findMany({
 orderBy: { createdAt:"asc" },
 });
}

export async function addDiagnosis(value: string) {
 if (!value || value.trim() ==="") return;
 try {
 await prisma.diagnosis.create({
 data: { value: value.trim() },
 });
 revalidatePath("/admin/patients/settings");
 } catch (error) {
 console.error("Failed to add diagnosis", error);
 }
}

export async function updateDiagnosis(id: string, value: string) {
 if (!value || value.trim() ==="") return;
 try {
 await prisma.diagnosis.update({
 where: { id },
 data: { value: value.trim() },
 });
 revalidatePath("/admin/patients/settings");
 } catch (error) {
 console.error("Failed to update diagnosis", error);
 }
}

export async function deleteDiagnosis(id: string) {
 try {
 await prisma.diagnosis.delete({
 where: { id },
 });
 revalidatePath("/admin/patients/settings");
 } catch (error) {
 console.error("Failed to delete diagnosis", error);
 }
}

// --- ADVISES ---

export async function getAdvises() {
 return await prisma.advice.findMany({
 orderBy: { createdAt:"asc" },
 });
}

export async function addAdvice(value: string) {
 if (!value || value.trim() ==="") return;
 try {
 await prisma.advice.create({
 data: { value: value.trim() },
 });
 revalidatePath("/admin/patients/settings");
 } catch (error) {
 console.error("Failed to add advice", error);
 }
}

export async function updateAdvice(id: string, value: string) {
 if (!value || value.trim() ==="") return;
 try {
 await prisma.advice.update({
 where: { id },
 data: { value: value.trim() },
 });
 revalidatePath("/admin/patients/settings");
 } catch (error) {
 console.error("Failed to update advice", error);
 }
}

export async function deleteAdvice(id: string) {
 try {
 await prisma.advice.delete({
 where: { id },
 });
 revalidatePath("/admin/settings");
 } catch (error) {
 console.error("Failed to delete advice", error);
 }
}

export async function getAppSetting(key: string) {
 const setting = await prisma.appSettings.findUnique({
 where: { key },
 });
 return setting?.value || "";
}

export async function setAppSetting(key: string, value: string) {
 try {
 await prisma.appSettings.upsert({
 where: { key },
 update: { value },
 create: { key, value },
 });
 revalidatePath("/admin/settings");
 } catch (error) {
 console.error(`Failed to set app setting ${key}`, error);
 }
}
