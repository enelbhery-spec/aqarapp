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

  // ✅ جلب بيانات العقار الحالي
  useEffect(() => {
    if (!propertyId) return;

    async function fetchProperty() {
      try {
        const { data, error } = await supabase
          .from("properties")
          .select("*")
          .eq("id", propertyId)
          .single();

        if (error) {
          console.error("❌ خطأ أثناء جلب العقار:", error.message);
          return;
        }

        const imgs = Array.isArray(data.images)
          ? data.images
          : typeof data.images === "string"
          ? JSON.parse(data.images || "[]")
          : [];

        setProperty(data);
        setImages(imgs);
      } catch (err) {
        console.error("⚠️ خطأ غير متوقع أثناء الجلب:", err);
      }
    }

    fetchProperty();
  }, [propertyId]);

  // ✅ اختيار الصور الجديدة
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) setNewFiles(e.target.files);
  };

  // ✅ رفع الصور الجديدة
  const handleImageUpload = async () => {
    if (!newFiles || !propertyId) return;
    setLoading(true);

    try {
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
    } catch (err) {
      console.error("⚠️ خطأ أثناء رفع الصور:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ حذف صورة واحدة
  const handleDeleteImage = async (url: string) => {
    try {
      const path = url.split("/property-images/")[1];
      if (!path) return;

      await supabase.storage.from("property-images").remove([path]);

      const updatedImages = images.filter((img) => img !== url);
      setImages(updatedImages);

      await supabase
        .from("properties")
        .update({ images: updatedImages })
        .eq("id", propertyId);
    } catch (err) {
      console.error("⚠️ خطأ أثناء حذف الصورة:", err);
    }
  };

  // ✅ حذف العقار بالكامل
  const handleDeleteProperty = async () => {
    if (!confirm("هل أنت متأكد من حذف هذا العقار؟")) return;

    try {
      const paths = images
        .map((url) => url.split("/property-images/")[1])
        .filter(Boolean);

      if (paths.length > 0) {
        await supabase.storage.from("property-images").remove(paths);
      }

      await supabase.from("properties").delete().eq("id", propertyId);
      alert("✅ تم حذف العقار بنجاح");
      router.replace("/dashboard");
    } catch (err) {
      console.error("⚠️ خطأ أثناء حذف العقار:", err);
    }
  };

  // ✅ حفظ التعديلات
  const handleSave = async () => {
    if (!property || !propertyId) return;
    setLoading(true);

    try {
      const { error } = await supabase
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

      if (error) throw error;

      alert("✅ تم حفظ التعديلات بنجاح");
    } catch (err) {
      console.error("❌ خطأ أثناء الحفظ:", err);
      alert("حدث خطأ أثناء الحفظ");
    } finally {
      setLoading(false);
    }
  };

  if (!property)
    return <div className="p-6">⏳ جاري تحميل بيانات العقار...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">✏️ تعديل العقار</h1>

      {/* بقية الواجهة كما هي */}
    </div>
  );
}
