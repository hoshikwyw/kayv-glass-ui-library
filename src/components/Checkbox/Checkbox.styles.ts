import type { CheckboxSize } from './Checkbox.types';

export const wrapperBase =
  'inline-flex items-start gap-2.5 cursor-pointer select-none';

export const wrapperDisabledStyles = 'cursor-not-allowed opacity-50';

// ── Visual box ─────────────────────────────────────────────────────────────────

export const boxBase =
  'flex items-center justify-center flex-shrink-0 rounded ' +
  'border transition-all duration-150 ' +
  'ring-offset-white dark:ring-offset-slate-900';

export const boxSizeStyles: Record<CheckboxSize, string> = {
  sm: 'h-3.5 w-3.5 rounded',
  md: 'h-4 w-4 rounded',
  lg: 'h-5 w-5 rounded-md',
};

export const boxUncheckedStyles =
  'border-slate-300/80 dark:border-white/20 ' +
  'bg-white/60 dark:bg-white/5 backdrop-blur-sm ' +
  'shadow-sm shadow-slate-100/40 dark:shadow-black/10';

export const boxUncheckedHoverStyles =
  'group-hover:border-kv-400 dark:group-hover:border-kv-400/70 ' +
  'group-hover:bg-kv-50/60 dark:group-hover:bg-kv-500/5';

export const boxCheckedStyles =
  'border-kv-500 bg-gradient-to-br from-kv-400 to-kv-600 ' +
  'shadow-sm shadow-kv-500/30 dark:shadow-kv-500/20 ' +
  'group-hover:from-kv-500 group-hover:to-kv-700';

export const focusRingStyles =
  'peer-focus-visible:ring-2 ' +
  'peer-focus-visible:ring-kv-300 dark:peer-focus-visible:ring-kv-500/40 ' +
  'peer-focus-visible:ring-offset-2';

// ── Icon sizes ─────────────────────────────────────────────────────────────────

export const iconSizeStyles: Record<CheckboxSize, string> = {
  sm: 'h-2 w-2',
  md: 'h-2.5 w-2.5',
  lg: 'h-3 w-3',
};

// ── Label text ─────────────────────────────────────────────────────────────────

export const labelTextStyles: Record<CheckboxSize, string> = {
  sm: 'text-xs font-medium text-slate-700 dark:text-slate-300 leading-snug',
  md: 'text-sm font-medium text-slate-700 dark:text-slate-300 leading-snug',
  lg: 'text-base font-medium text-slate-700 dark:text-slate-300 leading-snug',
};

export const descriptionBase =
  'text-xs text-slate-400 dark:text-slate-500 mt-0.5 leading-snug';

// Small top offset to align checkbox with the first line of text
export const boxTopOffsetStyles: Record<CheckboxSize, string> = {
  sm: 'mt-0',
  md: 'mt-px',
  lg: 'mt-0.5',
};
