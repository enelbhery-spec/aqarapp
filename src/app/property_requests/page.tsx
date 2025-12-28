"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function propertyrequestsPage() {
  const [purpose, setPurpose] = useState("شراء");
  const [propertyType, setPropertyType] = useState("");
  const [area, setArea] = useState("");
  const [location, setlocation] = useState("");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // حفظ الطلب في Supabase
      const { error } = await supabase.from("property_requests").insert([
        {
          purpose,
          property_type: propertyType,
          area,
          location,
          min_price: minPrice ? Number(minPrice) : null,
          max_price: maxPrice ? Number(maxPrice) : null,
          phone,
          notes,
        },
      ]);

      if (error) throw error;

      // إرسال نسخة إلى Google Sheet
      await fetch("/api/sync-request-to-sheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          purpose,
          propertyType,
          area,
          location,
          minPrice,
          maxPrice,
          phone,
          notes,
        }),
      });

      alert("✔ تم تسجيل طلبك بنجاح");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("❌ حدث خطأ أثناء إرسال الطلب");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ direction: "rtl", padding: "40px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        اطلب عقارك
      </h1>

      <form onSubmit={handleSubmit} style={formStyle}>
        <select
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          style={inputStyle}
        >
          <option value="شراء">شراء</option>
          <option value="إيجار">إيجار</option>
        </select>

        <select
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          style={inputStyle}
          required
        >
          <option value="">نوع العقار</option>
          <option value="شقة">شقة</option>
          <option value="فيلا">فيلا</option>
          <option value="محل">محل</option>
          <option value="أرض">أرض</option>
        </select>

        <input
          type="number"
          placeholder="المساحة)"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          style={inputStyle}
          required
        />
        <input
          type="text"
          placeholder="المنطقة المطلوب فيها العقار)"
          value={location}
          onChange={(e) => setlocation(e.target.value)}
          style={inputStyle}
          required
        />

        <input
          type="number"
          placeholder="أقل سعر"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="أقصى سعر"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
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
          placeholder="ملاحظات إضافية"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          style={{ ...inputStyle, height: "100px" }}
        />

        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? "جاري الإرسال..." : "إرسال الطلب"}
        </button>
      </form>
    </div>
  );
}

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
  background: "#16a34a",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  fontSize: "18px",
  cursor: "pointer",
};
