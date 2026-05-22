import type { AvatarSize, AvatarStatus, AvatarVariant } from './Avatar.types';

export const avatarBase =
  'relative inline-flex items-center justify-center shrink-0 select-none ' +
  'font-medium ' +
  'bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm ' +
  'border border-white/50 dark:border-white/10 ' +
  'shadow-sm shadow-slate-100/50 dark:shadow-black/20';

// Clips image/initials to shape without clipping the status dot
export const avatarInner = 'absolute inset-0 flex items-center justify-center overflow-hidden rounded-[inherit]';

export const avatarSizeStyles: Record<AvatarSize, string> = {
  xs: 'h-6 w-6 text-[10px]',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
};

export const avatarVariantStyles: Record<AvatarVariant, string> = {
  circle: 'rounded-full',
  rounded: 'rounded-xl',
};

export const imageBase = 'h-full w-full object-cover';

export const fallbackColorStyles = 'text-slate-600 dark:text-slate-300';

export const statusBase =
  'absolute bottom-0 right-0 rounded-full ' +
  'border-2 border-white dark:border-slate-900';

export const statusSizeStyles: Record<AvatarSize, string> = {
  xs: 'h-1.5 w-1.5',
  sm: 'h-2 w-2',
  md: 'h-2.5 w-2.5',
  lg: 'h-3 w-3',
  xl: 'h-3.5 w-3.5',
};

export const statusColorStyles: Record<AvatarStatus, string> = {
  online: 'bg-emerald-500',
  offline: 'bg-slate-400 dark:bg-slate-500',
  busy: 'bg-rose-500',
  away: 'bg-amber-400',
};

// Size-proportional overlap for AvatarGroup
export const groupOverlapStyles: Record<AvatarSize, string> = {
  xs: '-ml-1',
  sm: '-ml-1.5',
  md: '-ml-2',
  lg: '-ml-2.5',
  xl: '-ml-3',
};

export const overflowBadgeBase =
  'relative inline-flex items-center justify-center shrink-0 select-none ' +
  'rounded-full font-semibold ' +
  'bg-slate-100 dark:bg-slate-700/80 ' +
  'border border-slate-200/80 dark:border-slate-600/50 ' +
  'text-slate-500 dark:text-slate-300 ' +
  'ring-2 ring-white dark:ring-slate-900';
