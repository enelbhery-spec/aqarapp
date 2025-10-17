"use server";

import { generatePersonalizedHeadline, PersonalizedHeadlineInput, PersonalizedHeadlineOutput } from "@/ai/flows/personalized-headline-variations";
import { z } from "zod";

const PersonalizedHeadlineInputSchema = z.object({
  userSegment: z.string(),
  abTestResults: z.string(),
  existingHeadline: z.string(),
  numberOfVariations: z.number(),
});

type PersonalizedHeadlineResult = PersonalizedHeadlineOutput & { error?: string };

export async function getPersonalizedHeadlines(input: PersonalizedHeadlineInput): Promise<PersonalizedHeadlineResult> {
    const parsedInput = PersonalizedHeadlineInputSchema.safeParse(input);

    if (!parsedInput.success) {
        return { headlineVariations: [], error: "Invalid input." };
    }

    try {
        const result = await generatePersonalizedHeadline(parsedInput.data);
        return result;
    } catch (e) {
        console.error(e);
        const error = e instanceof Error ? e.message : "An unexpected error occurred.";
        return { headlineVariations: [], error };
    }
}
