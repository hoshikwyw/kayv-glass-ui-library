import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Copy, Check, Globe, Palette, Layers } from 'lucide-react';
import { Select, Button, Badge } from '../../../../src';

type Tab = 'preview' | 'code';

// ── Data ──────────────────────────────────────────────────────────────────────

const countries = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'sg', label: 'Singapore' },
];

const frameworks = [
  { value: 'next',    label: 'Next.js' },
  { value: 'remix',   label: 'Remix' },
  { value: 'vite',    label: 'Vite' },
  { value: 'astro',   label: 'Astro' },
  { value: 'gatsby',  label: 'Gatsby', disabled: true },
  { value: 'cra',     label: 'Create React App', disabled: true },
];

const themes = [
  { value: 'system',  label: 'System default' },
  { value: 'light',   label: 'Light' },
  { value: 'dark',    label: 'Dark' },
];

const roles = [
  { value: 'owner',   label: 'Owner' },
  { value: 'admin',   label: 'Admin' },
  { value: 'editor',  label: 'Editor' },
  { value: 'viewer',  label: 'Viewer' },
  { value: 'guest',   label: 'Guest', disabled: true },
];

const statusOptions = [
  { value: 'active',      label: 'Active' },
  { value: 'idle',        label: 'Idle' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'offline',     label: 'Offline' },
];

// ── Props API ──────────────────────────────────────────────────────────────────

const propsData = [
  { name: 'options',       type: 'SelectOption[]',    defaultVal: '—',                    description: 'Required. Array of { value, label, disabled? } objects.' },
  { name: 'value',         type: 'string',            defaultVal: 'undefined',            description: 'Controlled selected value. Provide onChange to update it.' },
  { name: 'defaultValue',  type: 'string',            defaultVal: 'undefined',            description: 'Initial value for uncontrolled usage.' },
  { name: 'onChange',      type: '(value: string) => void', defaultVal: 'undefined',     description: 'Called with the selected value when the user picks an option.' },
  { name: 'placeholder',   type: 'string',            defaultVal: "'Select an option…'",  description: 'Shown when no option is selected.' },
  { name: 'size',          type: "'sm' | 'md' | 'lg'", defaultVal: "'md'",               description: 'Controls trigger height, padding, and font size.' },
  { name: 'label',         type: 'string',            defaultVal: 'undefined',            description: 'Renders a <label> associated with the trigger via id.' },
  { name: 'hint',          type: 'string',            defaultVal: 'undefined',            description: 'Helper text below the trigger when there is no error.' },
  { name: 'error',         type: 'string',            defaultVal: 'undefined',            description: 'Error message below the trigger; applies error border + ring.' },
  { name: 'leftIcon',      type: 'ReactNode',         defaultVal: 'undefined',            description: 'Node pinned to the left edge of the trigger.' },
  { name: 'disabled',      type: 'boolean',           defaultVal: 'false',                description: 'Disables the trigger and prevents opening.' },
  { name: 'className',     type: 'string',            defaultVal: '—',                    description: 'Applied to the trigger button via tailwind-merge.' },
];

// ── Code snippets ──────────────────────────────────────────────────────────────

const snippets: Record<string, string> = {
  Basic: `import { Select } from 'kayv-glass-ui';

const options = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
];

<Select options={options} placeholder="Choose a country…" />`,

  'Controlled': `import { useState } from 'react';
import { Select } from 'kayv-glass-ui';

function Example() {
  const [theme, setTheme] = useState('system');

  return (
    <Select
      label="Theme"
      options={[
        { value: 'system', label: 'System default' },
        { value: 'light',  label: 'Light' },
        { value: 'dark',   label: 'Dark' },
      ]}
      value={theme}
      onChange={setTheme}
    />
  );
}`,

  'Label, Hint & Error': `<Select
  label="Framework"
  hint="Only actively maintained frameworks are available."
  options={frameworks}
  placeholder="Pick a framework…"
/>

<Select
  label="Role"
  error="You must select a role before continuing."
  options={roles}
/>`,

  'Left Icon': `import { Globe } from 'lucide-react';
import { Select } from 'kayv-glass-ui';

<Select
  label="Country"
  leftIcon={<Globe className="h-4 w-4" />}
  options={countries}
  placeholder="Select country…"
/>`,

  'Disabled Options': `{/* Pass disabled: true on individual options */}
const options = [
  { value: 'next',  label: 'Next.js' },
  { value: 'vite',  label: 'Vite' },
  { value: 'cra',   label: 'Create React App', disabled: true },
];

<Select options={options} />`,

  Sizes: `<Select size="sm" options={options} placeholder="Small" />
<Select size="md" options={options} placeholder="Medium (default)" />
<Select size="lg" options={options} placeholder="Large" />`,
};

// ── Sub-components ─────────────────────────────────────────────────────────────

function SectionCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl
      border border-white/60 dark:border-white/10
      bg-white/40 dark:bg-slate-800/40
      backdrop-blur-sm shadow-sm shadow-slate-100/50 dark:shadow-black/10">
      <div className="px-5 py-3.5 rounded-t-2xl border-b border-slate-100/50 dark:border-white/5 bg-white/30 dark:bg-slate-700/20">
        <span className="text-xs font-semibold tracking-wider uppercase text-slate-400 dark:text-slate-500">
          {label}
        </span>
      </div>
      <div className="px-6 py-6 flex flex-col gap-4">{children}</div>
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
        <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors">
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

// ── Controlled demo ────────────────────────────────────────────────────────────

function ControlledDemo() {
  const [country, setCountry] = useState('');
  const [framework, setFramework] = useState('next');
  const [theme, setTheme] = useState('system');

  return (
    <div className="flex flex-col gap-4">
      <Select
        label="Country"
        leftIcon={<Globe className="h-4 w-4" />}
        options={countries}
        value={country}
        onChange={setCountry}
        placeholder="Select a country…"
        hint={country ? undefined : 'Required for billing.'}
        error={!country ? undefined : undefined}
      />
      <Select
        label="Framework"
        leftIcon={<Layers className="h-4 w-4" />}
        options={frameworks}
        value={framework}
        onChange={setFramework}
        hint="Greyed-out options are deprecated."
      />
      <Select
        label="Theme"
        leftIcon={<Palette className="h-4 w-4" />}
        options={themes}
        value={theme}
        onChange={setTheme}
      />
      {country && (
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Selected:{' '}
          <span className="font-medium text-slate-700 dark:text-slate-300">
            {countries.find(c => c.value === country)?.label}
          </span>
          {' · '}
          <span className="font-medium text-slate-700 dark:text-slate-300">
            {frameworks.find(f => f.value === framework)?.label}
          </span>
          {' · '}
          <span className="font-medium text-slate-700 dark:text-slate-300">
            {themes.find(t => t.value === theme)?.label}
          </span>
        </p>
      )}
    </div>
  );
}

// ── Status demo ────────────────────────────────────────────────────────────────

const statusBadgeVariant: Record<string, 'success' | 'warning' | 'danger' | 'default'> = {
  active:      'success',
  idle:        'warning',
  maintenance: 'warning',
  offline:     'danger',
};

function StatusDemo() {
  const [status, setStatus] = useState('active');
  const variant = statusBadgeVariant[status] ?? 'default';

  return (
    <div className="flex items-end gap-4 max-w-sm">
      <div className="flex-1">
        <Select
          label="Server status"
          options={statusOptions}
          value={status}
          onChange={setStatus}
        />
      </div>
      <div className="mb-0.5">
        <Badge variant={variant} dot size="md">
          {statusOptions.find(s => s.value === status)?.label ?? status}
        </Badge>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function SelectPage() {
  const [tab, setTab] = useState<Tab>('preview');

  return (
    <div className="max-w-4xl mx-auto px-8 py-10">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs mb-6 text-slate-400 dark:text-slate-600">
        <Link to="/overview" className="hover:text-slate-600 dark:hover:text-slate-400 transition-colors">
          Components
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-700 dark:text-slate-300">Select</span>
      </nav>

      {/* Title + description */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-slate-900 dark:text-white">
          Select
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xl">
          A custom-styled dropdown built with <Chip>React.forwardRef</Chip>. Supports
          controlled and uncontrolled usage, keyboard navigation (arrow keys, Enter, Escape),
          disabled individual options, optional <Chip>leftIcon</Chip>, and the same{' '}
          <Chip>label</Chip> / <Chip>hint</Chip> / <Chip>error</Chip> pattern as{' '}
          <Chip>Input</Chip>. Fully accessible with ARIA combobox + listbox semantics.
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

          {/* Sizes */}
          <SectionCard label="Sizes">
            <Select size="sm" options={themes} placeholder="Small" />
            <Select size="md" options={themes} placeholder="Medium (default)" />
            <Select size="lg" options={themes} placeholder="Large" />
          </SectionCard>

          {/* Label, hint, error */}
          <SectionCard label="Label, Hint & Error">
            <Select
              label="Framework"
              hint="Greyed-out options are no longer maintained."
              options={frameworks}
              placeholder="Pick a framework…"
            />
            <Select
              label="Role"
              error="You must select a role to continue."
              options={roles}
              placeholder="Select a role…"
            />
            <Select
              label="Default value (uncontrolled)"
              defaultValue="editor"
              options={roles}
              hint="Starts with Editor pre-selected."
            />
          </SectionCard>

          {/* Left icon */}
          <SectionCard label="Left Icon">
            <Select
              label="Country"
              leftIcon={<Globe className="h-4 w-4" />}
              options={countries}
              placeholder="Select a country…"
            />
            <Select
              label="Theme"
              leftIcon={<Palette className="h-4 w-4" />}
              options={themes}
              defaultValue="system"
            />
          </SectionCard>

          {/* Controlled */}
          <SectionCard label="Controlled — live state">
            <ControlledDemo />
          </SectionCard>

          {/* Disabled options + whole select */}
          <SectionCard label="Disabled Options & Disabled Select">
            <Select
              label="Framework (some deprecated)"
              options={frameworks}
              defaultValue="next"
              hint="Gatsby and CRA are disabled."
            />
            <Select
              label="Disabled select"
              options={themes}
              disabled
              defaultValue="dark"
            />
          </SectionCard>

          {/* Composing with Badge */}
          <SectionCard label="Real-world — Status Selector with Badge">
            <StatusDemo />
          </SectionCard>

          {/* Real-world: invite form */}
          <SectionCard label="Real-world — Invite Form">
            <div className="max-w-sm flex flex-col gap-4">
              <Select
                label="Member role"
                options={roles}
                defaultValue="viewer"
                hint="Owners can manage billing and delete the workspace."
              />
              <Select
                label="Access scope"
                options={[
                  { value: 'all',     label: 'All projects' },
                  { value: 'select',  label: 'Selected projects' },
                  { value: 'none',    label: 'No project access' },
                ]}
                defaultValue="all"
              />
              <Button variant="primary" className="w-full justify-center">
                Send invite
              </Button>
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

      {/* ── PROPS TABLE ─────────────────────────────────── */}
      <div>
        <h2 className="text-xs font-semibold tracking-wider uppercase mb-3 text-slate-400 dark:text-slate-500">
          Props API
        </h2>
        <div className="rounded-2xl overflow-hidden border border-white/60 dark:border-white/10
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
