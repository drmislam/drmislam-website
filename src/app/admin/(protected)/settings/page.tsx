import { getDiagnoses, addDiagnosis, updateDiagnosis, deleteDiagnosis, getAdvises, addAdvice, updateAdvice, deleteAdvice, getAppSetting } from "./actions";
import { SettingsDialog } from "./settings-dialog";
import { TelegramSettingsCard } from "./telegram-settings-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope, ClipboardList, Bell } from "lucide-react";
import { Button } from"@/components/ui/button";

export const metadata = {
 title:"Settings | Dr M Islam",
};

export default async function SettingsPage() {
  const diagnoses = await getDiagnoses();
  const advises = await getAdvises();
  const telegramBotToken = await getAppSetting("telegramBotToken");
  const telegramChatId = await getAppSetting("telegramChatId");

 return (
 <div className="flex flex-col gap-6">
 <div>
 <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
 <p className="text-muted-foreground mt-2">
 Manage predefined lists used across the application.
 </p>
 </div>

 <div className="grid gap-6 md:grid-cols-2">
 {/* Diagnoses Card */}
 <Card className="flex flex-col">
 <CardHeader>
 <div className="flex items-center gap-2">
 <div className="p-2 bg-primary/10 rounded-md">
 <Stethoscope className="h-5 w-5 text-primary" />
 </div>
 <CardTitle>Diagnoses</CardTitle>
 </div>
 <CardDescription className="pt-2">
 Manage the predefined list of medical diagnoses (e.g., Urosepsis, CBC, MRI, CXR).
 </CardDescription>
 </CardHeader>
 <CardContent className="flex-1 flex flex-col justify-end">
 <div className="text-sm text-muted-foreground mb-4">
 {diagnoses.length} {diagnoses.length === 1 ? 'item' : 'items'} currently defined.
 </div>
 
 <SettingsDialog
 title="Manage Diagnoses"
 description="Add, edit, or remove predefined diagnoses."
 items={diagnoses}
 onAdd={addDiagnosis}
 onUpdate={updateDiagnosis}
 onDelete={deleteDiagnosis}
 triggerButton={
 <Button className="w-full sm:w-auto">
 Manage Diagnoses
 </Button>
 }
 />
 </CardContent>
 </Card>

 {/* Advises Card */}
 <Card className="flex flex-col">
 <CardHeader>
 <div className="flex items-center gap-2">
 <div className="p-2 bg-primary/10 rounded-md">
 <ClipboardList className="h-5 w-5 text-primary" />
 </div>
 <CardTitle>Advises</CardTitle>
 </div>
 <CardDescription className="pt-2">
 Manage the predefined list of medical advises (e.g., Stay Hydrated, Eat Fiber-Rich Foods).
 </CardDescription>
 </CardHeader>
 <CardContent className="flex-1 flex flex-col justify-end">
 <div className="text-sm text-muted-foreground mb-4">
 {advises.length} {advises.length === 1 ? 'item' : 'items'} currently defined.
 </div>
 
 <SettingsDialog
 title="Manage Advises"
 description="Add, edit, or remove predefined advises."
 items={advises}
 onAdd={addAdvice}
 onUpdate={updateAdvice}
 onDelete={deleteAdvice}
 triggerButton={
 <Button className="w-full sm:w-auto">
 Manage Advises
 </Button>
 }
 />
 </CardContent>
 </Card>
 </div>

 {/* Notification Settings */}
 <Card className="mt-6">
   <CardHeader>
     <div className="flex items-center gap-2">
       <div className="p-2 bg-primary/10 rounded-md">
         <Bell className="h-5 w-5 text-primary" />
       </div>
       <CardTitle>Notification Settings</CardTitle>
     </div>
     <CardDescription className="pt-2">
       Configure Telegram bot integration to receive instant notifications when a patient submits the appointment form on the website.
     </CardDescription>
   </CardHeader>
   <CardContent>
     <TelegramSettingsCard
       initialBotToken={telegramBotToken}
       initialChatId={telegramChatId}
     />
   </CardContent>
 </Card>
 </div>
 );
}
