"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/* ================= TYPES ================= */
type AreaImage = {
  id: number;
  image_url: string;
  alt_text: string | null;
};

/* ================= COMPONENT ================= */
export default function AreaImageSlider({
  areaSlug,
}: {
  areaSlug: string;
}) {
  const [images, setImages] = useState<AreaImage[]>([]);
  const [loading, setLoading] = useState(true);

  // رابط الـ Storage العام الخاص بك (Bucket: areas)
  const STORAGE_BASE_URL = "https://rkjeobavbxsarxbwmffj.supabase.co/storage/v1/object/public/areas/hadayek-october";

  useEffect(() => {
    // ✅ بدلاً من طلب البيانات من جدول غير موجود، سنقوم ببناء مسارات الصور مباشرة
    // نظامك يعتمد على وجود صور بأسماء 1, 2, 3 داخل مجلد المنطقة
    const generateImageLinks = () => {
      const folderImages: AreaImage[] = [
        { id: 1, image_url: `${STORAGE_BASE_URL}/${areaSlug}/1.webp`, alt_text: `صورة 1 من ${areaSlug}` },
        { id: 2, image_url: `${STORAGE_BASE_URL}/${areaSlug}/2.webp`, alt_text: `صورة 2 من ${areaSlug}` },
        { id: 3, image_url: `${STORAGE_BASE_URL}/${areaSlug}/3.webp`, alt_text: `صورة 3 من ${areaSlug}` },
      ];

      setImages(folderImages);
      setLoading(false);
    };

    generateImageLinks();
  }, [areaSlug]);

  /* ================= STATES ================= */
  if (loading) {
    return (
      <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center text-gray-500 animate-pulse">
        جاري تحميل الصور...
      </div>
    );
  }

  // ملاحظة: إذا لم تكن الصور موجودة فعلياً في السيرفر، سيتم التعامل معها عبر onError في الأسفل
  if (images.length === 0) {
    return (
      <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center text-gray-500">
        لا توجد صور متاحة للمنطقة حاليًا
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {images.map((img) => (
        <div
          key={img.id}
          className="relative w-full h-64 rounded-xl overflow-hidden shadow-sm bg-gray-50"
        >
          <Image
            src={img.image_url}
            alt={img.alt_text || "صورة من المنطقة"}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-300 hover:scale-105"
            // ✅ حل مشكلة الصور المفقودة: إذا لم يجد ملف الصورة في السيرفر يخفي الإطار الخاص بها
            onError={(e) => {
              (e.target as any).parentElement.style.display = 'none';
            }}
          />
        </div>
      ))}
    </div>
  );
}