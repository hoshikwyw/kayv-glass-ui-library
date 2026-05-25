import type { ProgressSize, ProgressVariant } from './Progress.types';

export const trackBase =
  'relative w-full rounded-full overflow-hidden ' +
  'bg-slate-200/60 dark:bg-white/8 ' +
  'border border-slate-200/40 dark:border-white/5';

export const trackSizeStyles: Record<ProgressSize, string> = {
  xs: 'h-1',
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
};

export const fillBase =
  'h-full rounded-full ' +
  'transition-[width] duration-500 ease-in-out ' +
  'relative overflow-hidden';

export const fillVariantStyles: Record<ProgressVariant, string> = {
  primary: 'bg-gradient-to-r from-kv-400 to-kv-600',
  success: 'bg-gradient-to-r from-emerald-400 to-emerald-500',
  warning: 'bg-gradient-to-r from-amber-400 to-amber-500',
  danger:  'bg-gradient-to-r from-rose-400 to-rose-500',
};

export const labelBase =
  'flex items-center justify-between mb-1.5 ' +
  'text-xs font-medium text-slate-600 dark:text-slate-400';

export const valueBase =
  'tabular-nums text-slate-400 dark:text-slate-500';
