import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import { createClient } from "@/utils/supabase/server";

const PROPERTIES_PER_PAGE = 9;
const FEATURED_PER_PAGE = 3;

export default async function HomePage(props: {
  searchParams: Promise<{ p_page?: string; f_page?: string }>;
}) {
  const searchParams = await props.searchParams;

  const pCurrentPage = Number(searchParams.p_page) || 1;
  const pFrom = (pCurrentPage - 1) * PROPERTIES_PER_PAGE;
  const pTo = pFrom + PROPERTIES_PER_PAGE - 1;

  const fCurrentPage = Number(searchParams.f_page) || 1;
  const fFrom = (fCurrentPage - 1) * FEATURED_PER_PAGE;
  const fTo = fFrom + FEATURED_PER_PAGE - 1;

  const supabase = await createClient();

  // ✅ عقارات مميزة مع الترقيم
  const { data: featuredProperties, count: fCount } = await supabase
    .from("featured_properties")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(fFrom, fTo);

  // ✅ عقارات عادية مع الترقيم
  const { data: properties, error: pError, count: pCount } = await supabase
    .from("properties")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(pFrom, pTo);

  if (pError) {
    console.error("Supabase Fetch Error logged");
  }

  const pTotalPages = pCount ? Math.ceil(pCount / PROPERTIES_PER_PAGE) : 0;
  const fTotalPages = fCount ? Math.ceil(fCount / FEATURED_PER_PAGE) : 0;

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

            {/* Featured Pagination */}
            {fTotalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-10 flex-wrap" dir="rtl">
                {getVisiblePages(fCurrentPage, fTotalPages).map((page, index) =>
                  page === "..." ? (
                    <span key={index} className="px-3.5 py-2 text-gray-400 font-medium select-none">
                      ...
                    </span>
                  ) : (
                    <Link
                      key={index}
                      href={`/?f_page=${page}${pCurrentPage > 1 ? `&p_page=${pCurrentPage}` : ""}`}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold transition shadow-sm ${
                        fCurrentPage === page
                          ? "bg-emerald-600 text-white shadow-emerald-200"
                          : "bg-white text-gray-700 hover:bg-emerald-50 border border-gray-200"
                      }`}
                    >
                      {page}
                    </Link>
                  )
                )}
              </div>
            )}
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
            {getVisiblePages(pCurrentPage, pTotalPages).map((page, index) =>
              page === "..." ? (
                <span key={index} className="px-3.5 py-2 text-gray-400 font-medium select-none">
                  ...
                </span>
              ) : (
                <Link
                  key={index}
                  href={`/?p_page=${page}${fCurrentPage > 1 ? `&f_page=${fCurrentPage}` : ""}`}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition shadow-sm ${
                    pCurrentPage === page
                      ? "bg-green-600 text-white shadow-green-200"
                      : "bg-white text-gray-700 hover:bg-green-50 border border-gray-200"
                  }`}
                >
                  {page}
                </Link>
              )
            )}
          </div>
        )}
      </section>
    </main>
  );
}