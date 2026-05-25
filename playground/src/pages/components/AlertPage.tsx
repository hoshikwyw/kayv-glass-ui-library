import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Copy, Check } from 'lucide-react';
import { Alert, Button } from '../../../../src';
import type { AlertVariant } from '../../../../src';

type Tab = 'preview' | 'code';

// ── Props API ──────────────────────────────────────────────────────────────────

const propsData = [
  {
    name: 'variant',
    type: "'default' | 'success' | 'warning' | 'danger' | 'info'",
    defaultVal: "'default'",
    description: 'Controls the semantic color, background tint, and icon.',
  },
  {
    name: 'title',
    type: 'string',
    defaultVal: 'undefined',
    description: 'Bold label rendered above the description. Optional.',
  },
  {
    name: 'onDismiss',
    type: '() => void',
    defaultVal: 'undefined',
    description: 'When provided, a dismiss button appears. Caller controls visibility.',
  },
  {
    name: 'children',
    type: 'ReactNode',
    defaultVal: 'undefined',
    description: 'Description content. Accepts strings, inline elements, or any JSX.',
  },
  {
    name: 'className',
    type: 'string',
    defaultVal: '—',
    description: 'Merged via tailwind-merge — conflicting classes always win.',
  },
  {
    name: '...props',
    type: 'React.ComponentPropsWithoutRef<"div">',
    defaultVal: '—',
    description: 'All native div attributes are forwarded to the underlying element.',
  },
];

// ── Code snippets ──────────────────────────────────────────────────────────────

const snippets: Record<string, string> = {
  Variants: `import { Alert } from 'kayv-glass-ui';

<Alert variant="default">A general notification message.</Alert>
<Alert variant="success">Your changes have been saved.</Alert>
<Alert variant="warning">Storage is at 90% capacity.</Alert>
<Alert variant="danger">The action failed. Please try again.</Alert>
<Alert variant="info">A new version is available.</Alert>`,

  'With Title': `<Alert variant="success" title="Payment complete">
  Your invoice has been sent to billing@company.com.
</Alert>

<Alert variant="danger" title="Upload failed">
  File exceeds the 10 MB size limit.
</Alert>`,

  'Title Only': `{/* Useful for short one-liner confirmations */}
<Alert variant="success" title="Copied to clipboard!" />
<Alert variant="info"    title="Read-only mode active" />`,

  Dismissible: `import { useState } from 'react';
import { Alert } from 'kayv-glass-ui';

function Example() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <Alert
      variant="warning"
      title="Action required"
      onDismiss={() => setVisible(false)}
    >
      Please verify your email address before continuing.
    </Alert>
  );
}`,

  'Custom Content': `{/* children accepts any JSX */}
<Alert variant="info" title="Quick start">
  Run{' '}
  <code className="font-mono text-xs px-1 py-0.5 rounded bg-blue-100 dark:bg-blue-500/20">
    npm install @kwyw/kayv-glass-ui
  </code>{' '}
  then import any component you need.
</Alert>`,
};

// ── Sub-components ─────────────────────────────────────────────────────────────

function SectionCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl overflow-hidden
      border border-white/60 dark:border-white/10
      bg-white/40 dark:bg-slate-800/40
      backdrop-blur-sm shadow-sm shadow-slate-100/50 dark:shadow-black/10">
      <div className="px-5 py-3.5 border-b border-slate-100/50 dark:border-white/5 bg-white/30 dark:bg-slate-700/20">
        <span className="text-xs font-semibold tracking-wider uppercase text-slate-400 dark:text-slate-500">
          {label}
        </span>
      </div>
      <div className="px-6 py-6 flex flex-col gap-3">{children}</div>
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
    <div className="rounded-2xl overflow-hidden border border-slate-700/40 bg-slate-900/95 backdrop-blur-sm shadow-sm">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-700/50">
        <span className="text-xs text-slate-500 font-mono">tsx</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="px-5 py-4 text-sm font-mono leading-relaxed text-slate-300 overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function Chip({ children }: { children: string }) {
  return (
    <code className="text-indigo-600 dark:text-indigo-300 text-xs font-mono
      bg-indigo-50 dark:bg-indigo-500/10 px-1.5 py-0.5 rounded-md
      border border-indigo-100 dark:border-indigo-500/20">
      {children}
    </code>
  );
}

// ── Dismissible demo ───────────────────────────────────────────────────────────

function DismissibleDemo() {
  const [dismissed, setDismissed] = useState<Set<AlertVariant>>(new Set());

  const configs: { variant: AlertVariant; title: string; desc: string }[] = [
    { variant: 'success', title: 'Deployment complete',    desc: 'v2.4.1 is live on production.' },
    { variant: 'warning', title: 'Storage almost full',   desc: 'You have used 92% of your 5 GB quota.' },
    { variant: 'danger',  title: 'Payment failed',         desc: 'Card ending in 4242 was declined.' },
    { variant: 'info',    title: 'Scheduled maintenance',  desc: 'Sunday 02:00–04:00 UTC. Expect brief downtime.' },
    { variant: 'default', title: 'New message',            desc: 'Alex left a comment on your pull request.' },
  ];

  const visible = configs.filter(c => !dismissed.has(c.variant));
  const allDismissed = visible.length === 0;

  return (
    <div className="flex flex-col gap-3">
      {visible.map(({ variant, title, desc }) => (
        <Alert
          key={variant}
          variant={variant}
          title={title}
          onDismiss={() => setDismissed(prev => new Set([...prev, variant]))}
        >
          {desc}
        </Alert>
      ))}
      {allDismissed && (
        <p className="text-sm text-slate-400 dark:text-slate-600 text-center py-2">
          All dismissed.{' '}
          <button
            onClick={() => setDismissed(new Set())}
            className="text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
          >
            Reset
          </button>
        </p>
      )}
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function AlertPage() {
  const [tab, setTab] = useState<Tab>('preview');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-10">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs mb-6 text-slate-400 dark:text-slate-600">
        <Link to="/overview" className="hover:text-slate-600 dark:hover:text-slate-400 transition-colors">
          Components
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-700 dark:text-slate-300">Alert</span>
      </nav>

      {/* Title + description */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-slate-900 dark:text-white">
          Alert
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xl">
          A ref-forwarding inline feedback banner built with{' '}
          <Chip>React.forwardRef</Chip>. Supports five semantic variants, an optional{' '}
          <Chip>title</Chip>, rich <Chip>children</Chip> for custom content, and an{' '}
          <Chip>onDismiss</Chip> callback that surfaces a close button — keeping visibility
          state in the caller.
        </p>
      </div>

      {/* Tab switcher */}
      <div className="flex items-center gap-1 p-1 rounded-xl w-fit mb-6
        bg-slate-100/60 dark:bg-slate-800/60 border border-slate-200/40 dark:border-white/5 backdrop-blur-sm">
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
          <SectionCard label="Variants — description only">
            <Alert variant="default">A general notification message.</Alert>
            <Alert variant="success">Your changes have been saved successfully.</Alert>
            <Alert variant="warning">Storage is at 90% capacity. Consider upgrading.</Alert>
            <Alert variant="danger">The action failed. Please try again or contact support.</Alert>
            <Alert variant="info">A new version of kayv-glass-ui is available.</Alert>
          </SectionCard>

          {/* Title + description */}
          <SectionCard label="Title + Description">
            <Alert variant="success" title="Payment complete">
              Your invoice has been sent to billing@company.com.
            </Alert>
            <Alert variant="danger" title="Upload failed">
              File exceeds the 10 MB size limit. Please compress and retry.
            </Alert>
            <Alert variant="warning" title="Session expiring">
              You'll be signed out in 5 minutes due to inactivity.
            </Alert>
            <Alert variant="info" title="Maintenance window">
              Scheduled downtime on Sunday 02:00–04:00 UTC.
            </Alert>
          </SectionCard>

          {/* Title only */}
          <SectionCard label="Title only — no description">
            <Alert variant="success" title="Copied to clipboard!" />
            <Alert variant="info"    title="Read-only mode is active" />
            <Alert variant="warning" title="Unsaved changes will be lost" />
          </SectionCard>

          {/* Dismissible */}
          <SectionCard label="Dismissible — caller controls visibility">
            <DismissibleDemo />
          </SectionCard>

          {/* Custom content */}
          <SectionCard label="Custom children">
            <Alert variant="info" title="Quick start">
              Run{' '}
              <code className="font-mono text-xs px-1.5 py-0.5 rounded-md
                bg-blue-100 dark:bg-blue-500/20
                text-blue-700 dark:text-blue-300
                border border-blue-200/60 dark:border-blue-500/25">
                npm install @kwyw/kayv-glass-ui
              </code>{' '}
              then import any component you need.
            </Alert>

            <Alert variant="warning" title="Peer dependency required">
              This library requires{' '}
              <code className="font-mono text-xs px-1.5 py-0.5 rounded-md
                bg-amber-100 dark:bg-amber-500/20
                text-amber-700 dark:text-amber-300
                border border-amber-200/60 dark:border-amber-500/25">
                tailwindcss ^3.0.0
              </code>{' '}
              or{' '}
              <code className="font-mono text-xs px-1.5 py-0.5 rounded-md
                bg-amber-100 dark:bg-amber-500/20
                text-amber-700 dark:text-amber-300
                border border-amber-200/60 dark:border-amber-500/25">
                ^4.0.0
              </code>{' '}
              to be installed in your project.
            </Alert>

            <Alert variant="danger" title="Irreversible action">
              <p className="mb-3">
                Deleting your account removes all data permanently — projects, billing history,
                and API keys cannot be recovered.
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="primary"
                  className="bg-rose-500 hover:bg-rose-600 border-rose-400/50 text-white
                    shadow-rose-500/20 focus-visible:ring-rose-400">
                  Delete account
                </Button>
                <Button size="sm" variant="ghost">Cancel</Button>
              </div>
            </Alert>
          </SectionCard>

        </div>
      )}

      {/* ── CODE TAB ────────────────────────────────────── */}
      {tab === 'code' && (
        <div className="flex flex-col gap-6 mb-12">
          {Object.entries(snippets).map(([label, code]) => (
            <div key={label}>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-600 mb-2">
                {label}
              </p>
              <CodeBlock code={code} />
            </div>
          ))}
        </div>
      )}

      {/* ── PROPS TABLE ─────────────────────────────────── */}
      <div>
        <h2 className="text-xs font-semibold tracking-wider uppercase mb-3 text-slate-400 dark:text-slate-500">
          Props API
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-white/60 dark:border-white/10
          bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100/60 dark:border-white/5 bg-slate-50/60 dark:bg-slate-700/30">
                {['Prop', 'Type', 'Default', 'Description'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-[10px] font-semibold
                    uppercase tracking-widest text-slate-400 dark:text-slate-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/60 dark:divide-white/5">
              {propsData.map(p => (
                <tr key={p.name} className="hover:bg-white/40 dark:hover:bg-white/5 transition-colors">
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <code className="text-indigo-600 dark:text-indigo-400 text-xs font-mono">{p.name}</code>
                  </td>
                  <td className="px-5 py-3.5">
                    <code className="text-blue-600 dark:text-amber-300/80 text-xs font-mono">{p.type}</code>
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <code className="text-slate-500 dark:text-slate-400 text-xs font-mono">{p.defaultVal}</code>
                  </td>
                  <td className="px-5 py-3.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
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
