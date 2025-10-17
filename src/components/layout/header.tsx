"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    // مراقبة حالة المستخدم المسجل
    supabase.auth.getSession().then(({ data }) => setSession(data.session));

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/"; // توجيه المستخدم للصفحة الرئيسية بعد تسجيل الخروج
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-blue-600">
        🏠 عقارات حدائق اكتوبر
      </Link>

      {session ? (
        // ✅ المستخدم مسجل الدخول
        <nav className="flex items-center gap-4">
          <Link href="/my-properties" className="hover:text-blue-600">
            عقاراتي
          </Link>
                    <Button onClick={handleLogout} variant="destructive">
            تسجيل الخروج
          </Button>
        </nav>
      ) : (
        // 🚫 المستخدم غير مسجل
        <nav className="flex items-center gap-4">
          <Link href="/" className="hover:text-blue-600">
            الرئيسية
          </Link>
          <Link href="/login" className="hover:text-blue-600">
            تسجيل الدخول
          </Link>
                  </nav>
      )}
    </header>
  );
}
