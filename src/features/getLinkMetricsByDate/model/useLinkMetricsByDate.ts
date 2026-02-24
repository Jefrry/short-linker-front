import { useState } from 'react';
import { DateRange } from 'react-day-picker';

import { useQuery } from '@tanstack/react-query';
import { endOfDay, getUnixTime, startOfDay, subDays } from 'date-fns';

import { linkApi } from '@/entities/link';

export const useLinkMetricsByDate = (id: string | undefined) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });

  const {
    data: metrics,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['link-metrics', id, dateRange?.from, dateRange?.to],
    queryFn: () => {
      if (!id || !dateRange?.from || !dateRange?.to) return null;

      return linkApi.getLinkMetrics(
        id,
        getUnixTime(startOfDay(dateRange.from)),
        getUnixTime(endOfDay(dateRange.to)),
      );
    },
    enabled: !!id && !!dateRange?.from && !!dateRange?.to,
  });

  return {
    metrics,
    isLoading,
    isError,
    dateRange,
    setDateRange,
  };
};
