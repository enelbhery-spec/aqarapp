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

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // رفع الصور لو موجودة
    let uploadedImages: string[] = [];

    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        const file = images[i];
        const fileName = `${Date.now()}-${file.name}`;

        const { data, error } = await supabase.storage
          .from("properties")
          .upload(fileName, file);

        if (!error)
          uploadedImages.push(
            `https://${
              process.env.NEXT_PUBLIC_SUPABASE_URL?.replace("https://", "")
            }/storage/v1/object/public/properties/${fileName}`
          );
      }
    }

    const { error } = await supabase.from("properties").insert([
      {
        title,
        price: Number(price),
        area: Number(area),
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        phone,
        description,
        images: uploadedImages,
      },
    ]);

    if (error) {
      alert("❌ حدث خطأ أثناء إضافة العقار");
      console.error(error);
    } else {
      alert("✔ تمت إضافة العقار بنجاح");
      window.location.reload();
    }
  };

  return (
    <div style={{ direction: "rtl", padding: "40px" }}>
      <h1 style={{ textAlign: "center" }}>نموذج إضافة عقار</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "600px",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 0 10px #ddd",
        }}
      >
        <input
          type="text"
          placeholder="عنوان العقار"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="السعر"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={inputStyle}
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

        <button
          type="submit"
          style={{
            padding: "12px",
            background: "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          إضافة العقار
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "16px",
  width: "100%",
};
