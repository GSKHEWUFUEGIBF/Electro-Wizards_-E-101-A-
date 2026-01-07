import { BasePayFormulaCard } from './base-pay-formula-card';
import { FeatureImportanceCard } from './feature-importance-card';
import { PayPerKmCard } from './pay-per-km-card';
import { ReportCard } from './report-card';

export function AnalysisResults() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-3">
        <PayPerKmCard />
      </div>
      <div className="lg:col-span-2">
        <FeatureImportanceCard />
      </div>
      <div className="flex flex-col gap-6">
        <BasePayFormulaCard />
        <ReportCard />
      </div>
    </div>
  );
}
