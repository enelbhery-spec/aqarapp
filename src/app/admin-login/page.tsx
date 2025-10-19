"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // 🔹 تسجيل الدخول
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoading(false);
      return setError("خطأ في البريد الإلكتروني أو كلمة المرور");
    }

    // 🔹 جلب بيانات المستخدم من جدول users
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("role")
      .eq("id", data.user.id)
      .single();

    setLoading(false);

    if (userError || !userData) {
      setError("تعذر التحقق من الصلاحيات");
      return;
    }

    // 🔹 السماح فقط لمن لديهم دور admin أو superadmin
    if (userData.role === "admin" || userData.role === "superadmin") {
      router.push("/signup"); // ← غيّرها لمسار لوحة التحكم لديك
    } else {
      await supabase.auth.signOut();
      setError("ليس لديك صلاحية الوصول إلى لوحة التحكم");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded-xl p-6 w-full max-w-sm"
      >
        <h2 className="text-center text-2xl font-bold mb-4 text-blue-600">
          تسجيل دخول المشرف
        </h2>

        {error && <p className="text-red-600 text-center mb-3">{error}</p>}

        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          {loading ? "جارٍ تسجيل الدخول..." : "دخول"}
        </Button>
      </form>
    </div>
  );
}
