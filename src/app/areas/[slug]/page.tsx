import { notFound } from "next/navigation";
import { hadayekOctoberAreas } from "@/data/hadayekOctoberAreas";
import AreaTemplate from "@/components/AreaTemplate";
import { getSimilarAreas } from "@/lib/similarAreas";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function AreaPage({ params }: Props) {
  // ✅ انتظار الـ params بشكل صحيح
  const { slug } = await params;

  // ✅ البحث في كافة التصنيفات (كمبوندات، سياحية، إسكان)
  const area = hadayekOctoberAreas
    .flatMap((group) => group.areas)
    .find((item) => item.slug === slug);

  // ✅ إذا لم يجد المنطقة في الملف المحلي، يوجه لصفحة 404
  if (!area) {
    notFound();
  }

  // ✅ جلب المناطق المشابهة بناءً على الملف المحلي
  const similarAreas = getSimilarAreas(
    hadayekOctoberAreas,
    area,
    3
  );

  return (
    <AreaTemplate
      area={area} // سيحتوي الآن على description, avgPrice, services
      similarAreas={similarAreas}
    />
  );
}