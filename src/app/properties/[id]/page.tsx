import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import PropertyImagesSlider from "@/components/PropertyImagesSlider";

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  // 1. فك تشفير المعرف (ID) من الرابط
  const { id } = await params;
  const supabase = await createClient();

  // 2. تحويل المعرف لرقم صحيح لمطابقة الداتابيز
  const propertyId = parseInt(id);
  if (isNaN(propertyId)) return notFound();

  // --- 🚀 الخطوة الجديدة: البحث في الجدولين ---
  
  // أولاً: محاولة جلب البيانات من جدول العقارات المميزة (عقاراتك اليدوية)
  let { data: property, error } = await supabase
    .from("featured_properties")
    .select("*")
    .eq("id", propertyId)
    .single();

  // ثانياً: إذا لم يجد العقار في المميزة، ابحث في الجدول العام (إكسل)
  if (!property) {
    const { data: generalProperty, error: generalError } = await supabase
      .from("properties")
      .select("*")
      .eq("id", propertyId)
      .single();
    
    property = generalProperty;
    error = generalError;
  }

  // إذا لم يوجد في أي من الجدولين
  if (error || !property) return notFound();

  // 4. تجهيز مصفوفة الصور للعرض في السلايدر
  const images = property.images && Array.isArray(property.images) 
    ? property.images 
    : [property.thumbnail].filter(Boolean);

  return (
    <main className="min-h-screen bg-white pt-24 pb-12" dir="rtl">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* عرض الصور باستخدام السلايدر التفاعلي */}
        <div className="mb-10">
          <PropertyImagesSlider images={images} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
              {property.title}
            </h1>
            
            {/* عرض وصف العقار بدقة */}
            <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100">
              <h2 className="text-xl font-bold mb-4 text-gray-800">تفاصيل إضافية</h2>
              <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">
                {property.description || "لا يوجد وصف متاح لهذا العقار."}
              </p>
            </div>
          </div>

          {/* قسم السعر وأزرار التواصل الديناميكية */}
          <div className="space-y-6">
            <div className="bg-emerald-600 p-8 rounded-[2.5rem] text-white shadow-2xl">
              <p className="text-sm opacity-80 mb-2 font-bold">السعر المطلوب</p>
              <h2 className="text-4xl font-black">
                {property.price?.toLocaleString()} <span className="text-lg font-normal">ج.م</span>
              </h2>
            </div>

            {/* زر الاتصال: يستخدم الحقل phone من الداتابيز مباشرة */}
            <a 
              href={`tel:${property.phone}`} 
              className="block w-full text-center bg-gray-900 text-white py-5 rounded-2xl font-bold text-xl hover:bg-black transition-all shadow-lg"
            >
              اتصال هاتفي
            </a>

            {/* زر الواتساب: يستخدم الحقل phone من الداتابيز لضمان التغيير لكل عقار */}
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