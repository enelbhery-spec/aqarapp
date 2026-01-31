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
      priority: 1,
    },
    {
      url: `${baseUrl}/areas`,
      lastModified: now,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: now,
      priority: 0.75,
    },
  ];

  // صفحات المناطق
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

  // صفحات المقالات
  articles.forEach((slug) => {
    urls.push({
      url: `${baseUrl}/articles/${slug}`,
      lastModified: now,
      priority: 0.65,
    });
  });

  return urls;
}
