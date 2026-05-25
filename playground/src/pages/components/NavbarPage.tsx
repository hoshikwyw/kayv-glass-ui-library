import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Copy, Check, Bell, Settings, Search } from 'lucide-react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Badge } from '../../../../src';

type Tab = 'preview' | 'code';

// ── Props data ─────────────────────────────────────────────────────────────────

const navbarProps = [
  { name: 'position', type: "'sticky' | 'fixed' | 'static'", defaultVal: "'sticky'", description: 'Controls CSS positioning of the bar.' },
  { name: 'className', type: 'string', defaultVal: '—', description: 'Merged via tailwind-merge — your classes always win.' },
  { name: '...props', type: 'React.ComponentPropsWithoutRef<"nav">', defaultVal: '—', description: 'All native nav attributes forwarded to the element.' },
];

const itemProps = [
  { name: 'isActive', type: 'boolean', defaultVal: 'false', description: 'Applies the kv-accent active styles (background + text).' },
  { name: 'href', type: 'string', defaultVal: '—', description: 'Standard anchor href — renders a native <a> element.' },
  { name: 'className', type: 'string', defaultVal: '—', description: 'Merged via tailwind-merge.' },
  { name: '...props', type: 'React.ComponentPropsWithoutRef<"a">', defaultVal: '—', description: 'All native anchor attributes forwarded.' },
];

const contentProps = [
  { name: 'justify', type: "'start' | 'center' | 'end'", defaultVal: "'start'", description: "Controls alignment within the content section. 'end' does not grow; 'start'/'center' fill remaining space." },
  { name: 'className', type: 'string', defaultVal: '—', description: 'Merged via tailwind-merge.' },
];

// ── Code snippets ──────────────────────────────────────────────────────────────

const snippets: Record<string, string> = {
  'Basic': `import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from 'kayv-glass-ui';

<Navbar>
  <NavbarBrand>
    <span className="font-bold text-slate-900 dark:text-white">MyApp</span>
  </NavbarBrand>
  <NavbarContent justify="center">
    <NavbarItem href="/" isActive>Home</NavbarItem>
    <NavbarItem href="/docs">Docs</NavbarItem>
    <NavbarItem href="/blog">Blog</NavbarItem>
  </NavbarContent>
  <NavbarContent justify="end">
    <Button size="sm" variant="secondary">Sign in</Button>
    <Button size="sm">Get started</Button>
  </NavbarContent>
</Navbar>`,

  'With badge & icon': `<Navbar>
  <NavbarBrand>
    <div className="h-7 w-7 rounded-lg bg-kv-500 flex items-center
      justify-center text-white text-xs font-bold">K</div>
    <span className="font-bold text-slate-900 dark:text-white">Kayv</span>
    <Badge variant="primary">v0.1</Badge>
  </NavbarBrand>
  <NavbarContent justify="center">
    <NavbarItem href="/" isActive>Home</NavbarItem>
    <NavbarItem href="/components">Components</NavbarItem>
    <NavbarItem href="/theming">Theming</NavbarItem>
  </NavbarContent>
  <NavbarContent justify="end" className="gap-2">
    <Button size="sm" variant="ghost">
      <Bell className="h-4 w-4" />
    </Button>
    <Button size="sm" variant="secondary">Sign in</Button>
  </NavbarContent>
</Navbar>`,

  'Static position': `{/* Use position="static" inside cards/sections */}
<Navbar position="static">
  <NavbarBrand>
    <span className="font-bold text-slate-900 dark:text-white">Dashboard</span>
  </NavbarBrand>
  <NavbarContent justify="end">
    <NavbarItem href="/settings">Settings</NavbarItem>
  </NavbarContent>
</Navbar>`,
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
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden
      border border-slate-700/40 bg-slate-900/95 backdrop-blur-sm shadow-sm">
      <div className="flex items-center justify-between px-4 py-2.5
        border-b border-slate-700/50">
        <span className="text-xs text-slate-500 font-mono">tsx</span>
        <button
          onClick={() => {
            navigator.clipboard.writeText(code).then(() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 1800);
            });
          }}
          className="flex items-center gap-1.5 text-xs
            text-slate-500 hover:text-slate-300 transition-colors"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
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

function PropsTable({ rows }: { rows: { name: string; type: string; defaultVal: string; description: string }[] }) {
  return (
    <div className="rounded-2xl overflow-hidden
      border border-white/60 dark:border-white/10
      bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm shadow-sm">
      <table className="w-full text-sm">
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
          {rows.map(p => (
            <tr key={p.name} className="hover:bg-white/40 dark:hover:bg-white/5 transition-colors">
              <td className="px-5 py-3.5 whitespace-nowrap">
                <code className="text-kv-600 dark:text-kv-400 text-xs font-mono">{p.name}</code>
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
  );
}

// ── Demo navbars ───────────────────────────────────────────────────────────────

function DemoBasic() {
  const [active, setActive] = useState('home');
  return (
    <Navbar position="static">
      <NavbarBrand>
        <div className="h-7 w-7 rounded-lg bg-kv-500 flex items-center justify-center text-white text-xs font-bold shrink-0">K</div>
        <span className="font-bold text-sm text-slate-900 dark:text-white">MyApp</span>
      </NavbarBrand>
      <NavbarContent justify="center">
        {(['home', 'docs', 'blog'] as const).map(id => (
          <NavbarItem key={id} onClick={() => setActive(id)} isActive={active === id} className="capitalize cursor-pointer">
            {id}
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end" className="gap-2">
        <Button size="sm" variant="ghost">Sign in</Button>
        <Button size="sm" variant="secondary">Get started</Button>
      </NavbarContent>
    </Navbar>
  );
}

function DemoWithBadge() {
  const [active, setActive] = useState('components');
  return (
    <Navbar position="static">
      <NavbarBrand>
        <div className="h-7 w-7 rounded-lg bg-kv-500 flex items-center justify-center text-white text-xs font-bold shrink-0">K</div>
        <span className="font-bold text-sm text-slate-900 dark:text-white">kayv</span>
        <Badge variant="primary" className="text-[10px]">v0.1</Badge>
      </NavbarBrand>
      <NavbarContent justify="center">
        {(['home', 'components', 'theming'] as const).map(id => (
          <NavbarItem key={id} onClick={() => setActive(id)} isActive={active === id} className="capitalize cursor-pointer">
            {id}
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end" className="gap-1">
        <Button size="sm" variant="ghost" className="px-2">
          <Search className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="ghost" className="px-2">
          <Bell className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="ghost" className="px-2">
          <Settings className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="secondary">Sign in</Button>
      </NavbarContent>
    </Navbar>
  );
}

function DemoBrandOnly() {
  return (
    <Navbar position="static">
      <NavbarBrand>
        <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-violet-500 to-kv-600 shrink-0" />
        <span className="font-bold text-sm text-slate-900 dark:text-white">Studio</span>
      </NavbarBrand>
      <NavbarContent justify="end" className="gap-2">
        <NavbarItem href="#" className="cursor-pointer">Pricing</NavbarItem>
        <NavbarItem href="#" className="cursor-pointer">About</NavbarItem>
        <Button size="sm">Start free</Button>
      </NavbarContent>
    </Navbar>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function NavbarPage() {
  const [tab, setTab] = useState<Tab>('preview');

  return (
    <div className="max-w-4xl mx-auto px-8 py-10">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs mb-6 text-slate-400 dark:text-slate-600">
        <Link to="/overview" className="hover:text-slate-600 dark:hover:text-slate-400 transition-colors">
          Components
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-700 dark:text-slate-300">Navbar</span>
      </nav>

      {/* Title + description */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-slate-900 dark:text-white">
          Navbar
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xl">
          A composable, glass-style navigation bar. Built from four ref-forwarding parts —{' '}
          <code className="text-kv-600 dark:text-kv-400 text-xs font-mono bg-kv-50 dark:bg-kv-500/10 px-1.5 py-0.5 rounded">Navbar</code>,{' '}
          <code className="text-kv-600 dark:text-kv-400 text-xs font-mono bg-kv-50 dark:bg-kv-500/10 px-1.5 py-0.5 rounded">NavbarBrand</code>,{' '}
          <code className="text-kv-600 dark:text-kv-400 text-xs font-mono bg-kv-50 dark:bg-kv-500/10 px-1.5 py-0.5 rounded">NavbarContent</code>, and{' '}
          <code className="text-kv-600 dark:text-kv-400 text-xs font-mono bg-kv-50 dark:bg-kv-500/10 px-1.5 py-0.5 rounded">NavbarItem</code> —
          that combine freely. All theme colors update instantly when you switch themes.
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

      {/* ── PREVIEW TAB ──────────────────────────────────── */}
      {tab === 'preview' && (
        <div className="flex flex-col gap-4 mb-12">
          <PreviewCard label="Basic — brand + centered links + actions">
            <DemoBasic />
          </PreviewCard>
          <PreviewCard label="With badge & icon buttons">
            <DemoWithBadge />
          </PreviewCard>
          <PreviewCard label="Brand + end actions only">
            <DemoBrandOnly />
          </PreviewCard>
        </div>
      )}

      {/* ── CODE TAB ─────────────────────────────────────── */}
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

      {/* ── PROPS TABLES ─────────────────────────────────── */}
      <div className="flex flex-col gap-8">
        <div>
          <h2 className="text-xs font-semibold tracking-wider uppercase mb-3
            text-slate-400 dark:text-slate-500">
            Navbar props
          </h2>
          <PropsTable rows={navbarProps} />
        </div>
        <div>
          <h2 className="text-xs font-semibold tracking-wider uppercase mb-3
            text-slate-400 dark:text-slate-500">
            NavbarContent props
          </h2>
          <PropsTable rows={contentProps} />
        </div>
        <div>
          <h2 className="text-xs font-semibold tracking-wider uppercase mb-3
            text-slate-400 dark:text-slate-500">
            NavbarItem props
          </h2>
          <PropsTable rows={itemProps} />
        </div>
      </div>

    </div>
  );
}
