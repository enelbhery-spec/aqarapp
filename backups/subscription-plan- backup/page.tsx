"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SubscriptionPlanPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [freeAvailable, setFreeAvailable] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data?.user) {
        router.push("/login");
      } else {
        setUser(data.user);
        await checkFreePlan(data.user.id);
      }
      setLoading(false);
    };
    getUser();
  }, [router]);

  async function checkFreePlan(userId: string) {
    const { data, error } = await supabase
      .from("listings")
      .select("id")
      .eq("user_id", userId);

    if (error) {
      console.error(error);
      toast.error("حدث خطأ أثناء التحقق من الخطة المجانية");
      return;
    }

    // متاح إعلان مجاني واحد فقط إن لم ينشر المستخدم من قبل
    setFreeAvailable(!data || data.length === 0);
  }

  const handleFreePlan = async () => {
    toast.success("تم تفعيل الخطة المجانية لمدة 7 أيام");
    router.push("/add-property");
  };

  const handlePaidPlan = () => {
    // يمكنك استبدال هذا الرابط برابط الدفع الحقيقي
    router.push(
      "https://app.fawaterk.com/invoices/item/13514/aard-aaalan-aakar-lmd-30-yom-500-gm"
    );
  };

  if (loading) return <p className="text-center mt-10">جارٍ التحميل...</p>;

  return (
    <div className="container py-16">
      <h1 className="text-3xl font-bold text-center mb-10">اختر خطة الإعلان</h1>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {freeAvailable && (
          <Card className="text-center border-2 border-green-400">
            <CardHeader>
              <CardTitle>الخطة المجانية</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-600">
                إعلان مجاني واحد لمدة <strong>7 أيام</strong>
              </p>
              <Button onClick={handleFreePlan} className="w-full">
                تفعيل الخطة المجانية
              </Button>
            </CardContent>
          </Card>
        )}

        <Card className="text-center border-2 border-blue-400">
          <CardHeader>
            <CardTitle>الخطة الشهرية المميزة</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-gray-600">
              عدد غير محدود من الإعلانات لمدة <strong>30 يومًا</strong>
            </p>
            <Button onClick={handlePaidPlan} variant="outline" className="w-full">
              الاشتراك بـ 500 ج.م
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
