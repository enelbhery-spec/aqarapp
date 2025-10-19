"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import imageCompression from "browser-image-compression";

// إعداد Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export function AddPropertyForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);

  // ✅ رفع الصور بعد ضغطها
  const uploadImages = async (files: FileList) => {
    const uploadedUrls: string[] = [];

    for (const file of Array.from(files)) {
      try {
        // ضغط الصورة قبل الرفع
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1, // لا تتجاوز 1 ميجا بعد الضغط
          maxWidthOrHeight: 1280, // تقليل أبعاد الصورة
          useWebWorker: true,
        });

        const fileExt = compressedFile.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `property_images/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("properties")
          .upload(filePath, compressedFile, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          console.error(uploadError);
          toast.error(`خطأ في رفع الصورة: ${file.name}`);
          continue;
        }

        const { data: urlData } = supabase.storage
          .from("properties")
          .getPublicUrl(filePath);

        if (urlData?.publicUrl) {
          uploadedUrls.push(urlData.publicUrl);
        }
      } catch (err) {
        console.error(err);
        toast.error(`تعذر رفع الصورة ${file.name}`);
      }
    }

    return uploadedUrls;
  };

  // ✅ عند إرسال النموذج
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrls: string[] = [];

      if (images && images.length > 0) {
        if (images.length > 5) {
          toast.error("يمكن رفع 5 صور كحد أقصى فقط!");
          setLoading(false);
          return;
        }

        imageUrls = await uploadImages(images);
      }

      const { error } = await supabase.from("properties").insert([
        {
          title,
          description,
          price: parseFloat(price),
          location,
          images: imageUrls.length ? JSON.stringify(imageUrls) : null,
        },
      ]);

      if (error) throw error;

      toast.success("✅ تم إضافة العقار بنجاح!");
      setTitle("");
      setDescription("");
      setPrice("");
      setLocation("");
      setImages(null);
    } catch (error: any) {
      console.error(error);
      toast.error("❌ حدث خطأ أثناء إضافة العقار.");
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
        <label className="block mb-2 font-medium">صور العقار (حد أقصى 5 صور)</label>
        <Input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setImages(e.target.files)}
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "جاري الإضافة..." : "إضافة العقار"}
      </Button>
    </form>
  );
}
