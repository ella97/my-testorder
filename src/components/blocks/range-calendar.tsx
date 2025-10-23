import {
  endOfMonth,
  endOfYear,
  format,
  startOfMonth,
  startOfYear,
  subDays,
  subMonths,
  subYears,
} from 'date-fns';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CalendarIcon, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { Separator } from '@/components/ui/separator';
import { Calendar } from '@/components/blocks/calendar';

export default function RangeCalendar({}) {
  const today = new Date();
  const yesterday = {
    from: subDays(today, 1),
    to: subDays(today, 1),
  };
  const last7Days = {
    from: subDays(today, 6),
    to: today,
  };
  const last30Days = {
    from: subDays(today, 29),
    to: today,
  };
  const monthToDate = {
    from: startOfMonth(today),
    to: today,
  };
  const lastMonth = {
    from: startOfMonth(subMonths(today, 1)),
    to: endOfMonth(subMonths(today, 1)),
  };
  const yearToDate = {
    from: startOfYear(today),
    to: today,
  };
  const lastYear = {
    from: startOfYear(subYears(today, 1)),
    to: endOfYear(subYears(today, 1)),
  };
  const [month, setMonth] = useState(today);
  const [date, setDate] = useState<DateRange | undefined>(last7Days);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size='sm'
          variant='outline'
          className={cn(
            'group bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]',
            !date && 'text-muted-foreground'
          )}
        >
          <span className={cn('truncate', !date && 'text-muted-foreground')}>
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              'Select a date range'
            )}
          </span>
          <CalendarIcon
            size={16}
            className='text-muted-foreground/80 group-hover:text-foreground shrink-0 transition-colors'
            aria-hidden='true'
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-2' align='end'>
        <div className='flex max-sm:flex-col'>
          <div className='relative py-4 max-sm:order-1 max-sm:border-t sm:w-32'>
            <div className='h-full sm:border-e'>
              <div className='flex flex-col px-2'>
                <Button
                  variant='ghost'
                  size='sm'
                  className='w-full justify-start'
                  onClick={() => {
                    setDate({
                      from: today,
                      to: today,
                    });
                    setMonth(today);
                  }}
                >
                  Today
                </Button>
                <Button
                  variant='ghost'
                  size='sm'
                  className='w-full justify-start'
                  onClick={() => {
                    setDate(yesterday);
                    setMonth(yesterday.to);
                  }}
                >
                  Yesterday
                </Button>
                <Button
                  variant='ghost'
                  size='sm'
                  className='w-full justify-start'
                  onClick={() => {
                    setDate(last7Days);
                    setMonth(last7Days.to);
                  }}
                >
                  Last 7 days
                </Button>
                <Button
                  variant='ghost'
                  size='sm'
                  className='w-full justify-start'
                  onClick={() => {
                    setDate(last30Days);
                    setMonth(last30Days.to);
                  }}
                >
                  Last 30 days
                </Button>
                <Button
                  variant='ghost'
                  size='sm'
                  className='w-full justify-start'
                  onClick={() => {
                    setDate(monthToDate);
                    setMonth(monthToDate.to);
                  }}
                >
                  Month to date
                </Button>
                <Button
                  variant='ghost'
                  size='sm'
                  className='w-full justify-start'
                  onClick={() => {
                    setDate(lastMonth);
                    setMonth(lastMonth.to);
                  }}
                >
                  Last month
                </Button>
                <Button
                  variant='ghost'
                  size='sm'
                  className='w-full justify-start'
                  onClick={() => {
                    setDate(yearToDate);
                    setMonth(yearToDate.to);
                  }}
                >
                  Year to date
                </Button>
                <Button
                  variant='ghost'
                  size='sm'
                  className='w-full justify-start'
                  onClick={() => {
                    setDate(lastYear);
                    setMonth(lastYear.to);
                  }}
                >
                  Last year
                </Button>
              </div>
            </div>
          </div>
          <Calendar
            mode='range'
            selected={date}
            onSelect={(newDate) => {
              if (newDate) {
                setDate(newDate);
              }
            }}
            month={month}
            onMonthChange={setMonth}
            className='p-2'
            disabled={[
              { after: today }, // Dates before today
            ]}
          />
        </div>
        <Separator />
        <div className='flex w-full justify-end pt-1'>
          <Button size='sm' className={'text-sm uppercase'}>
            <CheckCircle2 size={14} /> Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}