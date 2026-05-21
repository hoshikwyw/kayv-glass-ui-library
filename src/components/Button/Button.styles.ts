import type { ButtonSize, ButtonVariant } from './Button.types';

export const buttonBase =
  'relative inline-flex items-center justify-center overflow-hidden ' +
  'font-medium rounded-xl backdrop-blur-sm ' +
  'transition-all duration-200 active:scale-[0.98] ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ' +
  'disabled:pointer-events-none disabled:opacity-40 select-none';

export const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-white/60 text-slate-800 ' +
    'border border-white/50 ' +
    'hover:bg-white/80 active:bg-white/90 ' +
    'shadow-sm shadow-slate-200 ' +
    'focus-visible:ring-slate-300 focus-visible:ring-offset-slate-50',
  secondary:
    'bg-blue-500/10 text-blue-600 ' +
    'border border-blue-200/60 ' +
    'hover:bg-blue-500/15 active:bg-blue-500/25 ' +
    'focus-visible:ring-blue-300 focus-visible:ring-offset-slate-50',
  ghost:
    'bg-transparent text-slate-600 ' +
    'border border-transparent ' +
    'hover:bg-slate-100/70 active:bg-slate-200/60 ' +
    'focus-visible:ring-slate-300 focus-visible:ring-offset-slate-50',
};

export const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2.5',
};

export const spinnerSizeStyles: Record<ButtonSize, string> = {
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
};
