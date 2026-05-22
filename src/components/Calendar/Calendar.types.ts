export type CalendarMode = 'single' | 'range';

export interface DateRange {
  from: Date | null;
  to: Date | null;
}

export interface CalendarProps {
  mode?: CalendarMode;
  // single
  value?: Date | null;
  defaultValue?: Date;
  onChange?: (date: Date | null) => void;
  // range
  range?: DateRange;
  defaultRange?: DateRange;
  onRangeChange?: (range: DateRange) => void;
  // constraints
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  // config
  firstDayOfWeek?: 0 | 1;
  className?: string;
}
