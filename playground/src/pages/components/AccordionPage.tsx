import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Copy, Check, Shield, Zap, CreditCard, HelpCircle } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent, Badge } from '../../../../src';

type Tab = 'preview' | 'code';

// ── Props API ──────────────────────────────────────────────────────────────────

const accordionPropsData = [
  {
    name: 'type',
    type: "'single' | 'multiple'",
    defaultVal: "'single'",
    description: "'single' keeps at most one panel open; 'multiple' allows any number.",
  },
  {
    name: 'defaultValue',
    type: 'string | string[]',
    defaultVal: 'undefined',
    description: 'Value(s) of the panel(s) open on first render. Uncontrolled.',
  },
  {
    name: 'collapsible',
    type: 'boolean',
    defaultVal: 'true',
    description: "When type='single', whether clicking the open item collapses it.",
  },
  {
    name: 'className',
    type: 'string',
    defaultVal: '—',
    description: 'Merged via tailwind-merge. Targets the outer wrapper div.',
  },
];

const itemPropsData = [
  {
    name: 'value',
    type: 'string',
    defaultVal: '—',
    description: 'Required. Unique key matched against Accordion state.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultVal: 'false',
    description: 'Disables the trigger button and prevents open/close.',
  },
];

// ── Code snippets ──────────────────────────────────────────────────────────────

const snippets: Record<string, string> = {
  Basic: `import {
  Accordion, AccordionItem,
  AccordionTrigger, AccordionContent,
} from 'kayv-glass-ui';

<Accordion defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>What is glassmorphism?</AccordionTrigger>
    <AccordionContent>
      A design trend that uses frosted-glass effects — blur,
      translucency, and subtle borders — to create depth.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-2">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. Each trigger is a native button with aria-expanded and
      aria-controls wired to the content region.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,

  Multiple: `{/* All panels can be open simultaneously */}
<Accordion type="multiple" defaultValue={['item-1', 'item-2']}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Panel one</AccordionTrigger>
    <AccordionContent>Content one.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Panel two</AccordionTrigger>
    <AccordionContent>Content two.</AccordionContent>
  </AccordionItem>
</Accordion>`,

  'Non-collapsible': `{/* Clicking the open item does nothing — always one panel open */}
<Accordion type="single" collapsible={false} defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>Always open</AccordionTrigger>
    <AccordionContent>Can't be collapsed.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Click to switch</AccordionTrigger>
    <AccordionContent>Opens and locks in.</AccordionContent>
  </AccordionItem>
</Accordion>`,

  Disabled: `<Accordion>
  <AccordionItem value="item-1">
    <AccordionTrigger>Available</AccordionTrigger>
    <AccordionContent>This panel works normally.</AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-2" disabled>
    <AccordionTrigger>Disabled</AccordionTrigger>
    <AccordionContent>Unreachable content.</AccordionContent>
  </AccordionItem>
</Accordion>`,
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
      <div className="px-6 py-6">{children}</div>
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

// ── Page ───────────────────────────────────────────────────────────────────────

export default function AccordionPage() {
  const [tab, setTab] = useState<Tab>('preview');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-10">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs mb-6 text-slate-400 dark:text-slate-600">
        <Link to="/overview" className="hover:text-slate-600 dark:hover:text-slate-400 transition-colors">
          Components
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-700 dark:text-slate-300">Accordion</span>
      </nav>

      {/* Title + description */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-slate-900 dark:text-white">
          Accordion
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xl">
          A compound component for collapsible content panels. Compose{' '}
          <Chip>AccordionItem</Chip>, <Chip>AccordionTrigger</Chip>, and{' '}
          <Chip>AccordionContent</Chip> inside an <Chip>Accordion</Chip> root. Supports
          single and multiple open modes, animated height via CSS grid, and full keyboard
          accessibility with <Chip>aria-expanded</Chip> / <Chip>aria-controls</Chip>.
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

          {/* Single (default) */}
          <SectionCard label="Single (default) — only one panel open">
            <Accordion defaultValue="q1">
              <AccordionItem value="q1">
                <AccordionTrigger>What is glassmorphism?</AccordionTrigger>
                <AccordionContent>
                  A design trend using frosted-glass effects — backdrop blur, translucent fills,
                  and subtle borders — to create layered depth without heavy shadows.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q2">
                <AccordionTrigger>Does it require Tailwind CSS?</AccordionTrigger>
                <AccordionContent>
                  Yes. kayv-glass-ui is built on Tailwind CSS v3/v4. You need to include the
                  library paths in your <code className="text-indigo-600 dark:text-indigo-300 font-mono text-xs">content</code> array
                  so utility classes are generated at build time.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q3">
                <AccordionTrigger>Is server-side rendering supported?</AccordionTrigger>
                <AccordionContent>
                  Yes. All components ship with the <code className="text-indigo-600 dark:text-indigo-300 font-mono text-xs">"use client"</code> directive
                  injected at build time, making them compatible with Next.js App Router
                  without any extra configuration.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </SectionCard>

          {/* Multiple */}
          <SectionCard label="Multiple — any number of panels open">
            <Accordion type="multiple" defaultValue={['feat-1', 'feat-2']}>
              <AccordionItem value="feat-1">
                <AccordionTrigger>
                  <span className="flex items-center gap-2.5">
                    <Zap className="h-4 w-4 text-indigo-500 shrink-0" />
                    Tree-shakeable exports
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  Every component and utility is a named export. Bundlers drop anything you
                  don't import, keeping your production bundle tight.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="feat-2">
                <AccordionTrigger>
                  <span className="flex items-center gap-2.5">
                    <Shield className="h-4 w-4 text-emerald-500 shrink-0" />
                    Full TypeScript support
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  Every prop, variant, and event handler is typed. Autocomplete and
                  type-errors work out of the box with no extra <code className="text-indigo-600 dark:text-indigo-300 font-mono text-xs">@types</code> packages.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="feat-3">
                <AccordionTrigger>
                  <span className="flex items-center gap-2.5">
                    <CreditCard className="h-4 w-4 text-blue-500 shrink-0" />
                    ESM + CJS dual output
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  tsup builds both <code className="text-indigo-600 dark:text-indigo-300 font-mono text-xs">.js</code> (ESM) and{' '}
                  <code className="text-indigo-600 dark:text-indigo-300 font-mono text-xs">.cjs</code> (CommonJS) bundles so the library
                  works in Vite, Next.js, Remix, or any CJS-based toolchain.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </SectionCard>

          {/* Non-collapsible */}
          <SectionCard label="Non-collapsible — always one panel open">
            <Accordion type="single" collapsible={false} defaultValue="step-1">
              <AccordionItem value="step-1">
                <AccordionTrigger>Step 1 — Install</AccordionTrigger>
                <AccordionContent>
                  <code className="text-indigo-600 dark:text-indigo-300 font-mono text-xs">
                    npm install @kwyw/kayv-glass-ui
                  </code>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="step-2">
                <AccordionTrigger>Step 2 — Add Tailwind paths</AccordionTrigger>
                <AccordionContent>
                  Add <code className="text-indigo-600 dark:text-indigo-300 font-mono text-xs">./node_modules/@kwyw/kayv-glass-ui/dist/**/*.js</code> to
                  your Tailwind <code className="text-indigo-600 dark:text-indigo-300 font-mono text-xs">content</code> array.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="step-3">
                <AccordionTrigger>Step 3 — Import and use</AccordionTrigger>
                <AccordionContent>
                  <code className="text-indigo-600 dark:text-indigo-300 font-mono text-xs">
                    {'import { Button } from \'@kwyw/kayv-glass-ui\';'}
                  </code>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </SectionCard>

          {/* Disabled item */}
          <SectionCard label="Disabled item">
            <Accordion defaultValue="plan-pro">
              <AccordionItem value="plan-free">
                <AccordionTrigger>
                  <span className="flex items-center justify-between w-full pr-2">
                    Free plan
                    <Badge variant="default" size="sm">Current</Badge>
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  Includes up to 3 projects, 1 GB storage, and community support.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="plan-pro">
                <AccordionTrigger>
                  <span className="flex items-center justify-between w-full pr-2">
                    Pro plan
                    <Badge variant="primary" size="sm">Recommended</Badge>
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  Unlimited projects, 50 GB storage, priority support, and advanced analytics.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="plan-enterprise" disabled>
                <AccordionTrigger>
                  <span className="flex items-center justify-between w-full pr-2">
                    Enterprise plan
                    <Badge variant="warning" size="sm">Coming soon</Badge>
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  Custom contracts, SLA, SSO, and dedicated infrastructure.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </SectionCard>

          {/* FAQ real-world */}
          <SectionCard label="Real-world — FAQ">
            <Accordion type="single" collapsible defaultValue="faq-1" className="max-w-xl">
              {[
                {
                  value: 'faq-1',
                  q: 'How do I customise the glass intensity?',
                  a: 'Pass a className with your own backdrop-blur-* and bg-*/opacity utilities. tailwind-merge resolves conflicts so your values always win.',
                },
                {
                  value: 'faq-2',
                  q: 'Can I use this with React 19?',
                  a: 'Yes. The peerDependency range covers both React 18 and 19. No breaking changes are expected for either.',
                },
                {
                  value: 'faq-3',
                  q: 'Are animations hardware-accelerated?',
                  a: 'The height animation uses CSS grid-template-rows which triggers composite layers on modern browsers, keeping it off the main thread.',
                },
                {
                  value: 'faq-4',
                  q: 'Where do I report bugs?',
                  a: 'Open an issue on the GitHub repository. Include a minimal reproduction and the exact component + prop combination that fails.',
                },
              ].map(({ value, q, a }) => (
                <AccordionItem key={value} value={value}>
                  <AccordionTrigger>
                    <span className="flex items-center gap-2.5">
                      <HelpCircle className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
                      {q}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>{a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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
        {/* Accordion props */}
        <div>
          <h2 className="text-xs font-semibold tracking-wider uppercase mb-3 text-slate-400 dark:text-slate-500">
            Accordion Props
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-white/60 dark:border-white/10
            bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100/60 dark:border-white/5 bg-slate-50/60 dark:bg-slate-700/30">
                  {['Prop', 'Type', 'Default', 'Description'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/60 dark:divide-white/5">
                {accordionPropsData.map(p => (
                  <tr key={p.name} className="hover:bg-white/40 dark:hover:bg-white/5 transition-colors">
                    <td className="px-5 py-3.5 whitespace-nowrap"><code className="text-indigo-600 dark:text-indigo-400 text-xs font-mono">{p.name}</code></td>
                    <td className="px-5 py-3.5"><code className="text-blue-600 dark:text-amber-300/80 text-xs font-mono">{p.type}</code></td>
                    <td className="px-5 py-3.5 whitespace-nowrap"><code className="text-slate-500 dark:text-slate-400 text-xs font-mono">{p.defaultVal}</code></td>
                    <td className="px-5 py-3.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{p.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AccordionItem props */}
        <div>
          <h2 className="text-xs font-semibold tracking-wider uppercase mb-3 text-slate-400 dark:text-slate-500">
            AccordionItem Props
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-white/60 dark:border-white/10
            bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100/60 dark:border-white/5 bg-slate-50/60 dark:bg-slate-700/30">
                  {['Prop', 'Type', 'Default', 'Description'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/60 dark:divide-white/5">
                {itemPropsData.map(p => (
                  <tr key={p.name} className="hover:bg-white/40 dark:hover:bg-white/5 transition-colors">
                    <td className="px-5 py-3.5 whitespace-nowrap"><code className="text-indigo-600 dark:text-indigo-400 text-xs font-mono">{p.name}</code></td>
                    <td className="px-5 py-3.5"><code className="text-blue-600 dark:text-amber-300/80 text-xs font-mono">{p.type}</code></td>
                    <td className="px-5 py-3.5 whitespace-nowrap"><code className="text-slate-500 dark:text-slate-400 text-xs font-mono">{p.defaultVal}</code></td>
                    <td className="px-5 py-3.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{p.description}</td>
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
