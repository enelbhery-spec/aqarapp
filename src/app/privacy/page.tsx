// src/app/privacy/page.tsx
export const metadata = {
  title: "سياسة الخصوصية | سوق العقارات",
  description: "سياسة خصوصية موقع سوق العقارات. كيف نجمع ونستخدم ونحمي بيانات الزوار.",
  alternates: { canonical: "https://aqaratapp.netlify.app/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="container mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-4">سياسة الخصوصية</h1>

      <p className="mb-4">
        مرحبًا بك في موقع <strong>سوق العقارات</strong>. نحترم خصوصيتك ونلتزم بحماية بياناتك
        الشخصية. توضح هذه الصفحة المعلومات التي نجمعها وكيف نستخدمها ونحميها.
      </p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">المعلومات التي نجمعها</h2>
        <ul className="list-disc list-inside">
          <li>المعلومات التي تقدمها عند التواصل معنا (الاسم، البريد الإلكتروني، الرسالة).</li>
          <li>بيانات التصفح مثل عنوان IP ونوع الجهاز لتحسين أداء الموقع.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">كيفية استخدام المعلومات</h2>
        <p>
          نستخدم البيانات لتحسين الخدمة، للرد على استفساراتك، ولإرسال إشعارات إذا وافقت
          على ذلك. لا نشارك بياناتك مع أطراف خارجية إلا إذا تطلب الأمر قانونيًا.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">ملفات تعريف الارتباط (Cookies)</h2>
        <p>
          نستخدم الكوكيز لتحسين تجربة المستخدم وتحليل أداء الموقع. يمكنك تعطيل الكوكيز من
          إعدادات المتصفح، لكن قد يؤثر ذلك على بعض وظائف الموقع.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">الأمان وتحديث السياسة</h2>
        <p>
          نتخذ تدابير تقنية وتنظيمية لحماية بياناتك. قد نقوم بتحديث هذه السياسة من وقت لآخر —
          ستُعلن التغييرات هنا.
        </p>
      </section>
    </main>
  );
}
