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

  // 1. جلب العقارات المميزة
  const { data: featuredProperties } = await supabase
    .from("featured_properties")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(3);

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

  return (
    <main className="bg-gray-50 text-gray-800 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-bl from-green-600 via-green-500 to-emerald-500 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">ابحث بذكاء عن عقارك</h1>
        <p className="opacity-90">دليلك العقاري الشامل لأفضل المجمعات السكنية</p>
      </section>

      {/* 🚀 قسم العقارات المميزة - تم إصلاح الإظهار هنا */}
      {featuredProperties && featuredProperties.length > 0 && (
        <section className="py-12 bg-emerald-50/50 border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-emerald-800 flex items-center gap-2">
                <span className="text-3xl">⭐</span> عقارات مميزة نوصي بها
              </h2>
              <span className="bg-emerald-200 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                خاص بنا
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map((property: any) => (
                <div key={property.id} className="relative transform hover:scale-[1.02] transition-transform duration-300">
                  {/* علامة تمييز على الكرت */}
                  
                  {/* ✅ السطر الناقص كان هنا: استدعاء المكون وتمرير البيانات له */}
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
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12" dir="rtl">
            <Link
              href={`/?page=${currentPage - 1}`}
              className={`px-4 py-2 rounded-xl border ${currentPage <= 1 ? "pointer-events-none opacity-30" : "hover:bg-green-50"}`}
            >
              السابق
            </Link>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`/?page=${p}`}
                className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold ${currentPage === p ? "bg-green-600 text-white" : "bg-white border text-gray-600"}`}
              >
                {p}
              </Link>
            ))}
            <Link
              href={`/?page=${currentPage + 1}`}
              className={`px-4 py-2 rounded-xl border ${currentPage >= totalPages ? "pointer-events-none opacity-30" : "hover:bg-green-50"}`}
            >
              التالي
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}