import { hadayekOctoberAreas } from "@/data/hadayekOctoberAreas";
import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import { blogPosts } from "@/data/blogPosts";


export default function HomePage() {
  return (
    <main className="bg-gray-50 text-gray-800">

      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-bl from-green-600 via-green-500 to-emerald-500 text-white py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">
            ابحث بذكاء عن عقارك في حدائق أكتوبر
          </h1>
          <p className="text-lg opacity-90 mb-8">
            اختار المنطقة الصح الأول…
            بدون صور مضللة – بدون وعود وهمية
          </p>

          <a
            href="https://wa.me/201021732703"
            className="bg-white text-green-700 px-8 py-3 rounded-full font-bold inline-block"
          >
            اسألنا نرشح لك الأنسب
          </a>
        </div>
      </section>

      {/* ================= WHY THIS IDEA ================= */}
      <section className="py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-lg mb-2">🚫 بدون صور عقارات</h3>
            <p className="text-sm text-gray-600">
              لأن الصور غالبًا بتكون غير حقيقية أو قديمة
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-lg mb-2">📍 نركز على المنطقة</h3>
            <p className="text-sm text-gray-600">
              المنطقة الصح = قرار شراء صح
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-lg mb-2">📲 تواصل مباشر</h3>
            <p className="text-sm text-gray-600">
              لو مهتم فعلًا، كلمنا وخد تفاصيل حقيقية
            </p>
          </div>

        </div>
      </section>

      {/* ================= AREAS ================= */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-10 text-center">
            مناطق حدائق أكتوبر
          </h2>

          <div className="space-y-12">
            {hadayekOctoberAreas.map((group) => (
              <div key={group.id}>
                <h3 className="text-xl font-bold mb-4">
                  {group.title}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {group.areas.map((area) => (
                    <div
                      key={area.slug}
                      className="bg-white rounded-xl shadow p-6 flex flex-col justify-between"
                    >
                      <div>
                        <h4 className="font-bold text-lg mb-2">
                          {area.name}
                        </h4>

                        <p className="text-sm text-gray-600 mb-4">
                          معلومات حقيقية عن الأسعار، الخدمات،
                          والمميزات والعيوب
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <Link
                          href={`/areas/${area.slug}`}
                          className="text-green-600 font-semibold"
                        >
                          استكشف المنطقة →
                        </Link>

                        <a
                          href={`https://wa.me/201021732703?text=استفسار عن منطقة ${area.name}`}
                          className="text-sm bg-green-600 text-white px-4 py-2 rounded-lg"
                        >
                          واتساب
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
                 {/* ================= BLOG / SEO CONTENT ================= */}
             <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 max-w-6xl">

      <h2 className="text-2xl font-bold text-center mb-10">
        دليل السكن والاستثمار في حدائق أكتوبر
      </h2>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      <Link
  href="/blog/choose-area-hadayek-october"
  className="block bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition"
>
  <h3 className="text-lg font-bold mb-2">
    كيف تختار المنطقة المناسبة داخل حدائق أكتوبر؟
  </h3>

  <p className="text-gray-600 text-sm">
    اختيار المنطقة الصح أهم خطوة قبل شراء العقار.
  </p>
  <span className="mt-3 inline-block text-green-600 font-medium">
  اقرأ المقال →
</span>

</Link>
{/*
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="font-bold mb-2">
          لماذا حدائق أكتوبر من أفضل مناطق السكن حاليًا؟
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          حدائق أكتوبر من أسرع المناطق نموًا غرب القاهرة...
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="font-bold mb-2">
          أسعار العقارات في حدائق أكتوبر 2025
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          تختلف الأسعار حسب المنطقة ونوع العقار...
        </p>
      </div>
*/}

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="font-bold mb-2">
          هل الشراء بدون صور عقارات قرار صحيح؟
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          نعم، لأن الصور غالبًا تكون مضللة أو قديمة...
        </p>
      </div>

    </div>
  </div>
</section>

{/* ================= BLOG PREVIEW ================= */}
{/*
<section className="bg-gray-100 py-12">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-2xl font-bold mb-6">
      مقالات عقارية مفيدة
    </h2>

    <div className="grid md:grid-cols-3 gap-6">
      {blogPosts.map((post) => (
        <div
          key={post.slug}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <h3 className="font-semibold mb-2">
            {post.title}
          </h3>

          <p className="text-sm text-gray-600 mb-4">
            {post.excerpt}
          </p>

          <Link
            href={`/blog/${post.slug}`}
            className="text-green-600 font-medium hover:underline"
          >
            اقرأ المقال →
          </Link>
        </div>
      ))}
    </div>
  </div>
 </section>
*/}

      {/* ================= CTA ================= */}
      <section className="bg-green-600 text-white py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">
          ناوي تشتري بجد؟
        </h2>
        <p className="mb-6 opacity-90">
          قولي ميزانيتك ونوع السكن
          وهنرشح لك الأنسب بدون لف ولا تضليل
        </p>

        <a
          href="https://wa.me/201021732703"
          className="bg-white text-green-700 px-8 py-3 rounded-full font-bold"
        >
          تواصل الآن عبر واتساب
        </a>
      </section>

    </main>
  );
}
