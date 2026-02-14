import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://aqarapp.vercel.app";
  const now = new Date();

  const areas = ["hadayek-october"];

  const articles = [
    "buy-without-photos",
    "choose-area-hadayek-october",
  ];

  const urls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/videos`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/areas`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    },
  ];

  // صفحات المناطق
  areas.forEach((area) => {
    urls.push(
      {
        url: `${baseUrl}/areas/${area}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.75,
      },
      {
        url: `${baseUrl}/areas/${area}/sale`,
        lastModified: now,
        changeFrequency: "daily",
        priority: 0.7,
      },
      {
        url: `${baseUrl}/areas/${area}/rent`,
        lastModified: now,
        changeFrequency: "daily",
        priority: 0.7,
      }
    );
  });

  // صفحات المقالات
  articles.forEach((slug) => {
    urls.push({
      url: `${baseUrl}/articles/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
    });
  });

  return urls;
}
