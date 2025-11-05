"use client";
export const runtime = 'edge';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AddPropertyRedirectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUser() {
      try {
        const { data } = await supabase.auth.getUser();
        const user = data?.user;

        // لو المستخدم غير مسجل → نوجهه للتسجيل
        if (!user) {
          router.replace("/signup");
          return;
        }

        // جلب بيانات المستخدم لمعرفة دوره
        const { data: profile } = await supabase
          .from("users")
          .select("role")
          .eq("id", user.id)
          .single();

        const role = profile?.role || "user";

        // توجيه بناءً على الدور
        if (role === "super_admin") {
          router.replace("/dashboard");
        } else if (role === "super_admin") {
          router.replace("/add-property/form");
        } else {
          router.replace("/add-property/form");
        }
      } catch (err) {
        console.error("خطأ أثناء التحقق من المستخدم:", err);
        router.replace("/signup");
      } finally {
        setLoading(false);
      }
    }

    checkUser();
  }, [router]);

  if (loading)
    return <p className="text-center mt-10">جاري التحقق من حالتك...</p>;

  return null;
}
