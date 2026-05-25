import type { BadgeVariant, BadgeSize } from './Badge.types';

export const badgeBase =
  'inline-flex items-center font-medium rounded-full backdrop-blur-sm ' +
  'border select-none whitespace-nowrap';

export const variantStyles: Record<BadgeVariant, string> = {
  default:
    'bg-slate-100/70 dark:bg-slate-700/60 ' +
    'text-slate-600 dark:text-slate-300 ' +
    'border-slate-200/60 dark:border-slate-600/40',
  primary:
    'bg-kv-50 dark:bg-kv-500/15 ' +
    'text-kv-600 dark:text-kv-300 ' +
    'border-kv-200/60 dark:border-kv-500/25',
  success:
    'bg-emerald-50 dark:bg-emerald-500/15 ' +
    'text-emerald-600 dark:text-emerald-300 ' +
    'border-emerald-200/60 dark:border-emerald-500/25',
  warning:
    'bg-amber-50 dark:bg-amber-500/15 ' +
    'text-amber-600 dark:text-amber-300 ' +
    'border-amber-200/60 dark:border-amber-500/25',
  danger:
    'bg-rose-50 dark:bg-rose-500/15 ' +
    'text-rose-600 dark:text-rose-300 ' +
    'border-rose-200/60 dark:border-rose-500/25',
  info:
    'bg-blue-50 dark:bg-blue-500/15 ' +
    'text-blue-600 dark:text-blue-300 ' +
    'border-blue-200/60 dark:border-blue-500/25',
};

export const sizeStyles: Record<BadgeSize, string> = {
  sm: 'text-[10px] px-2 py-0.5 gap-1',
  md: 'text-xs px-2.5 py-1 gap-1.5',
  lg: 'text-sm px-3 py-1.5 gap-2',
};

export const dotColorStyles: Record<BadgeVariant, string> = {
  default: 'bg-slate-400 dark:bg-slate-400',
  primary: 'bg-kv-500 dark:bg-kv-400',
  success: 'bg-emerald-500 dark:bg-emerald-400',
  warning: 'bg-amber-500 dark:bg-amber-400',
  danger: 'bg-rose-500 dark:bg-rose-400',
  info: 'bg-blue-500 dark:bg-blue-400',
};

export const dotSizeStyles: Record<BadgeSize, string> = {
  sm: 'h-1.5 w-1.5',
  md: 'h-2 w-2',
  lg: 'h-2.5 w-2.5',
};
