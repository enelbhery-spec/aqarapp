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

  // ✅ جلب بيانات المنطقة من الداتابيز
  const { data: area, error } = await supabase
    .from("areas")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !area) {
    notFound();
  }

  // ✅ جلب صور المنطقة
  const { data: images } = await supabase
    .from("area_images")
    .select("image_url")
    .eq("area_slug", slug);

  // ✅ المناطق المشابهة
  const similarAreas = getSimilarAreas(
    hadayekOctoberAreas,
    area,
    3
  );

  return (
    <AreaTemplate
      area={{
        ...area,
        services: [],
        images: images || [],
      }}
      similarAreas={similarAreas}
    />
  );
}