import { AreaItem, AreaCategory } from "@/data/hadayekOctoberAreas";
import { calculateAreaScore } from "./areaScore";

export function getSimilarAreas(
  allAreas: AreaCategory[],
  currentArea: AreaItem,
  limit = 3
): AreaItem[] {
  const currentScore = calculateAreaScore(currentArea);

  return allAreas
    .flatMap(cat => cat.areas)
    .filter(area => area.slug !== currentArea.slug)
    .map(area => ({
      area,
      scoreDiff: Math.abs(
        calculateAreaScore(area) - currentScore
      ),
    }))
    .sort((a, b) => a.scoreDiff - b.scoreDiff)
    .slice(0, limit)
    .map(item => item.area);
}
