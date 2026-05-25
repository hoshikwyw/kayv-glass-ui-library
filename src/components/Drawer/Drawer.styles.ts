import type { DrawerPlacement, DrawerSize } from './Drawer.types';

export const backdropBase =
  'fixed inset-0 z-[9998] ' +
  'bg-slate-900/40 dark:bg-slate-900/60 backdrop-blur-sm ' +
  'transition-opacity duration-300';

export const panelBase =
  'fixed z-[9999] flex flex-col overflow-hidden ' +
  'bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl ' +
  'shadow-2xl shadow-slate-300/30 dark:shadow-black/50 ' +
  'transition-transform duration-300 ease-in-out';

export const placementStyles: Record<
  DrawerPlacement,
  { position: string; border: string; hiddenTranslate: string }
> = {
  left: {
    position: 'inset-y-0 left-0 h-full',
    border:   'border-r border-slate-200/60 dark:border-white/10',
    hiddenTranslate: '-translate-x-full',
  },
  right: {
    position: 'inset-y-0 right-0 h-full',
    border:   'border-l border-slate-200/60 dark:border-white/10',
    hiddenTranslate: 'translate-x-full',
  },
  top: {
    position: 'inset-x-0 top-0 w-full',
    border:   'border-b border-slate-200/60 dark:border-white/10',
    hiddenTranslate: '-translate-y-full',
  },
  bottom: {
    position: 'inset-x-0 bottom-0 w-full',
    border:   'border-t border-slate-200/60 dark:border-white/10',
    hiddenTranslate: 'translate-y-full',
  },
};

export const widthStyles: Record<DrawerSize, string> = {
  sm:   'w-72',
  md:   'w-80',
  lg:   'w-96',
  xl:   'w-[28rem]',
  full: 'w-full',
};

export const heightStyles: Record<DrawerSize, string> = {
  sm:   'h-56',
  md:   'h-72',
  lg:   'h-96',
  xl:   'h-[28rem]',
  full: 'h-full',
};

export const headerBase =
  'flex items-center justify-between gap-4 px-6 py-4 shrink-0 ' +
  'border-b border-slate-200/60 dark:border-white/8';

export const titleBase =
  'text-base font-semibold text-slate-900 dark:text-white leading-snug';

export const closeButtonBase =
  'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg p-1.5 ' +
  'text-slate-400 dark:text-slate-500 ' +
  'hover:text-slate-700 dark:hover:text-slate-300 ' +
  'hover:bg-slate-100/80 dark:hover:bg-white/8 ' +
  'transition-colors focus:outline-none focus:ring-2 ' +
  'focus:ring-kv-300/70 dark:focus:ring-kv-500/40';

export const bodyBase =
  'px-6 py-5 flex-1 overflow-y-auto ' +
  'text-sm text-slate-600 dark:text-slate-300 leading-relaxed';

export const footerBase =
  'flex items-center justify-end gap-3 px-6 py-4 shrink-0 ' +
  'border-t border-slate-200/60 dark:border-white/8';
