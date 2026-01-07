import { AnalysisView } from './analysis-view';
import { generateBasePayFormula } from '@/ai/flows/generate-base-pay-formula';

export default async function DashboardPage() {
  const formulaData = await generateBasePayFormula({
    featureNames: ['Time of Day', 'Distance (km)', 'Weather'],
    featureImportances: [0.35, 0.28, 0.18],
    basePay: 1290.5,
    outlierIdentified: true,
  });

  return <AnalysisView formulaData={formulaData} />;
}
