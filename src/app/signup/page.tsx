"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function homePage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error("بيانات الدخول غير صحيحة");
      setLoading(false);
      return;
    }

    // 🟢 جلب الـ token
    const token = data.session?.access_token;

    // 🟢 إرسال الطلب إلى API للتحقق من الدور
    const res = await fetch("app/api/check-role", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();

    // 🧭 التوجيه حسب الدور
    switch (result.role) {
      case "super_admin":
        router.push("/dashboard");
        break;
      case "admin":
        router.push("/my-properties");
        break;
            default:
        router.push("/home");
        break;
    }

    toast.success("تم تسجيل الدخول بنجاح");
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-sm p-6 rounded-xl shadow-lg bg-white space-y-4">
        <h1 className="text-2xl font-bold text-center">تسجيل الدخول</h1>
        <Input
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="كلمة المرور"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button className="w-full" onClick={handleLogin} disabled={loading}>
          {loading ? "جاري الدخول..." : "دخول"}
        </Button>
      </div>
    </div>
  );
}
