import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  const baseUrl = "https://aqarapp.vercel.app/";
  // ⚠️ غيّرها إلى الدومين الحقيقي

  // 🔹 جلب كل العقارات (slug)
  const { data: properties, error } = await supabase
    .from("properties")
    .select("slug, updated_at");

  if (error) {
    console.error(error);
  }

  // 🔹 روابط ثابتة
  const staticUrls = [
    {
      loc: `${baseUrl}/`,
      lastmod: new Date().toISOString(),
    },
    {
      loc: `${baseUrl}/properties`,
      lastmod: new Date().toISOString(),
    },
  ];

  // 🔹 روابط العقارات
  const propertyUrls =
    properties?.map((item) => ({
      loc: `${baseUrl}/properties/${item.slug}`,
      lastmod: item.updated_at || new Date().toISOString(),
    })) || [];

  // 🔹 دمج كل الروابط
  const allUrls = [...staticUrls, ...propertyUrls];

  // 🔹 توليد XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (url) => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
  </url>`
  )
  .join("")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
