'use client';

import { forwardRef, useCallback, useMemo, useState } from 'react';
import { cn } from '../../utils/cn';
import {
  cellBase,
  containerBase,
  dayButtonBase,
  dayDefaultStyles,
  dayDisabledStyles,
  daySelectedStyles,
  dayTodayStyles,
  gridBase,
  headerBase,
  headerLabelButtonBase,
  headerRangeLabelBase,
  navButtonBase,
  pickerGridBase,
  pickerItemBase,
  pickerItemDefaultStyles,
  pickerItemDisabledStyles,
  pickerItemSelectedStyles,
  pickerItemTodayStyles,
  rangeStripBase,
  weekDayBase,
  weekRowBase,
} from './Calendar.styles';
import type { CalendarProps, DateRange } from './Calendar.types';

// ── Constants ─────────────────────────────────────────────────────────────────

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS_MON = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const DAYS_SUN = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const YEARS_PER_PAGE = 12;

type ViewMode = 'days' | 'months' | 'years';

// ── Date helpers ──────────────────────────────────────────────────────────────

const sod = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const sameDay = (a: Date, b: Date) => sod(a).getTime() === sod(b).getTime();
const isToday = (d: Date) => sameDay(d, new Date());

function buildGrid(viewDate: Date, firstDayOfWeek: 0 | 1): (Date | null)[] {
  const y = viewDate.getFullYear();
  const m = viewDate.getMonth();
  let offset = new Date(y, m, 1).getDay() - firstDayOfWeek;
  if (offset < 0) offset += 7;
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const cells: (Date | null)[] = Array(offset).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(y, m, d));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

// ── Icons ─────────────────────────────────────────────────────────────────────

const ChevLeft = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75"
    strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
    <path d="M10 4L6 8l4 4" />
  </svg>
);

const ChevRight = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75"
    strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
    <path d="M6 4l4 4-4 4" />
  </svg>
);

const ChevDown = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75"
    strokeLinecap="round" strokeLinejoin="round" className={cn('h-3 w-3', className)} aria-hidden="true">
    <path d="M4 6l4 4 4-4" />
  </svg>
);

// ── Calendar ──────────────────────────────────────────────────────────────────

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      mode = 'single',
      value: controlledValue,
      defaultValue,
      onChange,
      range: controlledRange,
      defaultRange,
      onRangeChange,
      minDate,
      maxDate,
      disabledDates = [],
      firstDayOfWeek = 1,
      className,
    },
    ref
  ) => {
    const isRangeMode = mode === 'range';

    // ── View state ────────────────────────────────────────────────────────────
    const [viewDate, setViewDate] = useState(() => {
      const base = isRangeMode
        ? (controlledRange?.from ?? defaultRange?.from ?? null)
        : (controlledValue ?? defaultValue ?? null);
      const d = base ?? new Date();
      return new Date(d.getFullYear(), d.getMonth(), 1);
    });

    const [viewMode, setViewMode] = useState<ViewMode>('days');

    const [yearPageStart, setYearPageStart] = useState(
      () => Math.floor(viewDate.getFullYear() / YEARS_PER_PAGE) * YEARS_PER_PAGE
    );

    // ── Selection state ───────────────────────────────────────────────────────
    const isControlledSingle = controlledValue !== undefined;
    const [internalSingle, setInternalSingle] = useState<Date | null>(defaultValue ?? null);
    const selectedSingle = isControlledSingle ? controlledValue : internalSingle;

    const isControlledRange = controlledRange !== undefined;
    const [internalRange, setInternalRange] = useState<DateRange>(
      defaultRange ?? { from: null, to: null }
    );
    const selectedRange = isControlledRange ? controlledRange : internalRange;

    const [hoverDate, setHoverDate] = useState<Date | null>(null);

    const effectiveRange = useMemo<DateRange>(() => {
      if (!isRangeMode) return { from: null, to: null };
      const { from, to } = selectedRange;
      if (from && !to && hoverDate) {
        const swap = hoverDate < from;
        return { from: swap ? hoverDate : from, to: swap ? from : hoverDate };
      }
      return selectedRange;
    }, [isRangeMode, selectedRange, hoverDate]);

    // ── Constraint helpers ────────────────────────────────────────────────────
    const isDisabledDay = useCallback(
      (date: Date) => {
        if (minDate && sod(date) < sod(minDate)) return true;
        if (maxDate && sod(date) > sod(maxDate)) return true;
        return disabledDates.some(d => sameDay(d, date));
      },
      [minDate, maxDate, disabledDates]
    );

    const isDisabledMonth = useCallback(
      (year: number, month: number) => {
        if (minDate) {
          const lastDayOfMonth = new Date(year, month + 1, 0);
          if (lastDayOfMonth < sod(minDate)) return true;
        }
        if (maxDate) {
          const firstDayOfMonth = new Date(year, month, 1);
          if (firstDayOfMonth > sod(maxDate)) return true;
        }
        return false;
      },
      [minDate, maxDate]
    );

    const isDisabledYear = useCallback(
      (year: number) => {
        if (minDate && year < minDate.getFullYear()) return true;
        if (maxDate && year > maxDate.getFullYear()) return true;
        return false;
      },
      [minDate, maxDate]
    );

    // ── Navigation ────────────────────────────────────────────────────────────
    const prevMonth = () => setViewDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1));
    const nextMonth = () => setViewDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));
    const prevYear  = () => setViewDate(d => new Date(d.getFullYear() - 1, d.getMonth(), 1));
    const nextYear  = () => setViewDate(d => new Date(d.getFullYear() + 1, d.getMonth(), 1));

    const canGoPrev = !minDate || viewDate > new Date(minDate.getFullYear(), minDate.getMonth(), 1);
    const canGoNext = !maxDate || viewDate < new Date(maxDate.getFullYear(), maxDate.getMonth(), 1);
    const canGoYearPrev = !minDate || viewDate.getFullYear() > minDate.getFullYear();
    const canGoYearNext = !maxDate || viewDate.getFullYear() < maxDate.getFullYear();
    const canGoYearPagePrev = !minDate || yearPageStart > minDate.getFullYear();
    const canGoYearPageNext = !maxDate || yearPageStart + YEARS_PER_PAGE - 1 < maxDate.getFullYear();

    const openMonthPicker = () => setViewMode('months');
    const openYearPicker = () => {
      setYearPageStart(Math.floor(viewDate.getFullYear() / YEARS_PER_PAGE) * YEARS_PER_PAGE);
      setViewMode('years');
    };

    const selectMonth = (month: number) => {
      setViewDate(new Date(viewDate.getFullYear(), month, 1));
      setViewMode('days');
    };

    const selectYear = (year: number) => {
      setViewDate(new Date(year, viewDate.getMonth(), 1));
      setViewMode('months');
    };

    // ── Day click ─────────────────────────────────────────────────────────────
    const handleDayClick = useCallback(
      (date: Date) => {
        if (isDisabledDay(date)) return;

        if (!isRangeMode) {
          const next = selectedSingle && sameDay(date, selectedSingle) ? null : date;
          if (!isControlledSingle) setInternalSingle(next);
          onChange?.(next);
          return;
        }

        const { from, to } = selectedRange;
        if (!from || (from && to)) {
          const next: DateRange = { from: date, to: null };
          if (!isControlledRange) setInternalRange(next);
          onRangeChange?.(next);
        } else {
          const swap = date < from;
          const next: DateRange = { from: swap ? date : from, to: swap ? from : date };
          if (!isControlledRange) setInternalRange(next);
          onRangeChange?.(next);
          setHoverDate(null);
        }
      },
      [isRangeMode, isDisabledDay, selectedSingle, selectedRange,
        isControlledSingle, isControlledRange, onChange, onRangeChange]
    );

    // ── Grid ──────────────────────────────────────────────────────────────────
    const grid = buildGrid(viewDate, firstDayOfWeek);
    const dayNames = firstDayOfWeek === 1 ? DAYS_MON : DAYS_SUN;
    const weeks: (Date | null)[][] = [];
    for (let i = 0; i < grid.length; i += 7) weeks.push(grid.slice(i, i + 7));

    const todayY = new Date().getFullYear();
    const todayM = new Date().getMonth();

    // ── Render ────────────────────────────────────────────────────────────────
    return (
      <div ref={ref} className={cn(containerBase, className)}>

        {/* ── Header: days view ──────────────────────────────────────────── */}
        {viewMode === 'days' && (
          <div className={headerBase}>
            <button type="button" onClick={prevMonth} disabled={!canGoPrev}
              aria-label="Previous month" className={navButtonBase}>
              <ChevLeft />
            </button>
            <div className="flex items-center gap-0.5">
              <button type="button" onClick={openMonthPicker}
                aria-label="Select month" className={headerLabelButtonBase}>
                {MONTHS[viewDate.getMonth()]}
                <ChevDown />
              </button>
              <button type="button" onClick={openYearPicker}
                aria-label="Select year" className={headerLabelButtonBase}>
                {viewDate.getFullYear()}
                <ChevDown />
              </button>
            </div>
            <button type="button" onClick={nextMonth} disabled={!canGoNext}
              aria-label="Next month" className={navButtonBase}>
              <ChevRight />
            </button>
          </div>
        )}

        {/* ── Header: months view ────────────────────────────────────────── */}
        {viewMode === 'months' && (
          <div className={headerBase}>
            <button type="button" onClick={prevYear} disabled={!canGoYearPrev}
              aria-label="Previous year" className={navButtonBase}>
              <ChevLeft />
            </button>
            <button type="button" onClick={openYearPicker}
              aria-label="Select year" className={headerLabelButtonBase}>
              {viewDate.getFullYear()}
              <ChevDown />
            </button>
            <button type="button" onClick={nextYear} disabled={!canGoYearNext}
              aria-label="Next year" className={navButtonBase}>
              <ChevRight />
            </button>
          </div>
        )}

        {/* ── Header: years view ─────────────────────────────────────────── */}
        {viewMode === 'years' && (
          <div className={headerBase}>
            <button type="button"
              onClick={() => setYearPageStart(y => y - YEARS_PER_PAGE)}
              disabled={!canGoYearPagePrev}
              aria-label="Previous years" className={navButtonBase}>
              <ChevLeft />
            </button>
            <span className={headerRangeLabelBase}>
              {yearPageStart} – {yearPageStart + YEARS_PER_PAGE - 1}
            </span>
            <button type="button"
              onClick={() => setYearPageStart(y => y + YEARS_PER_PAGE)}
              disabled={!canGoYearPageNext}
              aria-label="Next years" className={navButtonBase}>
              <ChevRight />
            </button>
          </div>
        )}

        {/* ── Month picker ───────────────────────────────────────────────── */}
        {viewMode === 'months' && (
          <div className={pickerGridBase}>
            {MONTHS_SHORT.map((name, i) => {
              const disabled = isDisabledMonth(viewDate.getFullYear(), i);
              const isView = i === viewDate.getMonth();
              const isTodayMonth = i === todayM && viewDate.getFullYear() === todayY;
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => !disabled && selectMonth(i)}
                  aria-label={MONTHS[i]}
                  className={cn(
                    pickerItemBase,
                    !isView && !disabled && pickerItemDefaultStyles,
                    isTodayMonth && !isView && pickerItemTodayStyles,
                    isView && pickerItemSelectedStyles,
                    disabled && pickerItemDisabledStyles,
                  )}
                >
                  {name}
                </button>
              );
            })}
          </div>
        )}

        {/* ── Year picker ────────────────────────────────────────────────── */}
        {viewMode === 'years' && (
          <div className={pickerGridBase}>
            {Array.from({ length: YEARS_PER_PAGE }, (_, i) => yearPageStart + i).map(year => {
              const disabled = isDisabledYear(year);
              const isView = year === viewDate.getFullYear();
              const isTodayYear = year === todayY;
              return (
                <button
                  key={year}
                  type="button"
                  onClick={() => !disabled && selectYear(year)}
                  aria-label={String(year)}
                  className={cn(
                    pickerItemBase,
                    !isView && !disabled && pickerItemDefaultStyles,
                    isTodayYear && !isView && pickerItemTodayStyles,
                    isView && pickerItemSelectedStyles,
                    disabled && pickerItemDisabledStyles,
                  )}
                >
                  {year}
                </button>
              );
            })}
          </div>
        )}

        {/* ── Day grid ───────────────────────────────────────────────────── */}
        {viewMode === 'days' && (
          <>
            <div className={weekRowBase} aria-hidden="true">
              {dayNames.map(n => <div key={n} className={weekDayBase}>{n}</div>)}
            </div>

            <div role="grid" className={gridBase}>
              {weeks.map((week, wi) => (
                <div key={wi} role="row" className="contents">
                  {week.map((date, di) => {
                    if (!date) {
                      return <div key={`e-${wi}-${di}`} role="gridcell" className={cellBase} />;
                    }

                    const disabled = isDisabledDay(date);
                    const today = isToday(date);
                    const isSelected = !isRangeMode &&
                      Boolean(selectedSingle && sameDay(date, selectedSingle));

                    const { from, to } = effectiveRange;
                    const isRangeStart = isRangeMode && Boolean(from && sameDay(date, from));
                    const isRangeEnd   = isRangeMode && Boolean(to   && sameDay(date, to));
                    const isInRange    = isRangeMode && Boolean(
                      from && to && sod(date) > sod(from) && sod(date) < sod(to)
                    );
                    const isRangeSelected = isRangeStart || isRangeEnd;
                    const hasCompleteRange = Boolean(from && to);
                    const showRightHalf = isRangeStart && !isRangeEnd && hasCompleteRange;
                    const showLeftHalf  = isRangeEnd && !isRangeStart && hasCompleteRange;
                    const showTodayRing = today && !isSelected && !isRangeSelected;

                    return (
                      <div
                        key={date.toISOString()}
                        role="gridcell"
                        className={cn(cellBase, isInRange && rangeStripBase)}
                        onMouseEnter={() => { if (isRangeMode && !disabled) setHoverDate(date); }}
                        onMouseLeave={() => { if (isRangeMode) setHoverDate(null); }}
                      >
                        {showRightHalf && (
                          <span aria-hidden="true"
                            className={cn('absolute inset-y-0 left-1/2 right-0 pointer-events-none', rangeStripBase)} />
                        )}
                        {showLeftHalf && (
                          <span aria-hidden="true"
                            className={cn('absolute inset-y-0 left-0 right-1/2 pointer-events-none', rangeStripBase)} />
                        )}
                        <button
                          type="button"
                          onClick={() => handleDayClick(date)}
                          disabled={disabled}
                          aria-label={date.toLocaleDateString(undefined, { dateStyle: 'long' })}
                          aria-selected={isSelected || isRangeSelected}
                          className={cn(
                            dayButtonBase,
                            !isSelected && !isRangeSelected && !disabled && dayDefaultStyles,
                            showTodayRing && dayTodayStyles,
                            (isSelected || isRangeSelected) && daySelectedStyles,
                            disabled && dayDisabledStyles,
                          )}
                        >
                          {date.getDate()}
                        </button>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }
);

Calendar.displayName = 'Calendar';
