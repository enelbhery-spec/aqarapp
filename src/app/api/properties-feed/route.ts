import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// 🛡️ تنظيف XML لمنع الأخطاء في القراءة
function escapeXml(unsafe: string) {
  if (!unsafe) return "";
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // 1. جلب البيانات من جدول العقارات (properties)
    const { data: properties, error } = await supabase
      .from("properties")
      .select("*");

    if (error) {
      return new NextResponse(error.message, { status: 500 });
    }

    const safeProperties = properties || [];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>
  <title>عقار ترند - Trend Aqar</title>
  <link>https://trand-aqar.online</link>
  <description>أحدث العقارات والشقق في حدائق أكتوبر</description>

${safeProperties
  .filter((p) => p.id && p.title && p.price)
  .map((p) => {
    const propertyLink = `https://trand-aqar.online/properties/${p.id}`;
    const mainImage = Array.isArray(p.images) ? p.images[0] : (p.image_url || "");

    return `
<item>
  <g:id>${escapeXml(String(p.id))}</g:id>
  <g:title>${escapeXml(p.title)}</g:title>
  <g:description>${escapeXml((p.description || p.title).slice(0, 500))}</g:description>
  <g:link>${escapeXml(propertyLink)}</g:link>
  <g:image_link>${escapeXml(mainImage)}</g:image_link>
  <g:price>${escapeXml(`${p.price} EGP`)}</g:price>
  <g:availability>in stock</g:availability>
  <g:condition>new</g:condition>
  <g:brand>ترند عقار</g:brand>
  <g:product_type>Real Estate &gt; Properties</g:product_type>
</item>`;
  })
  .join("")}

</channel>
</rss>`;

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "s-maxage=3600, stale-while-revalidate",
      },
    });
  } catch (err: any) {
    return new NextResponse(err.message || "Server Error", {
      status: 500,
    });
  }
}