import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight, Copy, Check,
  Search, Mail, Lock, Eye, EyeOff, User, AtSign,
} from 'lucide-react';
import { Input, Button } from '../../../../src';

type Tab = 'preview' | 'code';

// ── Props API ──────────────────────────────────────────────────────────────────

const propsData = [
  { name: 'size',      type: "'sm' | 'md' | 'lg'",     defaultVal: "'md'",       description: 'Controls height, padding, and font size.' },
  { name: 'label',     type: 'string',                  defaultVal: 'undefined',  description: 'Renders a <label> associated with the input via id.' },
  { name: 'hint',      type: 'string',                  defaultVal: 'undefined',  description: 'Helper text shown below when there is no error.' },
  { name: 'error',     type: 'string',                  defaultVal: 'undefined',  description: 'Error message shown below; also applies error border and ring.' },
  { name: 'leftIcon',  type: 'ReactNode',               defaultVal: 'undefined',  description: 'Node pinned to the left edge of the input (icon, prefix, etc.).' },
  { name: 'rightIcon', type: 'ReactNode',               defaultVal: 'undefined',  description: 'Node pinned to the right edge of the input (icon, suffix, etc.).' },
  { name: 'className', type: 'string',                  defaultVal: '—',          description: 'Merged via tailwind-merge onto the <input> element.' },
  { name: '...props',  type: 'Omit<ComponentPropsWithoutRef<"input">, "size">', defaultVal: '—', description: 'All native input attributes forwarded. Native size is omitted to avoid conflict.' },
];

// ── Snippets ───────────────────────────────────────────────────────────────────

const snippets: Record<string, string> = {
  Basic: `import { Input } from 'kayv-glass-ui';

<Input placeholder="Enter value…" />
<Input label="Email" placeholder="you@example.com" />
<Input label="Password" type="password" />`,

  Sizes: `<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium (default)" />
<Input size="lg" placeholder="Large" />`,

  'Hint & Error': `{/* Hint: helper text below the input */}
<Input
  label="Username"
  hint="Letters, numbers, and underscores only."
  placeholder="kayv_user"
/>

{/* Error: applies red border + ring and shows message */}
<Input
  label="Email"
  error="Please enter a valid email address."
  defaultValue="not-an-email"
/>`,

  Icons: `import { Search, Mail } from 'lucide-react';
import { Input } from 'kayv-glass-ui';

{/* Left icon */}
<Input leftIcon={<Search className="h-4 w-4" />} placeholder="Search…" />

{/* Right icon */}
<Input
  label="Email"
  rightIcon={<Mail className="h-4 w-4" />}
  placeholder="you@example.com"
  type="email"
/>

{/* Both */}
<Input
  leftIcon={<AtSign className="h-4 w-4" />}
  rightIcon={<Check className="h-4 w-4 text-emerald-500" />}
  defaultValue="kayv"
/>`,

  'Disabled & ReadOnly': `<Input disabled placeholder="Disabled — no interaction" />
<Input readOnly defaultValue="Read-only value" />`,
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

// ── Password demo ──────────────────────────────────────────────────────────────

function PasswordInput() {
  const [show, setShow] = useState(false);
  return (
    <Input
      label="Password"
      type={show ? 'text' : 'password'}
      placeholder="Enter password…"
      hint="At least 8 characters."
      rightIcon={
        <button
          type="button"
          onClick={() => setShow(s => !s)}
          className="pointer-events-auto text-slate-400 hover:text-slate-600
            dark:text-slate-500 dark:hover:text-slate-300 transition-colors"
          aria-label={show ? 'Hide password' : 'Show password'}
        >
          {show
            ? <EyeOff className="h-4 w-4" />
            : <Eye className="h-4 w-4" />}
        </button>
      }
    />
  );
}

// ── Validation demo ────────────────────────────────────────────────────────────

function ValidationDemo() {
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const error = touched && email && !isValid ? 'Please enter a valid email address.' : undefined;
  const hint = !touched || !email ? "We'll never share your email." : undefined;

  return (
    <Input
      label="Email address"
      type="email"
      placeholder="you@example.com"
      value={email}
      onChange={e => setEmail(e.target.value)}
      onBlur={() => setTouched(true)}
      leftIcon={<Mail className="h-4 w-4" />}
      rightIcon={
        touched && email && isValid
          ? <Check className="h-4 w-4 text-emerald-500" />
          : undefined
      }
      error={error}
      hint={hint}
    />
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function InputPage() {
  const [tab, setTab] = useState<Tab>('preview');

  return (
    <div className="max-w-4xl mx-auto px-8 py-10">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs mb-6 text-slate-400 dark:text-slate-600">
        <Link to="/overview" className="hover:text-slate-600 dark:hover:text-slate-400 transition-colors">
          Components
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-700 dark:text-slate-300">Input</span>
      </nav>

      {/* Title + description */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-slate-900 dark:text-white">
          Input
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xl">
          A ref-forwarding text input built with <Chip>React.forwardRef</Chip>. Wraps the
          native <Chip>{'<input>'}</Chip> with an optional <Chip>label</Chip>, <Chip>hint</Chip>,
          and <Chip>error</Chip> message. Accepts <Chip>leftIcon</Chip> and{' '}
          <Chip>rightIcon</Chip> nodes for adornments — any React element works, including
          interactive buttons. All native input attributes are forwarded.
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
            <Input size="sm" placeholder="Small" />
            <Input size="md" placeholder="Medium (default)" />
            <Input size="lg" placeholder="Large" />
          </SectionCard>

          {/* Label + hint + error */}
          <SectionCard label="Label, Hint & Error">
            <Input
              label="Username"
              placeholder="kayv_user"
              hint="Letters, numbers, and underscores only."
            />
            <Input
              label="Email"
              type="email"
              error="Please enter a valid email address."
              defaultValue="not-an-email"
            />
            <Input
              label="Confirmed"
              defaultValue="hello@example.com"
              hint="Looks good."
            />
          </SectionCard>

          {/* Icons */}
          <SectionCard label="Icon Adornments">
            <Input
              placeholder="Search components…"
              leftIcon={<Search className="h-4 w-4" />}
            />
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              leftIcon={<Mail className="h-4 w-4" />}
            />
            <Input
              label="Handle"
              placeholder="kayv"
              leftIcon={<AtSign className="h-4 w-4" />}
            />
            <Input
              label="Full name"
              placeholder="Jane Smith"
              leftIcon={<User className="h-4 w-4" />}
              hint="As it appears on your ID."
            />
          </SectionCard>

          {/* Interactive password toggle */}
          <SectionCard label="Interactive Right Icon — Password Reveal">
            <div className="max-w-sm">
              <PasswordInput />
            </div>
          </SectionCard>

          {/* Live validation */}
          <SectionCard label="Live Validation">
            <div className="max-w-sm">
              <ValidationDemo />
            </div>
          </SectionCard>

          {/* Sizes with icons */}
          <SectionCard label="Sizes × Icons">
            <Input size="sm" leftIcon={<Search className="h-3.5 w-3.5" />} placeholder="Small with icon" />
            <Input size="md" leftIcon={<Search className="h-4 w-4" />}     placeholder="Medium with icon" />
            <Input size="lg" leftIcon={<Search className="h-5 w-5" />}     placeholder="Large with icon" />
          </SectionCard>

          {/* Disabled + read-only */}
          <SectionCard label="Disabled & Read-only">
            <Input label="Disabled"  disabled  placeholder="Cannot interact" />
            <Input label="Read-only" readOnly  defaultValue="Read-only value — selectable but not editable" />
          </SectionCard>

          {/* Real-world: sign-in form */}
          <SectionCard label="Real-world — Sign-in Form">
            <div className="max-w-sm flex flex-col gap-4">
              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                leftIcon={<Mail className="h-4 w-4" />}
              />
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                leftIcon={<Lock className="h-4 w-4" />}
                hint="Forgot your password?"
              />
              <Button variant="primary" className="w-full justify-center">
                Sign in
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
