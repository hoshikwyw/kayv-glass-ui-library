import { useState, useEffect, useRef } from 'react';
import { Search, ExternalLink, Sun, Moon, Palette, Menu, X } from 'lucide-react';
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom';
import { useTheme } from 'kayv-glass-ui';

function AppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="li-bg" x1="5%" y1="0%" x2="95%" y2="100%">
          <stop offset="0%" stopColor="#4F46E5"/>
          <stop offset="100%" stopColor="#7C3AED"/>
        </linearGradient>
        <radialGradient id="li-accent" cx="50%" cy="100%" r="70%">
          <stop offset="0%" stopColor="#818CF8" stopOpacity="0.35"/>
          <stop offset="100%" stopColor="#818CF8" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="li-sheen" cx="22%" cy="16%" r="58%">
          <stop offset="0%" stopColor="white" stopOpacity="0.28"/>
          <stop offset="100%" stopColor="white" stopOpacity="0"/>
        </radialGradient>
        <clipPath id="li-clip">
          <rect width="100" height="100" rx="22"/>
        </clipPath>
      </defs>
      <rect width="100" height="100" rx="22" fill="url(#li-bg)"/>
      <rect width="100" height="100" rx="22" fill="url(#li-accent)"/>
      <g clipPath="url(#li-clip)">
        <rect x="13" y="33" width="68" height="46" rx="10"
              fill="white" fillOpacity="0.06"
              stroke="white" strokeOpacity="0.12" strokeWidth="1"
              transform="rotate(-7 47 56)"/>
        <rect x="19" y="24" width="62" height="46" rx="9"
              fill="white" fillOpacity="0.10"
              stroke="white" strokeOpacity="0.18" strokeWidth="1"
              transform="rotate(5 50 47)"/>
      </g>
      <line x1="31.5" y1="21" x2="31.5" y2="79"
            stroke="white" strokeWidth="12" strokeLinecap="round"/>
      <line x1="31.5" y1="50" x2="71" y2="21"
            stroke="white" strokeWidth="11.5" strokeLinecap="round" strokeOpacity="0.90"/>
      <line x1="31.5" y1="50" x2="71" y2="79"
            stroke="white" strokeWidth="11.5" strokeLinecap="round" strokeOpacity="0.90"/>
      <rect width="100" height="100" rx="22" fill="url(#li-sheen)"/>
      <rect x="1" y="1" width="98" height="98" rx="21"
            fill="none" stroke="white" strokeOpacity="0.22" strokeWidth="1.5"/>
    </svg>
  );
}

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
      { label: 'Accordion', path: '/components/accordion' },
      { label: 'Tabs', path: '/components/tabs' },
    ],
  },
  {
    category: 'Feedback',
    items: [
      { label: 'Alert', path: '/components/alert' },
      { label: 'Toast', path: '/components/toast' },
    ],
  },
  {
    category: 'Inputs',
    items: [
      { label: 'Input', path: '/components/input' },
      { label: 'Select', path: '/components/select' },
      { label: 'File Input', path: '/components/file-input' },
    ],
  },
  {
    category: 'Floating',
    items: [
      { label: 'Tooltip', path: '/components/tooltip' },
    ],
  },
  {
    category: 'Media',
    items: [
      { label: 'Avatar', path: '/components/avatar' },
    ],
  },
  {
    category: 'Overlay',
    items: [
      { label: 'Modal', path: '/components/modal' },
      { label: 'Drawer', path: '/components/drawer' },
    ],
  },
  {
    category: 'Navigation',
    items: [
      { label: 'Navbar', path: '/components/navbar' },
      { label: 'Breadcrumb', path: '/components/breadcrumb' },
      { label: 'Footer', path: '/components/footer' },
    ],
  },
  {
    category: 'Date & Time',
    items: [
      { label: 'Calendar', path: '/components/calendar' },
    ],
  },
];

export default function Layout() {
  const [search, setSearch] = useState('');
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const themePickerRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme, themes } = useTheme();
  const location = useLocation();

  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Close sidebar on route change (mobile nav)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

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

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isSidebarOpen]);

  useEffect(() => {
    if (!showThemePicker) return;
    function handleClick(e: MouseEvent) {
      if (themePickerRef.current && !themePickerRef.current.contains(e.target as Node)) {
        setShowThemePicker(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showThemePicker]);

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

  const sidebarNav = (
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
                          ? 'bg-kv-50/80 dark:bg-kv-500/15 text-kv-600 dark:text-kv-300 font-medium border border-kv-100 dark:border-kv-500/20'
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
  );

  return (
    <>
      {/* ── Ambient background blobs ─────────────────────────────────────────── */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-24 w-[560px] h-[560px] rounded-full
          bg-kv-200/40 dark:bg-kv-500/15 blur-3xl" />
        <div className="absolute top-1/2 -translate-y-1/2 -left-32 w-[480px] h-[480px]
          rounded-full bg-sky-200/30 dark:bg-sky-500/10 blur-3xl" />
        <div className="absolute -bottom-40 right-1/3 w-[420px] h-[420px] rounded-full
          bg-violet-100/40 dark:bg-violet-500/10 blur-3xl" />
      </div>

      <div className="flex flex-col h-full">
        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <header className="sticky top-0 z-30 shrink-0 flex items-center gap-2 sm:gap-4 px-3 sm:px-6 h-14
          backdrop-blur-xl
          bg-white/70 dark:bg-slate-900/70
          border-b border-slate-200/60 dark:border-white/5
          shadow-sm shadow-slate-100/50 dark:shadow-black/20">

          {/* Mobile sidebar toggle */}
          <button
            onClick={() => setIsSidebarOpen(o => !o)}
            aria-label="Toggle sidebar"
            className="lg:hidden p-1.5 rounded-lg
              text-slate-500 dark:text-slate-400
              hover:text-slate-700 dark:hover:text-slate-300
              hover:bg-slate-100/60 dark:hover:bg-white/5
              transition-colors"
          >
            <Menu className="h-4 w-4" />
          </button>

          <Link to="/overview" className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <AppIcon className="h-7 w-7 rounded-lg" />
            <span className="font-bold text-sm text-slate-900 dark:text-white tracking-tight">
              kayv
              <span className="font-normal text-slate-400 dark:text-slate-500">-glass-ui</span>
            </span>
            <span className="hidden sm:inline-flex text-[10px] font-semibold px-1.5 py-0.5 rounded-full
              bg-kv-50 text-kv-600 border border-kv-200/60
              dark:bg-kv-500/20 dark:text-kv-300 dark:border-kv-500/30">
              v0.1.1
            </span>
          </Link>

          {/* Desktop search */}
          <div className="hidden sm:block flex-1 max-w-xs ml-2">
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
                  focus:outline-none focus:border-kv-300 dark:focus:border-kv-500/40
                  focus:bg-white/80 dark:focus:bg-white/10
                  transition-colors"
              />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-1">
            {/* Theme picker */}
            <div className="relative" ref={themePickerRef}>
              <button
                onClick={() => setShowThemePicker(v => !v)}
                aria-label="Change theme"
                className="p-1.5 rounded-lg
                  text-slate-400 dark:text-slate-500
                  hover:text-slate-700 dark:hover:text-slate-300
                  hover:bg-slate-100/60 dark:hover:bg-white/5
                  transition-colors"
              >
                <Palette className="h-4 w-4" />
              </button>

              {showThemePicker && (
                <div className="absolute right-0 top-full mt-2 z-50
                  p-3 rounded-2xl w-52
                  bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl
                  border border-white/60 dark:border-white/10
                  shadow-xl shadow-slate-200/60 dark:shadow-black/40">
                  <p className="text-[10px] font-semibold uppercase tracking-widest
                    text-slate-400 dark:text-slate-500 mb-2 px-0.5">
                    Theme
                  </p>
                  <div className="grid grid-cols-3 gap-1.5">
                    {themes.map(t => (
                      <button
                        key={t.name}
                        onClick={() => { setTheme(t.name); setShowThemePicker(false); }}
                        className={`flex flex-col items-center gap-1.5 p-2 rounded-xl
                          text-[10px] font-medium transition-colors
                          ${theme === t.name
                            ? 'bg-slate-100/80 dark:bg-white/10 text-slate-900 dark:text-white'
                            : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'
                          }`}
                      >
                        <span
                          className={`h-6 w-6 rounded-full shadow-sm transition-transform
                            ${theme === t.name ? 'scale-110 ring-2 ring-offset-2 ring-offset-white dark:ring-offset-slate-800' : ''}`}
                          style={{ backgroundColor: t.primary }}
                        />
                        {t.label}
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-100 dark:border-white/8">
                    <Link
                      to="/theming"
                      onClick={() => setShowThemePicker(false)}
                      className="flex items-center justify-center gap-1.5 py-1.5 text-[10px]
                        font-semibold uppercase tracking-widest
                        text-kv-600 dark:text-kv-400 hover:text-kv-700 dark:hover:text-kv-300
                        transition-colors"
                    >
                      View theming docs
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Dark mode toggle */}
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
              href="https://github.com/hoshikwyw/kayv-glass-ui-library"
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

          {/* ── Mobile backdrop ───────────────────────────────────────────────── */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 z-30 bg-black/30 backdrop-blur-[2px] lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
              aria-hidden="true"
            />
          )}

          {/* ── Sidebar ──────────────────────────────────────────────────────── */}
          <aside
            className={`
              shrink-0 overflow-y-auto
              border-r border-slate-200/50 dark:border-white/5
              backdrop-blur-sm transition-transform duration-200 ease-out
              fixed inset-y-0 left-0 z-40 w-64 pt-14
              bg-white/95 dark:bg-slate-950/95
              lg:relative lg:z-auto lg:w-56 lg:pt-0
              lg:bg-white/30 lg:dark:bg-slate-950/40
              ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}
          >
            {/* Mobile sidebar header */}
            <div className="flex items-center justify-between px-4 py-3 border-b
              border-slate-200/60 dark:border-white/8 lg:hidden">
              <div className="relative flex-1 mr-3">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5
                  text-slate-400 dark:text-slate-500 pointer-events-none" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search…"
                  className="w-full h-8 pl-8 pr-3 text-xs rounded-lg
                    bg-slate-100/60 dark:bg-white/5
                    border border-slate-200/60 dark:border-white/10
                    text-slate-700 dark:text-slate-300
                    placeholder:text-slate-400 dark:placeholder:text-slate-600
                    focus:outline-none focus:border-kv-300 dark:focus:border-kv-500/40
                    transition-colors"
                />
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                aria-label="Close sidebar"
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700
                  dark:hover:text-slate-300 hover:bg-slate-100/60 dark:hover:bg-white/5
                  transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="py-5">
              {sidebarNav}
            </div>
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
