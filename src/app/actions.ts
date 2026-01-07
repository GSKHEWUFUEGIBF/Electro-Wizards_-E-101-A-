'use server';

import { generateReportSummary } from '@/ai/flows/generate-report-summary';
import { translateReport } from '@/ai/flows/translate-report';

export async function getTranslation(
  text: string,
  language: 'English' | 'Tamil' | 'Hindi'
) {
  try {
    const result = await translateReport({ text, language });
    return result.translatedText;
  } catch (error) {
    console.error('Translation failed:', error);
    return 'Error: Could not translate text.';
  }
}

export async function getReportSummary(
  featureNames: string[],
  featureImportances: number[],
  language: 'English' | 'Tamil' | 'Hindi'
) {
  try {
    const result = await generateReportSummary({ featureNames, featureImportances, language });
    return result.summary;
  } catch (error) {
    console.error('Summary generation failed:', error);
    return 'Error: Could not generate summary.';
  }
}
