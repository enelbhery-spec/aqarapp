"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  images: string[];
  title: string;
};

export default function PropertyImageSlider({ images, title }: Props) {
  const [current, setCurrent] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-[16/9] bg-gray-100 flex items-center justify-center rounded-xl">
        لا توجد صور
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* الصورة الرئيسية */}
      <div className="relative aspect-[9/6] w-full rounded-xl overflow-hidden bg-black">
        <Image
          src={images[current]}
          alt={title}
          fill
          priority
          sizes="(max-width: 400px) 100vw, 80vw"
          className="object-cover"

        />

        {/* أزرار */}
        {images.length > 1 && (
          <>
            <button
              onClick={() =>
                setCurrent((prev) =>
                  prev === 0 ? images.length - 1 : prev - 1
                )
              }
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full"
            >
              ‹
            </button>

            <button
              onClick={() =>
                setCurrent((prev) => (prev + 1) % images.length)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* الصور المصغرة */}
      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`relative w-24 h-16 rounded-lg overflow-hidden border-2 ${
                current === index
                  ? "border-blue-600"
                  : "border-transparent"
              }`}
            >
              <Image
                src={img}
                alt={`${title} ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
