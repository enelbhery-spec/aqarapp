import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

/* ================== SUPABASE ================== */
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/* ================== PAGE ================== */
export default async function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  /* ===== جلب بيانات العقار ===== */
  const { data: property, error } = await supabase
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
      area_slug,
      "property _ type"
    `)
    .eq("id", id)
    .eq("status", "approved")
    .single();

  if (error || !property) {
    console.error(error);
    return notFound();
  }

  return (
    <main className="bg-gray-50 text-gray-800 py-12">

      {/* ===== HEADER ===== */}
      <section className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">
          {property.title}
        </h1>
        <p className="text-gray-600">
          تفاصيل العقار
        </p>
      </section>

      {/* ===== CONTENT ===== */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6 space-y-6">

        {property.description && (
          <p className="text-gray-700 leading-relaxed">
            {property.description}
          </p>
        )}

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
          <li>🏠 النوع: {property["property _ type"]}</li>
          <li>📐 المساحة: {property.area} م²</li>
          <li>🛏 غرف النوم: {property.bedrooms}</li>
          <li>🚿 الحمامات: {property.bathrooms}</li>
          <li>🏢 الدور: {property.floor}</li>
          <li>🧱 الحالة: {property.condition}</li>
        </ul>

        <p className="text-green-600 font-bold text-2xl">
          {Number(property.price).toLocaleString()} {property.currency}
        </p>

        {property.phone && (
          <a
            href={`https://wa.me/2${property.phone}?text=مهتم بعقار: ${property.title}`}
            target="_blank"
            className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition"
          >
            تواصل واتساب
          </a>
        )}
      </div>

      {/* ===== BACK ===== */}
      <div className="text-center mt-10">
        <Link
          href={`/areas/${property.area_slug}`}
          className="text-green-600 font-semibold"
        >
          ← الرجوع لصفحة المنطقة
        </Link>
      </div>

    </main>
  );
}
