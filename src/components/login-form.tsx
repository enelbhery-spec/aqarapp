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

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    // تسجيل الدخول
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error("خطأ في تسجيل الدخول. تأكد من البريد وكلمة المرور.");
      setLoading(false);
      return;
    }

    const user = data.user;
    if (!user) {
      toast.error("لم يتم العثور على المستخدم.");
      setLoading(false);
      return;
    }

    // جلب الدور من جدول users
    const { data: roleData, error: roleError } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    setLoading(false);

    if (roleError || !roleData) {
      toast.error("حدث خطأ أثناء جلب بيانات المستخدم.");
      console.error(roleError);
      return;
    }

    const role = roleData.role;

    // توجيه حسب الدور
    if (role === "super_admin") {
      router.push("/dashboard");
    } else if (role === "admin") {
      router.push("/my-properties");
    } 

    toast.success("تم تسجيل الدخول بنجاح 🎉");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/20">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm space-y-4"
      >
        <h1 className="text-2xl font-bold text-center mb-4">تسجيل الدخول</h1>

        <Input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"}
        </Button>
      </form>
    </div>
  );
}
