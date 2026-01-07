import { AnalysisView } from './analysis-view';
import { generateBasePayFormula } from '@/ai/flows/generate-base-pay-formula';

export default async function DashboardPage() {
  const formulaData = await generateBasePayFormula({
    featureNames: [
      'distance_km',
      'duration_min',
      'experience_level',
      'surge_active',
    ],
    featureImportances: [0.45, 0.25, 0.15, 0.1],
    basePay: 50,
    outlierIdentified: true,
  });

  return <AnalysisView formulaData={formulaData} />;
}
