import type { TabsVariant } from './Tabs.types';

// ── TabList containers ─────────────────────────────────────────────────────────

export const listVariantStyles: Record<TabsVariant, string> = {
  pills:
    'inline-flex items-center gap-1 p-1 rounded-xl ' +
    'bg-slate-100/60 dark:bg-slate-800/60 ' +
    'border border-slate-200/40 dark:border-white/5 ' +
    'backdrop-blur-sm',
  underline:
    'flex items-center border-b border-slate-200/60 dark:border-white/10',
  line:
    'flex items-center border-b border-slate-200/60 dark:border-white/10',
};

// ── Tab buttons — shared base ──────────────────────────────────────────────────

export const tabBase =
  'inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-medium ' +
  'transition-colors duration-150 ' +
  'focus-visible:outline-none focus-visible:ring-2 ' +
  'focus-visible:ring-kv-300 dark:focus-visible:ring-kv-500/40 ' +
  'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none';

// ── Tab buttons — active state per variant ────────────────────────────────────

export const tabActiveStyles: Record<TabsVariant, string> = {
  pills:
    'px-4 py-1.5 rounded-lg ' +
    'bg-white dark:bg-slate-700 text-slate-800 dark:text-white ' +
    'shadow-sm shadow-slate-200/50 dark:shadow-black/30',
  underline:
    'px-4 py-2.5 -mb-px ' +
    'border-b-2 border-kv-500 dark:border-kv-400 ' +
    'text-kv-600 dark:text-kv-400',
  line:
    'px-4 py-2.5 -mb-px rounded-t-lg ' +
    'border-b-2 border-kv-500 dark:border-kv-400 ' +
    'text-kv-600 dark:text-kv-300 ' +
    'bg-kv-50/70 dark:bg-kv-500/10',
};

// ── Tab buttons — inactive state per variant ──────────────────────────────────

export const tabInactiveStyles: Record<TabsVariant, string> = {
  pills:
    'px-4 py-1.5 rounded-lg ' +
    'text-slate-500 dark:text-slate-400 ' +
    'hover:text-slate-700 dark:hover:text-slate-200',
  underline:
    'px-4 py-2.5 -mb-px ' +
    'border-b-2 border-transparent ' +
    'text-slate-500 dark:text-slate-400 ' +
    'hover:text-slate-700 dark:hover:text-slate-200 ' +
    'hover:border-slate-300 dark:hover:border-white/20',
  line:
    'px-4 py-2.5 -mb-px rounded-t-lg ' +
    'border-b-2 border-transparent ' +
    'text-slate-500 dark:text-slate-400 ' +
    'hover:text-slate-700 dark:hover:text-slate-200',
};

// ── TabPanel ───────────────────────────────────────────────────────────────────

export const panelBase = 'focus-visible:outline-none';
