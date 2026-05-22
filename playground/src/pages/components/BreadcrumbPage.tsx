import { Breadcrumb } from '../../../../src';
import type { BreadcrumbItem } from '../../../../src';
import { Home, Package, Cpu, Laptop, Slash } from 'lucide-react';

// ── Helpers ───────────────────────────────────────────────────────────────────

function SectionCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/60 dark:border-white/10 bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm shadow-sm shadow-slate-100/50 dark:shadow-black/10">
      <div className="px-5 py-3.5 border-b border-slate-200/50 dark:border-white/5">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {label}
        </span>
      </div>
      <div className="px-5 py-6 flex flex-col gap-5">{children}</div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
        {label}
      </span>
      {children}
    </div>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────

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

const single: BreadcrumbItem[] = [{ label: 'Dashboard' }];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function BreadcrumbPage() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-10 flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Breadcrumb</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Navigation trail showing hierarchy with support for icons, truncation, and custom separators.
        </p>
      </div>

      {/* Basic */}
      <SectionCard label="Basic">
        <Row label="3 items">
          <Breadcrumb items={basic} />
        </Row>
        <Row label="Single (current page only)">
          <Breadcrumb items={single} />
        </Row>
      </SectionCard>

      {/* With icons */}
      <SectionCard label="With icons">
        <Breadcrumb items={withIcons} />
      </SectionCard>

      {/* Truncation */}
      <SectionCard label="Truncation (maxItems)">
        <Row label="maxItems=3 — 6 items collapsed">
          <Breadcrumb items={deep} maxItems={3} />
        </Row>
        <Row label="maxItems=4">
          <Breadcrumb items={deep} maxItems={4} />
        </Row>
        <Row label="No truncation (all 6 shown)">
          <Breadcrumb items={deep} />
        </Row>
      </SectionCard>

      {/* Custom separator */}
      <SectionCard label="Custom separator">
        <Row label="Slash">
          <Breadcrumb
            items={basic}
            separator={<Slash className="h-3 w-3 text-slate-300 dark:text-slate-600" />}
          />
        </Row>
        <Row label="Text ·">
          <Breadcrumb
            items={basic}
            separator={
              <span className="text-slate-300 dark:text-slate-600 text-xs select-none">·</span>
            }
          />
        </Row>
        <Row label="Arrow →">
          <Breadcrumb
            items={basic}
            separator={
              <span className="text-slate-300 dark:text-slate-600 text-xs select-none">→</span>
            }
          />
        </Row>
      </SectionCard>

      {/* API */}
      <SectionCard label="API">
        <div className="flex flex-col gap-1 font-mono text-xs text-slate-600 dark:text-slate-400">
          {[
            ['items', 'BreadcrumbItem[]', 'required'],
            ['separator', 'ReactNode', '<ChevronRight />'],
            ['maxItems', 'number', '—'],
          ].map(([prop, type, def]) => (
            <div
              key={prop}
              className="grid grid-cols-[120px_1fr_120px] gap-4 py-1.5 border-b border-slate-100 dark:border-white/5 last:border-0"
            >
              <span className="text-indigo-600 dark:text-indigo-400">{prop}</span>
              <span className="text-slate-500 dark:text-slate-500 truncate">{type}</span>
              <span className="text-slate-400">{def}</span>
            </div>
          ))}
        </div>
        <div className="mt-1 font-mono text-xs text-slate-600 dark:text-slate-400">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
            BreadcrumbItem
          </p>
          {[
            ['label', 'string', 'required'],
            ['href', 'string', '—'],
            ['icon', 'ReactNode', '—'],
          ].map(([prop, type, def]) => (
            <div
              key={prop}
              className="grid grid-cols-[120px_1fr_120px] gap-4 py-1.5 border-b border-slate-100 dark:border-white/5 last:border-0"
            >
              <span className="text-indigo-600 dark:text-indigo-400">{prop}</span>
              <span className="text-slate-500 dark:text-slate-500 truncate">{type}</span>
              <span className="text-slate-400">{def}</span>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
