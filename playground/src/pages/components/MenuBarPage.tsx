import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight, Copy, Check,
  LayoutDashboard, Search, BarChart2, Clock, User,
  Package, ShoppingCart, Receipt, Users,
  Settings, LogOut, Bell, HelpCircle, Home,
  Star, BookOpen, Shield, Layers, Globe,
} from 'lucide-react';
import {
  MenuBar, MenuBarBrand, MenuBarItem, MenuBarSection, MenuBarDivider, MenuBarNav,
} from '../../../../src';

type PageTab = 'preview' | 'code';
type DemoTab = 'sidebar' | 'mobile';

// ── Props data ─────────────────────────────────────────────────────────────────

const menuBarProps = [
  { name: 'value',             type: 'string',                  defaultVal: '—',     description: 'Controlled active item value.' },
  { name: 'defaultValue',      type: 'string',                  defaultVal: "''",    description: 'Default active item (uncontrolled).' },
  { name: 'onValueChange',     type: '(value: string) => void', defaultVal: '—',     description: 'Called when the active item changes.' },
  { name: 'className',         type: 'string',                  defaultVal: '—',     description: 'Extra classes on the sidebar panel.' },
  { name: 'bottomNavClassName',type: 'string',                  defaultVal: '—',     description: 'Extra classes on the bottom navigation bar.' },
  { name: 'children',          type: 'ReactNode',               defaultVal: '—',     description: 'MenuBarBrand, MenuBarNav, MenuBarItem, MenuBarSection, MenuBarDivider.' },
];

const menuBarItemProps = [
  { name: 'value',     type: 'string',    defaultVal: '—',    description: 'Unique identifier — used for active state matching.' },
  { name: 'icon',      type: 'ReactNode', defaultVal: '—',    description: 'Icon shown in both the sidebar and the bottom nav.' },
  { name: 'bottomNav', type: 'boolean',   defaultVal: 'true', description: 'Set to false to hide this item from the mobile bottom nav.' },
  { name: 'disabled',  type: 'boolean',   defaultVal: 'false', description: 'Prevents selection and applies reduced opacity.' },
  { name: 'onClick',   type: '() => void',defaultVal: '—',    description: 'Additional click handler, called after onValueChange.' },
  { name: 'className', type: 'string',    defaultVal: '—',    description: 'Extra classes on the item button.' },
];

const menuBarSectionProps = [
  { name: 'label',     type: 'string',    defaultVal: '—', description: 'Optional heading shown only in the sidebar.' },
  { name: 'children',  type: 'ReactNode', defaultVal: '—', description: 'MenuBarItem components in this group.' },
  { name: 'className', type: 'string',    defaultVal: '—', description: 'Extra classes on the section wrapper.' },
];

// ── Code snippets ──────────────────────────────────────────────────────────────

const snippets: Record<string, string> = {
  Default: `import {
  MenuBar, MenuBarBrand, MenuBarNav,
  MenuBarItem, MenuBarSection, MenuBarDivider,
} from 'kayv-glass-ui';
import {
  LayoutDashboard, Search, BarChart2, Users,
  Settings, LogOut,
} from 'lucide-react';

function AppLayout({ children }) {
  const [active, setActive] = useState('dashboard');

  return (
    <div className="flex h-screen">
      {/* Sidebar + bottom nav */}
      <MenuBar
        value={active}
        onValueChange={setActive}
        className="w-64 h-screen fixed left-0 top-0 z-30"
        bottomNavClassName="fixed bottom-0 left-0 right-0 z-30"
      >
        <MenuBarBrand>
          <YourLogo className="h-8 w-8" />
          <span className="font-bold text-slate-900 dark:text-white">
            AHLFAGON
          </span>
        </MenuBarBrand>

        <MenuBarNav>
          <MenuBarItem value="dashboard" icon={<LayoutDashboard className="h-[18px] w-[18px]" />}>
            Dashboard
          </MenuBarItem>
          <MenuBarItem value="search" icon={<Search className="h-[18px] w-[18px]" />}>
            Search
          </MenuBarItem>

          <MenuBarSection label="Analytics">
            <MenuBarItem value="reports" icon={<BarChart2 className="h-[18px] w-[18px]" />}>
              Reports
            </MenuBarItem>
          </MenuBarSection>

          <MenuBarSection label="Management">
            <MenuBarItem value="users" icon={<Users className="h-[18px] w-[18px]" />}>
              Users
            </MenuBarItem>
          </MenuBarSection>

          <MenuBarDivider />

          <MenuBarItem value="settings" icon={<Settings className="h-[18px] w-[18px]" />}>
            Settings
          </MenuBarItem>
          <MenuBarItem value="logout" icon={<LogOut className="h-[18px] w-[18px]" />} bottomNav={false}>
            Log Out
          </MenuBarItem>
        </MenuBarNav>
      </MenuBar>

      {/* Page content — offset for sidebar */}
      <main className="flex-1 lg:ml-64 pb-16 lg:pb-0 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}`,

  'Minimal (bottom-nav only)': `// Only show 4–5 items in the bottom nav
<MenuBar value={active} onValueChange={setActive}>
  <MenuBarNav>
    <MenuBarItem value="home"     icon={<Home />}>Home</MenuBarItem>
    <MenuBarItem value="search"   icon={<Search />}>Search</MenuBarItem>
    <MenuBarItem value="activity" icon={<BarChart2 />}>Activity</MenuBarItem>
    <MenuBarItem value="profile"  icon={<User />}>Profile</MenuBarItem>

    {/* Settings only appears in sidebar, not bottom nav */}
    <MenuBarItem value="settings" icon={<Settings />} bottomNav={false}>
      Settings
    </MenuBarItem>
  </MenuBarNav>
</MenuBar>`,

  'With Sections & Divider': `<MenuBar value={active} onValueChange={setActive}>
  <MenuBarBrand>
    <Logo />
    <span>Brand</span>
  </MenuBarBrand>

  <MenuBarNav>
    {/* Top-level items — appear in bottom nav too */}
    <MenuBarItem value="home"     icon={<Home />}>Home</MenuBarItem>
    <MenuBarItem value="explore"  icon={<Globe />}>Explore</MenuBarItem>
    <MenuBarItem value="alerts"   icon={<Bell />}>Alerts</MenuBarItem>

    {/* Section grouping (sidebar only, items still appear in bottom nav) */}
    <MenuBarSection label="Catalog">
      <MenuBarItem value="products" icon={<Package />}>Products</MenuBarItem>
      <MenuBarItem value="orders"   icon={<ShoppingCart />}>Orders</MenuBarItem>
    </MenuBarSection>

    {/* Divider + footer items */}
    <MenuBarDivider />
    <MenuBarItem value="settings" icon={<Settings />} bottomNav={false}>
      Settings
    </MenuBarItem>
    <MenuBarItem value="logout" icon={<LogOut />} bottomNav={false}>
      Log Out
    </MenuBarItem>
  </MenuBarNav>
</MenuBar>`,
};

// ── Shared helpers ─────────────────────────────────────────────────────────────

function SectionCard({ label, children }: { label: string; children: ReactNode }) {
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
      <div className="p-5 sm:p-6">
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

function Chip({ children }: { children: ReactNode }) {
  return (
    <code className="text-indigo-600 dark:text-indigo-300 text-xs font-mono
      bg-indigo-50 dark:bg-indigo-500/10
      px-1.5 py-0.5 rounded-md border border-indigo-100 dark:border-indigo-500/20">
      {children}
    </code>
  );
}

function PropsTable({
  title,
  data,
}: {
  title: string;
  data: { name: string; type: string; defaultVal: string; description: string }[];
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold tracking-wider uppercase mb-2
        text-slate-400 dark:text-slate-500">
        {title}
      </h3>
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
            {data.map(p => (
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
  );
}

// ── App icon (inline brand for demos) ─────────────────────────────────────────

function DemoBrand() {
  return (
    <div className="flex items-center gap-3">
      <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600
        flex items-center justify-center shrink-0 shadow-sm">
        <Layers className="h-4 w-4 text-white" />
      </div>
      <div>
        <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">
          AHLFAGON
        </p>
        <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
          Dashboard
        </p>
      </div>
    </div>
  );
}

// ── Shared nav items (reused across demos) ────────────────────────────────────

function FullNavItems() {
  return (
    <>
      <MenuBarBrand><DemoBrand /></MenuBarBrand>
      <MenuBarNav>
        <MenuBarItem value="dashboard" icon={<LayoutDashboard className="h-[18px] w-[18px]" />}>Dashboard</MenuBarItem>
        <MenuBarItem value="search"    icon={<Search    className="h-[18px] w-[18px]" />}>Search</MenuBarItem>
        <MenuBarItem value="starred"   icon={<Star      className="h-[18px] w-[18px]" />}>Starred</MenuBarItem>

        <MenuBarSection label="Management">
          <MenuBarItem value="users"    icon={<Users        className="h-[18px] w-[18px]" />}>Users</MenuBarItem>
          <MenuBarItem value="products" icon={<Package      className="h-[18px] w-[18px]" />}>Products</MenuBarItem>
          <MenuBarItem value="orders"   icon={<ShoppingCart className="h-[18px] w-[18px]" />}>Orders</MenuBarItem>
          <MenuBarItem value="invoices" icon={<Receipt      className="h-[18px] w-[18px]" />} bottomNav={false}>Invoices</MenuBarItem>
        </MenuBarSection>

        <MenuBarSection label="Analytics">
          <MenuBarItem value="reports"  icon={<BarChart2 className="h-[18px] w-[18px]" />} bottomNav={false}>Reports</MenuBarItem>
          <MenuBarItem value="activity" icon={<Clock     className="h-[18px] w-[18px]" />} bottomNav={false}>Activity</MenuBarItem>
        </MenuBarSection>

        <MenuBarDivider />
        <MenuBarItem value="settings" icon={<Settings className="h-[18px] w-[18px]" />} bottomNav={false}>Settings</MenuBarItem>
        <MenuBarItem value="logout"   icon={<LogOut   className="h-[18px] w-[18px]" />} bottomNav={false}>Log Out</MenuBarItem>
      </MenuBarNav>
    </>
  );
}

// ── Demo: sidebar + bottom nav (shared nav state) ─────────────────────────────

function FullDemo({ demoTab }: { demoTab: DemoTab }) {
  const [active, setActive] = useState('dashboard');
  const display = demoTab === 'sidebar' ? 'sidebar' : 'bottomnav';

  const content = (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="text-center">
        <div className="h-12 w-12 rounded-2xl bg-kv-50 dark:bg-kv-500/15
          border border-kv-200/60 dark:border-kv-500/20
          flex items-center justify-center mx-auto mb-3">
          <LayoutDashboard className="h-5 w-5 text-kv-600 dark:text-kv-400" />
        </div>
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 capitalize">{active}</p>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Active page</p>
      </div>
    </div>
  );

  if (demoTab === 'sidebar') {
    return (
      <div className="flex rounded-2xl overflow-hidden border border-slate-200/60 dark:border-white/8 shadow-sm" style={{ height: 420 }}>
        <MenuBar value={active} onValueChange={setActive} display={display} className="w-56 h-full">
          <FullNavItems />
        </MenuBar>
        <div className="flex-1 bg-slate-50/60 dark:bg-slate-900/40">{content}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col rounded-2xl overflow-hidden border border-slate-200/60 dark:border-white/8 shadow-sm" style={{ height: 420 }}>
      <div className="flex-1 bg-slate-50/60 dark:bg-slate-900/40">{content}</div>
      <MenuBar value={active} onValueChange={setActive} display={display} bottomNavClassName="w-full">
        <FullNavItems />
      </MenuBar>
    </div>
  );
}

// ── Minimal demo (flat items) ──────────────────────────────────────────────────

function MinimalNavItems() {
  return (
    <>
      <MenuBarBrand><DemoBrand /></MenuBarBrand>
      <MenuBarNav>
        <MenuBarItem value="home"     icon={<Home     className="h-[18px] w-[18px]" />}>Home</MenuBarItem>
        <MenuBarItem value="explore"  icon={<Globe    className="h-[18px] w-[18px]" />}>Explore</MenuBarItem>
        <MenuBarItem value="alerts"   icon={<Bell     className="h-[18px] w-[18px]" />}>Alerts</MenuBarItem>
        <MenuBarItem value="history"  icon={<Clock    className="h-[18px] w-[18px]" />}>History</MenuBarItem>
        <MenuBarItem value="profile"  icon={<User     className="h-[18px] w-[18px]" />}>Profile</MenuBarItem>
        <MenuBarDivider />
        <MenuBarItem value="docs"     icon={<BookOpen  className="h-[18px] w-[18px]" />} bottomNav={false}>Docs</MenuBarItem>
        <MenuBarItem value="security" icon={<Shield    className="h-[18px] w-[18px]" />} bottomNav={false}>Security</MenuBarItem>
        <MenuBarItem value="help"     icon={<HelpCircle className="h-[18px] w-[18px]" />} bottomNav={false}>Help</MenuBarItem>
      </MenuBarNav>
    </>
  );
}

function MinimalDemo({ demoTab }: { demoTab: DemoTab }) {
  const [active, setActive] = useState('home');
  const display = demoTab === 'sidebar' ? 'sidebar' : 'bottomnav';

  const content = (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="text-center">
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 capitalize">{active}</p>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Active page</p>
      </div>
    </div>
  );

  if (demoTab === 'sidebar') {
    return (
      <div className="flex rounded-2xl overflow-hidden border border-slate-200/60 dark:border-white/8 shadow-sm" style={{ height: 380 }}>
        <MenuBar value={active} onValueChange={setActive} display={display} className="w-56 h-full">
          <MinimalNavItems />
        </MenuBar>
        <div className="flex-1 bg-slate-50/60 dark:bg-slate-900/40">{content}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col rounded-2xl overflow-hidden border border-slate-200/60 dark:border-white/8 shadow-sm" style={{ height: 380 }}>
      <div className="flex-1 bg-slate-50/60 dark:bg-slate-900/40">{content}</div>
      <MenuBar value={active} onValueChange={setActive} display={display} bottomNavClassName="w-full">
        <MinimalNavItems />
      </MenuBar>
    </div>
  );
}

// ── Tab switcher ───────────────────────────────────────────────────────────────

function DemoTabSwitch({ value, onChange }: { value: DemoTab; onChange: (t: DemoTab) => void }) {
  return (
    <div className="flex items-center gap-1 p-0.5 rounded-lg w-fit mb-4
      bg-slate-100/60 dark:bg-slate-800/60
      border border-slate-200/40 dark:border-white/5">
      {(['sidebar', 'mobile'] as const).map(t => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={`px-3 py-1 rounded-md text-xs font-medium capitalize transition-all ${
            value === t
              ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
          }`}
        >
          {t === 'sidebar' ? 'Desktop / Sidebar' : 'Mobile / Bottom nav'}
        </button>
      ))}
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function MenuBarPage() {
  const [pageTab, setPageTab] = useState<PageTab>('preview');
  const [demoTab, setDemoTab] = useState<DemoTab>('sidebar');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-10">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs mb-6
        text-slate-400 dark:text-slate-600">
        <Link to="/overview" className="hover:text-slate-600 dark:hover:text-slate-400 transition-colors">
          Components
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-700 dark:text-slate-300">MenuBar</span>
      </nav>

      {/* Title + description */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-slate-900 dark:text-white">
          MenuBar
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xl">
          A responsive application navigation layout built from{' '}
          <Chip>MenuBar</Chip>, <Chip>MenuBarBrand</Chip>, <Chip>MenuBarNav</Chip>,{' '}
          <Chip>MenuBarItem</Chip>, <Chip>MenuBarSection</Chip>, and <Chip>MenuBarDivider</Chip>.{' '}
          Renders as a glass sidebar on desktop (<Chip>lg+</Chip>) and a bottom navigation bar on mobile/tablet.
          Items with <Chip>bottomNav={'{false}'}</Chip> appear in the sidebar only.
        </p>
      </div>

      {/* Page tab switcher */}
      <div className="flex items-center gap-1 p-1 rounded-xl w-fit mb-6
        bg-slate-100/60 dark:bg-slate-800/60
        border border-slate-200/40 dark:border-white/5 backdrop-blur-sm">
        {(['preview', 'code'] as const).map(t => (
          <button
            key={t}
            onClick={() => setPageTab(t)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all capitalize ${
              pageTab === t
                ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm shadow-slate-200/50 dark:shadow-black/30'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ── PREVIEW TAB ─────────────────────────────── */}
      {pageTab === 'preview' && (
        <div className="flex flex-col gap-5 mb-12">

          {/* Desktop sidebar note */}
          <div className="flex items-start gap-2.5 px-4 py-3 rounded-xl
            bg-kv-50/60 dark:bg-kv-500/8
            border border-kv-200/50 dark:border-kv-500/15
            text-kv-700 dark:text-kv-300 text-xs">
            <span className="shrink-0 mt-0.5">💡</span>
            <span>
              The sidebar is visible on <strong>lg+</strong> screens and the bottom nav appears on <strong>mobile/tablet</strong>.
              Use the toggle below to preview each layout independently.
            </span>
          </div>

          {/* Full nav demo */}
          <SectionCard label="Full navigation — Sections & Divider">
            <DemoTabSwitch value={demoTab} onChange={setDemoTab} />
            <FullDemo demoTab={demoTab} />
          </SectionCard>

          {/* Minimal demo */}
          <SectionCard label="Minimal — Flat items">
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-4">
              Simple flat item list. Items marked with <Chip>bottomNav={'{false}'}</Chip> appear in the
              sidebar only (Docs, Security, Help).
            </p>
            <DemoTabSwitch value={demoTab} onChange={setDemoTab} />
            <MinimalDemo demoTab={demoTab} />
          </SectionCard>

        </div>
      )}

      {/* ── CODE TAB ─────────────────────────────────── */}
      {pageTab === 'code' && (
        <div className="flex flex-col gap-4 mb-12">
          {Object.entries(snippets).map(([label, code]) => (
            <div key={label}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-2
                text-slate-400 dark:text-slate-500">
                {label}
              </p>
              <CodeBlock code={code} />
            </div>
          ))}
        </div>
      )}

      {/* ── Props ────────────────────────────────────── */}
      <div className="flex flex-col gap-6">
        <PropsTable title="MenuBar" data={menuBarProps} />
        <PropsTable title="MenuBarItem" data={menuBarItemProps} />
        <PropsTable title="MenuBarSection" data={menuBarSectionProps} />
      </div>

    </div>
  );
}
