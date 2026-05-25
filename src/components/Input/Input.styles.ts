import type { InputSize } from './Input.types';

export const inputBase =
  'w-full rounded-xl backdrop-blur-sm ' +
  'bg-white/60 dark:bg-slate-800/60 ' +
  'border border-white/50 dark:border-white/10 ' +
  'text-slate-800 dark:text-slate-200 ' +
  'placeholder:text-slate-400 dark:placeholder:text-slate-500 ' +
  'shadow-sm shadow-slate-100/50 dark:shadow-black/10 ' +
  'transition-all duration-150 ' +
  'focus:outline-none focus:ring-2 ' +
  'focus:ring-kv-300/70 dark:focus:ring-kv-500/40 ' +
  'focus:border-kv-300/60 dark:focus:border-kv-500/40 ' +
  'focus:bg-white/80 dark:focus:bg-slate-800/80 ' +
  'read-only:bg-slate-50/60 dark:read-only:bg-slate-800/30 ' +
  'disabled:pointer-events-none disabled:opacity-40 ' +
  'select-text';

export const errorStyles =
  'border-rose-300/80 dark:border-rose-500/50 ' +
  'focus:ring-rose-300/70 dark:focus:ring-rose-500/40 ' +
  'focus:border-rose-300/70 dark:focus:border-rose-500/40';

export const sizeStyles: Record<InputSize, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-3.5 text-sm',
  lg: 'h-12 px-4 text-base',
};

export const iconPaddingLeft: Record<InputSize, string> = {
  sm: 'pl-8',
  md: 'pl-9',
  lg: 'pl-10',
};

export const iconPaddingRight: Record<InputSize, string> = {
  sm: 'pr-8',
  md: 'pr-9',
  lg: 'pr-10',
};

export const labelBase =
  'text-sm font-medium text-slate-700 dark:text-slate-300';

export const hintBase =
  'text-xs text-slate-500 dark:text-slate-400';

export const errorTextBase =
  'text-xs text-rose-600 dark:text-rose-400';
