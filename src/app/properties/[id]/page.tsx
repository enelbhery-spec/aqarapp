"use client";
export const runtime = 'edge';
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Header from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Image from "next/image";
import { MapPin, Phone, Bath, BedDouble, Ruler, Share2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function PropertyDetails() {
  const params = useParams();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("slug", decodeURIComponent(params.id as string))
        .single();

      if (error) console.error("❌ خطأ في جلب بيانات العقار:", error);
      else setProperty(data);

      setLoading(false);
    };

    if (params?.id) fetchProperty();
  }, [params?.id]);

  if (loading)
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="container py-12">
          <Skeleton className="h-10 w-1/2 mb-4" />
          <Skeleton className="h-96 w-full mb-4" />
          <Skeleton className="h-6 w-1/3" />
        </div>
        <Footer />
      </div>
    );

  if (!property)
    return (
      <p className="text-center mt-10 text-red-500">
        لم يتم العثور على تفاصيل العقار.
      </p>
    );

  const images =
    property.images && property.images.length > 0
      ? Array.isArray(property.images)
        ? property.images
        : JSON.parse(property.images)
      : ["/no-image.png"];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: property.title,
          text: "شاهد هذا العقار المميز!",
          url: window.location.href,
        });
      } catch (err) {
        console.error("❌ فشل في المشاركة:", err);
      }
    } else {
      alert("المشاركة غير مدعومة على هذا المتصفح.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="container py-10 max-w-5xl mx-auto">
        {/* ✅ صور العقار - Swiper */}
        <div className="mb-8 rounded-2xl overflow-hidden shadow-lg border border-gray-200">
          <Swiper
            modules={[Pagination, Navigation]}
            pagination={{ clickable: true }}
            navigation
            className="w-full h-[400px]"
          >
            {images.map((img: string, index: number) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-[400px]">
                  <Image
                    src={img}
                    alt={property.title || "عقار"}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ✅ تفاصيل العقار */}
        <h1 className="text-3xl font-bold mb-4 text-gray-900">
          {property.title}
        </h1>

        <div className="flex flex-wrap gap-4 mb-6 text-gray-700">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            <span>{property.location || "غير محدد"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-green-600" />
            <span>{property.area ? `${property.area} م²` : "غير محدد"}</span>
          </div>
          <div className="flex items-center gap-2">
            <BedDouble className="w-5 h-5 text-orange-600" />
            <span>{property.bedrooms || 0} غرف</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="w-5 h-5 text-purple-600" />
            <span>{property.bathrooms || 0} حمام</span>
          </div>
        </div>

        <p className="text-gray-800 leading-relaxed mb-6 text-lg">
          {property.description || "لا يوجد وصف متاح."}
        </p>

        <div className="text-xl font-semibold text-blue-700 mb-8">
          💰 السعر: {property.price || "غير محدد"} {property.currency || "جنيه"}
        </div>

        {/* ✅ أزرار التواصل */}
        <div className="flex flex-wrap gap-4">
          <Button
            asChild
            className="bg-green-600 hover:bg-green-700 text-white px-6"
          >
            <a
              href={`https://wa.me/${
                property.phone || "201000000000"
              }?text=مرحباً، أنا مهتم بعقاركم ${property.title}`}
              target="_blank"
            >
              <Phone className="inline-block mr-2" />
              تواصل عبر واتساب
            </a>
          </Button>

          <Button
            onClick={handleShare}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6"
          >
            <Share2 className="inline-block mr-2" />
            مشاركة
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
