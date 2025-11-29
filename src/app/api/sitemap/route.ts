// src/api/sitemap/route.ts

import { createClient } from "@supabase/supabase-js";
import { NextResponse } from 'next/server';

// -----------------------------------------------------------
// 📌 إعداد Supabase وجلب البيانات
// -----------------------------------------------------------

// إنشاء عميل Supabase (يستخدم مفاتيح الـ Anon Key للقراءة)
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/**
 * تجلب slugs وتواريخ التحديث للعقارات المنشورة من Supabase.
 */
async function getPropertiesData(): Promise<Array<{slug: string, last_updated_at: string}>> {
    const { data, error } = await supabase
        .from('properties') // اسم جدول العقارات
        .select('slug, last_updated_at')
        // 💡 جلب العقارات المنشورة فقط (افترضنا عمود is_published)
        .eq('is_published', true)       
        .order('last_updated_at', { ascending: false });

    if (error) {
        console.error("❌ خطأ في Supabase عند جلب الـ Sitemap:", error);
        return []; 
    }

    return data as Array<{slug: string, last_updated_at: string}>;
}

// -----------------------------------------------------------
// ⚙️ منطق توليد ملف XML
// -----------------------------------------------------------

const BASE_URL = 'https://aqaratapp.netlify.app';

function generateSitemap(properties: Array<{slug: string, last_updated_at: string}>): string {
    const propertiesUrls = properties.map(property => {
        // تنسيق التاريخ إلى YYYY-MM-DD
        const lastmodDate = new Date(property.last_updated_at).toISOString().split('T')[0];

        return `
          <url>
            <loc>${BASE_URL}/properties/${property.slug}</loc>
            <lastmod>${lastmodDate}</lastmod>
          </url>
        `;
    }).join('');

    // بناء ملف XML الكامل (إضافة الروابط الثابتة والديناميكية)
    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${BASE_URL}/</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
      </url>
      <url>
        <loc>${BASE_URL}/properties</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
      </url>
      
      ${propertiesUrls}
    </urlset>
    `;
}

/**
 * دالة GET التي يتم تشغيلها عند طلب /api/sitemap.xml
 */
export async function GET() {
    try {
        const properties = await getPropertiesData();
        const sitemap = generateSitemap(properties);

        // إرجاع الاستجابة بتنسيق XML مع التخزين المؤقت (24 ساعة)
        return new Response(sitemap, {
            status: 200,
            headers: {
                'Content-Type': 'application/xml',
                // التخزين المؤقت: يقلل من عدد مرات الاتصال بقاعدة البيانات
                'Cache-Control': 's-maxage=86400, stale-while-revalidate',
            },
        });
    } catch (error) {
        return new Response('Error generating sitemap.', { status: 500 });
    }
}