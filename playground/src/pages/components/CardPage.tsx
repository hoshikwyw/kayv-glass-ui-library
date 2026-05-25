import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Copy, Check, Star, TrendingUp, Users, Zap } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter, Button, Badge } from '../../../../src';

type Tab = 'preview' | 'code';

// ── Props API ──────────────────────────────────────────────────────────────────

const cardPropsData = [
  {
    name: 'variant',
    type: "'default' | 'elevated' | 'bordered' | 'ghost'",
    defaultVal: "'default'",
    description: 'Controls glass intensity and shadow depth.',
  },
  {
    name: 'padding',
    type: "'none' | 'sm' | 'md' | 'lg'",
    defaultVal: "'md'",
    description: 'Inner padding of the card surface.',
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

const subPropsData = [
  {
    name: 'CardHeader',
    props: 'title?, description?, children?, className?, …div',
    description: 'Renders a title and optional description above content. Accepts children for custom slot content.',
  },
  {
    name: 'CardContent',
    props: 'children, className?, …div',
    description: 'Main body area. Applies a base text style that sub-content can override.',
  },
  {
    name: 'CardFooter',
    props: 'children, className?, …div',
    description: 'Actions row with a top divider, flex layout, and gap between children.',
  },
];

// ── Code snippets ──────────────────────────────────────────────────────────────

const snippets: Record<string, string> = {
  Variants: `import { Card, CardHeader, CardContent } from 'kayv-glass-ui';

<Card variant="default">
  <CardHeader title="Default" description="Subtle frosted glass." />
  <CardContent>Body content goes here.</CardContent>
</Card>

<Card variant="elevated">
  <CardHeader title="Elevated" description="Stronger blur and deeper shadow." />
  <CardContent>Body content goes here.</CardContent>
</Card>

<Card variant="bordered">
  <CardHeader title="Bordered" description="Heavier border, minimal fill." />
  <CardContent>Body content goes here.</CardContent>
</Card>

<Card variant="ghost">
  <CardHeader title="Ghost" description="Transparent with a faint outline." />
  <CardContent>Body content goes here.</CardContent>
</Card>`,

  'Sub-components': `import { Card, CardHeader, CardContent, CardFooter, Button } from 'kayv-glass-ui';

<Card>
  <CardHeader
    title="Card title"
    description="Supporting description for the card."
  />
  <CardContent>
    Your main content lives here — text, images, lists, anything.
  </CardContent>
  <CardFooter>
    <Button size="sm" variant="primary">Confirm</Button>
    <Button size="sm" variant="ghost">Cancel</Button>
  </CardFooter>
</Card>`,

  Padding: `<Card padding="none">No padding</Card>
<Card padding="sm">Small — p-4</Card>
<Card padding="md">Medium — p-6 (default)</Card>
<Card padding="lg">Large — p-8</Card>`,

  'className Override': `<Card className="max-w-sm ring-2 ring-indigo-300/40 dark:ring-indigo-500/30">
  <CardHeader title="Custom ring" />
  <CardContent>tailwind-merge handles conflicts cleanly.</CardContent>
</Card>`,
};

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
      bg-indigo-50 dark:bg-indigo-500/10
      px-1.5 py-0.5 rounded-md border border-indigo-100 dark:border-indigo-500/20">
      {children}
    </code>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function CardPage() {
  const [tab, setTab] = useState<Tab>('preview');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-10">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs mb-6 text-slate-400 dark:text-slate-600">
        <Link to="/overview" className="hover:text-slate-600 dark:hover:text-slate-400 transition-colors">
          Components
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-700 dark:text-slate-300">Card</span>
      </nav>

      {/* Title + description */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-slate-900 dark:text-white">
          Card
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xl">
          A frosted glass container built with <Chip>React.forwardRef</Chip>. Compose with{' '}
          <Chip>CardHeader</Chip>, <Chip>CardContent</Chip>, and <Chip>CardFooter</Chip> for
          structured layouts, or place any children directly inside for freeform use. Four
          variants control glass intensity and shadow depth.
        </p>
      </div>

      {/* Tab switcher */}
      <div className="flex items-center gap-1 p-1 rounded-xl w-fit mb-6
        bg-slate-100/60 dark:bg-slate-800/60
        border border-slate-200/40 dark:border-white/5 backdrop-blur-sm">
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
          <SectionCard label="Variants">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(['default', 'elevated', 'bordered', 'ghost'] as const).map(variant => (
                <Card key={variant} variant={variant}>
                  <CardHeader
                    title={variant.charAt(0).toUpperCase() + variant.slice(1)}
                    description={
                      variant === 'default'  ? 'Subtle frosted glass surface.' :
                      variant === 'elevated' ? 'Stronger blur and deeper shadow.' :
                      variant === 'bordered' ? 'Heavier border, minimal fill.' :
                                              'Transparent with a faint outline.'
                    }
                  />
                  <CardContent>
                    Sample body content for this variant.
                  </CardContent>
                </Card>
              ))}
            </div>
          </SectionCard>

          {/* Sub-components */}
          <SectionCard label="With CardHeader + CardContent + CardFooter">
            <div className="max-w-sm">
              <Card>
                <CardHeader
                  title="Confirm deletion"
                  description="This action cannot be undone. The item will be permanently removed."
                />
                <CardContent>
                  Are you sure you want to delete <strong className="text-slate-800 dark:text-slate-200">project-alpha</strong>?
                </CardContent>
                <CardFooter>
                  <Button size="sm" variant="primary">Delete</Button>
                  <Button size="sm" variant="ghost">Cancel</Button>
                </CardFooter>
              </Card>
            </div>
          </SectionCard>

          {/* Padding */}
          <SectionCard label="Padding">
            <div className="flex flex-col gap-3">
              {(['none', 'sm', 'md', 'lg'] as const).map(p => (
                <Card key={p} padding={p} variant="bordered">
                  <span className="text-sm text-slate-600 dark:text-slate-400 font-mono">
                    padding="{p}"{p === 'md' ? '  ← default' : ''}
                  </span>
                </Card>
              ))}
            </div>
          </SectionCard>

          {/* Real-world: stat cards */}
          <SectionCard label="Real-world — Stats">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card variant="default" padding="sm">
                <div className="flex items-start justify-between mb-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Revenue</p>
                  <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-100 dark:border-emerald-500/20">
                    <TrendingUp className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">$48,295</p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-medium">+12.5% this month</p>
              </Card>

              <Card variant="default" padding="sm">
                <div className="flex items-start justify-between mb-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Users</p>
                  <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-500/15 border border-blue-100 dark:border-blue-500/20">
                    <Users className="h-3.5 w-3.5 text-blue-500 dark:text-blue-400" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">3,842</p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1 font-medium">+284 new today</p>
              </Card>

              <Card variant="default" padding="sm">
                <div className="flex items-start justify-between mb-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Rating</p>
                  <div className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-500/15 border border-amber-100 dark:border-amber-500/20">
                    <Star className="h-3.5 w-3.5 text-amber-500 dark:text-amber-400" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">4.9</p>
                <p className="text-xs text-amber-600 dark:text-amber-400 mt-1 font-medium">from 1,204 reviews</p>
              </Card>
            </div>
          </SectionCard>

          {/* Real-world: feature card */}
          <SectionCard label="Real-world — Feature Card">
            <div className="max-w-sm">
              <Card variant="elevated">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-500/15 border border-indigo-100 dark:border-indigo-500/20">
                    <Zap className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Instant deploy</h3>
                    <Badge variant="success" size="sm" dot>Live</Badge>
                  </div>
                </div>
                <CardContent>
                  Push to main and your changes are live in seconds — zero config, fully automated.
                </CardContent>
                <CardFooter>
                  <Button size="sm" variant="primary">Deploy now</Button>
                  <Button size="sm" variant="ghost">View logs</Button>
                </CardFooter>
              </Card>
            </div>
          </SectionCard>

          {/* className override */}
          <SectionCard label="className Override">
            <div className="max-w-sm">
              <Card className="ring-2 ring-indigo-300/50 dark:ring-indigo-500/30 border-indigo-200/50 dark:border-indigo-500/20">
                <CardHeader title="Custom ring" description="Applied via className — tailwind-merge handles conflicts." />
                <CardContent>Any Tailwind class you add wins over defaults.</CardContent>
              </Card>
            </div>
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

      {/* ── PROPS TABLES ─────────────────────────────────── */}
      <div className="flex flex-col gap-8">
        {/* Card props */}
        <div>
          <h2 className="text-xs font-semibold tracking-wider uppercase mb-3 text-slate-400 dark:text-slate-500">
            Card Props
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
                {cardPropsData.map(p => (
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

        {/* Sub-component reference */}
        <div>
          <h2 className="text-xs font-semibold tracking-wider uppercase mb-3 text-slate-400 dark:text-slate-500">
            Sub-components
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-white/60 dark:border-white/10
            bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100/60 dark:border-white/5 bg-slate-50/60 dark:bg-slate-700/30">
                  {['Component', 'Key Props', 'Description'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-[10px] font-semibold
                      uppercase tracking-widest text-slate-400 dark:text-slate-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/60 dark:divide-white/5">
                {subPropsData.map(p => (
                  <tr key={p.name} className="hover:bg-white/40 dark:hover:bg-white/5 transition-colors">
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <code className="text-indigo-600 dark:text-indigo-400 text-xs font-mono">{p.name}</code>
                    </td>
                    <td className="px-5 py-3.5">
                      <code className="text-blue-600 dark:text-amber-300/80 text-xs font-mono">{p.props}</code>
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
