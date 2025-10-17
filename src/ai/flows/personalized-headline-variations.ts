'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating personalized headline variations for a landing page.
 *
 * It includes:
 * - `generatePersonalizedHeadline`: Function to generate personalized headline variations.
 * - `PersonalizedHeadlineInput`: Input type for the function.
 * - `PersonalizedHeadlineOutput`: Output type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedHeadlineInputSchema = z.object({
  userSegment: z
    .string()
    .describe('The user segment to personalize the headline for.'),
  abTestResults: z
    .string()
    .describe('The A/B testing results for different headline variations.'),
  existingHeadline: z.string().describe('The existing headline on the landing page.'),
  numberOfVariations: z
    .number()
    .default(3)
    .describe('The number of headline variations to generate.'),
});
export type PersonalizedHeadlineInput = z.infer<typeof PersonalizedHeadlineInputSchema>;

const PersonalizedHeadlineOutputSchema = z.object({
  headlineVariations: z
    .array(z.string())
    .describe('An array of personalized headline variations.'),
});
export type PersonalizedHeadlineOutput = z.infer<typeof PersonalizedHeadlineOutputSchema>;

export async function generatePersonalizedHeadline(input: PersonalizedHeadlineInput): Promise<PersonalizedHeadlineOutput> {
  return personalizedHeadlineFlow(input);
}

const personalizedHeadlinePrompt = ai.definePrompt({
  name: 'personalizedHeadlinePrompt',
  input: {schema: PersonalizedHeadlineInputSchema},
  output: {schema: PersonalizedHeadlineOutputSchema},
  prompt: `You are an expert marketing copywriter specializing in creating high-converting headlines.

You are tasked with generating personalized headline variations for a landing page based on user segment and A/B testing results.

Here's the existing headline: {{{existingHeadline}}}
User Segment: {{{userSegment}}}
A/B Testing Results: {{{abTestResults}}}

Generate {{{numberOfVariations}}} headline variations that are personalized to the user segment and incorporate insights from the A/B testing results to maximize engagement.

Output the headline variations as a JSON array of strings.

Headlines:
`,
});

const personalizedHeadlineFlow = ai.defineFlow(
  {
    name: 'personalizedHeadlineFlow',
    inputSchema: PersonalizedHeadlineInputSchema,
    outputSchema: PersonalizedHeadlineOutputSchema,
  },
  async input => {
    const {output} = await personalizedHeadlinePrompt(input);
    return output!;
  }
);
