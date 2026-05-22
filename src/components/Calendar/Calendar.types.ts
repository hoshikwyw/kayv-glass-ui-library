export type CalendarMode = 'single' | 'range';

export interface DateRange {
  from: Date | null;
  to: Date | null;
}

export interface Holiday {
  date: Date;
  label?: string;
}

export type CalendarEventColor = 'indigo' | 'emerald' | 'amber' | 'rose' | 'violet' | 'sky';

export interface CalendarEvent {
  date: Date;
  label: string;
  color?: CalendarEventColor;
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
  // holidays & events
  holidays?: Holiday[];
  highlightWeekends?: boolean;
  events?: CalendarEvent[];
  // config
  firstDayOfWeek?: 0 | 1;
  className?: string;
}
