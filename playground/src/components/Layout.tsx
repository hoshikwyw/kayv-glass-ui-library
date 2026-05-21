import { useState } from 'react';
import { Search, Zap, Github } from 'lucide-react';
import { NavLink, Outlet, Link } from 'react-router-dom';

type NavItem = { label: string; path: string; soon?: boolean };
type NavSection = { category: string; items: NavItem[] };

const navigation: NavSection[] = [
  {
    category: 'Actions',
    items: [{ label: 'Button', path: '/components/button' }],
  },
  {
    category: 'Data Display',
    items: [
      { label: 'Badge', path: '/components/badge', soon: true },
      { label: 'Card', path: '/components/card', soon: true },
      { label: 'Accordion', path: '/components/accordion', soon: true },
    ],
  },
  {
    category: 'Feedback',
    items: [
      { label: 'Alert', path: '/components/alert', soon: true },
      { label: 'Toast', path: '/components/toast', soon: true },
    ],
  },
  {
    category: 'Inputs',
    items: [
      { label: 'Input', path: '/components/input', soon: true },
      { label: 'Select', path: '/components/select', soon: true },
    ],
  },
];

export default function Layout() {
  const [search, setSearch] = useState('');

  const filteredNav = search.trim()
    ? navigation
        .map(s => ({
          ...s,
          items: s.items.filter(i =>
            i.label.toLowerCase().includes(search.toLowerCase())
          ),
        }))
        .filter(s => s.items.length > 0)
    : navigation;

  return (
    <div className="flex flex-col h-full">
      {/* ── Header ───────────────────────────────────────── */}
      <header className="sticky top-0 z-30 shrink-0 flex items-center gap-4 px-6 h-14
        backdrop-blur-md bg-slate-900/60 border-b border-white/5">

        <Link to="/overview" className="flex items-center gap-2.5 shrink-0">
          <Zap className="h-4 w-4 text-indigo-400" />
          <span className="font-bold text-sm text-white tracking-tight">kayv-glass-ui</span>
          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full
            bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            v0.1.0
          </span>
        </Link>

        <div className="flex-1 max-w-xs ml-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5
              text-slate-500 pointer-events-none" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search components…"
              className="w-full h-8 pl-8 pr-3 text-xs rounded-lg
                bg-white/5 border border-white/10 text-slate-300
                placeholder:text-slate-600
                focus:outline-none focus:border-indigo-500/40 focus:bg-white/10
                transition-colors"
            />
          </div>
        </div>

        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="ml-auto text-slate-600 hover:text-slate-300 transition-colors"
          aria-label="GitHub"
        >
          <Github className="h-4 w-4" />
        </a>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* ── Sidebar ──────────────────────────────────────── */}
        <aside className="w-56 shrink-0 overflow-y-auto py-5
          border-r border-white/5 bg-slate-950/40">
          <nav className="flex flex-col gap-5 px-3">
            {filteredNav.map(section => (
              <div key={section.category}>
                <p className="px-3 mb-1 text-[10px] font-semibold uppercase
                  tracking-widest text-slate-600">
                  {section.category}
                </p>
                <ul className="flex flex-col gap-px">
                  {section.items.map(item =>
                    item.soon ? (
                      <li key={item.path}>
                        <span className="flex items-center justify-between px-3 py-1.5
                          rounded-md text-sm text-slate-700 cursor-default select-none">
                          {item.label}
                          <span className="text-[9px] font-bold uppercase tracking-wider
                            text-slate-700 bg-slate-800/80 px-1.5 py-0.5 rounded">
                            soon
                          </span>
                        </span>
                      </li>
                    ) : (
                      <li key={item.path}>
                        <NavLink
                          to={item.path}
                          className={({ isActive }) =>
                            `flex items-center px-3 py-1.5 rounded-md text-sm transition-colors ${
                              isActive
                                ? 'bg-indigo-500/15 text-indigo-300 font-medium border border-indigo-500/20'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                            }`
                          }
                        >
                          {item.label}
                        </NavLink>
                      </li>
                    )
                  )}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* ── Main content ─────────────────────────────────── */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
