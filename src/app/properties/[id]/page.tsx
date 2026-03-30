import { readFile } from "fs/promises";
import path from "path";
import { notFound } from "next/navigation";

// دالة الـ Metadata
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return {
    title: `تفاصيل عقار ${id}`,
    description: "تفاصيل كاملة عن العقار",
  };
}

// المكون الرئيسي للصفحة
export default async function PropertyDetails({
  params,
}: {
  params: Promise<{ id: string }>; // هنا تم تصحيح تعريف النوع
}) {
  // استخراج الـ id بشكل صحيح من الـ Promise
  const { id } = await params;

  try {
    // قراءة البيانات من الملف
    const filePath = path.join(process.cwd(), "public", "data1.json");
    const file = await readFile(filePath, "utf8");
    const properties = JSON.parse(file);

    // البحث عن العقار
    const property = properties.find(
      (p: any) => String(p.listingId) === id
    );

    // إذا لم يتم العثور على العقار
    if (!property) return notFound();

    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900">{property.imageAlt}</h1>
        <div className="mt-6 bg-white p-6 rounded-2xl shadow-sm border">
          <p className="text-gray-600 leading-relaxed">{property.description}</p>
          <p className="mt-4 text-2xl text-green-600 font-bold">
            {property.price?.toLocaleString()} جنيه
          </p>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error reading data:", error);
    return notFound();
  }
}