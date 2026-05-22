import type { ModalSize } from './Modal.types';

export const backdropBase =
  'fixed inset-0 z-[9999] flex items-center justify-center p-4 ' +
  'bg-slate-900/40 dark:bg-slate-900/60 backdrop-blur-sm';

export const panelBase =
  'relative w-full rounded-2xl origin-center ' +
  'bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl ' +
  'border border-white/60 dark:border-white/10 ' +
  'shadow-2xl shadow-slate-300/30 dark:shadow-black/50 ' +
  'flex flex-col max-h-[calc(100dvh-2rem)]';

export const panelSizeStyles: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
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
  'focus:ring-indigo-300/70 dark:focus:ring-indigo-500/40';

export const bodyBase =
  'px-6 py-5 flex-1 overflow-y-auto ' +
  'text-sm text-slate-600 dark:text-slate-300 leading-relaxed';

export const footerBase =
  'flex items-center justify-end gap-3 px-6 py-4 shrink-0 ' +
  'border-t border-slate-200/60 dark:border-white/8';
