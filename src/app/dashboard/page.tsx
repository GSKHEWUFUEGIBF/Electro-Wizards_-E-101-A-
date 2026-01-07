import { AnalysisView } from './analysis-view';
import { generateBasePayFormula, type GenerateBasePayFormulaOutput } from '@/ai/flows/generate-base-pay-formula';

export default async function DashboardPage() {
  let formulaData: GenerateBasePayFormulaOutput | null = null;
  let error: string | undefined;

  try {
    formulaData = await generateBasePayFormula({
      featureNames: ['distance_km', 'duration_min', 'experience_level'],
      featureImportances: [0.6, 0.3, 0.1],
      basePay: 50,
      outlierIdentified: true,
    });
  } catch (e: any) {
    console.error("Failed to generate formula on server:", e);
    error = e.message || "An unexpected error occurred during analysis.";
  }

  return <AnalysisView initialFormulaData={formulaData} error={error} />;
}
