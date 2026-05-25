import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Copy, Check } from 'lucide-react';
import { Checkbox, Button } from '../../../../src';

type Tab = 'preview' | 'code';

// ── Props data ─────────────────────────────────────────────────────────────────

const propsData = [
  { name: 'checked',        type: 'boolean',                   defaultVal: '—',     description: 'Controlled checked state.' },
  { name: 'defaultChecked', type: 'boolean',                   defaultVal: 'false', description: 'Initial checked state (uncontrolled mode).' },
  { name: 'onChange',       type: 'React.ChangeEventHandler',  defaultVal: '—',     description: 'Called when the checked state changes.' },
  { name: 'indeterminate',  type: 'boolean',                   defaultVal: 'false', description: 'Shows a dash — for partial selection (e.g. select-all rows).' },
  { name: 'size',           type: "'sm' | 'md' | 'lg'",        defaultVal: "'md'",  description: 'Visual size of the checkbox and its label text.' },
  { name: 'label',          type: 'string',                    defaultVal: '—',     description: 'Label text rendered beside the checkbox.' },
  { name: 'description',    type: 'string',                    defaultVal: '—',     description: 'Helper text rendered below the label.' },
  { name: 'disabled',       type: 'boolean',                   defaultVal: 'false', description: 'Prevents interaction and reduces opacity.' },
  { name: 'className',      type: 'string',                    defaultVal: '—',     description: 'Merged on top of the label wrapper styles.' },
  { name: '...props',       type: "Omit<React.ComponentPropsWithoutRef<'input'>, 'size' | 'type'>", defaultVal: '—', description: 'All other native input attributes forwarded to the hidden input.' },
];

// ── Code snippets ──────────────────────────────────────────────────────────────

const snippets: Record<string, string> = {
  Basic: `import { Checkbox } from 'kayv-glass-ui';

<Checkbox label="Accept terms" />
<Checkbox label="Remember me" defaultChecked />
<Checkbox label="Disabled" disabled />
<Checkbox label="Disabled checked" disabled defaultChecked />`,

  Sizes: `<Checkbox size="sm" label="Small" description="14 × 14 px box" />
<Checkbox size="md" label="Medium" description="16 × 16 px box — default" />
<Checkbox size="lg" label="Large" description="20 × 20 px box" />`,

  Indeterminate: `{/* Useful for "select all" patterns where items are partially selected */}
<Checkbox indeterminate label="Select all" />`,

  Controlled: `import { useState } from 'react';

function Example() {
  const [agreed, setAgreed] = useState(false);

  return (
    <Checkbox
      checked={agreed}
      onChange={e => setAgreed(e.target.checked)}
      label="I agree to the terms and conditions"
      description="By checking this you accept our privacy policy."
    />
  );
}`,

  'Select all pattern': `import { useState } from 'react';

const ITEMS = ['Design review', 'Code review', 'QA testing'];

function SelectAll() {
  const [selected, setSelected] = useState<string[]>([]);

  const allChecked    = selected.length === ITEMS.length;
  const someChecked   = selected.length > 0 && !allChecked;

  const toggleAll = () =>
    setSelected(allChecked ? [] : [...ITEMS]);

  const toggle = (item: string) =>
    setSelected(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );

  return (
    <div>
      <Checkbox
        checked={allChecked}
        indeterminate={someChecked}
        onChange={toggleAll}
        label="Select all"
      />
      {ITEMS.map(item => (
        <Checkbox
          key={item}
          checked={selected.includes(item)}
          onChange={() => toggle(item)}
          label={item}
        />
      ))}
    </div>
  );
}`,
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
      <div className="px-5 sm:px-6 py-6 flex flex-col gap-3">
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

// ── Select-all demo ────────────────────────────────────────────────────────────

const TASKS = [
  { id: 'design',  label: 'Design review',   desc: 'Review Figma mockups' },
  { id: 'code',    label: 'Code review',      desc: 'Check pull requests'  },
  { id: 'qa',      label: 'QA testing',       desc: 'Run test suite'        },
  { id: 'deploy',  label: 'Deploy to staging',desc: 'Push to staging env'  },
];

function SelectAllDemo() {
  const [selected, setSelected] = useState<string[]>(['design', 'code']);

  const allChecked  = selected.length === TASKS.length;
  const someChecked = selected.length > 0 && !allChecked;

  const toggleAll = () => setSelected(allChecked ? [] : TASKS.map(t => t.id));
  const toggle = (id: string) =>
    setSelected(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );

  return (
    <div className="space-y-1">
      <div className="pb-2 mb-2 border-b border-slate-100/60 dark:border-white/8">
        <Checkbox
          checked={allChecked}
          indeterminate={someChecked}
          onChange={toggleAll}
          label="Select all tasks"
          size="md"
        />
      </div>
      <div className="space-y-1 pl-1">
        {TASKS.map(task => (
          <Checkbox
            key={task.id}
            checked={selected.includes(task.id)}
            onChange={() => toggle(task.id)}
            label={task.label}
            description={task.desc}
            size="md"
          />
        ))}
      </div>
      <p className="text-xs text-slate-400 dark:text-slate-500 mt-3 pt-3
        border-t border-slate-100/60 dark:border-white/8">
        {selected.length} of {TASKS.length} selected
      </p>
    </div>
  );
}

// ── Form example ───────────────────────────────────────────────────────────────

function FormDemo() {
  const [values, setValues] = useState({
    email:    true,
    push:     false,
    sms:      false,
    security: true,
    updates:  false,
  });

  const toggle = (key: keyof typeof values) =>
    setValues(v => ({ ...v, [key]: !v[key] }));

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider
          text-slate-400 dark:text-slate-500 mb-3">
          Notification channels
        </p>
        <div className="space-y-2.5">
          <Checkbox
            checked={values.email}
            onChange={() => toggle('email')}
            label="Email notifications"
            description="Receive updates and alerts via email."
          />
          <Checkbox
            checked={values.push}
            onChange={() => toggle('push')}
            label="Push notifications"
            description="Get browser or mobile push alerts."
          />
          <Checkbox
            checked={values.sms}
            onChange={() => toggle('sms')}
            label="SMS notifications"
            description="Text messages for critical alerts only."
          />
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100/60 dark:border-white/8">
        <p className="text-xs font-semibold uppercase tracking-wider
          text-slate-400 dark:text-slate-500 mb-3">
          Preferences
        </p>
        <div className="space-y-2.5">
          <Checkbox
            checked={values.security}
            onChange={() => toggle('security')}
            label="Security alerts"
            description="Always on — cannot be disabled."
            disabled
            defaultChecked
          />
          <Checkbox
            checked={values.updates}
            onChange={() => toggle('updates')}
            label="Product updates"
            description="News about new features and improvements."
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 pt-2">
        <Button variant="primary" size="sm">Save preferences</Button>
        <Button variant="ghost" size="sm">Reset to defaults</Button>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function CheckboxPage() {
  const [tab, setTab] = useState<Tab>('preview');
  const [controlled, setControlled] = useState(false);

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
        <span className="text-slate-700 dark:text-slate-300">Checkbox</span>
      </nav>

      {/* Title + description */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2
          text-slate-900 dark:text-white">
          Checkbox
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xl">
          A glass-style checkbox with three sizes, an <Chip>indeterminate</Chip> state
          for partial selection, optional <Chip>label</Chip> and{' '}
          <Chip>description</Chip>, and both controlled/uncontrolled modes.
          A visually hidden native input preserves full form compatibility and
          keyboard accessibility.
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

          {/* States */}
          <PreviewCard label="States">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Checkbox label="Unchecked" />
              <Checkbox label="Checked" defaultChecked />
              <Checkbox label="Indeterminate" indeterminate />
              <Checkbox label="Disabled" disabled />
              <Checkbox label="Disabled checked" disabled defaultChecked />
              <Checkbox label="Disabled indeterminate" disabled indeterminate />
            </div>
          </PreviewCard>

          {/* Sizes */}
          <PreviewCard label="Sizes">
            <Checkbox
              size="sm"
              label="Small"
              description="14 × 14 px — compact forms"
              defaultChecked
            />
            <Checkbox
              size="md"
              label="Medium (default)"
              description="16 × 16 px — standard usage"
              defaultChecked
            />
            <Checkbox
              size="lg"
              label="Large"
              description="20 × 20 px — prominent actions"
              defaultChecked
            />
          </PreviewCard>

          {/* Without label */}
          <PreviewCard label="Without label">
            <div className="flex flex-wrap items-center gap-4">
              <Checkbox />
              <Checkbox defaultChecked />
              <Checkbox indeterminate />
              <Checkbox disabled />
              <Checkbox size="sm" />
              <Checkbox size="sm" defaultChecked />
              <Checkbox size="lg" />
              <Checkbox size="lg" defaultChecked />
            </div>
          </PreviewCard>

          {/* Controlled */}
          <PreviewCard label="Controlled">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setControlled(v => !v)}
                >
                  Toggle from outside
                </Button>
                <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                  checked: <span className="text-kv-600 dark:text-kv-400">{String(controlled)}</span>
                </span>
              </div>
              <Checkbox
                checked={controlled}
                onChange={e => setControlled(e.target.checked)}
                label="I agree to the terms and conditions"
                description="By checking this you accept our privacy policy and cookie usage."
              />
            </div>
          </PreviewCard>

          {/* Select-all pattern */}
          <PreviewCard label="Select all pattern (indeterminate)">
            <SelectAllDemo />
          </PreviewCard>

          {/* Form example */}
          <PreviewCard label="Notification settings form">
            <FormDemo />
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
              {propsData.map(p => (
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
      </div>

    </div>
  );
}
