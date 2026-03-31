"use client";

import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function PropertyImagesSlider({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // دالة لإصلاح الروابط
  const fixUrl = (url: string) => {
    if (!url) return "https://via.placeholder.com/800x600";
    if (url.includes("/storage/v1/object/public/")) return url;
    return url.replace(".co/", ".co/storage/v1/object/public/");
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="relative group w-full aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl bg-gray-100">
      {/* الصورة المعروضة */}
      <img
        src={fixUrl(images[currentIndex])}
        alt={`Property image ${currentIndex + 1}`}
        className="w-full h-full object-cover transition-all duration-500"
      />

      {/* الأسهم - تظهر فقط عند وجود أكثر من صورة */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 text-gray-800"
          >
            <ChevronLeft size={30} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 text-gray-800"
          >
            <ChevronRight size={30} />
          </button>
        </>
      )}

      {/* مؤشر الأرقام في الأسفل */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-2 transition-all rounded-full ${
              currentIndex === index ? "w-8 bg-emerald-500" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}