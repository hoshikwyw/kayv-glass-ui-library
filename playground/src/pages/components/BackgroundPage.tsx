import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Copy, Check } from 'lucide-react';
import { DotPattern, GridPattern, GradientBackground } from '../../../../src';

type Tab = 'preview' | 'code';

// ── Props data ─────────────────────────────────────────────────────────────────

const dotProps = [
  { name: 'width',     type: 'number',                  defaultVal: '16',  description: 'Horizontal cell size — controls horizontal spacing between dot centres.' },
  { name: 'height',    type: 'number',                  defaultVal: '16',  description: 'Vertical cell size — controls vertical spacing between dot centres.' },
  { name: 'x / y',    type: 'number',                  defaultVal: '0',   description: 'Pattern offset in px.' },
  { name: 'cx / cy',  type: 'number',                  defaultVal: '1',   description: 'Dot position within each cell.' },
  { name: 'cr',       type: 'number',                  defaultVal: '1',   description: 'Dot radius in px. Increase for larger/bolder dots.' },
  { name: 'className', type: 'string',                 defaultVal: '—',   description: 'Applied to the <svg>. Use for mask-image, fill colour, opacity, etc.' },
  { name: '...props', type: 'SVGProps<SVGSVGElement>',  defaultVal: '—',   description: 'All native SVG attributes are forwarded to the root element.' },
];

const gridProps = [
  { name: 'width',               type: 'number',                 defaultVal: '40',  description: 'Grid cell width in px.' },
  { name: 'height',              type: 'number',                 defaultVal: '40',  description: 'Grid cell height in px.' },
  { name: 'x / y',              type: 'number',                 defaultVal: '-1',  description: 'Pattern offset. −1 aligns lines flush with the container edge.' },
  { name: 'squares',            type: '[number, number][]',      defaultVal: '—',   description: '[col, row] pairs of cells to render highlighted.' },
  { name: 'lineStrokeDasharray', type: "number | string",        defaultVal: '0',   description: 'strokeDasharray for the grid lines — e.g. "4 4" for dashed.' },
  { name: 'className',          type: 'string',                  defaultVal: '—',   description: 'Applied to the <svg>. Use for mask-image, stroke colour, opacity.' },
  { name: '...props',           type: 'SVGProps<SVGSVGElement>', defaultVal: '—',   description: 'All native SVG attributes are forwarded to the root element.' },
];

const gradientProps = [
  { name: 'fixed',     type: 'boolean', defaultVal: 'true', description: 'true = position: fixed behind the full viewport. false = position: absolute inside nearest relative parent.' },
  { name: 'className', type: 'string',  defaultVal: '—',    description: 'Merged onto the wrapper div via tailwind-merge.' },
];

// ── Code snippets ──────────────────────────────────────────────────────────────

const snippets: Record<string, string> = {
  'DotPattern — basic': `import { DotPattern } from '@kwyw/kayv-glass-ui';

{/* Place inside a relative overflow-hidden container */}
<div className="relative h-64 overflow-hidden rounded-2xl bg-slate-950">
  <DotPattern />
</div>`,

  'DotPattern — radial fade': `{/* Apply a CSS mask via className to fade the edges */}
<div className="relative h-64 overflow-hidden rounded-2xl bg-slate-950">
  <DotPattern
    width={20}
    height={20}
    cr={1.2}
    className="[mask-image:radial-gradient(350px_circle_at_center,white,transparent)]"
  />
  <div className="relative z-10 flex h-full items-center justify-center">
    <p className="text-white font-semibold">Content on top</p>
  </div>
</div>`,

  'GridPattern — basic': `import { GridPattern } from '@kwyw/kayv-glass-ui';

<div className="relative h-64 overflow-hidden rounded-2xl bg-slate-950">
  <GridPattern />
</div>`,

  'GridPattern — highlighted squares': `{/* Pass squares as [col, row] grid coordinates */}
<div className="relative h-64 overflow-hidden rounded-2xl bg-slate-950">
  <GridPattern
    width={48}
    height={48}
    squares={[
      [1, 2], [3, 1], [5, 3],
      [2, 5], [6, 2], [4, 4],
    ]}
    className="[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]"
  />
</div>`,

  'GridPattern — dashed lines': `<div className="relative h-64 overflow-hidden rounded-2xl bg-slate-950">
  <GridPattern lineStrokeDasharray="4 4" />
</div>`,

  'GradientBackground — fixed (global)': `import { GradientBackground } from '@kwyw/kayv-glass-ui';

{/* Render once in your root layout — sits behind everything */}
<GradientBackground />`,

  'GradientBackground — absolute (section)': `{/* fixed={false} fills the nearest relative parent */}
<div className="relative h-64 overflow-hidden rounded-2xl">
  <GradientBackground fixed={false} />
  <div className="relative z-10 flex h-full items-center justify-center">
    <p className="font-semibold">Content on top</p>
  </div>
</div>`,
};

// ── Static highlighted cells for demo ─────────────────────────────────────────

const DEMO_SQUARES: Array<[number, number]> = [
  [1, 2], [3, 1], [5, 3], [2, 5], [6, 2], [4, 4], [7, 1], [0, 4], [8, 3], [3, 6],
];

// ── Shared sub-components ──────────────────────────────────────────────────────

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

function PropsTable({ rows }: {
  rows: { name: string; type: string; defaultVal: string; description: string }[];
}) {
  return (
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
          {rows.map(p => (
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
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function BackgroundPage() {
  const [tab, setTab] = useState<Tab>('preview');

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
        <span className="text-slate-700 dark:text-slate-300">Backgrounds</span>
      </nav>

      {/* Title + description */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2
          text-slate-900 dark:text-white">
          Backgrounds
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xl">
          Three drop-in background primitives: <Chip>DotPattern</Chip>, <Chip>GridPattern</Chip>,
          and <Chip>GradientBackground</Chip>. Place the SVG patterns inside a{' '}
          <Chip>relative overflow-hidden</Chip> container, then apply a CSS{' '}
          <Chip>mask-image</Chip> via <code className="text-indigo-600 dark:text-indigo-300 text-xs font-mono
            bg-indigo-50 dark:bg-indigo-500/10 px-1.5 py-0.5 rounded-md
            border border-indigo-100 dark:border-indigo-500/20">className</code> to create
          radial or linear fade effects.
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

      {/* ── PREVIEW TAB ───────────────────────────────────── */}
      {tab === 'preview' && (
        <div className="flex flex-col gap-4 mb-12">

          {/* DotPattern default */}
          <PreviewCard label="Dot Pattern — Default">
            <div className="relative h-48 overflow-hidden rounded-xl
              bg-slate-950 ring-1 ring-white/8">
              <DotPattern />
            </div>
          </PreviewCard>

          {/* DotPattern radial fade */}
          <PreviewCard label="Dot Pattern — Radial Fade">
            <div className="space-y-2">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Apply <code className="font-mono text-[11px] text-indigo-600 dark:text-indigo-300
                  bg-indigo-50 dark:bg-indigo-500/10 px-1 rounded">
                  [mask-image:radial-gradient(...)]
                </code> via <code className="font-mono text-[11px]">className</code> to fade the edges.
              </p>
              <div className="relative h-48 overflow-hidden rounded-xl
                bg-slate-950 ring-1 ring-white/8">
                <DotPattern
                  width={20}
                  height={20}
                  cr={1.2}
                  className="[mask-image:radial-gradient(350px_circle_at_center,white,transparent)]"
                />
                <div className="relative z-10 flex h-full items-center justify-center">
                  <p className="text-white/60 text-sm font-medium tracking-wide">
                    Content renders above the pattern
                  </p>
                </div>
              </div>
            </div>
          </PreviewCard>

          {/* DotPattern sizes */}
          <PreviewCard label="Dot Pattern — Spacing & Size Variants">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: 'Tight  (8px)', width: 8,  height: 8,  cr: 0.7 },
                { label: 'Default (16px)', width: 16, height: 16, cr: 1   },
                { label: 'Loose  (28px)', width: 28, height: 28, cr: 1.5 },
              ].map(({ label, width, height, cr }) => (
                <div key={label} className="space-y-1.5">
                  <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500">{label}</p>
                  <div className="relative h-28 overflow-hidden rounded-xl
                    bg-slate-950 ring-1 ring-white/8">
                    <DotPattern width={width} height={height} cr={cr} />
                  </div>
                </div>
              ))}
            </div>
          </PreviewCard>

          {/* GridPattern default */}
          <PreviewCard label="Grid Pattern — Default">
            <div className="relative h-48 overflow-hidden rounded-xl
              bg-slate-950 ring-1 ring-white/8">
              <GridPattern />
            </div>
          </PreviewCard>

          {/* GridPattern highlighted squares */}
          <PreviewCard label="Grid Pattern — Highlighted Squares">
            <div className="space-y-2">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Pass <code className="font-mono text-[11px] text-indigo-600 dark:text-indigo-300
                  bg-indigo-50 dark:bg-indigo-500/10 px-1 rounded">squares</code> as{' '}
                <code className="font-mono text-[11px]">[col, row]</code> pairs to highlight specific cells.
              </p>
              <div className="relative h-48 overflow-hidden rounded-xl
                bg-slate-950 ring-1 ring-white/8">
                <GridPattern
                  width={48}
                  height={48}
                  squares={DEMO_SQUARES}
                  className="[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]"
                />
              </div>
            </div>
          </PreviewCard>

          {/* GridPattern dashed */}
          <PreviewCard label="Grid Pattern — Dashed Lines">
            <div className="relative h-48 overflow-hidden rounded-xl
              bg-slate-950 ring-1 ring-white/8">
              <GridPattern lineStrokeDasharray="4 4" />
            </div>
          </PreviewCard>

          {/* GradientBackground */}
          <PreviewCard label="Gradient Background — Absolute Mode">
            <div className="space-y-2">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                <code className="font-mono text-[11px] text-indigo-600 dark:text-indigo-300
                  bg-indigo-50 dark:bg-indigo-500/10 px-1 rounded">fixed={'{false}'}</code>{' '}
                fills the nearest <code className="font-mono text-[11px]">relative</code> parent.
                The default <code className="font-mono text-[11px]">fixed</code> mode sits behind
                the entire viewport — render it once in your root layout.
              </p>
              <div className="relative h-48 overflow-hidden rounded-xl ring-1
                ring-slate-200/60 dark:ring-white/8">
                <GradientBackground fixed={false} />
                <div className="relative z-10 flex h-full items-center justify-center">
                  <p className="text-slate-700 dark:text-white/70 text-sm font-medium">
                    Content renders above the gradient
                  </p>
                </div>
              </div>
            </div>
          </PreviewCard>

        </div>
      )}

      {/* ── CODE TAB ──────────────────────────────────────── */}
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

      {/* ── PROPS TABLES ──────────────────────────────────── */}
      <div className="space-y-8">

        <div>
          <h2 className="text-xs font-semibold tracking-wider uppercase mb-3
            text-slate-400 dark:text-slate-500">
            DotPattern — Props API
          </h2>
          <PropsTable rows={dotProps} />
        </div>

        <div>
          <h2 className="text-xs font-semibold tracking-wider uppercase mb-3
            text-slate-400 dark:text-slate-500">
            GridPattern — Props API
          </h2>
          <PropsTable rows={gridProps} />
        </div>

        <div>
          <h2 className="text-xs font-semibold tracking-wider uppercase mb-3
            text-slate-400 dark:text-slate-500">
            GradientBackground — Props API
          </h2>
          <PropsTable rows={gradientProps} />
        </div>

      </div>

    </div>
  );
}
