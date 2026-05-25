import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight, Copy, Check, Bell, Settings, Search,
  ShoppingCart, LayoutDashboard, BarChart2, FileText,
} from 'lucide-react';
import {
  Navbar, NavbarBrand, NavbarContent, NavbarItem,
  NavbarMenuToggle, NavbarMenu,
  Button, Badge, Avatar,
} from '../../../../src';

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
  { name: 'className', type: 'string', defaultVal: '—', description: 'Merged via tailwind-merge — override any token for custom looks.' },
  { name: '...props', type: 'React.ComponentPropsWithoutRef<"a">', defaultVal: '—', description: 'All native anchor attributes forwarded.' },
];

const contentProps = [
  { name: 'justify', type: "'start' | 'center' | 'end'", defaultVal: "'start'", description: "Controls alignment. 'end' shrinks to content; 'start'/'center' fill remaining space." },
  { name: 'className', type: 'string', defaultVal: '—', description: 'Merged via tailwind-merge.' },
];

// ── Code snippets ──────────────────────────────────────────────────────────────

const snippets: Record<string, string> = {
  'Basic': `import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from 'kayv-glass-ui';

<Navbar>
  <NavbarBrand>
    <div className="h-7 w-7 rounded-lg bg-kv-500 flex items-center
      justify-center text-white text-xs font-bold">K</div>
    <span className="font-bold text-sm text-slate-900 dark:text-white">MyApp</span>
  </NavbarBrand>
  <NavbarContent justify="center">
    <NavbarItem href="/" isActive>Home</NavbarItem>
    <NavbarItem href="/docs">Docs</NavbarItem>
    <NavbarItem href="/blog">Blog</NavbarItem>
  </NavbarContent>
  <NavbarContent justify="end" className="gap-2">
    <Button size="sm" variant="ghost">Sign in</Button>
    <Button size="sm" variant="secondary">Get started</Button>
  </NavbarContent>
</Navbar>`,

  'Dark glass': `{/* Override the surface via className — tailwind-merge resolves conflicts */}
<Navbar className="bg-slate-900/90 dark:bg-slate-950/90 border-white/5">
  <NavbarBrand>
    <div className="h-7 w-7 rounded-lg bg-kv-500 ...">K</div>
    <span className="font-bold text-sm text-white">Kayv</span>
  </NavbarBrand>
  <NavbarContent justify="center">
    <NavbarItem
      isActive
      className="bg-white/10 text-white border-white/15"
    >
      Home
    </NavbarItem>
    <NavbarItem className="text-slate-400 hover:text-white
      hover:bg-white/5 border-transparent">
      Docs
    </NavbarItem>
  </NavbarContent>
  <NavbarContent justify="end">
    <Button size="sm" className="bg-kv-500 hover:bg-kv-600
      text-white border-kv-400/30">
      Sign in
    </Button>
  </NavbarContent>
</Navbar>`,

  'With avatar & notifications': `import { Avatar } from 'kayv-glass-ui';

<Navbar>
  <NavbarBrand>
    <span className="font-bold text-sm text-slate-900 dark:text-white">
      Dashboard
    </span>
  </NavbarBrand>
  <NavbarContent justify="center">
    <NavbarItem href="/overview" isActive>Overview</NavbarItem>
    <NavbarItem href="/analytics">Analytics</NavbarItem>
    <NavbarItem href="/reports">Reports</NavbarItem>
  </NavbarContent>
  <NavbarContent justify="end" className="gap-2">
    {/* Notification badge */}
    <div className="relative">
      <Button size="sm" variant="ghost" className="px-2">
        <Bell className="h-4 w-4" />
      </Button>
      <span className="absolute top-1 right-1 h-2 w-2 rounded-full
        bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
    </div>
    <Avatar fallback="JD" size="sm" status="online" />
  </NavbarContent>
</Navbar>`,

  'With search bar': `<Navbar>
  <NavbarBrand>
    <div className="h-7 w-7 rounded-lg bg-kv-500 ...">K</div>
    <span className="font-bold text-sm text-slate-900 dark:text-white">Studio</span>
  </NavbarBrand>
  <NavbarContent justify="center" className="max-w-xs w-full">
    <div className="relative w-full">
      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2
        h-3.5 w-3.5 text-slate-400 pointer-events-none" />
      <input
        placeholder="Search…"
        className="w-full h-8 pl-8 pr-3 text-xs rounded-lg
          bg-slate-100/60 dark:bg-white/5
          border border-slate-200/60 dark:border-white/10
          text-slate-700 dark:text-slate-300
          placeholder:text-slate-400
          focus:outline-none focus:border-kv-300 dark:focus:border-kv-500/40
          transition-colors"
      />
    </div>
  </NavbarContent>
  <NavbarContent justify="end" className="gap-2">
    <Button size="sm" variant="ghost" className="px-2">
      <Settings className="h-4 w-4" />
    </Button>
    <Avatar fallback="SJ" size="sm" />
  </NavbarContent>
</Navbar>`,

  'Hero transparent': `{/* Place inside a relative container with a gradient behind it */}
<div className="relative">
  <div className="h-28 bg-gradient-to-r from-kv-600 to-violet-600" />
  <Navbar
    position="static"
    className="absolute top-0 inset-x-0
      bg-transparent border-transparent backdrop-blur-none shadow-none"
  >
    <NavbarBrand>
      <span className="font-bold text-sm text-white">Hero</span>
    </NavbarBrand>
    <NavbarContent justify="center">
      <NavbarItem
        className="text-white/80 hover:text-white
          hover:bg-white/10 border-transparent">
        Features
      </NavbarItem>
      <NavbarItem
        isActive
        className="text-white bg-white/15 border-white/20">
        Pricing
      </NavbarItem>
    </NavbarContent>
    <NavbarContent justify="end">
      <Button size="sm"
        className="bg-white text-kv-600 hover:bg-white/90
          border-white/20 shadow-md">
        Get started
      </Button>
    </NavbarContent>
  </Navbar>
</div>`,

  'Pill-style tabs': `{/* Wrap NavbarContent in a pill container */}
<Navbar>
  <NavbarBrand>
    <span className="font-bold text-sm text-slate-900 dark:text-white">App</span>
  </NavbarBrand>
  <NavbarContent
    justify="center"
    className="bg-slate-100/70 dark:bg-white/5 rounded-full
      px-1.5 py-1 border border-slate-200/60 dark:border-white/8 gap-0.5"
  >
    <NavbarItem
      isActive
      className="rounded-full bg-white dark:bg-slate-700
        text-slate-900 dark:text-white shadow-sm
        border-slate-200/60 dark:border-white/10"
    >
      Home
    </NavbarItem>
    <NavbarItem
      className="rounded-full border-transparent
        text-slate-500 dark:text-slate-400
        hover:text-slate-900 dark:hover:text-white"
    >
      About
    </NavbarItem>
  </NavbarContent>
  <NavbarContent justify="end">
    <Button size="sm" variant="secondary">Sign in</Button>
  </NavbarContent>
</Navbar>`,

  'Mobile — basic': `import { useState } from 'react';
import {
  Navbar, NavbarBrand, NavbarContent,
  NavbarItem, NavbarMenuToggle, NavbarMenu, Button,
} from 'kayv-glass-ui';

function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // Wrap Navbar + NavbarMenu in a shared container
    <div>
      <Navbar>
        <NavbarBrand>
          <div className="h-7 w-7 rounded-lg bg-kv-500 ...">K</div>
          <span className="font-bold text-sm text-slate-900 dark:text-white">MyApp</span>
        </NavbarBrand>

        {/* Desktop links — hidden on mobile */}
        <NavbarContent justify="center" className="hidden md:flex">
          <NavbarItem href="/" isActive>Home</NavbarItem>
          <NavbarItem href="/docs">Docs</NavbarItem>
          <NavbarItem href="/blog">Blog</NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end" className="gap-2">
          {/* Desktop CTA — hidden on mobile */}
          <Button size="sm" variant="secondary" className="hidden md:inline-flex">
            Sign in
          </Button>
          {/* Hamburger — hidden on desktop */}
          <NavbarMenuToggle
            isOpen={isOpen}
            onToggle={() => setIsOpen(o => !o)}
            className="md:hidden"
          />
        </NavbarContent>
      </Navbar>

      {/* Mobile dropdown — slides in below the bar */}
      <NavbarMenu isOpen={isOpen}>
        <NavbarItem href="/" isActive className="w-full py-2.5">Home</NavbarItem>
        <NavbarItem href="/docs" className="w-full py-2.5">Docs</NavbarItem>
        <NavbarItem href="/blog" className="w-full py-2.5">Blog</NavbarItem>
        <div className="pt-2 mt-1 border-t border-slate-100 dark:border-white/8">
          <Button size="sm" variant="secondary" className="w-full">Sign in</Button>
        </div>
      </NavbarMenu>
    </div>
  );
}`,

  'Mobile — dark': `<div>
  <Navbar className="bg-slate-900/95 border-white/5">
    <NavbarBrand>
      <span className="font-bold text-sm text-white">Kayv</span>
    </NavbarBrand>
    <NavbarContent justify="end">
      <NavbarMenuToggle
        isOpen={isOpen}
        onToggle={() => setIsOpen(o => !o)}
        className="text-slate-400 hover:text-white hover:bg-white/10"
      />
    </NavbarContent>
  </Navbar>

  <NavbarMenu
    isOpen={isOpen}
    className="bg-slate-900/95 border-white/5"
  >
    <NavbarItem
      isActive
      className="w-full py-2.5 bg-white/10 text-white border-white/15"
    >
      Home
    </NavbarItem>
    <NavbarItem
      className="w-full py-2.5 text-slate-400 hover:text-white
        hover:bg-white/5 border-transparent"
    >
      Docs
    </NavbarItem>
    <div className="pt-2 mt-1 border-t border-white/8">
      <Button size="sm" className="w-full bg-kv-500 hover:bg-kv-600
        text-white border-kv-400/30">
        Sign in
      </Button>
    </div>
  </NavbarMenu>
</div>`,

  'Mobile — with profile': `<div>
  <Navbar>
    <NavbarBrand>
      <span className="font-bold text-sm text-slate-900 dark:text-white">App</span>
    </NavbarBrand>
    <NavbarContent justify="end" className="gap-2">
      <Avatar fallback="JD" size="sm" status="online" />
      <NavbarMenuToggle isOpen={isOpen} onToggle={() => setIsOpen(o => !o)} />
    </NavbarContent>
  </Navbar>

  <NavbarMenu isOpen={isOpen}>
    {/* User header inside the menu */}
    <div className="flex items-center gap-3 px-1 py-2 mb-1
      border-b border-slate-100 dark:border-white/8 pb-3">
      <Avatar fallback="JD" size="md" status="online" />
      <div>
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Jane Doe</p>
        <p className="text-xs text-slate-400">jane@example.com</p>
      </div>
    </div>
    <NavbarItem isActive className="w-full py-2.5">Dashboard</NavbarItem>
    <NavbarItem className="w-full py-2.5">Settings</NavbarItem>
    <NavbarItem className="w-full py-2.5">Help</NavbarItem>
    <div className="pt-2 mt-1 border-t border-slate-100 dark:border-white/8">
      <NavbarItem className="w-full py-2.5 text-rose-500 hover:text-rose-600
        hover:bg-rose-50 dark:hover:bg-rose-500/10 border-transparent">
        Sign out
      </NavbarItem>
    </div>
  </NavbarMenu>
</div>`,

  'E-commerce': `<Navbar>
  <NavbarBrand>
    <ShoppingBag className="h-5 w-5 text-kv-600" />
    <span className="font-bold text-sm text-slate-900 dark:text-white">Store</span>
  </NavbarBrand>
  <NavbarContent justify="center">
    <NavbarItem isActive>New Arrivals</NavbarItem>
    <NavbarItem>Men</NavbarItem>
    <NavbarItem>Women</NavbarItem>
    <NavbarItem>Sale <Badge variant="danger" className="ml-1">Hot</Badge></NavbarItem>
  </NavbarContent>
  <NavbarContent justify="end" className="gap-1">
    <Button size="sm" variant="ghost" className="px-2">
      <Search className="h-4 w-4" />
    </Button>
    <div className="relative">
      <Button size="sm" variant="ghost" className="px-2">
        <ShoppingCart className="h-4 w-4" />
      </Button>
      <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full
        bg-kv-500 text-white text-[9px] font-bold flex items-center justify-center">
        3
      </span>
    </div>
    <Avatar fallback="U" size="sm" />
  </NavbarContent>
</Navbar>`,
};

// ── Sub-components ─────────────────────────────────────────────────────────────

function PreviewCard({ label, children, flush }: { label: string; children: ReactNode; flush?: boolean }) {
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
      <div className={flush ? '' : 'overflow-hidden'}>{children}</div>
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

// ── Demo components ────────────────────────────────────────────────────────────

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

function DemoDark() {
  const [active, setActive] = useState('home');
  const items = ['home', 'docs', 'blog', 'pricing'] as const;
  return (
    <Navbar position="static" className="bg-slate-900/95 dark:bg-slate-950 border-white/5">
      <NavbarBrand>
        <div className="h-7 w-7 rounded-lg bg-kv-500 flex items-center justify-center text-white text-xs font-bold shrink-0">K</div>
        <span className="font-bold text-sm text-white">Kayv</span>
        <Badge variant="primary" className="text-[10px]">v0.1</Badge>
      </NavbarBrand>
      <NavbarContent justify="center">
        {items.map(id => (
          <NavbarItem
            key={id}
            onClick={() => setActive(id)}
            isActive={active === id}
            className={`capitalize cursor-pointer ${
              active === id
                ? 'bg-white/10 text-white border-white/15'
                : 'text-slate-400 hover:text-white hover:bg-white/5 border-transparent'
            }`}
          >
            {id}
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end" className="gap-1">
        <Button size="sm" variant="ghost" className="px-2 text-slate-400 hover:text-white hover:bg-white/10 border-transparent">
          <Bell className="h-4 w-4" />
        </Button>
        <Button size="sm" className="bg-kv-500 hover:bg-kv-600 text-white border-kv-400/30">
          Sign in
        </Button>
      </NavbarContent>
    </Navbar>
  );
}

function DemoWithAvatar() {
  const [active, setActive] = useState('overview');
  const navItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
    { id: 'analytics', icon: BarChart2, label: 'Analytics' },
    { id: 'reports', icon: FileText, label: 'Reports' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ] as const;
  return (
    <Navbar position="static">
      <NavbarBrand>
        <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-kv-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold shrink-0">D</div>
        <span className="font-bold text-sm text-slate-900 dark:text-white">Dashboard</span>
      </NavbarBrand>
      <NavbarContent justify="center">
        {navItems.map(({ id, icon: Icon, label }) => (
          <NavbarItem
            key={id}
            onClick={() => setActive(id)}
            isActive={active === id}
            className="cursor-pointer flex items-center gap-1.5"
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end" className="gap-2">
        <div className="relative">
          <Button size="sm" variant="ghost" className="px-2">
            <Bell className="h-4 w-4" />
          </Button>
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
        </div>
        <div className="w-px h-5 bg-slate-200 dark:bg-white/10" />
        <div className="flex items-center gap-2 cursor-pointer">
          <Avatar fallback="JD" size="sm" status="online" />
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-none">Jane Doe</p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">Admin</p>
          </div>
        </div>
      </NavbarContent>
    </Navbar>
  );
}

function DemoWithSearch() {
  const [active, setActive] = useState('home');
  const [query, setQuery] = useState('');
  return (
    <Navbar position="static">
      <NavbarBrand>
        <div className="h-7 w-7 rounded-lg bg-kv-500 flex items-center justify-center text-white text-xs font-bold shrink-0">S</div>
        <span className="font-bold text-sm text-slate-900 dark:text-white">Studio</span>
      </NavbarBrand>
      <NavbarContent justify="center" className="max-w-sm w-full">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search anything…"
            className="w-full h-8 pl-8 pr-3 text-xs rounded-lg
              bg-slate-100/60 dark:bg-white/5
              border border-slate-200/60 dark:border-white/10
              text-slate-700 dark:text-slate-300
              placeholder:text-slate-400 dark:placeholder:text-slate-600
              focus:outline-none focus:border-kv-300 dark:focus:border-kv-500/40
              focus:bg-white/80 dark:focus:bg-white/10
              transition-colors"
          />
        </div>
      </NavbarContent>
      <NavbarContent justify="end" className="gap-2">
        {(['home', 'files'] as const).map(id => (
          <NavbarItem key={id} onClick={() => setActive(id)} isActive={active === id} className="capitalize cursor-pointer">
            {id}
          </NavbarItem>
        ))}
        <div className="w-px h-5 bg-slate-200 dark:bg-white/10 mx-1" />
        <Button size="sm" variant="ghost" className="px-2">
          <Settings className="h-4 w-4" />
        </Button>
        <Avatar fallback="SJ" size="sm" />
      </NavbarContent>
    </Navbar>
  );
}

function DemoHero() {
  const [active, setActive] = useState('pricing');
  return (
    <div className="relative rounded-b-2xl overflow-hidden">
      <div className="h-28 bg-gradient-to-r from-kv-600 via-kv-500 to-violet-600" />
      <Navbar
        position="static"
        className="absolute top-0 inset-x-0 bg-transparent border-transparent backdrop-blur-none shadow-none"
      >
        <NavbarBrand>
          <div className="h-7 w-7 rounded-lg bg-white/20 border border-white/30 flex items-center justify-center text-white text-xs font-bold shrink-0">K</div>
          <span className="font-bold text-sm text-white">Hero</span>
        </NavbarBrand>
        <NavbarContent justify="center">
          {(['features', 'pricing', 'blog'] as const).map(id => (
            <NavbarItem
              key={id}
              onClick={() => setActive(id)}
              isActive={active === id}
              className={`capitalize cursor-pointer ${
                active === id
                  ? 'text-white bg-white/15 border-white/25'
                  : 'text-white/70 hover:text-white hover:bg-white/10 border-transparent'
              }`}
            >
              {id}
            </NavbarItem>
          ))}
        </NavbarContent>
        <NavbarContent justify="end" className="gap-2">
          <Button size="sm" variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10 border-transparent">
            Sign in
          </Button>
          <Button size="sm" className="bg-white text-kv-700 hover:bg-white/90 border-white/20 shadow-lg shadow-black/10">
            Get started
          </Button>
        </NavbarContent>
      </Navbar>
    </div>
  );
}

function DemoPill() {
  const [active, setActive] = useState('home');
  const items = ['home', 'explore', 'library', 'settings'] as const;
  return (
    <Navbar position="static">
      <NavbarBrand>
        <div className="h-7 w-7 rounded-full bg-kv-500 flex items-center justify-center text-white text-xs font-bold shrink-0">K</div>
        <span className="font-bold text-sm text-slate-900 dark:text-white">App</span>
      </NavbarBrand>
      <NavbarContent
        justify="center"
        className="bg-slate-100/70 dark:bg-white/5 rounded-full px-1.5 py-1 border border-slate-200/60 dark:border-white/8 gap-0.5"
      >
        {items.map(id => (
          <NavbarItem
            key={id}
            onClick={() => setActive(id)}
            isActive={active === id}
            className={`rounded-full capitalize cursor-pointer ${
              active === id
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm border-slate-200/80 dark:border-white/10'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border-transparent hover:bg-white/60 dark:hover:bg-white/5'
            }`}
          >
            {id}
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end" className="gap-2">
        <div className="relative">
          <Button size="sm" variant="ghost" className="px-2 rounded-full">
            <Bell className="h-4 w-4" />
          </Button>
          <span className="absolute top-0.5 right-0.5 h-2 w-2 rounded-full bg-kv-500" />
        </div>
        <Avatar fallback="KV" size="sm" variant="circle" />
      </NavbarContent>
    </Navbar>
  );
}

function DemoEcommerce() {
  const [active, setActive] = useState('new');
  const categories = [
    { id: 'new', label: 'New Arrivals' },
    { id: 'men', label: 'Men' },
    { id: 'women', label: 'Women' },
    { id: 'sale', label: 'Sale', hot: true },
  ] as const;
  return (
    <Navbar position="static">
      <NavbarBrand>
        <div className="flex items-center gap-1.5">
          <ShoppingCart className="h-5 w-5 text-kv-600 dark:text-kv-400" />
          <span className="font-bold text-sm text-slate-900 dark:text-white">Store</span>
        </div>
      </NavbarBrand>
      <NavbarContent justify="center">
        {categories.map(({ id, label, hot }) => (
          <NavbarItem key={id} onClick={() => setActive(id)} isActive={active === id} className="cursor-pointer gap-1.5">
            {label}
            {hot && <Badge variant="danger" className="text-[9px] px-1.5 py-0">Hot</Badge>}
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end" className="gap-1">
        <Button size="sm" variant="ghost" className="px-2">
          <Search className="h-4 w-4" />
        </Button>
        <div className="relative">
          <Button size="sm" variant="ghost" className="px-2">
            <ShoppingCart className="h-4 w-4" />
          </Button>
          <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-kv-500 text-white text-[9px] font-bold flex items-center justify-center">3</span>
        </div>
        <Avatar fallback="U" size="sm" />
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

// ── Mobile demo components ─────────────────────────────────────────────────────

function DemoMobileBasic() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState('home');
  return (
    <div>
      <Navbar position="static">
        <NavbarBrand>
          <div className="h-7 w-7 rounded-lg bg-kv-500 flex items-center justify-center text-white text-xs font-bold shrink-0">K</div>
          <span className="font-bold text-sm text-slate-900 dark:text-white">MyApp</span>
        </NavbarBrand>
        <NavbarContent justify="end" className="gap-2 ml-auto">
          <Badge variant="primary" className="hidden sm:inline-flex text-[10px]">v0.1</Badge>
          <NavbarMenuToggle isOpen={isOpen} onToggle={() => setIsOpen(o => !o)} />
        </NavbarContent>
      </Navbar>
      <NavbarMenu isOpen={isOpen}>
        {(['home', 'docs', 'blog', 'pricing'] as const).map(id => (
          <NavbarItem
            key={id}
            onClick={() => { setActive(id); setIsOpen(false); }}
            isActive={active === id}
            className="w-full py-2.5 capitalize cursor-pointer"
          >
            {id}
          </NavbarItem>
        ))}
        <div className="pt-2 mt-1 border-t border-slate-100/80 dark:border-white/8 flex flex-col gap-2">
          <Button size="sm" variant="ghost" className="w-full">Sign in</Button>
          <Button size="sm" variant="secondary" className="w-full">Get started</Button>
        </div>
      </NavbarMenu>
    </div>
  );
}

function DemoMobileDark() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState('home');
  return (
    <div>
      <Navbar position="static" className="bg-slate-900/95 dark:bg-slate-950 border-white/5">
        <NavbarBrand>
          <div className="h-7 w-7 rounded-lg bg-kv-500 flex items-center justify-center text-white text-xs font-bold shrink-0">K</div>
          <span className="font-bold text-sm text-white">Kayv</span>
        </NavbarBrand>
        <NavbarContent justify="end" className="ml-auto">
          <NavbarMenuToggle
            isOpen={isOpen}
            onToggle={() => setIsOpen(o => !o)}
            className="text-slate-400 hover:text-white hover:bg-white/10"
          />
        </NavbarContent>
      </Navbar>
      <NavbarMenu isOpen={isOpen} className="bg-slate-900/95 dark:bg-slate-950 border-white/5">
        {(['home', 'docs', 'blog', 'pricing'] as const).map(id => (
          <NavbarItem
            key={id}
            onClick={() => { setActive(id); setIsOpen(false); }}
            isActive={active === id}
            className={`w-full py-2.5 capitalize cursor-pointer ${
              active === id
                ? 'bg-white/10 text-white border-white/15'
                : 'text-slate-400 hover:text-white hover:bg-white/5 border-transparent'
            }`}
          >
            {id}
          </NavbarItem>
        ))}
        <div className="pt-2 mt-1 border-t border-white/8">
          <Button size="sm" className="w-full bg-kv-500 hover:bg-kv-600 text-white border-kv-400/30">
            Sign in
          </Button>
        </div>
      </NavbarMenu>
    </div>
  );
}

function DemoMobileWithProfile() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState('dashboard');
  return (
    <div>
      <Navbar position="static">
        <NavbarBrand>
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-kv-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold shrink-0">D</div>
          <span className="font-bold text-sm text-slate-900 dark:text-white">Dashboard</span>
        </NavbarBrand>
        <NavbarContent justify="end" className="gap-2 ml-auto">
          <Avatar fallback="JD" size="sm" status="online" />
          <NavbarMenuToggle isOpen={isOpen} onToggle={() => setIsOpen(o => !o)} />
        </NavbarContent>
      </Navbar>
      <NavbarMenu isOpen={isOpen}>
        {/* User row */}
        <div className="flex items-center gap-3 mb-2 pb-3 border-b border-slate-100 dark:border-white/8">
          <Avatar fallback="JD" size="md" status="online" />
          <div>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-none">Jane Doe</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">jane@example.com</p>
          </div>
        </div>
        {(['dashboard', 'analytics', 'projects', 'settings'] as const).map(id => (
          <NavbarItem
            key={id}
            onClick={() => { setActive(id); setIsOpen(false); }}
            isActive={active === id}
            className="w-full py-2.5 capitalize cursor-pointer"
          >
            {id}
          </NavbarItem>
        ))}
        <div className="pt-2 mt-1 border-t border-slate-100 dark:border-white/8">
          <NavbarItem
            className="w-full py-2.5 cursor-pointer text-rose-500 dark:text-rose-400
              hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-600 border-transparent"
          >
            Sign out
          </NavbarItem>
        </div>
      </NavbarMenu>
    </div>
  );
}

function DemoMobileResponsive() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState('home');
  return (
    <div>
      <Navbar position="static">
        <NavbarBrand>
          <div className="h-7 w-7 rounded-lg bg-kv-500 flex items-center justify-center text-white text-xs font-bold shrink-0">K</div>
          <span className="font-bold text-sm text-slate-900 dark:text-white">MyApp</span>
        </NavbarBrand>
        {/* Desktop links */}
        <NavbarContent justify="center" className="hidden sm:flex">
          {(['home', 'docs', 'blog'] as const).map(id => (
            <NavbarItem key={id} onClick={() => setActive(id)} isActive={active === id} className="capitalize cursor-pointer">
              {id}
            </NavbarItem>
          ))}
        </NavbarContent>
        <NavbarContent justify="end" className="gap-2 ml-auto">
          {/* Desktop CTA */}
          <Button size="sm" variant="secondary" className="hidden sm:inline-flex">Sign in</Button>
          {/* Mobile toggle — resize to see the breakpoint */}
          <NavbarMenuToggle
            isOpen={isOpen}
            onToggle={() => setIsOpen(o => !o)}
            className="sm:hidden"
          />
        </NavbarContent>
      </Navbar>
      <NavbarMenu isOpen={isOpen}>
        {(['home', 'docs', 'blog'] as const).map(id => (
          <NavbarItem
            key={id}
            onClick={() => { setActive(id); setIsOpen(false); }}
            isActive={active === id}
            className="w-full py-2.5 capitalize cursor-pointer"
          >
            {id}
          </NavbarItem>
        ))}
        <div className="pt-2 mt-1 border-t border-slate-100/80 dark:border-white/8">
          <Button size="sm" variant="secondary" className="w-full">Sign in</Button>
        </div>
      </NavbarMenu>
    </div>
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

      {/* Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-slate-900 dark:text-white">
          Navbar
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xl">
          A composable, glass-style navigation bar built from four ref-forwarding parts —{' '}
          <code className="text-kv-600 dark:text-kv-400 text-xs font-mono bg-kv-50 dark:bg-kv-500/10 px-1.5 py-0.5 rounded">Navbar</code>,{' '}
          <code className="text-kv-600 dark:text-kv-400 text-xs font-mono bg-kv-50 dark:bg-kv-500/10 px-1.5 py-0.5 rounded">NavbarBrand</code>,{' '}
          <code className="text-kv-600 dark:text-kv-400 text-xs font-mono bg-kv-50 dark:bg-kv-500/10 px-1.5 py-0.5 rounded">NavbarContent</code>, and{' '}
          <code className="text-kv-600 dark:text-kv-400 text-xs font-mono bg-kv-50 dark:bg-kv-500/10 px-1.5 py-0.5 rounded">NavbarItem</code>.
          Theme colors update instantly; use <code className="text-kv-600 dark:text-kv-400 text-xs font-mono bg-kv-50 dark:bg-kv-500/10 px-1.5 py-0.5 rounded">className</code> overrides for custom looks.
        </p>
      </div>

      {/* Tab switcher */}
      <div className="flex items-center gap-1 p-1 rounded-xl w-fit mb-6
        bg-slate-100/60 dark:bg-slate-800/60
        border border-slate-200/40 dark:border-white/5 backdrop-blur-sm">
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
          <PreviewCard label="Default glass — brand + centered links + CTA">
            <DemoBasic />
          </PreviewCard>
          <PreviewCard label="Dark glass — dark surface with white-tinted items">
            <DemoDark />
          </PreviewCard>
          <PreviewCard label="Dashboard — with icons, avatar, notification dot">
            <DemoWithAvatar />
          </PreviewCard>
          <PreviewCard label="Studio — embedded search bar">
            <DemoWithSearch />
          </PreviewCard>
          <PreviewCard label="Hero transparent — over a gradient background" flush>
            <DemoHero />
          </PreviewCard>
          <PreviewCard label="Pill tabs — rounded container with floating active chip">
            <DemoPill />
          </PreviewCard>
          <PreviewCard label="E-commerce — categories + cart badge + avatar">
            <DemoEcommerce />
          </PreviewCard>
          <PreviewCard label="Minimal — brand + end actions only">
            <DemoBrandOnly />
          </PreviewCard>

          {/* Mobile section */}
          <div className="flex items-center gap-3 mt-4">
            <div className="h-px flex-1 bg-slate-200/70 dark:bg-white/8" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-600 shrink-0">
              Mobile navigation
            </span>
            <div className="h-px flex-1 bg-slate-200/70 dark:bg-white/8" />
          </div>

          <p className="text-xs text-slate-400 dark:text-slate-500 -mt-1">
            Uses <code className="text-kv-600 dark:text-kv-400 font-mono">NavbarMenuToggle</code> + <code className="text-kv-600 dark:text-kv-400 font-mono">NavbarMenu</code>. Click the hamburger to toggle. Add <code className="font-mono">md:hidden</code> / <code className="font-mono">hidden md:flex</code> for real responsive breakpoints.
          </p>

          <PreviewCard label="Default glass — hamburger + animated dropdown">
            <DemoMobileBasic />
          </PreviewCard>
          <PreviewCard label="Dark glass mobile menu">
            <DemoMobileDark />
          </PreviewCard>
          <PreviewCard label="With user profile header in the menu">
            <DemoMobileWithProfile />
          </PreviewCard>
          <PreviewCard label="Responsive — desktop links hidden at sm breakpoint (resize to see)">
            <DemoMobileResponsive />
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
          <h2 className="text-xs font-semibold tracking-wider uppercase mb-3 text-slate-400 dark:text-slate-500">
            Navbar props
          </h2>
          <PropsTable rows={navbarProps} />
        </div>
        <div>
          <h2 className="text-xs font-semibold tracking-wider uppercase mb-3 text-slate-400 dark:text-slate-500">
            NavbarContent props
          </h2>
          <PropsTable rows={contentProps} />
        </div>
        <div>
          <h2 className="text-xs font-semibold tracking-wider uppercase mb-3 text-slate-400 dark:text-slate-500">
            NavbarItem props
          </h2>
          <PropsTable rows={itemProps} />
        </div>
      </div>

    </div>
  );
}
