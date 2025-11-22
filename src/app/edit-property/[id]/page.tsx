"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function EditPropertyPage() {
  const router = useRouter();
  const params = useParams();
  const propertyId = params?.id as string | undefined;

  const [property, setProperty] = useState<any>(null);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [newFiles, setNewFiles] = useState<FileList | null>(null);

  // ================================
  //     جلب بيانات العقار
  // ================================
  useEffect(() => {
    if (!propertyId) return;

    async function fetchProperty() {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("id", propertyId)
        .single();

      if (error) {
        console.error("❌ خطأ أثناء جلب العقار:", error);
        return;
      }

      const imgs = Array.isArray(data.images)
        ? data.images
        : typeof data.images === "string"
        ? JSON.parse(data.images || "[]")
        : [];

      setProperty(data);
      setImages(imgs);
    }

    fetchProperty();
  }, [propertyId]);

  // اختيار الصور الجديدة
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) setNewFiles(e.target.files);
  };

  // ================================
  //        رفع صور جديدة
  // ================================
  const handleImageUpload = async () => {
    if (!newFiles || !propertyId) return;
    setLoading(true);

    const uploaded: string[] = [];

    for (const file of Array.from(newFiles)) {
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = `${propertyId}/${fileName}`; // داخل الباكت مباشرة

      const { error: uploadError } = await supabase.storage
        .from("property-images")
        .upload(filePath, file);

      if (uploadError) {
        console.error("❌ خطأ رفع الصورة:", uploadError);
        continue;
      }

      const { data } = supabase.storage
        .from("property-images")
        .getPublicUrl(filePath);

      uploaded.push(data.publicUrl);
    }

    const updated = [...images, ...uploaded];
    setImages(updated);

    await supabase.from("properties").update({ images: updated }).eq("id", propertyId);

    setNewFiles(null);
    setLoading(false);
  };

  // ================================
  //        حذف صورة واحدة
  // ================================
  const handleDeleteImage = async (url: string) => {
    const path = url.split("/property-images/")[1];
    if (!path) return;

    await supabase.storage.from("property-images").remove([path]);

    const updated = images.filter((img) => img !== url);
    setImages(updated);

    await supabase.from("properties").update({ images: updated }).eq("id", propertyId);
  };

  // ================================
  //           حذف العقار
  // ================================
  const handleDeleteProperty = async () => {
    if (!confirm("هل أنت متأكد من حذف هذا العقار؟")) return;

    const paths = images
      .map((url) => url.split("/property-images/")[1])
      .filter(Boolean);

    if (paths.length > 0) {
      await supabase.storage.from("property-images").remove(paths);
    }

    await supabase.from("properties").delete().eq("id", propertyId);

    alert("تم حذف العقار");
    router.replace("/dashboard");
  };

  // ================================
  //         حفظ التعديلات
  // ================================
  const handleSave = async () => {
    setLoading(true);

    await supabase
      .from("properties")
      .update({
        title: property.title,
        description: property.description,
        price: property.price,
        location: property.location,
        phone: property.phone,
        area: property.area,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        images,
      })
      .eq("id", propertyId);

    alert("تم حفظ التعديلات");
    setLoading(false);
  };

  if (!property) return <div className="p-6">⏳ تحميل...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">✏️ تعديل العقار</h1>

      <div className="space-y-4">
        <input
          className="p-2 w-full border rounded"
          placeholder="عنوان العقار"
          value={property.title}
          onChange={(e) => setProperty({ ...property, title: e.target.value })}
        />

        <textarea
          className="p-2 w-full border rounded h-24"
          placeholder="الوصف"
          value={property.description}
          onChange={(e) => setProperty({ ...property, description: e.target.value })}
        />

        <input
          className="p-2 w-full border rounded"
          placeholder="السعر"
          type="number"
          value={property.price}
          onChange={(e) => setProperty({ ...property, price: e.target.value })}
        />

        <input
          className="p-2 w-full border rounded"
          placeholder="العنوان"
          value={property.location}
          onChange={(e) => setProperty({ ...property, location: e.target.value })}
        />

        <input
          className="p-2 w-full border rounded"
          placeholder="التليفون"
          value={property.phone}
          onChange={(e) => setProperty({ ...property, phone: e.target.value })}
        />

        <input
          className="p-2 w-full border rounded"
          placeholder="المساحة"
          value={property.area}
          onChange={(e) => setProperty({ ...property, area: e.target.value })}
        />

        <input
          className="p-2 w-full border rounded"
          placeholder="عدد الغرف"
          value={property.bedrooms}
          onChange={(e) => setProperty({ ...property, bedrooms: e.target.value })}
        />

        <input
          className="p-2 w-full border rounded"
          placeholder="عدد الحمامات"
          value={property.bathrooms}
          onChange={(e) => setProperty({ ...property, bathrooms: e.target.value })}
        />
      </div>

      <h2 className="mt-6 font-bold">📸 الصور الحالية:</h2>

      <div className="grid grid-cols-3 gap-3 mt-2">
        {images.map((url) => (
          <div key={url} className="relative">
            <img src={url} className="w-full h-24 object-cover rounded" />
            <button
              className="absolute top-1 right-1 bg-red-500 text-white text-xs p-1 rounded"
              onClick={() => handleDeleteImage(url)}
            >
              حذف
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <input type="file" multiple onChange={handleImageChange} />
        <button
          onClick={handleImageUpload}
          className="mt-2 bg-blue-600 text-white p-2 rounded"
        >
          رفع الصور الجديدة
        </button>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          💾 حفظ التعديلات
        </button>

        <button
          onClick={handleDeleteProperty}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          🗑️ حذف العقار
        </button>
      </div>
    </div>
  );
}
