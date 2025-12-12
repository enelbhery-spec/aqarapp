"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AdvancedSearchForm } from "@/components/advanced-search-form";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function HomePage() {
  const [latest, setLatest] = useState<any[]>([]);
  const [featured, setFeatured] = useState<any[]>([]);

  useEffect(() => {
    fetchLatest();
    fetchFeatured();
  }, []);

  // دالة البحث التي ترسل البيانات من نموذج البحث
  const handleSearch = (data: any) => {
    console.log("Searching with:", data);

    // إعادة توجيه لصفحة نتائج البحث
    window.location.href = `/properties?property_type=${data.property_type || ""}&location=${data.location || ""}`;
  };

  // 🏠 أحدث العقارات
  const fetchLatest = async () => {
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(6);

    if (!error && data) setLatest(data);
  };

  // ⭐ العقارات المميزة (الأعلى سعرًا)
  const fetchFeatured = async () => {
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .order("price", { ascending: false })
      .limit(3);

    if (!error && data) setFeatured(data);
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <Header />

      <main className="flex-1 py-12 md:py-20">
        <div className="container text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">
            عقارات  أكتوبر Online
          </h1>

          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            اكتشف أحدث العقارات والفرص المميزة في حدائق أكتوبر.
          </p>

          {/* نموذج البحث مع تمرير الدالة */}
          <div className="mt-10 max-w-4xl mx-auto">
            <AdvancedSearchForm onSearch={handleSearch} />
          </div>

          <div className="mt-10">
            <Link
              href="/properties"
              className="px-8 py-4 rounded-lg bg-primary text-white text-lg font-semibold hover:bg-primary/90 transition"
            >
              تصفح جميع العقارات
            </Link>
          </div>
        </div>

        {/* ⭐ العقارات المميزة */}
        <section className="container mt-20">
          <h2 className="text-2xl font-bold mb-6 text-right">⭐ العقارات المعروضة</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((item) => {
              const images = Array.isArray(item.images)
                ? item.images
                : JSON.parse(item.images || "[]");

              return (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition text-right"
                >
                  {images.length > 0 && (
                    <div className="relative w-full h-48 mb-4">
                      <Image
                        src={images[0]}
                        alt={item.title}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  )}

                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                    {item.description}
                  </p>

                  <p className="mt-3 font-semibold text-primary">
                    {item.price} جنيه
                  </p>

                  <Link
                    href={`/properties/${item.slug}`}
                    className="text-blue-600 mt-3 inline-block"
                  >
                    عرض التفاصيل →
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        {/* 🏠 أحدث العقارات */}
        <section className="container mt-20 mb-20">
          <h2 className="text-2xl font-bold mb-6 text-right">🏠 أحدث العقارات</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latest.map((item) => {
              const images = Array.isArray(item.images)
                ? item.images
                : JSON.parse(item.images || "[]");

              return (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition text-right"
                >
                  {images.length > 0 && (
                    <div className="relative w-full h-48 mb-4">
                      <Image
                        src={images[0]}
                        alt={item.title}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  )}

                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                    {item.description}
                  </p>

                  <p className="mt-3 font-semibold text-primary">
                    {item.price} جنيه
                  </p>

                  <Link
                    href={`/properties/${item.slug}`}
                    className="text-blue-600 mt-3 inline-block"
                  >
                    عرض التفاصيل →
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
