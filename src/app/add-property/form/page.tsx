"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function PropertyDetails() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const loadProperty = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("❌ خطأ في جلب بيانات العقار:", error);
        setLoading(false);
        return;
      }

      setProperty(data);
      setLoading(false);
    };

    loadProperty();
  }, [id]);

  if (loading) return <p style={{ padding: 20 }}>جارٍ التحميل...</p>;

  if (!property) return <p style={{ padding: 20 }}>لم يتم العثور على العقار</p>;

  return (
    <div style={{ padding: 20, direction: "rtl", textAlign: "right" }}>
      <h1>تفاصيل العقار</h1>

      <h2>{property.title}</h2>
      <p>{property.description}</p>
      <p>السعر: {property.price} جنيه</p>
      <p>المساحة: {property.area} متر</p>

      {/* 🔥 تمت إضافة الموقع هنا */}
      <p>الموقع: {property.location || "غير مسجل"}</p>

      <h3>الصور:</h3>
      {property.images?.length > 0 ? (
        <div style={{ display: "flex", gap: 10 }}>
          {property.images.map((img: string, index: number) => (
            <img
              key={index}
              src={img}
              alt="صورة العقار"
              style={{
                width: 200,
                height: 150,
                objectFit: "cover",
                borderRadius: 8,
              }}
            />
          ))}
        </div>
      ) : (
        <p>لا توجد صور</p>
      )}
    </div>
  );
}
