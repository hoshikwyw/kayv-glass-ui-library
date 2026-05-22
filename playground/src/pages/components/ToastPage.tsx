import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Copy, Check } from 'lucide-react';
import { toast } from '../../../../src';
import type { ToastPosition } from '../../../../src';

type Tab = 'preview' | 'code';

// ── Props API ──────────────────────────────────────────────────────────────────

const propsData = [
  {
    name: 'title',
    type: 'string',
    defaultVal: '—',
    description: 'The main message displayed in the toast.',
  },
  {
    name: 'description',
    type: 'string',
    defaultVal: 'undefined',
    description: 'Optional supporting text rendered below the title.',
  },
  {
    name: 'variant',
    type: "'default' | 'success' | 'warning' | 'danger' | 'info'",
    defaultVal: "'default'",
    description: 'Controls the semantic color and icon.',
  },
  {
    name: 'duration',
    type: 'number',
    defaultVal: '4000',
    description: 'Milliseconds before auto-dismiss. Pass 0 to persist until manually closed.',
  },
];

const toasterPropsData = [
  {
    name: 'position',
    type: "'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'",
    defaultVal: "'bottom-right'",
    description: 'Fixed position of the toast stack on screen.',
  },
];

// ── Code snippets ──────────────────────────────────────────────────────────────

const snippets: Record<string, string> = {
  Setup: `// Add <Toaster /> once at your app root
import { Toaster } from 'kayv-glass-ui';

export default function App() {
  return (
    <>
      <Toaster position="bottom-right" />
      {/* rest of your app */}
    </>
  );
}`,

  Variants: `import { toast } from 'kayv-glass-ui';

// Convenience methods
toast.success('Changes saved');
toast.warning('Storage almost full');
toast.danger('Something went wrong');
toast.info('New version available');

// Or with variant option
toast({ title: 'Notification', variant: 'default' });`,

  'With Description': `toast.success('Payment complete', {
  description: 'Your invoice has been sent to billing@company.com',
});

toast.danger('Upload failed', {
  description: 'File exceeds the 10 MB limit.',
});`,

  'Persistent Toast': `// Pass duration: 0 to disable auto-dismiss
toast.info('Saving changes…', { duration: 0 });

// Dismiss it programmatically
// (toast() returns void — use the id pattern below)
toast({ title: 'Persistent', variant: 'warning', duration: 0 });`,

  'Custom Duration': `// Default is 4000ms
toast.success('Quick flash', { duration: 1500 });
toast.info('Read this carefully', { duration: 8000 });`,
};

// ── Trigger buttons ────────────────────────────────────────────────────────────

const positions: ToastPosition[] = [
  'top-right',
  'top-left',
  'bottom-right',
  'bottom-left',
  'top-center',
  'bottom-center',
];

// ── Sub-components ─────────────────────────────────────────────────────────────

function SectionCard({ label, children }: { label: string; children: ReactNode }) {
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
      <div className="px-6 py-6 flex flex-wrap items-center gap-3">
        {children}
      </div>
    </div>
  );
}

function TriggerButton({
  label,
  onClick,
  color = 'slate',
}: {
  label: string;
  onClick: () => void;
  color?: 'slate' | 'emerald' | 'amber' | 'rose' | 'blue' | 'indigo';
}) {
  const colors: Record<string, string> = {
    slate:   'bg-slate-100/70 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 border-slate-200/60 dark:border-slate-600/40 hover:bg-slate-200/70 dark:hover:bg-slate-600/60',
    emerald: 'bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-200/60 dark:border-emerald-500/25 hover:bg-emerald-100/80 dark:hover:bg-emerald-500/25',
    amber:   'bg-amber-50 dark:bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-200/60 dark:border-amber-500/25 hover:bg-amber-100/80 dark:hover:bg-amber-500/25',
    rose:    'bg-rose-50 dark:bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-200/60 dark:border-rose-500/25 hover:bg-rose-100/80 dark:hover:bg-rose-500/25',
    blue:    'bg-blue-50 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-200/60 dark:border-blue-500/25 hover:bg-blue-100/80 dark:hover:bg-blue-500/25',
    indigo:  'bg-indigo-50 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-200/60 dark:border-indigo-500/25 hover:bg-indigo-100/80 dark:hover:bg-indigo-500/25',
  };
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center px-3.5 py-1.5 rounded-xl text-sm font-medium
        border backdrop-blur-sm transition-all duration-150 active:scale-95 ${colors[color]}`}
    >
      {label}
    </button>
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

export default function ToastPage() {
  const [tab, setTab] = useState<Tab>('preview');
  const [position, setPosition] = useState<ToastPosition>('bottom-right');

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
        <span className="text-slate-700 dark:text-slate-300">Toast</span>
      </nav>

      {/* Title + description */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2
          text-slate-900 dark:text-white">
          Toast
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xl">
          Non-blocking notification messages driven by a module-level event bus — no Provider
          required. Add <Chip>{'<Toaster />'}</Chip> once at your app root, then call{' '}
          <Chip>toast()</Chip> from anywhere. Supports five semantic variants, an optional
          description, configurable duration, and six screen positions.
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
          <SectionCard label="Variants">
            <TriggerButton label="Default" color="slate" onClick={() => toast({ title: 'Notification' })} />
            <TriggerButton label="Success" color="emerald" onClick={() => toast.success('Changes saved!')} />
            <TriggerButton label="Warning" color="amber" onClick={() => toast.warning('Storage almost full')} />
            <TriggerButton label="Danger"  color="rose"   onClick={() => toast.danger('Something went wrong')} />
            <TriggerButton label="Info"    color="blue"   onClick={() => toast.info('New version available')} />
          </SectionCard>

          <SectionCard label="With Description">
            <TriggerButton
              label="Success + description"
              color="emerald"
              onClick={() =>
                toast.success('Payment complete', {
                  description: 'Your invoice has been sent to billing@company.com',
                })
              }
            />
            <TriggerButton
              label="Danger + description"
              color="rose"
              onClick={() =>
                toast.danger('Upload failed', {
                  description: 'File exceeds the 10 MB limit.',
                })
              }
            />
            <TriggerButton
              label="Info + description"
              color="blue"
              onClick={() =>
                toast.info('Heads up', {
                  description: 'Scheduled maintenance on Sunday at 02:00 UTC.',
                })
              }
            />
          </SectionCard>

          <SectionCard label="Persistent (duration: 0)">
            <TriggerButton
              label="Persistent warning"
              color="amber"
              onClick={() =>
                toast.warning('Action required', {
                  description: 'Please verify your email address to continue.',
                  duration: 0,
                })
              }
            />
            <TriggerButton
              label="Persistent info"
              color="blue"
              onClick={() =>
                toast.info('Syncing data…', { duration: 0 })
              }
            />
          </SectionCard>

          <SectionCard label="Custom Duration">
            <TriggerButton
              label="1.5 s"
              color="slate"
              onClick={() => toast({ title: 'Gone quickly', duration: 1500 })}
            />
            <TriggerButton
              label="4 s (default)"
              color="slate"
              onClick={() => toast({ title: 'Default duration' })}
            />
            <TriggerButton
              label="8 s"
              color="slate"
              onClick={() => toast({ title: 'Sticks around', duration: 8000 })}
            />
          </SectionCard>

          <SectionCard label="Position">
            <div className="w-full flex flex-col gap-3">
              <div className="flex flex-wrap gap-2">
                {positions.map(p => (
                  <button
                    key={p}
                    onClick={() => setPosition(p)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
                      position === p
                        ? 'bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 border-indigo-200/60 dark:border-indigo-500/25'
                        : 'bg-white/40 dark:bg-slate-700/40 text-slate-600 dark:text-slate-400 border-slate-200/50 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Note: <Chip>{'<Toaster />'}</Chip> in this playground is fixed to{' '}
                <Chip>bottom-right</Chip>. The selected position below is passed inline
                to a second ephemeral toaster for demo purposes.
              </p>
              <div>
                <TriggerButton
                  label={`Trigger at ${position}`}
                  color="indigo"
                  onClick={() =>
                    toast.info(`Appearing at ${position}`, {
                      description: 'Change the selection above to try other positions.',
                    })
                  }
                />
              </div>
            </div>
          </SectionCard>
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

      {/* ── PROPS TABLES ─────────────────────────────────── */}
      <div className="flex flex-col gap-8">
        {/* toast() options */}
        <div>
          <h2 className="text-xs font-semibold tracking-wider uppercase mb-3
            text-slate-400 dark:text-slate-500">
            toast() Options
          </h2>
          <div className="rounded-2xl overflow-hidden
            border border-white/60 dark:border-white/10
            bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm shadow-sm">
            <table className="w-full text-sm">
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

        {/* Toaster props */}
        <div>
          <h2 className="text-xs font-semibold tracking-wider uppercase mb-3
            text-slate-400 dark:text-slate-500">
            {'<Toaster />'} Props
          </h2>
          <div className="rounded-2xl overflow-hidden
            border border-white/60 dark:border-white/10
            bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm shadow-sm">
            <table className="w-full text-sm">
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
                {toasterPropsData.map(p => (
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
    </div>
  );
}
