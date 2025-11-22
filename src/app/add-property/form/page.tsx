"use client";

import { useState } from "react";
import Header from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AddPropertyForm() {
  const [form, setForm] = useState({
    title: "",
    price: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    phone: "",
    description: "",
    images: [] as File[],
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImages = (e: any) => {
    const files = Array.from(e.target.files);
    setForm({ ...form, images: files as File[] });
  };

  const handleSubmit = async () => {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;

    if (!user) {
      alert("يجب تسجيل الدخول أولاً");
      return;
    }

    try {
      // رفع الصور
      const uploadedImages: string[] = [];

      for (const file of form.images) {
        const fileName = `${Date.now()}-${file.name}`;

        const { error: uploadError } = await supabase.storage
          .from("properties")
          .upload(fileName, file);

        if (uploadError) {
          console.error("❌ خطأ رفع الصورة:", uploadError);
          alert("خطأ عند رفع الصورة: " + uploadError.message);
          return;
        }

        const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/properties/${fileName}`;
        uploadedImages.push(url);
      }

      // حفظ البيانات في جدول properties
      const { error } = await supabase.from("properties").insert({
        title: form.title,
        price: Number(form.price),
        area: Number(form.area),
        bedrooms: Number(form.bedrooms),
        bathrooms: Number(form.bathrooms),
        phone: form.phone,
        description: form.description,
        images: uploadedImages,
        user_id: user.id,
      });

      if (error) {
        console.error("❌ خطأ Supabase:", error);
        alert("حدث خطأ أثناء الإضافة: " + error.message);
      } else {
        alert("تم إضافة العقار بنجاح 🎉");
      }

    } catch (err: any) {
      console.error("🔥 خطأ غير متوقع:", err);
      alert("حدث خطأ غير متوقع");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* 🔥 هيدر ثابت */}
      <div className="sticky top-0 z-50 bg-white shadow">
        <Header />
      </div>

      <main className="container mx-auto py-10 max-w-3xl">

        <h2 className="text-3xl font-bold mb-8">نموذج إضافة عقار</h2>

        <div className="grid gap-5">

          <input name="title" type="text" placeholder="عنوان العقار"
            onChange={handleChange} className="input" />

          <input name="price" type="number" placeholder="السعر"
            onChange={handleChange} className="input" />

          <input name="area" type="number" placeholder="المساحة بالمتر"
            onChange={handleChange} className="input" />

          <input name="bedrooms" type="number" placeholder="عدد غرف النوم"
            onChange={handleChange} className="input" />

          <input name="bathrooms" type="number" placeholder="عدد الحمامات"
            onChange={handleChange} className="input" />

                    <input name="phone" type="text" placeholder="رقم الهاتف"
            onChange={handleChange} className="input" />

          <textarea name="description" placeholder="وصف العقار"
            onChange={handleChange} className="input h-28" />

          <input type="file" multiple onChange={handleImages} className="input" />

          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
          >
            حفظ العقار
          </button>

        </div>
      </main>

      <Footer />
    </div>
  );
}
