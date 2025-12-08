// src/app/sitemap.xml/route.ts

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ⚠ استخدم رابط Vercel الصحيح وليس Netlify
const BASE_URL = "https://aqarapp-1794n75lv-enelbhery-specs-projects.vercel.app";

export async function GET() {
  const { data, error } = await supabase
    .from("properties")
    .select("slug, last_updated_at")
    .eq("is_published", true);

  if (error) {
    console.error(error);
    return new Response("Error", { status: 500 });
  }

  const urls = data
    .map((p: any) => {
      const date = new Date(p.last_updated_at).toISOString().split("T")[0];
      return `
        <url>
          <loc>${BASE_URL}/properties/${p.slug}</loc>
          <lastmod>${date}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
      `;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

      <!-- الصفحة الرئيسية -->
      <url>
        <loc>${BASE_URL}/</loc>
        <priority>1.0</priority>
      </url>

      <!-- صفحة العقارات -->
      <url>
        <loc>${BASE_URL}/properties</loc>
        <priority>0.9</priority>
      </url>

      ${urls}
    </urlset>
  `;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600" // تحسين SEO وتخفيف التحميل
    }
  });
}
