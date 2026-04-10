"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Head from "next/head"; // استيراد Head للتوثيق

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
    <>
      {/* إضافة كود توثيق جوجل في رأس الصفحة */}
      <head>
        <meta name="google-site-verification" content="X5NXLBDzz2ey6V0B9Jc3B57u6OIGx_g5EaH71jBduho" />
      </head>

      <header
        className={`
          sticky top-0 z-50
          transition-all duration-300
          ${scrolled
            ? "bg-white/90 backdrop-blur shadow-md py-2"
            : "bg-white py-4"}
        `}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

          {/* Logo / Title */}
          <Link
            href="/" 
            className="flex items-center gap-2 group"
          >
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
          </nav>

        </div>
      </header>
    </>
  );
}