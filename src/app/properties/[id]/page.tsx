import { createClient } from "@supabase/supabase-js";
import PropertyImageSlider from "@/components/PropertyImageSlider";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Property = {
  id: number;
  title: string;
  price: number;
  location: string;
  description: string;
  type: string;
  area: number;
  rooms: number;
  phone: string;
  images: any;
};

export default async function PropertyDetails({
  params,
}: {
  params: { id: string };
}) {
  const { data: property } = await supabase
    .from("properties")
    .select("*")
    .eq("id", params.id)
    .single<Property>();

  if (!property) {
    return <p className="text-center py-20">العقار غير موجود</p>;
  }

  /* ✅ Normalize images */
  const normalizeImages = (data: any): string[] => {
    if (Array.isArray(data)) return data;

    if (typeof data === "string" && data.trim() !== "") {
      if (data.trim().startsWith("[")) {
        try {
          return JSON.parse(data);
        } catch {
          return [];
        }
      }
      return [data];
    }

    return [];
  };

  const images = normalizeImages(property.images);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* الصور */}
      <div className="mb-8">
        <PropertyImageSlider
          images={images}
          title={property.title}
        />
      </div>

      {/* البيانات */}
      <h1 className="text-3xl font-bold mb-4">{property.title}</h1>

      <p className="text-xl text-green-600 font-semibold mb-2">
        {property.price.toLocaleString()} جنيه
      </p>

      <p className="text-gray-600 mb-4">📍 {property.location}</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="border p-3 rounded">🏠 {property.type}</div>
        <div className="border p-3 rounded">📐 {property.area} م²</div>
        <div className="border p-3 rounded">🛏 {property.rooms} غرف</div>
      </div>

      <p className="leading-relaxed text-gray-700 mb-8">
        {property.description}
      </p>

      {/* التواصل */}
      <div className="flex gap-4">
        <a
          href={`tel:${property.phone}`}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          📞 اتصال
        </a>

        <a
          href={`https://wa.me/${property.phone}`}
          target="_blank"
          className="bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          💬 واتساب
        </a>
      </div>
    </div>
  );
}
