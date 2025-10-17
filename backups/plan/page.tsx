"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AddPropertyPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFreeAvailable, setIsFreeAvailable] = useState(false);

  // 🧭 جلب المستخدم الحالي
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data?.user) {
        router.push("/login");
      } else {
        setUser(data.user);
        checkFreePlan(data.user.id);
      }
    };
    getUser();
  }, [router]);

  // 🧩 التحقق من عدد الإعلانات السابقة
  async function checkFreePlan(userId: string) {
    const { data, error } = await supabase
      .from("listings")
      .select("id")
      .eq("user_id", userId);

    if (error) console.error(error);

    if (data && data.length === 0) {
      setIsFreeAvailable(true);
    } else {
      setIsFreeAvailable(false);
    }
  }

  // 📤 نشر الإعلان
  async function handleSubmit() {
    if (!title.trim()) {
      toast.error("يرجى إدخال عنوان الإعلان");
      return;
    }

    setIsSubmitting(true);
    const planType = isFreeAvailable ? "free" : "paid";

    const { error } = await supabase.from("listings").insert({
      user_id: user.id,
      title,
      description,
      plan: planType,
    });

    setIsSubmitting(false);

    if (error) {
      console.error(error);
      toast.error("حدث خطأ أثناء حفظ الإعلان");
      return;
    }

    toast.success(
      planType === "free"
        ? "تم نشر إعلانك المجاني بنجاح (صالح لمدة 7 أيام)"
        : "تم حفظ إعلانك المميز بنجاح بعد الدفع"
    );

    router.push("/my-properties");
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-6">إضافة إعلان جديد</h1>

      <div className="space-y-4 max-w-lg">
        <Input
          placeholder="عنوان الإعلان"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          placeholder="وصف الإعلان"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {isFreeAvailable ? (
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            نشر إعلان مجاني لمدة 7 أيام
          </Button>
        ) : (
          <Button
            onClick={() =>
              router.push(
                "https://app.fawaterk.com/invoices/item/13514/aard-aaalan-aakar-lmd-30-yom-500-gm"
              )
            }
          >
            الاشتراك في الباقة المميزة (500 ج.م)
          </Button>
        )}
      </div>
    </div>
  );
}
