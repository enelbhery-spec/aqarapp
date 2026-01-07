import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { hadayekOctoberAreas } from "@/data/hadayekOctoberAreas";
import Link from "next/link";

/* ================== SUPABASE ================== */
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function AreaPropertiesDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  /* ===== جلب بيانات المنطقة ===== */
  let selectedArea: any = null;

  hadayekOctoberAreas.forEach((group) => {
    const found = group.areas.find((a) => a.slug === slug);
    if (found) selectedArea = found;
  });

  if (!selectedArea) return notFound();

  /* ===== جلب عقارات المنطقة (بدون صور) ===== */
  const { data: properties, error } = await supabase
    .from("properties")
    .select(`
      id,
      title,
      description,
      price,
      currency,
      area,
      bedrooms,
      bathrooms,
      floor,
      condition,
      phone,
      status,
      "property _ type"
    `)
    .eq("status", "approved")
    .eq("area_slug", slug)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
  }

  return (
    <main className="bg-gray-50 text-gray-800 py-12">

      {/* ===== HEADER ===== */}
      <section className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">
          العقارات المتاحة في {selectedArea.name}
        </h1>
        <p className="text-gray-600">
          تفاصيل كاملة بدون صور – تواصل مباشر
        </p>
      </section>

      {/* ===== NO DATA ===== */}
      {(!properties || properties.length === 0) && (
        <p className="text-center text-gray-500">
          لا توجد عقارات متاحة حاليًا في هذه المنطقة
        </p>
      )}

      {/* ===== PROPERTIES LIST ===== */}
      <div className="max-w-5xl mx-auto space-y-6 px-4">
        {properties?.map((property) => (
          <div
            key={property.id}
            className="bg-white rounded-xl shadow p-6"
          >
            <h3 className="font-bold text-xl mb-3">
              {property.title}
            </h3>

            {property.description && (
              <p className="text-gray-600 mb-4">
                {property.description}
              </p>
            )}

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
              <li>🏠 النوع: {property["property _ type"]}</li>
              <li>📐 المساحة: {property.area} م²</li>
              <li>🛏 غرف النوم: {property.bedrooms}</li>
              <li>🚿 الحمامات: {property.bathrooms}</li>
              <li>🏢 الدور: {property.floor}</li>
              <li>🧱 الحالة: {property.condition}</li>
            </ul>

            <p className="text-green-600 font-bold text-lg mt-4">
              {Number(property.price).toLocaleString()} {property.currency}
            </p>

            {property.phone && (
              <a
                href={`https://wa.me/2${property.phone}?text=مهتم بعقار: ${property.title} - ${selectedArea.name}`}
                target="_blank"
                className="inline-block mt-4 bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 transition"
              >
                تواصل واتساب
              </a>
            )}
          </div>
        ))}
      </div>

      {/* ===== BACK ===== */}
      <div className="text-center mt-10">
        <Link
          href={`/areas/${slug}`}
          className="text-green-600 font-semibold"
        >
          ← الرجوع لصفحة المنطقة
        </Link>
      </div>

    </main>
  );
}
