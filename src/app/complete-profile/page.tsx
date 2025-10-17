"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner"; // ✅ أبسط من useToast لو أنت بتستخدم sonner فعلاً

export default function CompleteProfile() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getUser();
      if (!data?.user) {
        router.replace("/login");
      } else {
        // نجلب بيانات المستخدم الحالية لو موجودة
        const { data: profile } = await supabase
          .from("users")
          .select("name, phone")
          .eq("id", data.user.id)
          .single();

        if (profile) {
          setName(profile.name || "");
          setPhone(profile.phone || "");
        }
      }
    }
    checkUser();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;
    if (!user) {
      toast.error("لم يتم العثور على المستخدم.");
      return;
    }

    const { error } = await supabase
      .from("users")
      .update({ name, phone })
      .eq("id", user.id);

    if (error) {
      toast.error("فشل في حفظ البيانات ❌");
    } else {
      toast.success("تم حفظ البيانات بنجاح ✅");
      router.push("/my-properties");
    }

    setLoading(false);
  };

  return (
    <div className="container py-12">
      <h1 className="text-2xl font-bold mb-6 text-center">استكمال بيانات الحساب</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-w-md mx-auto bg-white p-6 rounded-xl shadow-md"
      >
        <div>
          <Label>الاسم الكامل</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label>رقم الهاتف</Label>
          <Input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "جارٍ الحفظ..." : "حفظ البيانات"}
        </Button>
      </form>
    </div>
  );
}
