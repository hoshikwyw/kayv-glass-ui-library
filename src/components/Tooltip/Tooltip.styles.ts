import type { TooltipPlacement } from './Tooltip.types';

export const tooltipBase =
  'pointer-events-none max-w-[240px] rounded-xl px-3 py-2 ' +
  'text-xs leading-relaxed text-slate-700 dark:text-slate-200 ' +
  'bg-white/95 dark:bg-slate-800/95 backdrop-blur-md ' +
  'border border-white/70 dark:border-white/10 ' +
  'shadow-lg shadow-slate-200/60 dark:shadow-black/40';

export const caretBase =
  'absolute h-2 w-2 rotate-45 ' +
  'bg-white/95 dark:bg-slate-800/95';

export const caretPlacementStyles: Record<TooltipPlacement, string> = {
  top:    'bottom-[-4px] left-1/2 -translate-x-1/2 border-r border-b border-white/70 dark:border-white/10',
  bottom: 'top-[-4px]   left-1/2 -translate-x-1/2 border-l border-t border-white/70 dark:border-white/10',
  left:   'right-[-4px] top-1/2  -translate-y-1/2 border-t border-r border-white/70 dark:border-white/10',
  right:  'left-[-4px]  top-1/2  -translate-y-1/2 border-b border-l border-white/70 dark:border-white/10',
};
