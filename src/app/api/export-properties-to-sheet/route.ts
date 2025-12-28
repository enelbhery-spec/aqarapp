import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { google } from "googleapis";

export async function POST() {
  const supabase = createClient();

  // 1️⃣ جلب العقارات الموافق عليها فقط
  const { data: properties, error } = await supabase
    .from("properties")
    .select("*")
    .eq("status", "approved");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // 2️⃣ Google Auth
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  // 3️⃣ تحويل البيانات إلى صفوف
  const rows = properties.map((p) => [
    p.id,
    p.title,
    p.type,
    p.price,
    p.status,
    p.created_at,
  ]);

  // 4️⃣ إرسال إلى الشيت
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.SPREADSHEET_ID,
    range: "Sheet1!A2",
    valueInputOption: "RAW",
    requestBody: {
      values: rows,
    },
  });

  return NextResponse.json({
    success: true,
    count: properties.length,
  });
}
