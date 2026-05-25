import { useState } from 'react';
import { useTheme, Button, Badge, Input, Select, Calendar } from 'kayv-glass-ui';
import { Search } from 'lucide-react';

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative group rounded-xl overflow-hidden
      border border-slate-200/60 dark:border-white/8">
      <pre className="text-xs leading-relaxed p-4 overflow-x-auto
        bg-slate-900 dark:bg-slate-950 text-slate-300">
        <code>{code}</code>
      </pre>
      <button
        onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1800); }}
        className="absolute top-2.5 right-2.5 px-2 py-1 text-[10px] font-medium rounded-md
          bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
}

const setupSnippet = `// tailwind.config.js
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@kwyw/kayv-glass-ui/dist/**/*.{js,mjs}',
  ],
  theme: {
    extend: {
      colors: {
        kv: {
          '50':  'rgb(var(--kv-p-50) / <alpha-value>)',
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

const providerSnippet = `// main.tsx
import { ThemeProvider } from '@kwyw/kayv-glass-ui';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);`;

const hookSnippet = `import { useTheme } from '@kwyw/kayv-glass-ui';

function MyThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme();

  return (
    <div>
      {themes.map(t => (
        <button
          key={t.name}
          onClick={() => setTheme(t.name)}
          style={{ background: t.primary }}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}`;

const customThemeSnippet = `/* globals.css — define your own theme */
:root {
  --kv-p-50:  220 252 231;   /* custom green-50 */
  --kv-p-100: 187 247 208;
  --kv-p-200: 134 239 172;
  --kv-p-300: 74  222 128;
  --kv-p-400: 34  197 94;
  --kv-p-500: 22  163 74;
  --kv-p-600: 21  128 61;
  --kv-p-700: 20  83  45;
}`;

export default function ThemingPage() {
  const { theme, setTheme, themes } = useTheme();

  return (
    <div className="max-w-3xl mx-auto px-8 py-10 space-y-12">

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Theming
          </h1>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full
            bg-kv-50 text-kv-600 border border-kv-200/60
            dark:bg-kv-500/20 dark:text-kv-300 dark:border-kv-500/30">
            v0.1.1
          </span>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl">
          All components are wired to eight CSS custom properties (<code className="text-kv-600 dark:text-kv-400 font-mono text-xs">--kv-p-50</code> through <code className="text-kv-600 dark:text-kv-400 font-mono text-xs">--kv-p-700</code>).
          Changing the theme swaps all eight values at once — every accent colour across every component updates instantly.
        </p>
      </div>

      {/* Live theme picker */}
      <section className="space-y-4">
        <h2 className="text-base font-semibold text-slate-800 dark:text-slate-200">
          Live preview
        </h2>
        <div className="p-5 rounded-2xl
          bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm
          border border-white/60 dark:border-white/10
          shadow-sm">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Select a theme — components below update instantly.
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {themes.map(t => (
              <button
                key={t.name}
                onClick={() => setTheme(t.name)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium
                  border transition-all
                  ${theme === t.name
                    ? 'border-slate-300 dark:border-white/20 bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-sm'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:bg-white/60 dark:hover:bg-white/5'
                  }`}
              >
                <span className="h-3.5 w-3.5 rounded-full shrink-0 shadow-sm"
                  style={{ backgroundColor: t.primary }} />
                {t.label}
              </button>
            ))}
          </div>

          {/* Component previews */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" size="sm">Secondary</Button>
                <Button variant="primary" size="sm">Primary</Button>
                <Button variant="ghost" size="sm">Ghost</Button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="primary">Primary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="danger">Danger</Badge>
              </div>
              <Input
                placeholder="Focus to see ring…"
                leftIcon={<Search className="h-4 w-4" />}
                size="sm"
              />
              <Select
                size="sm"
                placeholder="Select option…"
                options={[
                  { value: '1', label: 'Option one' },
                  { value: '2', label: 'Option two' },
                  { value: '3', label: 'Option three' },
                ]}
              />
            </div>
            <div className="flex justify-center">
              <Calendar mode="single" defaultValue={new Date()} />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-base font-semibold text-slate-800 dark:text-slate-200">
          How it works
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {[
            { step: '1', title: 'CSS variables', body: 'Eight --kv-p-{level} custom properties hold the active theme\'s RGB values.' },
            { step: '2', title: 'Tailwind palette', body: 'The kv-* colour utilities reference those variables, so every Tailwind opacity modifier just works.' },
            { step: '3', title: 'ThemeProvider', body: 'Calling setTheme() overwrites the variables on :root — all components re-render with zero JS overhead.' },
          ].map(({ step, title, body }) => (
            <div key={step} className="p-4 rounded-2xl
              bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm
              border border-white/60 dark:border-white/8">
              <div className="h-7 w-7 rounded-lg flex items-center justify-center mb-3
                bg-kv-500 text-white text-xs font-bold">
                {step}
              </div>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">{title}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Setup */}
      <section className="space-y-4">
        <h2 className="text-base font-semibold text-slate-800 dark:text-slate-200">
          Setup
        </h2>

        <div className="space-y-2">
          <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
            1 — Extend your Tailwind config with the kv colour palette
          </p>
          <CodeBlock code={setupSnippet} />
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
            2 — Wrap your app with ThemeProvider
          </p>
          <CodeBlock code={providerSnippet} />
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
            3 — Use the useTheme hook anywhere
          </p>
          <CodeBlock code={hookSnippet} />
        </div>
      </section>

      {/* Built-in themes */}
      <section className="space-y-4">
        <h2 className="text-base font-semibold text-slate-800 dark:text-slate-200">
          Built-in themes
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {themes.map(t => (
            <button
              key={t.name}
              onClick={() => setTheme(t.name)}
              className={`flex items-center gap-3 p-3.5 rounded-xl text-left
                border transition-all
                ${theme === t.name
                  ? 'border-kv-300 dark:border-kv-500/50 bg-kv-50/50 dark:bg-kv-500/10'
                  : 'border-slate-200/60 dark:border-white/8 bg-white/40 dark:bg-slate-800/40 hover:bg-white/60 dark:hover:bg-slate-800/60'
                }`}
            >
              <div className="flex gap-0.5">
                {(['50', '200', '400', '600'] as const).map(l => (
                  <span
                    key={l}
                    className="h-6 w-3.5 rounded-sm first:rounded-l-lg last:rounded-r-lg"
                    style={{
                      backgroundColor: `rgb(${t.colors[l]})`,
                      opacity: l === '50' ? 0.5 : 1,
                    }}
                  />
                ))}
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{t.label}</p>
                <p className="text-[10px] font-mono text-slate-400 dark:text-slate-500">{t.name}</p>
              </div>
              {theme === t.name && (
                <span className="ml-auto text-[10px] font-semibold uppercase tracking-wider
                  text-kv-600 dark:text-kv-400">
                  Active
                </span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Custom theme */}
      <section className="space-y-4">
        <h2 className="text-base font-semibold text-slate-800 dark:text-slate-200">
          Custom themes
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          Override the CSS variables directly to create any theme. Use RGB triplets (no commas) so Tailwind's opacity modifiers work correctly.
        </p>
        <CodeBlock code={customThemeSnippet} />
      </section>

    </div>
  );
}
