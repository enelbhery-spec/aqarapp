import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import { createClient } from "@/utils/supabase/server";

// تحديد عدد العناصر المعروضة في الصفحة الواحدة لكل قسم
const PROPERTIES_PER_PAGE = 9;
const ARTICLES_PER_PAGE = 3;
const AREAS_PER_PAGE = 8;

export default async function HomePage(props: {
  searchParams: Promise<{ p_page?: string; a_page?: string; r_page?: string }>;
}) {
  const searchParams = await props.searchParams;
  
  // 1. حساب صفحات العقارات (Properties)
  const pCurrentPage = Number(searchParams.p_page) || 1;
  const pFrom = (pCurrentPage - 1) * PROPERTIES_PER_PAGE;
  const pTo = pFrom + PROPERTIES_PER_PAGE - 1;

  // 2. حساب صفحات المقالات (Articles)
  const aCurrentPage = Number(searchParams.a_page) || 1;
  const aFrom = (aCurrentPage - 1) * ARTICLES_PER_PAGE;
  const aTo = aFrom + ARTICLES_PER_PAGE - 1;

  // 3. حساب صفحات المناطق (Areas)
  const rCurrentPage = Number(searchParams.r_page) || 1;
  const rFrom = (rCurrentPage - 1) * AREAS_PER_PAGE;
  const rTo = rFrom + AREAS_PER_PAGE - 1;

  const supabase = await createClient();

  // ✅ 1. عقارات مميزة (ثابتة بالأعلى)
  const { data: featuredProperties } = await supabase
    .from("featured_properties")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(3);

  // ✅ 2. أحدث الإضافات (مع العداد والـ Range المخصص لها)
  const { data: properties, error: pError, count: pCount } = await supabase
    .from("featured_properties")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(pFrom, pTo);

  // ✅ 3. جلب المقالات (مع العداد والـ Range المخصص لها)
  const { data: articles, error: aError, count: aCount } = await supabase
    .from("articles")
    .select("id, property_id, article_title, article_content", { count: "exact" })
    .order("id", { ascending: false })
    .range(aFrom, aTo);

  // ✅ 4. المناطق (مع العداد والـ Range المخصص لها)
  const { data: areas, error: rError, count: rCount } = await supabase
    .from("areas")
    .select("name, slug", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(rFrom, rTo);

  if (pError || aError || rError) {
    console.error("Supabase Fetch Error logged");
  }

  // حساب إجمالي الصفحات لكل قسم
  const pTotalPages = pCount ? Math.ceil(pCount / PROPERTIES_PER_PAGE) : 0;
  const aTotalPages = aCount ? Math.ceil(aCount / ARTICLES_PER_PAGE) : 0;
  const rTotalPages = rCount ? Math.ceil(rCount / AREAS_PER_PAGE) : 0;

  // دالة توليد أرقام الصفحات الذكية المدمجة
  const getVisiblePages = (current: number, total: number) => {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    if (current <= 3) return [1, 2, 3, 4, "...", total];
    if (current >= total - 2) return [1, "...", total - 3, total - 2, total - 1, total];
    return [1, "...", current - 1, current, current + 1, "...", total];
  };

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

      {/* 🏠 Properties Section */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center text-gray-700">أحدث الإضافات</h2>
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

        {/* Properties Pagination */}
        {pTotalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12 flex-wrap" dir="rtl">
            <Link href={`/?p_page=${pCurrentPage - 1}&a_page=${aCurrentPage}&r_page=${rCurrentPage}`}
              className={`px-4 py-2 rounded-xl border font-bold ${pCurrentPage <= 1 ? "opacity-30 pointer-events-none" : "hover:bg-green-50 text-green-700"}`}>
              السابق
            </Link>
            {getVisiblePages(pCurrentPage, pTotalPages).map((p, idx) =>
              typeof p === "number" ? (
                <Link key={idx} href={`/?p_page=${p}&a_page=${aCurrentPage}&r_page=${rCurrentPage}`}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold ${pCurrentPage === p ? "bg-green-600 text-white" : "bg-white border text-gray-600 hover:border-green-400"}`}>
                  {p}
                </Link>
              ) : (
                <span key={idx} className="text-gray-400">...</span>
              )
            )}
            <Link href={`/?p_page=${pCurrentPage + 1}&a_page=${aCurrentPage}&r_page=${rCurrentPage}`}
              className={`px-4 py-2 rounded-xl border font-bold ${pCurrentPage >= pTotalPages ? "opacity-30 pointer-events-none" : "hover:bg-green-50 text-green-700"}`}>
              التالي
            </Link>
          </div>
        )}
      </section>

      {/* 📝 Articles Section */}
      {articles && articles.length > 0 && (
        <section className="py-16 bg-gray-100/60 border-t border-b">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">✍️ مقالات عقارية تهمك</h2>
              <p className="text-gray-500">تعرف على نصائح الشراء وأحدث تقارير الاستثمار في حدائق أكتوبر</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8" dir="rtl">
              {articles.map((article: any) => {
                const cleanSnippet = article.article_content
                  ? article.article_content.replace(/<[^>]*>/g, "").replace(/مقدمة/g, "")
                  : "";
                return (
                  <div key={article.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-150 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{article.article_title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-4 leading-relaxed">{cleanSnippet}</p>
                    </div>
                    <div className="flex justify-between items-center mt-4 border-t pt-4">
                      <Link href={`/articles/${article.id}`} className="text-emerald-600 hover:text-emerald-700 text-sm font-bold">اقرأ المقال بالكامل ←</Link>
                      <Link href={`/properties/${article.property_id}`} className="text-gray-500 hover:text-gray-700 text-xs font-semibold">معاينة العقار 🏠</Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Articles Pagination */}
            {aTotalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12 flex-wrap" dir="rtl">
                <Link href={`/?p_page=${pCurrentPage}&a_page=${aCurrentPage - 1}&r_page=${rCurrentPage}`}
                  className={`px-4 py-2 rounded-xl border font-bold ${aCurrentPage <= 1 ? "opacity-30 pointer-events-none" : "hover:bg-emerald-50 text-emerald-700"}`}>
                  السابق
                </Link>
                {getVisiblePages(aCurrentPage, aTotalPages).map((p, idx) =>
                  typeof p === "number" ? (
                    <Link key={idx} href={`/?p_page=${pCurrentPage}&a_page=${p}&r_page=${rCurrentPage}`}
                      className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold ${aCurrentPage === p ? "bg-emerald-600 text-white" : "bg-white border text-gray-600 hover:border-emerald-400"}`}>
                      {p}
                    </Link>
                  ) : (
                    <span key={idx} className="text-gray-400">...</span>
                  )
                )}
                <Link href={`/?p_page=${pCurrentPage}&a_page=${aCurrentPage + 1}&r_page=${rCurrentPage}`}
                  className={`px-4 py-2 rounded-xl border font-bold ${aCurrentPage >= aTotalPages ? "opacity-30 pointer-events-none" : "hover:bg-emerald-50 text-emerald-700"}`}>
                  التالي
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 🗺️ Areas Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">استكشف المناطق والكمبوندات</h2>
            <p className="text-gray-500">دليلك الكامل لأحياء حدائق أكتوبر</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {areas?.map((area: any) => (
              <Link key={area.slug} href={`/areas/${area.slug}`}
                className="group relative h-48 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100">
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 via-emerald-900/30 to-transparent z-10" />
                <div className="absolute inset-0 bg-slate-100 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute bottom-5 right-5 z-20 text-right" dir="rtl">
                  <h3 className="text-white text-lg font-bold mb-0.5">{area.name}</h3>
                  <p className="text-emerald-200 text-xs">عرض التفاصيل ←</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Areas Pagination */}
          {rTotalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12 flex-wrap" dir="rtl">
              <Link href={`/?p_page=${pCurrentPage}&a_page=${aCurrentPage}&r_page=${rCurrentPage - 1}`}
                className={`px-4 py-2 rounded-xl border font-bold ${rCurrentPage <= 1 ? "opacity-30 pointer-events-none" : "hover:bg-green-50 text-green-700"}`}>
                السابق
              </Link>
              {getVisiblePages(rCurrentPage, rTotalPages).map((p, idx) =>
                typeof p === "number" ? (
                  <Link key={idx} href={`/?p_page=${pCurrentPage}&a_page=${aCurrentPage}&r_page=${p}`}
                    className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold ${rCurrentPage === p ? "bg-green-600 text-white" : "bg-white border text-gray-600 hover:border-green-400"}`}>
                    {p}
                  </Link>
                ) : (
                  <span key={idx} className="text-gray-400">...</span>
                )
              )}
              <Link href={`/?p_page=${pCurrentPage}&a_page=${aCurrentPage}&r_page=${rCurrentPage + 1}`}
                className={`px-4 py-2 rounded-xl border font-bold ${rCurrentPage >= rTotalPages ? "opacity-30 pointer-events-none" : "hover:bg-green-50 text-green-700"}`}>
                التالي
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}