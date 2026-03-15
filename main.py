import json
import psycopg2
from slugify import slugify

# ضع بيانات الاتصال من Supabase هنا
conn = psycopg2.connect(
    host="db.xxxxxxxxx.supabase.co",
    database="postgres",
    user="postgres",
    password="YOUR_PASSWORD",
    port="5432"
)

cursor = conn.cursor()

FILE_PATH = r"C:\Users\Best-office\final apps\dataset_agarmap-cheerio_2026-02-18_18-57-24-934.json"

with open(FILE_PATH, 'r', encoding='utf-8') as f:
    listings = json.load(f)

count = 0

for item in listings:

    listing_id = item.get("listingId")
    title = item.get("imageAlt") or "بدون عنوان"
    slug = slugify(title)

    cursor.execute("""
        INSERT INTO properties (id, title, slug)
        VALUES (%s, %s, %s)
        ON CONFLICT (id) DO NOTHING
    """, (listing_id, title, slug))

    count += 1

conn.commit()
cursor.close()
conn.close()

print(f"تم إدخال {count} عقار بنجاح 🚀")
