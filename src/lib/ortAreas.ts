import { AreaCategory, AreaItem } from "@/data/hadayekOctoberAreas";
import { calculateAreaScore } from "./areaScore";

export function getSortedAreas(categories: AreaCategory[]): AreaItem[] {
  return categories
    .flatMap(category => category.areas)
    .sort((a, b) => {
      return calculateAreaScore(b) - calculateAreaScore(a);
    });
}
