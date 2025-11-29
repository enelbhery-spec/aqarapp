import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function sitemap() {
  const BASE_URL = "https://aqaratapp.netlify.app";

  // جلب العقارات من Supabase
  const { data, error } = await supabase
    .from("properties")
    .select("slug, last_updated_at")
    .eq("is_published", true);

  if (error) {
    console.error("Error Fetching Sitemap Data:", error);
  }

  // روابط العقارات الديناميكية
  const propertyUrls =
    data?.map((item) => ({
      url: `${BASE_URL}/properties/${item.slug}`,
      lastModified: item.last_updated_at
        ? new Date(item.last_updated_at).toISOString()
        : new Date().toISOString(),
    })) ?? [];

  // روابط ثابتة
  const staticUrls = [
    { url: `${BASE_URL}/`, lastModified: new Date().toISOString() },
    { url: `${BASE_URL}/properties`, lastModified: new Date().toISOString() },
  ];

  return [...staticUrls, ...propertyUrls];
}
