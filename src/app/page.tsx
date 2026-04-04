import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import { createClient } from "@/utils/supabase/server";
import { hadayekOctoberAreas } from "@/data/hadayekOctoberAreas";

const ITEMS_PER_PAGE = 9;

export default async function HomePage(props: {
  searchParams: Promise<{ page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams.page) || 1;
  const from = (currentPage - 1) * ITEMS_PER_PAGE;
  const to = from + ITEMS_PER_PAGE - 1;

  const supabase = await createClient();

  // 1. جلب العقارات المميزة - تم التعديل لـ 9 عقارات بدلاً من 3
  const { data: featuredProperties } = await supabase
    .from("featured_properties")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(9);

  // 2. جلب العقارات العامة
  const { data: properties, error, count } = await supabase
    .from("properties")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("Supabase Error:", error.message);
  }

  const totalPages = count ? Math.ceil(count / ITEMS_PER_PAGE) : 0;

  // --- دالة منطق ترقيم الصفحات المختصر ---
  const getVisiblePages = (current: number, total: number) => {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    
    if (current <= 3) return [1, 2, 3, 4, "...", total];
    if (current >= total - 2) return [1, "...", total - 3, total - 2, total - 1, total];
    
    return [1, "...", current - 1, current, current + 1, "...", total];
  };

  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <main className="bg-gray-50 text-gray-800 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-bl from-green-600 via-green-500 to-emerald-500 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">ابحث بذكاء عن عقارك</h1>
        <p className="opacity-90">دليلك العقاري الشامل لأفضل المجمعات السكنية</p>
      </section>

      {/* 🚀 قسم العقارات المميزة - يظهر الآن حتى 9 عقارات */}
      {featuredProperties && featuredProperties.length > 0 && (
        <section className="py-12 bg-emerald-50/50 border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-emerald-800 flex items-center gap-2">
                <span className="text-3xl">⭐</span> عقارات مميزة نوصي بها
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map((property: any) => (
                <div key={property.id} className="relative transform hover:scale-[1.02] transition-transform duration-300">
                  <PropertyCard property={property} isFeatured={true} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* العقارات العامة Grid */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center text-gray-700">أحدث الإضافات</h2>

        {(!properties || properties.length === 0) ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
             <p className="text-gray-500 text-lg">لا توجد عقارات متاحة حالياً</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property: any) => (
              <PropertyCard
                key={property.id}
                property={property} 
              />
            ))}
          </div>
        )}

        {/* Pagination المعدل والمختصر */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12 flex-wrap" dir="rtl">
            <Link
              href={`/?page=${currentPage - 1}`}
              className={`px-4 py-2 rounded-xl border font-bold ${currentPage <= 1 ? "pointer-events-none opacity-30" : "hover:bg-green-50 text-green-700"}`}
            >
              السابق
            </Link>

            {visiblePages.map((p, idx) => (
              typeof p === "number" ? (
                <Link
                  key={idx}
                  href={`/?page=${p}`}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold transition-all ${currentPage === p ? "bg-green-600 text-white shadow-lg shadow-green-200" : "bg-white border text-gray-600 hover:border-green-400"}`}
                >
                  {p}
                </Link>
              ) : (
                <span key={idx} className="w-8 text-center text-gray-400 font-bold">...</span>
              )
            ))}

            <Link
              href={`/?page=${currentPage + 1}`}
              className={`px-4 py-2 rounded-xl border font-bold ${currentPage >= totalPages ? "pointer-events-none opacity-30" : "hover:bg-green-50 text-green-700"}`}
            >
              التالي
            </Link>
          </div>
        )}
      </section>

      {/* قسم المناطق */}
      <section className="py-20 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">استكشف المناطق والكمبوندات</h2>
            <p className="text-gray-500">دليلك الكامل لأحياء حدائق أكتوبر</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hadayekOctoberAreas[0].areas.slice(0, 4).map((area) => (
              <Link 
                key={area.slug} 
                href={`/areas/${area.slug}`}
                className="group relative h-48 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 via-emerald-900/30 to-transparent z-10" />
                <div className="absolute inset-0 bg-slate-100 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute bottom-5 right-5 z-20 text-right" dir="rtl">
                  <h3 className="text-white text-lg font-bold mb-0.5">{area.name}</h3>
                  <p className="text-emerald-200 text-xs font-medium opacity-90">عرض التفاصيل ←</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}