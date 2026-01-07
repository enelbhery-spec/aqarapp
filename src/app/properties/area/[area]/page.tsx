import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function PropertiesPage() {
  const { data: properties, error } = await supabase
    .from("properties")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (error) {
    return <div>حدث خطأ أثناء تحميل العقارات</div>;
  }

  if (!properties || properties.length === 0) {
    return <div>لا توجد عقارات معروضة حاليًا</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {properties.map((property) => {
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
            className="rounded-xl border shadow-sm overflow-hidden bg-white"
          >
            {/* Image */}
            <div className="h-48 w-full bg-gray-200 flex items-center justify-center">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={property.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-gray-400">لا توجد صورة</span>
              )}
            </div>

            <div className="p-4 text-right">
              <h3 className="font-bold text-lg">{property.title}</h3>

              <p className="text-sm text-gray-600">
                {property.location || "غير محدد"}
              </p>

              <p className="text-green-600 font-bold mt-2">
                {property.price?.toLocaleString()} جنيه
              </p>

              <div className="flex gap-2 mt-4">
                <a
                  href={`/properties/${property.id}`}
                  className="flex-1 border border-green-600 text-green-600 text-center py-2 rounded-lg hover:bg-green-50"
                >
                  تفاصيل
                </a>


              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
