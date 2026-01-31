import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://aqarapp.vercel.app";
  const now = new Date();

  const areas = [
    "6-october",
    "new-cairo",
    "nasr-city",
    "sheikh-zayed",
  ];

  const urls = [
    {
      url: baseUrl,
      lastModified: now,
      priority: 1,
    },
    {
      url: `${baseUrl}/areas`,
      lastModified: now,
      priority: 0.8,
    },
  ];

  areas.forEach((area) => {
    urls.push(
      {
        url: `${baseUrl}/areas/${area}`,
        lastModified: now,
        priority: 0.75,
      },
      {
        url: `${baseUrl}/areas/${area}/sale`,
        lastModified: now,
        priority: 0.7,
      },
      {
        url: `${baseUrl}/areas/${area}/rent`,
        lastModified: now,
        priority: 0.7,
      }
    );
  });

  return urls;
}
