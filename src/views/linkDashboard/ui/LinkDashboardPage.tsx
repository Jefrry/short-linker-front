import { Link as RouterLink, useParams } from 'react-router';

import { ChevronLeft } from 'lucide-react';

import { DateRangePicker } from '@/widgets/dateRangePicker';
import { LinkStatistics } from '@/widgets/linkStatistics';

import { useLinkMetricsByDate } from '@/features/getLinkMetricsByDate';

import { LinkHistoryItem, useLink } from '@/entities/link';

import { Button } from '@/shared/ui/shadcn/button';

export const LinkDashboardPage = () => {
  const { id } = useParams<{ id: string }>();

  const { link, isLoading: isLinkLoading } = useLink(id ?? '');
  const { metrics, isLoading, isError, dateRange, setDateRange } = useLinkMetricsByDate(id);

  if (!id) return <div>Link ID not found</div>;

  return (
    <div className="container mx-auto flex flex-col gap-8 py-12">
      <div className="flex items-center gap-4">
        <Button asChild size="icon" variant="ghost">
          <RouterLink to="/dashboard">
            <ChevronLeft className="h-4 w-4" />
          </RouterLink>
        </Button>

        <h1 className="text-3xl font-bold">Link Dashboard</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[350px_1fr]">
        <div className="flex flex-col gap-6">
          <section>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Link Information
            </h2>

            {link && <LinkHistoryItem data={link} />}

            {isLinkLoading && <div className="h-24 w-full animate-pulse rounded-lg bg-muted" />}
          </section>

          <section>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Filters
            </h2>

            <DateRangePicker date={dateRange} maxDays={90} setDate={setDateRange} />
          </section>
        </div>

        <div className="flex flex-col gap-6">
          <section>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Statistics
            </h2>

            <LinkStatistics isError={isError} isLoading={isLoading} metrics={metrics} />
          </section>
        </div>
      </div>
    </div>
  );
};
