"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Header from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Image from "next/image";
import { MapPin, Phone, Bath, BedDouble, Ruler } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

// ✅ استيراد Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("id", id)
        .single();

      if (error) console.error("❌ خطأ في جلب بيانات العقار:", error);
      else setProperty(data);

      setLoading(false);
    };

    if (id) fetchProperty();
  }, [id]);

  if (loading)
    return (
      <div className="container py-12">
        <Skeleton className="h-[400px] mb-6" />
        <Skeleton className="h-6 w-1/3 mb-3" />
        <Skeleton className="h-6 w-2/3" />
      </div>
    );

  if (!property)
    return <p className="text-center mt-10">لم يتم العثور على العقار</p>;

  // ✅ تأكد من أن الصور مصفوفة
  const images = (() => {
    try {
      if (typeof property.images === "string") {
        const parsed = JSON.parse(property.images);
        return Array.isArray(parsed) ? parsed : [property.images];
      }
      return Array.isArray(property.images) ? property.images : [];
    } catch {
      return [property.images];
    }
  })();

  const whatsappNumber = property.phone?.replace(/^0/, "+20"); // تعديل الرقم لواتساب الدولي
  const whatsappLink = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=مرحبًا، أنا مهتم بعقار "${property.title}"`
    : "#";

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 container py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* ✅ سلايدر الصور */}
          <div>
            {images.length > 0 ? (
              <Swiper
                modules={[Pagination, Navigation]}
                pagination={{ clickable: true }}
                navigation
                className="rounded-lg"
              >
                {images.map((url: string, index: number) => (
                  <SwiperSlide key={index}>
                    <div className="relative h-72 md:h-96">
                      <Image
                        src={url}
                        alt={`صورة ${index + 1}`}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-500 rounded-lg">
                لا توجد صور
              </div>
            )}
          </div>

          {/* ✅ تفاصيل العقار */}
          <div>
            <h1 className="text-3xl font-bold mb-3">{property.title}</h1>

            <div className="flex items-center text-gray-600 mb-3">
              <MapPin className="w-5 h-5 mr-1" />
              <span>{property.location || "غير محدد"}</span>
            </div>

            <p className="text-xl font-semibold text-blue-600 mb-4">
              {property.price?.toLocaleString()} {property.currency || "ج.م"}
            </p>

            <div className="flex flex-wrap gap-4 text-gray-700 mb-6">
              {property.area && (
                <span className="flex items-center gap-1">
                  <Ruler className="w-4 h-4" /> {property.area} م²
                </span>
              )}
              {property.bedrooms && (
                <span className="flex items-center gap-1">
                  <BedDouble className="w-4 h-4" /> {property.bedrooms} غرف
                </span>
              )}
              {property.bathrooms && (
                <span className="flex items-center gap-1">
                  <Bath className="w-4 h-4" /> {property.bathrooms} حمامات
                </span>
              )}
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">
              {property.description}
            </p>

            {property.city && (
              <p className="text-sm text-gray-500 mb-2">
                المدينة: <strong>{property.city}</strong>
              </p>
            )}
            {property.phone && (
              <p className="text-sm text-gray-500 mb-6 flex items-center gap-2">
                <Phone className="w-4 h-4" /> {property.phone}
              </p>
            )}

            {/* ✅ زر الاتصال عبر واتساب */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-3 rounded-lg">
                اتصل بالمعلن عبر واتساب
              </Button>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
