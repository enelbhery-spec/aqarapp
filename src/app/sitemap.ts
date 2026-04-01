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

  // تجهيز روابط العقارات العامة
  const propertyEntries: MetadataRoute.Sitemap = (properties || []).map((prop) => ({
    url: `${baseUrl}/properties/${prop.id}`,
    lastModified: new Date(prop.created_at),
    changeFrequency: "daily",
    priority: 0.7,
  }));

  // تجهيز روابط العقارات المميزة
  const featuredEntries: MetadataRoute.Sitemap = (featuredProperties || []).map((prop) => ({
    url: `${baseUrl}/properties/${prop.id}`,
    lastModified: new Date(prop.created_at),
    changeFrequency: "daily",
    priority: 0.9, // أولوية أعلى للعقارات المميزة
  }));

  // الصفحات الثابتة
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
  ];

  // دمج كل الروابط معاً
  return [...staticPages, ...propertyEntries, ...featuredEntries];
}