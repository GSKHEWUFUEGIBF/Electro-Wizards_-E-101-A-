'use client';

import { useState, useEffect } from 'react';
import { UploadCloud, FileCog, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnalysisResults } from '@/components/dashboard/analysis-results';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { GenerateBasePayFormulaOutput } from '@/ai/flows/generate-base-pay-formula';

type AnalysisViewProps = {
  formulaData: GenerateBasePayFormulaOutput;
};

export function AnalysisView({ formulaData }: AnalysisViewProps) {
  const [analysisState, setAnalysisState] = useState<
    'idle' | 'analyzing' | 'complete'
  >('idle');
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (analysisState === 'analyzing') {
      timer = setTimeout(() => {
        setAnalysisState('complete');
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [analysisState]);
  
  useEffect(() => {
    if (analysisState === 'complete') {
        setShowResults(true);
    } else {
        setShowResults(false);
    }
  }, [analysisState]);

  const handleStartAnalysis = () => {
    setAnalysisState('analyzing');
  };

  const handleReset = () => {
    setAnalysisState('idle');
  };

  if (analysisState === 'idle') {
    return (
      <Card className="mx-auto max-w-2xl text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <UploadCloud className="h-8 w-8" />
          </div>
          <CardTitle>Upload Your Dataset</CardTitle>
          <CardDescription>
            Upload a CSV file with gig work data to analyze pay rates and ensure fairness.
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
                  <input id="file-upload" type="file" className="sr-only" accept=".csv" />
                </label>
              </Button>
            </div>
            <Button
              size="lg"
              onClick={handleStartAnalysis}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <FileCog className="mr-2 h-5 w-5" />
              Analyze Pay
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (analysisState === 'analyzing') {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card p-12 shadow-sm" style={{minHeight: '50vh'}}>
        <Loader2 className="mb-4 h-12 w-12 animate-spin text-primary" />
        <h2 className="text-2xl font-semibold text-foreground">Analyzing Data...</h2>
        <p className="mt-2 text-muted-foreground">
          Our ML pipeline is processing your data. This might take a moment.
        </p>
      </div>
    );
  }

  if (analysisState === 'complete') {
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

  return null;
}
