"use client";

import Link from "next/link";
import Image from "next/image"; // استيراد مكون الصور
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`
        sticky top-0 z-50
        transition-all duration-300
        ${scrolled
          ? "bg-white/90 backdrop-blur shadow-md py-2" // تقليل الحجم عند السكرول
          : "bg-white py-4"}
      `}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

        {/* Logo / Title - التعديل هنا ليرجع للرئيسية */}
        <Link
          href="/" 
          className="flex items-center gap-2 group"
        >
          {/* عرض الأيقونة من مجلد public */}
          <Image 
            src="/icon.png" 
            alt="Logo" 
            width={35} 
            height={35} 
            className="rounded-lg shadow-sm group-hover:scale-105 transition-transform"
          />
          <span className="text-2xl font-extrabold text-green-700 group-hover:text-green-800 transition">
             trand aqar
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          <Link 
            href="/videos" 
            className="text-gray-700 hover:text-green-600 font-bold transition-colors border-b-2 border-transparent hover:border-green-600 pb-1"
          >
             فيديوهات العقارات
          </Link>
          
          {/* يمكنك إضافة روابط أخرى هنا لاحقاً */}
        </nav>

      </div>
    </header>
  );
}