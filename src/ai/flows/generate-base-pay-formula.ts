'use server';

/**
 * @fileOverview Generates a human-readable formula for base pay based on the data.
 *
 * - generateBasePayFormula - A function that generates the base pay formula.
 * - GenerateBasePayFormulaInput - The input type for the generateBasePayFormula function.
 * - GenerateBasePayFormulaOutput - The return type for the generateBasePayFormula function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBasePayFormulaInputSchema = z.object({
  featureNames: z.array(z.string()).describe('The names of the features used in the model.'),
  featureImportances: z.array(z.number()).describe('The importance values of the features.'),
  basePay: z.number().describe('The base pay amount.'),
  outlierIdentified: z.boolean().describe('Indicates whether outliers were identified in the data.'),
});
export type GenerateBasePayFormulaInput = z.infer<typeof GenerateBasePayFormulaInputSchema>;

const GenerateBasePayFormulaOutputSchema = z.object({
  formula: z.string().describe('A human-readable formula for calculating base pay.'),
});
export type GenerateBasePayFormulaOutput = z.infer<typeof GenerateBasePayFormulaOutputSchema>;

export async function generateBasePayFormula(input: GenerateBasePayFormulaInput): Promise<GenerateBasePayFormulaOutput> {
  return generateBasePayFormulaFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBasePayFormulaPrompt',
  input: {
    schema: GenerateBasePayFormulaInputSchema,
  },
  output: {
    schema: GenerateBasePayFormulaOutputSchema,
  },
  prompt: `You are an expert in explaining machine learning models to non-technical users.

  Based on the feature importances from a Random Forest model, generate a human-readable formula for calculating base pay.

  The feature names are: {{{featureNames}}}
  The feature importances are: {{{featureImportances}}}
  The base pay amount is: {{{basePay}}}
  Outlier Identified: {{{outlierIdentified}}}

  The formula should clearly show how each feature contributes to the final pay rate. Provide a simple explanation of the formula.
  If outliers were identified, mention that the formula is an estimate and may not be accurate for all cases. Focus on the key factors determining pay.
  Limit the formula explanation to 1-2 short sentences.

  Example Output:
  \"The base pay is calculated as follows: Base Pay + (Feature 1 Importance * Feature 1 Value) + (Feature 2 Importance * Feature 2 Value). This formula estimates pay based on the most influential factors.\"`,
});

const generateBasePayFormulaFlow = ai.defineFlow(
  {
    name: 'generateBasePayFormulaFlow',
    inputSchema: GenerateBasePayFormulaInputSchema,
    outputSchema: GenerateBasePayFormulaOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
