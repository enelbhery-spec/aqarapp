import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://aqarapp.vercel.app",
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: "https://aqarapp.vercel.app/areas",
      lastModified: new Date(),
      priority: 0.8,
    },
  ];
}
