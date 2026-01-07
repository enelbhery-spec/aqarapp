import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function PropertyDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const { data: property, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .eq("status", "approved")
    .single();

  if (error || !property) return notFound();

  return (
    <main className="bg-gray-50 text-gray-800 min-h-screen">
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl bg-white rounded-xl shadow p-8">

          {/* ===== العنوان ===== */}
          <h1 className="text-3xl font-bold mb-4">
            {property.title}
          </h1>

          {/* ===== السعر ===== */}
          <p className="text-green-600 text-2xl font-bold mb-6">
            {Number(property.price).toLocaleString()} جنيه
          </p>

          {/* ===== التفاصيل ===== */}
          <ul className="space-y-3 text-lg">
            <li>📍 المنطقة: {property.area_name || property.area_slug}</li>
            <li>🏠 النوع: {property.type}</li>
            <li>📐 المساحة: {property.area} م²</li>
            <li>🛏 عدد الغرف: {property.rooms}</li>
            <li>🚿 الحمامات: {property.bathrooms}</li>
            <li>🏢 الدور: {property.floor}</li>
            <li>📅 تاريخ الإضافة: {new Date(property.created_at).toLocaleDateString("ar-EG")}</li>
          </ul>

          {/* ===== الوصف ===== */}
          {property.description && (
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-2">وصف العقار</h2>
              <p className="text-gray-700 leading-relaxed">
                {property.description}
              </p>
            </div>
          )}

          {/* ===== زر التواصل ===== */}
          <a
            href={`https://wa.me/201021732703?text=مهتم بعقار: ${property.title}`}
            target="_blank"
            className="block mt-8 bg-green-600 text-white text-center py-4 rounded-lg text-lg font-bold"
          >
            📞 تواصل واتساب
          </a>

        </div>
      </section>
    </main>
  );
}
