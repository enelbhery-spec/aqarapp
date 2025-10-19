"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Shield, ArrowLeft } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function Header() {
  const [session, setSession] = useState<any>(null);
  const router = useRouter();
  const pathname = usePathname();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  // ✅ الأيقونة السرّية — فتح صفحة تسجيل الدخول بعد الضغط 3 ثوانٍ
  const handleTouchStart = () => {
    timerRef.current = setTimeout(() => {
      router.push("/login");
    }, 3000);
  };

  const handleTouchEnd = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  // ✅ إظهار زر العودة فقط لو المستخدم ليس في الصفحة الرئيسية
  const showBackButton = pathname !== "/";

  return (
    <>
      <header className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          {showBackButton && (
            <button
              onClick={() => router.back()}
              className="p-2 rounded-full hover:bg-gray-200 transition"
              title="رجوع"
            >
              <ArrowLeft className="text-gray-600" size={22} />
            </button>
          )}
          <Link href="/" className="text-lg font-bold text-blue-600">
            🏠 عقارات حدائق أكتوبر
          </Link>
        </div>

        {session ? (
          <nav className="flex items-center gap-4">
            <Link href="/my-properties" className="hover:text-blue-600">
              عقاراتي
            </Link>
            <Button onClick={handleLogout} variant="destructive">
              تسجيل الخروج
            </Button>
          </nav>
        ) : (
          <nav>
            <Link href="/" className="hover:text-blue-600">
              الرئيسية
            </Link>
          </nav>
        )}
      </header>

      {/* 🕵️‍♂️ الأيقونة السرّية */}
      <div
        onMouseDown={handleTouchStart}
        onMouseUp={handleTouchEnd}
        onMouseLeave={handleTouchEnd}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="fixed bottom-4 right-4 opacity-10 active:opacity-80 transition duration-300 cursor-pointer"
        title="اضغط مطولاً للدخول"
      >
        <Shield size={28} className="text-gray-400" />
      </div>
    </>
  );
}
