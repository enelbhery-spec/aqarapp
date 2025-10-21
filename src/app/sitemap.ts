import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function sitemap() {
  const baseUrl = "https://aqaratapp.netlify.app"; // 🔁 غيّر للرابط الحقيقي لموقعك

  try {
    const { data: properties } = await supabase
      .from("properties")
      .select("id, updated_at");

    const propertyUrls =
      properties?.map((property) => ({
        url: `${baseUrl}/property/${property.id}`,
        lastModified: property.updated_at
          ? new Date(property.updated_at)
          : new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      })) || [];

    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      },
      ...propertyUrls,
    ];
  } catch (error) {
    console.error("خطأ أثناء توليد خريطة الموقع:", error);
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      },
    ];
  }
}
