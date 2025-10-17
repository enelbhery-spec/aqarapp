'use server';
/**
 * @fileOverview This file defines a Genkit flow for extracting structured property details from unstructured text.
 *
 * It includes:
 * - `extractPropertyDetails`: Function to process a text description and extract property information.
 * - `ExtractPropertyDetailsInput`: Input type for the function (the raw text).
 * - `ExtractPropertyDetailsOutput`: Output type for the function (structured property data).
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractPropertyDetailsInputSchema = z.object({
  description: z
    .string()
    .describe('The raw text description of a real estate listing.'),
});
export type ExtractPropertyDetailsInput = z.infer<typeof ExtractPropertyDetailsInputSchema>;

const ExtractPropertyDetailsOutputSchema = z.object({
  title: z.string().describe("A suitable title for the listing, extracted or inferred from the text. Example: 'Apartment for sale in Zamalek'").nullable(),
  propertyType: z.enum(['apartment', 'villa', 'land', 'shop']).describe("The type of property. Must be one of: 'apartment', 'villa', 'land', 'shop'.").nullable(),
  location: z.string().describe("The location of the property, including city and neighborhood if available. Example: 'Zamalek, Cairo'").nullable(),
  price: z.number().describe('The price of the property as a number.').nullable(),
  bedrooms: z.number().describe('The number of bedrooms.').nullable(),
  bathrooms: z.number().describe('The number of bathrooms.').nullable(),
  area: z.number().describe('The area of the property in square meters.').nullable(),
  detailedDescription: z.string().describe("The full, detailed description of the property, cleaned up if necessary.").nullable(),
  floor: z.number().describe('The floor number of the property.').nullable(),
  phone: z.string().describe('The contact phone number for the listing.').nullable(),
});
export type ExtractPropertyDetailsOutput = z.infer<typeof ExtractPropertyDetailsOutputSchema>;

export async function extractPropertyDetails(input: ExtractPropertyDetailsInput): Promise<ExtractPropertyDetailsOutput> {
  return extractPropertyDetailsFlow(input);
}

const extractPropertyDetailsPrompt = ai.definePrompt({
  name: 'extractPropertyDetailsPrompt',
  input: {schema: ExtractPropertyDetailsInputSchema},
  output: {schema: ExtractPropertyDetailsOutputSchema},
  prompt: `You are an expert real estate data analyst. Your task is to extract structured information from an unstructured text description of a property listing in Egypt.

Analyze the following text carefully and extract the requested fields. All monetary values are in Egyptian Pounds (EGP). Infer data when it's not explicitly stated but strongly implied (e.g., "شقة" means propertyType is 'apartment').

If a piece of information, like the price, is not present or mentioned at all in the text, you MUST return null for that specific field. Do not invent data.

Property Description:
{{{description}}}
`,
});

const extractPropertyDetailsFlow = ai.defineFlow(
  {
    name: 'extractPropertyDetailsFlow',
    inputSchema: ExtractPropertyDetailsInputSchema,
    outputSchema: ExtractPropertyDetailsOutputSchema,
  },
  async input => {
    const {output} = await extractPropertyDetailsPrompt(input);
    return output!;
  }
);
