import Link from "next/link";
import { hadayekOctoberAreas } from "@/data/hadayekOctoberAreas";
import { calculateAreaScore } from "@/lib/areaScore";

export default function AreasPage() {
  return (
    <main className="bg-gray-50 min-h-screen p-6">
      <div className="container mx-auto">

        <h1 className="text-3xl font-bold mb-8 text-center">
          المناطق المتاحة
        </h1>

        {hadayekOctoberAreas.map((group) => {
          // ✅ ترتيب المناطق داخل كل مجموعة حسب التقييم
          const sortedAreas = [...group.areas].sort(
            (a, b) => calculateAreaScore(b) - calculateAreaScore(a)
          );

          return (
            <section key={group.id} className="mb-10">
              <h2 className="text-xl font-bold mb-4 text-green-700">
                {group.title}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {sortedAreas.map((area) => (
                  <Link
                    key={area.slug}
                    href={`/areas/${area.slug}`}
                    className="block bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
                  >
                    <h3 className="font-bold text-lg mb-2">
                      {area.name}
                    </h3>

                    <p className="text-sm text-gray-600">
                      {area.description?.slice(0, 80) || "اضغط لعرض التفاصيل"}...
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

      </div>
    </main>
  );
}
