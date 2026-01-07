'use client';

import { useState } from 'react';
import { UploadCloud, FileCog, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnalysisResults } from '@/components/dashboard/analysis-results';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateBasePayFormula, type GenerateBasePayFormulaOutput } from '@/ai/flows/generate-base-pay-formula';
import { useToast } from '@/hooks/use-toast';

export function AnalysisView() {
  const [formulaData, setFormulaData] = useState<GenerateBasePayFormulaOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleStartAnalysis = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await generateBasePayFormula({
        featureNames: ['distance_km', 'duration_min', 'experience_level'],
        featureImportances: [0.6, 0.3, 0.1],
        basePay: 50,
        outlierIdentified: true,
      });
      setFormulaData(data);
    } catch (e: any) {
      const errorMessage = e.message || "An unexpected error occurred during analysis.";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      toast({
        title: "File ready",
        description: `File ${event.target.files[0].name} is ready. Click 'Analyze Pay' to start.`,
      });
    }
  };
  
  const handleReset = () => {
    setFormulaData(null);
    setError(null);
    setIsLoading(false);
  }

  if (error) {
    return (
      <Card className="mx-auto max-w-2xl text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle>Analysis Failed</CardTitle>
          <CardDescription>
            {error}
          </CardDescription>
        </CardHeader>
        <CardContent>
           <Button onClick={handleReset} className="bg-accent text-accent-foreground hover:bg-accent/90">
              Try Again
            </Button>
        </CardContent>
      </Card>
    );
  }

  if (formulaData) {
    return (
      <div className="animate-in fade-in duration-500">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Analysis Complete</h1>
          <Button onClick={handleReset} variant="outline">
            Start New Analysis
          </Button>
        </div>
        <AnalysisResults formulaData={formulaData} />
      </div>
    );
  }

  return (
    <Card className="mx-auto max-w-2xl text-center">
      <CardHeader>
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <UploadCloud className="h-8 w-8" />
        </div>
        <CardTitle>Upload Your Dataset</CardTitle>
        <CardDescription>
          Upload a CSV file with gig work data and click "Analyze Pay" to start.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-6">
          <div className="flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-card hover:border-primary/50 hover:bg-accent/20">
            <p className="text-muted-foreground">Drag & drop your CSV file here</p>
            <p className="text-sm text-muted-foreground">or</p>
            <Button variant="link" asChild className="text-primary">
              <label htmlFor="file-upload">
                Browse files
                <input id="file-upload" type="file" className="sr-only" accept=".csv" onChange={handleFileChange} />
              </label>
            </Button>
          </div>
           <Button onClick={handleStartAnalysis} disabled={isLoading} className="bg-accent text-accent-foreground hover:bg-accent/90">
            {isLoading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <FileCog className="mr-2 h-5 w-5" />
            )}
            {isLoading ? 'Analyzing...' : 'Analyze Pay'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
