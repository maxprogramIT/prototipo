'use server';

/**
 * @fileOverview This file defines a Genkit flow for recommending vendors based on event details.
 *
 * The flow takes into account the event type, budget, and venue to provide suitable vendor recommendations.
 * It exports the `getVendorRecommendations` function, along with the input and output types.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VendorRecommendationsInputSchema = z.object({
  eventType: z.string().describe('The type of event (e.g., birthday, wedding, corporate)'),
  budget: z.number().describe('The budget for the event in USD.'),
  venue: z.string().describe('The name or description of the venue.'),
});

export type VendorRecommendationsInput = z.infer<
  typeof VendorRecommendationsInputSchema
>;

const VendorRecommendationsOutputSchema = z.object({
  vendorRecommendations: z
    .array(z.string())
    .describe('A list of recommended vendors with brief descriptions.'),
});

export type VendorRecommendationsOutput = z.infer<
  typeof VendorRecommendationsOutputSchema
>;

export async function getVendorRecommendations(
  input: VendorRecommendationsInput
): Promise<VendorRecommendationsOutput> {
  return vendorRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'vendorRecommendationsPrompt',
  input: {schema: VendorRecommendationsInputSchema},
  output: {schema: VendorRecommendationsOutputSchema},
  prompt: `You are a party planning expert. Based on the event type,
    budget, and venue, recommend suitable vendors. Provide a brief description of each vendor.

    Event Type: {{{eventType}}}
    Budget: {{{budget}}} USD
    Venue: {{{venue}}}

    Return vendors suitable for the event, that are within budget, and appropriate for the venue.
`,
});

const vendorRecommendationsFlow = ai.defineFlow(
  {
    name: 'vendorRecommendationsFlow',
    inputSchema: VendorRecommendationsInputSchema,
    outputSchema: VendorRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
