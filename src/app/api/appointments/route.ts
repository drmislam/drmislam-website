import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    
    // Fetch Telegram Settings
    const botTokenSetting = await prisma.appSettings.findUnique({
      where: { key: "telegramBotToken" },
    });
    const chatIdSetting = await prisma.appSettings.findUnique({
      where: { key: "telegramChatId" },
    });

    const token = botTokenSetting?.value;
    const chatId = chatIdSetting?.value;

    if (!token || !chatId) {
      console.warn("Telegram bot token or chat ID is not configured.");
      return NextResponse.json({ success: true, message: "Appointment received, but telegram not configured." });
    }

    // Format message
    const consultationType = payload.consultationType === "video" ? "📹 Video Consultation" : "🏢 In-Person Consultation";
    const chamberLine = payload.chamberId ? `\n*Chamber ID:* ${payload.chamberId}` : "";
    const dateLine = payload.date ? `\n*Preferred Date:* ${payload.date}` : "";
    
    const message = `
🔔 *New Appointment Request* 🔔

*Type:* ${consultationType}
*Name:* ${payload.name}
*Age:* ${payload.age}
*Sex:* ${payload.sex}
*Phone:* ${payload.phone}
*Address:* ${payload.address}${chamberLine}${dateLine}
    `.trim();

    // Send to Telegram
    const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;
    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Failed to send telegram message:", errorData);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing appointment API:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
