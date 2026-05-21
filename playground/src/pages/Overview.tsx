import { Link } from 'react-router-dom';
import { Zap, Package, FileCode, ChevronRight, CheckCircle2 } from 'lucide-react';

const features = [
  {
    icon: Zap,
    label: 'Tree-shakeable',
    desc: 'Import only what you use — zero dead weight in your bundle.',
  },
  {
    icon: FileCode,
    label: 'Full TypeScript',
    desc: 'Every prop and export is precisely typed out of the box.',
  },
  {
    icon: Package,
    label: 'ESM + CJS',
    desc: 'Ships both module formats so it works everywhere.',
  },
];

const components = [
  { label: 'Button', path: '/components/button', ready: true },
  { label: 'Badge', path: '/components/badge', ready: false },
  { label: 'Card', path: '/components/card', ready: false },
  { label: 'Input', path: '/components/input', ready: false },
  { label: 'Accordion', path: '/components/accordion', ready: false },
  { label: 'Alert', path: '/components/alert', ready: false },
  { label: 'Toast', path: '/components/toast', ready: false },
  { label: 'Select', path: '/components/select', ready: false },
];

export default function Overview() {
  const readyCount = components.filter(c => c.ready).length;

  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      {/* Hero */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5
          rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 mb-6">
          <Zap className="h-3 w-3" />
          Production-grade component library
        </div>
        <h1 className="text-4xl font-bold text-white tracking-tight mb-3">
          kayv-glass-ui
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed max-w-lg">
          A handcrafted React component library built on TypeScript and Tailwind CSS.
          Designed for glass-morphism aesthetics with a clean, typed API and zero runtime overhead.
        </p>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-3 gap-3 mb-12">
        {features.map(({ icon: Icon, label, desc }) => (
          <div
            key={label}
            className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4"
          >
            <Icon className="h-4 w-4 text-indigo-400 mb-3" />
            <p className="text-sm font-semibold text-slate-200">{label}</p>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      {/* Quick-start snippet */}
      <div className="mb-12">
        <h2 className="text-sm font-semibold text-slate-300 mb-3">Quick start</h2>
        <div className="rounded-xl border border-white/10 bg-slate-900/70 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5 bg-white/5">
            <span className="text-xs text-slate-500 font-mono">Usage</span>
          </div>
          <pre className="px-5 py-4 text-sm font-mono leading-relaxed text-slate-300 overflow-x-auto">
            <code>{`import { Button } from 'kayv-glass-ui';

function MyApp() {
  return (
    <Button variant="primary" size="md">
      Click me
    </Button>
  );
}`}</code>
          </pre>
        </div>
      </div>

      {/* Component status grid */}
      <div>
        <h2 className="text-sm font-semibold text-slate-300 mb-3">
          Components{' '}
          <span className="font-normal text-slate-600">
            ({readyCount}/{components.length} ready)
          </span>
        </h2>
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm
          overflow-hidden divide-y divide-white/5">
          {components.map(c =>
            c.ready ? (
              <Link
                key={c.path}
                to={c.path}
                className="flex items-center justify-between px-5 py-3.5
                  hover:bg-white/5 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                    {c.label}
                  </span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 text-slate-600
                  group-hover:text-slate-400 transition-colors" />
              </Link>
            ) : (
              <div
                key={c.path}
                className="flex items-center justify-between px-5 py-3.5"
              >
                <div className="flex items-center gap-3">
                  <div className="h-4 w-4 rounded-full border border-slate-800 shrink-0" />
                  <span className="text-sm text-slate-600">{c.label}</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-700">
                  Soon
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
