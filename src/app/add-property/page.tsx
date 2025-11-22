"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

export default function AddPropertyPage() {
  const router = useRouter();
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getUser();
      const user = data?.user;

      // لو المستخدم غير مسجل → يروح للتسجيل
      if (!user) {
        router.replace("/signup");
        return;
      }

      // لو مسجل دخول → يدخل مباشرة على صفحة إضافة العقار
      router.replace("/add-property/form");
    }

    checkUser();
  }, [router]);

  return (
    <p className="text-center mt-10">جاري التحميل...</p>
  );
}
