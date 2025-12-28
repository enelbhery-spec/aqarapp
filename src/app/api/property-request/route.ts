import { NextResponse } from "next/server";
import { google } from "googleapis";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // مهم
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      title,
      description,
      price,
      location,
      image_url,
      area,
      bathrooms,
      bedrooms,
      user_id,
      currency,
    } = body;

    /* 1️⃣ إضافة العقار في Supabase */
    const { data, error } = await supabase
      .from("properties")
      .insert({
        title,
        description,
        price,
        location,
        image_url,
        area,
        bathrooms,
        bedrooms,
        user_id,
        currency,
        status: "pending",
      })
      .select()
      .single();

    if (error) throw error;

    /* 2️⃣ الإرسال إلى Google Sheet */
    const auth = new google.auth.JWT(
      process.env.GOOGLE_CLIENT_EMAIL,
      undefined,
      process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      ["https://www.googleapis.com/auth/spreadsheets"]
    );

    const sheets = google.sheets({ version: "v4", auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Add_Properties_Pending!A1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            new Date().toLocaleString("ar-EG"),
            title,
            description,
            price,
            location,
            image_url,
            area,
            bathrooms,
            bedrooms,
            data.id,
            user_id,
            currency,
          ],
        ],
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("ADD PROPERTY ERROR:", err);
    return NextResponse.json(
      { error: "Failed to add property" },
      { status: 500 }
    );
  }
}
