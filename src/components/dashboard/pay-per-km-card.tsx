'use client';

import { TrendingUp } from 'lucide-react';
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from 'recharts';

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
  ChartConfig
} from '@/components/ui/chart';

const chartData = [
  { km: '2', pay: 258.12 },
  { km: '4', pay: 241.46 },
  { km: '6', pay: 291.4 },
  { km: '8', pay: 266.44 },
  { km: '10', pay: 316.36 },
  { km: '12', pay: 299.72 },
  { km: '14', pay: 341.34 },
  { km: '16', pay: 324.68 },
  { km: '18', pay: 349.66 },
  { km: '20', pay: 333.0 },
];

const chartConfig = {
  pay: {
    label: 'Avg. Pay (₹)',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export function PayPerKmCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-muted-foreground" />
          Average Pay per Kilometer
        </CardTitle>
        <CardDescription>
          This chart highlights the average pay per kilometer, showing the trend as distance increases.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="km"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${value} km`}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `₹${value}`}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="pay"
              type="monotone"
              stroke="var(--color-pay)"
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
