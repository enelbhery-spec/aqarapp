import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// منع التخزين المؤقت الدائم لضمان تحديث البيانات عند طلب جوجل للملف
export const revalidate = 3600; // تحديث كل ساعة

export async function GET() {
  try {
    const baseUrl = "https://aqarapp.vercel.app";

    // جلب البيانات من Supabase
    const { data: properties, error } = await supabase
      .from("properties")
      .select("slug, updated_at")
      .order('updated_at', { ascending: false }); // ترتيب الأحدث أولاً

    if (error) throw error;

    const propertyUrls = (properties || []).map((p) => {
      // التأكد من أن الـ slug موجود قبل المعالجة
      if (!p.slug) return "";

      const safeSlug = encodeURIComponent(p.slug);
      const date = p.updated_at ? new Date(p.updated_at).toISOString() : new Date().toISOString();

      return `
  <url>
    <loc>${baseUrl}/properties/${safeSlug}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    }).join("");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/properties</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
${propertyUrls}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600",
      },
    });
  } catch (e) {
    console.error("Sitemap Error:", e);
    // إرجاع خريطة فارغة أو أساسية في حال حدوث خطأ بدلاً من تعطل الصفحة
    return new NextResponse(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`, {
      headers: { "Content-Type": "application/xml" },
    });
  }
}