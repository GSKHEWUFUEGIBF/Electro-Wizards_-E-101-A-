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
  { feature: 'Time of Day', importance: 0.35, fill: 'var(--color-time)' },
  { feature: 'Distance (km)', importance: 0.28, fill: 'var(--color-distance)' },
  { feature: 'Weather', importance: 0.18, fill: 'var(--color-weather)' },
  { feature: 'Area Demand', importance: 0.12, fill: 'var(--color-demand)' },
  { feature: 'Day of Week', importance: 0.07, fill: 'var(--color-day)' },
];

const chartConfig = {
  importance: {
    label: 'Importance',
  },
  time: {
    label: 'Time of Day',
    color: 'hsl(var(--chart-1))',
  },
  distance: {
    label: 'Distance (km)',
    color: 'hsl(var(--chart-2))',
  },
  weather: {
    label: 'Weather',
    color: 'hsl(var(--chart-3))',
  },
  demand: {
    label: 'Area Demand',
    color: 'hsl(var(--chart-4))',
  },
  day: {
    label: 'Day of Week',
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
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="importance" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
