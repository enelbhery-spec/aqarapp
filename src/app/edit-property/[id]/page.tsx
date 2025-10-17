"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function EditPropertyPage() {
  const router = useRouter();
  const params = useParams();
  const propertyId = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // 🧩 بيانات العقار
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("EGP");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [area, setArea] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [phone, setPhone] = useState("");
  const [images, setImages] = useState<string[]>([]);

  // ✅ تحميل بيانات العقار
  useEffect(() => {
    async function fetchProperty() {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("id", propertyId)
        .single();

      if (error) {
        console.error("❌ خطأ في جلب بيانات العقار:", error);
      } else if (data) {
        setTitle(data.title || "");
        setDescription(data.description || "");
        setPrice(data.price?.toString() || "");
        setCurrency(data.currency || "EGP");
        setCity(data.city || "");
        setLocation(data.location || "");
        setArea(data.area?.toString() || "");
        setBedrooms(data.bedrooms?.toString() || "");
        setBathrooms(data.bathrooms?.toString() || "");
        setPhone(data.phone || "");
        setImages(
          Array.isArray(data.images)
            ? data.images
            : data.images
            ? JSON.parse(data.images)
            : []
        );
      }

      setLoading(false);
    }

    if (propertyId) fetchProperty();
  }, [propertyId]);

  // ✅ رفع الصور الجديدة
  async function handleImageUpload(event: any) {
    const files = event.target.files;
    if (!files?.length) return;

    const uploadedUrls: string[] = [];

    for (const file of files) {
      const fileName = `${Date.now()}-${file.name}`;
      const { error } = await supabase.storage
        .from("property-images")
        .upload(fileName, file);

      if (error) {
        console.error("❌ خطأ في رفع الصورة:", error);
        continue;
      }

      const { data: publicUrl } = supabase.storage
        .from("property-images")
        .getPublicUrl(fileName);

      if (publicUrl?.publicUrl) uploadedUrls.push(publicUrl.publicUrl);
    }

    setImages((prev) => [...prev, ...uploadedUrls]);
  }

  // 🗑️ حذف صورة
  const handleRemoveImage = (url: string) => {
    setImages((prev) => prev.filter((img) => img !== url));
  };

  // ✅ حفظ التعديلات
  async function handleUpdate() {
    setUpdating(true);

    const updateData = {
      title: title || "",
      description: description || "",
      price: price || "",
      currency: currency || "EGP",
      city: city || "",
      location: location || "",
      area: area || "",
      bedrooms: bedrooms || "",
      bathrooms: bathrooms || "",
      phone: phone || "",
      images: images.length ? images : [],
      updated_at: new Date(),
    };

    const { error } = await supabase
      .from("properties")
      .update(updateData)
      .eq("id", propertyId);

    setUpdating(false);

    if (error) {
      alert("حدث خطأ أثناء حفظ التعديلات ❌");
      console.error("تفاصيل الخطأ:", JSON.stringify(error, null, 2));
    } else {
      alert("✅ تم حفظ التعديلات بنجاح");
      router.push("/my-properties");
    }
  }

  if (loading) return <p className="text-center mt-10">جاري تحميل البيانات...</p>;

  return (
    <div className="container py-12">
      <h1 className="text-2xl font-bold mb-6">تعديل العقار</h1>

      <div className="space-y-4">
        {/* 🏡 العنوان */}
        <div>
          <label className="block font-medium mb-1">العنوان</label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        {/* 📄 الوصف */}
        <div>
          <label className="block font-medium mb-1">الوصف</label>
          <Textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* 💰 السعر والعملة */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">السعر</label>
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">العملة</label>
            <Input value={currency} onChange={(e) => setCurrency(e.target.value)} />
          </div>
        </div>

        {/* 📍 المدينة والموقع */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">المدينة</label>
            <Input value={city} onChange={(e) => setCity(e.target.value)} />
          </div>
          <div>
            <label className="block font-medium mb-1">الموقع</label>
            <Input value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
        </div>

        {/* 📏 المساحة والغرف والحمامات */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block font-medium mb-1">المساحة (م²)</label>
            <Input
              type="number"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">عدد الغرف</label>
            <Input
              type="number"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">عدد الحمامات</label>
            <Input
              type="number"
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
            />
          </div>
        </div>

        {/* ☎️ رقم الهاتف */}
        <div>
          <label className="block font-medium mb-1">رقم الهاتف</label>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>

        {/* 🖼️ الصور */}
        <div>
          <label className="block font-medium mb-1">الصور</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="mb-3"
          />
          <div className="grid grid-cols-3 gap-3">
            {images.map((url, i) => (
              <div key={i} className="relative group">
                <img
                  src={url}
                  alt={`صورة ${i + 1}`}
                  className="w-full h-32 object-cover rounded"
                />
                <button
                  onClick={() => handleRemoveImage(url)}
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* زر الحفظ */}
        <Button
          onClick={handleUpdate}
          disabled={updating}
          className="bg-blue-600 hover:bg-blue-700 text-white mt-4"
        >
          {updating ? "جارٍ الحفظ..." : "حفظ التعديلات"}
        </Button>
      </div>
    </div>
  );
}
