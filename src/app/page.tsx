import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import { createClient } from "@supabase/supabase-js";

// ✅ Supabase Client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const ITEMS_PER_PAGE = 9;

export default async function HomePage(props: {
  searchParams: Promise<{ page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams.page) || 1;
  const from = (currentPage - 1) * ITEMS_PER_PAGE;
  const to = from + ITEMS_PER_PAGE - 1;

  const { data: properties, error, count } = await supabase
    .from("properties")
    .select("*", { count: "exact" }) 
    .order("id", { ascending: false })
    .range(from, to);

  if (error) console.error("Supabase Error:", error);

  const totalPages = count ? Math.ceil(count / ITEMS_PER_PAGE) : 0;

  return (
    <main className="bg-gray-50 text-gray-800">
      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-bl from-green-600 via-green-500 to-emerald-500 text-white py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">ابحث بذكاء عن عقارك  </h1>
          <p className="text-green-50 opacity-90">دليلك العقاري الشامل لأفضل المجمعات السكنية</p>
        </div>
      </section>

      {/* ================= PROPERTIES SECTION ================= */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center text-gray-900">أحدث العقارات المضافة</h2>

          {(!properties || properties.length === 0) && (
            <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-dashed border-gray-300">
               <p className="text-gray-500">لا توجد عقارات حالياً</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties?.map((property: any) => {
              let images: string[] = [];
              try {
                images = Array.isArray(property.images) ? property.images : JSON.parse(property.images || "[]");
              } catch { images = []; }

              return (
                <PropertyCard
                  key={property.id}
                  property={{
                    id: property.id,
                    title: property.title || "بدون عنوان",
                    address: property.address || "غير محدد",
                    price: Number(property.price) || 0,
                    type: property.type || "عقار",
                    listing_type: property.listing_type || "بيع",
                    phone: property.phone || "",
                    images: images,
                  }}
                />
              );
            })}
          </div>

          {/* ================= PAGINATION ================= */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <Link
                href={`/?page=${currentPage - 1}`}
                className={`px-4 py-2 rounded-xl border ${currentPage <= 1 ? "pointer-events-none opacity-30" : "hover:bg-green-50 text-green-600 border-green-200"}`}
              >
                السابق
              </Link>
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={`/?page=${p}`}
                    className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold transition-all ${currentPage === p ? "bg-green-600 text-white shadow-lg shadow-green-200" : "bg-white border border-gray-200 text-gray-600"}`}
                  >
                    {p}
                  </Link>
                ))}
              </div>
              <Link
                href={`/?page=${currentPage + 1}`}
                className={`px-4 py-2 rounded-xl border ${currentPage >= totalPages ? "pointer-events-none opacity-30" : "hover:bg-green-50 text-green-600 border-green-200"}`}
              >
                التالي
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}