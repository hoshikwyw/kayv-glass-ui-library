import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Copy, Check, Star, Info, AlertTriangle } from 'lucide-react';
import { Tooltip, Button } from '../../../../src';

type Tab = 'preview' | 'code';

// ── Props API ──────────────────────────────────────────────────────────────────

const propsData = [
  {
    name: 'content',
    type: 'ReactNode',
    defaultVal: 'required',
    description: 'The tooltip content. Accepts any React node — text, icons, or structured JSX.',
  },
  {
    name: 'children',
    type: 'ReactNode',
    defaultVal: 'required',
    description: 'The trigger element. Wrapped in an inline-flex span that captures mouse/click events.',
  },
  {
    name: 'placement',
    type: "'top' | 'bottom' | 'left' | 'right'",
    defaultVal: "'top'",
    description: 'Which side of the trigger the tooltip appears on. Includes a matching caret.',
  },
  {
    name: 'trigger',
    type: "'hover' | 'click'",
    defaultVal: "'hover'",
    description: "hover: shows on mouseenter after delay, hides on mouseleave. click: toggles on click, dismisses on outside click.",
  },
  {
    name: 'delay',
    type: 'number',
    defaultVal: '150',
    description: 'Milliseconds to wait before showing the tooltip on hover. Has no effect when trigger="click".',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultVal: 'false',
    description: 'Prevents the tooltip from opening.',
  },
  {
    name: 'className',
    type: 'string',
    defaultVal: '—',
    description: 'Extra classes merged onto the tooltip bubble via tailwind-merge.',
  },
];

// ── Code snippets ──────────────────────────────────────────────────────────────

const snippets: Record<string, string> = {
  Basic: `import { Tooltip } from 'kayv-glass-ui';

<Tooltip content="This is a tooltip">
  <Button>Hover me</Button>
</Tooltip>`,

  Placement: `{/* All four placements */}
<Tooltip content="Above the trigger" placement="top">
  <Button>Top</Button>
</Tooltip>

<Tooltip content="Below the trigger" placement="bottom">
  <Button>Bottom</Button>
</Tooltip>

<Tooltip content="Left of the trigger" placement="left">
  <Button>Left</Button>
</Tooltip>

<Tooltip content="Right of the trigger" placement="right">
  <Button>Right</Button>
</Tooltip>`,

  'Click Trigger': `{/* Click to toggle — dismisses on outside click */}
<Tooltip
  content="Click outside to close"
  trigger="click"
  placement="top"
>
  <Button variant="secondary">Click me</Button>
</Tooltip>`,

  'Rich Content': `import { Star } from 'lucide-react';

<Tooltip
  placement="top"
  content={
    <div className="flex flex-col gap-1.5">
      <span className="font-semibold text-slate-800 dark:text-slate-100">
        Pro feature
      </span>
      <span className="text-slate-500 dark:text-slate-400">
        Upgrade your plan to unlock this.
      </span>
    </div>
  }
>
  <Button variant="ghost">
    <Star className="h-4 w-4 mr-1" />
    Upgrade
  </Button>
</Tooltip>`,

  Disabled: `{/* Tooltip is suppressed when disabled=true */}
<Tooltip content="You can't see me" disabled>
  <Button disabled>Disabled trigger</Button>
</Tooltip>`,

  Delay: `{/* Appears immediately */}
<Tooltip content="No delay" delay={0}>
  <Button variant="secondary">Instant</Button>
</Tooltip>

{/* Appears after 600 ms */}
<Tooltip content="Slow tooltip" delay={600}>
  <Button variant="secondary">Slow (600 ms)</Button>
</Tooltip>`,
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
      <div className="px-6 py-10 flex flex-wrap items-center justify-center gap-4">
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

export default function TooltipPage() {
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
        <span className="text-slate-700 dark:text-slate-300">Tooltip</span>
      </nav>

      {/* Title + description */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2
          text-slate-900 dark:text-white">
          Tooltip
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xl">
          A portal-based tooltip with glass styling, directional caret, and two trigger
          modes. <Chip>hover</Chip> shows after a configurable <Chip>delay</Chip> and
          hides on mouse-leave. <Chip>click</Chip> toggles on click and dismisses on
          outside click. Content accepts any React node — text, icons, or rich JSX.
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

          <PreviewCard label="Basic">
            <Tooltip content="This is a tooltip">
              <Button>Hover me</Button>
            </Tooltip>
          </PreviewCard>

          <PreviewCard label="Placement">
            <Tooltip content="Above the trigger" placement="top">
              <Button variant="secondary">Top</Button>
            </Tooltip>
            <Tooltip content="Below the trigger" placement="bottom">
              <Button variant="secondary">Bottom</Button>
            </Tooltip>
            <Tooltip content="Left of the trigger" placement="left">
              <Button variant="secondary">Left</Button>
            </Tooltip>
            <Tooltip content="Right of the trigger" placement="right">
              <Button variant="secondary">Right</Button>
            </Tooltip>
          </PreviewCard>

          <PreviewCard label="Click Trigger">
            <Tooltip
              content="Click outside to dismiss"
              trigger="click"
              placement="top"
            >
              <Button variant="secondary">Click me</Button>
            </Tooltip>
            <Tooltip
              content="Also click-triggered"
              trigger="click"
              placement="bottom"
            >
              <Button variant="ghost">Or me</Button>
            </Tooltip>
          </PreviewCard>

          <PreviewCard label="Rich Content">
            <Tooltip
              placement="top"
              content={
                <div className="flex flex-col gap-1.5">
                  <span className="font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                    <Star className="h-3 w-3 text-amber-400" />
                    Pro feature
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                    Upgrade your plan to unlock advanced analytics.
                  </span>
                </div>
              }
            >
              <Button variant="ghost">
                <Star className="h-4 w-4 mr-1.5 text-amber-400" />
                Upgrade
              </Button>
            </Tooltip>

            <Tooltip
              placement="top"
              content={
                <div className="flex items-start gap-2">
                  <Info className="h-3.5 w-3.5 text-indigo-400 shrink-0 mt-px" />
                  <span className="text-slate-500 dark:text-slate-400 leading-relaxed">
                    Changes are auto-saved every 30 seconds.
                  </span>
                </div>
              }
            >
              <Button variant="secondary">Info</Button>
            </Tooltip>

            <Tooltip
              placement="top"
              content={
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-px" />
                  <span className="text-slate-500 dark:text-slate-400 leading-relaxed">
                    This action cannot be undone.
                  </span>
                </div>
              }
            >
              <Button
                variant="secondary"
                className="border-amber-200 dark:border-amber-500/30
                  text-amber-600 dark:text-amber-400
                  hover:bg-amber-50 dark:hover:bg-amber-500/10"
              >
                Warning
              </Button>
            </Tooltip>
          </PreviewCard>

          <PreviewCard label="Delay">
            <Tooltip content="No delay" delay={0}>
              <Button variant="ghost">Instant</Button>
            </Tooltip>
            <Tooltip content="Default (150 ms)" delay={150}>
              <Button variant="ghost">Default</Button>
            </Tooltip>
            <Tooltip content="Slow (600 ms)" delay={600}>
              <Button variant="ghost">Slow</Button>
            </Tooltip>
          </PreviewCard>

          <PreviewCard label="Disabled">
            <Tooltip content="You cannot see this" disabled>
              <Button disabled>Tooltip disabled</Button>
            </Tooltip>
            <Tooltip content="Normal tooltip">
              <Button>Normal</Button>
            </Tooltip>
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
