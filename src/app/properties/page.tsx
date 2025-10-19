"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Header from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function PropertiesPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .order("id", { ascending: false });

      if (error) {
        console.error("خطأ في جلب العقارات:", error);
      } else {
        setProperties(data || []);
      }
      setLoading(false);
    };

    fetchProperties();
  }, []);

  if (loading) return <p className="text-center mt-10">جاري التحميل...</p>;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 container py-12">
        <h1 className="text-2xl font-bold mb-6 text-center">جميع العقارات</h1>

        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => {
              // ✅ معالجة الصور بأمان
              let images: string[] = [];
              if (Array.isArray(property.images)) {
                images = property.images;
              } else if (typeof property.images === "string") {
                try {
                  const parsed = JSON.parse(property.images);
                  images = Array.isArray(parsed) ? parsed : [property.images];
                } catch {
                  images = [property.images];
                }
              }

              // ✅ تحديد الصورة الأولى أو صورة افتراضية
              const firstImage =
                images && images.length > 0 && images[0]
                  ? images[0]
                  : "/no-image.png";

              return (
                <div
                  key={property.id}
                  className="border rounded-lg p-4 shadow hover:shadow-lg transition bg-white"
                >
                  <div className="relative w-full h-48 mb-3">
                    {firstImage ? (
                      <Image
                        src={firstImage}
                        alt={property.title || "عقار"}
                        fill
                        className="object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                        لا توجد صورة
                      </div>
                    )}
                  </div>

                  <h2 className="text-lg font-semibold mb-1">
                    {property.title}
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                    {property.description}
                  </p>
                  <p className="font-bold text-blue-600 mb-3">
                    {property.price} {property.currency || "EGP"}
                  </p>

                  {/* ✅ زر عرض التفاصيل */}
                  <Button asChild className="w-full">
                    <Link href={`/properties/${property.id}`}>
                      عرض التفاصيل
                    </Link>
                  </Button>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10">
            لا توجد عقارات حالياً 😔
          </p>
        )}
      </main>

      <Footer />
    </div>
  );
}
