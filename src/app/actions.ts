'use server';

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
