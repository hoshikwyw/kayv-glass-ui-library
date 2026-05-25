import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight, Copy, Check,
  LayoutDashboard, Settings, Bell, User, Lock, CreditCard,
  FileText, MessageSquare, Star, BarChart2,
} from 'lucide-react';
import { Tabs, TabList, Tab, TabPanels, TabPanel, Badge } from '../../../../src';

type PageTab = 'preview' | 'code';

// ── Props data ─────────────────────────────────────────────────────────────────

const tabsProps = [
  { name: 'defaultValue', type: 'string',             defaultVal: "''",      description: 'Value of the initially selected tab (uncontrolled mode).' },
  { name: 'value',        type: 'string',             defaultVal: '—',       description: 'Controlled active tab value.' },
  { name: 'onChange',     type: '(value: string) => void', defaultVal: '—',  description: 'Called whenever the active tab changes.' },
  { name: 'variant',      type: "'pills' | 'underline' | 'line'", defaultVal: "'pills'", description: 'Visual style of the tab list.' },
  { name: 'className',    type: 'string',             defaultVal: '—',       description: 'Extra classes merged onto the root wrapper.' },
];

const tabProps = [
  { name: 'value',     type: 'string',  defaultVal: '—',     description: 'Unique identifier — must match the corresponding TabPanel.' },
  { name: 'disabled',  type: 'boolean', defaultVal: 'false', description: 'Prevents selection and skips keyboard navigation.' },
  { name: 'className', type: 'string',  defaultVal: '—',     description: 'Extra classes merged onto the button.' },
  { name: '...props',  type: 'React.ComponentPropsWithoutRef<"button">', defaultVal: '—', description: 'All native button attributes forwarded.' },
];

const panelProps = [
  { name: 'value',     type: 'string', defaultVal: '—', description: 'Must match the corresponding Tab\'s value. Panel is hidden when not active.' },
  { name: 'className', type: 'string', defaultVal: '—', description: 'Extra classes merged onto the panel div.' },
  { name: '...props',  type: 'React.ComponentPropsWithoutRef<"div">', defaultVal: '—', description: 'All native div attributes forwarded.' },
];

// ── Code snippets ──────────────────────────────────────────────────────────────

const snippets: Record<string, string> = {
  'Pills (default)': `import { Tabs, TabList, Tab, TabPanels, TabPanel } from 'kayv-glass-ui';

<Tabs defaultValue="overview">
  <TabList>
    <Tab value="overview">Overview</Tab>
    <Tab value="settings">Settings</Tab>
    <Tab value="notifications">Notifications</Tab>
  </TabList>
  <TabPanels className="mt-4">
    <TabPanel value="overview">Overview content</TabPanel>
    <TabPanel value="settings">Settings content</TabPanel>
    <TabPanel value="notifications">Notifications content</TabPanel>
  </TabPanels>
</Tabs>`,

  Underline: `<Tabs defaultValue="details" variant="underline">
  <TabList>
    <Tab value="details">Details</Tab>
    <Tab value="comments">Comments</Tab>
    <Tab value="activity">Activity</Tab>
  </TabList>
  <TabPanels className="mt-4">
    <TabPanel value="details">…</TabPanel>
    <TabPanel value="comments">…</TabPanel>
    <TabPanel value="activity">…</TabPanel>
  </TabPanels>
</Tabs>`,

  Line: `<Tabs defaultValue="profile" variant="line">
  <TabList>
    <Tab value="profile">Profile</Tab>
    <Tab value="security">Security</Tab>
    <Tab value="billing">Billing</Tab>
  </TabList>
  <TabPanels className="mt-0">
    <TabPanel value="profile">…</TabPanel>
    <TabPanel value="security">…</TabPanel>
    <TabPanel value="billing">…</TabPanel>
  </TabPanels>
</Tabs>`,

  'Icons & Badges': `<Tabs defaultValue="dashboard" variant="underline">
  <TabList>
    <Tab value="dashboard">
      <LayoutDashboard className="h-4 w-4" />
      Dashboard
    </Tab>
    <Tab value="messages">
      <MessageSquare className="h-4 w-4" />
      Messages
      <Badge variant="danger">3</Badge>
    </Tab>
    <Tab value="reports" disabled>
      <BarChart2 className="h-4 w-4" />
      Reports
    </Tab>
  </TabList>
  …
</Tabs>`,

  Controlled: `import { useState } from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from 'kayv-glass-ui';

function ControlledExample() {
  const [active, setActive] = useState('a');

  return (
    <>
      <p>Active: {active}</p>
      <Tabs value={active} onChange={setActive}>
        <TabList>
          <Tab value="a">Tab A</Tab>
          <Tab value="b">Tab B</Tab>
          <Tab value="c">Tab C</Tab>
        </TabList>
        <TabPanels className="mt-4">
          <TabPanel value="a">Content A</TabPanel>
          <TabPanel value="b">Content B</TabPanel>
          <TabPanel value="c">Content C</TabPanel>
        </TabPanels>
      </Tabs>
    </>
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

// ── Stat card used inside demo panels ─────────────────────────────────────────

function StatCard({ label, value, change }: { label: string; value: string; change: string }) {
  const positive = change.startsWith('+');
  return (
    <div className="p-4 rounded-xl
      bg-white/60 dark:bg-slate-700/40 backdrop-blur-sm
      border border-white/60 dark:border-white/8">
      <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">{label}</p>
      <p className="text-xl font-bold text-slate-800 dark:text-white">{value}</p>
      <p className={`text-xs mt-1 font-medium ${positive
        ? 'text-emerald-500 dark:text-emerald-400'
        : 'text-rose-500 dark:text-rose-400'}`}>
        {change} vs last month
      </p>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function TabsPage() {
  const [pageTab, setPageTab] = useState<PageTab>('preview');
  const [controlled, setControlled] = useState('metrics');

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
        <span className="text-slate-700 dark:text-slate-300">Tabs</span>
      </nav>

      {/* Title + description */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2
          text-slate-900 dark:text-white">
          Tabs
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xl">
          A compound tab component with three glass variants. Built from{' '}
          <Chip>Tabs</Chip>, <Chip>TabList</Chip>, <Chip>Tab</Chip>,{' '}
          <Chip>TabPanels</Chip>, and <Chip>TabPanel</Chip>. Supports both
          uncontrolled (<Chip>defaultValue</Chip>) and controlled (<Chip>value</Chip>+
          <Chip>onChange</Chip>) modes, full keyboard navigation, and ARIA attributes.
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

      {/* ── PREVIEW TAB ─────────────────────────────────── */}
      {pageTab === 'preview' && (
        <div className="flex flex-col gap-5 mb-12">

          {/* Pills (default) */}
          <PreviewCard label="Pills (default)">
            <Tabs defaultValue="overview">
              <TabList>
                <Tab value="overview">Overview</Tab>
                <Tab value="settings">Settings</Tab>
                <Tab value="notifications">Notifications</Tab>
              </TabList>
              <TabPanels className="mt-5">
                <TabPanel value="overview">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <StatCard label="Total Revenue"   value="$48,295"  change="+12.5%" />
                    <StatCard label="Active Users"    value="3,842"    change="+8.1%"  />
                    <StatCard label="Bounce Rate"     value="24.3%"    change="-3.2%"  />
                  </div>
                </TabPanel>
                <TabPanel value="settings">
                  <div className="space-y-3">
                    {[
                      { label: 'Email notifications', desc: 'Receive alerts via email' },
                      { label: 'Two-factor auth',     desc: 'Add extra account security' },
                      { label: 'Public profile',      desc: 'Allow others to find you'   },
                    ].map(({ label, desc }) => (
                      <div key={label}
                        className="flex items-center justify-between p-3 rounded-xl
                          bg-white/50 dark:bg-white/5
                          border border-slate-100/60 dark:border-white/8">
                        <div>
                          <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{label}</p>
                          <p className="text-xs text-slate-400 dark:text-slate-500">{desc}</p>
                        </div>
                        <div className="h-5 w-9 rounded-full bg-kv-500 relative shrink-0">
                          <div className="absolute right-1 top-1 h-3 w-3 rounded-full bg-white" />
                        </div>
                      </div>
                    ))}
                  </div>
                </TabPanel>
                <TabPanel value="notifications">
                  <div className="space-y-2">
                    {[
                      { text: 'Your report is ready to download',  time: '2 min ago',  dot: true  },
                      { text: 'New team member joined',            time: '1 hr ago',   dot: true  },
                      { text: 'Monthly invoice generated',         time: '3 hrs ago',  dot: false },
                      { text: 'System maintenance scheduled',      time: 'Yesterday',  dot: false },
                    ].map(({ text, time, dot }) => (
                      <div key={text}
                        className="flex items-start gap-3 p-3 rounded-xl
                          bg-white/50 dark:bg-white/5
                          border border-slate-100/60 dark:border-white/8">
                        <span className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${
                          dot ? 'bg-kv-500' : 'bg-slate-200 dark:bg-slate-700'}`} />
                        <div>
                          <p className="text-sm text-slate-700 dark:text-slate-300">{text}</p>
                          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </PreviewCard>

          {/* Underline */}
          <PreviewCard label="Underline">
            <Tabs defaultValue="details" variant="underline">
              <TabList>
                <Tab value="details">Details</Tab>
                <Tab value="comments">Comments</Tab>
                <Tab value="activity">Activity</Tab>
                <Tab value="history">History</Tab>
              </TabList>
              <TabPanels className="mt-5">
                <TabPanel value="details">
                  <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        ['Status',   'Published'],
                        ['Category', 'Design System'],
                        ['Author',   'Jane Doe'],
                        ['Updated',  'May 25, 2025'],
                      ].map(([k, v]) => (
                        <div key={k} className="flex justify-between py-2
                          border-b border-slate-100/60 dark:border-white/5">
                          <span className="text-slate-400 dark:text-slate-500">{k}</span>
                          <span className="font-medium text-slate-700 dark:text-slate-300">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value="comments">
                  <div className="space-y-3">
                    {[
                      { name: 'Alex K.', msg: 'Great component library!',   time: '1 day ago' },
                      { name: 'Sam T.', msg: 'The glass effect is perfect.', time: '3 days ago' },
                    ].map(({ name, msg, time }) => (
                      <div key={name}
                        className="flex gap-3 p-3 rounded-xl
                          bg-white/50 dark:bg-white/5
                          border border-slate-100/60 dark:border-white/8">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br
                          from-kv-400 to-kv-600 flex items-center justify-center
                          text-white text-xs font-bold shrink-0">
                          {name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{name}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{msg}</p>
                          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabPanel>
                <TabPanel value="activity">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    No recent activity to display.
                  </p>
                </TabPanel>
                <TabPanel value="history">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Version history will appear here.
                  </p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </PreviewCard>

          {/* Line */}
          <PreviewCard label="Line">
            <Tabs defaultValue="profile" variant="line">
              <TabList>
                <Tab value="profile">
                  <User className="h-3.5 w-3.5" />
                  Profile
                </Tab>
                <Tab value="security">
                  <Lock className="h-3.5 w-3.5" />
                  Security
                </Tab>
                <Tab value="billing">
                  <CreditCard className="h-3.5 w-3.5" />
                  Billing
                </Tab>
                <Tab value="notifications">
                  <Bell className="h-3.5 w-3.5" />
                  Notifications
                </Tab>
              </TabList>
              <TabPanels className="mt-5">
                <TabPanel value="profile">
                  <div className="flex flex-col sm:flex-row items-start gap-5">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br
                      from-kv-400 to-kv-600 flex items-center justify-center
                      text-white text-2xl font-bold shrink-0">
                      JD
                    </div>
                    <div className="flex-1 space-y-3 w-full">
                      {[
                        { label: 'Full name',  value: 'Jane Doe'          },
                        { label: 'Email',      value: 'jane@example.com'  },
                        { label: 'Username',   value: '@janedoe'          },
                      ].map(({ label, value }) => (
                        <div key={label}>
                          <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">{label}</p>
                          <div className="px-3 py-2 rounded-lg text-sm
                            text-slate-700 dark:text-slate-300
                            bg-white/60 dark:bg-white/5
                            border border-slate-200/60 dark:border-white/10">
                            {value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value="security">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-xl
                      bg-white/50 dark:bg-white/5 border border-slate-100/60 dark:border-white/8">
                      <div className="flex items-center gap-2.5">
                        <Lock className="h-4 w-4 text-slate-400" />
                        <div>
                          <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Password</p>
                          <p className="text-xs text-slate-400">Last changed 30 days ago</p>
                        </div>
                      </div>
                      <button className="text-xs text-kv-600 dark:text-kv-400 font-medium">Change</button>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl
                      bg-white/50 dark:bg-white/5 border border-slate-100/60 dark:border-white/8">
                      <div className="flex items-center gap-2.5">
                        <Settings className="h-4 w-4 text-slate-400" />
                        <div>
                          <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Two-factor auth</p>
                          <p className="text-xs text-slate-400">Not enabled</p>
                        </div>
                      </div>
                      <button className="text-xs text-kv-600 dark:text-kv-400 font-medium">Enable</button>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value="billing">
                  <div className="p-4 rounded-xl bg-white/50 dark:bg-white/5
                    border border-slate-100/60 dark:border-white/8">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-semibold text-slate-800 dark:text-white">Pro Plan</p>
                        <p className="text-xs text-slate-400 mt-0.5">Renews June 25, 2025</p>
                      </div>
                      <span className="text-sm font-bold text-slate-800 dark:text-white">$12/mo</span>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-500 dark:text-slate-400">•••• •••• •••• 4242</span>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value="notifications">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Notification preferences shown here.
                  </p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </PreviewCard>

          {/* Icons & Badges */}
          <PreviewCard label="Icons & Badges">
            <Tabs defaultValue="dashboard" variant="underline">
              <TabList>
                <Tab value="dashboard">
                  <LayoutDashboard className="h-3.5 w-3.5" />
                  Dashboard
                </Tab>
                <Tab value="documents">
                  <FileText className="h-3.5 w-3.5" />
                  Documents
                </Tab>
                <Tab value="messages">
                  <MessageSquare className="h-3.5 w-3.5" />
                  Messages
                  <Badge variant="danger" className="ml-0.5">3</Badge>
                </Tab>
                <Tab value="starred">
                  <Star className="h-3.5 w-3.5" />
                  Starred
                  <Badge variant="warning" className="ml-0.5">12</Badge>
                </Tab>
                <Tab value="reports" disabled>
                  <BarChart2 className="h-3.5 w-3.5" />
                  Reports
                </Tab>
              </TabList>
              <TabPanels className="mt-5">
                <TabPanel value="dashboard">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Dashboard content.</p>
                </TabPanel>
                <TabPanel value="documents">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Document list.</p>
                </TabPanel>
                <TabPanel value="messages">
                  <p className="text-sm text-slate-500 dark:text-slate-400">3 unread messages.</p>
                </TabPanel>
                <TabPanel value="starred">
                  <p className="text-sm text-slate-500 dark:text-slate-400">12 starred items.</p>
                </TabPanel>
                <TabPanel value="reports">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Reports (disabled).</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </PreviewCard>

          {/* Controlled */}
          <PreviewCard label="Controlled">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {(['metrics', 'usage', 'logs'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setControlled(t)}
                    className="px-3 py-1 rounded-lg text-xs font-medium
                      border border-slate-200/60 dark:border-white/10
                      text-slate-500 dark:text-slate-400
                      hover:border-slate-300 dark:hover:border-white/20
                      transition-colors capitalize"
                  >
                    Set to "{t}"
                  </button>
                ))}
                <span className="flex items-center text-xs text-slate-400 dark:text-slate-500
                  font-mono ml-1">
                  active: <span className="text-kv-600 dark:text-kv-400 ml-1">{controlled}</span>
                </span>
              </div>
              <Tabs value={controlled} onChange={setControlled} variant="pills">
                <TabList>
                  <Tab value="metrics">Metrics</Tab>
                  <Tab value="usage">Usage</Tab>
                  <Tab value="logs">Logs</Tab>
                </TabList>
                <TabPanels className="mt-4">
                  <TabPanel value="metrics">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Active tab is controlled from outside via <code className="font-mono
                        text-kv-600 dark:text-kv-400 text-xs">value</code> prop.
                    </p>
                  </TabPanel>
                  <TabPanel value="usage">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Usage panel — controlled externally.
                    </p>
                  </TabPanel>
                  <TabPanel value="logs">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Logs panel — controlled externally.
                    </p>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </div>
          </PreviewCard>

        </div>
      )}

      {/* ── CODE TAB ────────────────────────────────────── */}
      {pageTab === 'code' && (
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
        <PropsTable title="Tabs" data={tabsProps} />
        <PropsTable title="Tab" data={tabProps} />
        <PropsTable title="TabPanel" data={panelProps} />
      </div>

    </div>
  );
}
