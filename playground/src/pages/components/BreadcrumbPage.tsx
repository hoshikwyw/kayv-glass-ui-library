import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Copy, Check, Home, Package, Cpu, Laptop, Slash } from 'lucide-react';
import { Breadcrumb } from '../../../../src';
import type { BreadcrumbItem } from '../../../../src';

type Tab = 'preview' | 'code';

// ── Props API ──────────────────────────────────────────────────────────────────

const propsData = [
  {
    name: 'items',
    type: 'BreadcrumbItem[]',
    defaultVal: 'required',
    description: 'Ordered list of breadcrumb segments. The last item is treated as the current page.',
  },
  {
    name: 'separator',
    type: 'ReactNode',
    defaultVal: '<ChevronRight />',
    description: 'Element rendered between each breadcrumb segment. Override with any icon or string.',
  },
  {
    name: 'maxItems',
    type: 'number',
    defaultVal: '—',
    description: 'Maximum segments to show. When exceeded, interior items collapse into a … ellipsis.',
  },
  {
    name: 'className',
    type: 'string',
    defaultVal: '—',
    description: 'Extra classes merged onto the nav wrapper via tailwind-merge.',
  },
];

const itemPropsData = [
  {
    name: 'label',
    type: 'string',
    defaultVal: 'required',
    description: 'Visible text for the breadcrumb segment.',
  },
  {
    name: 'href',
    type: 'string',
    defaultVal: '—',
    description: 'When provided the segment renders as an <a> link; omit for the current page.',
  },
  {
    name: 'icon',
    type: 'ReactNode',
    defaultVal: '—',
    description: 'Optional icon rendered to the left of the label.',
  },
];

// ── Code snippets ──────────────────────────────────────────────────────────────

const snippets: Record<string, string> = {
  Basic: `import { Breadcrumb } from 'kayv-glass-ui';
import type { BreadcrumbItem } from 'kayv-glass-ui';

const items: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Laptops' },          // no href → current page
];

<Breadcrumb items={items} />`,

  'With Icons': `import { Home, Package, Cpu, Laptop } from 'lucide-react';

const items: BreadcrumbItem[] = [
  { label: 'Home',        href: '/', icon: <Home className="h-3.5 w-3.5" /> },
  { label: 'Products',   href: '/products', icon: <Package className="h-3.5 w-3.5" /> },
  { label: 'Electronics', href: '/products/electronics', icon: <Cpu className="h-3.5 w-3.5" /> },
  { label: 'MacBook Pro', icon: <Laptop className="h-3.5 w-3.5" /> },
];

<Breadcrumb items={items} />`,

  Truncation: `{/* 6 items — collapse interior segments with maxItems */}
const deep: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Electronics', href: '/shop/electronics' },
  { label: 'Computers', href: '/shop/electronics/computers' },
  { label: 'Laptops', href: '/shop/electronics/computers/laptops' },
  { label: 'MacBook Pro 14"' },
];

{/* Shows: Home / … / Laptops / MacBook Pro 14" */}
<Breadcrumb items={deep} maxItems={3} />

{/* Shows: Home / … / Computers / Laptops / MacBook Pro 14" */}
<Breadcrumb items={deep} maxItems={4} />`,

  'Custom Separator': `import { Slash } from 'lucide-react';

{/* Icon separator */}
<Breadcrumb
  items={items}
  separator={<Slash className="h-3 w-3 text-slate-300 dark:text-slate-600" />}
/>

{/* Text dot separator */}
<Breadcrumb
  items={items}
  separator={<span className="text-slate-300 dark:text-slate-600 text-xs">·</span>}
/>

{/* Arrow separator */}
<Breadcrumb
  items={items}
  separator={<span className="text-slate-300 dark:text-slate-600 text-xs">→</span>}
/>`,
};

// ── Fixture data ───────────────────────────────────────────────────────────────

const basic: BreadcrumbItem[] = [
  { label: 'Home', href: '#' },
  { label: 'Products', href: '#' },
  { label: 'Laptops' },
];

const deep: BreadcrumbItem[] = [
  { label: 'Home', href: '#' },
  { label: 'Shop', href: '#' },
  { label: 'Electronics', href: '#' },
  { label: 'Computers', href: '#' },
  { label: 'Laptops', href: '#' },
  { label: 'MacBook Pro 14"' },
];

const withIcons: BreadcrumbItem[] = [
  { label: 'Home', href: '#', icon: <Home className="h-3.5 w-3.5" /> },
  { label: 'Products', href: '#', icon: <Package className="h-3.5 w-3.5" /> },
  { label: 'Electronics', href: '#', icon: <Cpu className="h-3.5 w-3.5" /> },
  { label: 'MacBook Pro', icon: <Laptop className="h-3.5 w-3.5" /> },
];

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
      <div className="px-6 py-8 flex flex-col gap-5">
        {children}
      </div>
    </div>
  );
}

function PreviewRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
        {label}
      </span>
      {children}
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

function PropsTable({ data }: { data: typeof propsData }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/60 dark:border-white/10
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
          {data.map(p => (
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
              <td className="px-5 py-3.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
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

export default function BreadcrumbPage() {
  const [tab, setTab] = useState<Tab>('preview');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-10">

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
        <span className="text-slate-700 dark:text-slate-300">Breadcrumb</span>
      </nav>

      {/* Title + description */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2
          text-slate-900 dark:text-white">
          Breadcrumb
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xl">
          Navigation trail built with semantic <Chip>{"<nav>"}</Chip> and{' '}
          <Chip>{"<ol>"}</Chip> markup. Supports per-item icons, a configurable{' '}
          <Chip>separator</Chip>, and automatic truncation via <Chip>maxItems</Chip> that
          collapses interior segments into a … ellipsis while always keeping the first and
          last items visible.
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
            <PreviewRow label="3 items">
              <Breadcrumb items={basic} />
            </PreviewRow>
            <PreviewRow label="Single — current page only">
              <Breadcrumb items={[{ label: 'Dashboard' }]} />
            </PreviewRow>
          </PreviewCard>

          <PreviewCard label="With Icons">
            <Breadcrumb items={withIcons} />
          </PreviewCard>

          <PreviewCard label="Truncation — maxItems">
            <PreviewRow label="maxItems=3 — 6 items, interior collapsed">
              <Breadcrumb items={deep} maxItems={3} />
            </PreviewRow>
            <PreviewRow label="maxItems=4">
              <Breadcrumb items={deep} maxItems={4} />
            </PreviewRow>
            <PreviewRow label="No truncation — all 6 shown">
              <Breadcrumb items={deep} />
            </PreviewRow>
          </PreviewCard>

          <PreviewCard label="Custom Separator">
            <PreviewRow label="Slash icon">
              <Breadcrumb
                items={basic}
                separator={<Slash className="h-3 w-3 text-slate-300 dark:text-slate-600" />}
              />
            </PreviewRow>
            <PreviewRow label="Dot ·">
              <Breadcrumb
                items={basic}
                separator={<span className="text-slate-300 dark:text-slate-600 text-xs select-none">·</span>}
              />
            </PreviewRow>
            <PreviewRow label="Arrow →">
              <Breadcrumb
                items={basic}
                separator={<span className="text-slate-300 dark:text-slate-600 text-xs select-none">→</span>}
              />
            </PreviewRow>
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
      <div className="flex flex-col gap-8">
        <div>
          <h2 className="text-xs font-semibold tracking-wider uppercase mb-3
            text-slate-400 dark:text-slate-500">
            Props API — Breadcrumb
          </h2>
          <PropsTable data={propsData} />
        </div>

        <div>
          <h2 className="text-xs font-semibold tracking-wider uppercase mb-3
            text-slate-400 dark:text-slate-500">
            BreadcrumbItem
          </h2>
          <PropsTable data={itemPropsData} />
        </div>
      </div>
    </div>
  );
}
