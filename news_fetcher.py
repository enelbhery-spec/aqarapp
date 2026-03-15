import os
from datetime import datetime
from supabase import create_client
from dotenv import load_dotenv
from playwright.sync_api import sync_playwright

# ===============================
# إعداد Supabase (Next.js keys)
# ===============================
load_dotenv(".env.local")

SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

print("✅ تم الاتصال بـ Supabase")

AREAS = [
    "حدائق أكتوبر",
    "6 أكتوبر",
    "الشيخ زايد",
    "القاهرة الجديدة",
    "التجمع"
]


# ===============================
# جلب الأخبار باستخدام Browser
# ===============================
def fetch_news():

    url = "https://akhbarelyom.com/section/110/عقارات"
    saved = 0

    with sync_playwright() as p:

        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        print(f"\n🔎 فتح الموقع: {url}")

        page.goto(url, timeout=60000)
        page.wait_for_timeout(5000)  # انتظار تحميل JS

        articles = page.query_selector_all("h3 a")

        if not articles:
            print("❌ الموقع لم يرجع أخبار (selector يحتاج تحديث)")
            browser.close()
            return 0

        for article in articles:

            title = article.inner_text().strip()
            link = article.get_attribute("href")

            if not title or len(title) < 20:
                continue

            if link.startswith("/"):
                link = "https://akhbarelyom.com" + link

            area = "عقارات"
            for a in AREAS:
                if a in title:
                    area = a
                    break

            news_item = {
                "title": title,
                "source": "أخبار اليوم",
                "link": link,
                "area": area,
                "category": "عقارات",
                "published_at": datetime.now().isoformat()
            }

            try:
                supabase.table("news") \
                    .upsert(news_item, on_conflict="link") \
                    .execute()

                print(f"✅ حفظ: {title[:60]}")
                saved += 1

            except Exception as e:
                print("⚠️ تخطي:", e)

            if saved >= 15:
                break

        browser.close()

    return saved


# ===============================
print("\n🚀 بدء تحديث الأخبار العقارية...\n")

total = fetch_news()

print(f"\n🏁 انتهى التحديث | تم حفظ {total} خبر جديد")
