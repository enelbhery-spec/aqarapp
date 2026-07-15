import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

// =====================================================================
// 1. توليد وتهيئة وسوم الـ Meta لفيسبوك (Open Graph SEO) لكي يظهر الرابط بشكل مبهر عند النشر
// =====================================================================
export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const params = await props.params;
  const supabase = await createClient();

  const { data: article } = await supabase
    .from("articles")
    .select("*, featured_properties(title, thumbnail, description)")
    .eq("id", params.id)
    .single();

  if (!article) return {};

  const title = article.article_title;
  // تنظيف الوصف من وسوم الـ HTML لعرض نص نظيف في معاينة فيسبوك
  const description = article.article_content 
    ? article.article_content.replace(/<[^>]*>/g, "").substring(0, 150) + "..."
    : "اقرأ المقال الكامل والتفاصيل العقارية لـ م / أحمد البحيري.";
    
  const imageUrl = article.featured_properties?.thumbnail || "/default-share-image.jpg"; // صورة افتراضية في حال عدم وجود صورة للعقار

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      type: "article",
      url: `https://www.trand-aqar.online/articles/${params.id}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [imageUrl],
    },
  };
}

// =====================================================================
// 2. كود الصفحة الرئيسي مع عرض الصورة البارزة للعقار
// =====================================================================
export default async function ArticlePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const supabase = await createClient();

  // جلب المقال مع تفاصيل وصورة العقار المرتبط به
  const { data: article, error } = await supabase
    .from("articles")
    .select("*, featured_properties(*)")
    .eq("id", params.id)
    .single();

  if (error || !article) {
    notFound();
  }

  // تحديد مسار الصورة (نستخدم صورة العقار المرتبط بالمقال)
  const articleImage = article.featured_properties?.thumbnail;

  return (
    <main className="bg-gray-50 min-h-screen py-12 px-4" dir="rtl">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 md:p-12 shadow-sm border border-gray-100">
        
        {/* زر العودة */}
        <Link href="/" className="text-emerald-600 hover:text-emerald-700 font-bold mb-8 inline-flex items-center gap-1">
          ← العودة للرئيسية
        </Link>

        {/* عنوان المقال */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
          {article.article_title}
        </h1>

        {/* 📸 الصورة البارزة للمقال (تظهر داخل الصفحة وتُعرض في فيسبوك) */}
        {articleImage && (
          <div className="w-full h-64 md:h-[400px] relative rounded-2xl overflow-hidden mb-8 shadow-sm border">
            <img 
              src={articleImage} 
              alt={article.article_title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <hr className="my-6 border-gray-100" />

        {/* محتوى المقال */}
        <div 
          className="prose prose-emerald prose-lg max-w-none text-gray-700 leading-relaxed space-y-6 
                     prose-headings:text-gray-800 prose-headings:font-bold prose-p:text-gray-600"
          dangerouslySetInnerHTML={{ __html: article.article_content }}
        />

        {/* كارت ترويجي للعقار المرتبط بالمقال في الأسفل */}
        {article.featured_properties && (
          <div className="mt-12 p-6 bg-emerald-50 rounded-2xl border border-emerald-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h4 className="font-bold text-emerald-950 text-lg">🏠 هل تود معاينة هذا العقار؟</h4>
              <p className="text-emerald-700 text-sm mt-1">
                {article.featured_properties.title}
              </p>
            </div>
            <Link 
              href={`/properties/${article.property_id}`} 
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl transition shadow-sm whitespace-nowrap"
            >
              عرض تفاصيل العقار ←
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}