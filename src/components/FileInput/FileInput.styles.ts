import type { FileInputSize } from './FileInput.types';

export const labelBase = 'text-sm font-medium text-slate-700 dark:text-slate-300';

export const dropzoneBase =
  'relative flex flex-col items-center justify-center gap-2.5 rounded-2xl ' +
  'border-2 border-dashed ' +
  'border-slate-200/90 dark:border-slate-600/60 ' +
  'bg-white/40 dark:bg-slate-800/30 backdrop-blur-sm ' +
  'text-center cursor-pointer select-none ' +
  'transition-all duration-150 ' +
  'hover:border-indigo-300/80 dark:hover:border-indigo-500/50 ' +
  'hover:bg-indigo-50/30 dark:hover:bg-indigo-500/5 ' +
  'focus-visible:outline-none focus-visible:ring-2 ' +
  'focus-visible:ring-indigo-300/70 dark:focus-visible:ring-indigo-500/40 ' +
  'focus-visible:border-indigo-300/60 dark:focus-visible:border-indigo-500/40';

export const dropzoneSizeStyles: Record<FileInputSize, string> = {
  sm: 'px-4 py-6',
  md: 'px-6 py-8',
  lg: 'px-8 py-12',
};

export const dropzoneDragStyles =
  'border-indigo-400 dark:border-indigo-500/70 ' +
  'bg-indigo-50/50 dark:bg-indigo-500/8 scale-[1.015]';

export const dropzoneErrorStyles =
  'border-rose-300/80 dark:border-rose-500/50 ' +
  'hover:border-rose-400/80 dark:hover:border-rose-500/70';

export const dropzoneDisabledStyles = 'pointer-events-none opacity-40';

export const uploadIconBase = 'h-9 w-9 text-slate-300 dark:text-slate-600';

export const dropzoneTitleBase =
  'text-sm font-medium text-slate-700 dark:text-slate-300';

export const dropzoneHintBase = 'text-xs text-slate-400 dark:text-slate-500';

export const browseSpanBase =
  'text-indigo-600 dark:text-indigo-400 font-medium underline-offset-2 hover:underline';

export const fileListBase = 'flex flex-col gap-1.5';

export const fileItemBase =
  'flex items-center gap-2.5 px-3 py-2 rounded-xl ' +
  'bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm ' +
  'border border-white/60 dark:border-white/10 ' +
  'shadow-sm shadow-slate-100/30 dark:shadow-black/10';

export const fileIconBase = 'h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500';

export const fileNameBase =
  'flex-1 min-w-0 text-xs font-medium text-slate-700 dark:text-slate-300 truncate';

export const fileSizeBase = 'text-[10px] shrink-0 text-slate-400 dark:text-slate-500';

export const fileRemoveBase =
  'ml-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ' +
  'text-slate-300 dark:text-slate-600 ' +
  'hover:text-rose-500 dark:hover:text-rose-400 ' +
  'hover:bg-rose-50 dark:hover:bg-rose-500/10 ' +
  'transition-colors focus:outline-none ' +
  'focus-visible:ring-2 focus-visible:ring-rose-300/70';

export const hintBase = 'text-xs text-slate-500 dark:text-slate-400';

export const errorTextBase = 'text-xs text-rose-600 dark:text-rose-400';
