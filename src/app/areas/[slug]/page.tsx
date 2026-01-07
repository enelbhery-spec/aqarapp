import { notFound } from "next/navigation";
import { hadayekOctoberAreas } from "@/data/hadayekOctoberAreas";
import Link from "next/link";
import AreaImageSlider from "@/components/AreaImageSlider";


/* ================== TYPES ================== */
type Area = {
  name: string;
  slug: string;
  description?: string;
  avgPrice?: string;
  services?: string[];
  mapQuery?: string;
};

/* ================== PAGE ================== */
import { notFound } from "next/navigation";
import { hadayekOctoberAreas } from "@/data/hadayekOctoberAreas";
import type { Area } from "@/types/area";

export default function AreaPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  // 🔍 البحث عن المنطقة
  const selectedArea =
    hadayekOctoberAreas
      .flatMap((group) => group.areas)
      .find((area) => area.slug === slug) || null;

  if (!selectedArea) {
    notFound();
  }

  return (
    <main className="bg-gray-50 text-gray-800 min-h-screen">
      <section className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">
          {selectedArea.name}
        </h1>

        <p className="text-gray-600 leading-relaxed">
          {selectedArea.description}
        </p>
      </section>
    </main>
  );
}

      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-bl from-green-600 via-green-500 to-emerald-500 text-white py-16">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">
            {selectedArea.name}
          </h1>
          <p className="opacity-90">
            دليل شامل عن المنطقة – أسعار – مميزات – عيوب – خدمات
          </p>
        </div>
      </section>

      {/* ================= IMAGES (Supabase فقط) ================= */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold mb-4">صور من المنطقة</h2>
          <AreaImageSlider areaSlug={selectedArea.slug} />
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* ===== MAIN INFO ===== */}
          <div className="md:col-span-2 bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">عن المنطقة</h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              {selectedArea.description ??
                "منطقة سكنية واعدة داخل حدائق أكتوبر، تتميز بتنوع الإسكان وقربها من الخدمات والمحاور الرئيسية، وتناسب السكن والاستثمار."}
            </p>

            <h3 className="font-bold mb-3">متوسط الأسعار</h3>
            <p className="text-gray-700 mb-6">
              {selectedArea.avgPrice ?? "متغير بالنسبة لكل منطقة"}
            </p>

            <h3 className="font-bold mb-3">الخدمات المتوفرة</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {(selectedArea.services ?? [
                "مدارس",
                "مواصلات",
                "صيدليات",
                "محلات تجارية",
              ]).map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>

          {/* ===== SIDEBAR ===== */}
          <aside className="bg-white rounded-xl shadow p-6 h-fit">
            <h3 className="font-bold mb-4">هل المنطقة مناسبة لك؟</h3>

            <ul className="text-sm text-gray-600 space-y-2 mb-6">
              <li>✔ مناسبة للسكن العائلي</li>
              <li>✔ أسعار أقل من 6 أكتوبر</li>
              <li>✔ فرصة استثمارية مستقبلية</li>
            </ul>

            <a
              href={`https://wa.me/201021732703?text=استفسار عن ${selectedArea.name}`}
              className="block text-center bg-green-600 text-white rounded-lg py-3 font-bold hover:bg-green-700 transition"
            >
              اسأل عن المنطقة على واتساب
            </a>

            <Link
              href="/"
              className="block text-center mt-4 text-green-600 font-semibold"
            >
              ← العودة للرئيسية
            </Link>
          </aside>

        </div>
      </section>

      {/* ================= MAP ================= */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-xl font-bold mb-4">موقع المنطقة على الخريطة</h2>

          <iframe
            className="w-full h-96 rounded-xl border"
            loading="lazy"
            src={`https://www.google.com/maps?q=${
              selectedArea.mapQuery || selectedArea.name + " حدائق أكتوبر"
            }&output=embed`}
          />
        </div>
      </section>
      {/* ================= VIEW PROPERTIES BUTTON ================= */}
<section className="py-12 text-center bg-white">
  <h2 className="text-2xl font-bold mb-4">
    عايز تشوف العقارات المتاحة في {selectedArea.name}؟
  </h2>

  <p className="text-gray-600 mb-6">
    استعرض كل العقارات المتوفرة حاليًا داخل المنطقة مع التفاصيل الكاملة
  </p>

  <Link
  href={`/areas/${selectedArea.slug}/details`}
  className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold"
>
  عرض العقارات المتاحة
</Link>


</section>


      {/* ================= CTA ================= */}
      <section className="py-12 text-center">
        <h2 className="text-2xl font-bold mb-3">
          محتاج ترشيح أدق؟
        </h2>
        <p className="text-gray-600 mb-6">
          قولي ميزانيتك ونوع السكن وهنرشح لك الأنسب
        </p>
        <a
          href="https://wa.me/201021732703"
          className="bg-green-600 text-white px-8 py-3 rounded-full font-bold"
        >
          تواصل الآن
        </a>
      </section>

    </main>
  );
}
