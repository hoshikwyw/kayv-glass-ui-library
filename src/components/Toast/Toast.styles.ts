import type { ToastPosition, ToastVariant } from './Toast.types';

export const positionStyles: Record<ToastPosition, string> = {
  'top-right':     'top-4 right-4',
  'top-left':      'top-4 left-4',
  'bottom-right':  'bottom-4 right-4',
  'bottom-left':   'bottom-4 left-4',
  'top-center':    'top-4 left-1/2 -translate-x-1/2',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
};

export const variantStyles: Record<ToastVariant, string> = {
  default:
    'bg-white/85 dark:bg-slate-800/85 ' +
    'border-slate-200/60 dark:border-white/10 ' +
    'shadow-slate-200/50 dark:shadow-black/30',
  success:
    'bg-emerald-50/90 dark:bg-emerald-950/70 ' +
    'border-emerald-200/60 dark:border-emerald-500/25 ' +
    'shadow-emerald-100/50 dark:shadow-black/30',
  warning:
    'bg-amber-50/90 dark:bg-amber-950/60 ' +
    'border-amber-200/60 dark:border-amber-500/25 ' +
    'shadow-amber-100/50 dark:shadow-black/30',
  danger:
    'bg-rose-50/90 dark:bg-rose-950/60 ' +
    'border-rose-200/60 dark:border-rose-500/25 ' +
    'shadow-rose-100/50 dark:shadow-black/30',
  info:
    'bg-blue-50/90 dark:bg-blue-950/60 ' +
    'border-blue-200/60 dark:border-blue-500/25 ' +
    'shadow-blue-100/50 dark:shadow-black/30',
};

export const iconColorStyles: Record<ToastVariant, string> = {
  default: 'text-slate-400 dark:text-slate-500',
  success: 'text-emerald-500 dark:text-emerald-400',
  warning: 'text-amber-500 dark:text-amber-400',
  danger:  'text-rose-500 dark:text-rose-400',
  info:    'text-blue-500 dark:text-blue-400',
};

export const titleColorStyles: Record<ToastVariant, string> = {
  default: 'text-slate-800 dark:text-slate-200',
  success: 'text-emerald-900 dark:text-emerald-100',
  warning: 'text-amber-900 dark:text-amber-100',
  danger:  'text-rose-900 dark:text-rose-100',
  info:    'text-blue-900 dark:text-blue-100',
};

export const descColorStyles: Record<ToastVariant, string> = {
  default: 'text-slate-500 dark:text-slate-400',
  success: 'text-emerald-700 dark:text-emerald-300/80',
  warning: 'text-amber-700 dark:text-amber-300/80',
  danger:  'text-rose-700 dark:text-rose-300/80',
  info:    'text-blue-700 dark:text-blue-300/80',
};
