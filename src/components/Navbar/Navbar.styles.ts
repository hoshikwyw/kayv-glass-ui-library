import type { NavbarPosition, NavbarJustify } from './Navbar.types';

export const navbarBase =
  'flex items-center gap-4 px-6 h-16 w-full ' +
  'backdrop-blur-xl ' +
  'bg-white/70 dark:bg-slate-900/70 ' +
  'border-b border-slate-200/60 dark:border-white/8 ' +
  'shadow-sm shadow-slate-100/50 dark:shadow-black/20';

export const positionStyles: Record<NavbarPosition, string> = {
  sticky: 'sticky top-0 z-30',
  fixed:  'fixed top-0 left-0 right-0 z-30',
  static: 'relative',
};

export const brandBase = 'flex items-center gap-2.5 shrink-0';

export const contentBase = 'flex items-center gap-1';

export const justifyStyles: Record<NavbarJustify, string> = {
  start:  'flex-1 justify-start',
  center: 'flex-1 justify-center',
  end:    'shrink-0 justify-end',
};

export const itemBase =
  'relative inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium ' +
  'border transition-colors duration-150 ' +
  'focus-visible:outline-none focus-visible:ring-2 ' +
  'focus-visible:ring-kv-300 dark:focus-visible:ring-kv-500/40 ' +
  'focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900';

export const itemActiveStyles =
  'bg-kv-50/80 dark:bg-kv-500/15 ' +
  'text-kv-600 dark:text-kv-300 ' +
  'border-kv-100 dark:border-kv-500/20';

export const itemInactiveStyles =
  'border-transparent ' +
  'text-slate-600 dark:text-slate-400 ' +
  'hover:text-slate-900 dark:hover:text-slate-200 ' +
  'hover:bg-white/60 dark:hover:bg-white/5';

// ── Mobile menu ───────────────────────────────────────────────────────────────

export const menuBase =
  'w-full grid transition-[grid-template-rows] duration-200 ease-out ' +
  'bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl ' +
  'border-b border-slate-200/60 dark:border-white/8';

export const menuInner = 'px-4 py-3 flex flex-col gap-1';

// ── Hamburger toggle ──────────────────────────────────────────────────────────

export const toggleBase =
  'relative h-8 w-8 flex flex-col items-center justify-center gap-[5px] ' +
  'rounded-lg transition-colors duration-150 ' +
  'text-slate-600 dark:text-slate-400 ' +
  'hover:bg-slate-100/70 dark:hover:bg-white/5 ' +
  'focus-visible:outline-none focus-visible:ring-2 ' +
  'focus-visible:ring-kv-300 dark:focus-visible:ring-kv-500/40';

export const toggleBarBase =
  'h-0.5 w-4 rounded-full bg-current transition-all duration-200 origin-center';
