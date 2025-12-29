import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      title,
      propertyType,
      description,
      area,
      bedrooms,
      bathrooms,
      city,
      price,
      phone,
      notes,
    } = body;

    // إعداد Google Service Account
    const auth = new google.auth.JWT(
      process.env.GOOGLE_CLIENT_EMAIL,
      null,
      process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      ["https://www.googleapis.com/auth/spreadsheets"]
    );

    const sheets = google.sheets({ version: "v4", auth });

    // إضافة صف جديد في الشيت
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Sheet1!A1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            new Date().toLocaleString("ar-EG"), // التاريخ
            title,
            propertyType,
            description,
            area,
            bedrooms,
            bathrooms,
            city,
            price,
            phone,
            notes,
            "pending", // حالة المراجعة
          ],
        ],
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Google Sheet Sync Error:", error);
    return NextResponse.json(
      { error: "Failed to sync property with Google Sheet" },
      { status: 500 }
    );
  }
}
