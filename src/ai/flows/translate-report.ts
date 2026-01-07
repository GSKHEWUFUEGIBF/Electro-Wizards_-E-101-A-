'use server';

/**
 * @fileOverview Translates a given text report into a specified language.
 *
 * - translateReport - A function that translates the input report.
 * - TranslateReportInput - The input type for the translateReport function.
 * - TranslateReportOutput - The return type for the translateReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranslateReportInputSchema = z.object({
  text: z.string().describe('The text to translate.'),
  language: z.enum(['English', 'Tamil', 'Hindi']).describe('The target language for translation.'),
});
export type TranslateReportInput = z.infer<typeof TranslateReportInputSchema>;

const TranslateReportOutputSchema = z.object({
  translatedText: z.string().describe('The translated text.'),
});
export type TranslateReportOutput = z.infer<typeof TranslateReportOutputSchema>;

export async function translateReport(input: TranslateReportInput): Promise<TranslateReportOutput> {
  return translateReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'translateReportPrompt',
  input: {schema: TranslateReportInputSchema},
  output: {schema: TranslateReportOutputSchema},
  prompt: `Translate the following text to {{language}}:\n\n{{text}}`,
});

const translateReportFlow = ai.defineFlow(
  {
    name: 'translateReportFlow',
    inputSchema: TranslateReportInputSchema,
    outputSchema: TranslateReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
