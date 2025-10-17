// src/schedules/subscriptionScheduler.ts
import { createClient } from "@supabase/supabase-js";

// تهيئة Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // استخدم مفتاح السيرفر فقط في السيرفر
);

export async function subscriptionScheduler() {
  const today = new Date();

  // 🟢 1. حذف الإعلانات المجانية المنتهية بعد 7 أيام
  const { data: freeAds, error: freeError } = await supabase
    .from("properties")
    .select("*")
    .eq("plan_type", "free");

  if (freeError) console.error("Error fetching free ads:", freeError);

  for (const ad of freeAds || []) {
    const created = new Date(ad.created_at);
    const diffDays = Math.floor((today.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays >= 7) {
      await supabase.from("properties").delete().eq("id", ad.id);
      console.log(`🗑️ Deleted expired free ad: ${ad.id}`);
    }
  }

  // 🟠 2. التعامل مع الإعلانات المدفوعة بعد 30 يوم
  const { data: paidAds, error: paidError } = await supabase
    .from("properties")
    .select("*")
    .eq("plan_type", "paid");

  if (paidError) console.error("Error fetching paid ads:", paidError);

  for (const ad of paidAds || []) {
    const created = new Date(ad.created_at);
    const diffDays = Math.floor((today.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 30) {
      // إرسال إشعار بالتجديد
      console.log(`📢 Reminder: Renew subscription for ad ${ad.id}`);
    } else if (diffDays >= 33) {
      // حذف الإعلان بعد 3 أيام من انتهاء المهلة
      await supabase.from("properties").delete().eq("id", ad.id);
      console.log(`🗑️ Deleted expired paid ad: ${ad.id}`);
    }
  }

  console.log("✅ Subscription schedule check completed.");
}
