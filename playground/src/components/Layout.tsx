import { useState, useEffect } from 'react';
import { Search, Zap, ExternalLink, Sun, Moon } from 'lucide-react';
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
      { label: 'Badge', path: '/components/badge' },
      { label: 'Card', path: '/components/card' },
      { label: 'Accordion', path: '/components/accordion', soon: true },
    ],
  },
  {
    category: 'Feedback',
    items: [
      { label: 'Alert', path: '/components/alert', soon: true },
      { label: 'Toast', path: '/components/toast' },
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

  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

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
    <>
      {/* ── Ambient background blobs ─────────────────────────────────────────── */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-24 w-[560px] h-[560px] rounded-full
          bg-indigo-200/40 dark:bg-indigo-500/15 blur-3xl" />
        <div className="absolute top-1/2 -translate-y-1/2 -left-32 w-[480px] h-[480px]
          rounded-full bg-sky-200/30 dark:bg-sky-500/10 blur-3xl" />
        <div className="absolute -bottom-40 right-1/3 w-[420px] h-[420px] rounded-full
          bg-violet-100/40 dark:bg-violet-500/10 blur-3xl" />
      </div>

      <div className="flex flex-col h-full">
        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <header className="sticky top-0 z-30 shrink-0 flex items-center gap-4 px-6 h-14
          backdrop-blur-xl
          bg-white/70 dark:bg-slate-900/70
          border-b border-slate-200/60 dark:border-white/5
          shadow-sm shadow-slate-100/50 dark:shadow-black/20">

          <Link to="/overview" className="flex items-center gap-2.5 shrink-0">
            <Zap className="h-4 w-4 text-indigo-500" />
            <span className="font-bold text-sm text-slate-900 dark:text-white tracking-tight">
              kayv-glass-ui
            </span>
            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full
              bg-indigo-50 text-indigo-600 border border-indigo-200/60
              dark:bg-indigo-500/20 dark:text-indigo-300 dark:border-indigo-500/30">
              v0.1.0
            </span>
          </Link>

          <div className="flex-1 max-w-xs ml-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5
                text-slate-400 dark:text-slate-500 pointer-events-none" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search components…"
                className="w-full h-8 pl-8 pr-3 text-xs rounded-lg
                  bg-slate-100/60 dark:bg-white/5
                  border border-slate-200/60 dark:border-white/10
                  text-slate-700 dark:text-slate-300
                  placeholder:text-slate-400 dark:placeholder:text-slate-600
                  focus:outline-none focus:border-indigo-300 dark:focus:border-indigo-500/40
                  focus:bg-white/80 dark:focus:bg-white/10
                  transition-colors"
              />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={() => setIsDark(d => !d)}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-1.5 rounded-lg
                text-slate-400 dark:text-slate-500
                hover:text-slate-700 dark:hover:text-slate-300
                hover:bg-slate-100/60 dark:hover:bg-white/5
                transition-colors"
            >
              {isDark
                ? <Sun className="h-4 w-4" />
                : <Moon className="h-4 w-4" />}
            </button>

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="p-1.5 rounded-lg
                text-slate-400 dark:text-slate-500
                hover:text-slate-700 dark:hover:text-slate-300
                hover:bg-slate-100/60 dark:hover:bg-white/5
                transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* ── Sidebar ──────────────────────────────────────────────────────── */}
          <aside className="w-56 shrink-0 overflow-y-auto py-5
            border-r border-slate-200/50 dark:border-white/5
            bg-white/30 dark:bg-slate-950/40 backdrop-blur-sm">
            <nav className="flex flex-col gap-5 px-3">
              {filteredNav.map(section => (
                <div key={section.category}>
                  <p className="px-3 mb-1 text-[10px] font-semibold uppercase
                    tracking-widest text-slate-400 dark:text-slate-600">
                    {section.category}
                  </p>
                  <ul className="flex flex-col gap-px">
                    {section.items.map(item =>
                      item.soon ? (
                        <li key={item.path}>
                          <span className="flex items-center justify-between px-3 py-1.5
                            rounded-lg text-sm
                            text-slate-400 dark:text-slate-700
                            cursor-default select-none">
                            {item.label}
                            <span className="text-[9px] font-semibold uppercase tracking-wider
                              text-slate-400 dark:text-slate-600
                              bg-slate-100 dark:bg-slate-800/80
                              px-1.5 py-0.5 rounded">
                              soon
                            </span>
                          </span>
                        </li>
                      ) : (
                        <li key={item.path}>
                          <NavLink
                            to={item.path}
                            className={({ isActive }) =>
                              `flex items-center px-3 py-1.5 rounded-lg text-sm transition-colors ${
                                isActive
                                  ? 'bg-indigo-50/80 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 font-medium border border-indigo-100 dark:border-indigo-500/20'
                                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/60 dark:hover:bg-white/5'
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

          {/* ── Main content ─────────────────────────────────────────────────── */}
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
