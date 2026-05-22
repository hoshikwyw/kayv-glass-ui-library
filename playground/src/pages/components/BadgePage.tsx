import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Copy, Check } from 'lucide-react';
import { Badge } from '../../../../src';

type Tab = 'preview' | 'code';

// ── Props API ──────────────────────────────────────────────────────────────────

const propsData = [
  {
    name: 'variant',
    type: "'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'",
    defaultVal: "'default'",
    description: 'Controls the semantic color and glass tint of the badge.',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    defaultVal: "'md'",
    description: 'Controls padding and font size.',
  },
  {
    name: 'dot',
    type: 'boolean',
    defaultVal: 'false',
    description: 'Renders a small colored dot before the label — useful for live status indicators.',
  },
  {
    name: 'className',
    type: 'string',
    defaultVal: '—',
    description: 'Merged on top of base styles via tailwind-merge — conflicting classes always win.',
  },
  {
    name: '...props',
    type: 'React.ComponentPropsWithoutRef<"span">',
    defaultVal: '—',
    description: 'All native span attributes are forwarded to the underlying element.',
  },
];

// ── Code snippets ──────────────────────────────────────────────────────────────

const snippets: Record<string, string> = {
  Variants: `import { Badge } from 'kayv-glass-ui';

<Badge variant="default">Default</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="danger">Danger</Badge>
<Badge variant="info">Info</Badge>`,

  Sizes: `<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>`,

  'Dot Indicator': `{/* Prepend a live-status dot */}
<Badge variant="success" dot>Online</Badge>
<Badge variant="warning" dot>Degraded</Badge>
<Badge variant="danger" dot>Offline</Badge>
<Badge variant="info" dot>Syncing</Badge>`,

  'className Override': `{/* tailwind-merge resolves conflicts — your classes always win */}
<Badge className="rounded-md">Square</Badge>
<Badge variant="primary" className="font-bold tracking-wide">
  Bold
</Badge>`,
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
      <div className="px-6 py-8 flex flex-wrap items-center gap-3">
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

export default function BadgePage() {
  const [tab, setTab] = useState<Tab>('preview');

  return (
    <div className="max-w-4xl mx-auto px-8 py-10">

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
        <span className="text-slate-700 dark:text-slate-300">Badge</span>
      </nav>

      {/* Title + description */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2
          text-slate-900 dark:text-white">
          Badge
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xl">
          A compact, ref-forwarding status indicator built with{' '}
          <Chip>React.forwardRef</Chip>. Supports six semantic variants, three sizes,
          and an optional <Chip>dot</Chip> pulse marker for live status.
          Incoming <Chip>className</Chip> values are safely merged with{' '}
          <Chip>tailwind-merge</Chip> so overrides always win without class conflicts.
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
          <PreviewCard label="Variants">
            <Badge variant="default">Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="info">Info</Badge>
          </PreviewCard>

          <PreviewCard label="Sizes">
            <Badge size="sm">Small</Badge>
            <Badge size="md">Medium</Badge>
            <Badge size="lg">Large</Badge>
          </PreviewCard>

          <PreviewCard label="Sizes × Variants">
            {(['sm', 'md', 'lg'] as const).map(size =>
              (['default', 'primary', 'success', 'warning', 'danger', 'info'] as const).map(variant => (
                <Badge key={`${size}-${variant}`} size={size} variant={variant}>
                  {variant}
                </Badge>
              ))
            )}
          </PreviewCard>

          <PreviewCard label="Dot Indicator">
            <Badge variant="success" dot>Online</Badge>
            <Badge variant="warning" dot>Degraded</Badge>
            <Badge variant="danger" dot>Offline</Badge>
            <Badge variant="info" dot>Syncing</Badge>
            <Badge variant="default" dot>Idle</Badge>
          </PreviewCard>

          <PreviewCard label="Dot × Sizes">
            <Badge variant="success" dot size="sm">Small</Badge>
            <Badge variant="success" dot size="md">Medium</Badge>
            <Badge variant="success" dot size="lg">Large</Badge>
          </PreviewCard>

          <PreviewCard label="className Override">
            <Badge className="rounded-md">Square corners</Badge>
            <Badge variant="primary" className="font-bold tracking-wide uppercase text-[9px]">
              Bold
            </Badge>
            <Badge
              variant="success"
              className="bg-gradient-to-r from-emerald-400/20 to-teal-400/20
                border-emerald-300/40 dark:border-emerald-500/30"
            >
              Gradient tint
            </Badge>
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
