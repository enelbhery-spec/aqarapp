import Link from "next/link";
import AreaImageSlider from "@/components/AreaImageSlider";

type Area = {
  name: string;
  slug: string;
  description?: string;
  avgPrice?: string;
  services?: string[];
  mapQuery?: string;

  // ✅ صور المنطقة
  images?: {
    image_url: string;
  }[];
};

type Props = {
  area: Area;
  similarAreas?: Area[];
};

export default function AreaTemplate({
  area,
  similarAreas,
}: Props) {

  const getMapUrl = () => {
    const query = area.mapQuery || `${area.name} حدائق أكتوبر`;

    return `https://www.google.com/maps?q=${encodeURIComponent(
      query
    )}&output=embed`;
  };

  return (
    <main className="bg-gray-50 text-gray-800 min-h-screen">

      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-bl from-green-600 via-green-500 to-emerald-500 text-white py-16">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">
            {area.name}
          </h1>

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

            <h2 className="text-2xl font-bold">
              صور من قلب المنطقة
            </h2>
          </div>

          {/* ✅ صور من الداتابيز */}
          {area.images && area.images.length > 0 ? (

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {area.images.map((img, index) => (

                <div
                  key={index}
                  className="overflow-hidden rounded-2xl shadow-sm border bg-white"
                >
                  <img
                    src={img.image_url}
                    alt={area.name}
                    className="w-full h-[300px] object-cover hover:scale-105 transition duration-500"
                  />
                </div>

              ))}

            </div>

          ) : (

            <div className="bg-white p-4 rounded-2xl shadow-sm border">
              <AreaImageSlider areaSlug={area.slug} />
            </div>

          )}

        </div>
      </section>

      {/* ================= DESCRIPTION ================= */}
      {area.description && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">

            <h2 className="text-2xl font-bold mb-4">
              📍 عن المنطقة
            </h2>

            <p className="leading-8 text-gray-700">
              {area.description}
            </p>

          </div>
        </section>
      )}

      {/* ================= PRICE ================= */}
      {area.avgPrice && (
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-3xl">

            <div className="bg-green-50 border border-green-200 p-6 rounded-2xl text-center">

              <h2 className="text-xl font-bold mb-2">
                💰 متوسط الأسعار
              </h2>

              <p className="text-2xl font-bold text-green-600">
                {area.avgPrice}
              </p>

            </div>

          </div>
        </section>
      )}

      {/* ================= SERVICES ================= */}
      {area.services && area.services.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">

            <h2 className="text-2xl font-bold mb-6">
              🏫 الخدمات المتوفرة
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

              {area.services.map((service, index) => (

                <div
                  key={index}
                  className="bg-gray-50 border p-4 rounded-xl text-center hover:shadow transition"
                >
                  {service}
                </div>

              ))}

            </div>

          </div>
        </section>
      )}

      {/* ================= MAP ================= */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-5xl">

          <h2 className="text-2xl font-bold mb-6">
            🗺️ موقع المنطقة
          </h2>

          <div className="rounded-2xl overflow-hidden border shadow-sm">

            <iframe
              src={getMapUrl()}
              width="100%"
              height="400"
              loading="lazy"
            ></iframe>

          </div>

        </div>
      </section>

      {/* ================= SIMILAR AREAS ================= */}
      {similarAreas && similarAreas.length > 0 && (
        <section className="py-12 bg-white">

          <div className="container mx-auto px-4 max-w-5xl">

            <h2 className="text-2xl font-bold mb-6">
              🏘️ مناطق مشابهة
            </h2>

            <div className="grid md:grid-cols-3 gap-6">

              {similarAreas.map((item) => (

                <Link
                  key={item.slug}
                  href={`/areas/${item.slug}`}
                  className="bg-gray-50 border rounded-2xl p-5 hover:shadow-md transition"
                >
                  <h3 className="font-bold text-lg mb-2">
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-600 line-clamp-3">
                    {item.description || "اضغط لمعرفة التفاصيل"}
                  </p>
                </Link>

              ))}

            </div>

          </div>

        </section>
      )}

    </main>
  );
}