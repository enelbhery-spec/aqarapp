import Link from "next/link";
import AreaImageSlider from "@/components/AreaImageSlider";

type Area = {
  name: string;
  slug: string;
  description?: string;
  avgPrice?: string;
  services?: string[];
  mapQuery?: string;
};

type Props = {
  area: Area;
  similarAreas?: Area[];
  images?: string[]; // ✅ خليه اختياري
}; // ✅ قفل الـ type هنا بشكل صحيح

export default function AreaTemplate({ area, similarAreas }: Props) {

  // ✅ تحسين رابط الخريطة
  const getMapUrl = () => {
    const query = area.mapQuery || `${area.name} حدائق أكتوبر`;
    return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
  };

  return (
    <main className="bg-gray-50 text-gray-800 min-h-screen">

      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-bl from-green-600 via-green-500 to-emerald-500 text-white py-16">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">{area.name}</h1>
          <p className="opacity-90 text-lg">
            دليل شامل عن المنطقة – أسعار – مميزات – عيوب – خدمات
          </p>
        </div>
      </section>

      {/* ================= IMAGES ================= */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl">📸</span>
            <h2 className="text-2xl font-bold text-gray-800">
              صور من قلب المنطقة
            </h2>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <AreaImageSlider areaSlug={area.slug} />
          </div>
        </div>
      </section>

      {/* باقي الكود زي ما هو بدون تغيير */}
    </main>
  );
}