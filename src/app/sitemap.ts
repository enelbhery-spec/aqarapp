import { MetadataRoute } from "next";
import { createClient } from "@/utils/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.trand-aqar.online";
  const supabase = await createClient();

  // 1. جلب معرفات العقارات من جدول العقارات العامة
  const { data: properties } = await supabase
    .from("properties")
    .select("id, created_at");

  // 2. جلب معرفات العقارات من جدول العقارات المميزة
  const { data: featuredProperties } = await supabase
    .from("featured_properties")
    .select("id, created_at");

  // 3. جلب المقالات ديناميكياً (الموجودة في الصفحة الرئيسية للموقع)
  const { data: articles } = await supabase
    .from("articles") // تأكد من اسم جدول المقالات لديك (مثلاً: articles أو blogs)
    .select("id, created_at");

  // استخدام Map لمنع تكرار روابط العقارات إذا كان العقار عام ومميز في نفس الوقت
  const propertyMap = new Map<string, any>();

  // تجهيز العقارات العامة
  (properties || []).forEach((prop) => {
    propertyMap.set(prop.id, {
      url: `${baseUrl}/properties/${prop.id}`,
      lastModified: new Date(prop.created_at),
      changeFrequency: "daily",
      priority: 0.7,
    });
  });

  // تجهيز العقارات المميزة (لتحديث الأولوية إلى 0.9 لو تكرر)
  (featuredProperties || []).forEach((prop) => {
    propertyMap.set(prop.id, {
      url: `${baseUrl}/properties/${prop.id}`,
      lastModified: new Date(prop.created_at),
      changeFrequency: "daily",
      priority: 0.9,
    });
  });

  const propertyEntries: MetadataRoute.Sitemap = Array.from(propertyMap.values());

  // تجهيز روابط المقالات العقارية ديناميكياً
  const articleEntries: MetadataRoute.Sitemap = (articles || []).map((article) => ({
    url: `${baseUrl}/blog/${article.id}`, // تأكد من مسار المقالات في مشروعك (مثلاً /blog/ أو /articles/)
    lastModified: new Date(article.created_at),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // الصفحات الثابتة (تمت إضافة صفحات الفوتر المفقودة في السايت ماب القديم)
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/areas`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/videos`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/areas/hadayek-october`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/areas/italian-district`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/areas/7th-district`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // صفحات روابط الفوتر الثابتة المفقودة:
    {
      url: `${baseUrl}/privacy-policy`, // سياسة الخصوصية
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-use`, // شروط الاستخدام
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/contact-us`, // اتصل بنا
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // دمج كل الروابط معاً (الصفحات الثابتة + العقارات بدون تكرار + المقالات)
  return [...staticPages, ...propertyEntries, ...articleEntries];
}