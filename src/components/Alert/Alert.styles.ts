import type { AlertVariant } from './Alert.types';

export const alertBase =
  'relative flex gap-3 rounded-2xl p-4 backdrop-blur-sm border';

export const variantStyles: Record<AlertVariant, string> = {
  default:
    'bg-slate-50/80 dark:bg-slate-800/60 ' +
    'border-slate-200/60 dark:border-white/10',
  success:
    'bg-emerald-50/80 dark:bg-emerald-950/50 ' +
    'border-emerald-200/60 dark:border-emerald-500/25',
  warning:
    'bg-amber-50/80 dark:bg-amber-950/50 ' +
    'border-amber-200/60 dark:border-amber-500/25',
  danger:
    'bg-rose-50/80 dark:bg-rose-950/50 ' +
    'border-rose-200/60 dark:border-rose-500/25',
  info:
    'bg-blue-50/80 dark:bg-blue-950/50 ' +
    'border-blue-200/60 dark:border-blue-500/25',
};

export const iconColorStyles: Record<AlertVariant, string> = {
  default: 'text-slate-400 dark:text-slate-500',
  success: 'text-emerald-500 dark:text-emerald-400',
  warning: 'text-amber-500 dark:text-amber-400',
  danger:  'text-rose-500 dark:text-rose-400',
  info:    'text-blue-500 dark:text-blue-400',
};

export const titleColorStyles: Record<AlertVariant, string> = {
  default: 'text-slate-800 dark:text-slate-200',
  success: 'text-emerald-900 dark:text-emerald-100',
  warning: 'text-amber-900 dark:text-amber-100',
  danger:  'text-rose-900 dark:text-rose-100',
  info:    'text-blue-900 dark:text-blue-100',
};

export const descColorStyles: Record<AlertVariant, string> = {
  default: 'text-slate-600 dark:text-slate-400',
  success: 'text-emerald-700 dark:text-emerald-300/80',
  warning: 'text-amber-700 dark:text-amber-300/80',
  danger:  'text-rose-700 dark:text-rose-300/80',
  info:    'text-blue-700 dark:text-blue-300/80',
};

export const dismissColorStyles: Record<AlertVariant, string> = {
  default: 'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300',
  success: 'text-emerald-400 hover:text-emerald-600 dark:text-emerald-500 dark:hover:text-emerald-300',
  warning: 'text-amber-400 hover:text-amber-600 dark:text-amber-500 dark:hover:text-amber-300',
  danger:  'text-rose-400 hover:text-rose-600 dark:text-rose-500 dark:hover:text-rose-300',
  info:    'text-blue-400 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-300',
};
