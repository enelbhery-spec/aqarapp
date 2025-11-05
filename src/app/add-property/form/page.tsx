"use client";
export const runtime = 'edge';

import { use, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params); // ✅ هذه هي الطريقة الجديدة في Next.js 15
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const { data, error } = await supabase
          .from("properties")
          .select("*")
          .eq("slug", slug) // ✅ البحث عن العقار بالسلاج
          .maybeSingle(); // لتفادي الأخطاء لو النتيجة فارغة

        if (error) {
          console.error("خطأ في جلب تفاصيل العقار:", error);
          setProperty(null);
        } else {
          setProperty(data);
        }
      } catch (err) {
        console.error("خطأ أثناء الاتصال بقاعدة البيانات:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [slug]);

  if (loading) return <p className="text-center mt-10">جارٍ تحميل التفاصيل...</p>;
  if (!property) return <p className="text-center mt-10">لم يتم العثور على العقار.</p>;

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
      <p className="text-gray-700 mb-2">📍 {property.location}</p>
      <p className="text-xl font-semibold mb-6">
        💰 {property.price} {property.currency}
      </p>

      {property.images?.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {property.images.map((img: string, i: number) => (
            <img
              key={i}
              src={img}
              alt={property.title}
              className="rounded-lg shadow-md object-cover w-full h-64"
            />
          ))}
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-2">الوصف</h2>
        <p>{property.description || "لا يوجد وصف متاح."}</p>
      </div>
    </div>
  );
}
