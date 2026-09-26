"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setAppSetting } from "./actions";
import { toast } from "sonner";
import { Bell } from "lucide-react";

interface TelegramSettingsCardProps {
  initialBotToken: string;
  initialChatId: string;
}

export function TelegramSettingsCard({
  initialBotToken,
  initialChatId,
}: TelegramSettingsCardProps) {
  const [botToken, setBotToken] = useState(initialBotToken);
  const [chatId, setChatId] = useState(initialChatId);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await setAppSetting("telegramBotToken", botToken);
      await setAppSetting("telegramChatId", chatId);
      toast.success("Telegram settings saved successfully.");
    } catch (error) {
      toast.error("Failed to save Telegram settings.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-2">
      <div className="grid gap-2">
        <Label htmlFor="botToken">Telegram Bot Token</Label>
        <Input
          id="botToken"
          type="password"
          placeholder="Enter Bot Token (e.g., 123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11)"
          value={botToken}
          onChange={(e) => setBotToken(e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="chatId">Telegram Chat ID</Label>
        <Input
          id="chatId"
          placeholder="Enter Chat ID (e.g., -1001234567890 or 123456789)"
          value={chatId}
          onChange={(e) => setChatId(e.target.value)}
        />
        <p className="text-xs text-muted-foreground">
          The chat ID where new appointment notifications will be sent.
        </p>
      </div>
      <Button onClick={handleSave} disabled={isSaving} className="mt-2 w-full sm:w-auto self-start">
        {isSaving ? "Saving..." : "Save Settings"}
      </Button>
    </div>
  );
}
