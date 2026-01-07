import { generateBasePayFormula } from '@/ai/flows/generate-base-pay-formula';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Calculator, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export async function BasePayFormulaCard() {
  const formulaData = await generateBasePayFormula({
    featureNames: ['Time of Day', 'Distance (km)', 'Weather'],
    featureImportances: [0.35, 0.28, 0.18],
    basePay: 15.5,
    outlierIdentified: true,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-muted-foreground" />
          Base Pay Formula
        </CardTitle>
        <CardDescription className='flex items-center gap-1'>
          An estimated formula for calculating base pay.
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-3 w-3 cursor-pointer text-muted-foreground"/>
              </TooltipTrigger>
              <TooltipContent>
                <p>This formula is an AI-generated estimate based on the data provided. <br/> Since outliers were detected, it may not be accurate for all cases.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md bg-muted p-4 text-center">
          <p className="font-mono text-sm text-foreground">
            {formulaData.formula}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
