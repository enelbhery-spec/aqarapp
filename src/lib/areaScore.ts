import { AreaItem } from "@/data/hadayekOctoberAreas";

export function calculateAreaScore(area: AreaItem): number {
  const properties = area.propertiesCount ?? 0;
  const price = area.avgPriceValue ?? 0;
  const types = area.typesCount ?? 0;
  const recent = area.recentAds ?? 0;

  const propertiesScore = Math.min(properties / 150, 1) * 40;
  const priceScore = Math.min(price / 2000, 1) * 25;
  const typesScore = Math.min(types / 5, 1) * 20;
  const recentScore = Math.min(recent / 30, 1) * 15;

  return Math.round(
    propertiesScore +
    priceScore +
    typesScore +
    recentScore
  );
}
