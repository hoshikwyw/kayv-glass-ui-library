import { useState } from 'react';
import { Calendar } from '../../../../src';
import type { DateRange } from '../../../../src';

// ── Helpers ───────────────────────────────────────────────────────────────────

function SectionCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/60 dark:border-white/10 bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm shadow-sm shadow-slate-100/50 dark:shadow-black/10">
      <div className="px-5 py-3.5 border-b border-slate-200/50 dark:border-white/5">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {label}
        </span>
      </div>
      <div className="px-5 py-6">{children}</div>
    </div>
  );
}

function DateDisplay({ label, date }: { label: string; date: Date | null }) {
  return (
    <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
      {label}:{' '}
      <span className="font-medium text-slate-700 dark:text-slate-300">
        {date ? date.toLocaleDateString(undefined, { dateStyle: 'long' }) : '—'}
      </span>
    </p>
  );
}

function RangeDisplay({ range }: { range: DateRange }) {
  const fmt = (d: Date | null) =>
    d ? d.toLocaleDateString(undefined, { dateStyle: 'medium' }) : '—';
  return (
    <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
      Range:{' '}
      <span className="font-medium text-slate-700 dark:text-slate-300">
        {fmt(range.from)} → {fmt(range.to)}
      </span>
    </p>
  );
}

// ── Demos ─────────────────────────────────────────────────────────────────────

function SingleDemo() {
  const [date, setDate] = useState<Date | null>(null);
  return (
    <div>
      <Calendar onChange={setDate} />
      <DateDisplay label="Selected" date={date} />
    </div>
  );
}

function RangeDemo() {
  const [range, setRange] = useState<DateRange>({ from: null, to: null });
  return (
    <div>
      <Calendar mode="range" onRangeChange={setRange} />
      <RangeDisplay range={range} />
    </div>
  );
}

function MinMaxDemo() {
  const today = new Date();
  const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3);
  const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14);
  const [date, setDate] = useState<Date | null>(null);
  return (
    <div>
      <Calendar minDate={minDate} maxDate={maxDate} onChange={setDate} />
      <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">
        Selectable: ±3 days in the past, up to +14 days in the future.
      </p>
      <DateDisplay label="Selected" date={date} />
    </div>
  );
}

function DisabledDatesDemo() {
  const today = new Date();
  const disabledDates = [
    new Date(today.getFullYear(), today.getMonth(), 10),
    new Date(today.getFullYear(), today.getMonth(), 11),
    new Date(today.getFullYear(), today.getMonth(), 15),
    new Date(today.getFullYear(), today.getMonth(), 20),
  ];
  const [date, setDate] = useState<Date | null>(null);
  return (
    <div>
      <Calendar disabledDates={disabledDates} onChange={setDate} />
      <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">
        Days 10, 11, 15, 20 of the current month are disabled.
      </p>
      <DateDisplay label="Selected" date={date} />
    </div>
  );
}

function SundayStartDemo() {
  const [date, setDate] = useState<Date | null>(null);
  return (
    <div>
      <Calendar firstDayOfWeek={0} onChange={setDate} />
      <DateDisplay label="Selected" date={date} />
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CalendarPage() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-10 flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Calendar</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Date and date-range picker with hover preview, disabled dates, and min/max constraints.
        </p>
      </div>

      <SectionCard label="Single selection">
        <SingleDemo />
      </SectionCard>

      <SectionCard label="Range selection">
        <RangeDemo />
      </SectionCard>

      <SectionCard label="Min / Max dates">
        <MinMaxDemo />
      </SectionCard>

      <SectionCard label="Disabled dates">
        <DisabledDatesDemo />
      </SectionCard>

      <SectionCard label="Sunday start (firstDayOfWeek=0)">
        <SundayStartDemo />
      </SectionCard>

      <SectionCard label="API">
        <div className="flex flex-col gap-1 font-mono text-xs text-slate-600 dark:text-slate-400">
          {[
            ['mode', "'single' | 'range'", "'single'"],
            ['value', 'Date | null', 'uncontrolled'],
            ['defaultValue', 'Date', '—'],
            ['onChange', '(date: Date | null) => void', '—'],
            ['range', 'DateRange', 'uncontrolled'],
            ['defaultRange', 'DateRange', '—'],
            ['onRangeChange', '(range: DateRange) => void', '—'],
            ['minDate', 'Date', '—'],
            ['maxDate', 'Date', '—'],
            ['disabledDates', 'Date[]', '[]'],
            ['firstDayOfWeek', '0 | 1', '1 (Monday)'],
          ].map(([prop, type, def]) => (
            <div
              key={prop}
              className="grid grid-cols-[160px_1fr_100px] gap-4 py-1.5 border-b border-slate-100 dark:border-white/5 last:border-0"
            >
              <span className="text-indigo-600 dark:text-indigo-400">{prop}</span>
              <span className="text-slate-500 dark:text-slate-500 truncate">{type}</span>
              <span className="text-slate-400">{def}</span>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
