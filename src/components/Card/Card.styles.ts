import type { CardVariant, CardPadding, CardImageAspect } from './Card.types';

export const cardBase =
  'rounded-2xl backdrop-blur-sm';

export const variantStyles: Record<CardVariant, string> = {
  default:
    'bg-white/40 dark:bg-slate-800/40 ' +
    'border border-white/60 dark:border-white/10 ' +
    'shadow-sm shadow-slate-200/50 dark:shadow-black/20',
  elevated:
    'bg-white/65 dark:bg-slate-800/65 ' +
    'border border-white/70 dark:border-white/15 ' +
    'shadow-xl shadow-slate-200/60 dark:shadow-black/40',
  bordered:
    'bg-white/20 dark:bg-slate-800/20 ' +
    'border-2 border-white/50 dark:border-white/10',
  ghost:
    'bg-transparent ' +
    'border border-white/30 dark:border-white/5',
};

export const paddingStyles: Record<CardPadding, string> = {
  none: '',
  sm:   'p-4',
  md:   'p-6',
  lg:   'p-8',
};

export const imageAspectStyles: Record<CardImageAspect, string> = {
  video:  'aspect-video',
  square: 'aspect-square',
  wide:   'aspect-[21/9]',
};

export const imageBase = 'relative w-full overflow-hidden rounded-t-2xl';
export const imageOverlayBase = 'absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent';
