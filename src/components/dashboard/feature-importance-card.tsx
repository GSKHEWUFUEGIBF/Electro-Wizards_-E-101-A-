'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import { BarChart3 } from 'lucide-react';

const chartData = [
  { feature: 'Distance (km)', importance: 0.45, fill: 'var(--color-distance)' },
  { feature: 'Duration (min)', importance: 0.25, fill: 'var(--color-duration)' },
  { feature: 'Experience', importance: 0.15, fill: 'var(--color-experience)' },
  { feature: 'Surge Active', importance: 0.1, fill: 'var(--color-surge)' },
  { feature: 'Tasks Today', importance: 0.05, fill: 'var(--color-tasks)' },
];

const chartConfig = {
  importance: {
    label: 'Importance',
  },
  distance: {
    label: 'Distance (km)',
    color: 'hsl(var(--chart-1))',
  },
  duration: {
    label: 'Duration (min)',
    color: 'hsl(var(--chart-2))',
  },
  experience: {
    label: 'Experience',
    color: 'hsl(var(--chart-3))',
  },
  surge: {
    label: 'Surge Active',
    color: 'hsl(var(--chart-4))',
  },
  tasks: {
    label: 'Tasks Today',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;

export function FeatureImportanceCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-muted-foreground" />
          Key Pay Factors
        </CardTitle>
        <CardDescription>
          This chart shows the most influential factors determining pay rates, based on the uploaded data.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart accessibilityLayer data={chartData} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid horizontal={false} />
            <XAxis type="number" hide />
            <YAxis
              dataKey="feature"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
              className='text-sm'
              width={100}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="importance" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
