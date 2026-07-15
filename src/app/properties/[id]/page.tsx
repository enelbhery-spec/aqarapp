import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import PropertyImagesSlider from "@/components/PropertyImagesSlider";
import { Metadata } from "next";

// 1. دالة مساعدة لجلب بيانات العقار لتجنب تكرار الكود
async function getPropertyData(id: string) {
  const supabase = await createClient();
  const propertyId = parseInt(id);
  if (isNaN(propertyId)) return null;

  let { data: property, error } = await supabase
    .from("featured_properties")
    .select("*")
    .eq("id", propertyId)
    .single();

  if (!property) {
    const { data: generalProperty } = await supabase
      .from("properties")
      .select("*")
      .eq("id", propertyId)
      .single();
    
    property = generalProperty;
  }

  return property;
}

// 2. دالة توليد الـ Metadata ديناميكياً لمحركات البحث (SEO)
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const property = await getPropertyData(id);

  if (!property) {
    return {
      title: "عقار غير موجود | تريند عقار",
    };
  }

  return {
    title: `${property.title} | تريند عقار`,
    // هنا نقوم بوضع حقل الـ meta الجديد، وفي حال كان فارغاً نضع وصفاً احتياطياً تلقائياً من العنوان والسعر لضمان قوة الـ SEO دائماً
    description: property.meta || `${property.title} بسعر ${Number(property.price || 0).toLocaleString()} ج.م. تواصل الآن للمعاينة والتفاصيل عبر منصة تريند عقار.`,
  };
}

// 3. المكون البرمجي للصفحة
export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = await getPropertyData(id);

  if (!property) return notFound();

  // تجهيز الصور
  const images = property.images && Array.isArray(property.images) 
    ? property.images 
    : [property.thumbnail].filter(Boolean);

  // تحضير الـ Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": property.title || "عقار في حدائق أكتوبر",
    // نستخدم الـ meta الجديد أيضاً كـ وصف للـ Schema إذا كان متوفراً
    "description": (property.meta || property.description || "عقار مميز للتواصل المباشر").substring(0, 160),
    "image": images[0] || "",
    "offers": {
      "@type": "Offer",
      "price": property.price || "0",
      "priceCurrency": "EGP",
      "availability": "https://schema.org/InStock",
      "url": `https://trand-aqar.online/properties/${id}`
    }
  };

  return (
    <main className="min-h-screen bg-white pt-24 pb-12" dir="rtl">
      {/* الحل الآمن لإضافة السكريبت في Next.js 15 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-10">
          <PropertyImagesSlider images={images} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
              {property.title}
            </h1>
            
            <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100">
              <h2 className="text-xl font-bold mb-4 text-gray-800">تفاصيل إضافية</h2>
              <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">
                {property.description || "لا يوجد وصف متاح لهذا العقار."}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-emerald-600 p-8 rounded-[2.5rem] text-white shadow-2xl">
              <p className="text-sm opacity-80 mb-2 font-bold">السعر المطلوب</p>
              <h2 className="text-4xl font-black">
                {Number(property.price || 0).toLocaleString()} <span className="text-lg font-normal">ج.م</span>
              </h2>
            </div>

            <a 
              href={`tel:${property.phone}`} 
              className="block w-full text-center bg-gray-900 text-white py-5 rounded-2xl font-bold text-xl hover:bg-black transition-all shadow-lg"
            >
              اتصال هاتفي
            </a>

            <a 
              href={`https://wa.me/${property.phone}`} 
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-emerald-100 text-emerald-700 py-5 rounded-2xl font-bold text-xl hover:bg-emerald-200 transition-all shadow-md flex items-center justify-center gap-2"
            >
              تواصل عبر واتساب
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}