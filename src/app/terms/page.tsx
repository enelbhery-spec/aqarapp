// src/app/terms/page.tsx
export const metadata = {
  title: "شروط الاستخدام | سوق العقارات",
  description: "شروط وأحكام استخدام موقع سوق العقارات. الشروط القانونية للمستخدمين والزوار.",
  alternates: { canonical: "https://aqaratapp.netlify.app/terms" },
};

export default function TermsPage() {
  return (
    <main className="container mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-4">شروط الاستخدام</h1>

      <p className="mb-4">
        باستخدامك موقع <strong>سوق العقارات</strong>، فإنك توافق على الالتزام بهذه الشروط.
        يرجى قراءة الأحكام بعناية.
      </p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. استخدام المحتوى</h2>
        <p>
          جميع المحتويات (نصوص، صور، بيانات) محمية بحقوق النشر ولا يجوز إعادة نشرها أو
          استخدامها تجارياً بدون إذن صريح.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. دقة المعلومات</h2>
        <p>
          نحرص على دقة المعلومات المعروضة، لكننا غير مسؤولين عن أي أخطاء واردة من
          المعلنين أو المستخدمين. ينصح بالتحقق المباشر عند إتمام أي تعامل.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. المسؤولية</h2>
        <p>
          الموقع لا يتحمل مسؤولية أي خسائر ناتجة عن استخدام المحتوى أو التعاملات بين
          المستخدمين والمعلنين.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">4. التعديلات والقانون المعمول</h2>
        <p>
          نحتفظ بالحق في تعديل هذه الشروط في أي وقت. تخضع هذه الشروط لقوانين جمهورية مصر العربية.
        </p>
      </section>
    </main>
  );
}
