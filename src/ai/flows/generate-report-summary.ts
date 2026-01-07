'use server';

/**
 * @fileOverview Generates a summary report based on feature importance.
 *
 * - generateReportSummary - A function that generates and translates the report.
 * - GenerateReportSummaryInput - The input type for the function.
 * - GenerateReportSummaryOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateReportSummaryInputSchema = z.object({
  featureNames: z.array(z.string()).describe('The names of the features used in the model.'),
  featureImportances: z.array(z.number()).describe('The importance values (weights) of the features.'),
  language: z.enum(['English', 'Tamil', 'Hindi']).describe('The target language for the summary.'),
});
export type GenerateReportSummaryInput = z.infer<typeof GenerateReportSummaryInputSchema>;

const GenerateReportSummaryOutputSchema = z.object({
  summary: z.string().describe('The generated and translated summary.'),
});
export type GenerateReportSummaryOutput = z.infer<typeof GenerateReportSummaryOutputSchema>;


export async function generateReportSummary(input: GenerateReportSummaryInput): Promise<GenerateReportSummaryOutput> {
  return generateReportSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateReportSummaryPrompt',
  input: {
    schema: GenerateReportSummaryInputSchema,
  },
  output: {
    schema: GenerateReportSummaryOutputSchema,
  },
  prompt: `You are an expert at creating simple, clear summaries of complex data for non-technical users.
Your task is to generate a short summary explaining the key factors that influence pay for gig workers.

Here is the data:
- Feature Names: {{{featureNames}}}
- Feature Importances: {{{featureImportances}}}

Instructions:
1.  Create a sentence explaining what the main factors are that determine pay.
2.  For each feature, state its impact as a percentage. The importance values are decimals, so convert them to percentages (e.g., 0.6 becomes 60%).
3.  Mention that outliers were detected, suggesting some payments deviate significantly from the average.
4.  Recommend a review of jobs with unusually low pay-per-kilometer.
5.  Combine these points into a concise, easy-to-read paragraph.
6.  Translate the final summary into the target language: {{language}}.

Example for English:
"The analysis indicates pay rates are primarily influenced by distance (60% impact) and duration (30% impact). Experience level has a smaller effect (10% impact). Outliers were detected, suggesting some payments deviate significantly from the average. We recommend a review of jobs with unusually low pay-per-kilometer."
`,
});

const generateReportSummaryFlow = ai.defineFlow(
    {
      name: 'generateReportSummaryFlow',
      inputSchema: GenerateReportSummaryInputSchema,
      outputSchema: GenerateReportSummaryOutputSchema,
    },
    async (input) => {
        const { output } = await prompt(input);
        return output!;
    }
);
