import Link from "next/link";
import AreaImageSlider from "@/components/AreaImageSlider";

type Property = {
  id: string;
  title: string;
  price: string;
  image_url?: string;
};

type Area = {
  name: string;
  slug: string;
  description?: string;
  avgPrice?: string;
  services?: string[];
  mapQuery?: string;
  images?: { image_url: string }[];
  properties?: Property[];
};

type Props = {
  area: Area;
  similarAreas?: Area[];
};

export default function AreaTemplate({ area, similarAreas }: Props) {
  const getMapUrl = () => {
    const query = area.mapQuery || `${area.name} حدائق أكتوبر`;
    // ملاحظة: تأكد من إصلاح رابط الخريطة إذا كان يحتاج إلى مفتاح API أو تنسيق مختلف
    return `https://www.google.com/maps/embed/v1/search?key=YOUR_API_KEY&q=${encodeURIComponent(query)}`;
  };

  return (
    <main className="bg-gray-50 text-gray-800 min-h-screen">
      {/* HERO */}
      <section className="bg-gradient-to-bl from-green-600 via-green-500 to-emerald-500 text-white py-16">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">{area.name}</h1>
          <p className="opacity-90 text-lg">دليل شامل عن المنطقة – أسعار – مميزات – عيوب – خدمات</p>
        </div>
      </section>

      {/* IMAGES */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">📸 صور من قلب المنطقة</h2>
          {area.images && area.images.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {area.images.map((img, index) => (
                <div key={index} className="overflow-hidden rounded-2xl shadow-sm border bg-white">
                  <img src={img.image_url} alt={area.name} className="w-full h-[300px] object-cover hover:scale-105 transition duration-500" />
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

      {/* ✅ قسم العقارات */}
      {area.properties && area.properties.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl font-bold mb-6">🏠 عقارات متاحة في {area.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {area.properties.map((prop) => (
                <Link 
                  href={`/properties/${prop.id}`} 
                  key={prop.id}
                  className="block border rounded-2xl overflow-hidden hover:shadow-lg transition bg-white"
                >
                  {prop.image_url && (
                    <img 
                      src={prop.image_url} 
                      alt={prop.title} 
                      className="w-full h-48 object-cover" 
                    />
                  )}
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{prop.title}</h3>
                    <p className="text-green-600 font-semibold">{prop.price} ج.م</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* DESCRIPTION */}
      {area.description && (
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl font-bold mb-4">📍 عن المنطقة</h2>
            <p className="leading-8 text-gray-700">{area.description}</p>
          </div>
        </section>
      )}
      
      {/* باقي الأقسام هنا ... */}
    </main>
  );
}