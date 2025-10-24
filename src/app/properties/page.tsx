"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Header from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
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
      const { data, error } = await supabase.from("properties").select("*");
      if (error) console.error("خطأ في جلب العقارات:", error);
      else setProperties(data);
      setLoading(false);
    };
    fetchProperties();
  }, []);

  if (loading) return <p className="text-center mt-10">جارٍ تحميل العقارات...</p>;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="container py-12 grid md:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div key={property.id} className="bg-white shadow rounded-lg p-4">
            <div className="relative w-full h-48 mb-3">
              <Image
                src={
                  property.images && property.images.length > 0
                    ? Array.isArray(property.images)
                      ? property.images[0]
                      : JSON.parse(property.images)[0]
                    : "/no-image.png"
                }
                alt={property.title || "عقار"}
                fill
                className="object-cover rounded-lg"
              />
            </div>

            <h2 className="text-lg font-bold mb-2">{property.title}</h2>
            <p className="text-blue-600 font-semibold mb-2">
              💰 {property.price} {property.currency || "جنيه"}
            </p>

            <Link
              href={`/properties/${property.slug}`}
              className="block bg-gray-800 text-white text-center py-2 rounded-lg hover:bg-gray-700 transition"
            >
              عرض التفاصيل
            </Link>
          </div>
        ))}
      </main>

      <Footer />
    </div>
  );
}
