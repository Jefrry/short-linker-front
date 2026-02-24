import { DateRange } from 'react-day-picker';

import { differenceInDays, format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/shared/lib';

import { Button } from '@/shared/ui/shadcn/button';
import { Calendar } from '@/shared/ui/shadcn/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/shadcn/popover';

interface DateRangePickerProps {
  className?: string;
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
  maxDays?: number;
}

const DateDisplay = ({ date }: { date: DateRange | undefined }) => {
  if (!date?.from) {
    return <span>Pick a date</span>;
  }

  if (date.to) {
    const formattedDate = `${format(date.from, 'LLL dd, y')} - ${format(date.to, 'LLL dd, y')}`;
    return <span>{formattedDate}</span>;
  }

  return <>{format(date.from, 'LLL dd, y')}</>;
};

export const DateRangePicker = ({
  className,
  date,
  setDate,
  maxDays = 90,
}: DateRangePickerProps) => {
  const handleSelect = (newRange: DateRange | undefined) => {
    if (newRange?.from && newRange?.to) {
      const days = differenceInDays(newRange.to, newRange.from);

      if (days > maxDays) {
        return;
      }
    }

    setDate(newRange);
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              'w-[300px] justify-start text-left font-normal cursor-pointer',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />

            <DateDisplay date={date} />
          </Button>
        </PopoverTrigger>

        <PopoverContent align="start" className="w-auto p-0">
          <Calendar
            defaultMonth={date?.from}
            disabled={(date) => date > new Date()}
            mode="range"
            numberOfMonths={2}
            selected={date}
            onSelect={handleSelect}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
