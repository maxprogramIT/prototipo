'use server';

/**
 * @fileOverview An AI agent to generate decoration ideas for a party.
 *
 * - generateDecorationIdeas - A function that generates decoration ideas for a party.
 * - GenerateDecorationIdeasInput - The input type for the generateDecorationIdeas function.
 * - GenerateDecorationIdeasOutput - The return type for the generateDecorationIdeas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDecorationIdeasInputSchema = z.object({
  themeDescription: z
    .string()
    .describe('A description of the desired party theme.'),
  colorPalette: z.string().describe('Preferred color palettes for the party.'),
  venueDescription: z.string().describe('Description of the selected venue.'),
});
export type GenerateDecorationIdeasInput = z.infer<
  typeof GenerateDecorationIdeasInputSchema
>;

const GenerateDecorationIdeasOutputSchema = z.object({
  decorationIdeas: z
    .string()
    .describe('AI-generated decoration and arrangement ideas.'),
});
export type GenerateDecorationIdeasOutput = z.infer<
  typeof GenerateDecorationIdeasOutputSchema
>;

export async function generateDecorationIdeas(
  input: GenerateDecorationIdeasInput
): Promise<GenerateDecorationIdeasOutput> {
  return generateDecorationIdeasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDecorationIdeasPrompt',
  input: {schema: GenerateDecorationIdeasInputSchema},
  output: {schema: GenerateDecorationIdeasOutputSchema},
  prompt: `You are an AI assistant specialized in generating decoration ideas for parties.

  Based on the user's description of the desired party theme, preferred color palettes, and the selected venue, generate creative and practical decoration and arrangement ideas.

  Theme Description: {{{themeDescription}}}
  Color Palette: {{{colorPalette}}}
  Venue Description: {{{venueDescription}}}`,
});

const generateDecorationIdeasFlow = ai.defineFlow(
  {
    name: 'generateDecorationIdeasFlow',
    inputSchema: GenerateDecorationIdeasInputSchema,
    outputSchema: GenerateDecorationIdeasOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
