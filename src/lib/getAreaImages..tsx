"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";

type Props = {
  areaSlug: string;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AreaImageSlider({ areaSlug }: Props) {
  const [images, setImages] = useState<string[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await supabase
        .from("area_images")
        .select("image_urls")
        .eq("area_slug", areaSlug)
        .single();

      if (error) {
        console.log(error.message);
        return;
      }

      if (data?.image_urls) {
        setImages(data.image_urls);
      }
    };

    fetchImages();
  }, [areaSlug]);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  if (images.length === 0) {
    return (
      <div className="h-[350px] rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400">
        لا توجد صور متاحة
      </div>
    );
  }

  return (
    <div className="relative h-[350px] overflow-hidden rounded-2xl">
      <Image
        src={`https://rkjeobavbxsarxbwmffj.supabase.co/storage/v1/object/public/areas/${images[current]}`}
        alt="صورة المنطقة"
        fill
        className="object-cover"
      />

      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
  key={index}
  onClick={() => setCurrent(index)}
  aria-label={`عرض الصورة ${index + 1}`}
  title={`الصورة ${index + 1}`}
  className={`w-3 h-3 rounded-full ${
    current === index
      ? "bg-white"
      : "bg-white/50"
  }`}
/>
        ))}
      </div>
    </div>
  );
}