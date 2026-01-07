'use client';

import { useState } from 'react';
import { UploadCloud, FileCog, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnalysisResults } from '@/components/dashboard/analysis-results';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { GenerateBasePayFormulaOutput } from '@/ai/flows/generate-base-pay-formula';
import { useToast } from '@/hooks/use-toast';

type AnalysisViewProps = {
  initialFormulaData: GenerateBasePayFormulaOutput | null;
  error?: string;
};

export function AnalysisView({ initialFormulaData, error: initialError }: AnalysisViewProps) {
  const [formulaData, setFormulaData] = useState<GenerateBasePayFormulaOutput | null>(initialFormulaData);
  const [error, setError] = useState<string | null>(initialError || null);
  const { toast } = useToast();

  const handleReset = () => {
    // This is a client-side reset. To re-run analysis, the user would refresh the page.
    setFormulaData(null);
    setError(null);
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      toast({
        title: "File ready",
        description: `File ${event.target.files[0].name} is ready. Refresh the page or click 'Start New Analysis' to re-analyze.`,
      });
    }
  };

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
           <Button onClick={() => window.location.reload()} className="bg-accent text-accent-foreground hover:bg-accent/90">
              Try Again
            </Button>
        </CardContent>
      </Card>
    );
  }

  if (!formulaData) {
    // This view is shown if data is not available or after a reset.
    // To re-run analysis, the user can refresh the page.
    return (
      <Card className="mx-auto max-w-2xl text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <UploadCloud className="h-8 w-8" />
          </div>
          <CardTitle>Upload Your Dataset</CardTitle>
          <CardDescription>
            Upload a CSV file with gig work data. The analysis will run automatically.
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
             <Button onClick={() => window.location.reload()} className="bg-accent text-accent-foreground hover:bg-accent/90">
              <FileCog className="mr-2 h-5 w-5" />
              Analyze Pay
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Analysis Complete</h1>
        <Button onClick={() => window.location.reload()} variant="outline">
          Start New Analysis
        </Button>
      </div>
      <AnalysisResults formulaData={formulaData} />
    </div>
  );
}
