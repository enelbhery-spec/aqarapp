"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// إعداد Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export function AddPropertyForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("properties")
        .insert([
          {
            title,
            description,
            price: parseFloat(price),
            location,
            image_url: imageUrl,
          },
        ]);

      if (error) throw error;

      toast.success("تم إضافة العقار بنجاح ✅");
      setTitle("");
      setDescription("");
      setPrice("");
      setLocation("");
      setImageUrl("");
    } catch (error: any) {
      console.error(error);
      toast.error("حدث خطأ أثناء إضافة العقار ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">إضافة عقار جديد</h2>

      <div>
        <label className="block mb-2 font-medium">عنوان العقار</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="مثال: شقة للبيع في حدائق أكتوبر"
          required
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">الوصف</label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="أدخل تفاصيل إضافية عن العقار..."
          required
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">السعر</label>
        <Input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="أدخل السعر بالجنيه المصري"
          required
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">الموقع</label>
        <Input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="أدخل عنوان أو منطقة العقار"
          required
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">رابط الصورة</label>
        <Input
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="ضع رابط صورة العقار (اختياري)"
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "جاري الإضافة..." : "إضافة العقار"}
      </Button>
    </form>
  );
}
