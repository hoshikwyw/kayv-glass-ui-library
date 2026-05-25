import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Copy, Check } from 'lucide-react';
import { Progress } from '../../../../src';

type Tab = 'preview' | 'code';

// ── Props data ─────────────────────────────────────────────────────────────────

const propsData = [
  { name: 'value',     type: 'number',                                          defaultVal: '—',         description: 'Current value (0–max). Omit to render in indeterminate state.' },
  { name: 'max',       type: 'number',                                          defaultVal: '100',        description: 'Maximum value used to calculate percentage.' },
  { name: 'size',      type: "'xs' | 'sm' | 'md' | 'lg'",                      defaultVal: "'md'",       description: 'Thickness of the progress bar.' },
  { name: 'variant',   type: "'primary' | 'success' | 'warning' | 'danger'",   defaultVal: "'primary'",  description: 'Color scheme of the fill.' },
  { name: 'animated',  type: 'boolean',                                         defaultVal: 'false',      description: 'Adds a moving shimmer overlay on the filled portion.' },
  { name: 'label',     type: 'string',                                          defaultVal: '—',          description: 'Text label shown above the bar on the left.' },
  { name: 'showValue', type: 'boolean',                                         defaultVal: 'false',      description: 'Shows the percentage value to the right of the label.' },
  { name: 'className', type: 'string',                                          defaultVal: '—',          description: 'Merged on top of base styles via tailwind-merge.' },
  { name: '...props',  type: 'React.ComponentPropsWithoutRef<"div">',           defaultVal: '—',          description: 'All native div attributes forwarded to the wrapper.' },
];

// ── Code snippets ──────────────────────────────────────────────────────────────

const snippets: Record<string, string> = {
  Variants: `import { Progress } from 'kayv-glass-ui';

<Progress value={80} variant="primary" />
<Progress value={65} variant="success" />
<Progress value={45} variant="warning" />
<Progress value={30} variant="danger" />`,

  'Sizes': `<Progress value={60} size="xs" />
<Progress value={60} size="sm" />
<Progress value={60} size="md" />
<Progress value={60} size="lg" />`,

  'Label & value': `<Progress value={72} label="Storage used" showValue />
<Progress value={40} label="Uploading…" showValue variant="success" size="sm" />`,

  Animated: `{/* Moving shimmer on the fill */}
<Progress value={60} animated label="Processing…" showValue />
<Progress value={80} animated variant="success" size="lg" label="Syncing" showValue />`,

  Indeterminate: `{/* Omit value for an infinite loading bar */}
<Progress label="Loading…" />
<Progress variant="success" size="sm" />
<Progress variant="warning" size="lg" />`,

  Interactive: `import { useState } from 'react';

function Example() {
  const [value, setValue] = useState(60);

  return (
    <>
      <Progress value={value} label="Upload progress" showValue animated />
      <input
        type="range" min={0} max={100}
        value={value} onChange={e => setValue(+e.target.value)}
      />
    </>
  );
}`,
};

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
      <div className="px-5 sm:px-6 py-6 flex flex-col gap-4">
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

export default function ProgressPage() {
  const [tab, setTab] = useState<Tab>('preview');
  const [sliderValue, setSliderValue] = useState(60);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-10">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs mb-6
        text-slate-400 dark:text-slate-600">
        <Link
          to="/overview"
          className="hover:text-slate-600 dark:hover:text-slate-400 transition-colors"
        >
          Components
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-700 dark:text-slate-300">Progress</span>
      </nav>

      {/* Title + description */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2
          text-slate-900 dark:text-white">
          Progress
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xl">
          A glass-style progress bar with four <Chip>variant</Chip> colors,
          four <Chip>size</Chip> presets, an <Chip>animated</Chip> shimmer mode,
          and an <Chip>indeterminate</Chip> state for unknown durations.
          Fully accessible with <Chip>role="progressbar"</Chip> and ARIA value attributes.
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

          {/* Variants */}
          <PreviewCard label="Variants">
            <Progress value={80} variant="primary" label="Primary"  showValue />
            <Progress value={65} variant="success" label="Success"  showValue />
            <Progress value={45} variant="warning" label="Warning"  showValue />
            <Progress value={30} variant="danger"  label="Danger"   showValue />
          </PreviewCard>

          {/* Sizes */}
          <PreviewCard label="Sizes">
            <Progress value={60} size="xs" label="Extra small (xs)" showValue />
            <Progress value={60} size="sm" label="Small (sm)"       showValue />
            <Progress value={60} size="md" label="Medium (md)"      showValue />
            <Progress value={60} size="lg" label="Large (lg)"       showValue />
          </PreviewCard>

          {/* Sizes × Variants */}
          <PreviewCard label="Sizes × Variants">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              {(['primary', 'success', 'warning', 'danger'] as const).map(v =>
                (['xs', 'sm', 'md', 'lg'] as const).map(s => (
                  <Progress
                    key={`${v}-${s}`}
                    value={70}
                    variant={v}
                    size={s}
                    label={`${v} · ${s}`}
                  />
                ))
              )}
            </div>
          </PreviewCard>

          {/* Animated */}
          <PreviewCard label="Animated shimmer">
            <Progress value={55} animated label="Processing files…"   showValue />
            <Progress value={78} animated variant="success" size="lg"
              label="Syncing database"   showValue />
            <Progress value={40} animated variant="warning" size="sm"
              label="Memory usage"       showValue />
          </PreviewCard>

          {/* Indeterminate */}
          <PreviewCard label="Indeterminate">
            <Progress label="Loading…" />
            <Progress variant="success" size="sm" label="Connecting…" />
            <Progress variant="warning" size="lg" label="Please wait…" />
          </PreviewCard>

          {/* Interactive */}
          <PreviewCard label="Interactive">
            <div className="space-y-5">
              <Progress
                value={sliderValue}
                animated
                label="Upload progress"
                showValue
                size="lg"
              />
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs
                  text-slate-400 dark:text-slate-500">
                  <span>0%</span>
                  <span>Drag to adjust</span>
                  <span>100%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={sliderValue}
                  onChange={e => setSliderValue(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer
                    bg-slate-200/60 dark:bg-white/8
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:h-4
                    [&::-webkit-slider-thumb]:w-4
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-kv-500
                    [&::-webkit-slider-thumb]:shadow-sm
                    [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-moz-range-thumb]:h-4
                    [&::-moz-range-thumb]:w-4
                    [&::-moz-range-thumb]:rounded-full
                    [&::-moz-range-thumb]:bg-kv-500
                    [&::-moz-range-thumb]:border-0
                    [&::-moz-range-thumb]:cursor-pointer"
                />
              </div>

              {/* Mini stat cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2
                border-t border-slate-100/60 dark:border-white/5">
                {[
                  { label: 'Files uploaded', value: `${Math.round(sliderValue * 1.27)}`, unit: '/ 127' },
                  { label: 'Speed',          value: `${(sliderValue * 0.42).toFixed(1)}`, unit: 'MB/s' },
                  { label: 'Time left',      value: `${Math.max(0, Math.round((100 - sliderValue) * 0.3))}`, unit: 's' },
                ].map(({ label, value, unit }) => (
                  <div key={label}
                    className="p-3 rounded-xl
                      bg-white/50 dark:bg-white/5
                      border border-slate-100/60 dark:border-white/8">
                    <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">{label}</p>
                    <p className="text-sm font-bold text-slate-800 dark:text-white">
                      {value}
                      <span className="text-xs font-normal text-slate-400 ml-1">{unit}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
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
        <div className="overflow-x-auto rounded-2xl
          border border-white/60 dark:border-white/10
          bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm shadow-sm">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="border-b border-slate-100/60 dark:border-white/5
                bg-slate-50/60 dark:bg-slate-700/30">
                {['Prop', 'Type', 'Default', 'Description'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-[10px] font-semibold
                    uppercase tracking-widest text-slate-400 dark:text-slate-500">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/60 dark:divide-white/5">
              {propsData.map(p => (
                <tr key={p.name}
                  className="hover:bg-white/40 dark:hover:bg-white/5 transition-colors">
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
