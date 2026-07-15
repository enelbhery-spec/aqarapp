import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import { createClient } from "@/utils/supabase/server";

const ITEMS_PER_PAGE = 9;

export default async function HomePage(props: {
  searchParams: Promise<{ page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams.page) || 1;
  const from = (currentPage - 1) * ITEMS_PER_PAGE;
  const to = from + ITEMS_PER_PAGE - 1;

  const supabase = await createClient();

  // ✅ 1. عقارات مميزة (تستعلم من featured_properties)
  const { data: featuredProperties } = await supabase
    .from("featured_properties")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(3); // تم تحديدها بـ 3 لعرض الأبرز فقط في الأعلى

  // ✅ 2. أحدث الإضافات (تستعلم الآن من featured_properties بدلاً من properties)
  const { data: properties, error, count } = await supabase
    .from("featured_properties")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  // ✅ 3. جلب المقالات المخصصة للمدونة ترويجياً (🔥 جديد)
  const { data: articles } = await supabase
    .from("articles")
    .select("id, property_id, article_title, article_content")
    .order("id", { ascending: false })
    .limit(3); // جلب آخر 3 مقالات ترويجية للمدونة بالصفحة الرئيسية

  // ✅ 4. المناطق
  const { data: areas } = await supabase
    .from("areas")
    .select("name, slug")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    console.error("Supabase Error:", error.message);
  }

  const totalPages = count ? Math.ceil(count / ITEMS_PER_PAGE) : 0;

  const getVisiblePages = (current: number, total: number) => {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    if (current <= 3) return [1, 2, 3, 4, "...", total];
    if (current >= total - 2) return [1, "...", total - 3, total - 2, total - 1, total];
    return [1, "...", current - 1, current, current + 1, "...", total];
  };

  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <main className="bg-gray-50 text-gray-800 min-h-screen">
      
      {/* Hero */}
      <section className="bg-gradient-to-bl from-green-600 via-green-500 to-emerald-500 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">ابحث بذكاء عن عقارك</h1>
        <p className="opacity-90">دليلك العقاري الشامل لأفضل المجمعات السكنية</p>
      </section>

      {/* ⭐ Featured */}
      {featuredProperties && featuredProperties.length > 0 && (
        <section className="py-12 bg-emerald-50/50 border-b">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-emerald-800 mb-8 flex items-center gap-2">
              ⭐ عقارات مميزة نوصي بها
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map((property: any) => (
                <div key={property.id} className="transform hover:scale-[1.02] transition">
                  <PropertyCard property={property} isFeatured />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 🏠 Properties (الآن تقرأ من featured_properties كلياً) */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center text-gray-700">
          أحدث الإضافات
        </h2>

        {!properties || properties.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed">
            <p className="text-gray-500 text-lg">لا توجد عقارات حالياً</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property: any) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12 flex-wrap" dir="rtl">
            <Link href={`/?page=${currentPage - 1}`}
              className={`px-4 py-2 rounded-xl border font-bold ${currentPage <= 1 ? "opacity-30 pointer-events-none" : "hover:bg-green-50 text-green-700"}`}>
              السابق
            </Link>

            {visiblePages.map((p, idx) =>
              typeof p === "number" ? (
                <Link key={idx} href={`/?page=${p}`}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold ${
                    currentPage === p
                      ? "bg-green-600 text-white"
                      : "bg-white border text-gray-600 hover:border-green-400"
                  }`}>
                  {p}
                </Link>
              ) : (
                <span key={idx} className="text-gray-400">...</span>
              )
            )}

            <Link href={`/?page=${currentPage + 1}`}
              className={`px-4 py-2 rounded-xl border font-bold ${currentPage >= totalPages ? "opacity-30 pointer-events-none" : "hover:bg-green-50 text-green-700"}`}>
              التالي
            </Link>
          </div>
        )}
      </section>

{/* 📝 قسم المقالات العقارية ترويجياً */}
{articles && articles.length > 0 && (
  <section className="py-16 bg-gray-100/60 border-t border-b">
    <div className="container mx-auto px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          ✍️ مقالات عقارية تهمك
        </h2>
        <p className="text-gray-500">
          تعرف على نصائح الشراء وأحدث تقارير الاستثمار في حدائق أكتوبر
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8" dir="rtl">
        {articles.map((article: any) => {
          // دالة ذكية لإزالة وسوم الـ HTML من النص المختصر في الكارت
          const cleanSnippet = article.article_content
            ? article.article_content.replace(/<[^>]*>/g, "").replace(/مقدمة/g, "")
            : "";

          return (
            <div key={article.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-150 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                  {article.article_title}
                </h3>
                {/* عرض النص نظيفاً تماماً وبدون وسوم HTML */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-4 leading-relaxed">
                  {cleanSnippet}
                </p>
              </div>
              <div className="flex justify-between items-center mt-4 border-t pt-4">
                <Link
                  href={`/articles/${article.id}`}
                  className="text-emerald-600 hover:text-emerald-700 text-sm font-bold"
                >
                  اقرأ المقال بالكامل ←
                </Link>
                <Link
                  href={`/properties/${article.property_id}`}
                  className="text-gray-500 hover:text-gray-700 text-xs font-semibold"
                >
                  معاينة العقار 🏠
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
)}
      {/* 🗺️ المناطق */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              استكشف المناطق والكمبوندات
            </h2>
            <p className="text-gray-500">
              دليلك الكامل لأحياء حدائق أكتوبر
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {areas?.map((area: any) => (
              <Link
                key={area.slug}
                href={`/areas/${area.slug}`}
                className="group relative h-48 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 via-emerald-900/30 to-transparent z-10" />
                <div className="absolute inset-0 bg-slate-100 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute bottom-5 right-5 z-20 text-right" dir="rtl">
                  <h3 className="text-white text-lg font-bold mb-0.5">
                    {area.name}
                  </h3>
                  <p className="text-emerald-200 text-xs">
                    عرض التفاصيل ←
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}