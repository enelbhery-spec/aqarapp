import { createClient } from "@supabase/supabase-js";

export const revalidate = 60; // يحدث كل دقيقة

export default async function sitemap() {
  // بيانات Supabase
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  // جلب جميع العقارات
  const { data: properties } = await supabase
    .from("properties")
    .select("id, created_at");

  const baseUrl = "https://aqaratapp.netlify.app";

  const propertyUrls =
    properties?.map((p) => ({
      url: `${baseUrl}/properties/${p.id}`,
      lastModified: new Date(p.created_at).toISOString(),
      changeFrequency: "weekly",
      priority: 0.8,
    })) || [];

  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...propertyUrls,
  ];
}
