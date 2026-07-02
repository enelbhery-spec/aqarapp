import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import AreaTemplate from "@/components/AreaTemplate";
import { getSimilarAreas } from "@/lib/similarAreas";
import { hadayekOctoberAreas } from "@/data/hadayekOctoberAreas";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function AreaPage({ params }: Props) {
  const { slug } = await params;

  const supabase = await createClient();

  // 1. جلب بيانات المنطقة
  const { data: area, error } = await supabase
    .from("areas")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !area) {
    notFound();
  }

  // 2. جلب صور المنطقة
  const { data: images } = await supabase
    .from("area_images")
    .select("image_url")
    .eq("area_slug", slug);

  // 3. ✅ جلب العقارات المرتبطة بهذه المنطقة باستخدام area_id
  const { data: properties } = await supabase
    .from("properties") // تأكد أن اسم الجدول في داتابيز هو properties
    .select("*")
    .eq("area_id", area.id); // استخدام id المنطقة لجلب عقاراتها

  // 4. المناطق المشابهة
  const similarAreas = getSimilarAreas(
    hadayekOctoberAreas,
    area,
    3
  );

  return (
    <AreaTemplate
      area={{
        ...area,
        services: [], // يمكنك أيضاً جلب الخدمات بنفس طريقة العقارات إذا كان لها جدول
        images: images || [],
        properties: properties || [], // ✅ تمرير العقارات للمكون
      }}
      similarAreas={similarAreas}
    />
  );
}