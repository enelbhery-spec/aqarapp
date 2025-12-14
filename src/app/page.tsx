"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function HomePage() {
  const router = useRouter();

  const [searchText, setSearchText] = useState("");
  const [latest, setLatest] = useState<any[]>([]);
  const [featured, setFeatured] = useState<any[]>([]);

  useEffect(() => {
    fetchLatest();
    fetchFeatured();
  }, []);

  // 🔍 البحث بخانة واحدة
  const handleSearch = () => {
    if (!searchText.trim()) return;
    router.push(`/properties?q=${encodeURIComponent(searchText)}`);
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

  // ⭐ العقارات المميزة
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

      <main className="flex-1">

        {/* 🔍 قسم البحث الرئيسي */}
        <section className="container max-w-3xl mx-auto text-center py-16">
          <h1 className="text-3xl font-bold mb-6">
            ابحث عن عقارك بسهولة
          </h1>

          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="شقة، فيلا، حدائق أكتوبر، سعر..."
              className="flex-1 p-4 border rounded-lg text-right"
            />

            <button
              onClick={handleSearch}
              className="px-6 py-4 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90"
            >
              بحث
            </button>
          </div>

          <div className="mt-6">
            <Link
              href="/properties"
              className="inline-block px-8 py-3 rounded-lg bg-gray-900 text-white font-semibold hover:bg-gray-800"
            >
              تصفح جميع العقارات
            </Link>
          </div>
        </section>

        {/* ⭐ العقارات المميزة */}
        <section className="container mt-10">
          <h2 className="text-2xl font-bold mb-6 text-right">
            ⭐ العقارات المميزة
          </h2>

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
          <h2 className="text-2xl font-bold mb-6 text-right">
            🏠 أحدث العقارات
          </h2>

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
