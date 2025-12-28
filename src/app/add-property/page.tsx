"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AddPropertyForm() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [area, setArea] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let uploadedImages: string[] = [];

      /* ================= رفع الصور ================= */
      if (images && images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          const file = images[i];
          const fileName = `property-${Date.now()}-${file.name}`;

          const { error: uploadError } = await supabase.storage
            .from("properties")
            .upload(fileName, file, {
              cacheControl: "3600",
              upsert: false,
            });

          if (uploadError) {
            throw uploadError;
          }

          const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/properties/${fileName}`;
          uploadedImages.push(publicUrl);
        }
      }

      /* ================= حفظ العقار في Supabase ================= */
      const { data, error } = await supabase
        .from("properties")
        .insert([
          {
            title,
            price: Number(price),
            area: Number(area) || null,
            bedrooms: Number(bedrooms) || null,
            bathrooms: Number(bathrooms) || null,
            phone,
            description,
            images: uploadedImages,
            status: "pending", // ⭐ مهم جدًا
          },
        ])
        .select()
        .single();

      if (error) throw error;

      /* ================= إرسال إلى Google Sheet ================= */
      await fetch("/api/sync-to-sheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          price,
          area,
          bedrooms,
          bathrooms,
          phone,
          description,
          image: uploadedImages[0] || "",
          status: "pending",
        }),
      });

      alert("✔ تم إرسال العقار للمراجعة بنجاح");
      window.location.reload();
    } catch (err) {
      console.error("Add Property Error:", err);
      alert("❌ حدث خطأ أثناء إضافة العقار");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ direction: "rtl", padding: "40px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        نموذج إضافة عقار
      </h1>

      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          placeholder="عنوان العقار"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
          required
        />

        <input
          type="number"
          placeholder="السعر"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={inputStyle}
          required
        />

        <input
          type="number"
          placeholder="المساحة بالمتر"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="عدد غرف النوم"
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="عدد الحمامات"
          value={bathrooms}
          onChange={(e) => setBathrooms(e.target.value)}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="رقم الهاتف"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={inputStyle}
          required
        />

        <textarea
          placeholder="وصف العقار"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ ...inputStyle, height: "120px" }}
        />

        <input
          type="file"
          multiple
          onChange={(e) => setImages(e.target.files)}
        />

        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? "جاري الإرسال..." : "إضافة العقار"}
        </button>
      </form>
    </div>
  );
}

/* ===== styles ===== */

const formStyle = {
  maxWidth: "600px",
  margin: "auto",
  display: "flex",
  flexDirection: "column" as const,
  gap: "15px",
  background: "#fff",
  padding: "25px",
  borderRadius: "12px",
  boxShadow: "0 0 15px #ddd",
};

const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "16px",
  width: "100%",
};

const buttonStyle = {
  padding: "14px",
  background: "#0070f3",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  fontSize: "18px",
  cursor: "pointer",
};
