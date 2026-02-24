import { format } from 'date-fns';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import { LinkMetrics } from '@/entities/link';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/shadcn/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/shared/ui/shadcn/chart';

interface LinkStatisticsProps {
  isLoading: boolean;
  isError: boolean;
  metrics: LinkMetrics[] | null | undefined;
}

const chartConfig = {
  count: {
    label: 'Visits',
  },
} satisfies ChartConfig;

export const LinkStatistics = ({ isLoading, isError, metrics }: LinkStatisticsProps) => {
  if (isLoading) {
    return <div className="h-[400px] w-full animate-pulse rounded-xl bg-muted" />;
  }

  if (isError) {
    return (
      <div className="flex h-[400px] items-center justify-center rounded-xl border border-dashed text-destructive">
        Failed to load statistics
      </div>
    );
  }

  if (!metrics || metrics.length === 0) {
    return (
      <div className="flex h-[400px] items-center justify-center rounded-xl border border-dashed text-muted-foreground">
        No data available for the selected period
      </div>
    );
  }

  const totalVisits = metrics.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Link Statistics</CardTitle>

          <CardDescription>Showing total visits for the selected period</CardDescription>
        </div>

        <div className="flex">
          <div className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
            <span className="text-xs text-muted-foreground">Total Visits</span>

            <span className="text-lg font-bold leading-none sm:text-3xl">
              {totalVisits.toLocaleString()}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer className="aspect-auto h-[250px] w-full" config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={metrics}
            margin={{
              left: 19,
              right: 12,
              top: 12,
            }}
          >
            <CartesianGrid vertical={false} />

            <XAxis
              axisLine={false}
              dataKey="date"
              tickLine={false}
              tickFormatter={(value: unknown) => {
                const date = new Date(value as string);
                return format(date, 'MMM d');
              }}
            />

            <ChartTooltip content={<ChartTooltipContent indicator="line" />} cursor={false} />

            <Area dataKey="count" fillOpacity={0.4} type="linear" />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
