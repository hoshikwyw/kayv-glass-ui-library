import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight, Copy, Check,
  Bell, User, CreditCard, Shield, LogOut, Star,
  Home, LayoutDashboard, BarChart2, FileText,
} from 'lucide-react';
import { Drawer, DrawerHeader, DrawerBody, DrawerFooter, Button } from '../../../../src';
import type { DrawerPlacement, DrawerSize } from '../../../../src';

type Tab = 'preview' | 'code';

// ── Props data ─────────────────────────────────────────────────────────────────

const drawerProps = [
  { name: 'open',             type: 'boolean',                                 defaultVal: '—',       description: 'Controls whether the drawer is shown.' },
  { name: 'onClose',          type: '() => void',                              defaultVal: '—',       description: 'Called when the drawer requests to close (backdrop click, ESC, close button).' },
  { name: 'placement',        type: "'left' | 'right' | 'top' | 'bottom'",    defaultVal: "'right'", description: 'Which edge the drawer slides in from.' },
  { name: 'size',             type: "'sm' | 'md' | 'lg' | 'xl' | 'full'",     defaultVal: "'md'",    description: 'Width (left/right) or height (top/bottom) of the panel.' },
  { name: 'closeOnBackdrop',  type: 'boolean',                                 defaultVal: 'true',    description: 'Clicking the backdrop calls onClose.' },
  { name: 'closeOnEsc',       type: 'boolean',                                 defaultVal: 'true',    description: 'Pressing Escape calls onClose.' },
  { name: 'className',        type: 'string',                                  defaultVal: '—',       description: 'Extra classes merged onto the panel element.' },
];

const headerProps = [
  { name: 'onClose', type: '() => void', defaultVal: '—', description: 'Override the close handler (defaults to the one from DrawerContext).' },
  { name: '...props', type: 'React.ComponentPropsWithoutRef<"div">', defaultVal: '—', description: 'All native div attributes are forwarded.' },
];

// ── Code snippets ──────────────────────────────────────────────────────────────

const snippets: Record<string, string> = {
  'Right (default)': `import { useState } from 'react';
import { Drawer, DrawerHeader, DrawerBody, DrawerFooter, Button } from 'kayv-glass-ui';

function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open drawer</Button>

      <Drawer open={open} onClose={() => setOpen(false)}>
        <DrawerHeader>Settings</DrawerHeader>
        <DrawerBody>
          {/* your content */}
        </DrawerBody>
        <DrawerFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="primary">Save</Button>
        </DrawerFooter>
      </Drawer>
    </>
  );
}`,

  Left: `<Drawer open={open} onClose={() => setOpen(false)} placement="left">
  <DrawerHeader>Navigation</DrawerHeader>
  <DrawerBody>…</DrawerBody>
</Drawer>`,

  Bottom: `<Drawer open={open} onClose={() => setOpen(false)} placement="bottom" size="sm">
  <DrawerHeader>Actions</DrawerHeader>
  <DrawerBody>…</DrawerBody>
</Drawer>`,

  Top: `<Drawer open={open} onClose={() => setOpen(false)} placement="top" size="sm">
  <DrawerHeader>Notifications</DrawerHeader>
  <DrawerBody>…</DrawerBody>
</Drawer>`,

  Sizes: `{/* Width for left / right */}
<Drawer placement="right" size="sm">…</Drawer>   {/* 288px */}
<Drawer placement="right" size="md">…</Drawer>   {/* 320px — default */}
<Drawer placement="right" size="lg">…</Drawer>   {/* 384px */}
<Drawer placement="right" size="xl">…</Drawer>   {/* 448px */}
<Drawer placement="right" size="full">…</Drawer> {/* 100vw */}

{/* Height for top / bottom */}
<Drawer placement="bottom" size="sm">…</Drawer>  {/* 224px */}
<Drawer placement="bottom" size="md">…</Drawer>  {/* 288px */}`,
};

// ── Sub-components ─────────────────────────────────────────────────────────────

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
      <div className="overflow-x-auto rounded-2xl border border-white/60 dark:border-white/10
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

// ── Demo content ───────────────────────────────────────────────────────────────

function SettingsItem({
  icon: Icon,
  label,
  desc,
}: {
  icon: React.ElementType;
  label: string;
  desc: string;
}) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-slate-100/60 dark:border-white/5 last:border-0">
      <div className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0
        bg-slate-100/80 dark:bg-white/8">
        <Icon className="h-4 w-4 text-slate-500 dark:text-slate-400" />
      </div>
      <div>
        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{label}</p>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{desc}</p>
      </div>
    </div>
  );
}

function NavItem({
  icon: Icon,
  label,
  active,
}: {
  icon: React.ElementType;
  label: string;
  active?: boolean;
}) {
  return (
    <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm
      font-medium transition-colors text-left
      ${active
        ? 'bg-kv-50/80 dark:bg-kv-500/15 text-kv-600 dark:text-kv-300 border border-kv-100 dark:border-kv-500/20'
        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/60 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-slate-200'
      }`}>
      <Icon className="h-4 w-4 shrink-0" />
      {label}
    </button>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function DrawerPage() {
  const [tab, setTab] = useState<Tab>('preview');

  // Individual open states for each demo drawer
  const [rightOpen, setRightOpen] = useState(false);
  const [leftOpen, setLeftOpen] = useState(false);
  const [bottomOpen, setBottomOpen] = useState(false);
  const [topOpen, setTopOpen] = useState(false);

  // Size playground
  const [sizeDrawerOpen, setSizeDrawerOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<DrawerSize>('md');
  const [selectedPlacement, setSelectedPlacement] = useState<DrawerPlacement>('right');

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
        <span className="text-slate-700 dark:text-slate-300">Drawer</span>
      </nav>

      {/* Title + description */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2
          text-slate-900 dark:text-white">
          Drawer
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xl">
          A slide-in panel that renders in a portal above all content. Supports four{' '}
          <Chip>placement</Chip> directions and five <Chip>size</Chip> presets.
          Includes scroll lock, focus trap, ESC key, and backdrop click to close.
          Composed from <Chip>Drawer</Chip>, <Chip>DrawerHeader</Chip>,{' '}
          <Chip>DrawerBody</Chip>, and <Chip>DrawerFooter</Chip>.
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
        <div className="flex flex-col gap-6 mb-12">

          {/* Placement demos */}
          <div className="rounded-2xl overflow-hidden
            border border-white/60 dark:border-white/10
            bg-white/40 dark:bg-slate-800/40
            backdrop-blur-sm shadow-sm shadow-slate-100/50 dark:shadow-black/10">
            <div className="px-5 py-3.5 border-b border-slate-100/50 dark:border-white/5
              bg-white/30 dark:bg-slate-700/20">
              <span className="text-xs font-semibold tracking-wider uppercase
                text-slate-400 dark:text-slate-500">
                Placement
              </span>
            </div>
            <div className="px-6 py-8 flex flex-wrap gap-3">
              <Button onClick={() => setRightOpen(true)}>Right (default)</Button>
              <Button variant="secondary" onClick={() => setLeftOpen(true)}>Left</Button>
              <Button variant="secondary" onClick={() => setBottomOpen(true)}>Bottom</Button>
              <Button variant="secondary" onClick={() => setTopOpen(true)}>Top</Button>
            </div>
          </div>

          {/* Size + placement playground */}
          <div className="rounded-2xl overflow-hidden
            border border-white/60 dark:border-white/10
            bg-white/40 dark:bg-slate-800/40
            backdrop-blur-sm shadow-sm shadow-slate-100/50 dark:shadow-black/10">
            <div className="px-5 py-3.5 border-b border-slate-100/50 dark:border-white/5
              bg-white/30 dark:bg-slate-700/20">
              <span className="text-xs font-semibold tracking-wider uppercase
                text-slate-400 dark:text-slate-500">
                Sizes & Placement
              </span>
            </div>
            <div className="px-6 py-8 space-y-4">
              <div className="flex flex-wrap gap-4">
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mb-2">Placement</p>
                  <div className="flex flex-wrap gap-1.5">
                    {(['left', 'right', 'top', 'bottom'] as const).map(p => (
                      <button
                        key={p}
                        onClick={() => setSelectedPlacement(p)}
                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors capitalize
                          border ${selectedPlacement === p
                            ? 'bg-kv-50 dark:bg-kv-500/15 text-kv-600 dark:text-kv-300 border-kv-200 dark:border-kv-500/30'
                            : 'border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-white/20'
                          }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mb-2">Size</p>
                  <div className="flex flex-wrap gap-1.5">
                    {(['sm', 'md', 'lg', 'xl', 'full'] as const).map(s => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors uppercase
                          border ${selectedSize === s
                            ? 'bg-kv-50 dark:bg-kv-500/15 text-kv-600 dark:text-kv-300 border-kv-200 dark:border-kv-500/30'
                            : 'border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-white/20'
                          }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <Button
                variant="primary"
                onClick={() => setSizeDrawerOpen(true)}
              >
                Open {selectedPlacement} · {selectedSize}
              </Button>
            </div>
          </div>

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

      {/* ── PROPS TABLES ─────────────────────────────────── */}
      <div className="flex flex-col gap-8">
        <h2 className="text-xs font-semibold tracking-wider uppercase
          text-slate-400 dark:text-slate-500 -mb-4">
          Props API
        </h2>
        <PropsTable title="Drawer" data={drawerProps} />
        <PropsTable title="DrawerHeader · DrawerBody · DrawerFooter" data={headerProps} />
      </div>

      {/* ── DRAWERS ─────────────────────────────────────── */}

      {/* Right — Settings */}
      <Drawer open={rightOpen} onClose={() => setRightOpen(false)} placement="right">
        <DrawerHeader>Settings</DrawerHeader>
        <DrawerBody>
          <div className="-mx-6 -mt-5 px-6 py-4 mb-5
            bg-gradient-to-b from-kv-50/50 dark:from-kv-500/10 to-transparent
            border-b border-slate-100/60 dark:border-white/5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-kv-400 to-kv-600
                flex items-center justify-center text-white font-bold text-sm">
                JD
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Jane Doe
                </p>
                <p className="text-xs text-slate-400">jane@example.com</p>
              </div>
            </div>
          </div>

          <SettingsItem icon={User}       label="Profile"       desc="Name, avatar, bio" />
          <SettingsItem icon={Bell}       label="Notifications" desc="Alerts and email preferences" />
          <SettingsItem icon={CreditCard} label="Billing"       desc="Plan, payment methods" />
          <SettingsItem icon={Shield}     label="Security"      desc="Password, two-factor auth" />

          <button className="w-full flex items-center gap-3 mt-4 py-3 text-sm
            text-rose-500 dark:text-rose-400 hover:text-rose-600 dark:hover:text-rose-300
            transition-colors">
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </DrawerBody>
        <DrawerFooter>
          <Button variant="ghost" onClick={() => setRightOpen(false)}>Cancel</Button>
          <Button variant="primary">Save changes</Button>
        </DrawerFooter>
      </Drawer>

      {/* Left — Navigation */}
      <Drawer open={leftOpen} onClose={() => setLeftOpen(false)} placement="left">
        <DrawerHeader>Navigation</DrawerHeader>
        <DrawerBody>
          <div className="flex flex-col gap-1">
            <NavItem icon={Home}            label="Home" />
            <NavItem icon={LayoutDashboard} label="Dashboard" active />
            <NavItem icon={BarChart2}       label="Analytics" />
            <NavItem icon={FileText}        label="Reports" />
            <NavItem icon={Star}            label="Starred" />
          </div>
        </DrawerBody>
      </Drawer>

      {/* Bottom — Action sheet */}
      <Drawer open={bottomOpen} onClose={() => setBottomOpen(false)} placement="bottom" size="sm">
        <DrawerHeader>Actions</DrawerHeader>
        <DrawerBody className="py-3">
          <div className="flex flex-col gap-1 -mx-6 px-3">
            {[
              { icon: Star,     label: 'Add to favourites', color: 'text-amber-500' },
              { icon: FileText, label: 'Export as PDF',     color: 'text-kv-500' },
              { icon: Shield,   label: 'Make private',      color: 'text-slate-500 dark:text-slate-400' },
              { icon: LogOut,   label: 'Delete',            color: 'text-rose-500' },
            ].map(({ icon: Icon, label, color }) => (
              <button
                key={label}
                onClick={() => setBottomOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm
                  font-medium text-left hover:bg-slate-100/60 dark:hover:bg-white/5
                  transition-colors"
              >
                <Icon className={`h-4 w-4 shrink-0 ${color}`} />
                <span className="text-slate-700 dark:text-slate-300">{label}</span>
              </button>
            ))}
          </div>
        </DrawerBody>
      </Drawer>

      {/* Top — Notifications */}
      <Drawer open={topOpen} onClose={() => setTopOpen(false)} placement="top" size="sm">
        <DrawerHeader>Notifications</DrawerHeader>
        <DrawerBody className="py-3">
          <div className="flex flex-col divide-y divide-slate-100/60 dark:divide-white/5">
            {[
              { title: 'New comment on your post', time: '2 min ago',  unread: true  },
              { title: 'You have a new follower',  time: '14 min ago', unread: true  },
              { title: 'Your export is ready',     time: '1 hr ago',   unread: false },
            ].map(({ title, time, unread }) => (
              <div key={title} className="flex items-start gap-3 py-3">
                {unread && (
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-kv-500 shrink-0" />
                )}
                {!unread && <span className="mt-1.5 h-2 w-2 shrink-0" />}
                <div>
                  <p className={`text-sm ${unread
                    ? 'font-medium text-slate-800 dark:text-slate-200'
                    : 'text-slate-500 dark:text-slate-400'}`}>
                    {title}
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{time}</p>
                </div>
              </div>
            ))}
          </div>
        </DrawerBody>
      </Drawer>

      {/* Size playground drawer */}
      <Drawer
        open={sizeDrawerOpen}
        onClose={() => setSizeDrawerOpen(false)}
        placement={selectedPlacement}
        size={selectedSize}
      >
        <DrawerHeader>
          {selectedPlacement} · {selectedSize}
        </DrawerHeader>
        <DrawerBody>
          <p className="text-slate-500 dark:text-slate-400">
            Placement: <code className="text-kv-600 dark:text-kv-400 font-mono text-xs">{selectedPlacement}</code>
            {' '}· Size: <code className="text-kv-600 dark:text-kv-400 font-mono text-xs">{selectedSize}</code>
          </p>
          <p className="mt-3 text-slate-400 dark:text-slate-500">
            Use the size and placement selectors above to try different combinations.
          </p>
        </DrawerBody>
        <DrawerFooter>
          <Button variant="ghost" onClick={() => setSizeDrawerOpen(false)}>Close</Button>
        </DrawerFooter>
      </Drawer>

    </div>
  );
}
