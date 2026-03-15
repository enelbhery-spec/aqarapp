import { notFound } from "next/navigation";
import Link from "next/link";
import { readFile } from "fs/promises";
import path from "path";

/* ================== قراءة جميع العقارات ================== */
async function getAllProperties() {
  const filePath = path.join(process.cwd(), "public", "data1.json");
  const file = await readFile(filePath, "utf8");
  const rawData = JSON.parse(file);
  return rawData.data || rawData;
}

/* ================== توليد الصفحات تلقائيًا ================== */
export async function generateStaticParams() {
  const allProperties = await getAllProperties();

  const uniqueSlugs = new Set<string>();

  allProperties.forEach((item: any) => {
    const locationSlug = item.location?.slug || "";
    const lastPart = locationSlug.split("/").pop();
    if (lastPart) uniqueSlugs.add(lastPart);
  });

  return Array.from(uniqueSlugs).map((slug) => ({
    slug,
  }));
}

/* ================== صفحة تفاصيل المنطقة ================== */
export default async function AreaPropertiesDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const allProperties = await getAllProperties();

  const properties = allProperties
    .filter((item: any) => {
      const locationSlug = item.location?.slug?.toLowerCase() || "";
      const lastPart = locationSlug.split("/").pop();
      return lastPart === slug.toLowerCase();
    })
    .map((item: any) => {
      /* ===== استخراج الصورة ===== */
      const imageRaw =
        item.image ||
        item.thumbnail ||
        item.main_photo?.thumbnails?.large ||
        item.main_photo?.thumbnails?.medium ||
        item.main_photo?.thumbnails?.small ||
        item.photos?.[0]?.url ||
        item.images?.[0]?.url ||
        "";

      const image = imageRaw
        ? imageRaw.startsWith("http")
          ? imageRaw
          : "https:" + imageRaw
        : "/no-image.png";

      /* ===== استخراج القيم ===== */
      const bedrooms =
        item.bedrooms ||
        item.rooms ||
        item.room_count ||
        item.details?.bedrooms ||
        "-";

      const bathrooms =
        item.bathrooms ||
        item.baths ||
        item.bathroom_count ||
        item.details?.bathrooms ||
        "-";

      const phone =
        item.phone ||
        item.contact?.phone ||
        item.user?.phone_number ||
        "";

      return {
        id: item.id,
        title: item.title || "بدون عنوان",
        description: item.description || "",
        price: item.price || 0,
        area: item.area || item.size || "-",
        bedrooms,
        bathrooms,
        floor: item.floor || "-",
        condition: item.condition || "-",
        phone: phone.replace("+20", ""),
        property_type: item.section?.title || item.type || "",
        locationTitle: item.location?.title || "",
        image,
      };
    });

  if (properties.length === 0) return notFound();

  return (
    <main className="bg-gray-50 text-gray-800 py-12">
      <section className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">
          العقارات المتاحة في {properties[0].locationTitle}
        </h1>
      </section>

      <div className="max-w-6xl mx-auto space-y-6 px-4">
        {properties.map((property: any) => (
          <div
            key={property.id}
            className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row gap-6"
          >
            {/* الصورة */}
            <div className="md:w-1/3">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-56 object-cover rounded-lg"
              />
            </div>

            {/* البيانات */}
            <div className="flex-1">
              <h3 className="font-bold text-xl mb-3">
                {property.title}
              </h3>

              {property.description && (
                <p className="text-gray-600 mb-4 whitespace-pre-line line-clamp-3">
                  {property.description}
                </p>
              )}

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
                <li>🏠 النوع: {property.property_type || "-"}</li>
                <li>📐 المساحة: {property.area} م²</li>
                <li>🛏 غرف النوم: {property.bedrooms}</li>
                <li>🚿 الحمامات: {property.bathrooms}</li>
                <li>🏢 الدور: {property.floor}</li>
                <li>🧱 الحالة: {property.condition}</li>
              </ul>

              <p className="text-green-600 font-bold text-lg mt-4">
                {Number(property.price).toLocaleString("ar-EG")} جنيه
              </p>

              {property.phone && (
                <a
                  href={`https://wa.me/2${property.phone}`}
                  target="_blank"
                  className="inline-block mt-4 bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 transition"
                >
                  📞 تواصل واتساب
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          href="/areas"
          className="text-green-600 font-semibold"
        >
          ← الرجوع للمناطق
        </Link>
      </div>
    </main>
  );
}
