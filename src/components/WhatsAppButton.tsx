"use client";

export default function WhatsAppButton() {
  const phoneNumber = "201021732703"; // ✏️ عدّل الرقم (بدون +)
  const message = encodeURIComponent(
    "مرحبًا، أريد الاستفسار عن عقار معروض على موقع وسيط عقاري أكتوبر"
  );

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-full shadow-lg flex items-center gap-2 transition"
    >
      <span className="text-lg">💬</span>
      <span className="font-bold text-sm">تواصل واتساب</span>
    </a>
  );
}
