import { notFound } from "next/navigation";
import { hadayekOctoberAreas } from "@/data/hadayekOctoberAreas";
import AreaTemplate from "@/components/AreaTemplate";
import { getSimilarAreas } from "@/lib/similarAreas";
import { calculateAreaScore } from "@/lib/areaScore";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function AreaPage({ params }: Props) {
  const { slug } = await params;

  const area = hadayekOctoberAreas
    .flatMap((group) => group.areas)
    .find((item) => item.slug === slug);

  if (!area) {
    notFound();
  }

  const areaScore = calculateAreaScore(area);

  const similarAreas = getSimilarAreas(
    hadayekOctoberAreas,
    area,
    3
  );

  return (
    <AreaTemplate
      area={area}
      similarAreas={similarAreas}
    />
  );
}
