import type { SelectSize } from './Select.types';

export const triggerBase =
  'w-full flex items-center gap-2 rounded-xl backdrop-blur-sm ' +
  'bg-white/60 dark:bg-slate-800/60 ' +
  'border border-white/50 dark:border-white/10 ' +
  'text-slate-800 dark:text-slate-200 ' +
  'shadow-sm shadow-slate-100/50 dark:shadow-black/10 ' +
  'transition-all duration-150 ' +
  'focus:outline-none focus:ring-2 ' +
  'focus:ring-indigo-300/70 dark:focus:ring-indigo-500/40 ' +
  'focus:border-indigo-300/60 dark:focus:border-indigo-500/40 ' +
  'focus:bg-white/80 dark:focus:bg-slate-800/80 ' +
  'disabled:pointer-events-none disabled:opacity-40 ' +
  'select-none';

export const triggerErrorStyles =
  'border-rose-300/80 dark:border-rose-500/50 ' +
  'focus:ring-rose-300/70 dark:focus:ring-rose-500/40 ' +
  'focus:border-rose-300/70 dark:focus:border-rose-500/40';

export const triggerSizeStyles: Record<SelectSize, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-3.5 text-sm',
  lg: 'h-12 px-4 text-base',
};

export const iconPaddingLeft: Record<SelectSize, string> = {
  sm: 'pl-8',
  md: 'pl-9',
  lg: 'pl-10',
};

// Positioning (top/left/width) is applied via inline style in the portal.
export const dropdownBase =
  'fixed z-[9999] rounded-xl overflow-hidden ' +
  'bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl ' +
  'border border-white/60 dark:border-white/10 ' +
  'shadow-lg shadow-slate-200/50 dark:shadow-black/30 ' +
  'max-h-60 overflow-y-auto ' +
  'transition-[opacity,transform] duration-150 origin-top';

export const optionBase =
  'flex items-center gap-2.5 px-3.5 py-2.5 cursor-pointer ' +
  'text-sm text-slate-700 dark:text-slate-300 ' +
  'transition-colors duration-75';

export const optionFocusedStyles =
  'bg-indigo-50/80 dark:bg-indigo-500/15 text-slate-900 dark:text-white';

export const optionSelectedStyles =
  'font-medium text-indigo-600 dark:text-indigo-300';

export const optionDisabledStyles =
  'opacity-40 cursor-not-allowed';

export const chevronBase =
  'h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500 ' +
  'transition-transform duration-150 ml-auto';

export const labelBase =
  'text-sm font-medium text-slate-700 dark:text-slate-300';

export const hintBase =
  'text-xs text-slate-500 dark:text-slate-400';

export const errorTextBase =
  'text-xs text-rose-600 dark:text-rose-400';
