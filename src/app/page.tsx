import { createClient } from "@supabase/supabase-js";
import Image from "next/image";


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);


export default async function Home() {
    const { data: properties } = await supabase
  .from("properties")
  .select("id, title, price, location, images")
  .eq("status", "approved")
  .order("created_at", { ascending: false })
  .limit(6);

  return (
    <main className="bg-gray-50 text-gray-800">

      {/* ================= HERO SECTION ================= */}
<section className="bg-green-600 text-white py-20">
  <div className="max-w-7xl mx-auto px-6 text-center">

    {/* Title */}
    <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
      وسيط عقاري أكتوبر
    </h1>

    <p className="text-green-100 text-lg mb-8">
      منصة بسيطة تجمع بين الملاك والمشترين داخل نطاق مدينة 6 أكتوبر
         </p>

    {/* Buttons */}
    <div className="flex justify-center gap-4 flex-wrap mb-10">
      <a
        href="/property_requests"
        className="bg-green-800 text-white px-7 py-3 rounded-xl font-bold hover:bg-green-900 transition"
      >
        🔍 اطلب عقارك
      </a>

      <a
        href="/add-property"
        className="bg-white text-green-700 px-7 py-3 rounded-xl font-bold hover:bg-white-100 transition"
      >
        ➕ أضف عقارك
      </a>
    </div>

    {/* How it works */}
    <div className="max-w-xl mx-auto bg-white/10 backdrop-blur rounded-2xl p-6 text-right">
      <h3 className="font-bold text-lg mb-4 text-center">
        كيف يعمل الموقع؟
      </h3>

      <ul className="space-y-2 text-sm text-white-50">
        <li>✔ اخنار عقارك المناسب</li>
        <li>✔ اضغط لمعرفة التقاصيل</li>
        <li>✔  التواصل على الواتساب</li>
        <li>✔ سيتم الرد عليك فورًا</li>
      </ul>
    </div>

    {/* Badges */}
    <div className="mt-10 flex justify-center flex-wrap gap-3 text-sm">
      {[
        "متخصص أكتوبر فقط",
        "بيانات مباشرة",
        "بدون تسجيل",
        "تواصل فوري",
      ].map((item, i) => (
        <span
          key={i}
          className="bg-white/15 px-4 py-2 rounded-full font-semibold"
        >
          {item}
        </span>
      ))}
    </div>

  </div>
</section>


      {/* ================= LISTED PROPERTIES ================= */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-green-700 mb-3">
              العقارات المعروضة
            </h2>
            <p className="text-gray-600">
              بعض العقارات المتاحة حاليًا داخل مدينة 6 أكتوبر
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {properties?.map((property) => {
              let imageUrl: string | null = null;

              try {
                const imagesArray = Array.isArray(property.images)
                  ? property.images
                  : JSON.parse(property.images || "[]");

                imageUrl = imagesArray[0] || null;
              } catch {
                imageUrl = null;
              }

              return (
                <div
                  key={property.id}
                  className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative h-48 w-full bg-gray-200">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={property.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        لا توجد صورة
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 text-right">
                    <h3 className="font-bold text-lg mb-1">
                      {property.title}
                    </h3>

                    <p className="text-sm text-gray-600 mb-2">
                      📍 {property.location || "غير محدد"}
                    </p>

                    <p className="text-green-700 font-extrabold mb-4">
                      {property.price?.toLocaleString()} جنيه
                    </p>

                    <a
                      href={`/properties/${property.id}`}
                      className="block text-center border border-green-600 text-green-600 py-2 rounded-xl font-semibold hover:bg-green-50"
                    >
                      تفاصيل
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-14">
            <a
              href="/properties"
              className="inline-block bg-green-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-green-700 transition"
            >
              تصفح كل العقارات
            </a>
          </div>

        </div>
      </section>
    </main>
  );
}





