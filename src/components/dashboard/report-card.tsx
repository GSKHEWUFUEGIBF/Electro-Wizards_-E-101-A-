'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { FileDown, Languages, Mail, Loader2 } from 'lucide-react';
import { getReportSummary } from '@/app/actions';
import { Separator } from '../ui/separator';

type ReportCardProps = {
    featureImportanceData: {
        featureNames: string[];
        featureImportances: number[];
    }
}

export function ReportCard({ featureImportanceData }: ReportCardProps) {
  const { toast } = useToast();
  const [summary, setSummary] = useState('');
  const [isGenerating, setIsGenerating] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState<'English' | 'Tamil' | 'Hindi'>('English');

  useEffect(() => {
    async function generateInitialSummary() {
      setIsGenerating(true);
      const initialSummary = await getReportSummary(
        featureImportanceData.featureNames,
        featureImportanceData.featureImportances,
        'English'
      );
      setSummary(initialSummary);
      setIsGenerating(false);
    }
    generateInitialSummary();
  }, [featureImportanceData]);

  const handleExport = (format: string) => {
    toast({
      title: 'Exporting Report',
      description: `Your report is being generated as a ${format.toUpperCase()} file.`,
    });
  };

  const handleSendEmail = () => {
    toast({
      title: 'Report Sent',
      description: 'The report has been successfully emailed.',
    });
  };

  const handleLanguageChange = async (lang: 'English' | 'Tamil' | 'Hindi') => {
    if (lang === selectedLanguage) return;

    setIsGenerating(true);
    setSelectedLanguage(lang);
    const newSummary = await getReportSummary(
        featureImportanceData.featureNames,
        featureImportanceData.featureImportances,
        lang
    );
    setSummary(newSummary);
    setIsGenerating(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileDown className="h-5 w-5 text-muted-foreground" />
          Generate Report
        </CardTitle>
        <CardDescription>
          Export your analysis or send it to an authority.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-medium flex items-center gap-2"><Languages className="h-4 w-4 text-muted-foreground"/> Plain Language Summary</p>
          <div className="relative min-h-[120px] rounded-lg border bg-muted/50 p-3">
            {isGenerating && (
              <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-background/80">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            )}
            <p className="text-sm text-muted-foreground">{summary}</p>
          </div>
          <Select onValueChange={(value) => handleLanguageChange(value as any)} defaultValue="English">
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="Hindi">Hindi</SelectItem>
              <SelectItem value="Tamil">Tamil</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Separator />
        <div className="space-y-2">
            <p className="text-sm font-medium">Export Options</p>
            <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => handleExport('csv')}>CSV</Button>
                <Button variant="outline" className="flex-1" onClick={() => handleExport('json')}>JSON</Button>
                <Button variant="outline" className="flex-1" onClick={() => handleExport('pdf')}>PDF</Button>
            </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium">Email Report</p>
          <div className="flex gap-2">
            <Input type="email" placeholder="authority@example.com" />
            <Button onClick={handleSendEmail} className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Mail className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
