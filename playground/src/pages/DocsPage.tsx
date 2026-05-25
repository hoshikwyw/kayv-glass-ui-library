'use client';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Package, Zap, FileCode, Palette, ArrowRight,
  CheckCircle2, Terminal, BookOpen, Layers, Sparkles,
} from 'lucide-react';

// ── CodeBlock ─────────────────────────────────────────────────────────────────

function CodeBlock({ code, lang = 'tsx' }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative group rounded-xl overflow-hidden border border-slate-200/60 dark:border-white/8">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 dark:bg-slate-950 border-b border-slate-700/50">
        <span className="text-[10px] font-mono text-slate-500">{lang}</span>
        <button
          onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1800); }}
          className="px-2 py-1 text-[10px] font-medium rounded-md bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="text-xs leading-relaxed p-4 overflow-x-auto bg-slate-900 dark:bg-slate-950 text-slate-300">
        <code>{code}</code>
      </pre>
    </div>
  );
}

// ── Tab switcher for install commands ─────────────────────────────────────────

const managers = ['npm', 'pnpm', 'yarn', 'bun'] as const;
type PM = (typeof managers)[number];

const installCmd: Record<PM, string> = {
  npm:  'npm install @kwyw/kayv-glass-ui',
  pnpm: 'pnpm add @kwyw/kayv-glass-ui',
  yarn: 'yarn add @kwyw/kayv-glass-ui',
  bun:  'bun add @kwyw/kayv-glass-ui',
};

const confettiInstallCmd: Record<PM, string> = {
  npm:  'npm install canvas-confetti',
  pnpm: 'pnpm add canvas-confetti',
  yarn: 'yarn add canvas-confetti',
  bun:  'bun add canvas-confetti',
};

// ── Snippets ──────────────────────────────────────────────────────────────────

const tailwindSnippet = `// tailwind.config.js
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    // ↓ Required so Tailwind sees the kv-* classes used inside the library
    './node_modules/@kwyw/kayv-glass-ui/dist/**/*.{js,mjs}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        kv: {
          '50':  'rgb(var(--kv-p-50)  / <alpha-value>)',
          '100': 'rgb(var(--kv-p-100) / <alpha-value>)',
          '200': 'rgb(var(--kv-p-200) / <alpha-value>)',
          '300': 'rgb(var(--kv-p-300) / <alpha-value>)',
          '400': 'rgb(var(--kv-p-400) / <alpha-value>)',
          '500': 'rgb(var(--kv-p-500) / <alpha-value>)',
          '600': 'rgb(var(--kv-p-600) / <alpha-value>)',
          '700': 'rgb(var(--kv-p-700) / <alpha-value>)',
        },
      },
    },
  },
};`;

const providerSnippet = `// main.tsx  (or app/layout.tsx in Next.js)
import { ThemeProvider } from '@kwyw/kayv-glass-ui';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
);`;

const usageSnippet = `import { Button, Badge, Card } from '@kwyw/kayv-glass-ui';

export default function MyPage() {
  return (
    <Card>
      <Badge variant="primary">New</Badge>
      <Button variant="primary" size="md">
        Get started
      </Button>
    </Card>
  );
}`;

const darkModeSnippet = `// Toggle dark mode by adding/removing the 'dark' class on <html>
document.documentElement.classList.toggle('dark');

// Or use a state variable:
const [dark, setDark] = useState(false);
useEffect(() => {
  document.documentElement.classList.toggle('dark', dark);
}, [dark]);`;

const nextjsSnippet = `// app/layout.tsx
import '@kwyw/kayv-glass-ui/dist/style.css'; // if you use the CSS bundle
import { ThemeProvider } from '@kwyw/kayv-glass-ui';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}`;

// ── Component categories for "What's included" ────────────────────────────────

const categories = [
  { label: 'Actions', items: ['Button'] },
  { label: 'Data Display', items: ['Badge', 'Card', 'Accordion', 'Tabs', 'Progress'] },
  { label: 'Feedback', items: ['Alert', 'Toast'] },
  { label: 'Inputs', items: ['Input', 'Select', 'File Input', 'Checkbox'] },
  { label: 'Floating', items: ['Tooltip'] },
  { label: 'Overlay', items: ['Modal', 'Drawer'] },
  { label: 'Navigation', items: ['Navbar', 'Breadcrumb', 'Footer', 'MenuBar'] },
  { label: 'Visualization', items: ['Globe'] },
  { label: 'Effects', items: ['Confetti'] },
  { label: 'Media', items: ['Avatar', 'Calendar'] },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function DocsPage() {
  const [pm, setPm] = useState<PM>('npm');

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8 sm:py-10 space-y-14">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Getting Started
          </h1>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full
            bg-kv-50 text-kv-600 border border-kv-200/60
            dark:bg-kv-500/20 dark:text-kv-300 dark:border-kv-500/30">
            v0.1.1
          </span>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl">
          <strong className="text-slate-700 dark:text-slate-300">kayv-glass-ui</strong> is a
          production-grade React component library built on TypeScript and Tailwind CSS.
          Every component ships with glass-morphism styling, dark mode, and a fully typed API —
          ready to drop into any React 18+ project.
        </p>
      </div>

      {/* ── Feature pills ──────────────────────────────────────────────────── */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { icon: Zap,      label: 'Tree-shakeable',  body: 'Import only the components you actually use.' },
          { icon: FileCode, label: 'Full TypeScript',  body: 'Every prop, export, and ref is precisely typed.' },
          { icon: Package,  label: 'ESM + CJS',        body: 'Works in Vite, Next.js, Remix, and CRA.' },
        ].map(({ icon: Icon, label, body }) => (
          <div key={label} className="p-4 rounded-2xl backdrop-blur-sm shadow-sm
            border border-white/60 dark:border-white/8
            bg-white/50 dark:bg-slate-800/50">
            <Icon className="h-4 w-4 text-kv-500 mb-3" />
            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">{label}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{body}</p>
          </div>
        ))}
      </section>

      {/* ── Peer requirements ──────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-base font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
          <Terminal className="h-4 w-4 text-kv-500" />
          Requirements
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {[
            { pkg: 'React', ver: '≥ 18.0' },
            { pkg: 'ReactDOM', ver: '≥ 18.0' },
            { pkg: 'Tailwind CSS', ver: '≥ 3.0' },
            { pkg: 'Node.js', ver: '≥ 18' },
          ].map(({ pkg, ver }) => (
            <div key={pkg} className="flex flex-col gap-0.5 p-3 rounded-xl
              bg-white/50 dark:bg-slate-800/50 border border-white/60 dark:border-white/8">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{pkg}</span>
              <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">{ver}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Installation ───────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-base font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
          <Package className="h-4 w-4 text-kv-500" />
          Installation
        </h2>

        {/* Package manager tabs */}
        <div className="flex gap-1 p-1 rounded-xl w-fit
          bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-white/8">
          {managers.map(m => (
            <button
              key={m}
              onClick={() => setPm(m)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                pm === m
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        <CodeBlock code={installCmd[pm]} lang="bash" />

        <div className="rounded-xl border border-slate-200/60 dark:border-white/8
          bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm p-4 space-y-2">
          <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
            Using the{' '}
            <code className="font-mono text-kv-600 dark:text-kv-400">Confetti</code>{' '}
            component? Install its peer dependency too:
          </p>
          <CodeBlock code={confettiInstallCmd[pm]} lang="bash" />
        </div>
      </section>

      {/* ── Setup ──────────────────────────────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-base font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
          <Layers className="h-4 w-4 text-kv-500" />
          Setup
        </h2>

        {/* Step 1 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="h-6 w-6 rounded-lg flex items-center justify-center shrink-0
              bg-kv-500 text-white text-xs font-bold">1</span>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Extend your Tailwind config with the{' '}
              <code className="font-mono text-xs text-kv-600 dark:text-kv-400">kv</code> colour palette
            </p>
          </div>
          <CodeBlock code={tailwindSnippet} lang="js" />
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            The eight <code className="font-mono text-kv-600 dark:text-kv-400">--kv-p-*</code> CSS
            variables are injected by <code className="font-mono text-kv-600 dark:text-kv-400">ThemeProvider</code>.
            Including the library's dist path in <code className="font-mono text-kv-600 dark:text-kv-400">content</code> ensures
            Tailwind doesn't purge the classes used internally.
          </p>
        </div>

        {/* Step 2 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="h-6 w-6 rounded-lg flex items-center justify-center shrink-0
              bg-kv-500 text-white text-xs font-bold">2</span>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Wrap your app with <code className="font-mono text-xs text-kv-600 dark:text-kv-400">ThemeProvider</code>
            </p>
          </div>
          <CodeBlock code={providerSnippet} lang="tsx" />
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            ThemeProvider sets the CSS variables and provides the{' '}
            <code className="font-mono text-kv-600 dark:text-kv-400">useTheme()</code> hook.
            It must wrap everything that uses library components.
          </p>
        </div>

        {/* Step 3 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="h-6 w-6 rounded-lg flex items-center justify-center shrink-0
              bg-kv-500 text-white text-xs font-bold">3</span>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Import and use any component
            </p>
          </div>
          <CodeBlock code={usageSnippet} lang="tsx" />
        </div>
      </section>

      {/* ── Dark mode ──────────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-base font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
          <Palette className="h-4 w-4 text-kv-500" />
          Dark mode
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          All components respond to Tailwind's <code className="font-mono text-xs text-kv-600 dark:text-kv-400">darkMode: 'class'</code> strategy.
          Add the <code className="font-mono text-xs text-kv-600 dark:text-kv-400">dark</code> class to{' '}
          <code className="font-mono text-xs text-kv-600 dark:text-kv-400">&lt;html&gt;</code> to activate it — no extra configuration needed.
        </p>
        <CodeBlock code={darkModeSnippet} lang="tsx" />
      </section>

      {/* ── Next.js ────────────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold text-slate-800 dark:text-slate-200">
            Using with Next.js (App Router)
          </h2>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full
            bg-slate-100 dark:bg-slate-700/60 text-slate-500 dark:text-slate-400
            border border-slate-200/60 dark:border-white/8">
            optional
          </span>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          Components that use browser APIs (Globe, Confetti, Tooltip) are marked{' '}
          <code className="font-mono text-xs text-kv-600 dark:text-kv-400">'use client'</code> and work
          in the App Router out of the box. Wrap <code className="font-mono text-xs text-kv-600 dark:text-kv-400">ThemeProvider</code> in your root layout:
        </p>
        <CodeBlock code={nextjsSnippet} lang="tsx" />
      </section>

      {/* ── What's included ────────────────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-base font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-kv-500" />
          What's included
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {categories.map(({ label, items }) => (
            <div key={label} className="p-4 rounded-2xl backdrop-blur-sm
              bg-white/50 dark:bg-slate-800/50 border border-white/60 dark:border-white/8">
              <p className="text-[10px] font-semibold uppercase tracking-widest
                text-slate-400 dark:text-slate-600 mb-2.5">
                {label}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {items.map(item => (
                  <span key={item} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg
                    text-[11px] font-medium
                    bg-kv-50 dark:bg-kv-500/10 text-kv-600 dark:text-kv-400
                    border border-kv-100 dark:border-kv-500/20">
                    <CheckCircle2 className="h-2.5 w-2.5" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Next steps ─────────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-base font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-kv-500" />
          Next steps
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              icon: Layers,
              label: 'Browse components',
              body: 'Explore all 23 components with live demos and props tables.',
              to: '/components/button',
            },
            {
              icon: Palette,
              label: 'Customize themes',
              body: 'Swap the brand colour palette across every component at once.',
              to: '/theming',
            },
            {
              icon: Sparkles,
              label: 'Add confetti',
              body: 'Celebration effects with presets, emoji bursts, and a ref API.',
              to: '/components/confetti',
            },
          ].map(({ icon: Icon, label, body, to }) => (
            <Link
              key={label}
              to={to}
              className="group flex flex-col gap-2 p-4 rounded-2xl backdrop-blur-sm
                border border-white/60 dark:border-white/8
                bg-white/50 dark:bg-slate-800/50
                hover:bg-white/70 dark:hover:bg-slate-700/50
                hover:-translate-y-0.5 hover:shadow-md hover:shadow-slate-200/60 dark:hover:shadow-black/30
                transition-all duration-200"
            >
              <div className="w-8 h-8 rounded-xl flex items-center justify-center
                bg-kv-50 dark:bg-kv-500/15 border border-kv-100 dark:border-kv-500/20">
                <Icon className="h-4 w-4 text-kv-500 dark:text-kv-400" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200
                  group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  {label}
                </p>
                <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-500 mt-0.5">
                  {body}
                </p>
              </div>
              <div className="mt-auto flex items-center gap-1 text-[11px] font-medium
                text-kv-600 dark:text-kv-400
                opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                Go <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
