import PropertyCard from "@/components/PropertyCard";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

// ✅ Supabase Client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const ITEMS_PER_PAGE = 9;

// ✅ تصحيح التعريف ليتوافق مع Next.js 15
export default async function PropertiesPage(props: {
  searchParams: Promise<{ page?: string }>;
}) {
  // ✅ انتظار الـ searchParams
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams.page) || 1;
  
  const from = (currentPage - 1) * ITEMS_PER_PAGE;
  const to = from + ITEMS_PER_PAGE - 1;

  // جلب البيانات
  const { data: properties, error, count } = await supabase
    .from("properties")
    .select("*", { count: "exact" })
    .order("id", { ascending: false })
    .range(from, to);

  if (error) console.error("Error:", error);

  const totalPages = count ? Math.ceil(count / ITEMS_PER_PAGE) : 0;

  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-10 text-center">كافة العقارات</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties?.map((property: any) => {
            let images: string[] = [];
            try {
              images = Array.isArray(property.images) 
                ? property.images 
                : JSON.parse(property.images || "[]");
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <Link
              href={`/properties?page=${currentPage - 1}`}
              className={`px-4 py-2 rounded-xl border ${currentPage <= 1 ? "pointer-events-none opacity-30" : "text-green-600 border-green-200"}`}
            >
              السابق
            </Link>
            <Link
              href={`/properties?page=${currentPage + 1}`}
              className={`px-4 py-2 rounded-xl border ${currentPage >= totalPages ? "pointer-events-none opacity-30" : "text-green-600 border-green-200"}`}
            >
              التالي
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}