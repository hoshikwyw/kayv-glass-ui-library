import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Copy, Check } from 'lucide-react';
import { Button } from '../../../../src';

type Tab = 'preview' | 'code';

// ── Props API data ─────────────────────────────────────────────────────────────

const propsData = [
  {
    name: 'variant',
    type: "'primary' | 'secondary' | 'ghost'",
    defaultVal: "'primary'",
    description: 'Controls the visual style of the button.',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    defaultVal: "'md'",
    description: 'Controls padding, height, and font size.',
  },
  {
    name: 'isLoading',
    type: 'boolean',
    defaultVal: 'false',
    description: 'Replaces content with a spinner and sets aria-busy on the element.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultVal: 'false',
    description: 'Native disabled — prevents interaction and reduces opacity to 50%.',
  },
  {
    name: 'className',
    type: 'string',
    defaultVal: '—',
    description: 'Merged on top of base styles via tailwind-merge — conflicting classes always win.',
  },
  {
    name: '...props',
    type: 'React.ComponentPropsWithoutRef<"button">',
    defaultVal: '—',
    description: 'All native button attributes are forwarded to the underlying element.',
  },
];

// ── Code examples ──────────────────────────────────────────────────────────────

const snippets: Record<string, string> = {
  Variants: `import { Button } from 'kayv-glass-ui';

<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>`,

  Sizes: `<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`,

  'Loading & Disabled': `{/* isLoading disables the button and injects a spinner */}
<Button isLoading variant="primary" />
<Button isLoading variant="secondary" />

{/* disabled forwards the native HTML attribute */}
<Button disabled variant="primary">Disabled</Button>`,

  'className Override': `{/* tailwind-merge resolves conflicting classes safely */}
<Button className="rounded-full bg-violet-600 hover:bg-violet-700">
  Pill Violet
</Button>

<Button
  variant="primary"
  className="bg-gradient-to-r from-indigo-500 to-violet-600
             hover:from-indigo-600 hover:to-violet-700"
>
  Gradient
</Button>`,
};

// ── Sub-components ─────────────────────────────────────────────────────────────

function PreviewCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
      <div className="px-5 py-3 border-b border-white/5 bg-slate-800/30">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
          {label}
        </span>
      </div>
      <div className="px-5 py-8 flex flex-wrap items-center gap-3">{children}</div>
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
    <div className="rounded-xl border border-white/10 bg-slate-900/80 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5">
        <span className="text-xs text-slate-600 font-mono">tsx</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-slate-500
            hover:text-slate-300 transition-colors"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-emerald-400" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="px-5 py-4 text-sm font-mono leading-relaxed text-slate-300 overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function ButtonPage() {
  const [tab, setTab] = useState<Tab>('preview');

  return (
    <div className="max-w-4xl mx-auto px-8 py-10">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-600 mb-6">
        <Link to="/overview" className="hover:text-slate-400 transition-colors">
          Components
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-300">Button</span>
      </nav>

      {/* Title + description */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Button</h1>
        <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
          A fully accessible, ref-forwarding button built with{' '}
          <code className="text-indigo-300 text-xs font-mono">React.forwardRef</code>.
          Supports three semantic variants, three sizes, a managed loading state, and
          accepts all native HTML button attributes. Incoming{' '}
          <code className="text-indigo-300 text-xs font-mono">className</code> values
          are safely merged with{' '}
          <code className="text-indigo-300 text-xs font-mono">tailwind-merge</code>{' '}
          so overrides always win without class conflicts.
        </p>
      </div>

      {/* Tab switcher */}
      <div className="flex items-center gap-1 p-1 rounded-lg bg-white/5 border
        border-white/10 w-fit mb-6">
        {(['preview', 'code'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all capitalize ${
              tab === t
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                : 'text-slate-500 hover:text-slate-300'
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
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
          </PreviewCard>

          <PreviewCard label="Sizes">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </PreviewCard>

          <PreviewCard label="Sizes × Variants">
            {(['sm', 'md', 'lg'] as const).map(size =>
              (['primary', 'secondary', 'ghost'] as const).map(variant => (
                <Button key={`${size}-${variant}`} size={size} variant={variant}>
                  {variant} {size}
                </Button>
              ))
            )}
          </PreviewCard>

          <PreviewCard label="States — Loading">
            <Button isLoading variant="primary" size="sm" />
            <Button isLoading variant="primary" />
            <Button isLoading variant="secondary" />
            <Button isLoading variant="ghost" />
          </PreviewCard>

          <PreviewCard label="States — Disabled">
            <Button disabled variant="primary">Disabled</Button>
            <Button disabled variant="secondary">Disabled</Button>
            <Button disabled variant="ghost">Disabled</Button>
          </PreviewCard>

          <PreviewCard label="className Override">
            <Button className="rounded-full bg-violet-600 hover:bg-violet-700 focus-visible:ring-violet-500">
              Pill Violet
            </Button>
            <Button
              variant="primary"
              className="bg-gradient-to-r from-indigo-500 to-violet-600
                hover:from-indigo-600 hover:to-violet-700 shadow-lg shadow-indigo-500/20"
            >
              Gradient
            </Button>
            <Button
              variant="ghost"
              className="text-rose-400 hover:bg-rose-500/10 hover:text-rose-300"
            >
              Danger Ghost
            </Button>
          </PreviewCard>
        </div>
      )}

      {/* ── CODE TAB ────────────────────────────────────── */}
      {tab === 'code' && (
        <div className="flex flex-col gap-6 mb-12">
          {Object.entries(snippets).map(([label, code]) => (
            <div key={label}>
              <p className="text-xs font-semibold uppercase tracking-widest
                text-slate-600 mb-2">
                {label}
              </p>
              <CodeBlock code={code} />
            </div>
          ))}
        </div>
      )}

      {/* ── PROPS TABLE (always visible) ─────────────────── */}
      <div>
        <h2 className="text-sm font-semibold text-slate-300 mb-3">Props API</h2>
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-slate-800/40">
                {['Prop', 'Type', 'Default', 'Description'].map(h => (
                  <th
                    key={h}
                    className="text-left px-5 py-3 text-[10px] font-semibold
                      uppercase tracking-widest text-slate-500"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {propsData.map(p => (
                <tr key={p.name} className="hover:bg-white/5 transition-colors">
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <code className="text-indigo-300 text-xs font-mono">{p.name}</code>
                  </td>
                  <td className="px-5 py-3.5">
                    <code className="text-amber-300/80 text-xs font-mono">{p.type}</code>
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <code className="text-slate-400 text-xs font-mono">{p.defaultVal}</code>
                  </td>
                  <td className="px-5 py-3.5 text-slate-400 text-xs leading-relaxed">
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
