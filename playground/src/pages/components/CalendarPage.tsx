import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Copy, Check } from 'lucide-react';
import { Calendar } from '../../../../src';
import type { DateRange } from '../../../../src';

type Tab = 'preview' | 'code';

// ── Props API ──────────────────────────────────────────────────────────────────

const propsData = [
  {
    name: 'mode',
    type: "'single' | 'range'",
    defaultVal: "'single'",
    description: "Controls whether the picker selects a single date or a from/to range.",
  },
  {
    name: 'value',
    type: 'Date | null',
    defaultVal: 'uncontrolled',
    description: 'Controlled selected date for single mode. Omit to use uncontrolled state.',
  },
  {
    name: 'defaultValue',
    type: 'Date',
    defaultVal: '—',
    description: 'Initial date for uncontrolled single mode.',
  },
  {
    name: 'onChange',
    type: '(date: Date | null) => void',
    defaultVal: '—',
    description: 'Called when the selected date changes in single mode.',
  },
  {
    name: 'range',
    type: 'DateRange',
    defaultVal: 'uncontrolled',
    description: 'Controlled from/to range for range mode. Omit to use uncontrolled state.',
  },
  {
    name: 'defaultRange',
    type: 'DateRange',
    defaultVal: '—',
    description: 'Initial range for uncontrolled range mode.',
  },
  {
    name: 'onRangeChange',
    type: '(range: DateRange) => void',
    defaultVal: '—',
    description: 'Called when the from or to date changes in range mode.',
  },
  {
    name: 'minDate',
    type: 'Date',
    defaultVal: '—',
    description: 'Earliest selectable date. Days before it are disabled.',
  },
  {
    name: 'maxDate',
    type: 'Date',
    defaultVal: '—',
    description: 'Latest selectable date. Days after it are disabled.',
  },
  {
    name: 'disabledDates',
    type: 'Date[]',
    defaultVal: '[]',
    description: 'Explicit list of individual dates to disable.',
  },
  {
    name: 'firstDayOfWeek',
    type: '0 | 1',
    defaultVal: '1 (Monday)',
    description: '0 = Sunday start, 1 = Monday start. Controls the column order of the day grid.',
  },
  {
    name: 'className',
    type: 'string',
    defaultVal: '—',
    description: 'Extra classes merged onto the calendar root via tailwind-merge.',
  },
];

// ── Code snippets ──────────────────────────────────────────────────────────────

const snippets: Record<string, string> = {
  'Single Date': `import { useState } from 'react';
import { Calendar } from 'kayv-glass-ui';

function DatePicker() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <>
      <Calendar onChange={setDate} />
      <p>Selected: {date?.toLocaleDateString() ?? '—'}</p>
    </>
  );
}`,

  'Date Range': `import { useState } from 'react';
import { Calendar } from 'kayv-glass-ui';
import type { DateRange } from 'kayv-glass-ui';

function RangePicker() {
  const [range, setRange] = useState<DateRange>({ from: null, to: null });

  return (
    <>
      <Calendar mode="range" onRangeChange={setRange} />
      <p>From: {range.from?.toLocaleDateString() ?? '—'}</p>
      <p>To:   {range.to?.toLocaleDateString()   ?? '—'}</p>
    </>
  );
}`,

  'Min / Max Dates': `const today = new Date();
const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3);
const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14);

<Calendar minDate={minDate} maxDate={maxDate} onChange={setDate} />`,

  'Disabled Dates': `const today = new Date();
const disabledDates = [
  new Date(today.getFullYear(), today.getMonth(), 10),
  new Date(today.getFullYear(), today.getMonth(), 15),
  new Date(today.getFullYear(), today.getMonth(), 20),
];

<Calendar disabledDates={disabledDates} onChange={setDate} />`,

  'First Day of Week': `{/* Monday start (default) */}
<Calendar firstDayOfWeek={1} onChange={setDate} />

{/* Sunday start */}
<Calendar firstDayOfWeek={0} onChange={setDate} />`,

  'Month / Year Picker': `{/* Click the month or year label in the header to
    open the month/year picker grid */}
<Calendar onChange={setDate} />

{/* The month and year pickers are built-in —
    no extra props required */}`,

  Controlled: `import { useState } from 'react';
import { Calendar } from 'kayv-glass-ui';

function ControlledCalendar() {
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <Calendar
      value={date}
      onChange={setDate}
    />
  );
}`,
};

// ── Demo components ────────────────────────────────────────────────────────────

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
        Selectable: 3 days in the past through +14 days in the future.
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
        Days 10, 11, 15, and 20 of the current month are individually disabled.
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

// ── Sub-components ─────────────────────────────────────────────────────────────

function PreviewCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl overflow-hidden
      border border-white/60 dark:border-white/10
      bg-white/40 dark:bg-slate-800/40
      backdrop-blur-sm shadow-sm shadow-slate-100/50 dark:shadow-black/10">
      <div className="px-5 py-3.5
        border-b border-slate-100/50 dark:border-white/5
        bg-white/30 dark:bg-slate-700/20">
        <span className="text-xs font-semibold tracking-wider uppercase
          text-slate-400 dark:text-slate-500">
          {label}
        </span>
      </div>
      <div className="px-6 py-8">
        {children}
      </div>
    </div>
  );
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <div className="rounded-2xl overflow-hidden
      border border-slate-700/40 bg-slate-900/95 backdrop-blur-sm shadow-sm">
      <div className="flex items-center justify-between px-4 py-2.5
        border-b border-slate-700/50">
        <span className="text-xs text-slate-500 font-mono">tsx</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs
            text-slate-500 hover:text-slate-300 transition-colors"
        >
          {copied
            ? <Check className="h-3.5 w-3.5 text-emerald-400" />
            : <Copy className="h-3.5 w-3.5" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="px-5 py-4 text-sm font-mono leading-relaxed
        text-slate-300 overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function Chip({ children }: { children: string }) {
  return (
    <code className="text-indigo-600 dark:text-indigo-300 text-xs font-mono
      bg-indigo-50 dark:bg-indigo-500/10
      px-1.5 py-0.5 rounded-md border border-indigo-100 dark:border-indigo-500/20">
      {children}
    </code>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function CalendarPage() {
  const [tab, setTab] = useState<Tab>('preview');

  return (
    <div className="max-w-4xl mx-auto px-8 py-10">

      {/* Breadcrumb nav */}
      <nav className="flex items-center gap-1.5 text-xs mb-6
        text-slate-400 dark:text-slate-600">
        <Link
          to="/overview"
          className="hover:text-slate-600 dark:hover:text-slate-400 transition-colors"
        >
          Components
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-700 dark:text-slate-300">Calendar</span>
      </nav>

      {/* Title + description */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2
          text-slate-900 dark:text-white">
          Calendar
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xl">
          A fully uncontrolled-or-controlled date picker with two modes:{' '}
          <Chip>single</Chip> for one date and <Chip>range</Chip> for a from/to selection.
          Supports <Chip>minDate</Chip>, <Chip>maxDate</Chip>, and per-day{' '}
          <Chip>disabledDates</Chip>. Click the month or year label in the header to jump
          directly to a month or year via the built-in picker grids.
        </p>
      </div>

      {/* Tab switcher */}
      <div className="flex items-center gap-1 p-1 rounded-xl w-fit mb-6
        bg-slate-100/60 dark:bg-slate-800/60
        border border-slate-200/40 dark:border-white/5
        backdrop-blur-sm">
        {(['preview', 'code'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all capitalize ${
              tab === t
                ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm shadow-slate-200/50 dark:shadow-black/30'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ── PREVIEW TAB ─────────────────────────────────── */}
      {tab === 'preview' && (
        <div className="flex flex-col gap-4 mb-12">
          <PreviewCard label="Single Date">
            <SingleDemo />
          </PreviewCard>

          <PreviewCard label="Date Range">
            <RangeDemo />
          </PreviewCard>

          <PreviewCard label="Min / Max Dates">
            <MinMaxDemo />
          </PreviewCard>

          <PreviewCard label="Disabled Dates">
            <DisabledDatesDemo />
          </PreviewCard>

          <PreviewCard label="Sunday Start — firstDayOfWeek=0">
            <SundayStartDemo />
          </PreviewCard>
        </div>
      )}

      {/* ── CODE TAB ────────────────────────────────────── */}
      {tab === 'code' && (
        <div className="flex flex-col gap-6 mb-12">
          {Object.entries(snippets).map(([label, code]) => (
            <div key={label}>
              <p className="text-xs font-semibold uppercase tracking-wider
                text-slate-400 dark:text-slate-600 mb-2">
                {label}
              </p>
              <CodeBlock code={code} />
            </div>
          ))}
        </div>
      )}

      {/* ── PROPS TABLE ─────────────────────────────────── */}
      <div>
        <h2 className="text-xs font-semibold tracking-wider uppercase mb-3
          text-slate-400 dark:text-slate-500">
          Props API
        </h2>
        <div className="rounded-2xl overflow-hidden
          border border-white/60 dark:border-white/10
          bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100/60 dark:border-white/5
                bg-slate-50/60 dark:bg-slate-700/30">
                {['Prop', 'Type', 'Default', 'Description'].map(h => (
                  <th
                    key={h}
                    className="text-left px-5 py-3 text-[10px] font-semibold
                      uppercase tracking-widest text-slate-400 dark:text-slate-500"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/60 dark:divide-white/5">
              {propsData.map(p => (
                <tr
                  key={p.name}
                  className="hover:bg-white/40 dark:hover:bg-white/5 transition-colors"
                >
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <code className="text-indigo-600 dark:text-indigo-400 text-xs font-mono">
                      {p.name}
                    </code>
                  </td>
                  <td className="px-5 py-3.5">
                    <code className="text-blue-600 dark:text-amber-300/80 text-xs font-mono">
                      {p.type}
                    </code>
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <code className="text-slate-500 dark:text-slate-400 text-xs font-mono">
                      {p.defaultVal}
                    </code>
                  </td>
                  <td className="px-5 py-3.5 text-xs leading-relaxed
                    text-slate-500 dark:text-slate-400">
                    {p.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
