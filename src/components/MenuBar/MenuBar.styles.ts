// ── Sidebar panel ─────────────────────────────────────────────────────────────

export const sidebarBase =
  'hidden lg:flex flex-col ' +
  'bg-white/80 dark:bg-slate-950/80 ' +
  'backdrop-blur-xl ' +
  'border-r border-slate-200/60 dark:border-slate-800/60 ' +
  'shadow-sm shadow-slate-200/40 dark:shadow-black/30';

// ── Sidebar brand slot ────────────────────────────────────────────────────────

export const brandBase =
  'flex items-center gap-3 px-5 h-16 shrink-0 ' +
  'border-b border-slate-200/60 dark:border-slate-800/60';

// ── Sidebar scrollable nav area ───────────────────────────────────────────────

export const sidebarScroll =
  'flex-1 overflow-y-auto overflow-x-hidden py-3 px-3 flex flex-col gap-0.5';

// ── Sidebar nav item ──────────────────────────────────────────────────────────

export const sidebarItemBase =
  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ' +
  'transition-all duration-150 cursor-pointer select-none ' +
  'text-slate-600 dark:text-slate-400 ' +
  'hover:text-slate-800 dark:hover:text-white ' +
  'hover:bg-slate-100/80 dark:hover:bg-white/5 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kv-300 dark:focus-visible:ring-kv-500/40';

export const sidebarItemActive =
  'bg-kv-50/80 dark:bg-kv-600/15 ' +
  'text-kv-700 dark:text-kv-300 ' +
  'border border-kv-200/60 dark:border-kv-500/20 ' +
  'shadow-sm shadow-kv-100/50 dark:shadow-kv-500/5';

export const sidebarItemDisabled =
  'opacity-40 cursor-not-allowed pointer-events-none';

export const sidebarItemIcon =
  'h-[18px] w-[18px] shrink-0';

// ── Sidebar section ───────────────────────────────────────────────────────────

export const sidebarSectionLabel =
  'px-3 pt-4 pb-1.5 text-[10px] font-semibold uppercase tracking-widest ' +
  'text-slate-400 dark:text-slate-600 select-none';

// ── Sidebar divider ───────────────────────────────────────────────────────────

export const sidebarDivider =
  'my-2 mx-3 h-px bg-slate-200/60 dark:bg-slate-700/60';

// ── Bottom navigation bar ─────────────────────────────────────────────────────

export const bottomNavBase =
  'lg:hidden flex items-stretch ' +
  'bg-white/95 dark:bg-slate-950/95 ' +
  'backdrop-blur-xl ' +
  'border-t border-slate-200/60 dark:border-slate-800/60 ' +
  'shadow-[0_-4px_24px_-6px_rgba(0,0,0,0.10)] dark:shadow-[0_-4px_24px_-6px_rgba(0,0,0,0.45)]';

// ── Bottom nav item ───────────────────────────────────────────────────────────

export const bottomNavItemBase =
  'flex-1 flex flex-col items-center justify-center gap-0.5 px-1 py-1 ' +
  'transition-colors duration-150 cursor-pointer select-none ' +
  'text-slate-400 dark:text-slate-500 ' +
  'focus-visible:outline-none';

export const bottomNavItemActive =
  'text-kv-600 dark:text-kv-400';

// Pill/bubble behind the icon when active
export const bottomNavIconWrap =
  'flex items-center justify-center h-8 w-12 rounded-full transition-all duration-200';

export const bottomNavIconWrapActive =
  'bg-kv-100 dark:bg-kv-500/25';

export const bottomNavLabel =
  'text-[10px] font-medium leading-none';
