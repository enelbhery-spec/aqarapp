import os
from datetime import datetime

BASE_URL = "https://aqarapp.vercel.app"

# الصفحات الحالية في الموقع
routes = [
    "",
    "/areas",
    "/videos",
]

# مثال مناطق
areas = [
    "hadayek-october",
    "italian-district",
    "7th-district"
]

for area in areas:
    routes.append(f"/areas/{area}")

today = datetime.now().isoformat()

# بناء كود TypeScript
items = []

for r in routes:

    url = f"{BASE_URL}{r}"

    items.append(f"""{{
      url: "{url}",
      lastModified: new Date("{today}"),
      changeFrequency: "weekly",
      priority: 0.8,
    }}""")

ts_code = f"""
import {{ MetadataRoute }} from "next"

export default function sitemap(): MetadataRoute.Sitemap {{

  return [
{",".join(items)}
  ]

}}
"""

# حفظ الملف
path = "src/app/sitemap.ts"

with open(path, "w", encoding="utf8") as f:
    f.write(ts_code)

print("✅ sitemap.ts updated")