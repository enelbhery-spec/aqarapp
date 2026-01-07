"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";

/* ================= SUPABASE ================= */
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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

  useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await supabase
        .from("area_images")
        .select("id, image_url, alt_text")
        .eq("area_slug", areaSlug)
        .order("id", { ascending: true })
        .limit(3); // 👈 جلب 3 فقط من المصدر

      if (!error && data) {
        setImages(data.slice(0, 3)); // 👈 أمان إضافي
      }

      setLoading(false);
    };

    fetchImages();
  }, [areaSlug]);

  /* ================= STATES ================= */
  if (loading) {
    return (
      <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center text-gray-500">
        جاري تحميل الصور...
      </div>
    );
  }

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
          className="relative w-full h-64 rounded-xl overflow-hidden shadow"
        >
          <Image
            src={img.image_url}
            alt={img.alt_text || "صورة من المنطقة"}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
            priority
          />
        </div>
      ))}
    </div>
  );
}
