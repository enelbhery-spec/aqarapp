"use client";

import Link from "next/link";
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
          ? "bg-white/90 backdrop-blur shadow-md"
          : "bg-white"}
      `}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo / Title */}
        <Link
          href="/"
          className="text-2xl font-extrabold text-green-700 hover:text-green-800 transition"
        >
           عقارات حدائق أكتوبر
        </Link>
          <Link href="/videos"> فديوهات العقارات</Link> {/* 👈 أضف السطر ده */}


        {/* Navigation */}
        <nav className="flex gap-6 text-sm font-semibold">





        </nav>
      </div>
    </header>
  );
}
