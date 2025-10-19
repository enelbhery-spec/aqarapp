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
  const propertyId = params.id as string;

  const [property, setProperty] = useState<any>(null);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [newFiles, setNewFiles] = useState<FileList | null>(null);

  // ✅ جلب بيانات العقار الحالي
  useEffect(() => {
    async function fetchProperty() {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("id", propertyId)
        .single();

      if (error) {
        console.error("❌ خطأ أثناء جلب العقار:", error.message);
        return;
      }

      setProperty(data);
      setImages(data.images || []);
    }

    if (propertyId) fetchProperty();
  }, [propertyId]);

  // ✅ اختيار الصور الجديدة
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setNewFiles(e.target.files);
    }
  };

  // ✅ رفع الصور دفعة واحدة
  const handleImageUpload = async () => {
    if (!newFiles || !propertyId) return;
    setLoading(true);

    const uploadPromises = Array.from(newFiles).map(async (file) => {
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = `properties/${propertyId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("property-images")
        .upload(filePath, file);

      if (uploadError) {
        console.error("❌ خطأ في رفع الصورة:", uploadError.message);
        return null;
      }

      const { data: publicUrlData } = supabase.storage
        .from("property-images")
        .getPublicUrl(filePath);

      return publicUrlData?.publicUrl || null;
    });

    const results = await Promise.all(uploadPromises);
    const validUrls = results.filter((url): url is string => !!url);

    if (validUrls.length > 0) {
      const updatedImages = [...images, ...validUrls];
      setImages(updatedImages);

      await supabase
        .from("properties")
        .update({ images: updatedImages })
        .eq("id", propertyId);
    }

    setNewFiles(null);
    setLoading(false);
  };

  // ✅ حذف صورة واحدة
  const handleDeleteImage = async (url: string) => {
    const path = url.split("/property-images/")[1];
    if (!path) return;

    await supabase.storage.from("property-images").remove([path]);

    const updatedImages = images.filter((img) => img !== url);
    setImages(updatedImages);

    await supabase
      .from("properties")
      .update({ images: updatedImages })
      .eq("id", propertyId);
  };

  // ✅ حذف العقار بالكامل
  const handleDeleteProperty = async () => {
    if (!confirm("هل أنت متأكد من حذف هذا العقار؟")) return;

    // حذف كل الصور من التخزين
    const paths = images
      .map((url) => url.split("/property-images/")[1])
      .filter(Boolean);

    if (paths.length > 0) {
      await supabase.storage.from("property-images").remove(paths);
    }

    // حذف العقار من قاعدة البيانات
    await supabase.from("properties").delete().eq("id", propertyId);

    alert("✅ تم حذف العقار بنجاح");
    router.replace("/dashboard");
  };

  // ✅ حفظ التعديلات على بيانات العقار
  const handleSave = async () => {
    if (!property) return;
    setLoading(true);

    const { error } = await supabase
      .from("properties")
      .update({
        title: property.title,
        description: property.description,
        price: property.price,
        location: property.location,
        images,
      })
      .eq("id", propertyId);

    setLoading(false);

    if (error) {
      alert("❌ حدث خطأ أثناء الحفظ");
      console.error(error);
    } else {
      alert("✅ تم حفظ التعديلات بنجاح");
    }
  };

  if (!property) return <div className="p-6">⏳ جاري تحميل بيانات العقار...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">تعديل العقار</h1>

      <div className="flex flex-col gap-4">
        <input
          type="text"
          value={property.title || ""}
          onChange={(e) => setProperty({ ...property, title: e.target.value })}
          placeholder="عنوان العقار"
          className="border p-2 rounded"
        />

        <textarea
          value={property.description || ""}
          onChange={(e) =>
            setProperty({ ...property, description: e.target.value })
          }
          placeholder="وصف العقار"
          className="border p-2 rounded h-24"
        />

        <input
          type="number"
          value={property.price || ""}
          onChange={(e) =>
            setProperty({ ...property, price: Number(e.target.value) })
          }
          placeholder="السعر"
          className="border p-2 rounded"
        />

        <input
          type="text"
          value={property.location || ""}
          onChange={(e) =>
            setProperty({ ...property, location: e.target.value })
          }
          placeholder="الموقع"
          className="border p-2 rounded"
        />

        <div>
          <label className="block font-semibold mb-2">📸 الصور الحالية:</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {images.map((url, i) => (
              <div key={i} className="relative">
                <img
                  src={url}
                  alt={`صورة-${i}`}
                  className="w-full h-32 object-cover rounded"
                />
                <button
                  onClick={() => handleDeleteImage(url)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-2 mt-4">
            ➕ رفع صور جديدة:
          </label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="border p-2 w-full rounded"
          />
          <button
            onClick={handleImageUpload}
            disabled={loading}
            className="mt-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            {loading ? "⏳ جاري الرفع..." : "رفع الصور"}
          </button>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSave}
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
            disabled={loading}
          >
            💾 حفظ التعديلات
          </button>

          <button
            onClick={handleDeleteProperty}
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
          >
            🗑️ حذف العقار
          </button>
        </div>
      </div>
    </div>
  );
}
