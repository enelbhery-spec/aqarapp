import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-green-700 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* عن الموقع */}
        <div className="text-right">
          <h3 className="text-lg font-extrabold mb-4">
            وسيط عقاري أكتوبر
          </h3>
          <p className="text-sm text-green-100 leading-relaxed">
            منصة عقارية بسيطة لعرض وطلب العقارات داخل مدينة 6 أكتوبر فقط،
            بدون تسجيل، وتواصل مباشر عبر الواتساب.
          </p>
        </div>

        {/* روابط سريعة */}
        <div className="text-right">
          <h4 className="font-bold mb-4">روابط سريعة</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:underline">
                الصفحة الرئيسية
              </Link>
            </li>
            <li>
              <Link href="/properties" className="hover:underline">
                العقارات المعروضة
              </Link>
            </li>
            <li>
              <Link href="/add-property" className="hover:underline">
                أضف عقارك
              </Link>
            </li>
            <li>
              <Link href="/property_requests" className="hover:underline">
                اطلب عقار
              </Link>
            </li>
          </ul>
        </div>

        {/* معلومات قانونية */}
        <div className="text-right">
          <h4 className="font-bold mb-4">معلومات</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/privacy-policy" className="hover:underline">
                سياسة الخصوصية
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:underline">
                سياسة الاستخدام
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                اتصل بنا
              </Link>
            </li>
          </ul>
        </div>

      </div>

      {/* شريط سفلي */}
      <div className="bg-green-800 text-center py-4 text-sm text-green-100">
        © {new Date().getFullYear()} وسيط عقاري أكتوبر – جميع الحقوق محفوظة
      </div>
    </footer>
  );
}
