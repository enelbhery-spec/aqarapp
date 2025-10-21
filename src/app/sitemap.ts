import { supabase } from "@/lib/supabaseClient";

export default async function sitemap() {
  const { data: properties } = await supabase
    .from("properties")
    .select("id, updated_at");

  const baseUrl = "https://aqarapp.netlify.app"; // 🔁 غيّرها إلى رابط موقعك الفعلي

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
}
